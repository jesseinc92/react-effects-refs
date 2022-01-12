import React from 'react';


const Card = ({ value, suit }) => {
    return (
        <div className='Card'>
            <h1>{value} of {suit}</h1>
        </div>
    )
};


export default Card;