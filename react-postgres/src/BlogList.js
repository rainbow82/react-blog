import React, {useState, useEffect, useCallback} from 'react'
import NewBlogModal from './Modal'

const BlogList = () => {
  const [blogList, setBlogs] = useState([]);

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
      <NewBlogModal />
    </div>
  )
}

export default BlogList;