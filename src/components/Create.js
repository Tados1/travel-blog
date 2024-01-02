import './Create.css'
import { useState, useRef } from "react"
import { useHistory } from "react-router-dom"
import slides from "../data";

const Create = () => {
    const inputRef = useRef(null)
    const [image, setImage] = useState(null)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [country, setCountry] = useState('Hungary')
    const [isPending, setIsPending] = useState(false)
    const history = useHistory()

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        const newFile = URL.createObjectURL(file)
        setImage(newFile)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const blog = { title, content, country, image }

        setIsPending(true)
        
        fetch('http://localhost:8000/blogs/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(blog)
        }).then(() => {
            setIsPending(false)
            history.push('/articles')
        })
    }

    return <div className="create">
        <div className="create-content">
            <form onSubmit={handleSubmit}>
                <h1>Add a New Blog</h1>
                <div className="title-country-image">
                    <div className="title">
                        <label>Blog Title:</label>
                        <input 
                            placeholder='Enter your title'
                            type="text" 
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="country">
                        <label>Country:</label>
                        <select
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        >
                            {
                                slides.filter(slide => slide.country !== 'Countries')
                                    .map(slide => (
                                        <option key={slide.country} value={slide.country}>
                                            {slide.country}
                                        </option>
                                    ))
                            }
                        </select>
                    </div>

                    <div className="image">
                        <label>Title Photo:</label>
                        <input 
                            type="file" 
                            accept="image/*" ref={inputRef} 
                            onChange={handleImageChange}
                        />  
                    </div>

                </div>
        
                <div className="body">
                    <label>Blog Content:</label>
                    <textarea
                        placeholder='Your text here...'
                        rows="15"
                        cols="70"
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>
                
                {!isPending && <button>ADD BLOG</button>}
                {isPending && <button disabled>Adding Blog...</button>}
            </form>
        </div>
    </div> 
}

export default Create