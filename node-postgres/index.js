const { response } = require('express')
const express = require('express')
const app = express()
const port = 3001

const blog_model = require('./blog_model')
const db = require('./blog_model')

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (req, res) => {
  blog_model.getBlogs()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/blog/:id', (req, res) => {
  blog_model.getBlogByID(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})


app.post('/blogs', (req, res) => {
  blog_model.createBlog(req.body)
  .then(response => {
    console.log(response);
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
    console.log(error);
  })
})

app.delete('/blog/:id', (req, res) => {
  blog_model.deleteBlog(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.listen(port, () => {
  console.log(`app running on port ${port}`);
})