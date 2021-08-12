import { useState } from 'react';
import { useEffect } from 'react';
import React from "react";



import Note from '../Note/Note';
import api from '../../config/api';

import './Pin.css';
import { Paper, Typography, Button } from '@material-ui/core';



const NotesList = (props) => {

    const [noteList, setNoteList] = useState(null);
    const [noteOpen, setNoteOpen] = useState(null);
    const [composeNote, setComposeNote] = useState(false);
    const [newNoteTitle, setNewNoteTitle] = useState('');
    const [newNoteText, setNewNoteText] = useState('');




    const openNote = (index) => {
        setNoteOpen(index)
    }


    const backClick = () => {
        setNoteOpen(null)
        setComposeNote(false)
    }


    const composeNoteClick = () => {
        setComposeNote(true)
    }


    const handleSubmit = (e) => {

        e.preventDefault();
        let token = JSON.parse(localStorage.getItem('token'));

        api.post('/api/notes', {
            headers: { Authorization: `Bearer ${JSON.stringify(token)}` },
            note: {
                title: newNoteTitle,
                description: newNoteText,
                user_id: props.userId,
                pin_id: props.pinId
            }
        })
        .catch(err => console.error(err))
        .then(
            setNewNoteTitle('')
        )
        .then(
            setNewNoteText('')
        )
        .then(

        )

        setNoteList(noteList)
        setComposeNote(false)
  
    }


    const handleChangeTitle = (e) => {
        setNewNoteTitle(e.target.value)
    }

    const handleChangeText = (e) => {
        setNewNoteText(e.target.value)
    }
    

    


    useEffect(() => {
        api.get('/api/pins/' + props.pinId)
        .then(res => {
            if (Array.isArray(res.data)){
                setNoteList(res.data)
            }
        }).catch(err => console.error(err))

        return () => {
            setNoteList(null);
        };
        
    }, [composeNote, props.pinId])



    if (noteOpen !== null) {


        return (
            <Paper style={{ width: '100%', marginBottom: 20, padding: 10 }}>
                <Note userId={props.userId} noteOpen={noteOpen}/>

                <Button variant="contained" color="secondary" onClick={backClick}>
                    Back
                </Button>
            </Paper>
        )

    } else if (composeNote) {

        return (
            
            <Paper style={{ width: '100%', marginBottom: 20, padding: 10 }}>
                <form onSubmit={handleSubmit}>
                    <label>
                        <input type="text" value={newNoteTitle} onChange={handleChangeTitle} />
                        <input type="text" value={newNoteText} onChange={handleChangeText} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>

                <Button variant="contained" color="secondary" onClick={backClick}>
                    Back
                </Button>
            </Paper>

        )


    } else if (noteList !== null && composeNote === false) {


        let listItems = []

        listItems = noteList.map((note, index) =>
            <li className="note" id={note.id} key={note.id} onClick={() => openNote(note.id)}>
                <Typography className="" variant="h5">{note.title}</Typography>
                <Typography className="date" variant="subtitle2">{note.created_at}</Typography>
            </li>
        )
        
        return (
            <Paper style={{ width: '100%', marginBottom: 20, padding: 10 }}>
                <ul className="listContainer">
                    {listItems}
                </ul>

                <Button variant="contained" color="secondary" onClick={composeNoteClick}>
                    Add Note
                </Button>
            </Paper>
        )

    } else {

        return (
            <>
                <Paper style={{ width: '100%', marginBottom: 20, padding: 10 }}>
                    <p>loading...</p>
                </Paper>
            </>
        )
    }

}




const Pin = (props) => {

    const [pinId, setPinId] = useState(null);

    // This is just set to 1 for testing purposes
    useEffect(() => {
        setPinId(1)
    }, [])
    

    return (
        <>

            <NotesList userId={props.userId} pinId={pinId}/>

        </>
    )
}

export default Pin;