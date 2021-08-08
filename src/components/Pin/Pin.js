import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';


const Pin = () => {

    const [pinId, setPinId] = useState(null);

    api
    .get('/pins/:id', {

    })
    .then((res) => {

    });


    return (
        <>

        </>
    )
}

export default Pin;