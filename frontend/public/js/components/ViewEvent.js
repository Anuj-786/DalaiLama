import React from 'react'
import FlatButton from 'material-ui/lib/flat-button';
import List from 'material-ui/lib/lists/list';
import Divider from 'material-ui/lib/divider';
import ListItem from 'material-ui/lib/lists/list-item';
import FontIcon from 'material-ui/lib/font-icon'
import IconButton from 'material-ui/lib/icon-button';
import WindowHeader from './WindowHeader'

import styles from '../../css/styles'

export default class ViewEvent extends React.Component {

 constructor(props) {
    super(props)
    this.state = {
      title: 'View Event',
      columns: 8,
      bgcolor: 'bggreen',
      bcolor: 'bgreen',
      subHeader: 'The 3rd Kalachakra-Ladakh',
      buttons: ['edit', 'archive'],
      searchBar: true
    }
 }

 speakers = [
    {
      speakerName: 'Dalai Lama',
      speakerType: 'Tibetan Speaker'
    },
    {
      speakerName: 'Lobsang',
      speakerType: 'English Speaker'
    },
    {
      speakerName: 'Tenzin Choejor',
      speakerType: 'Hindi Translator'
    },
    {
      speakerName: 'Don Eisenberg',
      speakerType: 'Tibetan Translator'
    }
  ];

  
  render() {
    return (
      <WindowHeader title={this.state.title} columns={this.state.columns} bgcolor={this.state.bgcolor} bcolor={this.state.bcolor} subHeader={this.state.subHeader} buttons={this.state.buttons}>
      <div className="eventContent">
        <p>Teaching</p>
        <p className="VEDate">03/06/2014 to 13/06/2014</p>
        <p>Leh (Ladakh) Jammu & Kashmir, India</p>
        <p className="VEdescription">His Holiness will be giving the Kalachakra at the request of the two main organizers, the Ladakh Buddhist Association and the Ladakh Gonpa Association. The Tibetan Kongpo Association and the Tibetan Jonang Association are co-sponsors. During the first three days of the Kalachakra, from July 3 to 5, His Holiness the Dalai Lama, along with the monks of Namgyal Monastery and senior lamas, will conduct rituals which prepare and consecrate the venue. These include chanting of prayers, creation of the sand mandala and other rituals. From July 6 to 8, His Holiness will give preliminary teachings on Nagarjuna's Precious Garland of the Middle Way (uma rinchen trengwa) & Letter to a Friend (shetring). On July 9, the Kalachakra Ritual Dance will be performed by the monks of Namgyal Monastery. His Holiness will confer the Kalachakra Initiation from July 10 to 12. On July 13, a long life empowerment (tsewang) and a ceremony offering prayers for the long life of His Holiness the Dalai Lama will be performed.</p> 
        <p className="tags">Kala Chakra, Ladakh, Teaching</p>
        <div className="speakersList">
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
          <div className='linkedEntity'>
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
            </div>
          </div>
        </div>
      </div>
      </WindowHeader>
    )
  }
} 

