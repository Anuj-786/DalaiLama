import React from 'react';
import FlatButton from 'material-ui/lib/flat-button'
import TextField from 'material-ui/lib/text-field'
import DropDownMenu from 'material-ui/lib/DropDownMenu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import WindowHeader from './WindowHeader'
import Dialog from 'material-ui/lib/dialog'
import moment from 'moment'
import _ from 'lodash'

import generateSchema from '../utils/generateSchema'
import socket from '../socket'
import FormGenerator from '../utils/form-generator'
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
    console.log(this.props.data)
    this.state = {
      title: _.capitalize(refSplit[0]) + ' ' + refSplit[1],
      initialData: this.props.data || {},
      entityType: refSplit[1],
      formType: refSplit[0],
      windowRef: null,
      columns: 5,
      bgcolor: 'bgorange',
      bcolor: 'borange',
      resultMessage: '', 
      discardChanges: false
    }
  }

  componentWillReceiveProps(nextProps) {
    
    var refSplit = nextProps.windowRef.split('-')//create-entityType OR edit-entityType-entityId
    this.setState({
      title: _.capitalize(refSplit[0]) + ' ' + refSplit[1],
      entityType: refSplit[1],
      formType: refSplit[0],
      windowRef: nextProps.windowRef 
    })
  }

  onSubmit(formData) {

    var finalData = this.sanitizeFormData(formData, this.props.selectedLang)
    
    if(this.props.edit) {

      var refSplit = this.props.windowRef.split('-')


      socket.emit('u-entity', {type: this.state.entityType, _id: refSplit[4], update: {set: finalData}})
    } 
    else {
      socket.emit('c-entity', {type: this.state.entityType, body: finalData})
    }

    this.refs.myFormRef.reset()
    this.refs.myFormRef.reset()
  }
  
  sanitizeFormData(data, lang) {
    if (!data || !_.chain(data).values().compact().without(undefined, null).flatten().value().length) {
      return {}
    }
    lang = lang.toLowerCase()
    var entitySchema = configs.schema[this.state.entityType]
    var result = {[lang] : {}}
    
    //Sanitize date and enum fields in data
    _.keys(data).forEach(function(key) {
      var fieldData = data[key]
      if (!fieldData) {
        return
      }
      if (_.isDate(fieldData)) {
        data[key] = +fieldData
      } 

      var fieldSchema = entitySchema[key]
      
      var enums = fieldSchema[lang] && fieldSchema[lang].enum || fieldSchema.enum
      if (enums) {
        data[key] = enums[fieldData]
      }
      
    })

    //Copy data to final result within language
    _.keys(data).forEach(function(key) {
      
      var fieldSchema = entitySchema[key]
      if (data[key] === '' || _.isArray(data[key]) && !data[key].length) {
        return
      }

      if (fieldSchema[lang] && fieldSchema.type !== Date) {
        result[lang][key] = data[key]
      } else {
        result[key] = data[key]
      }
    })
    return result
  }
  
  hasUncommittedChanges() {
   
    var sanitizedFormData = this.sanitizeFormData(this.refs.myFormRef.getValue(), this.props.selectedLang)

    return !_.isEqual(this.state.initialData, sanitizedFormData)
  }

  onCancel() {

    this.refs.myFormRef.reset()
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
      var formElement = FormGenerator.create(schema, ref, onSubmit, onCancel, true, false);
    }

    return (
      <WindowHeader title={this.state.title} columns={this.state.columns} bgcolor={this.state.bgcolor} bcolor={this.state.bcolor} closeWindow={this.props.closeWindow} windowRef={this.state.windowRef || this.props.windowRef}>
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

