import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import SearchBar from './components/search-bar';
import VideoDetail from './components/video-detail';
import VideoList from './containers/video-list';
import Video from './components/video';

// const TEST = "https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US"
const API_END_POINT = "https://api.themoviedb.org/3/";
const API_KEY ="api_key=1fbf4e0b423ae93517034e0481f834d4";
const POPULAR_MOVIES_URL = "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=videos,images";
const MOVIE_VIDEO_URL = "append_to_response=videos&include_adult=false";
// const fullHttp1 = "https://api.themoviedb.org/3/tv/{tv_id}?api_key=1fbf4e0b423ae93517034e0481f834d4&language=en-US"
// const fullHttp2 = "/videos?api_key=1fbf4e0b423ae93517034e0481f834d4&language=en-US"
// https://api.themoviedb.org/3/movie/297762?api_key=1fbf4e0b423ae93517034e0481f834d4&append_to_response=videos
//axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`).then(function(response) {
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {movieList:{}, currentMovie:{}, persons: []}
  }
  componentWillMount() {
    this.initMovies();
  }
  initMovies() {
    axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`).then(function(response) {
      
      this.setState({movieList: response.data.results.slice(1,8), currentMovie: response.data.results[0]}, function(){
        this.applyVideoToCurrentMovie();
      });
    }.bind(this));
  }
  applyVideoToCurrentMovie() {
    axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}?${API_KEY}&${MOVIE_VIDEO_URL}`).then(function(response) {      
      const youtubeKey = response.data.videos.results[0].key
      let newCurrentMovieState = this.state.currentMovie
      newCurrentMovieState.videoId = youtubeKey
      this.setState({ currentMovie: newCurrentMovieState })
    }.bind(this));
  }
  personList() {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then(function(response) {
      const persons = response.data;
      this.setState({ persons });
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
              <div className="video">
                <Video videoId={this.state.currentMovie.videoId} />
              </div>
              <div className="video">
                <VideoDetail title={this.state.currentMovie.title} description={this.state.currentMovie.overview} />
              </div>
            </div>
          <div className="col-md-4">
            {renderVideoList()}
          </div>
            <ul>
            { this.state.persons.map(person => <li>{person.name}</li>)}
          </ul>  
          </div>     
      </div>
    )
  }
}

export default App;
