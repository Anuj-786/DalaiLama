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

var Home = require('./components/Home')
var EventPage = require('./components/EventPage')
var CreateEvent = require('./components/CreateEvent')
var ViewEditVideo = require('./components/ViewEditVideo')
var ModerationViewEditVideo = require('./components/ModerationViewEditVideo')
var ModerationViewComment = require('./components/ModerationViewComment')
var UserMangement = require('./components/UserMangement')
var RawVideoList = require('./components/RawVideoList')
var SessionList = require('./components/SessionList')
var AddUser = require('./components/AddUser')
var Form = require('./components/ReactFormGen')
var WindowHeader = require('./components/WindowHeader')
var ViewEvent = require('./components/ViewEvent')
var SearchResults = require('./components/SearchResults')
var SearchAndLink = require('./components/SearchAndLink')
var EntityEvent = require('./components/EntityEvent')

ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
    </Route>
  </Router>
), document.getElementById('test'))
