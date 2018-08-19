import React from 'react';
import PropTypes from 'prop-types';

const Video = ({videoSrc}) => {
    const screenWidth =  window.innerWidth;
    return (
    <React.Fragment>
        <div className="popup"></div>
        <div className="window">
            <iframe
                width={screenWidth > 1000 ? "854" : 0.9 * screenWidth + "px"}
                height={screenWidth > 1000 ? "480": 0.9 / 1.77 * screenWidth + "px"}
                src={videoSrc}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen>
            </iframe>
        </div>
    </React.Fragment>
)};

Video.propTypes = {
    videoSrc: PropTypes.string.isRequired
};

export default Video