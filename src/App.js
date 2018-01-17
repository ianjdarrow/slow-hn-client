import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import './App.css';

import Header from './components/Header';
import Index from './components/Index';
import Settings from './components/Settings';
import NotFound from './components/NotFound';

axios.defaults.timeout = 2500;

const API_URL = `https://api.slow-hn.com`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loadError: false,
      nextUpdate: 0,
    }

    this.getPosts = this.getPosts.bind(this);
    this.updateTimes = this.updateTimes.bind(this);
    this.toEpochTime = this.toEpochTime.bind(this);
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  toEpochTime(date) {
    return Math.round((date).getTime() / 1000);
  }

  async updateTimes(interval, offset, anchorDay) {
    window.localStorage.slowHnInterval = interval;
    window.localStorage.slowHnOffset = offset;
    window.localStorage.slowHnAnchorDay = anchorDay;
    const now = new Date();
    const nowEpoch = this.toEpochTime(now);
    const [year, month, date, day] = [now.getFullYear(), now.getMonth(), now.getDate(), now.getDay()];
    let nearestDay = this.toEpochTime(new Date(year, month, date, offset));
    if (interval > 24) {
      const dayDelta = (day + 6 - anchorDay) % 7;
      nearestDay -= (dayDelta * 60 * 60 * 24);
    }
    const adj = interval * 60 * 60;

    let checkpoints = [];
    for(let i=0;i<12;i++) {
      const checkpoint = nearestDay + (i-6)*adj;
      checkpoints.push(checkpoint);
      if (checkpoint > nowEpoch) {
        this.setStateAsync((state) => ({ nextUpdate: checkpoint }));
        await this.getPosts(checkpoints[i-2], checkpoints[i-1]);
        return;
      }
    }
  }

  async getPosts(start, end) {
    const searchString = `${API_URL}/posts?start=${start}&end=${end}`;
    try {
      const res = await axios.get(searchString);
      res.data = res.data || [];
      await this.setStateAsync((state) => ({ posts: res.data }));
    } catch (err) {
      console.error("Error loading data!");
      await this.setStateAsync((state) => ({ loadError: true }));
    }
  }

  async componentWillMount () {
    await this.updateTimes(window.localStorage.slowHnInterval || 24, window.localStorage.slowHnOffset || 8, window.localStorage.slowHnAnchorDay || 0);
  }


  render() {
    return (
      <BrowserRouter>
      <div>
        <Route path='/' render={(routeProps) => (
          <Header 
            nextUpdate={ this.state.nextUpdate } 
            updateTimes={ this.updateTimes }
            {...routeProps }
          /> )}
        />
        <Switch>
          <Route path='/' exact render={(routeProps) => (
            <Index 
              nextUpdate={ this.state.nextUpdate } 
              posts = { this.state.posts } 
              loadError = { this.state.loadError }
              { ...routeProps } 
            /> )} 
          />
          <Route path='/settings' exact render={(routeProps) => (
            <Settings updateTimes={ this.updateTimes } { ...routeProps } /> )} 
          />
          <Route path='*' component={ NotFound } />
        </Switch>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
