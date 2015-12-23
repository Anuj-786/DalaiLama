var React = require('react')
var _ = require('lodash')
var FormGenerator = require('../utils/form-generator')
var FontIcon = require('material-ui/lib/font-icon')
var FlatButton = require('material-ui/lib/flat-button');
var TextField = require('material-ui/lib/text-field')
var DropDownMenu = require('material-ui/lib/drop-down-menu')
var englishLanguage = require('./LanguageJson').english
var tibetanLanguage = require('./LanguageJson').tibetan

var socket = require('../socket');
var styles = require('../../css/styles')

var filterOptions = [
  { payload: '1', text: 'English' },
  { payload: '2', text: 'Tibtitan' },
];

var Example = React.createClass({

  getInitialState: function() {
    return {
      index: 0,
      language: englishLanguage,
      dropDownDisabled: false
    }
  },

  schema: function() {
    return {
      FileName: {
        type: String,
        label: this.state.language.fileName.label,
        placeholder: 'file name',
        isRequired: true
      },
      FileSize: {
        type: Number,
        label: this.state.language.fileSize.label,
        isRequired: true,
        placeholder: 'duration in minutes and seconds',
      },
      Duration: {
        type: Number,
        label: this.state.language.duration.label,
        placeholder: 'duration in minutes and seconds',
      },
      GeneralBitrate: {
        type: String,
        label: this.state.language.generalBitrate.label,
        placeholder: 'bitrate'
      },
      VideoFormat: {
        type: String,
        label: this.state.language.videoFormat.label,
        placeholder: 'Video Format'
      },
      VideoCodecID: {
        type: String,
        label: this.state.language.videoCodecID.label,
        placeholder: 'Video Codec ID'
      },
      Location: {
        type: String,
        label: this.state.language.location.label,
        placeholder: 'location'
      },
      Keywords: {
        type: String,
        label: this.state.language.keywords.label,
        placeholder: 'Keywords'
      },
      Language: {
        type: String,
        label: this.state.language.laguage.label,
        placeholder: 'Language'
      },
    }
  },

  onSubmit: function(data) {

/**
 * Creating an entity
 */

socket.emit('c-entity', {
  index: 'events',
  type: 'event',
  body: {
    title_english: "KalaChakra 2014",
    title_tibetan: "དས་ཀ་འཁར་ལ།",
    speakers: [{
      person: "AVGlWN-6hZb3Opo_wyZk",
      type: "speaker"
    }, {
      speaker: "AVGlXJZbhZb3Opo_wyZo",
      type: "speaker"
    }],
    session: ["AVGlWtJEhZb3Opo_wyZl"]
  }
});

socket.on('c-entity.done', function(data) {
  console.log(data);
})

socket.on('c-entity.error', function(data) {
  console.log(data);
})


/**
 * Code ends here
 */
    console.log('Parsed form data', data);
    // Reset fields back to default values
    console.log(this.refs.myFormRef)
    this.refs.myFormRef.reset();
  },

  changeLaguage: function(event, index, menuItem) {
    if(_.every(this.refs.myFormRef.getValue(), _.isEmpty)){
      if(index === 0){
        this.setState({language: englishLanguage})
      }
      else {
        this.setState({language: tibetanLanguage})
      }
      this.setState({index: index})
    }
    else {
      this.setState({dropdownDisable: true})
    } 
  },
  onCancel:function() {
    this.refs.myFormRef.reset();
  },

  render: function() {

    var schema = this.schema();
    var ref = 'myFormRef';
    var onSubmit = this.onSubmit;
    var onCancel = this.onCancel
    var formElement = FormGenerator.create(schema, ref, onSubmit,onCancel, true);

    return (

      <div className="large-5 columns">
        <div className="createEntity moderationView">
          <div className="entityHeader moderation">
            <p className="createEntityHeader">Add Event</p>
            <FontIcon className="material-icons icon">close</FontIcon>
          </div>
          <div className="languageSelectorDiv">
            <DropDownMenu menuItems={filterOptions} onChange={this.changeLaguage} selectedIndex={this.state.index} disabled={this.state.dropdownDisable}/>
          </div>
          <div className="headerTitleDiv">
            <p className="headerTitle">Front-Cam-Kalachakra-Ladakh-2014.mp4</p>
            <div>
              <FlatButton label="Archive"/>
            </div>
          </div>
          <div className="entityFields">
            {formElement}
          </div>
        </div>
      </div>

    )
  }
})

module.exports = Example
