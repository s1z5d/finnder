import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton'


class MenuView extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      open: false
    }
  }

  handleToHomePage(){
    this.setState({
      open: !this.state.open
    });
    this.props.changePageState(1)
  }

  handleToFilterPage(){
    this.setState({
      open: !this.state.open
    });
    this.props.changePageState(2)
  }

  handleToResultsPage(){
    this.setState({
      open: !this.state.open
    });
    this.props.changePageState(3)
  }

  handleToFinalPage(){
    this.setState({
      open: !this.state.open
    });
    this.props.changePageState(4)
  }

  handleToggle(){
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    return (
      <div>
        <AppBar
          title="Welcome to Finnder"
          showMenuIconButton={true}
          onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
        />

        <Drawer open={this.state.open}>
          <MenuItem onClick={this.handleToHomePage.bind(this)}>Home</MenuItem>
          <MenuItem onClick={this.handleToFilterPage.bind(this)}>Filters!</MenuItem>
          <MenuItem onClick={this.handleToResultsPage.bind(this)}>Results</MenuItem>
        <MenuItem onClick={this.handleToFinalPage.bind(this)}>Final Page</MenuItem>
        </Drawer>
      </div>
    );
  }
}

export default MenuView
