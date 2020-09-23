import React, {useState, useEffect} from 'react';
function App() {
  const [blogs, setBlogs] = useState(false);
  useEffect(() => {
    getBlogs();
  }, []);
  function getBlogs() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setBlogs(data);
      });
  }
  function createBlog() {
    let title= prompt('Enter blog name');
    let content = prompt('Enter blog content');
    fetch('http://localhost:3001/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title, content}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getBlogs();
      });
  }
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
        getBlogs();
      });
  }
  return (
    <div>
      {blogs ? blogs : 'There is no merchant data available'}
      <br />
      <button onClick={createBlog}>Add blog</button>
      <br />
      <button onClick={deleteBlog}>Delete blog</button>
    </div>
  );
}
export default App;