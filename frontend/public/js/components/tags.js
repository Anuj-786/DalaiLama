var React = require('react')
var IconButton = require('material-ui/lib/icon-button')
var FontIcon = require('material-ui/lib/font-icon')
var TextField = require('material-ui/lib/text-field')
var _ = require('lodash')


var InterestPage = React.createClass({

   getInitialState: function() {

    return { 

      tags: ['Kali', 'Pankaj'], 
      value : '' 

    }

  },

  addTag: function(e) {
    
    if(e.keyCode == 13 || e.keyCode === 9) {
      if(!_.includes(this.state.tags, this.state.value) && this.state.value.length && !this.state.value.trim() == '') {
        this.state.tags.push(this.state.value)
        this.setState({value: ''})

        if(e.preventDefault) {
          e.preventDefault();
        }
      }
    }

    if(e.keyCode == 8) {
      if(this.state.tags.length && !this.state.value.length) {
        this.state.tags.pop() 
        this.forceUpdate()
      }
   }


  },

  onChange: function(e) {
    this.setState({value: e.target.value})
  },

  remove: function(e) {
    this.state.tags.splice(e.target.dataset.val, 1)
    this.forceUpdate()
  },

	render: function() {

		return (
      <div className="outerContainer">
        <div className="tagsContainer">
          <div className="tags">
            {this.state.tags.map(function(value, key) {
              return (
                <span className="tag" key={key}>{value}
                <span><i data-val={key} onClick={this.remove} className="material-icons closeIcon">close</i></span>
                </span>
              )
            }.bind(this))}            
          </div>
          <TextField className="tagInput" value={this.state.value} onKeyDown={this.addTag} onChange={this.onChange} hintText="tag"/> 
        </div>
      </div>
		);
	}

});

module.exports = InterestPage;
