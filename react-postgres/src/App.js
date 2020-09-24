import React, {useState, useEffect, useCallback} from 'react';
import BlogList from './BlogList'
function App() {

  function deleteBlog() {
    let id = prompt('Enter blog id');
    fetch(`http://localhost:3001/blogs/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        // getBlogs();
      });
  }
  return (
    <div>
      <BlogList />
      <br />
      <br />
      <button onClick={deleteBlog}>Delete blog</button>
    </div>
  );
}
export default App;