import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import React from "react";



import Note from '../Note/Note';
import api from '../../config/api';

import './Pin.css';
import { Grid, Paper, Typography, Button } from '@material-ui/core';



const NotesList = (props) => {

    const [noteList, setNoteList] = useState(null);
    const [noteOpen, setNoteOpen] = useState(null)




    const openNote = (index) => {
        setNoteOpen(index)
    }


    const backClick = () => {
        setNoteOpen(null)
    }




    const handleClick = () => {
        api
        .get('/api/pins/1')
        .then((res) => {
            console.log(res.data)
        });
    }
    


    useEffect(() => {
        api.get('/api/pins/' + props.pinId)
        .then(res => {
            setNoteList(res.data)
        }).catch(err => console.error(err))

        return () => {
            setNoteList({});
        };
    }, [])



    if (noteOpen === null) {

        if (noteList !== null) {


            let listItems

            listItems = noteList.map((note, index) =>
                <li className="note" id={note.id} key={note.id} onClick={() => openNote(note.id)}>
                    <Typography className="" variant="h5">{note.title}</Typography>
                    <Typography className="date" variant="subtitle2">{note.created_at}</Typography>
                    <Typography className="description" variant="h6">{note.description}</Typography>
                </li>
            )
            
            return (
                <Paper style={{ width: '100%', marginBottom: 20, padding: 10 }}>
                    <ul className="listContainer">
                        {listItems}
                    </ul>

                    <Button variant="contained" color="secondary" onClick={handleClick}>
                        Pin
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

    } else {

        return (
            <Paper style={{ width: '100%', marginBottom: 20, padding: 10 }}>
                <Note userId={props.userId} noteOpen={noteOpen}/>

                <Button variant="contained" color="secondary" onClick={backClick}>
                    Back
                </Button>
            </Paper>
        )

    }

}




const Pin = (props) => {

    const [pinId, setPinId] = useState(1);

    // api
    // .post('/api/notes', {
    //     "title":"another entry",
    //     "user_id":2,
    //     "pin_id":1
    // })
    // .then((res) => {
    //     console.log(res)
    // });



    return (
        <>

            <NotesList userId={props.userId}/>

        </>
    )
}

export default Pin;