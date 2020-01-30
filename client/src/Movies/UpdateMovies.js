import React, { useState, useEffect } from "react";
// import { useParams } from 'react-router-dom';


const defaultInfo = {
  title: "",
  director: "",
  metascore: 0,
  stars: []
};

const UpdateMovies = props => {
  const [movie, setMovie] = useState(defaultInfo);
    // const { id } = useParams();

  useEffect(() => {
    const movieToEdit = props.items.find(movie => 
      `${movie.id}` === props.match.params.id
    );
    if (movieToEdit) {
      setMovie(movieToEdit);
    }
  }, [props.items, props.match.params]);

  const handleChange = ev => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.name === "metascore") {
      value = parseInt(value, 10);
  }
    console.log('handleChange movie is =', movie)
    setMovie({
      ...movie,
      [ev.target.name]: value
    });
  };

  const handleSubmit = e => {
    console.log("handleSubmit movie is =", movie);
    e.preventDefault();
    const id = Number(props.match.params.id);
    props.updateItem(id, movie);
    props.history.push('/')
  };

  return (
    <div>
      <h1>Update</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={movie.title}
          onChange={handleChange}
          placeholder="Update title"
        />
        <input
          type="text"
          name="director"
          onChange={handleChange}
          value={movie.director}
          placeholder="director"
        />
        <input
          type="number"
          name="metascore"
          onChange={handleChange}
          value={movie.metascore}
        />
        <input
          type="text"
          name="stars"
          onChange={handleChange}
          value={movie.stars}
          placeholder="stars"
        />
        <button type='submit'>Sumbit Changes</button>
      </form>
    </div>
  );
};

export default UpdateMovies;
