var React = require('react')
var FlatButton = require('material-ui/lib/flat-button');
var FontIcon = require('material-ui/lib/font-icon')
var WindowHeader = require('./WindowHeader')

var styles = require('../../css/styles')

var ViewEvent = React.createClass({

 speakers: [
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
  ],

  getInitialState: function() {
    return {
      title: 'View Event',
      columns: 8,
      bgcolor: 'bggreen',
      bcolor: 'bgreen',
      subHeader: 'The 3rd Kalachakra-Ladakh',
      button: ['Edit', 'Archive'],
      searchBar: true
    }
  },

  render: function() {
    return (
      <WindowHeader title={this.state.title} columns={this.state.columns} bgcolor={this.state.bgcolor} bcolor={this.state.bcolor} subHeader={this.state.subHeader} button={this.state.button} searchBar={this.state.searchBar}>
      <div className="eventContent">
        <p className="tag">Teaching</p>
        <p className="VEDate">03/06/2014 to 13/06/2014</p>
        <p>Leh (Ladakh) Jammu & Kashmir, India</p>
        <p className="VEdescription">His Holiness will be giving the Kalachakra at the request of the two main organizers, the Ladakh Buddhist Association and the Ladakh Gonpa Association. The Tibetan Kongpo Association and the Tibetan Jonang Association are co-sponsors. During the first three days of the Kalachakra, from July 3 to 5, His Holiness the Dalai Lama, along with the monks of Namgyal Monastery and senior lamas, will conduct rituals which prepare and consecrate the venue. These include chanting of prayers, creation of the sand mandala and other rituals. From July 6 to 8, His Holiness will give preliminary teachings on Nagarjuna's Precious Garland of the Middle Way (uma rinchen trengwa) & Letter to a Friend (shetring). On July 9, the Kalachakra Ritual Dance will be performed by the monks of Namgyal Monastery. His Holiness will confer the Kalachakra Initiation from July 10 to 12. On July 13, a long life empowerment (tsewang) and a ceremony offering prayers for the long life of His Holiness the Dalai Lama will be performed.</p> 
        <p className="tags">Kala Chakra, Ladakh, Teaching</p>
        <div className="VEspeaker">
          <div className="VESheader">
            <p className="speakerCount">4 Speaker</p>
            <FlatButton label="link" secondary={true}/>
          </div>
          <div className="speakerList">
            {this.speakers.map(function(speaker, i){
             return (
               <div key={i} className="speakerDescription"> 
                <div className="speakerInfo">
                  <p className="speakerName">{speaker.speakerName}</p>
                  <p className="speakerType">{speaker.speakerType}</p>
                </div>
                <div>
                  <FlatButton label="Edit" secondary={true}/>
                  <FlatButton label="Unlink" secondary={true}/>
                </div>
              </div>
             )
            })} 
          </div>
          <div className='linkedEntity'>
            <div className="entityCount">
              <p className="entityName">4 Session</p>
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
})  

module.exports = ViewEvent
