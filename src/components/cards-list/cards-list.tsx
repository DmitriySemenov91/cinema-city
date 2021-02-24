import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../redux/reducers';
import { movieInterface } from '../../interfaces';


import MovieCard from '../movie-card';
import ErrorBoundry from '../error_boundry';
import './cards-list.css';
import cardPlaceholder from '../../assets/cardPlaceholder.png';


function CardList(props: { list: any }) {
  const { favoritsList } = useSelector((state: RootStateType) => state.favoritsList);
  const { list } = props;

  let activeRoute = useLocation().pathname;
  const messageFavsEmpty = list.length === 0 && activeRoute.includes('favorits') ?
    <div className='card empty'>Your favorits list is empty</div> : null;

  const createList: Function = (movies: movieInterface[]): JSX.Element[] => {
    return movies.map((movie: movieInterface) => {
      const { id, title, poster_path } = movie;
      const src = poster_path ?
        `http://image.tmdb.org/t/p/w342/${poster_path}` :
        cardPlaceholder;
      const favorited: boolean = favoritsList.some((elem: movieInterface) => {
        return elem.id === id
      });
      return (
        <MovieCard key={id}
          id={id}
          src={src}
          title={title}
          favorited={favorited}
          movieData={movie}
        />);
    });
  }
  return (
    <ErrorBoundry>
      <div className='cards-list' >
        {messageFavsEmpty}
        {createList(list)}
      </div>
    </ErrorBoundry>
  );
}
export default CardList;
