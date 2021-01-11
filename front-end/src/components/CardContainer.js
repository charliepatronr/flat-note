import React from 'react';
import Card from './Card';
import EditCard from './EditCard'
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter, useLocation} from 'react-router-dom';
import { fetchNotes } from '../actions/notesAction'
import { currentUser } from '../actions/auth'


import { connect } from 'react-redux'



class CardContainer extends React.Component {
    constructor() {
        super()
        this.state = {
            cards : []
        }
    }

    retrieveNotes = () => {

        fetch(`http://localhost:3001/notes`)
        .then(response => response.json())
        .then(response => {
            this.props.fetchNotes(response)
        })
    }

    componentDidMount() {
        let token
        if(this.props.location.search.split('=')[1]){
            token = this.props.location.search.split('=')[1]
            localStorage.setItem('app_token', token)
        } else {
            token = localStorage.getItem('app_token')
        }
        console.log(token)
        if(!token){
            token = this.props.location.search.split('=')[1]
            this.props.history.push('/login')
        }else {
            const reqObj = {
                method: 'GET', 
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            fetch(`http://localhost:3001/current_user`, reqObj)
            .then(response => response.json())
            .then(response => {
                if(response.error){
                    this.props.history.push('/login')
                } else {
                    console.log(response)
                    this.props.currentUser(response)
                    this.retrieveNotes()
                }

            })

        }
    }

    handleClick = (note) => {
        this.props.history.push(`/notes/edit/${note}`)
    }

    showClick = (note) => {
        this.props.history.push(`/notes/${note}`)
    }



    renderCards = () => {
        return this.props.notes.map((note, idx) => {
            return <Card key = {idx} note= {note} editClick={this.handleClick} showClick = {this.showClick}/>
        })
    }


  render() {
      console.log(this.props)
    return (
        <div className="Cards">
            <div className="ui special cards">
                {this.renderCards()}
            </div>
        </div>

    );
  }

};

const mapStateToProps = (state) =>  {
    return {
        notes: [...state.notes], 
        auth: state.auth
    }
}
const mapDispatchToProps =  {
   fetchNotes, 
   currentUser
}

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer);