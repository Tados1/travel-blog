import './BlogDetails.css'
import PopUpGallery from "./PopUpGallery"
import BariImages from "../bariData"
import { useParams } from "react-router-dom"
import useFetch from "./useFetch"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

const BlogDetails = () => {
    const { id } = useParams()
    const { data: blog, error, isPending } = useFetch('http://localhost:8000/blogs/' + id)
    const history = useHistory()

    const handleClick = () => {
        fetch('http://localhost:8000/blogs/' + blog.id, {
            method: 'DELETE'
        }).then(() => {
            history.push('/articles')
        })
    }

    return (
        <div className='blog-deatils'>
            { isPending && <div>Loading...</div>}
            { error && <div>{ error }</div>}
            { blog && (
                <article>
                    <h1>{blog.title}</h1>
                    <p>{blog.content}</p>
                    <PopUpGallery data={BariImages}/>
                    <button onClick={handleClick}>Delete</button>
                </article>
            )}
        </div>
    )
}

export default BlogDetails