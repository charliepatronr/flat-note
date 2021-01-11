import React from 'react';
import { connect } from 'react-redux'
import {createNote } from '../actions/createNoteAction'



class NewCard extends React.Component {
    constructor() {
        super() 
        this.state = {
            title : '', 
            content: ''
        }
    }



    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }


    handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            title: this.state.title, 
            content: this.state.content,
            userId:  this.props.auth.id
        }
        const configObj = {
            method: 'POST', 
            headers : {
              'Content-Type' : 'application/json', 
              'Accept' : 'application/json'
            }, 
            body: JSON.stringify(data)
          }
        fetch(`http://localhost:3001/notes`, configObj)
        .then(response => response.json())
        .then(response => {
            this.props.newNote(response)
            this.props.history.push(`/notes/${response.id}`)
        })
    }




  render() {
    return (
        <div className="ui raised very padded text container segment">
            <form className="ui form" onSubmit = {this.handleSubmit}>
                <div className="field">
                    <label>Title</label>
                    <input tyoe='text' name='title' value ={this.state.title} onChange= {this.handleChange}/>
                </div>
                <div className="field">
                    <label>Content</label>
                    <textarea rows="4" name ='content' value ={this.state.content} onChange= {this.handleChange}></textarea>
                </div>
                <button type="submit" className="ui button">Submit</button>
             </form>
        </div>
    );
  }

};

const mapStateToProps = (state) =>  {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
      newNote: noteData => dispatch(createNote(noteData))
    };
  };


export default connect(mapStateToProps, mapDispatchToProps)(NewCard);