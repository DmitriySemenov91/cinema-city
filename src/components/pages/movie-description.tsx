import React, { useContext, useEffect, useState } from 'react';
import MovieDBService from '../../redux/services';
import { movieInterface } from '../../interfaces';
import { MDBServiceContext } from '../movie-db-service-provider';


import Spinner from '../spinner';
import CardList from '../cards-list';
import ErrorBoundry from '../error_boundry';
import './movie-description.css'
import posterPlaceholder from '../../assets/posterPlaceholder.png'



function MovieDescription(props: { id: number }) {
  const movieDBService = new MovieDBService();
  const { toggleFavorit, favoritsList } = useContext(MDBServiceContext)!;
  const { id } = props;
  const [movie, setMovie] = useState();
  const [liked, setLiked] = useState(false)
  const [recommended, setRecommended] = useState();
  const [loading, setLoading] = useState(true);


  const imageLoader = () => {
    setLoading(false);
  }

  const checkInFavorits = (id: number) => {
    return favoritsList.some((elem: movieInterface) => elem.id === id)
  }
  useEffect((): any => {
    let cancelled = false;
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    movieDBService.getMovieDescription(id)
      .then((response) => {
        !cancelled && setMovie(response);
        !cancelled && setLiked(checkInFavorits(response.id));
      });
    movieDBService.getRecommendations(id)
      .then((response) => {
        !cancelled && setRecommended(response.results);
      });
    return () => cancelled = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!movie) return <Spinner />;

  let btnText = liked ?
    'Remove from Favorits' :
    'Add to favorits';

  const data: movieInterface = movie!;
  const {
    poster_path,
    backdrop_path,
    title,
    genres,
    vote_average,
    overview,
    release_date
  } = data;

  const src = poster_path ?
    `http://image.tmdb.org/t/p/w342/${backdrop_path ? backdrop_path : poster_path}` :
    posterPlaceholder;
  let genresToString = genres.reduce((string: string, genre: any) => {
    return string += ` ${genre.name}`;
  }, '');

  return (
    <ErrorBoundry>
      <div className='bg-light w-100'>
        <div className='flex-container border border-black'>
          <div className='d-flex pic-container' >
            <div className='spinnerContainer' style={{ display: loading ? 'block' : 'none' }}>
              <Spinner />
            </div>
            <img style={{ display: loading ? 'none' : 'block' }} className='pic-sizer' src={src} alt={title} onLoad={imageLoader} />
          </div>
          <div className='card card-body'>
            <h1>{title}</h1>
            <span className="text-muted spacer">Rating: {vote_average}</span>
            <article className="spacer">{overview}</article>
            <span className="spacer">Genres:{genresToString}</span>
            <span className="spacer">Release date: {release_date}</span>
            <button
              className='btn btn-outline-secondary'
              onClick={() => {
                setLiked(!liked);
                toggleFavorit(data)
              }}>
              {btnText}
            </button>
          </div>
        </div >
        {
          recommended ?
            <div>
              <h2 className='notif'>You may also like:</h2>
              <CardList list={recommended} />
            </div> :
            <Spinner />
        }
      </div>
    </ErrorBoundry>
  );
}
export default MovieDescription;
