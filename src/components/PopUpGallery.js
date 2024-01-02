import "./PopUpGallery.css"
import { useState } from 'react'
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';

const PopUpGallery = ({data}) => {
    const [slideNumber, setSlideNumber] = useState(0)
    const [openModal, setOpenModal] = useState(false)

    const handleOpenModal = (index) => {
        setSlideNumber(index)
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setOpenModal(false)
    }

    const prevSlide = () => {
        slideNumber === 0 ? setSlideNumber(data.length - 1) : setSlideNumber(slideNumber -1)
    }

    const nextSlide = () => {
        slideNumber + 1 === data.length ? setSlideNumber(0) : setSlideNumber(slideNumber + 1)
    }

    return <div className="gallery-content">
        {openModal &&
            <div className="sliderWrap">
                <AiFillCloseCircle className="btn btnClose" onClick={handleCloseModal} />
                <BsFillArrowLeftCircleFill className="btn btnPrev" onClick={prevSlide} />
                <BsFillArrowRightCircleFill className="btn btnNext"onClick={nextSlide} />
                <div className="fullScreenImage">
                    <img src={data[slideNumber].image} alt="" />
                    <div className="sliderText">
                        <p>Current slide number: {slideNumber + 1}, Total Slides: {data.length}</p>
                    </div>
                </div>
            </div>
            
        }

        <div className='gallery'>
            {data.map((slide, index) => (
                <div className="single" key={index} onClick={() => handleOpenModal(index)}>
                    <img src={slide.image} alt="" />
                </div>
            ))}
        </div>
    </div>
    
}

export default PopUpGallery