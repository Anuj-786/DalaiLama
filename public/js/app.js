var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var App = React.createClass({
  render() {
    return (
      <div> 
        {this.props.children}
      </div>
    )
  }
})

var About = require('./components/Home')
var EventPage = require('./components/EventPage')
var CreateEvent = require('./components/CreateEvent')
var ViewEditVideo = require('./components/ViewEditVideo')
var ModerationViewEditVideo = require('./components/ModerationViewEditVideo')
var ModerationViewComment = require('./components/ModerationViewComment')
var UserMangement = require('./components/UserMangement')

ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
     // <IndexRoute component={About} />
     // <IndexRoute component={EventPage} />
     // <IndexRoute component={CreateEvent}/>
      <IndexRoute component={UserMangement}/>
    </Route>
  </Router>
), document.getElementById('test'))
