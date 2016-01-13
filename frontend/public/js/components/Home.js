import Header from './Header'
import EditCreateEntity from './EditCreateEntity'
import SearchResults from './SearchResults'
import Snackbar from 'material-ui/lib/snackbar';
import Speaker from './Speakers'
import ViewEvent from './ViewEntity'
import socket from '../socket'
import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/lib/dialog';
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
    this.onCloseWarningDialog = this.onCloseWarningDialog.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.state = {
      langaugeOptions: [
        'English',
        'French',
      ],
      currentlyEditingRefs: [],
      selectedLangIndex: 1,
      toChangeLangIndex: null, 
      entityOptions: _.keys(configs.schema),
      selectedEntityIndex: 1,
      currentlyEditingRef: null, //which edit or create component is open right now
      searchResultsRef: null,
      toCloseRef: null,
      openSnacker: false,
      snackerMessage: "",
      searchResults: [],
      showDiscardDialogue: false,
      dialogWarning: false,
    }
  }

  componentDidMount() {
    socket.on('r-search.done', function(result) {
      
      this.setState({snackerMessage: result.message, openSnacker: true, searchResults: result.response, searchResultRef: 'search-' + result.params.q + results.params.lang}) 
    }.bind(this))

    socket.on('r-search.error', function(result) {
      this.setState({snackerMessage: result.message, openSnacker: true}) 
    }.bind(this))

  }

  selectEntityToCreate(event, newlySelectedEntityIndex) {

    var windowRef = 'create-' + this.state.entityOptions[newlySelectedEntityIndex] 

    if (!_.includes(this.state.currentlyEditingRefs, windowRef)) {

      this.setState({
        currentlyEditingRefs: this.state.currentlyEditingRefs.concat(windowRef),
        selectedEntityIndex: newlySelectedEntityIndex,
        toCreateEntityIndex: null
      })

    } /*else if (!_.isEmpty(this.refs) && this.checkFormValues()) {

      this.setState({
        showDiscardDialogue: true,
        toCreateEntityIndex: newlySelectedEntityIndex
      })  

    } */else {
      this.setState({dialogWarning: true})
    }

  }

  checkFormValues() {
 
    return _.filter(this.state.currentlyEditingRefs, function(field, i) {

      return this.refs[field].hasUncommittedChanges()

    }.bind(this))

  }

  changeLanguage(event, index) {

    if (!_.isEmpty(this.refs) && !_.isEmpty(this.checkFormValues())) {
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

    _.each(this.checkFormValues(), function(ref) {
      
      this.refs[ref].onCancel()

    }.bind(this))

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

      this.setState({selectedLangIndex: this.state.toChangeLangIndex, toChangeLangIndex: null})

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

  onCloseWarningDialog() {
    this.setState({
      dialogWarning: false
    })
  }


        /**  {this.state.speaker && <Speaker closeWindow={this.closeWindow} lang={this.state.langaugeOptions[this.state.selectedLangIndex]}/>}
      {this.state.viewEvent && <ViewEvent closeWindow={this.closeWindow}/>}
      {this.state.searchResults && <SearchResults closeWindow={this.closeWindow}/>}
      **/
  render() {
    
    console.log(this.refs)
    var actions = [
      <RaisedButton
        label="OK"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.onCloseWarningDialog} />
    ]

    return (
      <div className="row">
          <Header entityOptions={this.state.entityOptions} langaugeOptions={this.state.langaugeOptions} selectedLangIndex={this.state.selectedLangIndex} selectedEntityIndex={this.state.selectedEntityIndex} selectEntityToCreate={this.selectEntityToCreate} changeLang={this.changeLanguage}/> 
          {this.state.currentlyEditingRefs.map(function(ref, key) {
            return <EditCreateEntity key={key} ref={ref} windowRef={ref} closeWindow={this.closeWindow} selectedLang={this.state.langaugeOptions[this.state.selectedLangIndex]} showDiscardDialogue={this.state.showDiscardDialogue} onDiscard={this.onDiscardPartialCreateEdit} onCloseDialog={this.onCloseDialog}/> 
          }.bind(this))}
          {this.state.searchResultRef && <SearchResults windowRef={this.state.searchResultRef} closeWindow={this.closeWindow} searchResults={this.state.searchResults}/>}
        <Snackbar
          open={this.state.openSnacker}
          message={this.state.snackerMessage}
          action="ok"
          onRequestClose={this.closeSnacker.bind(this)}
          autoHideDuration={5000}
        />
        <Dialog
          title="Window opened"
          actions={actions}
          modal={false}
          open={this.state.dialogWarning}>
          The window you trying to Open is already opened. 
        </Dialog>
      </div>
    )
  }
}
/*
search-q-lang
read-entityType-id
edit-entityType-id
croeate-entityType
*/
