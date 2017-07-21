import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton'
class HomePage extends Component {
    
    handleButtonPress(){
      console.log(this.props)
      this.props.changePageState(2)
    }
    handleLocalButtonPress(){
      this.props.changePageState(3)
    }

    render() {
        const styles = {
            text: {
                textAlign: 'center',
            },
            header: {
                fontSize: 28,
                fontWeight: 500,
            },
            para: {
                fontSize: 16,
                fontWeight: 300,
            },
            paraHead: {
                fontSize: 16,
                fontWeight: 900,
            },
            map: {
            textAlign: 'center',
            border:'none',
            borderRadius:'10px',
            marginBottom:10,
        	},
        	image: {
        	margin : 'auto',
        	paddingTop: 20,
            textAlign: 'center',
            width: 400,
            border:'none',
        	},
        }
      return (          	
      <Paper>
        <div style={styles.image}>
        <img src="https://drive.google.com/uc?id=0BwdnVFQtB2BsSjFreXBWNWtkTzg"/></div>
        <div style ={styles.text}>          	
          <p style={styles.para}>Your hella g food finder. Quickly discover places around you to eat. <br />
          Does not matter if you are in the mood for some
          Netflix and chill or <br />a Date night or even a lonely night in your pjs.
          We got you covered. </p>
          <p style={styles.paraHead}>Developer Team: </p>
          <p style={styles.para}>Neil Baksi, Verification <br /> Jonathan Charles, Back End Systems <br />
           Siddhant Virmani, Back End <br /> Kanishk Purohit, Front End, UI <br /> Md Mashiur Rahman, UI, Google Maps <br />  </p>
          <iframe  
            style = {styles.map}
            frameBorder="0" 
            width = "550"
            height = "350"
            src = "https://www.google.com/maps/embed/v1/view?zoom=14&center=-33.9173,151.2313&key=AIzaSyC__Vt7Az9hTWwqOmWcsVaVQFEY1qV7LUo" >
          </iframe>
          <br />
           <RaisedButton
            label="Check out restaurants in the vicinity now!"
            onTouchTap={this.handleLocalButtonPress.bind(this)}
            primary={true}
          />
          <br />
          <br />
          <RaisedButton
            label="Go To Filters!"
            onTouchTap={this.handleButtonPress.bind(this)}
            primary={true}
          />
          <p>All rights reserved under MIT License. Finnder 2017 </p>
        </div>
    </Paper>
      )
    }
  }
export default HomePage
