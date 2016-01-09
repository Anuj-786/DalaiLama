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
    this.componentDidMount = this.componentDidMount.bind(this)
    this.state = {
      edit: true,
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
    }
  }

  componentDidMount() {
    socket.on('r-search.done', function(result) {
      console.log(result)
      this.setState({snackerMessage: result.message, openSnacker: true}) 
    }.bind(this))

    socket.on('r-search.error', function(result) {
      console.log(result)
      this.setState({snackerMessage: result.message, openSnacker: true}) 
    }.bind(this))

  }

  changeEntity(e, index, value) {
    this.setState({entity: value})
  }

  closeSnacker() {
    this.setState({openSnacker: false})
  }

  render() {
    return (
      <div>
      <div className="row">
          <Header entityOptions={this.state.entityOptions} filterOptions={this.state.filterOptions} lang={this.state.lang} entity={this.state.entity} changeEntity={this.changeEntity}/> 
          {this.state.entityOptions[this.state.entity] === 'Event' && <EntityEvent edit={this.state.edit}/>}
          {this.state.entityOptions[this.state.entity] === 'Speaker' && <Speaker />}
      </div>
      <ViewEvent />
      <SearchResults />
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

