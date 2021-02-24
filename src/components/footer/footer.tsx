import React from 'react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

  }

  return (
    <footer id='footer' className=' mt-5 w-100 h-100'>
      <div className='d-flex align-items-center'>
        <button className='d-block m-2 w-100 btn btn-outline-secondary' onClick={scrollToTop}>Scroll to top</button>
      </div>



      <hr></hr>
      <div className='m-2'>Data and images provided by themoviedb.org</div>
      <a className=' m-1 badge badge-pill badge-info' href='https://github.com/DmitriySemenov91'>My Git</a>
      <hr></hr>
    </footer>
  );
};
export default Footer;
