import React from 'react';
import Header from './Header';
import PostList from './PostList';

const Index = (props) => {
  return (
    <div>
      <Header nextUpdate={ props.nextUpdate } />
      <PostList posts={ props.posts } />
    </div>
  )
}

export default Index;