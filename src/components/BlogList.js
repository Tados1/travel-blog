import './BlogList.css'
import { Link } from 'react-router-dom'
import defaultImage from '../images/default-image/default-image.jpg'

const BlogList = ( {blogs} ) => {

  return <div className='articles'>
    <div className="articles-list">
      {
          blogs.map( (blog) => {
              return <div className='one-article' key={blog.id}>
                  <Link to={`/article/${blog.id}`}>
                  {blog.image ? (<img src={blog.image} alt='' />) : (<img src={defaultImage} alt='' />)}
                    <h1>{blog.title}</h1>
                  </Link>
              </div>
          })
      }
    </div>
  </div>
}

export default BlogList