var React = require('react')
var FormGenerator = require('../utils/form-generator')
var FontIcon = require('material-ui/lib/font-icon')
var FlatButton = require('material-ui/lib/flat-button');
var TextField = require('material-ui/lib/text-field')
var Paper = require('material-ui/lib/paper')
var DropDownMenu = require('material-ui/lib/drop-down-menu')
var WindowHeader = require('./WindowHeader')
var eventConfig = require('../formSchema/event.json')
var generateSchema = require('./generateSchema')
var Dialog = require('material-ui/lib/dialog')
var Snackbar = require('material-ui/lib/snackbar')
var moment = require('moment')
var socket = require('../socket')

var styles = require('../../css/styles.js')

var languageOptions = [
  { payload: '1', text: 'English' },
  { payload: '2', text: 'French' },
]

var classifications = ['Teaching', 'Talk', 'Address', 'Message', 'Interaction', 'Longlife']


var EntityEvent = React.createClass({
  getInitialState: function() {
    return {
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
    }
  },

  language: {},

  componentDidMount: function() {
    
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
  },

  schema: function() {
    console.log((languageOptions[this.state.index].text).toLowerCase())
    return generateSchema(eventConfig, this.state.defaultValues, (languageOptions[this.state.index].text).toLowerCase() , {classification: classifications})

  },

  onSubmit: function(data) {

    data.classification  = classifications[data.classification]  
    data.startingDate = +moment(data.startingDate)
    data.endingDate = +moment(data.endingDate)

    this.language[(languageOptions[this.state.index].text).toLowerCase()] = data
    console.log('Parsed form data', this.language);

    if(this.props.edit) {
      socket.emit('u-entity', {type: 'event', _id: 'AVIRisUFFs21aZysquQ0', update: {set: this.language}})
    } 
    else {
      socket.emit('c-entity', {index: 'events', type: 'event', body: this.language})
    }

    this.refs.myFormRef.reset()

    _.forEach(['c-entity.done', 'c-entity.error', 'u-entity.done', 'u-entity.error'], function(entity) {

      socket.on(entity, function(data) {
        this.setState({
          resultMessage: data.message,
          openSnacker: true,
        })

      console.log('pankaj')
      }.bind(this))

    }.bind(this))

  },

  onCancel: function() {

    this.refs.myFormRef.reset()

  },

  changeLanguage: function(event, index, menuItem) {

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

  },

  closeMessage: function() {
    this.setState({openSnacker: false})
  },
  
  handleClose: function() {
    this.setState({
      discardChanges: false
    }) 
  },

  onDiscard: function() { 

    this.setState({
      discardChanges: false,
      index: this.state.changeLang,
    })

    this.refs.myFormRef.reset()
  },

  render: function() {
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
      var formElement = FormGenerator.create(schema, ref, onSubmit,onCancel, true);
    }

    return (
      <WindowHeader title={this.state.title} columns={this.state.columns} bgcolor={this.state.bgcolor} bcolor={this.state.bcolor}>
        <div className="createEntityContainer">
          <div>
            <DropDownMenu menuItems={languageOptions} onChange={this.changeLanguage} selectedIndex={this.state.index} disabled={this.state.dropdownDisable}/>
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
})

module.exports = EntityEvent
