import Header from './Header'
import EntityEvent from './EntityEvent'
import SearchResults from './SearchResults'
import Speaker from './Speakers'
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
    this.changeEntity = this.changeEntity.bind(this)
    this.state = {
      edit: false,
      filterOptions: [
        'English',
        'Hindi',
        'Tibtitan',
        'Chinese',
      ],
      entityOptions: [
        'Event' ,
        'Session',
        'Raw Video',
        'Raw Audio',
        'Edited Video',
        'Edited Audio',
      ],
      lang: 1,
      entity: 1,
    }
  }

  changeEntity(e, index, value) {
    this.setState({entity: value})
  }

  render() {
    return (
      <div>
      <div className="row">
          <Header entityOptions={this.state.entityOptions} filterOptions={this.state.filterOptions} lang={this.state.lang} entity={this.state.entity} changeEntity={this.changeEntity}/> 
          {this.state.entityOptions[this.state.entity] === 'Event' && <EntityEvent edit={this.state.edit}/>}
          <Speaker />
      </div>
        <SearchResults />
      </div>
    )
  }
}

