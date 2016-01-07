import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router'

class App extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );  
  }
}

import Home from './components/Home';

ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
    </Route>
  </Router>
), document.getElementById('test'))

