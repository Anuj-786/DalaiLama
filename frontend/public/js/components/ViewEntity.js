import React from 'react'
import FlatButton from 'material-ui/lib/flat-button';
import List from 'material-ui/lib/lists/list';
import Divider from 'material-ui/lib/divider';
import ListItem from 'material-ui/lib/lists/list-item';
import FontIcon from 'material-ui/lib/font-icon'
import IconButton from 'material-ui/lib/icon-button';
import WindowHeader from './WindowHeader'
import configs from '../../../../configs'
import styles from '../../css/styles'

export default class ViewEvent extends React.Component {

  constructor(props) {
    super(props)
    this.componentDidMount = this.componentDidMount.bind(this)
    var refSplit= this.props.windowRef.split('-')
    var primaryField = configs.web.read[refSplit[1]].primaryField || 'title' 
    this.state = {
      title: _.capitalize(refSplit[0]) + ': ' + _.capitalize(refSplit[1]),
      lang: this.props.selectedLang,
      data: this.props.data,
      formType: refSplit[0],
      entityType: refSplit[1],
      columns: 8,
      bgcolor: 'bggreen',
      bcolor: 'bgreen',
      subHeader: this.props.data.fields[this.props.selectedLang][primaryField],
      buttons: ['edit', 'delete', 'add'],
      searchBar: true
    }
  }
  componentDidMount() {
    var refSplit = this.props.windowRef.split('-')
    socket.emit('r-entity', {_id: refSplit[2], type: refSplit[1]})
    socket.on('r-entity.done', function(data) {
      this.setState({
        data: data.response
      })
    }.bind(this))
  }

  render() {

    var data = this.props.data.fields[this.state.lang];


    return (
      <WindowHeader title={this.state.title} columns={this.state.columns} bgcolor={this.state.bgcolor} bcolor={this.state.bcolor} subHeader={this.state.subHeader} buttons={this.state.buttons} closeWindow={this.props.closeWindow} windowRef={this.props.windowRef} editEntity={this.props.editEntity} data={this.props.data}>
        <div className="eventContent">
          <p>{data.classification}</p>
          <p className="VEDate">{this.props.data.fields[this.state.lang].startingDate} to {this.props.data.fields[this.state.lang].endingDate}</p>
          <p>{data.city} {data.state} & {data.country}</p>
          <p className="VEdescription">{data.description}</p>
          <p className="tags">{data.keywords && data.keywords.join(' ')}</p>
          {this.props.speakerList && <div className="speakersList">
            <List subheader={<div className="speakersHeader"><p className="speakerCount">4 Speaker</p><IconButton iconClassName="material-icons" tooltip="Add">add</IconButton></div>}>
              {this.speakers.map((speaker, i) =>
              <ListItem key={i} primaryText={speaker.speakerName} rightIconButton={
                <IconButton
                  key={i}
                  iconClassName="material-icons"
                  tooltip="delete">
                    close
                </IconButton>}
                secondaryText={
                  <p>{speaker.speakerType}</p>
                }   
              />)}
            </List>
          </div>}
        </div>
      </WindowHeader>
    )
  }
} 
/*<div className='linkedEntity'>
            <div className="entityCount">
              <p>4 Session</p>
              <FlatButton label="Link" secondary={true}/>
            </div>
            <div className="entityCount">
              <p className="entityName">4 Raw Video</p>
              <FlatButton label="Link" secondary={true}/>
            </div>
            <div className="entityCount">
              <p className="entityName">4 Raw Audio</p>
              <FlatButton label="Link" secondary={true}/>
            </div>
            <div className="entityCount">
              <p className="entityName">4 Edited Video</p>
              <FlatButton label="Link" secondary={true}/>
            </div>
            <div className="entityCount">
              <p className="entityName">4 Edited Audio</p>
              <FlatButton label="Link" secondary={true}/>
            </div>
            <div className="entityCount">
              <p className="entityName">4 Photos</p>
              <FlatButton label="Link" secondary={true}/>
            </div>*/
