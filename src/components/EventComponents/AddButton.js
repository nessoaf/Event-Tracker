import React from 'react';

export default function AddButton(props) {
    const handleAdd = e => {
        console.log('hello from addbutton')
    }
    return (
        <form className="delete-bounty-button" onSubmit={handleAdd}>
            <input type="submit" value="Remove this Bounty" />
        </form>
    )
}