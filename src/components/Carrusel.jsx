import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


const Carrusel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      goToNextSlide();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const goToPrevSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNextSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="carousel-container relative" style={{ height: '80%' }}>
      <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded" onClick={goToPrevSlide}>
      &#8592;
      </button>
      <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded" onClick={goToNextSlide}>
      &#8594;
      </button>
      <div className="carousel-wrapper flex justify-center">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className={`slide ${index === currentImageIndex ? 'active' : 'hidden'}`}
          />
        ))}
      </div>
    </div>
  );
};

Carrusel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Carrusel;
