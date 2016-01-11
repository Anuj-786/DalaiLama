import React from 'react';
import FormGenerator from '../utils/form-generator'
import FlatButton from 'material-ui/lib/flat-button'
import TextField from 'material-ui/lib/text-field'
import DropDownMenu from 'material-ui/lib/DropDownMenu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import WindowHeader from './WindowHeader'
import generateSchema from './generateSchema'
import Dialog from 'material-ui/lib/dialog'
import Snackbar from 'material-ui/lib/snackbar'
import moment from 'moment'
import socket from '../socket'
import _ from 'lodash'

import configs from '../../../../configs'
import styles from '../../css/styles.js'

var languageOptions = [
  'English',
  'French',
]

export default class EditCreateEntity extends React.Component {


  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this);
    this.closeMessage = this.closeMessage.bind(this);
    this.onCancel = this.onCancel.bind(this);
    var refSplit = this.props.windowRef.split('-')//create-entityType OR edit-entityType-entityId
    this.state = {
      title: _.capitalize(refSplit[0]) + ' ' + refSplit[1],
      initialData: this.props.data,
      entityType: refSplit[1],
      formType: refSplit[0],
      _id: refSplit[2],
      columns: 5,
      bgcolor: 'bgorange',
      bcolor: 'borange',
      openSnacker: false,
      resultMessage: '', 
      discardChanges: false
    }
  }

  onSubmit(formData) {

    var finalData = this.sanitizeFormData(formData, this.props.selectedLang)
    
    if(this.props.edit) {
      socket.emit('u-entity', {type: this.state.entityType, _id: this.state._id, update: {set: finalData}})
    } 
    else {
      socket.emit('c-entity', {type: this.state.entityType, body: finalData})
    }

    _.forEach(['c-entity.done', 'c-entity.error', 'u-entity.done', 'u-entity.error'], function(event) {

      socket.on(event, function(data) {
        this.setState({
          resultMessage: data.message,
          openSnacker: true,
        })

      }.bind(this))

    }.bind(this))

    this.refs.myFormRef.reset()
  }
  
  sanitizeFormData(data, lang) {

    var entitySchema = configs.schema[this.state.entityType]
    var result = {[lang] : {}}
    
    //Sanitize date and enum fields in data
    _.keys(data, function(key) {
      var fieldData = data[key]
      if (!fieldData) {
        return
      }
      if (_.isDate(fieldData)) {
        data[key] = +fieldData
      } else {
        var fieldSchema = entitySchema[key]
        
        var enums = fieldSchema[lang] && fieldSchema[lang].enum || fieldSchema.enum
        if (fieldSchema[lang]) {
          data[lang][key] = fieldSchema[lang].enum[fieldData]
        } else {
          data[key] = fieldSchema.enum[fieldData]
        }
      }
    })

    //Copy data to final result within language
    _.keys(data, function(key) {
      
      var fieldSchema = entitySchema[key]
      
      if (data[key] === '') {
        data[key] = null
        return
      }

      if (fieldSchema[lang]) {
        result[lang][key] = data[key]
      } else {
        result[key] = data[key]
      }
    })

    return result
  }
  
  hasUncommittedChanges() {
    var sanitizedFormData = this.sanitize(this.refs.myFormRef.getValue(), this.prop.selectedLang)
    return _.equal(this.state.initialData, sanitizedFormData)
  }

  onCancel() {

    this.refs.myFormRef.reset()

  }

  closeMessage() {
    this.setState({openSnacker: false})
  }
  
  schema() {
    return generateSchema(this.state.entityType, this.state.initialData, this.props.selectedLang.toLowerCase())

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
      <WindowHeader title={this.state.title} columns={this.state.columns} bgcolor={this.state.bgcolor} bcolor={this.state.bcolor} closeWindow={this.props.closeWindow} windowRef = {this.props.ref}>
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
          open={this.props.showDiscardDialogue}
        >
            Do you want to discard all changes
        </Dialog>

      </WindowHeader>
    )
  }
}

