import React from 'react';
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed';
const BASE_URL = "https://www.youtube.com/embed/";

const Video = ({ videoId }) => {
    return (
        <div  style={{ width: 'auto', height: 'auto' }}>
            <ResponsiveEmbed aspect="a16by9">
                <embed title="mainvideo" src={`${BASE_URL}${videoId}`} />
            </ResponsiveEmbed>
            <iframe src={`${BASE_URL}6gRKZbslo0g`} width="560" height="315" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
        </div>

    )
}

export default Video;