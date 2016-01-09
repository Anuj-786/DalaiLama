import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import SelectField from 'material-ui/lib/SelectField';
import MenuItem from 'material-ui/lib/menus/menu-item';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import WindowHeader from './WindowHeader'

import socket from '../socket'
import styles from '../../css/styles'
injectTapEventPlugin();

export default class Speaker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Add Speaker',
      columns: 5,
      bgcolor: 'bgorange',
      bcolor: 'borange',
      speakerName: '',
      speakerTypes: ['Translator'],
      speakerLanguages: ['Hindi', 'English', 'Tibetan', 'French'],
      type: 0,
      lang: 1,
    }
  }

  changeLang = (event, index, value) => this.setState({lang: value});

  changeName = (event) => this.setState({speakerName: event.target.value});

  changeType = (event, index, value) => this.setState({type: value});

  addSpeaker = (e) => console.log(this.state.speakerName);

  render() {
    return (
      <WindowHeader title={this.state.title} columns={this.state.columns} bgcolor={this.state.bgcolor} bcolor={this.state.bcolor}>
        <div className="speakerContainer">
          <TextField
            hintText="Speaker Name"
            onChange={this.changeName}
            value={this.state.speakerName} /><br/>
          <SelectField value={this.state.type} onChange={this.changeType}>
            {this.state.speakerTypes.map((field, key) => 
              
              <MenuItem value={key} key={key} primaryText={field}/>

            )}
          </SelectField><br/>
          <SelectField value={this.state.lang} onChange={this.changeLang}>
            {this.state.speakerLanguages.map((field, key) => 
              
              <MenuItem value={key} key={key} primaryText={field}/>

            )}
          </SelectField><br/>
          <RaisedButton label="Add Speaker" primary={true} onTouchTap={this.addSpeaker}/>
        </div>
      </WindowHeader>
    )
  }
}
