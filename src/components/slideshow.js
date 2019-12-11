import React from 'react';
import { Fade } from 'react-slideshow-image';
import './css/slideshow.css';

const fadeProperties = {
	duration: 5000,
	transitionDuration: 500,
	infinite: true,
	indicators: true,
	autoplay: false
}

const Slideshow = (images) => {
	console.log("SS:" + images)
	return (
		<Fade {...fadeProperties}>
			{
				images.images.map((image, i) => {
					return (
						<div key={i} className="each-fade">
							<div className="image-container">
								<img src={image} />
							</div>
						</div>
					)
				})      
			}
    	</Fade>
    )
}

export default Slideshow;