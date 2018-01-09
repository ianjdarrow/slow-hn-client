import React, { Component } from 'react';
import './App.css';
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
    const res = await axios.get("http://localhost:4000/posts?start=0&end=9999999999999")
    console.log(res);
    await this.setStateAsync((state) => ({ posts: res.data }));
  }

  render() {
    return (
      <div className="app">
        { this.state.posts ? <PostList posts={this.state.posts} /> : "loading" }
      </div>
    );
  }
}

export default App;
