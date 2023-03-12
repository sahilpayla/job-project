import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BlogCard from '../components/BlogCard'



export const Blog = () => {
  const [blogs, setBlogs] = useState([])

  // get blogs 
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get('/api/v1/blog/all-blog')
      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    getAllBlogs();
  }, [])

  return (
    <>
      {blogs
        && blogs.map(blog => (
          <BlogCard
            id={blog?._id}
            isUser={localStorage.getItem("userId") === blog?.user?._id}
            title={blog?.title}
            description={blog?.description}
            image={blog?.image}
            // username={blog?.user?.name}
            time={blog.createdAt}
          />
        ))}
    </>
  )
}
