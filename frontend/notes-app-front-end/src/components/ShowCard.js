import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';



import { connect } from 'react-redux'



class ShowCard extends React.Component {
    constructor() {
        super()
        this.state = {
            card: ''
        }
    }

    handleClick = (note) => {
        console.log(this.state.card.id)
        this.props.history.push(`/notes/edit/${this.state.card.id}`)
    }


    // should i save the individual card im showing into the redux store? or is it ok if its local component state?

    renderCard = (card) => {
        return (
            <div className="ui centered card">
            <div className="content">
                <div className="header">{this.state.card.title}</div>
                <div className="description">
                    {this.state.card.content}
                </div>
            </div>
            <div className="ui small basic icon buttons">
                <button className="ui button" onClick = {() => this.handleClick()}><i className="edit icon"></i></button>
                <button className="ui button" ><i className="close icon"></i></button>
            </div>
        </div>
        )
    }


componentDidMount() {
    const cardId = this.props.match.params.id
    console.log(cardId)
    fetch(`http://localhost:3001/notes/${cardId}`)
    .then(response => response.json())
    .then(response => {
        this.renderCard(response)
        this.setState({
            card : response
        })
    })
}




  render() {
    return (
        <div className="Card">
           {this.renderCard()}
        </div>
    );
  }

};

// const mapStateToProps = (state) =>  {
//     return {
//         note: [state.notes]
//     }
// }
// const mapDispatchToProps =  {
//     hello
// }

export default connect(null, null)(ShowCard);