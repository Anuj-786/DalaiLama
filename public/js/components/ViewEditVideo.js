var React = require('react')
var FontIcon = require('material-ui/lib/font-icon')
var FlatButton = require('material-ui/lib/flat-button');

var styles = require('../../css/styles')

var ViewEditVideo = React.createClass({
  render: function() {
    return (
      <div className="large-6 columns">
        <div className="viewEVEntity">
          <div className="entityHeader EVHeader">
            <p className="createEntityHeader">View: Edit Video</p>
            <FontIcon className="material-icons icon">close</FontIcon>
          </div>
          <div className="headerTitleDiv">
            <p className="headerTitle">Front-Cam-Kalachakra-Ladakh-2014.mp4</p>
            <div>
              <FlatButton label="Edit"/>
              <FlatButton label="Archive"/>
            </div>
          </div>
          <div className="eventInfo">
            <p>336MB</p>
            <p>00:46:23</p>
            <p>MP4</p>
            <p>256</p>
            <p>OHHDL</p>
            <p>Tibetan</p>
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
        </div>
      </div>
    )
  }
})

module.exports = ViewEditVideo
