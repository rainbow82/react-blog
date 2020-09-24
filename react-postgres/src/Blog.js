import React from 'react';

const Blog = ({title, body, comments}) => {

  return(
    <div>
      <h1>{title}</h1>
      <p>{body}</p>
      <p>{comments}</p>
    </div>
  )
}

export default Blog;