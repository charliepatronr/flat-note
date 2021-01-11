import React from 'react';
import { connect } from 'react-redux'
import {editNote} from '../actions/editNoteAction'


// CHANGE EDIT SO ONLY LOGGED IN USER CAN CHANGE THEIR NOTES 

class EditCard extends React.Component {
    constructor() {
        super() 
        this.state = {
            title : '', 
            content: ''
        }
    }

    componentDidMount() {
        const cardId = this.props.match.params.id
        console.log(cardId)
        fetch(`http://localhost:3001/notes/${cardId}`)
        .then(response => response.json())
        .then(response => {
            this.setState({
                id: response.id,
                title : response.title, 
                content: response.content
            })
            console.log(this.state.card)
        })
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
        // why doesnt react components show state automatically and I have to console.log it to prove it changes ????
        // or i have to exit the component and come back to it to see state change
        // console.log(this.state)
    }


    handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            title: this.state.title, 
            content: this.state.content,
        }
        
        const configObj = {
            method: 'PATCH', 
            headers : {
              'Content-Type' : 'application/json', 
              'Accept' : 'application/json'
            }, 
            body: JSON.stringify(data)
          }
        fetch(`http://localhost:3001/notes/${this.state.id}`, configObj)
        .then(response => response.json())
        .then(response => {
            this.props.edited(response)
            this.props.history.push(`/notes/${response.id}`)
        })
        console.log('SUBMITTED FORM')
    }




  render() {
      console.log('ENTERED INDIVIDUAL CARD')
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

// const mapStateToProps = (state) =>  {
//     return {
//         notes: [state.notes]
//     }
// }
const mapDispatchToProps = dispatch => {
    return {
      edited: noteData => dispatch(editNote(noteData))
    };
  };


export default connect(null, mapDispatchToProps)(EditCard);