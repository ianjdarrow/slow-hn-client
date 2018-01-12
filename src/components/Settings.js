import React, { Component } from 'react';
import Header from './Header';

class Settings extends Component {

  constructor(props) {
    super(props);
    this.updateTiming = this.updateTiming.bind(this);
  }

  async updateTiming() {
    const interval = this.refs.interval.value;
    const offset = +this.refs.offset.value + ( this.refs.ampm.value === 'pm' ? 12 : 0);
    window.localStorage.slowHnAnchorDay = this.refs.day.value;

    await this.props.updateTimes(interval, offset);
    this.props.history.push('/');
  }

  intervalSelector() {
    return (
      <div className='settings-interval'>
        <label>Update every</label><br/>
        <select className='settings-select' ref='interval' defaultValue={ window.localStorage.slowHnInterval }>
          <option value='4'>4 hours</option>
          <option value='8'>8 hours</option>
          <option value='12'>12 hours</option>
          <option value='24'>1 day</option>
          <option value='168'>1 week</option>
        </select>
      </div>
    );
  }

  offsetSelector() {
    return (
      <div className='settings-offset'>
        <label>at</label><br/>
        <select className='settings-select' ref='offset' defaultValue={ window.localStorage.slowHnOffset % 12 }>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
          <option value='6'>6</option>
          <option value='7'>7</option>
          <option value='8'>8</option>
          <option value='9'>9</option>
          <option value='10'>10</option>
          <option value='11'>11</option>
          <option value='12'>12</option>
        </select>
      </div>
    );
  }

  ampmSelector() {
    return (
      <div className='settings-am-pm'>
        <label> </label><br/>
        <select className='settings-select' ref='ampm' defaultValue={ window.localStorage.slowHnOffset > 11 ? 'pm' : 'am' }>
          <option value='am'>AM</option>
          <option value='pm'>PM</option>
        </select>
      </div>
    );
  }

  daySelector() {
    return (
      <div className='settings-day'>
        <label>starting on</label><br/>
        <select className='settings-select' ref='day' defaultValue={ window.localStorage.slowHnAnchorDay }>
          <option value='0'>Monday</option>
          <option value='1'>Tuesday</option>
          <option value='2'>Wednesday</option>
          <option value='3'>Thursday</option>
          <option value='4'>Friday</option>
          <option value='5'>Saturday</option>
          <option value='6'>Sunday</option>
        </select>
      </div>
    );
  }

  render () {
    return (
      <div>
        <Header nextUpdate={ this.props.nextUpdate } />
        <div className='settings-container'>
          <p>Slow HN logs the best stories from Hacker News, then displays them in batches that update less frequently.</p>
          <p>For example, set an interval of <strong>8 hours</strong> starting at <strong>9 AM</strong>. From 9 AM to 5 PM, Slow HN will show a static set of the best articles from the previous 8-hour period (1 AM to 9 AM). After 5 PM, you'll get a new batch of articles from the 9 AM - 5 PM period.</p>
          <p>The goal is to enjoy HN's content in a more concentrated, less frequent way.</p>
          <div className='settings-row'>
            { this.intervalSelector() }
            { this.offsetSelector() }
            { this.ampmSelector() }
            { this.daySelector() }
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