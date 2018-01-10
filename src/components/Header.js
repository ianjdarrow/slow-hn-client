import React from 'react';
import { Link } from 'react-router-dom';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

import turtle from '../static/turtle_icon.svg';

function Header(props) {
  return (
    <div className='header-wrapper'>
      <div className='header-logo-border'>
        <img src={ turtle } className='header-logo-img' alt='turtle logo' />
      </div>
      <Link className='header-title' to='/'>Slow HN</Link>
      <div className='interval-picker-wrapper'>
        next update in&nbsp;
        <Link to='/settings'>
          <span className='interval-time-display'>{ distanceInWordsToNow(new Date(props.nextUpdate*1000)) } &or;</span>
        </Link>
      </div>
    </div>
  );
}

export default Header;