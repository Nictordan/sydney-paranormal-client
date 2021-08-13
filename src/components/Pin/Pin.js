import { useState } from 'react';
import { useEffect } from 'react';
import React from 'react';

import { BrowserRouter as Switch, Route, useParams } from 'react-router-dom';

import Note from '../Note/Note';
import api from '../../api/api';


import './Pin.css';
import { Paper, Typography, Button, TextField, Grid } from '@material-ui/core';

const NotesList = (props) => {
  let { id } = useParams()
  let pinId = id
  const { userId } = props
  const [noteList, setNoteList] = useState(null);
  const [noteOpen, setNoteOpen] = useState(null);
  const [composeNote, setComposeNote] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteText, setNewNoteText] = useState('');

  const openNote = (index) => {
    setNoteOpen(index);
  };

  const backClick = () => {
    setNoteOpen(null);
    setComposeNote(false);
  };

  const composeNoteClick = () => {
    setComposeNote(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let token = JSON.parse(localStorage.getItem('token'));
    api
      .post('/api/notes', {
        headers: { Authorization: `Bearer ${JSON.stringify(token)}` },
        note: {
          title: newNoteTitle,
          description: newNoteText,
          user_id: userId,
          pin_id: pinId,
        },
      })
      .catch((err) => console.error(err))
      .then(setNewNoteTitle(''))
      .then(setNewNoteText(''))
      .then(
        api
          .get('/api/pin_notes/' + pinId)
          .then((res) => {
            if (Array.isArray(res.data)) {
              setNoteList(res.data);
            }
          })
          .catch((err) => console.error(err))
      );

    setComposeNote(false);

    return () => {
      setNoteList(null);
    };

  };

  const handleChangeTitle = (e) => {
    setNewNoteTitle(e.target.value);
  };

  const handleChangeText = (e) => {
    setNewNoteText(e.target.value);
  };

  useEffect(() => {
    api
      .get('/api/pin_notes/' + pinId)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setNoteList(res.data);
        }
      })
      .catch((err) => console.error(err))

    return () => {
      setNoteList(null);
    };

  }, [composeNote, pinId]);

  if (noteOpen !== null) {
    return (
      <Paper style={{ width: '100%', marginBottom: 20, padding: 10 }}>
        <Note userId={props.userId} noteOpen={noteOpen} />

        <Button variant="contained" color="secondary" onClick={backClick}>
          Back
        </Button>
      </Paper>
    );
  } else if (composeNote) {
    return (
      <Grid container justifyContent="center" xs={11}>
        <Paper className="pin-container" style={{ width: '100%', marginBottom: 20, padding: 10 }}>
          <form className="noteform" onSubmit={handleSubmit}>
            <TextField
              className="textfield"
              variant="outlined"
              color="primary"
              label="Title"
              type="text"
              value={newNoteTitle}
              onChange={handleChangeTitle}
            />

            <TextField
              className="textfield"
              variant="outlined"
              color="primary"
              minRows="5"
              label="Description"
              multiline="true"
              type="text"
              value={newNoteText}
              onChange={handleChangeText}
            />

            <Button type="submit" variant="contained" color="secondary">Submit</Button>

          </form>

          <Button variant="contained" color="secondary" onClick={backClick}>
            Back
          </Button>
        </Paper>
      </Grid>


    );
  } else if (noteList !== null && composeNote === false) {
    let listItems = [];

    listItems = noteList.map((note, index) => (
      <li
        className="note"
        id={note.id}
        key={note.id}
        onClick={() => openNote(note.id)}
      >
        <Typography className="" variant="h5">
          {note.title}
        </Typography>
        <Typography className="date" variant="subtitle2">
          {note.created_at}
        </Typography>
      </li>
    ));

    return (
      <Paper style={{ width: '100%', marginBottom: 20, padding: 10 }}>
        <ul className="listContainer">{listItems}</ul>

        <Button
          variant="contained"
          color="secondary"
          onClick={composeNoteClick}
        >
          Add Note
        </Button>
      </Paper>
    );
  } else {
    return (
      <>
        <Paper style={{ width: '100%', marginBottom: 20, padding: 10 }}>
          <p>loading...</p>
        </Paper>
      </>
    );
  }
};

const Pin = (props) => {
  const { userId } = props



  return (
    <>
      <Switch>
        <Route path="/pins/:id">
          <NotesList userId={userId} />
        </Route>
      </Switch>
    </>
  );
};

export default Pin;
