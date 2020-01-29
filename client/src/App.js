import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { axiosWithAuth } from './utils/axiosWithAuth';

import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovies from './Movies/UpdateMovies';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("/api/movies")
      .then(res => setMovies(res.data))
      .catch(err => console.log(err.response));
  },[]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList}/>
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
      <Route path='/update-movie/:id' 
      render={props => {
        return <UpdateMovies {...props} movies={movies}setMovies={setMovies} />
      }}
    />
    </>
  );
};

export default App;
