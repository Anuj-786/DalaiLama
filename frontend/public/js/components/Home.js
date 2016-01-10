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

import _ from 'lodash';

export default class Home extends React.Component {

  constructor(props) {
    super(props)
    this.changeEntity = this.changeEntity.bind(this)
    this.changeLanguage = this.changeLanguage.bind(this)
    this.closeWindow = this.closeWindow.bind(this)
    this.onDiscard = this.onDiscard.bind(this)
    this.onCloseDialog = this.onCloseDialog.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.state = {
      edit: false,
      filterOptions: [
        'English',
        'French',
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
      discardChanges: false,
      changeLang: 0, 
      closeEventWindow: false,
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

    if(this.state.entityOptions[value] === 'Event') {
      this.setState({createEvent: true})
      console.log(this.state.createEvent)
    }
    
    this.setState({entity: value})
  }

  closeSnacker() {
    this.setState({openSnacker: false})
  }

  closeWindow(entityType) {
    if(this.state.createEvent) {
      var result = _.remove(_.compact(_.values(this.refs.createEvent.getFormValue())), function(field) {
        return !_.isArray(field) || field.length > 0
      })

      if(_.isEmpty(result)) {
        
        this.setState({createEvent: false})

      }

      else {
        
        this.setState({discardChanges: true, closeEventWindow: true})

      }

    }
    else {
      this.setState({[entityType]: false})
    }
  }

  onDiscard() { 

    this.setState({
      discardChanges: false,
      lang: this.state.changeLang,
    })

    if(this.state.closeEventWindow) {
      
      this.setState({createEvent: false})

    } 

    this.refs.createEvent.onCancel()
  }

  onCloseDialog() {
    this.setState({
      discardChanges: false
    }) 
  }

  changeLanguage(event, index, menuItem) {
    
    if(this.state.createEvent) {
      if(!this.state.edit) {
        var result = _.remove(_.compact(_.values(this.refs.createEvent.getFormValue())), function(field) {
          return !_.isArray(field) || field.length > 0
        })
        console.log(result.length)
        if(!result.length) {
          this.setState({
            lang: index
          })
        } 
        else {
          this.setState({
            discardChanges: true,
            changeLang: index,
          })
        } 
      }
      else {
        var currentValues = this.refs.createEvent.getFormValue()
        currentValues['classification'] = classifications[currentValues['classification']]
        currentValues['startingDate'] = +moment(currentValues['startingDate'])
        currentValues['endingDate'] = +moment(currentValues['endingDate'])
        
        if(_.isMatch(this.refs.createEvent.getDefaultValues(), currentValues)) {
          this.setState({lang: index})
        }
        else {
          this.setState({discardChanges: true})
        }

      }
    }

    this.setState({lang: index})

  }

  render() {
    return (
      <div>
      <div className="row">
          <Header entityOptions={this.state.entityOptions} filterOptions={this.state.filterOptions} lang={this.state.lang} entity={this.state.entity} changeEntity={this.changeEntity} changeLang={this.changeLanguage}/> 
          {this.state.createEvent && <EntityEvent ref="createEvent" edit={this.state.edit} closeWindow={this.closeWindow} lang={this.state.filterOptions[this.state.lang]} discardChanges={this.state.discardChanges} onDiscard={this.onDiscard} onCloseDialog={this.onCloseDialog}/>}
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

