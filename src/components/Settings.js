import React, { Component } from 'react';
import Header from './Header';

class Settings extends Component {

  constructor(props) {
    super(props);
    this.updateTiming = this.updateTiming.bind(this);
  }

  updateTiming() {
    const interval = this.refs.interval.value;
    const offset = +this.refs.offset.value + ( this.refs.ampm.value === 'pm' ? 12 : 0);
    this.props.getTimeList(interval, offset);
    this.props.history.push('/');
  }

  render () {
    return (
      <div>
        <Header nextUpdate={ this.props.nextUpdate } />
        <div className='settings-container'>
          <p>Slow HN logs the best stories from Hacker News, then displays them in batches that update less frequently.</p>
          <p>For example, set an interval of <strong>8 hours</strong>, starting at <strong>9 AM</strong>. From 9 AM through 5 PM, Slow HN will display a static set of the best articles from the previous 8-hour period (1 AM to 9 AM). After 5 PM, you'll get a new batch of articles from the 9 AM - 5 PM period.</p>
          <div className='settings-row'>
            <div className='settings-interval'>
              <label>Update every</label><br/>
              <select className='settings-select' ref='interval' defaultValue={ window.localStorage.slowHnInterval }>
                <option value='4'>4 hours</option>
                <option value='8'>8 hours</option>
                <option value='12'>12 hours</option>
                <option value='24'>1 day</option>
              </select>
            </div>
            <div className='settings-offset'>
              <label>starting at</label><br/>
              <select className='settings-select' ref='offset' defaultValue={ window.localStorage.slowHnOffset % 12 }>
                <option value='1'>1:00</option>
                <option value='2'>2:00</option>
                <option value='3'>3:00</option>
                <option value='4'>4:00</option>
                <option value='5'>5:00</option>
                <option value='6'>6:00</option>
                <option value='7'>7:00</option>
                <option value='8'>8:00</option>
                <option value='9'>9:00</option>
                <option value='10'>10:00</option>
                <option value='11'>11:00</option>
                <option value='12'>12:00</option>
              </select>
            </div>
            <div className='settings-am-pm'>
              <label> </label><br/>
              <select className='settings-select' ref='ampm' defaultValue={ window.localStorage.slowHnOffset > 11 ? 'pm' : 'am' }>
                <option value='am'>AM</option>
                <option value='pm'>PM</option>
              </select>
            </div>
            <div className='settings-submit'>
              <button onClick={ this.updateTiming }>Save</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Settings;