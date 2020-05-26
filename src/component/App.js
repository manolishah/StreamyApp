import React from 'react';
import StreamCreate from './streams/StreamCreate';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import Header from './Header';
import history from '../history';
import {Router ,Route as Rout} from 'react-router-dom';

const App = () => {
  return (
    <div className="ui container" >
     <Router history={history}>
        <div>
        <Header />
          <Rout path="/" exact component={StreamList} />
          <Rout path="/stream/new"  component={StreamCreate} />
          <Rout path="/stream/edit/:id"  component={StreamEdit} />
          <Rout path="/stream/delete/:id"  component={StreamDelete} />
          <Rout path="/stream/show"  component={StreamShow} />
        </div>
     </Router>
    </div>
  );
}

export default App;
