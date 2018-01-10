import React from 'react';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

import turtle from '../turtle_icon.svg';

function Header(props) {
  return (
    <div className='header-wrapper'>
      <div className='header-logo-border'>
        <img src={ turtle } className='header-logo-img' alt='turtle logo' />
      </div>
      <span className='header-title'>Slow HN</span>
      <div className='interval-picker-wrapper'>
        next update in &nbsp;
        <a className='interval-time-display' onClick={ () => ( console.log('click') ) }>
          { distanceInWordsToNow(new Date(props.nextUpdate*1000)) } &or;
        </a>
      </div>
    </div>
  );
}

export default Header;