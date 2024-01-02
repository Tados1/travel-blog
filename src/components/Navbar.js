import './Navbar.css'
import { NavLink, useLocation } from "react-router-dom"
import { useState, useEffect, useContext, useRef } from 'react';
import slides from "../data";
import MyContext from './MyContext';

const Navbar = () => {
  const location = useLocation();
  const [toggle, setToggle] = useState(false)
  const [mainPage, setMainPage] = useState(true)
  const [countries, setCountries] = useState(false)
  const [liColor, setLiColor] = useState("#358bd6");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const refLi = useRef(null)

  const myContext = useContext(MyContext);

  const handleClick = (country) => {
    myContext.setPageCountry(country);
  };

  const countriesLiToggle = () => {
    setCountries(!countries);
    setLiColor(countries ? "#358bd6" : "#f95959");
  };

 
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const shouldShowNavLink = mainPage && windowWidth < 900;
  const shouldShowCountries = slides && windowWidth < 900;

  const toggleFunction = () => {
    setToggle(!toggle)
    setLiColor("#358bd6")
    setCountries(false);
  }


  const burgerContainerClass = `burger ${toggle ? 'open' : ''}`;
  const navContainerClasss = `${toggle ? 'open' : ''}`

  return <header>
        <h1>Travel Blog By Tadeas</h1>

        <div className={`burger ${burgerContainerClass}`} onClick={toggleFunction}>
            <span></span>
            <span></span>
            <span></span>
        </div>

        <nav className={navContainerClasss}>
            <NavLink to='/' exact className={location.pathname === '/' ? 'inactive' : ''} onClick={() => setMainPage(true)}>Home</NavLink>
            <NavLink to='/articles' onClick={() => { setMainPage(false); setCountries(false); }}>Articles</NavLink>
            <NavLink to='/create' onClick={() => { setMainPage(false); setCountries(false); }}>Add Article</NavLink>
            {
            shouldShowNavLink && 
              <li 
                onClick={countriesLiToggle} 
                style={{ color: liColor }} 
                ref={refLi}
              >
                Countries
              </li>
            }
            {countries && (
              <ul className='countries-list'>
                {shouldShowCountries &&
                  slides
                    .filter((item) => item.country !== 'Countries')
                    .map((item, index) => (
                      <li key={index} onClick={() => handleClick(item.country)}>
                        {item.country}
                      </li>
                    ))
                    .reverse()}
              </ul>
            )}
        </nav>
  </header>
}

export default Navbar