import Header from './Header'
import EntityEvent from './EntityEvent'
import SearchResults from './SearchResults'
import Snackbar from 'material-ui/lib/snackbar';
import Speaker from './Speakers'
import ViewEvent from './ViewEvent'
import socket from '../socket'
import React from 'react';
import ReactDOM from 'react-dom';
import RaisedButton from 'material-ui/lib/raised-button';

export default class Home extends React.Component {

  constructor(props) {
    super(props)
    this.changeEntity = this.changeEntity.bind(this)
    this.closeWindow = this.closeWindow.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
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
        'Speaker',
      ],
      lang: 1,
      entity: 1,
      openSnacker: false,
      snackerMessage: "",
      searchResults: [],
      createEvent: false,
      viewEvent: true,
      searchResults: true,
    }
  }

  componentDidMount() {
    socket.on('r-search.done', function(result) {
      this.setState({snackerMessage: result.message, openSnacker: true}) 
    }.bind(this))

    socket.on('r-search.error', function(result) {
      this.setState({snackerMessage: result.message, openSnacker: true}) 
    }.bind(this))

  }

  changeEntity(e, index, value) {
    console.log(value, index, e)
    if(this.state.entityOptions[value] === 'Event') {
      this.setState({createEvent: true})
    }
    this.setState({entity: value})
  }

  closeSnacker() {
    this.setState({openSnacker: false})
  }

  closeWindow(entityType) {
    this.setState({[entityType]: false})  
  }

  render() {
    return (
      <div>
      <div className="row">
          <Header entityOptions={this.state.entityOptions} filterOptions={this.state.filterOptions} lang={this.state.lang} entity={this.state.entity} changeEntity={this.changeEntity}/> 
          {this.state.createEvent && <EntityEvent edit={this.state.edit} closeWindow={this.closeWindow}/>}
          {this.state.entityOptions[this.state.entity] === 'Speaker' && <Speaker />}
      </div>
      {this.state.viewEvent && <ViewEvent closeWindow={this.closeWindow}/>}
      {this.state.searchResults && <SearchResults closeWindow={this.closeWindow}/>}
        <Snackbar
          open={this.state.openSnacker}
          message={this.state.snackerMessage}
          action="ok"
          onRequestClose={this.closeSnacker.bind(this)}
          autoHideDuration={5000}
        />
      </div>
    )
  }
}

