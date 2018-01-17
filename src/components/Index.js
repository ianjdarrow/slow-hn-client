import React from 'react';
import PostList from './PostList';
import Footer from './Footer';

const Index = (props) => {
  return (
    <div>
      <PostList posts={ props.posts } />
      <Footer />
    </div>
  )
}

export default Index;