var React = require('react')
var FormGenerator = require('form-generator-react')
var FontIcon = require('material-ui/lib/font-icon')
var FlatButton = require('material-ui/lib/flat-button');
var TextField = require('material-ui/lib/text-field')
var DropDownMenu = require('material-ui/lib/drop-down-menu')
var englishLanguage = require('./LanguageJson').tibetan

var styles = require('../../css/styles')

var filterOptions = [
  { payload: '1', text: 'English' },
  { payload: '2', text: 'Tibtitan' },
];

var Example = React.createClass({

  getInitialState: function() {
    return {
      index: 1,
    }
  },

  schema: {
    FileName: {
      type: String,
      label: englishLanguage.fileName.label,
      placeholder: 'file name',
    },
    FileSize: {
      type: Number,
      label: englishLanguage.fileSize.label,
      placeholder: 'duration in minutes and seconds',
    },
    Duration: {
      type: Number,
      label: englishLanguage.duration.label,
      placeholder: 'duration in minutes and seconds',
    },
    GeneralBitrate: {
      type: String,
      label: englishLanguage.generalBitrate.label,
      placeholder: 'bitrate'
    },
    VideoFormat: {
      type: String,
      label: englishLanguage.videoFormat.label,
      placeholder: 'Video Format'
    },
    VideoCodecID: {
      type: String,
      label: englishLanguage.videoCodecID.label,
      placeholder: 'Video Codec ID'
    },
    Location: {
      type: String,
      label: englishLanguage.location.label,
      placeholder: 'location'
    },
    Keywords: {
      type: String,
      label: englishLanguage.keywords.label,
      placeholder: 'Keywords'
    },
    Language: {
      type: String,
      label: englishLanguage.laguage.label,
      placeholder: 'Language'
    },
  },
  
  onSubmit: function(data) {
    console.log('Parsed form data', data);
    // Reset fields back to default values
    this.refs.myFormRef.reset();
  },

  changeLaguage: function(event, index, menuItem) {
    console.log(index, menuItem) 
    this.setState({index: index})
  },
  render: function() {
    var schema = this.schema;
    var ref = 'myFormRef';
    var onSubmit = this.onSubmit;
    var formElement = FormGenerator.create(schema, ref, onSubmit);
    return (
    //return <div>{formElement}</div>
      <div className="large-5 columns">
        <div className="createEntity moderationView">
          <div className="entityHeader moderation">
            <p className="createEntityHeader">Add Event</p>
            <FontIcon className="material-icons icon">close</FontIcon>
          </div>
          <div className="languageSelectorDiv">
            <DropDownMenu menuItems={filterOptions} onChange={this.changeLaguage} selectedIndex={this.state.index}/>
          </div>
          <div className="headerTitleDiv">
            <p className="headerTitle">Front-Cam-Kalachakra-Ladakh-2014.mp4</p>
            <div>
              <FlatButton label="Archive"/>
            </div>
          </div>
          <div className="entityFields">
            {this.state.index}
            <div>{formElement}</div>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = Example
