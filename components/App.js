import React, { Component } from 'react'
import MenuView from './MenuView'
import HomePage from './HomePage'
import FilterPage from './FilterPage'
import RestaurantView from './RestaurantView'
import FinalPage from '../components/FinalPage'
import obj from "json!./merged_file.json"
import { filterController } from './Filter.js'
import { getRandomColor } from './Filter.js'
import { readAndFilterDump } from './Filter.js'
import { getRatingText } from './Filter.js'
import { getExtraFilters } from './Filter.js'
import { filterObjects } from './Filter.js'
import { getPresetFilter } from './Filter.js'
import { sortData } from './Filter.js'
 
class App extends Component {
  constructor() {
    super()
    this.state = {
      pageState: 1,
      jsonState: filterController(),
    }
    this.finalState = {},
    this.filterState = {
      name: '',
      inputText: '',
      secondSlider: 0.5,
      priceSlider: 50,
      starRating: 2.5,
      cuisineValue: '',
      pickedColor: '',
      delivery: false,
      booking: false,
      open: false,
    },
    this.changeFilters(this.filterState),
    this.finalObject = {},
    this.changePage = this.changePage.bind(this)
    this.changeFilters = this.changeFilters.bind(this)
    this.getFinalObject = this.getFinalObject.bind(this)
    this.handlePresets = this.handlePresets.bind(this)
    //this.changeRestaurantList = this.changeRestaurantList.bind(this)

  }

  getFinalObject(data) {
      console.log(data);
      console.log('jsdksjdkslajdlaksjdlaksdjalskdj');
      this.finalObject = data;
  }

  changePage(val){
    this.setState({
      pageState: val
    });
  }

  handlePresets(input){
    var filtered = []
    var customised = []
    var i 
    console.log(this.state.jsonState.length)
    customised = JSON.parse(JSON.stringify(this.state.jsonState));
    console.log(this.state.jsonState);
    console.log(customised);
    filtered = getPresetFilter(input, customised);
    console.log("length after filtering: " + filtered.length); 
    for (i = 0; i < filtered.length; i++) {
      console.log(filtered[i].averageRating.aggregate_rating + " " + filtered[i].hasTableBooking);  
    } 
    this.finalState = filtered;
  }

  changeFilters(newState){
    
    this.filterState = newState
    
    //console.log(newState)
    var filtered = []
    var customised = []
    var i 
    console.log(this.state.jsonState.length)
    customised = JSON.parse(JSON.stringify(this.state.jsonState));
    console.log(customised);
    filtered = filterObjects(customised, this.filterState);
    for (i = 0; i < filtered.length; i++) {
      console.log(filtered[i].averageRating.aggregate_rating);  
    }
    sortData(filtered);
    this.finalState = filtered;
  }

  renderPage(){
    const pageState = this.state.pageState
    if (pageState == 1) {
      return (
        <div>
          <MenuView changePageState={this.changePage}/>
          <HomePage changePageState={this.changePage}/>
        </div>
      )
    }
    if (pageState == 2) {
      return (
        <div>
          <MenuView changePageState={this.changePage}/>
          <FilterPage changeFilterState={this.changeFilters} changePageState={this.changePage}  
                      handlePresets={this.handlePresets}/>
        </div>
      )
    }
    if (pageState == 3) {
      return (
        <div>
          <MenuView changePageState={this.changePage}/>
          <RestaurantView data={this.finalState}
                          changePageState={this.changePage}
                          sendData={this.getFinalObject}/>
        </div>
      )
    }

    if (pageState == 4) {
      return (
        <div>
          <MenuView changePageState={this.changePage}/>
          {/* Pass in lat and long as props here Mash! */}
          <FinalPage data={this.finalObject} changePageState={this.changePage}/>
        </div>
      )
    }
  }
  render() {
    return (
      <div>{ this.renderPage() }</div>
    )
  }


}

export default App