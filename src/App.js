import React, { Component } from 'react';
import axios from 'axios';
import './App.scss';
import SearchBar from './components/search-bar';
import VideoDetail from './components/video-detail';
import VideoList from './containers/video-list';
import Video from './components/video';

const API_END_POINT = "https://api.themoviedb.org/3/";
const API_KEY = "api_key=1fbf4e0b423ae93517034e0481f834d4";
const POPULAR_MOVIES_URL = "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=videos,images";
const MOVIE_VIDEO_URL = "append_to_response=videos&include_adult=false";
const SEARCH_URL = "search/movie?language=fr&inculde_adult=false";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {movieList:{}, currentMovie:{}, persons: []}
  }
  componentDidMount() {
    this.initMovies();
  }
  initMovies() {
    axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`).then(function(response) {
      
      this.setState({movieList: response.data.results.slice(1,10), currentMovie: response.data.results[0]}, function(){
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
  
  onClickListItem(movie) {
    this.setState({ currentMovie: movie }, function() {
      this.applyVideoToCurrentMovie();
      this.setRecommendation();
    });
  }
  setRecommendation() {
    axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}/recommendations?${API_KEY}&language=fr`).then(function(response) {
      this.setState({movieList: response.data.results.slice(0,7)});
    }.bind(this));
  }
  onClickSearch(searchText) {
    if(searchText) {
      axios.get(`${API_END_POINT}${SEARCH_URL}&${API_KEY}&query=${searchText}`).then(function(response) {
        if(response.data && response.data.results[0]) {
          if(response.data.results[0].id !== this.state.currentMovie.id) {
            this.setState({ currentMovie: response.data.results[0]}, () => {
              this.applyVideoToCurrentMovie();
              this.setRecommendation();
            })
          }
        }
      }.bind(this));
    }
    
  }
  render() {
    const renderVideoList = () => {
      if(this.state.movieList.length >= 7){
        return <VideoList movieList={this.state.movieList} callback={this.onClickListItem.bind(this)} />
      }
    }
    const renderVideo = () => {
      if(this.state.currentMovie.videoId) {
        return (
          <div className="row">
                <Video videoId={this.state.currentMovie.videoId} />
                <div className="videoDetail">
                  <VideoDetail title={this.state.currentMovie.title} description={this.state.currentMovie.overview} release_date={"sortie le " + this.state.currentMovie.release_date}  vote_average={this.state.currentMovie.vote_average + "/10"} vote_count={this.state.currentMovie.vote_count + " votant,"} />
                </div>
          </div>
        );
      } else {
        return <div> Pas de données </div>
      }
    }
    return (
      <div>
        <div className="search_bar">
          <SearchBar callback={this.onClickSearch.bind(this)} />
        </div>
        <div className="row">
          <div className="col-md-7 video">
            { renderVideo() }
          </div>
          <div className="col-md-4 list-group-item video">
            {renderVideoList()}
          </div>
        </div> 
      </div>     
    )
  }
}

export default App;
