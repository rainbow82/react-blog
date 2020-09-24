import React, {useState, useEffect, useCallback} from 'react'
import Modal from './Modal'
import useModal from './useModal'

const BlogList = () => {
  const [blogList, setBlogs] = useState([]);
  const {isShowing, toggle} = useModal();

  const getBlogs = useCallback(async () => {
    const result = await fetch (
      'http://localhost:3001'
    );
    if(result.ok) {
      const blogs = await result.json();
      setBlogs(blogs);
    }
  }, []);

  useEffect(() => {
    getBlogs();
  }, []);

  const createBlog = () => {
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

  return (
    <div>
      <div>
        {blogList.map((blog, index) => (
          <h1
            key={index}
          >
            {blog.title}
          </h1>
        ))}
      </div>
      <button className="button-default" onClick={toggle}>Show Modal</button>
      <Modal
        isShowing={isShowing}
        hide={toggle}
        createBlog={createBlog}
      />
    </div>
  )
}

export default BlogList;