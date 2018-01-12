import React from 'react';
import Header from './Header';

function NotFound(props) {
  return (
    <div>
      <Header nextUpdate={ props.nextUpdate } />
      <div className='not-found-container'>
        <h1>Nothing here!</h1>
        <button onClick={() => props.history.push('/') }>&larr; Back&nbsp;&nbsp;</button>
      </div>
    </div>
  );
}

export default NotFound;