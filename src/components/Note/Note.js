import { useState } from 'react';
import { useEffect } from 'react';
import { Paper, Typography, Button } from '@material-ui/core';
import api from '../../api/api';
import Comments from '../Comments/Comments';


const Note = (props) => {
  const [note, setNote] = useState(null);
  const [comments, setComments] = useState(null);
  const [refreshComments, setRefreshComments] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');

  const [commentRefresh, setCommentRefresh] = useState(false)
  const toggleCommentRefresh = () => {
    if (commentRefresh === true) {
      setCommentRefresh(false)
    } else {
      setCommentRefresh(true)
    }
  }


  useEffect(() => {
    api
      .get('/api/notes/' + props.noteOpen)
      .then((res) => {
        setNote(res.data.note[0]);
        setComments(res.data.comments);
      })
      .catch((err) => console.error(err));

    setRefreshComments(false);
  }, [refreshComments, commentRefresh, props.noteOpen]);

  const handleChange = (e) => {
    setNewCommentText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let token = JSON.parse(localStorage.getItem('token'));
  
    console.log(token)
    console.log(props.userId)
    api
      .post('/api/comments', {
        headers: { Authorization: `Bearer ${JSON.stringify(token)}` },
        comment: {
          text: newCommentText,
          user_id: props.userId,
          note_id: note['id'],
        },
      })
      .catch((err) => console.error(err))
      .then(setNewCommentText(''));
    setRefreshComments(true);
  };

  if (note !== null && refreshComments === false) {
    return (
      <>
        <Paper style={{ width: '100%', marginBottom: 20, padding: 10 }}>
          <Typography variant="h5">{note.title}</Typography>

          <Typography
            style={{ marginBottom: 20, padding: 30, textAlign: 'left' }}
          >
            {note.description}
          </Typography>

          <Paper style={{ width: 'auto', marginBottom: 20, padding: 10 }}>
            <Typography>Comments</Typography>
            <Comments noteOpen={props.noteOpen}  comments={comments} toggleCommentRefresh={toggleCommentRefresh}/>
            <form
              onSubmit={handleSubmit}
              style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <textarea
                rows="7"
                cols="35"
                value={newCommentText}
                onChange={handleChange}
              ></textarea>

              <Button
                style={{ width: '40%', margin: '10px' }}
                variant="contained"
                color="secondary"
                type="submit"
                value="Submit"
              >
                Submit
              </Button>
            </form>
          </Paper>
        </Paper>
      </>
    );
  } else {
    return null;
  }
};

export default Note;
