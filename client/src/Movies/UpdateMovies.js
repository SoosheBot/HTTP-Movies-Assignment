import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const defaultInfo = {
    title: '',
    director: '',
    metascore: 0,
    stars: [],
}

const UpdateMovies = (props) => {
    const [movie, setMovie] = useState(defaultInfo);
    const { id } = useParams();

    useEffect(() => {
        const movieToEdit = props.movies.find(
          movie => `${movie.id}` === id
        );
    
        if (movieToEdit) setMovie(movieToEdit);
      }, [props.movies, id]);

      const handleChange = ev => {
        ev.persist();
        let value = ev.target.value;
        if (ev.target.name === "metascore") {
            value = parseInt(value, 10);
        }
        setMovie({
          ...movie,
          [ev.target.name]: value
        });
      };

      const handleSubmit = e => {
        console.log('in handlesubmit', movie)
      e.preventDefault();
      axiosWithAuth()
        .put(`/api/movies/${movie.id}`, movie)
        .then(res => {
          const newList = props.movies.map((item) => {
            if (movie.id === item.id){
              return res.data
            } else {
              return item;
            }
          })
          props.setMovies(newList);
          console.log('newList', newList)
          props.history.push(`/`);
        })
        .catch(err => console.log(err.response));
    };

    return (
        <div>
            <h1>Update Form</h1>
            <form onSubmit={handleSubmit}>
                <input type='text' name='title' value={movie.title} onChange={handleChange} placeholder='Update title'/>
                <input type="text" name="director" onChange={handleChange} value={movie.director} placeholder="director"/>
                <input type="number" name="metascore" onChange={handleChange} value={movie.metascore} placeholder=""/>
                <input type="text" name="stars" onChange={handleChange} value={movie.stars} placeholder="stars"/>
                <button>Edit</button>
            </form>
        </div>
    )

};

export default UpdateMovies;