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

ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={About} />
    </Route>
  </Router>
), document.getElementById('test'))
