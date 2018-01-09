import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import PostList from './components/PostList';

import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
    }
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  async componentDidMount () {
    const now = Math.round((new Date()).getTime() / 1000);
    const res = await axios.get(`http://localhost:4000/posts?start=${now-60*60}&end=${now}`)
    await this.setStateAsync((state) => ({ posts: res.data }));
  }

  render() {
    return (
      <div className="app">
        <Header />
        { <PostList posts={this.state.posts || [] } /> }
      </div>
    );
  }
}

export default App;
