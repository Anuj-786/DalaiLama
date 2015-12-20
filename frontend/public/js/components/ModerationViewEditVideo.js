var React = require('react')
var FlatButton = require('material-ui/lib/flat-button');
var FontIcon = require('material-ui/lib/font-icon')
var WindowHeader = require('./WindowHeader')

var styles = require('../../css/styles')

var ModerationViewEditVideo = React.createClass({
  getInitialState: function() {
    return {
      title: 'Moderation View: Edited Video',
      columns: 6,
      bgcolor: 'bgorange',
      bcolor: 'borange',
      subHeader: 'Front-Cam-Kalachakra-Ladakh-2014.mp4',
      button: ['Edit', 'Archive']
    }
  },
  render: function() {
    return (
      <WindowHeader title={this.state.title} columns={this.state.columns} bgcolor={this.state.bgcolor} bcolor={this.state.bcolor} subHeader={this.state.subHeader} button={this.state.button}>
        <div className="eventInfo">
          <p>336MB</p>
          <p>00:46:23</p>
          <p>MP4</p>
          <p>256</p>
          <div className="placeLanguage">
            <p>Ladakh</p>
            <FontIcon className="material-icons icon" style={styles.iconsCancelRight}>cancel</FontIcon>
          </div>
          <div className="placeLanguage">
            <p>English</p>
            <FontIcon className="material-icons icon" style={styles.iconsCancelRight}>check</FontIcon>
          </div>
          <p>Kala Chakra, Ladakh, Teaching</p>
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
      </WindowHeader>
    )
  }
})

module.exports = ModerationViewEditVideo
