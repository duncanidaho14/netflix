import React from 'react';

const BASE_URL = "https://www.youtube.com/embed/";

const Video = ({ videoId }) => {
    return (
        <div className="embed-responsive embed-responsive-16by9">
            <iframe height="315px" width="560px" title="mainvideo" src={`${BASE_URL}${videoId}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
        </div>
    )
}

export default Video;