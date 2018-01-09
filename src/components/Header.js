import React from 'react';
import turtle from '../turtle_icon.svg';

function Header(props) {
  return (
    <div className='header-wrapper'>
    <div className='header-logo-border'>
      <img src={ turtle } className='header-logo-img' alt='turtle logo'/>
    </div>
      <span className='header-title'>Slow HN</span>
    </div>
  )
}

export default Header;