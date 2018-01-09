import React from 'react';

const userURL = (username) => {
  return `https://news.ycombinator.com/user?id=${username}`;
}

const itemURL = (id) => {
  return `https://news.ycombinator.com/item?id=${id}`;
}

function PostList(props) {
  const posts = props.posts;
  const postList = posts.map((post, i) => {
    return (
      <div className='list-item-container' key={ post.id}>
        <div className='list-item-index'><span>{ i+1 }.</span></div>
        <div className='list-item-title'>
           <span><a href={ post.url } className='post-title'>
            { post.title }
          </a></span>
        </div>
        <div className='list-item-details'>
          <span>
            <span className='post-details'>by</span>
            <a href={ userURL(post.by) } className='post-details'>
              {post.by} | 
            </a></span>
            <span>
              <a href={ itemURL(post.id) } className='post-details'>
                 { post.descendants } comments
              </a>
            </span>
        </div>
      </div>
    )
  });
  return (
    <div className='post-list-container'>
      { postList }
    </div>
    )
}

export default PostList;