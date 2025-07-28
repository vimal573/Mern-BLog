const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  if (type === 'PostCreated') {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId } = data;

    const post = posts[postId];
    post.comments.push({ id, content });
  }

  res.send({});
});

app.listen(4002, async () => {
  console.log('Listening on 4002');
  //   try {
  //     const res = await axios.get('http://localhost:4005/events');

  //     for (let event of res.data) {
  //       console.log('Processing event:', event.type);

  //       handleEvent(event.type, event.data);
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
});
