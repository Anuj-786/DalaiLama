var React = require('react')
var FlatButton = require('material-ui/lib/raised-button');
var FontIcon = require('material-ui/lib/font-icon')
var TextField = require('material-ui/lib/text-field');
var WindowHeader = require('./WindowHeader')

var styles = require('../../css/styles')

var SessionList = React.createClass({

  getInitialState: function() {
    return {
      title: 'Session List',
      bgcolor: 'bggreen',
      bcolor: 'bgreen',
      columns: 6,
      button: ['Link'],
      subHeader: '4 Session'
    }
  },

  render: function() {
    return (
      <WindowHeader title={this.state.title} columns={this.state.columns} button={this.state.button} subHeader={this.state.subHeader} bgcolor={this.state.bgcolor} bcolor={this.state.bcolor}>
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
      </WindowHeader>
    )
  }
})

module.exports = SessionList
