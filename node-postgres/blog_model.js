const { request } = require('express');

const Pool = require('pg').Pool
//this is bad, don't do this in prod. very bad
const pool = new Pool({
  user: 'my_dev',
  host: 'localhost',
  database: 'postgres',
  password: 'password',
  port: 5433,
});

const getBlogs = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM blogs ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  })
}

const getBlogByID = (id) => {
  return new Promise(function(resolve, reject) {
    const blogId = id
    pool.query('SELECT * FROM blogs WHERE id = $1', [blogId], (error, results) => {
      if (error) {
        console.log('THERE WAS AN ERROR' + error);
        reject(error)
      }
      resolve(results.rows);
    })
  })
}

const createBlog = (body) => {
  return new Promise(function(resolve, reject) {
    const { title, content } = body
    pool.query('INSERT INTO blogs (title, content) VALUES ($1, $2) RETURNING *', [title, content], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new blog has been added added: ${results.rows[0]}`)
    })
  })
}

const deleteBlog = (id) => {
  return new Promise(function(resolve, reject) {
    const blogId = id
    pool.query('DELETE FROM blogs WHERE id = $1', [blogId], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Blog deleted with ID: ${id}`)
    })
  })
}

module.exports = {
  getBlogs,
  getBlogByID,
  createBlog,
  deleteBlog,
}
