var React = require('react')
var FlatButton = require('material-ui/lib/raised-button');
var FontIcon = require('material-ui/lib/font-icon')
var TextField = require('material-ui/lib/text-field');

var styles = require('../../css/styles')

var RawVideoList = React.createClass({
  render:function() {
    return (
      <div className="large-7 columns">
        <div className="viewEntity rawVideoList">
          <div className="entityHeader EVHeader">
            <p className="createEntityHeader">Raw Video List</p>
              <FontIcon className="material-icons icon">close</FontIcon>
          </div>
          <div className="headerTitleDiv">
            <p className="headerTitle">4 Raw Video</p>
            <div>
              <FlatButton label="Link"/>
            </div>
          </div>
          <div className="RVLBody">
            <div className="RVLVideo">
              <div className="RVLBodyItem">
                <p className="RVLItemTitle">Front-Cam-KalaChakra-Ladakh-2014.mp4</p>
                <FlatButton label="View" style={styles.RVLbutton}/>
                <FlatButton label="Edit" style={styles.RVLbutton}/>
                <FlatButton label="Unlink" style={styles.RVLbutton}/>
              </div>
              <p className="RVLTime">230MB 00:48:37.57</p>
            </div>
            <div className="RVLVideo">
              <div className="RVLBodyItem">
                <p className="RVLItemTitle">Front-Cam-KalaChakra-Ladakh-2014.mp4</p>
                <FlatButton label="View" style={styles.RVLbutton}/>
                <FlatButton label="Edit" style={styles.RVLbutton}/>
                <FlatButton label="Unlink" style={styles.RVLbutton}/>
              </div>
              <p className="RVLTime">230MB 00:48:37.57</p>
            </div>
            <div className="RVLVideo">
              <div className="RVLBodyItem">
                <p className="RVLItemTitle">Front-Cam-KalaChakra-Ladakh-2014.mp4</p>
                <FlatButton label="View" style={styles.RVLbutton}/>
                <FlatButton label="Edit" style={styles.RVLbutton}/>
                <FlatButton label="Unlink" style={styles.RVLbutton}/>
              </div>
              <p className="RVLTime">230MB 00:48:37.57</p>
            </div>
            <div className="RVLVideo">
              <div className="RVLBodyItem">
                <p className="RVLItemTitle">Front-Cam-KalaChakra-Ladakh-2014.mp4</p>
                <FlatButton label="View" style={styles.RVLbutton}/>
                <FlatButton label="Edit" style={styles.RVLbutton}/>
                <FlatButton label="Unlink" style={styles.RVLbutton}/>
              </div>
              <p className="RVLTime">230MB 00:48:37.57</p>
            </div>
            <div>
              <div className="linkEvent RVLlinks">
                <p className="esName">1 Event</p>
                <p className="linkUnlink">Link</p>
              </div>
              <div className="linkEvent RVLlinks">
                <p className="esName">The 33rd Kalachakra-Ladakh</p>
                <p className="linkUnlink">Unlink</p>
              </div>
              <div className="linkEvent RVLlinks">
                <p className="esName">1 Session</p>
                <p className="linkUnlink">Link</p>
              </div>
              <div className="linkEvent RVLlinks">
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

module.exports = RawVideoList
