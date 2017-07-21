import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import { Rating } from 'material-ui-rating'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import { CirclePicker } from 'react-color';
import RaisedButton from 'material-ui/RaisedButton'
import RestaurantView from './RestaurantView'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class FilterPage extends Component {
  // we have this to initialise state
  constructor (props, context) {
    super(props, context)
    this.state = {
      name: '',
      inputText: '',
      secondSlider: 0.5,
      priceSlider: 30,
      starRating: 0,
      cuisineValue: '',
      pickedColor: '',
      delivery: false,
      booking: false,
      open: false,
    }
    this.props.changeFilterState(this.state);
    this.presets = [];
  }

componentDidMount () {
  window.scrollTo(0, 0)
}

componentWillMount() {
  try {
    var storedPresets = JSON.parse(localStorage.getItem("localPreset"))
    if (storedPresets.length != 0){
      this.presets = storedPresets;
    }
  // console.log("mounting presets")
  // console.log(this.presets)
  }
  catch (err) {
    console.log("---------componentWillMount didn't work-----------")
    console.log(err)
  }
}

handleOpen() {
  this.setState({open: true});
};

handleClose() {
  this.setState({open: false});
};

 handleChange(event) {
    var self = this
    var newText = event.target.value
    this.setState({ name: newText }, function(){
      self.props.changeFilterState(self.state);
      })
  }
  handleTextSearch(event) {
    var self = this
    var newText = event.target.value
    this.setState({ inputText: newText }, function(){
      self.props.changeFilterState(self.state);
      })
  }
  handleTabChange(value){
    this.setState({
      value: value,
    });
  };
  handleSecondSlider(event, value) {
    var self = this
    this.setState({ secondSlider: value }, function(){
      self.props.changeFilterState(self.state);
      })
  };
  handlePriceSlider(event, value) {
    var self = this
    this.setState({ priceSlider: value }, function(){
      self.props.changeFilterState(self.state);
      })
  };
  handlePopularitySlider(event, value) {
    var self = this
    this.setState({ popularitySlider: value }, function(){
      self.props.changeFilterState(self.state);
      })
  };
  handleRatingChange(value) {
    var self = this
    this.setState({ starRating: value }, function(){
      self.props.changeFilterState(self.state);
      })
  }
  handleCuisineChange(event, index, value){
    var self = this
    this.setState({ cuisineValue: value }, function(){
      self.props.changeFilterState(self.state);
      })
  }
  handleButtonPress(){
    console.log('y u no work')
    this.props.changePageState(3)
  }
  handleCheckedDelivery(event, checked){
    console.log("the check box is "+checked)
    var self = this
    this.setState({ delivery: checked }, function(){
      self.props.changeFilterState(self.state);
      })
  }
  handleCheckedTB(event, checked){
    console.log("the check box is "+checked)
    var self = this
    this.setState({ booking: checked }, function(){
      self.props.changeFilterState(self.state);
      })
  }
  handleChangeComplete(color, event){
    var self = this
    var newColour = color.hex;
    console.log(color.hex)
    this.setState({ pickedColor: newColour }, function(){
      self.props.changeFilterState(self.state);
      })
  };

  handleUserPresetClicked(preset){
    this.props.changeFilterState(preset);
    this.handleButtonPress();
  }

  handleSavePreset(){
    this.setState({open: false});
    try {
      this.presets.push(this.state)
      localStorage.setItem("localPreset", JSON.stringify(this.presets))
      console.log("saving presets")
    }
    catch (err) {
      console.log("didn't work "+ err)
    }
  }
  
  renderUserPresets(){
    if (this.presets.length != 0){
      console.log("shit found?")
      return (
        <div>
          <h1> Your Personal Presets: </h1>
          {this.presets.map(item => (
            <RaisedButton label={item.name} onTouchTap={this.handleUserPresetClicked.bind(this, item)} />
          ))}
        </div>
      );  
    }
  }


  render(){
    const defaultColors = ["#f44336", "#e91e63", "#9c27b0",
                           "#673ab7", "#3f51b5", "#2196f3",
                           "#03a9f4", "#00bcd4", "#009688",
                           "#4caf50", "#8bc34a", "#cddc39",
                           "#ffeb3b", "#ffc107", "#ff9800",
                           "#ff5722", "#795548", "#607d8b"]
   const styles = {
     headline: {
       fontSize: 24,
       paddingTop: 16,
       marginBottom: 12,
       fontWeight: 400,
       textAlign: 'center',
     },
     paper: {
       paddingTop: '10px',
     },
     insideTab: {
       paddingLeft: '10px',
       paddingBottom: '10px',
     },
     presets: {
       display: 'flex',
       flexDirection: 'row',
       paddingLeft: '24%',
     },
     
     buttonGroup: {
       //margin: 'auto',
       marginTop:'-60px',
       //paddingLeft: '15px',
       //paddingRight: '5px',
       //paddingTop: '15px',
       paddingBottom: '15px',
     },
     button:{
     	textAlign: 'center',
     	padding: '2px',
     	margin:'10px',
     	width: '200px',
     	left:'50px',
     	border: 'solid',
     	borderColor:'#00BCD4',
     	borderRadius:'5px',
     	borderWidth:'2px',
     	//backgroundColor:'#00BCD4',
     },
     create:{
     	//paddingLeft:'42%',
     	//margin:'auto',
      //marginLeft:'100px',
     	textAlign:'center',
     },
     create2:{
      paddingTop:'2%',
      margin:'auto',
      textAlign:'center',
     },
     col:{
      paddingLeft:'33%',
      margin:'auto',
      //textAlign:'center',
     },
   };

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="Save Preset"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSavePreset.bind(this)}
      />,
    ];

    return (
      <div>
        <Paper style={styles.paper}>
          <Tabs
          value={this.state.value}
          onChange={this.handleTabChange.bind(this)}
        >
          <Tab label="Filters" value="a">
            <div style={styles.insideTab}>
              <h2 style={styles.headline}>Choose Your Filters</h2>
            <div style={{width: '50%', margin: '0 auto'}}>
              <TextField
                  hintText="Name"
                  value={this.state.inputText}
                  onChange={this.handleTextSearch.bind(this)}
              />
            <br />
            <br />
          <p>Distance: {this.state.secondSlider}kms
              <Slider
                name="Distance"
                defaultValue={0.50}
                value={this.state.secondSlider}
                onChange={this.handleSecondSlider.bind(this)}
              /></p>
              <p>Rating: <Rating
                value={this.state.starRating}
                max={5}
                onChange={(value) => this.handleRatingChange(value)}
              /></p>
              <SelectField
                  floatingLabelText="Cuisine"
                  value={this.state.cuisineValue}
                  onChange={this.handleCuisineChange.bind(this)}
                >
                  <MenuItem value={1} primaryText="Cafe" />
                  <MenuItem value={2} primaryText="Indian" />
                  <MenuItem value={3} primaryText="Thai" />
                  <MenuItem value={4} primaryText="Chinese" />
                  <MenuItem value={5} primaryText="Mexican" />
                </SelectField>
                <p>Price For Two:  &lt; ${this.state.priceSlider}
                    <Slider
                      name="Price"
                      min={0}
                      max={100}
                      step={1}
                      defaultValue={50}
                      value={this.state.priceSlider}
                      onChange={this.handlePriceSlider.bind(this)}
                    /></p>
                <br />
                <Checkbox label="Delivery" onCheck={this.handleCheckedDelivery.bind(this)}/>
                <Checkbox label="Table Booking" onCheck={this.handleCheckedTB.bind(this)}/>
                <br />
              <div style={styles.col}>  
                <p>Colour: </p>
                <CirclePicker
                  color={this.state.pickedColor}
                  colors={defaultColors}
                  onChangeComplete={ this.handleChangeComplete.bind(this)}
                />
              </div>
            </div>
            <div style={styles.create2}>
              <RaisedButton
                label="Apply Filters!"
                style={{margin: '0 auto'}}
                onTouchTap={this.handleButtonPress.bind(this)}
                primary={true}
              />
            </div>
            </div>
          </Tab>
          <Tab label="Presets" value="b">
            <div style={styles.insideTab}>
              <h2 style={styles.headline}>Choose a Preset!</h2>
              <div style={styles.presets}>
                <div style={styles.buttonGroup}>
	              <div style={styles.button}>
	                <FlatButton
	                  label="Netflix & Chill"
	                  onTouchTap={() => {this.props.handlePresets("netflix"); this.handleButtonPress(); }}
	                  primary={true} />
	              </div>
	              <div style={styles.button}>
	                <FlatButton
	                  label="Date Night"
	                  onTouchTap={()=>{ this.props.handlePresets("date"); this.handleButtonPress(); }}
	                  primary={true} />
	              </div>
	              <div style={styles.button}>
	                <FlatButton
	                  label="Loner"
	                  onTouchTap={() => {this.props.handlePresets("loner"); this.handleButtonPress(); }}
	                  primary={true} />
	              </div>
              </div>
              <div style={styles.buttonGroup}>
                  <div style={styles.button}>
                    <FlatButton
                      label="Comfort Food"
                      onTouchTap={() => {this.props.handlePresets("comfort"); this.handleButtonPress(); }}
                      primary={true} />
                  </div>
                  <div style={styles.button}>
                    <FlatButton
                      label="All Nighters"
                      onTouchTap={()=>{this.props.handlePresets("nighter");this.handleButtonPress();}}
                      primary={true} />
                  </div>
                  <div style={styles.button}>
                    <FlatButton
                      label="Bulking"
                      onTouchTap={()=>{this.props.handlePresets("bulking");this.handleButtonPress();}}
                      primary={true} />
                  </div>
              </div>
              <div style={styles.buttonGroup}>
                  <div style={styles.button}>
                    <FlatButton
                      label="Cutting"
                      onTouchTap={()=>{this.props.handlePresets("cutting");this.handleButtonPress();}}
                      primary={true} />
                  </div>
                  <div style={styles.button}>
                    <FlatButton
                      label="Pub Crawl!"
                      onTouchTap={()=>{this.props.handlePresets("pub");this.handleButtonPress();}}
                      primary={true} />
                  </div>
                  <div style={styles.button}>
                    <FlatButton
                      label="Business Meeting"
                      onTouchTap={()=>{this.props.handlePresets("business");this.handleButtonPress();}}
                      primary={true} />
                  </div>
              </div>                  
              
              </div>
              <div>
                <Dialog
                  title="Create your own Preset"
                  actions={actions}
                  modal={false}
                  open={this.state.open}
                  autoScrollBodyContent={true}
                  onRequestClose={this.handleClose.bind(this)}
                >
                <TextField
                  hintText={"Preset Name"}
                  value={this.state.name}
                  onChange={this.handleChange.bind(this)}
                />
                    
                 <p>Distance: {this.state.secondSlider}km's
                <Slider
                  name="Distance"
                  value={this.state.secondSlider}
                  onChange={this.handleSecondSlider.bind(this)}
                /></p>
                <p>Rating: <Rating
                  value={this.state.starRating}
                  max={5}
                  onChange={(value) => this.handleRatingChange(value)}
                /></p>
                <SelectField
                    floatingLabelText="Cuisine"
                    value={this.state.cuisineValue}
                    onChange={this.handleCuisineChange.bind(this)}
                  >
                    <MenuItem value={1} primaryText="American" />
                    <MenuItem value={2} primaryText="Indian" />
                    <MenuItem value={3} primaryText="Thai" />
                    <MenuItem value={4} primaryText="Chinese" />
                    <MenuItem value={5} primaryText="Mexican" />
                  </SelectField>
                  <p>Price For Two:  &lt; ${this.state.priceSlider}
                      <Slider
                        name="Price"
                        min={0}
                        max={100}
                        step={1}
                        defaultValue={50}
                        value={this.state.priceSlider}
                        onChange={this.handlePriceSlider.bind(this)}
                      /></p>
                  <br />
                <Checkbox label="Delivery" onCheck={this.handleCheckedDelivery.bind(this)}/>
                <Checkbox label="Table Booking" onCheck={this.handleCheckedTB.bind(this)}/>
                  <br />
                <p>Colour: </p>
                  <CirclePicker
                    color={this.state.pickedColor}
                    colors={defaultColors}
                    onChangeComplete={(value) => this.handleChangeComplete(value)
                  }/>
                </Dialog>
                {this.renderUserPresets()}
                <div style={styles.create}>
           		 <RaisedButton label="Create Your own Preset" onTouchTap={this.handleOpen.bind(this)} />		</div>
              </div>
            </div>
          </Tab>
        </Tabs>
        </Paper>
        <br />
        <br />
        <br />
      </div>
    )
  }
}
export default FilterPage;