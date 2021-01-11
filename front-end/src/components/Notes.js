import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CardContainer from './CardContainer';
import EditCard from './EditCard'
import ShowCard from './ShowCard'
import NewCard from './NewCard'



class Notes extends React.Component {




  render() {
    return (
        <div >
            <Switch>
                <Route path='/notes/edit/:id' component={EditCard} />
                <Route path='/notes/new' component={NewCard} />
                <Route path='/notes/:id' component={ShowCard} />
                <Route path='/notes' component ={CardContainer} />
            </Switch>
        </div>

    );
  }

};


export default Notes;