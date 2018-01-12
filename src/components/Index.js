import React from 'react';
import Header from './Header';
import PostList from './PostList';
import Footer from './Footer';

const Index = (props) => {
  return (
    <div>
      <Header nextUpdate={ props.nextUpdate } />
      <PostList posts={ props.posts } />
      <Footer />
    </div>
  )
}

export default Index;