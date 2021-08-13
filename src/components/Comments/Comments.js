import { useState } from 'react';
import { useEffect } from 'react';
import { Typography, Button } from '@material-ui/core';
import api from '../../api/api';


const DeleteButton =(props) => {
  const [showButton, setShowButton] = useState(false)
  const [deleteButton, setDeleteButton] = useState(false)
  const buttonUser = props.buttonUser
  let token = JSON.parse(localStorage.getItem('token'));

  
  const toggleCommentRefresh = props.toggleCommentRefresh
  useEffect(() => {
    toggleCommentRefresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteButton])
 
  api
    .get('/api/get_user', {
      headers: { Authorization: `Bearer ${JSON.stringify(token)}` },
    })
    .then((res) => {
      if (res.data['loggedin']) {
        if (res.data.user_id === buttonUser) {
          console.log(res.data.user_id)
          setShowButton(true)
        }
      }
    });


    const deleteComment = () => {
      api
      .delete('/api/comments/' + props.commentId, {
        headers: { Authorization: `Bearer ${JSON.stringify(token)}` }
      })
      .then((res) => {
        setDeleteButton(true)
      })
    }
    
    useEffect(() => {

    }, [showButton])

    if (showButton) {
      return (
        <Button style={{ width: '40%', margin: '2px', fontSize: '10px'}}
        variant="contained"
        color="secondary"
        type="submit"
        value="Submit"
        onClick={() => deleteComment()}>
          Delete
        </Button>
      )
    } else {
      return null
    }

}

const Comments = (props) => {

  const toggleCommentRefresh = props.toggleCommentRefresh


  if (props.comments === null) {
    return null;
  } else {
    let listItems = null;
    listItems = props.comments.map((comment) => (
      <li
        style={{
          height: 'auto',
          right: '10px',
          padding: '4px',
          margin: '10px',
        }}
        className="note"
        key={comment.id}
      >
        <Typography
          className=""
          style={{ textAlign: 'left', fontSize: '12px' }}
          variant="subtitle1"
        >
          {comment.user_name + ' says:'}
        </Typography>

        <Typography
          className=""
          style={{ textAlign: 'left' }}
          variant="subtitle1"
        >
          {comment.text}
        </Typography>

        <Typography className="" variant="caption">
          {comment.created_at}
        </Typography>

        <DeleteButton commentId={comment.id} buttonUser={props.commentUser} toggleCommentRefresh={toggleCommentRefresh}/>
      </li>
    ));

    return listItems;
  }
};

export default Comments;