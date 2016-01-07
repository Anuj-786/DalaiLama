
import Header from './Header'
/*var SessionList = require('./SessionList')
var EntityEvent = require('./EntityEvent')
var SearchAndLink = require('./SearchAndLink')
var SearchResults = require('./SearchResults')
var Login = require('./Login')
*/

import React from 'react';
import ReactDOM from 'react-dom';
import RaisedButton from 'material-ui/lib/raised-button';

export default class Home extends React.Component {

  render() {
   /* return (
      <div>
        <div className="row">
          <LoginHeader /> 
        </div>
        <div>
          <SearchResults/>
          <SessionList/>
          <EntityEvent edit={this.state.edit}/>
          <SearchAndLink/>
        </div>
      </div>
    );*/
    return (
      <div className="row">
          <Header /> 
      </div>
    )
  }
}

