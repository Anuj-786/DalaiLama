import Snackbar from 'material-ui/lib/snackbar';
import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';
import _ from 'lodash';

import Header from './Header'
import EditCreateEntity from './EditCreateEntity'
import SearchResults from './SearchResults'
import ViewEntity from './ViewEntity'
import configs from '../../../../configs' 
import socket from '../socket'

export default class Home extends React.Component {

  constructor(props) {
    super(props)
    this.selectEntityToCreate = this.selectEntityToCreate.bind(this)
    this.selectEntityForLink = this.selectEntityForLink.bind(this)
    this.changeLanguage = this.changeLanguage.bind(this)
    this.closeWindow = this.closeWindow.bind(this)
    this.onDiscardPartialCreateEdit = this.onDiscardPartialCreateEdit.bind(this)
    this.onCloseDialog = this.onCloseDialog.bind(this)
    this.editEntity = this.editEntity.bind(this)
    this.openReadWindow = this.openReadWindow.bind(this)
    this.onCloseWarningDialog = this.onCloseWarningDialog.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.toggleCurrentlyLinking = this.toggleCurrentlyLinking.bind(this)
    this.linkEntities = this.linkEntities.bind(this)
    this.alreadyLinkedEntity = this.alreadyLinkedEntity.bind(this)
    this.state = {
      langaugeOptions: [
        'English',
        'French',
      ],
      refs: [],
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
      currentlyLinking: false,
      currentlyLinkingRef: null,
      linkEntityStyle: {},
      currentlyLinkingEntityData: {}
    }
  }

  componentDidMount() {
    socket.on('r-search.done', function(results) {
      var ref = 'search-' + results.params.q + '-' + results.params.lang

      if(!_.includes(this.state.refs, ref)) {


        this.state.searchResults[results.params.q] = results.response

        this.state.refs.unshift(ref)

        this.forceUpdate()

      } else {
        this.setState({dialogWarning: true, warningMessage: 'Search Results ' + results.params.q + ' are already opened.'})
      }
    }.bind(this))

    var snackerEvents = ['r-search.error', 'r-entity.error', 'r-search.done', 'u-entity-link.done', 'u-entity-link.error','c-entity.done', 'c-entity.error', 'u-entity.done', 'u-entity.error']
    snackerEvents.forEach(function(event) {
      socket.on(event, 
        function(result) {
          this.setState({snackerMessage: result.message, openSnacker: true}) 

        }.bind(this)
      )
    }.bind(this))
  

  }

  selectEntityToCreate(event, newlySelectedEntityIndex) {

    var windowRef = 'create-' + this.state.entityOptions[newlySelectedEntityIndex] 

    if (!this.refsWithText('create').length && !this.refsWithText('edit').length) {

      this.state.refs.unshift(windowRef)

      this.setState({
        selectedEntityIndex: newlySelectedEntityIndex,
        toCreateEntityIndex: null
      })

      this.forceUpdate()

    } else {
      this.setState({dialogWarning: true, warningMessage: 'You can edit or create only one Entity at a time'})
    }

  }

  selectEntityForLink() {

    if(!this.state.linkEntityStyle) {

      this.state.linkEntityStyle = { borderWidth: '1px', borderColor: 'yellow', border: 'solid'}
    }
    else {
      
      delete this.state.linkEntityStyle
    }

    this.forceUpdate()
  }

  openReadWindow(data, ref, event) {

    if(data) {

      var ref = 'view-' + data._type + '-' + data._id

      if(!_.includes(this.state.refs, ref)) {

        this.state.readData[data._id] = data

        this.state.refs.push(ref)

        this.forceUpdate()

      } else {

        /*this.setState({
          dialogWarning: true,
          warningMessage: data._type + ' is already viewed'
        })*/
        this.state.readData[data._id] = data

        this.forceUpdate()
      }
    }

  }

  refsWithText(text) {
     return _.filter(this.state.refs, function(ref, i) {

      return _.includes(ref, text)

    })


  }

  editEntity(data, ref, event) {

    if(data) {
      
      var windowRef = 'edit-' + data._type + '-' + data._id

      var existingEditRefs = this.refsWithText('edit')

      if(_.isEmpty(existingEditRefs)) {
       
        this.state.readData[data._id] = data

        this.state.refs.push(windowRef)

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

  toggleCurrentlyLinking(ref, data, event) {
    this.setState({
      currentlyLinking: !this.state.currentlyLinking,
      currentlyLinkingRef: ref,
      currentlyLinkingEntityData: data,
    })
  }

  linkEntities(backlinkType, backlinkId) {
    var currentlyLinkingRefSplit = this.state.currentlyLinkingRef.split('-')
    socket.emit('u-entity-link', [
      {_id: currentlyLinkingRefSplit[2], _type: currentlyLinkingRefSplit[1]},
      {_id: backlinkId, _type: backlinkType}
    ]) 
    socket.emit('r-entity', {
      _id: currentlyLinkingRefSplit[2],
      type: currentlyLinkingRefSplit[1],
      lang: this.state.langaugeOptions[this.state.selectedLangIndex].toLowerCase(),
      context: 'web.read'
    })
  }

  alreadyLinkedEntity(entityId) {
    
    var entityReadConfig = configs.web.read[this.state.currentlyLinkingEntityData._type]

    var joinedFields =  _.pluck(entityReadConfig.joins, 'fieldName')
    var existsJoinedFields = []
 
    joinedFields.forEach(function(joinedField) {
      
      existsJoinedFields.push(_.find(this.state.currentlyLinkingEntityData.fields[joinedField], {_id: entityId}))

    }.bind(this))

    if(!_.compact(existsJoinedFields).length) {

      return true
    } else {

      return false
    }
  }

  uncommittedForms() {
 
    return _.filter(this.state.refs, function(ref, i) {

      return this.refs[ref] && this.refs[ref].hasUncommittedChanges()

    }.bind(this))

  }

  changeLanguage(event, index) {

    if (!_.isEmpty(this.refs) && !_.isEmpty(this.uncommittedForms())) {
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

    if(_.includes(this.state.refs, windowRef)) {

      if (this.refs[windowRef] && !_.isEmpty(this.refs) && this.refs[windowRef].hasUncommittedChanges()) {

        this.setState({
          showDiscardDialogue: true,
          toCloseRef: windowRef
        })  

      } else {
        var index = this.state.refs.indexOf(windowRef)
        this.state.refs.splice(index , 1)
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

    _.each(this.uncommittedForms(), function(ref) {
      
      this.refs[ref].onCancel()

    }.bind(this))

    this.setState({
      showDiscardDialogue: false,
    })

    if(this.state.toCloseRef) {

      var index = this.state.refs.indexOf(this.state.toCloseRef)
      this.state.refs.splice(index , 1)

      this.setState({
        toCloseRef: null
      })

      this.forceUpdate()
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
      {this.state.ViewEntity && <ViewEntity closeWindow={this.closeWindow}/>}
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
    var selectedLang = this.state.langaugeOptions[this.state.selectedLangIndex].toLowerCase()
    
    return (
      <div className="row">
        <Header entityOptions={this.state.entityOptions} langaugeOptions={this.state.langaugeOptions} selectedLangIndex={this.state.selectedLangIndex} selectedEntityIndex={this.state.selectedEntityIndex} selectEntityToCreate={this.selectEntityToCreate} changeLang={this.changeLanguage}/> 
          {this.state.refs.map(function(ref, i) {

            if(_.includes(ref, 'create')) {

              return <EditCreateEntity key={ref} ref={ref} windowRef={ref} closeWindow={this.closeWindow} selectedLang={selectedLang} showDiscardDialogue={this.state.showDiscardDialogue} onDiscard={this.onDiscardPartialCreateEdit} onCloseDialog={this.onCloseDialog} openReadWindow={this.openReadWindow}/> 
            } else if(_.includes(ref, 'search')) {

              var path = ref.split('-')[1]

              return <SearchResults key={ref} windowRef={ref} closeWindow={this.closeWindow} searchResults={this.state.searchResults[path]} selectedLang={selectedLang} openReadWindow={this.openReadWindow} currentlyLinking={this.state.currentlyLinking} linkEntityStyle={this.state.linkEntityStyle} linkEntities={this.linkEntities} alreadyLinkedEntity={this.alreadyLinkedEntity}/>
            } else if(_.includes(ref, 'view')) {
              
              var _id = ref.split('-')[2]

               return <ViewEntity key={ref} windowRef={ref} data={this.state.readData[_id]} closeWindow={this.closeWindow} editEntity={this.editEntity} selectedLang={selectedLang} currentlyLinking={this.state.currentlyLinking} toggleCurrentlyLinking={this.toggleCurrentlyLinking} linkEntityStyle={this.state.linkEntityStyle} linkEntities={this.linkEntities} openReadWindow={this.openReadWindow} alreadyLinkedEntity={this.alreadyLinkedEntity}/> 
            } else if(_.includes(ref, 'edit-')) {
              
              var _id = ref.split('-')[2]

               return <EditCreateEntity key={ref} edit={this.state.edit} ref={ref} windowRef={ref} closeWindow={this.closeWindow} selectedLang={this.state.langaugeOptions[this.state.selectedLangIndex]} showDiscardDialogue={this.state.showDiscardDialogue} onDiscard={this.onDiscardPartialCreateEdit} onCloseDialog={this.onCloseDialog} data={this.state.readData[_id].fields} openReadWindow={this.openReadWindow}/> 
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
