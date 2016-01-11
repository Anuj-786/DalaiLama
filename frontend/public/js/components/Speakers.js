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
import speakerConfig from '../formSchema/speaker.json'
import generateSchema from './generateSchema'
import FormGenerator from '../utils/form-generator'

import socket from '../socket'
import styles from '../../css/styles'
injectTapEventPlugin();

export default class Speaker extends React.Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
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
      speaker: {}
    }
  }

  schema() {
    return generateSchema(speakerConfig, this.state.speaker, this.props.lang, {type: this.state.speakerTypes, language: this.state.speakerLanguages} )
  }

  onSubmit(data) {
    console.log(data)

    this.refs.myFormRef.reset()
  }

  onCancel() {
    this.refs.myFormRef.reset()
  }

  render() {
      var schema = this.schema();
      var ref = 'myFormRef';
      var onSubmit = this.onSubmit;
      var onCancel = this.onCancel
      var formElement = FormGenerator.create(schema, ref, onSubmit, onCancel, true);
    return (
      <WindowHeader title={this.state.title} columns={this.state.columns} bgcolor={this.state.bgcolor} bcolor={this.state.bcolor} closeWindow={this.props.closeWindow} entityType="speaker">
        <div className="speakerContainer">
          {formElement}
        </div>
      </WindowHeader>
    )
  }
}
