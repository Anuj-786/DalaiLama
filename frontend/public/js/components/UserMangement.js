var React = require('react')
var FlatButton = require('material-ui/lib/flat-button');
var FontIcon = require('material-ui/lib/font-icon')
var TextField = require('material-ui/lib/text-field');
var Table = require('material-ui/lib/table/table');
var TableBody = require('material-ui/lib/table/table-body');
var TableFooter = require('material-ui/lib/table/table-footer');
var TableHeader = require('material-ui/lib/table/table-header');
var TableHeaderColumn = require('material-ui/lib/table/table-header-column');
var TableRow = require('material-ui/lib/table/table-row');
var TableRowColumn = require('material-ui/lib/table/table-row-column');

var styles = require('../../css/styles')

this.state = {
  fixedHeader: true,
  fixedFooter: true,
  stripedRows: false,
  showRowHover: false,
  selectable: true,
  multiSelectable: false,
  enableSelectAll: false,
  deselectOnClickaway: true,
  height: '300px',
}
console.log(this.state.height)
var UserMangement = React.createClass({
  getInitialState: function() {
    return {
      fixedHeader: true,
      fixedFooter: false,
      stripedRows: false,
      showRowHover: true,
      selectable: false,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      height: '300px',
    }
  },
  render: function() {
    return (
      <div className="large-8 columns">
        <div className="viewEntity mangementView">
          <div className="entityHeader mangement">
            <p className="createEntityHeader">User Mangement: Mange 5 Users</p>
              <FontIcon className="material-icons icon">close</FontIcon>
          </div>
          <div className="addUserButtonDiv">
            <FlatButton label="Add User" style={styles.addUserButton}/> 
          </div>
          <div className="userMangementTable">
            <Table
              height={this.state.height}
              fixedHeader={this.state.fixedHeader}
              fixedFooter={this.state.fixedFooter}
              selectable={this.state.selectable}
              multiSelectable={this.state.multiSelectable}
              onRowSelection={this._onRowSelection}>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow className="tableRow">
                  <TableHeaderColumn tooltip='User Name'>UserName</TableHeaderColumn>
                  <TableHeaderColumn tooltip='Name'>Name</TableHeaderColumn>
                  <TableHeaderColumn tooltip='Admin'>Admin</TableHeaderColumn>
                  <TableHeaderColumn tooltip='Moderator'>Moderator</TableHeaderColumn>
                  <TableHeaderColumn tooltip='DataEntry Operator'>Data Entry Operator</TableHeaderColumn>
                  <TableHeaderColumn tooltip='reset'>Reset</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                deselectOnClickaway={this.state.deselectOnClickaway}
                showRowHover={this.state.showRowHover}
                stripedRows={this.state.stripedRows}
                displayRowCheckbox={false}>
                <TableRow>
                  <TableRowColumn>tenzin</TableRowColumn>
                  <TableRowColumn>Tezin Choejor</TableRowColumn>
                  <TableRowColumn>
                    <FontIcon className="material-icons icon" style={styles.iconsCancelRight}>check</FontIcon>
                  </TableRowColumn>
                  <TableRowColumn>
                    <FontIcon className="material-icons icon" style={styles.iconsCancelRight}>check</FontIcon>
                  </TableRowColumn>
                  <TableRowColumn>
                    <FontIcon className="material-icons icon" style={styles.iconsCancelRight}>check</FontIcon>
                  </TableRowColumn>
                  <TableRowColumn>reset</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>don</TableRowColumn>
                  <TableRowColumn>Don Eisenberg</TableRowColumn>
                  <TableRowColumn>
                    <FontIcon className="material-icons icon" style={styles.iconsCancelRight}>check</FontIcon>
                  </TableRowColumn>
                  <TableRowColumn>
                    <FontIcon className="material-icons icon" style={styles.iconsCancelRight}>check</FontIcon>
                  </TableRowColumn>
                  <TableRowColumn>
                    <FontIcon className="material-icons icon" style={styles.iconsCancelRight}>check</FontIcon>
                  </TableRowColumn>
                  <TableRowColumn>reset</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>lobsang</TableRowColumn>
                  <TableRowColumn>Lobsang</TableRowColumn>
                  <TableRowColumn></TableRowColumn>
                  <TableRowColumn>
                    <FontIcon className="material-icons icon" style={styles.iconsCancelRight}>check</FontIcon>
                  </TableRowColumn>
                  <TableRowColumn>
                    <FontIcon className="material-icons icon" style={styles.iconsCancelRight}>check</FontIcon>
                  </TableRowColumn>
                  <TableRowColumn>reset</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>shannon</TableRowColumn>
                  <TableRowColumn>Shannon</TableRowColumn>
                  <TableRowColumn></TableRowColumn>
                  <TableRowColumn></TableRowColumn>
                  <TableRowColumn>
                    <FontIcon className="material-icons icon" style={styles.iconsCancelRight}>check</FontIcon>
                  </TableRowColumn>
                  <TableRowColumn>reset</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>alvin</TableRowColumn>
                  <TableRowColumn>Alvin</TableRowColumn>
                  <TableRowColumn></TableRowColumn>
                  <TableRowColumn></TableRowColumn>
                  <TableRowColumn>
                    <FontIcon className="material-icons icon" style={styles.iconsCancelRight}>check</FontIcon>
                  </TableRowColumn>
                  <TableRowColumn>reset</TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = UserMangement
