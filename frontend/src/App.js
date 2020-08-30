import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navigation from './components/Navigation';
import NoteList from './components/NoteList';
import CreateNote from './components/CreateNote';
import CreateUser from './components/CreateUser';


function App() {
  return (
    <Router>
    <Navigation/>
    <div className="container p-4">
    <Route exact path="/" component={NoteList}/>
    <Route exact path="/edit/:id" component={CreateNote}/>
    <Route exact path="/create" component={CreateNote}/>
    <Route exact path="/user" component={CreateUser}/>
    </div>


    </Router>
  );
}

export default App;
