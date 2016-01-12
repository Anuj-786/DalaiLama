import Header from './Header'
import EditCreateEntity from './EditCreateEntity'
import SearchResults from './SearchResults'
import Snackbar from 'material-ui/lib/snackbar';
import Speaker from './Speakers'
import ViewEvent from './ViewEntity'
import socket from '../socket'
import React from 'react';
import ReactDOM from 'react-dom';
import RaisedButton from 'material-ui/lib/raised-button';
import _ from 'lodash';
import configs from '../../../../configs' 

export default class Home extends React.Component {

  constructor(props) {
    super(props)
    this.selectEntityToCreate = this.selectEntityToCreate.bind(this)
    this.changeLanguage = this.changeLanguage.bind(this)
    this.closeWindow = this.closeWindow.bind(this)
    this.onDiscardPartialCreateEdit = this.onDiscardPartialCreateEdit.bind(this)
    this.onCloseDialog = this.onCloseDialog.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.state = {
      langaugeOptions: [
        'English',
        'French',
      ],
      selectedLangIndex: 1,
      toChangeLangIndex: null, 
      entityOptions: _.keys(configs.schema),
      selectedEntityIndex: 1,
      currentlyEditingRef: null, //which edit or create component is open right now
      toCloseRef: null,
      openSnacker: false,
      snackerMessage: "",
      searchResults: [],
      searchResults: true,
      showDiscardDialogue: false,
    }
  }

  componentDidMount() {
    socket.on('r-search.done', function(result) {
      this.setState({snackerMessage: result.message, openSnacker: true}) 
    }.bind(this))

    socket.on('r-search.error', function(result) {
      this.setState({snackerMessage: result.message, openSnacker: true}) 
    }.bind(this))

  }

  selectEntityToCreate(event, newlySelectedEntityIndex) {
    if (this.state.currentlyEditingRef && this.refs[this.state.currentlyEditingRef].hasUncommittedChanges()) {
      this.setState({
        showDiscardDialogue: true,
        toCreateEntityIndex: newlySelectedEntityIndex
      })  
    } else {
      this.setState({
        currentlyEditingRef: 'create-' + this.state.entityOptions[newlySelectedEntityIndex],
        selectedEntityIndex: newlySelectedEntityIndex,
        toCreateEntityIndex: null
      })
    }
  }

  changeLanguage(event, index, forceClose) {

    if (!forceClose && this.refs[this.state.currentlyEditingRef] && this.refs[this.state.currentlyEditingRef].hasUncommittedChanges()) {
      this.setState({
        showDiscardDialogue: true,
        toChangeLangIndex: index
      })  
    } else {
      this.setState({
        selectedLangIndex: index,
        toChangeLangIndex: null
      })
    }
  }

  closeSnacker() {
    this.setState({openSnacker: false})
  }

  closeWindow(windowRef, event , forceClose) {
    if(this.state.currentlyEditingRef === windowRef) {
      if (!forceClose && this.refs[this.state.currentlyEditingRef] && this.refs[this.state.currentlyEditingRef].hasUncommittedChanges()) {
        this.setState({
          showDiscardDialogue: true,
          toCloseRef: windowRef
        })  
      } else {
        this.refs[windowRef] = null
        this.setState({
          currentlyEditingRef: null,
          toCloseRef: null          
        })  
      }
    }
  }

  onDiscardPartialCreateEdit() { 

    this.refs[this.state.currentlyEditingRef].onCancel()

    this.setState({
      showDiscardDialogue: false,
    })

    if(this.state.toCloseRef) {
      this.closeWindow(this.state.toCloseRef, null, true)
    } 
    
    if (this.state.toCreateEntityIndex) {
      this.selectEntityToCreate(null, this.state.toCreateEntityIndex)
    }
    
    if (_.isNumber(this.state.toChangeLangIndex)) {

      this.changeLanguage(null, this.state.toChangeLangIndex, true)
    }

  }

  onCloseDialog() {
    this.setState({
      showDiscardDialogue: false,
      toCreateEntityIndex: null,
      toChangeLangIndex: null,
      toCloseRef: null
    }) 
  }


        /**  {this.state.speaker && <Speaker closeWindow={this.closeWindow} lang={this.state.langaugeOptions[this.state.selectedLangIndex]}/>}
      {this.state.viewEvent && <ViewEvent closeWindow={this.closeWindow}/>}
      {this.state.searchResults && <SearchResults closeWindow={this.closeWindow}/>}
      **/
  render() {
    return (
      <div className="row">
          <Header entityOptions={this.state.entityOptions} langaugeOptions={this.state.langaugeOptions} selectedLangIndex={this.state.selectedLangIndex} selectedEntityIndex={this.state.selectedEntityIndex} selectEntityToCreate={this.selectEntityToCreate} changeLang={this.changeLanguage}/> 
          {this.state.currentlyEditingRef && <EditCreateEntity ref={this.state.currentlyEditingRef} windowRef={this.state.currentlyEditingRef} closeWindow={this.closeWindow} selectedLang={this.state.langaugeOptions[this.state.selectedLangIndex]} showDiscardDialogue={this.state.showDiscardDialogue} onDiscard={this.onDiscardPartialCreateEdit} onCloseDialog={this.onCloseDialog}/>}

        <Snackbar
          open={this.state.openSnacker}
          message={this.state.snackerMessage}
          action="ok"
          onRequestClose={this.closeSnacker.bind(this)}
          autoHideDuration={5000}
        />
      </div>
    )
  }
}

