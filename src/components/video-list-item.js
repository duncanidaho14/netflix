import React from 'react';
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500/";

const VideoListItem = (props) => {
    const {movie} = props;
    return (
            
            <li className="list-group-item" onClick={handleOnClick}>
                <div className="media">
                    <div className="media-left">
                        <img className="media-object img-founded" height="100px" width="100px" alt={"logo"} src={`${IMAGE_BASE_URL}${movie.poster_path}`} />
                    </div>
                
                    <div className="media-body">
                        <h5 className="title_list_item">{movie.title} <span className="span_title_list_item">{movie.release_date}</span></h5>
                    </div>
                </div>
            </li>
    )
            function handleOnClick() {
                props.callback(movie)
            }
}

export default VideoListItem;