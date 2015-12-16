var React = require('react')
var RaisedButton = require('material-ui/lib/raised-button');
var FontIcon = require('material-ui/lib/font-icon')
var TextField = require('material-ui/lib/text-field');

var styles = require('../../css/styles')

var ModerationViewComment = React.createClass({
  render: function() {
    return (
      <div className="large-5 columns">
        <div className="viewEntity moderationView">
          <div className="entityHeader moderation">
            <p className="createEntityHeader">Moderation View: Comment</p>
              <FontIcon className="material-icons icon">close</FontIcon>
          </div>
          <div className="headerTitleDiv">
            <p className="headerTitle">Front-Cam-Kalachakra-Ladakh-2014.mp4</p>
          </div>
          <div className="editorNameTime">
            <p>Edited By John at 08:09 AM</p>
          </div>
          <div className="commentBoxDiv">
            <TextField
              hintText="Please correct Respective Location and Language"
              floatingLabelText="Comment"
              style={styles.commentField}
              multiLine={true} />
          </div>
          <div className="buttonApprUnappr">
            <RaisedButton label="Unapprove" style={styles.mcunapprove} className='mc'/>
            <RaisedButton label="Approve" style={styles.mcapprove}/>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = ModerationViewComment
