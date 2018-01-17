import React from 'react';
import { Link } from 'react-router-dom';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

import turtle from '../static/turtle_icon.svg';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.updateTimeOrLink = this.updateTimeOrLink.bind(this);
    this.updatePosts = this.updatePosts.bind(this);
    this.makeUpdateTimeInWords = this.makeUpdateTimeInWords.bind(this);

    this.state = {
      ticker: null,
      updateTime: ''
    }
  }
  componentWillMount() {
    this.makeUpdateTimeInWords();
    this.setState((state) => ({
      ticker: setInterval(() => {
        this.makeUpdateTimeInWords();
      }, 20 * 1000)
    }));
  }
  componentWillUnmount() {
    clearInterval(this.state.ticker);
  }
  updateTimeOrLink() {
    const now = Math.round(new Date().getTime() / 1000);
    if (now < this.props.nextUpdate) {
      return (
        <span>next update in&nbsp;
          <Link to='/settings'>
              <span className='interval-time-display'>{ this.state.updateTime } &or;</span>
          </Link>
        </span>
      );
    } else {
      return (
        <span className='interval-time-display available' onClick={ this.updatePosts }>
          new posts available &rarr;
        </span>
      );
    }
  }
  makeUpdateTimeInWords() {
    const updateTime = distanceInWordsToNow(new Date(this.props.nextUpdate*1000));
    this.setState((state) => ({
      updateTime: updateTime
    }));
  }
  updatePosts() {
    const interval = window.localStorage.slowHnInterval;
    const offset = window.localStorage.slowHnOffset;
    const anchorDay = window.localStorage.slowHnAnchorDay;
    this.props.updateTimes(interval, offset, anchorDay);
  }
  render() {
    return (
      <div className='header-wrapper'>
        <div className='header-logo-border'>
          <img src={ turtle } className='header-logo-img' alt='turtle logo' />
        </div>
        <Link className='header-title' to='/'>Slow HN</Link>
        <div className='interval-picker-wrapper'>
          { this.updateTimeOrLink() }
        </div>
      </div>
    ); 
  }
}

export default Header;