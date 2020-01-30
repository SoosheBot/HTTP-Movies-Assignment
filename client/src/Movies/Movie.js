import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import MovieCard from "./MovieCard";
// import UpdateMovies from "./UpdateMovies";


export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axiosWithAuth()
      .get(`/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  deleteItem = e => {
    e.preventDefault();
    axiosWithAuth()
    .delete(`/api/movies/${this.state.movie.id}`)
    .then(res => { console.log(res.data)
    })
    .catch(err => console.log(err.response));
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <button onClick={this.state.movie.updateMovies}>Update</button>
      </div>
    );
  }
}
