import React from 'react'
import BlogList from './BlogList';
import useFetch from './useFetch';

const Articles = () => {
    const { data: blogs, isPending, error } = useFetch('http://localhost:8000/blogs')

    return (
    <div className='home'>
        {error && <div>{error}</div>}
        {isPending && <div>Loading...</div>}
        {blogs ? <BlogList blogs={blogs} title="All Blogs" /> : <p>No data found</p>}
    </div>
    )
}

export default Articles