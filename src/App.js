import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/search-bar';
import VideoDetail from './components/video-detail';
import VideoList from './containers/video-list';
import Video from './components/video';
import axios from 'axios';
const TEST = "https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US"
const API_END_POINT = "https://api.themoviedb.org/3/";
const API_KEY ="api_key=1fbf4e0b423ae93517034e0481f834d4";
const POPULAR_MOVIES_URL = "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=videos,images";
const MOVIE_VIDEO_URL = "append_to_response=videos&include_adult=false&language=fr-FR";
const fullHttp1 = "https://api.themoviedb.org/3/movie/"
const fullHttp2 = "/videos?api_key=1fbf4e0b423ae93517034e0481f834d4&language=en-US"
//axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`).then(function(response) {
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {movieList:{}, currentMovie:{}}
  }
  componentWillMount() {
    this.initMovies();
  }
  initMovies() {
    axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`).then(function(response) {
      
      this.setState({movieList: response.data.results.slice(1,6), currentMovie: response.data.results[0]}, function(){
        this.applyVideoToCurrentMovie();
      });
    }.bind(this));
  }
  applyVideoToCurrentMovie() {
    axios.get(`https://api.themoviedb.org/3/movie/${this.state.currentMovie.id}/videos?${API_KEY}&language=en-US`).then(function(response) {      
      console.log('', response.data.results[0].key)    
      const youtubeKey = response.data.results[0].key;
        // console.log('',  response.data.videos.results[0].key);
        
      let newCurrentMovieState = this.state.currentMovie;
      newCurrentMovieState.videoId = youtubeKey;
      this.setState({ currentMovie: newCurrentMovieState })

        // console.log('', newCurrentMovieState)
      
    }.bind(this));
  }
  
  render() {
    const renderVideoList = () => {
      if(this.state.movieList.length >= 5){
        return <VideoList movieList={this.state.movieList} />
      }
    }
    return (
      <div>
        <div className="search_bar">
          <SearchBar />
        </div>
          <div className="row">
            <div className="col-md-8">
              <Video videoId={this.state.currentMovie.videoId} />
              <VideoDetail title={this.state.currentMovie.title} description={this.state.currentMovie.overview} />
            </div>
          <div className="col-md-4">
            {renderVideoList()}
          </div>  
          </div>
                  
      </div>
    )
  }
}

export default App;
