import { useState } from 'react';
import { useEffect } from 'react';
import { Paper, Typography } from '@material-ui/core';
import api from '../../config/api';




const Comments = (props) => {



    if (props.comments === null) {
        return null
    } else {

        let listItems = null
        listItems = props.comments.map((comment) =>
            <li style={{width: '100%', height: 'auto', right: '10px'}} className="note" key={comment.id}>
                <Typography className="" variant="subtitle1">{comment.text}</Typography>
                <Typography className="" variant="caption">{comment.created_at}</Typography>
                <Typography className="" variant="caption">{comment.user_name}</Typography>
            </li>
        )
        console.log(props.comments)
        return listItems
    }
    
}


const Note = (props) => {

    const [note, setNote] = useState(null)
    const [comments, setComments] = useState(null)
    const [newCommentText, setNewCommentText] = useState('')




    useEffect(() => {
        api.get('/api/notes/' + props.noteOpen)
        .then(res => {

            setNote(res.data.note[0])
            setComments(res.data.comments)
            
        }).catch(err => console.error(err))

        

    }, [])


    const handleChange = (e) => {
        console.log(e.target)
        setNewCommentText(e.target.value)
    }

    const handleSubmit = (e) => {
        console.log(props.userId)
        e.preventDefault();
        let token = JSON.parse(localStorage.getItem('token'));

        api.post('/api/comments', {
            headers: { Authorization: `Bearer ${JSON.stringify(token)}` },
            comment: {
                text: newCommentText,
                user_id: props.userId,
                note_id: note["id"]
                // date:
            }
        })
        .then(res => {
            // console.log(res.data.comments)
            // setComments(res.data.comments)
        }).catch(err => console.error(err))
        .then(
            setNewCommentText('')
        )

    }



    if (note !==null) {
        return (
            <>
                <Paper style={{ width: '100%', marginBottom: 20, padding: 10 }}>
                    <Typography variant="h5">
                        {note.title}
                    </Typography>

                    <Typography >
                        {note.description}
                    </Typography>


                    <Paper style={{ width: 'auto', marginBottom: 20, padding: 10 }}>
                        <Typography >
                            Comments
                        </Typography>
                        <Comments noteOpen={props.noteOpen} comments={comments}/>
                    </Paper>

                    <form onSubmit={handleSubmit}>
                        <label>
                        <input type="text" value={newCommentText} onChange={handleChange} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </Paper>
            </>
        )
    } else {
        return null
    }
}

export default Note;


// t.text "text"
// t.date "date"
// t.datetime "created_at", precision: 6, null: false
// t.datetime "updated_at", precision: 6, null: false
// t.bigint "note_id"
// t.bigint "user_id"