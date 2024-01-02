import "./ErrorPage.css"
import { Link } from "react-router-dom"

const ErrorPage = () => {
  return <div className='error-content'>
        <h1>Sorry...</h1>
        <p>That page cannot be found</p>
        <p><Link to='/'>Back to the Home Page</Link></p>
    </div>
  
}

export default ErrorPage