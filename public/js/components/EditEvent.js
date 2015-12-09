var React = require('react')
var FontIcon = require('material-ui/lib/font-icon')
var FlatButton = require('material-ui/lib/flat-button');
var TextField = require('material-ui/lib/text-field')
var DropDownMenu = require('material-ui/lib/drop-down-menu')

var Header = require('./Header')
var styles = require('../../css/styles')

var filterOptions = [
  { payload: '1', text: 'English' },
  { payload: '2', text: 'Hindi' },
  { payload: '3', text: 'Tibtitan' },
  { payload: '4', text: 'Chinese' },
];

var EditEvent = React.createClass({
  render: function() {
    return (
      <div>
        <div className="row">
          <Header />
        </div>
        <div className="row">
          <div className="large-6 columns">
           <div className="createEntity">
            <div className="entityHeader">
              <p className="createEntityHeader">Edit: Edit Video</p>
              <FontIcon className="material-icons icon">close</FontIcon>
            </div>
            <div className="languageSelectorDiv">
              <DropDownMenu menuItems={filterOptions}/>
            </div>
            <div className="headerTitleDiv">
              <p className="headerTitle">Front-Cam-Kalachakra-Ladakh-2014.mp4</p>
              <div>
                <FlatButton label="Archive"/>
              </div>
            </div>
            <div className="entityFields">
              <TextField
                hintText="file name"
                className="inputField"
                floatingLabelText="File Name" /> 
              <TextField
                hintText="file size"
                className="inputField"
                floatingLabelText="File Size" /> 
              <TextField
                hintText="duration"
                className="inputField"
                floatingLabelText="Duration" /> 
              <TextField
                hintText="general bitrate"
                className="inputField"
                floatingLabelText="General Bitrate" /> 
              <TextField
                hintText="video format"
                className="inputField"
                floatingLabelText="Video Format" /> 
              <TextField
                hintText="video codec id"
                className="inputField"
                floatingLabelText="Video Codec ID" /> 
              <TextField
                hintText="location"
                className="inputField"
                floatingLabelText="Location" /> 
              <TextField
                hintText="keywords"
                className="inputField"
                floatingLabelText="Keywords" /> 
              <TextField
                hintText="laguauge"
                className="inputField"
                floatingLabelText="Language" /> 
            </div>
              <div className="subEntityInfo">
                <FlatButton label="Submit" secondary={true} style={styles.subButton}/>
              </div>
              <div className="linkEvent">
                <p className="esName">1 Event</p>
                <p className="linkUnlink">Link</p>
              </div>
              <div className="linkEvent">
                <p className="esName">The 33rd Kalachakra-Ladakh</p>
                <p className="linkUnlink">Unlink</p>
              </div>
              <div className="linkEvent">
                <p className="esName">1 Session</p>
                <p className="linkUnlink">Link</p>
              </div>
              <div className="linkEvent">
                <p className="esName">Session #1 of 30th Kalachakra-Ladakh</p>
                <p className="linkUnlink">Unlink</p>
              </div>
           </div>
          </div>
        </div>
      </div>
    )
  }
})
module.exports = EditEvent
