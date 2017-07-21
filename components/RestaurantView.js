import React, { Component } from 'react'
//import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import Cards, { Card } from 'react-swipe-card';
import style from '../components/style.css';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Card as Card1, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class RestaurantView extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      data: this.props.data,
    };
    this.len1 = Math.ceil(this.props.data.length/2);
    this.len2 = this.props.data.length - Math.ceil(this.props.data.length/2);
    this.data_one = this.getDataOne();
    this.data_two = this.getDataTwo(); 
    this.cardData = this.props.data;
    this.sortValue = 1;
  }


  getDataOne(){
    var data_one = [];
    var data_two = [];
    //const img = [];
    var count1 = 0;
    var count2 = 0;
    for (var i = 0; i < this.state.data.length; i++) {      
      if (i < this.state.data.length/2) {  
        data_one[count1] = this.state.data[i];
        count1++;
      } else {
        data_two[count2] = this.state.data[i];
        count2++;
      }
    }
    return data_one;
  }

  getDataTwo(){
    var data_one = [];
    var data_two = [];
    //const img = [];
    var count1 = 0;
    var count2 = 0;
    for (var i = 0; i < this.state.data.length; i++) {      
      if (i < this.state.data.length/2) {  
        data_one[count1] = this.state.data[i];
        count1++;
      } else {
        data_two[count2] = this.state.data[i];
        count2++;
      }
    }
    return data_two;
  }

  componentDidMount () {
    window.scrollTo(0, 0)
  }

  handlePageChange(){
    this.props.changePageState(4);
  }

  handleTabChange(value){
    this.setState({
      value: value,
    });
  } 

  handleButtonPress(){
    this.props.changePageState(2);
  }

  handleSortChange(event, index, value) {
    this.sortDataAgain(value);
    this.sortValue = value;
    this.forceUpdate();
  }

  handleGoToLastPage(item) {
    console.log("CAlled this")
    this.props.sendData(item);
    this.props.changePageState(4);
  }

  render() {

    const cardStyle = {
      marginTop: 30,
      marginRight: 30,
      marginBottom: 30,
      paddingBottom:'10px',
      flex: 1,
      
      direction: {
      	paddingLeft: '8px',
      },
    }

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
     },
     button: {
       //width: '50%',
       margin: '0 auto',
       paddingLeft: '5px',
       paddingRight: '5px',
       paddingTop: '5px',
       paddingBottom: '5px',
     },
     goBack: {
     	marginTop: '500px',
     	paddingBottom: ' 20px',
     	textAlign : 'center',
     },
     goBack2: {
     	//marginTop: '500px',
     	paddingBottom: ' 20px',
     	textAlign : 'center',
     },
     select: {
     	marginLeft: '20px',
     },
   };

       if (this.state.data.length == 0) {
      return (
        <div>
          <h1>Unfortunately, no restaurants match your filters</h1>
          <RaisedButton
            label="Go Back to Filters!"
            onTouchTap={this.handleButtonPress.bind(this)}
            primary={true}
          />
        </div>
        );
    } if (this.cardData.length == undefined) {
      return (
        <div>
          <h1>Please choose some filters to find some results</h1>
          <RaisedButton
            label="Go Back to Filters!"
            onTouchTap={this.handleButtonPress.bind(this)}
            primary={true}
          />
        </div>
        );
    }else {
      console.log("data is = "+this.cardData.length)
      if (this.len1 + this.len2 == 1) {
        if (this.len1 == 0) {
          this.props.sendData(this.data_two.pop());
          console.log('ded');
          this.handlePageChange();
        } else if (this.len2 == 0) {
          this.props.sendData(this.data_one.pop());
          console.log('ded');
          this.handlePageChange();
        }
      }

      var flag = 0;
      console.log("len1 is " + this.len1);
      console.log("len2 is " + this.len2);
      var temp;
      if (this.len1 > this.len2) {
        if (this.len1 >= this.len2 + 2) {
          temp = this.data_one.pop()
          this.data_two.push(temp);
          this.len1--;
          this.len2++;
          console.log(temp.name + " is moving from 1 to 2");
        }
      } else if (this.len2 > this.len1) {
        temp = this.data_two.pop()
        this.data_one.push(temp);
        this.len1++;
        this.len2--;
        console.log(temp.name + " is moving from 2 to 1");
      }

      console.log('Data ONE: ' + this.len1)
      for (var i = 0; i < this.data_one.length; i++) {
        console.log(i + ' ' + this.data_one[i].name);
      }
      console.log('Data TWO: ' + this.len2)
      for (var i = 0; i < this.data_two.length; i++) {
        console.log(i + ' ' + this.data_two[i].name);
      }

      return (
        <Paper style={styles.paper}>
        <Tabs
          value={this.state.value}
          onChange={this.handleTabChange.bind(this)}
        >
          <Tab label="Can't decide?" value="a">
          <h4>
          <div> Swipe up on a restaurant to reject it! Last restaraunt standing wins! </div>
          <div> Cards Left: {this.len1 + this.len2}</div>
          </h4>
            <div>
            <div>             
              <Cards onEnd={() => console.log('end')} className='master-root1'>
                {this.data_one.map((item) =>  
                <Card key={item.id}
                  onSwipeTop={() => {this.removeObject(item,1);}}>
                  <h2>{item.name}</h2>
                    <img src={item.featuredImg}></img>
                </Card>
                )}      
              </Cards>
            </div>
            <div>
              <Cards onEnd={() => console.log('end')} className='master-root2'>
                {this.data_two.map((item) =>  
                <Card key={item.id} 
                  onSwipeTop={() => {this.removeObject(item,2);}}>
                  <h2>{item.name}</h2>
                    <img src={item.featuredImg}></img>
                </Card>
                )}  
              </Cards>
            </div>
            </div>
            <div style={styles.goBack}><RaisedButton
            label="Go Back to Filters!"
            onTouchTap={this.handleButtonPress.bind(this)}
            primary={true}
          /></div>
          </Tab>

          <Tab label="Results" value="b">
            <h5 style={styles.select}><div>
            <SelectField floatingLabelText="Sort By" value={this.sortValue} onChange={this.handleSortChange.bind(this)} autoWidth={true}>
              <MenuItem value={1} primaryText="Popularity (High to Low) (Default)" />
              <MenuItem value={2} primaryText="Popularity (Low to High)" />
              <MenuItem value={3} primaryText="Rating (High to Low)" />
              <MenuItem value={4} primaryText="Rating (Low to High)" />
              <MenuItem value={5} primaryText="Hygiene (High to Low)" />
              <MenuItem value={6} primaryText="Hygiene (Low to High)" />
              <MenuItem value={7} primaryText="Price (High to Low)" />
              <MenuItem value={8} primaryText="Price (Low to High)" />
            </SelectField></div>
            {this.mapRestaurantsToCards(cardStyle)}
            </h5>
            <div style={styles.goBack2}>
            <RaisedButton
            label="Go Back to Filters!"
            onTouchTap={this.handleButtonPress.bind(this)}
            primary={true}
            /></div>
          </Tab>
          
          </Tabs>
          </Paper>
      );
    }
  }

  removeObject(item, num) {

    console.log(item.name + " is gone");
    if (num == 1) {
      var temp1 = this.len1-1;
      console.log('DATA ONE should be ' + temp1);
      console.log('DATA TWO should be ' + this.len2);
      this.len1--;
      for (var i = 0; i < this.cardData.length; i++) {
        if (this.cardData[i].id == item.id) {
          this.cardData.splice(i,1);
          break;
        }
      }
      this.forceUpdate();
    } else if (num == 2) {
      var temp2 = this.len2-1;
      console.log('DATA ONE should be ' + this.len1);
      console.log('DATA TWO should be ' + temp2);
      this.len2--;
      for (var i = 0; i < this.cardData.length; i++) {
        if (this.cardData[i].id == item.id) {
          this.cardData.splice(i,1);
          break;
        }
      }
      this.forceUpdate();
    }
    //console.log('DATA ONE should be ' + this.state.len1);
    //console.log('DATA TWO should be ' + this.state.len2);
  }

  mapRestaurantsToCards(cardStyle){
    if (this.cardData) {
      return this.cardData.map((restaurant) => {
        return (
          <Card1 style={cardStyle} initiallyExpanded={false}>
            <CardHeader
              title={restaurant.name}
              subtitle={restaurant.cuisines}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardMedia
              expandable={true}
              overlay={<CardTitle title={restaurant.name} subtitle={restaurant.cuisines} />}
            >
              <img src={restaurant.featuredImg} />
            </CardMedia>
            <CardText expandable={true}>
              <p><strong>Rating: </strong> {restaurant.averageRating.aggregate_rating}</p>
              <p><strong>Address: </strong> {restaurant.location.address}</p>
              <p><strong>Hygiene: </strong> {restaurant.hygiene}</p>
              <p><strong>Votes: </strong> {restaurant.averageRating.votes}</p>
              <p><strong>Price for Two: </strong> {restaurant.costForTwo}</p>
            </CardText>
            <div style={cardStyle.direction}><RaisedButton label="Get Directions"  onTouchTap={this.handleGoToLastPage.bind(this, restaurant)} primary={true}/></div>
          </Card1>
        )
      })
    }
  }


  sortDataAgain(value) {

    var i, j, nswaps, temp;
    
    if (value == 1) {
      for (i = 1; i < this.cardData.length; i++) {
        nswaps = 0;
        for (j = this.cardData.length-1; j >= i; j--) {
          if (this.cardData[j].averageRating.votes >  this.cardData[j-1].averageRating.votes) {
            temp = this.cardData[j];
            this.cardData[j] = this.cardData[j-1]
            this.cardData[j-1] = temp;
            nswaps++;
          }
        }
      if (nswaps == 0) break;
      }
    } else if (value == 2) {
      console.log('y u ')
      for (i = 1; i < this.cardData.length; i++) {
        nswaps = 0;
        for (j = this.cardData.length-1; j >= i; j--) {
          if (this.cardData[j].averageRating.votes <  this.cardData[j-1].averageRating.votes) {
            temp = this.cardData[j];
            this.cardData[j] = this.cardData[j-1]
            this.cardData[j-1] = temp;
            nswaps++;
          }
        }
      if (nswaps == 0) break;
      }
    } else if (value == 3) {
      for (i = 1; i < this.cardData.length; i++) {
        nswaps = 0;
        for (j = this.cardData.length-1; j >= i; j--) {
          if (this.cardData[j].averageRating.aggregate_rating >  this.cardData[j-1].averageRating.aggregate_rating) {
            temp = this.cardData[j];
            this.cardData[j] = this.cardData[j-1]
            this.cardData[j-1] = temp;
            nswaps++;
          }
        }
      if (nswaps == 0) break;
      }      
    } else if (value == 4) {
      for (i = 1; i < this.cardData.length; i++) {
        nswaps = 0;
        for (j = this.cardData.length-1; j >= i; j--) {
          if (this.cardData[j].averageRating.aggregate_rating <  this.cardData[j-1].averageRating.aggregate_rating) {
            temp = this.cardData[j];
            this.cardData[j] = this.cardData[j-1]
            this.cardData[j-1] = temp;
            nswaps++;
          }
        }
      if (nswaps == 0) break;
      }         
    } else if (value == 5) {
      for (i = 1; i < this.cardData.length; i++) {
        nswaps = 0;
        for (j = this.cardData.length-1; j >= i; j--) {
          if (this.cardData[j].hygiene >  this.cardData[j-1].hygiene) {
            temp = this.cardData[j];
            this.cardData[j] = this.cardData[j-1]
            this.cardData[j-1] = temp;
            nswaps++;
          }
        }
      if (nswaps == 0) break;
      }         
    } else if (value == 6) {
      for (i = 1; i < this.cardData.length; i++) {
        nswaps = 0;
        for (j = this.cardData.length-1; j >= i; j--) {
          if (this.cardData[j].hygiene <  this.cardData[j-1].hygiene) {
            temp = this.cardData[j];
            this.cardData[j] = this.cardData[j-1]
            this.cardData[j-1] = temp;
            nswaps++;
          }
        }
      if (nswaps == 0) break;
      }            
    } else if (value == 7) {
      for (i = 1; i < this.cardData.length; i++) {
        nswaps = 0;
        for (j = this.cardData.length-1; j >= i; j--) {
          if (this.cardData[j].costForTwo >  this.cardData[j-1].costForTwo) {
            temp = this.cardData[j];
            this.cardData[j] = this.cardData[j-1]
            this.cardData[j-1] = temp;
            nswaps++;
          }
        }
      if (nswaps == 0) break;
      }            
    } else if (value == 8) {
      for (i = 1; i < this.cardData.length; i++) {
        nswaps = 0;
        for (j = this.cardData.length-1; j >= i; j--) {
          if (this.cardData[j].costForTwo <  this.cardData[j-1].costForTwo) {
            temp = this.cardData[j];
            this.cardData[j] = this.cardData[j-1]
            this.cardData[j-1] = temp;
            nswaps++;
          }
        }
      if (nswaps == 0) break;
      }            
    }

    return;
  }

}



export default RestaurantView
