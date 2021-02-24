import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';


import './header.css';

const Header = (props: {
  trackLocation: Function,
  getSearchText: Function
}) => {
  const { trackLocation, getSearchText } = props;
  const [text, saveText] = useState('');
  let activeRoute = useLocation().pathname;
  const disable = activeRoute.length > 1;
  let placeholder = disable ? '...' : 'Search...';

  useEffect(() => {
    getSearchText(text);
  }, [text]);
  useEffect(() => {
    trackLocation(activeRoute)
  }, [activeRoute]);

  const handleInput = (e: any) => {
    saveText(e.target.value);
  }
  return (
    <div className='wrapper'>
      <nav className='justify-content-center'>
        <Link to='/' className='btn btn-dark  btn-nav border  border-right-1'>Main</Link>
        <Link to='/favorits' className='btn btn-dark  btn-nav'>Favorits</Link>
        <input disabled={disable}
          className='form-control flex-grow-1 search'
          onChange={handleInput}
          type='text' placeholder={placeholder}
          value={text} />
      </nav>
    </div>


  );
}

export default Header;
