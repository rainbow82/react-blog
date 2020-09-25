import React, {useState, useCallback, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const NewBlogModal = () => {
  const [blogList, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    getBlogs();
    setOpen(false);
  };

  const getBlogs = useCallback(async () => {
    const result = await fetch (
      'http://localhost:3001'
    );
    if(result.ok) {
      const blogs = await result.json();
      setBlogs(blogs);
    }
  }, []);

  const createBlog = () => {
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

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Create a new blog</h2>
      <form className={classes.root} noValidate autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label htmlFor="title">
          title
          <input
            id="title"
            value={title}
            placeholder="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label htmlFor="content">
          title
          <input
            id="content"
            value={content}
            placeholder="content"
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <Button onClick={createBlog}>Save</Button>
      </form>
    </div>
  );

  return (
    <div>
      <Button type="button" onClick={handleOpen} variant="contained" color="primary">
        New Blog
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

export default NewBlogModal;
