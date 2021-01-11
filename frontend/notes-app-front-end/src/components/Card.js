import React from 'react';

import { connect } from 'react-redux'
import { deleteNote } from '../actions/deleteNoteAction'



const Card = props => {

    const deleteCard = (id) => {

        const configObj = {
            method : 'DELETE'
          }

        console.log(id)
        fetch(`http://localhost:3001/notes/${id}`, configObj)
        .then(response => response.json())
        .then(response => {
            props.delete(id)
        });
    }
    return (
    <div className="card">
        <div className="content">
            <div className="header">
                {props.note.title}
            </div>
            <div className="description">
                {props.note.content}
            </div>
        </div>
        <div className="ui small basic icon buttons">
            <button className="ui button" onClick = {() => props.showClick(props.note.id)}><i className="expand icon"></i></button>
            <button className="ui button" onClick = {() => props.editClick(props.note.id)}><i className="edit icon"></i></button>
            <button className="ui button" onClick = {() => deleteCard(props.note.id)} ><i className="close icon"></i></button>
        </div>
    </div>
    
  );
};

const mapDispatchToProps = dispatch => {
    return {
      delete: noteData => dispatch(deleteNote(noteData))
    };
  };


export default connect(null, mapDispatchToProps)(Card)

