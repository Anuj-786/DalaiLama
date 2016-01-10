import React from 'react';
import FormGenerator from '../utils/form-generator'
import FlatButton from 'material-ui/lib/flat-button'
import TextField from 'material-ui/lib/text-field'
import DropDownMenu from 'material-ui/lib/DropDownMenu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import WindowHeader from './WindowHeader'
import eventConfig from '../formSchema/event.json'
import generateSchema from './generateSchema'
import Dialog from 'material-ui/lib/dialog'
import Snackbar from 'material-ui/lib/snackbar'
import moment from 'moment'
import socket from '../socket'
import _ from 'lodash'

import styles from '../../css/styles.js'

var languageOptions = [
  'English',
  'French',
]

var classifications = ['Teaching', 'Talk', 'Address', 'Message', 'Interaction', 'Longlife']


export default class EntityEvent extends React.Component {


  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this);
    this.closeMessage = this.closeMessage.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      title: 'Add Event',
      columns: 5,
      bgcolor: 'bgorange',
      bcolor: 'borange',
      defaultValues: {},
      edit: this.props.edit,
      openSnacker: false,
      resultMessage: '', 
      discardChanges: false,
      data: {},
    }
  }

  componentDidMount() {
    
    if(this.props.edit) {
      socket.emit('r-entity', {
        type: 'event',
        _id: 'AVIhWIcqFs21aZysquSm',
      })
    }
    socket.on('r-entity.done', function(data) {

      this.setState({
        defaultValues: data.body,
        edit: false,
      }) 
    }.bind(this))
  }

  schema() {
    return generateSchema(eventConfig, this.state.defaultValues.english || this.state.defaultValues, this.props.lang.toLowerCase(), {classification: classifications})

  }

  getFormValue() {
    return this.refs.myFormRef.getValue()
  }

  getDefaultValues() {
    return this.state.defaultValues  
  }

  onSubmit(data) {

    this.setState({defaultValues: {}})
    data.classification  = classifications[data.classification]  
    data.startingDate = +moment(data.startingDate)
    data.endingDate = +moment(data.endingDate)

    this.state.data[this.props.lang.toLowerCase()] = data

    if(this.props.edit) {
      socket.emit('u-entity', {type: 'event', _id: 'AVIRisUFFs21aZysquQ0', update: {set: this.state.data}})
    } 
    else {
      socket.emit('c-entity', {index: 'events', type: 'event', body: this.state.data})
    }


    _.forEach(['c-entity.done', 'c-entity.error', 'u-entity.done', 'u-entity.error'], function(entity) {

      socket.on(entity, function(data) {
        this.setState({
          resultMessage: data.message,
          openSnacker: true,
        })

      }.bind(this))

    }.bind(this))

    this.refs.myFormRef.reset()
  }

  onCancel() {

    this.refs.myFormRef.reset()

  }

  closeMessage() {
    this.setState({openSnacker: false})
  }
  
  render() {
    var actions = [
      <FlatButton
        label="No"
        secondary={true}
        onTouchTap={this.props.onCloseDialog} />,
      <FlatButton
        label="Yes"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.props.onDiscard} />,
    ]

    if(!this.state.edit) {
      var schema = this.schema();
      var ref = 'myFormRef';
      var onSubmit = this.onSubmit;
      var onCancel = this.onCancel
      var formElement = FormGenerator.create(schema, ref, onSubmit, onCancel, true, this.props.edit);
    }

    return (
      <WindowHeader title={this.state.title} columns={this.state.columns} bgcolor={this.state.bgcolor} bcolor={this.state.bcolor} closeWindow={this.props.closeWindow} entityType="createEvent">
        <div className="createEntityContainer">
          {formElement}
        </div>
        <Snackbar
          open={this.state.openSnacker}
          message={this.state.resultMessage}
          action="ok"
          onRequestClose={this.closeMessage}
          autoHideDuration={3000}
        />
        <Dialog
          title="Discard Changes"
          actions={actions}
          modal={false}
          open={this.props.discardChanges}
          onRequestClose={this.handleClose}>
            Do you want to discard all changes
        </Dialog>

      </WindowHeader>
    )
  }
}

