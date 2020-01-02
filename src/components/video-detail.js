import React from 'react';

const VideoDetail = ({title, description, vote_average, vote_count, release_date}) => {
    return (
        <div>
            <h1>{title} <span className="span_videoDetail">{vote_average} - {vote_count} {release_date} </span></h1>
            <p>{description}</p>

        </div>
    )
}

export default VideoDetail;