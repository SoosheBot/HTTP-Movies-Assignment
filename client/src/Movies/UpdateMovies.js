import React, { useState, useEffect } from "react";


const defaultInfo = {
  id: "",
  title: "",
  director: "",
  metascore: 0,
  stars: []
};

const UpdateMovies = props => {
  const [movie, setMovie] = useState(defaultInfo);
  //   const { id } = useParams();

  useEffect(() => {
    const movieToEdit = props.items.find(movie => {
      return `${movie.id}` === Number(props.match.params.id);
    });

    if (movieToEdit) {
      setMovie(movieToEdit);
    }
  }, [props.items, props.match.params]);

  const handleChange = ev => {
    ev.persist();
    let value = ev.target.value;
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
    props.updateMovie(id, movie);
  
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
        //   placeholder=""
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
