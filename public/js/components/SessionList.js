var React = require('react')
var FlatButton = require('material-ui/lib/raised-button');
var FontIcon = require('material-ui/lib/font-icon')
var TextField = require('material-ui/lib/text-field');

var styles = require('../../css/styles')

var SessionList = React.createClass({
  render: function() {
    return (
     <div className="large-7 columns">
        <div className="viewEntity rawVideoList">
          <div className="entityHeader EVHeader">
            <p className="createEntityHeader">Session List</p>
              <FontIcon className="material-icons icon">close</FontIcon>
          </div>
          <div className="headerTitleDiv">
            <p className="headerTitle">4 Session</p>
            <div>
              <FlatButton label="Link"/>
            </div>
          </div>
          <div className="RVLBody">
            <div className="RVLVideo">
              <div className="RVLBodyItem">
                <p className="RVLItemTitle">Session #1</p>
                <FlatButton label="Edit" style={styles.RVLbutton}/>
                <FlatButton label="Unlink" style={styles.RVLbutton}/>
              </div>
              <p className="RVLTime">Ladakh Teaching 3 July 2014</p>
            </div>
            <div className="RVLVideo">
              <div className="RVLBodyItem">
                <p className="RVLItemTitle">Session #2</p>
                <FlatButton label="Edit" style={styles.RVLbutton}/>
                <FlatButton label="Unlink" style={styles.RVLbutton}/>
              </div>
              <p className="RVLTime">Ladakh Teaching 3 July 2014</p>
            </div>
            <div className="RVLVideo">
              <div className="RVLBodyItem">
                <p className="RVLItemTitle">Session #3</p>
                <FlatButton label="Edit" style={styles.RVLbutton}/>
                <FlatButton label="Unlink" style={styles.RVLbutton}/>
              </div>
              <p className="RVLTime">Ladakh Teaching 3 July 2014</p>
            </div>
            <div className="RVLVideo">
              <div className="RVLBodyItem">
                <p className="RVLItemTitle">Session #4</p>
                <FlatButton label="Edit" style={styles.RVLbutton}/>
                <FlatButton label="Unlink" style={styles.RVLbutton}/>
              </div>
              <p className="RVLTime">Ladakh Teaching 3 July 2014</p>
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
            </div>
            <div className="SVLink">
             <div className="dataLinks">
              <p className="esName dataLink">4 Raw Video</p>
              <FlatButton label="Link"/>
             </div>
             <div className="dataLinks">
              <p className="esName dataLink">4 Raw Audio</p>
              <FlatButton label="Link"/>
             </div>
             <div className="dataLinks">
              <p className="esName dataLink">4 Edited Video</p>
              <FlatButton label="Link"/>
             </div>
             <div className="dataLinks">
              <p className="esName dataLink">4 Edited Video</p>
              <FlatButton label="Link"/>
             </div>
             <div className="dataLinks">
              <p className="esName dataLink">4 Photos</p>
              <FlatButton label="Link"/>
             </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = SessionList
