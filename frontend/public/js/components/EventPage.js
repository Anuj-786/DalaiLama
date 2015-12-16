var React = require('react')

var Header = require('./Header')
var EventWindow = require('./EventWindow')
var styles = require('../../css/styles')

var EventPage = React.createClass({
  render: function() {
    return (
      <div>
       <div className="row">
        <Header />
       </div>
       <EventWindow />
      </div>
    )
  }
})

module.exports = EventPage
