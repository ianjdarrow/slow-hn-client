import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import './App.css';

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
      nextUpdate: 0
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

  async updateTimes(interval, offset) {
    window.localStorage.slowHnInterval = interval;
    window.localStorage.slowHnOffset = offset;
    const now = new Date();
    const [year, month, day, hour] = [now.getFullYear(), now.getMonth(), now.getDate(), now.getHours()];
    const nearestDay = this.toEpochTime(new Date(year, month, day, offset));
    const nearestHour = this.toEpochTime(new Date(year, month, day, hour));
    const adj = interval * 60 * 60;

    let checkpoints = [];
    for(let i=0;i<48;i++) {
      const checkpoint = nearestDay + (i-24)*adj;
      checkpoints.push(checkpoint);
      if (checkpoint > nearestHour) {
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
      await this.setStateAsync((state) => ({ posts: res.data }));
    } catch (err) {
      console.error("Error loading data!");
      await this.setStateAsync((state) => ({ loadError: true }));
    }
  }

  async componentWillMount () {
    this.updateTimes(window.localStorage.slowHnInterval || 24, window.localStorage.slowHnOffset || 8);
  }


  render() {
    return (
      <BrowserRouter>
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
          <Settings nextUpdate={ this.state.nextUpdate } updateTimes={ this.updateTimes } { ...routeProps } /> )} 
        />
        <Route path='*' render={(routeProps) => (
          <NotFound nextUpdate={ this.state.nextUpdate } { ...routeProps } /> )} 
        />
      </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
