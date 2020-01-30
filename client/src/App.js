import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { axiosWithAuth } from './utils/axiosWithAuth';

import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovies from './Movies/UpdateMovies';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [items, setItems] = useState([]);


  useEffect(() => {
    axios
      .get("/api/movies")
      .then(res => {
        console.log("res.data", res.data)
        setItems(res.data)
      })
      .catch(error => console.log(error));
  }, []);


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
        return <UpdateMovies {...props} />
      }}
    />
    </>
  );
};

export default App;
