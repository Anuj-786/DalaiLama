var React = require('react')
var FormGenerator = require('../utils/form-generator')
var FontIcon = require('material-ui/lib/font-icon')
var FlatButton = require('material-ui/lib/flat-button');
var TextField = require('material-ui/lib/text-field')
var Paper = require('material-ui/lib/paper')
var DropDownMenu = require('material-ui/lib/drop-down-menu')
var WindowHeader = require('./WindowHeader')
var entityEventEnglish = require('./LanguageJson').entityEventEnglish

var styles = require('../../css/styles.js')

var filterOptions = [
  { payload: '1', text: 'English' },
  { payload: '2', text: 'Tibtitan' },
]

var EntityEvent = React.createClass({
  getInitialState: function() {
    return {
      title: 'Add Event',
      columns: 5,
      bgcolor: 'bgorange',
      bcolor: 'borange',
      language: entityEventEnglish
    }
  },

  schema: function() {
    return {
      title: {
        type: String,
        label: this.state.language.title.label,
        isRequired: true 
      },
      classifications: {
        type: String,
        enum: ['Teaching', 'Talk', 'Address', 'message', 'Interaction', 'Longlife'],
        label: this.state.language.classification.label,
        defaultValue: 1,
      },
      startingDate: {
        type: Date,
        label: this.state.language.startingDate.label,
        defaultValue: '1212, 12, 12',
        isRequired: true,
      },
      endingDate: {
        type: Date,
        label: this.state.language.endingDate.label,
        defaultValue: '1212, 12, 12',
        isRequired: true,
      },
      venue: {
        type: String,
        label: this.state.language.venue.label,
        isRequired: true,
      },
      city: {
        type: String,
        label: this.state.language.city.label,
        isRequired: true,
      },
      state: {
        type: String,
        label: this.state.language.state.label,
        isRequired: true,
      },
      country: {
        type: String,
        label: this.state.language.country.label,
        isRequired: true,
      },
      languages: {
        type: [String],
        label: this.state.language.languages.label,
        defaultValue: [],
        isRequired: true,
      },
      description: {
        type: String,
        label: this.state.language.description.label,
        multiline: true,
        isRequired: true,
      },
      startingTime: {
        type: 'Time',
        label: this.state.language.startingTime.label,
        isRequired: true,
      },
      speakers: {
        type: [String],
        label: this.state.language.speakers.label,
        defaultValue: [],
        isRequired: true,
      },
      translation: {
        type: String,
        label: this.state.language.translation.label,
        isRequired: true,
      },
      sessions: {
        type: [String],
        label: this.state.language.sessions.label,
        defaultValue: [],
        isRequired: true,
      },
      keywords: {
        type: [String],
        label: this.state.language.keywords.label,
        defaultValue: [],
        isRequired: true,
      },
      publications: {
        type: String,
        label: this.state.language.publications.label,
        isRequired: true,
      },
    }
  },

  onSubmit: function(data) {
    console.log('Parsed form data', data);
    // Reset fields back to default values
    console.log(this.refs.myFormRef)
    this.refs.myFormRef.reset();
  },

  onCancel: function() {
  
    this.refs.myFormRef.reset();

  },

  render: function() {
    var schema = this.schema();
    var ref = 'myFormRef';
    var onSubmit = this.onSubmit;
    var onCancel = this.onCancel
    var formElement = FormGenerator.create(schema, ref, onSubmit,onCancel, true);

    return (
      <WindowHeader title={this.state.title} columns={this.state.columns} bgcolor={this.state.bgcolor} bcolor={this.state.bcolor}>
        <div className="createEntityContainer">
          <div>
            <DropDownMenu menuItems={filterOptions} onChange={this.changeLaguage} selectedIndex={this.state.index} disabled={this.state.dropdownDisable}/>
          </div>
          <div>
            {formElement}
          </div>
        </div>
      </WindowHeader>
    )
  }
})

module.exports = EntityEvent
