import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import axios from 'axios';

import './App.css';

import Index from './components/Index';
import Settings from './components/Settings';

axios.defaults.timeout = 2000;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loadError: false,
      nextUpdate: 0
    }

    this.getPosts = this.getPosts.bind(this);
    this.getTimeList = this.getTimeList.bind(this);
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

  getTimeList(interval, offset) {
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
        this.getPosts(checkpoints[i-2], checkpoints[i-1]);
        this.setStateAsync((state) => ({ nextUpdate: checkpoint }));
        return checkpoint;
      }
    }
  }

  async getPosts(start, end) {
    const searchString = `http://localhost:4000/posts?start=${start}&end=${end}`;
    try {
      const res = await axios.get(searchString);
      await this.setStateAsync((state) => ({ posts: res.data }));
    } catch (err) {
      console.error("Error loading data!");
      await this.setStateAsync((state) => ({ loadError: true }));
    }
  }

  async componentDidMount () {
    const nextUpdate = this.getTimeList(window.localStorage.slowHnInterval || 24, window.localStorage.slowHnOffset || 8);
    this.setState((state) => ({ nextUpdate }));
  }


  render() {
    return (
      <BrowserRouter>
      <div>
        <Route path='/' exact render={(routeProps) => (
          <Index nextUpdate={ this.state.nextUpdate } posts = { this.state.posts } { ...routeProps } /> )} 
        />
        <Route path='/settings' exact render={(routeProps) => (
          <Settings nextUpdate={ this.state.nextUpdate } getTimeList={ this.getTimeList } { ...routeProps } /> )} 
        />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
