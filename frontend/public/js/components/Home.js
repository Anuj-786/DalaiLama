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
    this.editEntity = this.editEntity.bind(this)
    this.openReadWindow = this.openReadWindow.bind(this)
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
      searchResults: {},
      showDiscardDialogue: false,
      dialogWarning: false,
      warningMessage: null,
      readData: {},
      edit: null,
    }
  }

  componentDidMount() {
    socket.on('r-search.done', function(results) {
      var ref = 'search-' + results.params.q + '-' + results.params.lang

      if(!_.includes(this.state.currentlyEditingRefs, ref)) {

        this.state.searchResults[results.params.q] = results.response

        this.state.currentlyEditingRefs.unshift(ref)

        this.forceUpdate()

        this.setState({
          snackerMessage: results.message,
          openSnacker: true,
        }) 
      } else {
        this.setState({dialogWarning: true, warningMessage: 'Search Results ' + results.params.q + ' are already opened.'})
      }
    }.bind(this))

    socket.on('r-search.error', function(result) {
      this.setState({snackerMessage: result.message, openSnacker: true}) 
    }.bind(this))

  }

  selectEntityToCreate(event, newlySelectedEntityIndex) {

    var windowRef = 'create-' + this.state.entityOptions[newlySelectedEntityIndex] 

    if (!_.includes(this.state.currentlyEditingRefs, windowRef)) {

      this.state.currentlyEditingRefs.unshift(windowRef)

      this.forceUpdate()

      this.setState({
        selectedEntityIndex: newlySelectedEntityIndex,
        toCreateEntityIndex: null
      })

    } else {
      this.setState({dialogWarning: true, warningMessage: 'The window you trying to Open is already opened.'})
    }

  }

  openReadWindow(data, ref, event) {

    var windowRef = ref.split('-')
     
    console.log(data, windowRef)
    if(data) {

      var ref = 'view-' + data._type + '-' + windowRef[1] + '-' + windowRef[2] + '-' + data._id

      if(!_.includes(this.state.currentlyEditingRefs, ref)) {

        this.state.readData[data._id] = data

        this.state.currentlyEditingRefs.push(ref)

        this.forceUpdate()

      } else {

        this.setState({
          dialogWarning: true,
          warningMessage: windowRef[1] + ' event is already viewed'
        })

      }
    }

  }

  checkTextExistInState(text) {
     return _.filter(this.state.currentlyEditingRefs, function(field, i) {

      return _.includes(field, text)

    }.bind(this))


  }

  editEntity(data, ref, event) {

    var refSplit = ref.split('-')
    if(data) {
      
      var windowRef = 'edit-event-' + refSplit[1] + '-' + refSplit[2] + '-' + data._id

      var existFields = this.checkTextExistInState('edit')

      if(!_.includes(this.state.currentlyEditingRefs, windowRef) && _.isEmpty(existFields)) {
       
        this.state.readData[data._id] = data

        this.state.currentlyEditingRefs.push(windowRef)

        this.forceUpdate()

        this.setState({
          edit: true
        })
      } else {
      
        this.setState({
          dialogWarning: true,
          warningMessage: 'You can open one edit window at time.',
        })

      }

    }

  }

  checkFormValues() {
 
    return _.filter(this.state.currentlyEditingRefs, function(field, i) {

      return this.refs[field] && this.refs[field].hasUncommittedChanges()

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

  closeWindow(windowRef) {

    if(_.includes(this.state.currentlyEditingRefs, windowRef)) {

      if (this.refs[windowRef] && !_.isEmpty(this.refs) && this.refs[windowRef].hasUncommittedChanges()) {

        this.setState({
          showDiscardDialogue: true,
          toCloseRef: windowRef
        })  

      } else {
        var index = this.state.currentlyEditingRefs.indexOf(windowRef)
        this.state.currentlyEditingRefs.splice(index , 1)
        this.forceUpdate()
       
        if(this.refs[windowRef]) {

          this.refs[windowRef] = null
        }
       /* this.setState({
          currentlyEditingRef: null,
          toCloseRef: null          
        })*/  

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

      var index = this.state.currentlyEditingRefs.indexOf(this.state.toCloseRef)
      this.state.currentlyEditingRefs.splice(index , 1)

      this.forceUpdate()

      this.setState({
        toCloseRef: null
      })
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
            if(_.includes(ref, 'create')) {

              return <EditCreateEntity key={key} ref={ref} windowRef={ref} closeWindow={this.closeWindow} selectedLang={this.state.langaugeOptions[this.state.selectedLangIndex]} showDiscardDialogue={this.state.showDiscardDialogue} onDiscard={this.onDiscardPartialCreateEdit} onCloseDialog={this.onCloseDialog}/> 
            } else if(_.includes(ref, 'search')) {

              var path = ref.split('-')[1]

              return <SearchResults key={key} windowRef={ref} closeWindow={this.closeWindow} searchResults={this.state.searchResults[path]} selectedLang={this.state.langaugeOptions[this.state.selectedLangIndex]} openReadWindow={this.openReadWindow}/>
            } else if(_.includes(ref, 'view')) {
              
              var path = ref.split('-')[4]

              console.log(path, ref)
              return <ViewEvent key={key} windowRef={ref} data={this.state.readData[path]} closeWindow={this.closeWindow} editEntity={this.editEntity}/> 
            } else if(_.includes(ref, 'edit-')) {
              
              var path = ref.split('-')[4]

              return <EditCreateEntity key={key} edit={this.state.edit} ref={ref} windowRef={ref} closeWindow={this.closeWindow} selectedLang={this.state.langaugeOptions[this.state.selectedLangIndex]} showDiscardDialogue={this.state.showDiscardDialogue} onDiscard={this.onDiscardPartialCreateEdit} onCloseDialog={this.onCloseDialog} data={this.state.readData[path].fields}/> 
            } else {
            
              return
            }
          }.bind(this))}

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
          {this.state.warningMessage}  
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
