import Header from './Header'
import EntityEvent from './EntityEvent'
import SearchResults from './SearchResults'
/*var SessionList = require('./SessionList')
var SearchAndLink = require('./SearchAndLink')
var SearchResults = require('./SearchResults')
var Login = require('./Login')
*/

import React from 'react';
import ReactDOM from 'react-dom';
import RaisedButton from 'material-ui/lib/raised-button';

export default class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      edit: false
    }
  }

  render() {
    return (
      <div>
      <div className="row">
          <Header /> 
          <EntityEvent edit={this.state.edit}/>
      </div>
        <SearchResults />
      </div>
    )
  }
}

