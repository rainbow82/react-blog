import React, {useState, useEffect, useCallback} from 'react'
import NewBlogModal from './Modal'
import useFetchBlogs from './hooks'

const BlogList = () => {
  const { status, blogs } = useFetchBlogs();
  const [blogList, setBlogs] = useState(blogs);

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