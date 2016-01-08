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

import styles from '../../css/styles.js'

var languageOptions = [
  'English',
  'French',
]

var classifications = ['Teaching', 'Talk', 'Address', 'Message', 'Interaction', 'Longlife']


export default class EntityEvent extends React.Component {


  constructor(props) {
    super(props)
    this.changeLanguage = this.changeLanguage.bind(this);
    this.onDiscard = this.onDiscard.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.closeMessage = this.closeMessage.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.state = {
      title: 'Add Event',
      columns: 5,
      bgcolor: 'bgorange',
      bcolor: 'borange',
      language: eventConfig,
      defaultValues: {},
      edit: this.props.edit,
      openSnacker: false,
      resultMessage: '', 
      discardChanges: false,
      index: 0,
      changeLang: 0,
      data: {},
    }
  }

  componentDidMount() {
    
    if(this.props.edit) {
      socket.emit('r-entity', {
        type: 'event',
        _id: 'AVIRisUFFs21aZysquQ0',
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
    return generateSchema(eventConfig, this.state.defaultValues, (languageOptions[this.state.index]).toLowerCase() , {classification: classifications})

  }

  onSubmit(data) {

    this.setState({index: this.state.index})
    this.refs.myFormRef.reset()

    data.classification  = classifications[data.classification]  
    data.startingDate = +moment(data.startingDate)
    data.endingDate = +moment(data.endingDate)

    this.state.data[(languageOptions[this.state.index]).toLowerCase()] = data
    console.log('Parsed form data', this.state.data);

    if(this.props.edit) {
      socket.emit('u-entity', {type: 'event', _id: 'AVIRisUFFs21aZysquQ0', update: {set: this.language}})
    } 
    else {
      socket.emit('c-entity', {index: 'events', type: 'event', body: this.language})
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

  changeLanguage(event, index, menuItem) {

    if(!this.props.edit) {
      var result = _.remove(_.compact(_.values(this.refs.myFormRef.getValue())), function(field) {
        return !_.isArray(field) || field.length > 0
      })

      if(!result.length) {
        this.setState({
          index: index
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
      var currentValues = this.refs.myFormRef.getValue()
      currentValues['classification'] = classifications[currentValues['classification']]
      currentValues['startingDate'] = +moment(currentValues['startingDate'])
      currentValues['endingDate'] = +moment(currentValues['endingDate'])
      
      if(_.isMatch(this.state.defaultValues, currentValues)) {
        this.setState({index: index})
      }
      else {
        this.setState({discardChanges: true})
      }

    }

  }

  closeMessage() {
    this.setState({openSnacker: false})
  }
  
  handleClose() {
    this.setState({
      discardChanges: false
    }) 
  }

  onDiscard() { 

    this.setState({
      discardChanges: false,
      index: this.state.changeLang,
    })

    this.refs.myFormRef.reset()
  }

  render() {
    var actions = [
      <FlatButton
        label="No"
        secondary={true}
        onTouchTap={this.handleClose} />,
      <FlatButton
        label="Yes"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.onDiscard} />,
    ]

    if(!this.state.edit) {
      var schema = this.schema();
      var ref = 'myFormRef';
      var onSubmit = this.onSubmit;
      var onCancel = this.onCancel
      var formElement = FormGenerator.create(schema, ref, onSubmit, onCancel, true);
    }

    return (
      <WindowHeader title={this.state.title} columns={this.state.columns} bgcolor={this.state.bgcolor} bcolor={this.state.bcolor}>
        <div className="createEntityContainer">
          <div>
            <DropDownMenu onChange={this.changeLanguage} value={this.state.index} disabled={this.state.dropdownDisable} label="Language">
              {languageOptions.map((field, key) => 
                <MenuItem key={key} value={key} primaryText={field}/>
              )}
            </DropDownMenu>
          </div>
          <div>
            {formElement}
          </div>
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
          open={this.state.discardChanges}
          onRequestClose={this.handleClose}>
            Do you want to discard all changes
        </Dialog>

      </WindowHeader>
    )
  }
}

