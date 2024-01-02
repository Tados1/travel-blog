import { useState, useRef, useEffect, useContext } from "react";
import { BsArrowUpSquareFill, BsArrowDownSquareFill } from "react-icons/bs";
import { Link } from "react-router-dom"
import './MainPage.css';
import slides from "../data";
import useFetch from "./useFetch"
import MyContext from './MyContext';

const MainPage = () => {
    const [numberActiveSlide, setNumberActiveSlide] = useState(0);
    const [sliderLeftStyle, setSliderLeftStyle] = useState(null);
    const [sliderRightStyle, setSliderRightStyle] = useState(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const containerSliderRef = useRef(null);
    const { data: blog} = useFetch('http://localhost:8000/blogs/')
    const myContext = useContext(MyContext);

    useEffect(() => {
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []); 
    
    const changeSlide = (direction) => {
        let newNumberActiveSlide = numberActiveSlide;

        if (direction === "up") {
            newNumberActiveSlide--
            if (newNumberActiveSlide < 0) {
                newNumberActiveSlide = slides.length - 1;
            }
        } if (direction === "down") {
            newNumberActiveSlide++
            if (newNumberActiveSlide >= slides.length) {
                newNumberActiveSlide = 0;
            }
        } if (direction === "button") {
            newNumberActiveSlide = 0
        }

        const newSliderLeftStyle = {
            transform: `translateY(${newNumberActiveSlide * 100}%)`,
        };

        const newSliderRightStyle = {
            transform: `translateY(-${newNumberActiveSlide * 100}%)`,
        };

        setNumberActiveSlide(newNumberActiveSlide);
        setSliderLeftStyle(newSliderLeftStyle);
        setSliderRightStyle(newSliderRightStyle);
    };

    const handleClick = (index, itemIndex) => {
        const slide = slides[index];
        if (slide.country === "Countries" && slides.some(s => s.country === slide.items[itemIndex])) {
            if (slide.items[itemIndex] === 'Albania') {
                setSliderLeftStyle({transform: 'translateY(100%)'})
                setSliderRightStyle({transform: 'translateY(-100%)'})
                setNumberActiveSlide(1)
            }

            if (slide.items[itemIndex] === 'Italy') {
                setSliderLeftStyle({transform: 'translateY(200%)'})
                setSliderRightStyle({transform: 'translateY(-200%)'})
                setNumberActiveSlide(2)
            }
            if (slide.items[itemIndex] === 'France') {
                setSliderLeftStyle({transform: 'translateY(300%)'})
                setSliderRightStyle({transform: 'translateY(-300%)'})
                setNumberActiveSlide(3)
            }
            if (slide.items[itemIndex] === 'Bulgaria') {
                setSliderLeftStyle({transform: 'translateY(400%)'})
                setSliderRightStyle({transform: 'translateY(-400%)'})
                setNumberActiveSlide(4)
            }
            if (slide.items[itemIndex] === 'Hungary') {
                setSliderLeftStyle({transform: 'translateY(500%)'})
                setSliderRightStyle({transform: 'translateY(-500%)'})
                setNumberActiveSlide(5)
            }
        }
    }

    useEffect(() => {
        if (myContext.pageCountry === 'Albania') {
            setSliderLeftStyle({transform: 'translateY(100%)'})
            setSliderRightStyle({transform: 'translateY(-100%)'})
            setNumberActiveSlide(1)
        }

        if (myContext.pageCountry === 'Italy') {
            setSliderLeftStyle({transform: 'translateY(200%)'})
            setSliderRightStyle({transform: 'translateY(-200%)'})
            setNumberActiveSlide(2)
        }
        if (myContext.pageCountry === 'France') {
            setSliderLeftStyle({transform: 'translateY(300%)'})
            setSliderRightStyle({transform: 'translateY(-300%)'})
            setNumberActiveSlide(3)
        }
        if (myContext.pageCountry === 'Bulgaria') {
            setSliderLeftStyle({transform: 'translateY(400%)'})
            setSliderRightStyle({transform: 'translateY(-400%)'})
            setNumberActiveSlide(4)
        }
        if (myContext.pageCountry === 'Hungary') {
            setSliderLeftStyle({transform: 'translateY(500%)'})
            setSliderRightStyle({transform: 'translateY(-500%)'})
            setNumberActiveSlide(5)
        }
    }, [myContext.pageCountry]);

    return (
        <div className="container_slider" ref={containerSliderRef}>

            <div className="slide_left" style={sliderLeftStyle}>
                {slides.map((slide, index) => (
                    <div key={index} className={`color_${index + 1}_slide`}>
                        <h2>{slide.country}</h2>
                        {slide.country === "Countries" ? (
                            <div>
                                {slide.items.map((item, itemIndex) => (
                                    <li key={itemIndex} onClick={() => handleClick(index, itemIndex)}>{item}</li>
                                ))}
                            </div>
                        ) : (
                            blog && blog.map((item) => (
                                item.country === slide.country ? (
                                    <li key={item.id}><Link to={`/article/${item.id}`}>{item.title}</Link></li>
                                ) : null
                            ))
                        )}
                    </div>
                ))}
            </div>
            <div className="slide_right" style={sliderRightStyle}>
                {slides.map((slide, index) => (
                    <div key={index} className={`image_${index + 1}`}>
                        {numberActiveSlide && <button onClick={() => changeSlide('button')}>Go to Main Page</button>}
                                    {
                                        windowWidth < 900 ?
                                        slides.slice().reverse().map((slide, countryIndex) => (
                                            <div key={countryIndex} className="countries-list-900px">
                                            {slide.country === "Countries" ? null : (
                                                index === countryIndex ? (
                                                <div>
                                                    <h2>{slide.country}</h2>
                                                    {blog && blog.map((item) => (
                                                        item.country === slide.country ? (
                                                        <li key={item.id}><Link to={`/article/${item.id}`}>{item.title}</Link></li>
                                                        ) : null
                                                    ))}
                                                </div>
                                                ) : null
                                            )}
                                            </div>
                                        ))
                                        : null
                                    }
                         {index === 0 ? <div className="travel-text">
                                <h1>Travel Experiences by Tadeas</h1>
                                <p>Closely follow travel tips and find inspiration for your own adventures. Traveling is an endless journey, and I am here to help you on this path</p>
                            </div> 
                        : null}
                    </div>
                ))}
            </div>
            <div className="arrow_buttons">
                <BsArrowDownSquareFill className="arrow arrow_down" onClick={() => changeSlide("down")} />
                <BsArrowUpSquareFill className="arrow arrow_up" onClick={() => changeSlide("up")} />
            </div>
        </div>
    );
};

export default MainPage;