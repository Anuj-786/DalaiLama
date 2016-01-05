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
var Snackbar = require('material-ui/lib/snackbar')
var moment = require('moment')
var socket = require('../socket')

var styles = require('../../css/styles.js')

var filterOptions = [
  { payload: '1', text: 'English' },
  { payload: '2', text: 'Tibtitan' },
]

var classifications = ['Teaching', 'Talk', 'Address', 'message', 'Interaction', 'Longlife']


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
    }
  },

  language: {},

  componentDidMount: function() {
    
    if(this.props.edit) {
      socket.emit('r-entity', {
        type: 'event',
        _id: 'AVIMMh2OFs21aZysquQi',
      })
    }
    socket.on('r-entity.done', function(data) {
      console.log(data.body, data.params.body)
      this.setState({
        defaultValues: data.body,
        edit: false,
      }) 
      console.log(this.state.defaultValues.title)
    }.bind(this))
  },

  schema: function() {
   return generateSchema(eventConfig, this.state.defaultValues, 'french', {classification: classifications})
    /*return {
      title: {
        type: String,
        label: this.state.language.title.label,
        isRequired: true,
        defaultValue: this.state.defaultValues.title || '',
      },
      classifications: {
        type: String,
        enum: classifications,
        label: this.state.language.classification.label,
        defaultValue: this.state.defaultValues.classifications && classifications.indexOf(this.state.defaultValues.classifications) || 1,
      },
      startingDate: {
        type: Date,
        label: this.state.language.startingDate.label,
        defaultValue: this.state.defaultValues.startingDate && moment(this.state.defaultValues.startingDate).toDate() || '',
        isRequired: true,
      },
      endingDate: {
        type: Date,
        label: this.state.language.endingDate.label,
        defaultValue: this.state.defaultValues.endingDate && moment(this.state.defaultValues.endingDate).toDate() || '',
        isRequired: true,
      },
      venue: {
        type: String,
        label: this.state.language.venue.label,
        defaultValue: this.state.defaultValues.venue || '',
        isRequired: true,
      },
      city: {
        type: String,
        label: this.state.language.city.label,
        defaultValue: this.state.defaultValues.city,
        isRequired: true,
      },
      state: {
        type: String,
        label: this.state.language.state.label,
        defaultValue: this.state.defaultValues.state,
        isRequired: true,
      },
      country: {
        type: String,
        label: this.state.language.country.label,
        defaultValue: this.state.defaultValues.country,
        isRequired: true,
      },
      languages: {
        type: [String],
        label: this.state.language.languages.label,
        defaultValue: this.state.defaultValues.languages || [],
        isRequired: true,
      },
      description: {
        type: String,
        label: this.state.language.description.label,
        defaultValue: this.state.defaultValues.description || '',
        multiline: true,
        isRequired: true,
      },
      startingTime: {
        type: 'Time',
        label: this.state.language.startingTime.label,
        defaultValue: this.state.defaultValues.startingTime || '',
        isRequired: true,
      },
      translation: {
        type: String,
        label: this.state.language.translation.label,
        defaultValue: this.state.defaultValues.translation || '',
        isRequired: true,
      },
      keywords: {
        type: [String],
        label: this.state.language.keywords.label,
        defaultValue: this.state.defaultValues.keywords || [],
        isRequired: true,
      },
      publications: {
        type: String,
        label: this.state.language.publications.label,
        defaultValue: this.state.defaultValues.publications || '',
        isRequired: true,
      },
    }*/
  },

  onSubmit: function(data) {

    data.classification  = classifications[data.classification]  
    data.startingDate = +moment(data.startingDate)
    data.endingDate = +moment(data.endingDate)

    this.language['english'] = data
    console.log('Parsed form data', this.language);

    if(this.props.edit) {
      socket.emit('u-entity', {type: 'event', _id: 'AVIMMh2OFs21aZysquQi', update: {set: this.language.english}})
    } 
    else {
      socket.emit('c-entity', {index: 'events', type: 'event', body: this.language.english})
    }
    this.refs.myFormRef.reset()

    socket.on('c-entity.done', function(data) {
      this.setState({
        resultMessage: data.message,
        openSnacker: true,
      })
    }.bind(this))

    socket.on('c-entity.error', function(data) {
      this.setState({
        resultMessage: data.message,
        openSnacker: true,
      })
    }.bind(this))

    socket.on('u-entity.done', function(data) {
      this.setState({
        resultMessage: data.message,
        openSnacker: true,
      })
    }.bind(this))

    socket.on('u-entity.error', function(data) {
      this.setState({
        resultMessage: data.message,
        openSnacker: true,
      })
    }.bind(this))

  },

  onCancel: function() {

    _.compact(_.values(this.refs.myFormRef.getValue())).forEach(function(field, i) {
      if(field === [] && _.isNumber(field)) {
        return false
      }
      else {
        return true
      }
    }) 
     
    this.refs.myFormRef.reset()

  },

  changeLaguage: function(event, index, menuItem) {
  
    console.log(_.values(this.refs.myFormRef.getValue()).compact())
    
  },

  closeMessage: function() {
    this.setState({openSnacker: false})
  },

  render: function() {
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
            <DropDownMenu menuItems={filterOptions} onChange={this.changeLanguage} selectedIndex={this.state.index} disabled={this.state.dropdownDisable}/>
          </div>
          <div>
            {formElement}
          </div>
        </div>
        <Snackbar
          open={this.state.openSnacker}
          message={this.state.resultMessage}
          action="ok"
          onActionTouchTap={this.closeMessage}
          autoHideDuration='5000'
        />
      </WindowHeader>
    )
  }
})

module.exports = EntityEvent
