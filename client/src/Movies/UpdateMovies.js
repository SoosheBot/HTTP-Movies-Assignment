import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const defaultInfo = {
    title: '',
    director: '',
    metascore: 0,
    stars: [],
}

const UpdateMovie = (props) => {
    const [movie, setMovie] = useState(defaultInfo);
    const { id } = useParams();

    useEffect(() => {
        const movieToEdit = props.movies.find(
          movie => `${movie.id}` === id
        );
    
        if (movieToEdit) setMovie(movieToEdit);
      }, [props.movies, id]);

      const changeHandler = ev => {
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

    
};

export default UpdateMovie;