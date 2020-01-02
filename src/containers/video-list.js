import React from 'react';
import VideoListItem from '../components/video-list-item';

const VideoList = (props) => {
    const {movieList} = props;
    return (
        <aside>
            <ul>
                { movieList.map(movie => {
                        return <VideoListItem key={movie.id} movie={movie} callback={receiveCallBack} />
                    }) }
            </ul>
        </aside>
    
    )
    function receiveCallBack(movie) {
        props.callback(movie)
    }
}

export default VideoList;