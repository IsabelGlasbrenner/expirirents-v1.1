import React from 'react';
import { Fade } from 'react-slideshow-image';
import './css/slideshow.css';

const fadeImages = [
  //'https://s3.amazonaws.com/images.rvs.com/images/popular-brands/2018-thor_freedom_elite.jpg',
  //'https://si.wsj.net/public/resources/images/B3-CA167_RVbuck_M_20181010171428.jpg',
  'https://amp.businessinsider.com/images/5bb256ca9a4ab803db619ada-750-544.jpg',
  'https://amp.businessinsider.com/images/5bb256ca9a4ab803db619ada-750-544.jpg',
  'https://amp.businessinsider.com/images/5bb256ca9a4ab803db619ada-750-544.jpg'
];

const fadeProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  autoplay: false
}

const Slideshow = () => {
  return (
    <Fade {...fadeProperties}>
      <div className="each-fade">
        <div className="image-container">
          <img src={fadeImages[0]} />
        </div>
      </div>
      <div className="each-fade">
        <div className="image-container">
          <img src={fadeImages[1]} />
        </div>
      </div>
      <div className="each-fade">
        <div className="image-container">
          <img src={fadeImages[2]} />
        </div>
      </div>
    </Fade>
  )
}

export default Slideshow