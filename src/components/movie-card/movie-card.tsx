import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { MDBServiceContext } from '../movie-db-service-provider';
import Spinner from '../spinner';
import './movie-card.css';

interface cardInterface {
  src: string;
  title: string;
  id: number;
  favorited: boolean;
  movieData: object;
}

const MovieCard = (props: cardInterface) => {
  const [loading, setLoading] = useState(true);
  const imageLoader = () => {
    setLoading(false);
  }


  const { src, title, id, favorited, movieData } = props;
  const { toggleFavorit } = useContext(MDBServiceContext)!;

  const onLiked = () => {
    toggleFavorit(movieData);
  };

  let btnStyles = 'like-btn';
  if (favorited) btnStyles += ' inFavs';

  return (
    <div className='card movie-card'>
      <button className={btnStyles} onClick={onLiked}>
        <svg width="1.5em" height="1.5em" viewBox="-0.4 1.2 16 16" className="bi bi-star-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
        </svg>
      </button>
      <Link to={`/description/${id}`}>
        <div className='blank' style={{ display: loading ? 'block' : 'none', width: "342px", height: "513px" }}>
          {/* <div className="loader">LOADING...</div> */}
          <div className='spinnerContainer'><Spinner /></div>
        </div>
        <div>
          <img style={{ display: loading ? 'none' : 'block' }} className='poster' src={src} alt={title} onLoad={imageLoader} />
        </div>
        <span className='title card-header'>{title}</span>
      </Link>
    </div>

  );
}
export default MovieCard;
