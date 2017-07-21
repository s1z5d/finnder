import React, { Component } from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton';
import ActionSchedule from 'material-ui/svg-icons/action/schedule';
import HardwareTv from 'material-ui/svg-icons/hardware/tv';
import NotificationWifi from 'material-ui/svg-icons/notification/wifi';

class FinalPage extends Component {
    // We have this to initialise state
// Now we can also use any this.props
constructor (props, context) {
  super(props, context)
  this.state = {
     // origin: new google.maps.LatLng(),
     // destination: new.google.maps.LatLng(),
     // directions: null,
   }
   // only taking in static parameter now.
   // Need to figure out how to dynamically feed LatLng
  }

  handleButtonPress(){
      this.props.changePageState(2);
  }

  renderIcons() {
    var wifiText = 'Free Wifi!'
    var openText = 'Open Late'
    var tvText   = 'TV Avaliable'

    var wifiDisabled = false
    var openDisabled = false
    var tvDisabled   = false 

    if (this.props.data.wifi == 0){
      wifiText = 'No free wifi'
      wifiDisabled = true
    }
    if (this.props.data.open_late == 0){
      openText = 'Not open late'
      openDisabled = true
    }
    if (this.props.data.tv == 0){
      tvText = 'No TV avaliable'
      tvDisabled = true
    }

    return (
      <div>
      <IconButton tooltip={openText} disabled={openDisabled}>
        <ActionSchedule />
      </IconButton >
      <IconButton tooltip={tvText} disabled={tvDisabled}>
        <HardwareTv />
      </IconButton>
      <IconButton tooltip={wifiText} disabled={wifiDisabled}>
        <NotificationWifi />
      </IconButton>
      </div>
      )

  }

  render() {
    const style = {
        card: {
          margin: 30,
          borderRadius: '10px',
          width: 650,
      },
        map: {
            marginLeft: 30,
            textAlign: 'center',
            border:'none',
            borderRadius:'10px',
        },
        img: {
            width: 300,
            height: 400,
        },
        text: {
            fontSize: 16,
            fontWeight: 300,
            fontStyle:'italic',
            margin:10,
            textAlign: 'center',
        },
        resText: {
            fontSize: 16,
            fontWeight: 300,
            marginBottom: -15,
            textAlign: 'center',
        },
        header: {
            fontSize: 28,
            fontWeight: 500,
            textAlign: 'center',
        },
       
        paper: {
            display: 'inline-block',
            rounded: true,
            marginTop: 30,
            marginRight:20,
            borderRadius: '10px',
            textAlign: 'center',
        },
        colour: {
          display: 'inline-block',
          borderRadius: '50%',
          width: '20px',
          height: '20px',
          background: '#ccc',
        }
    };
    var string  = "https://www.google.com/maps/embed/v1/directions?key=AIzaSyC__Vt7Az9hTWwqOmWcsVaVQFEY1qV7LUo&zoom=15&origin=UNSW+Sydney,+Sydney,+New+South+Wales,+Australia";
    var destination = "&destination=" + this.props.data.location.address;
    var res = string.concat(destination);
    var distance = Math.round(this.props.data.distance * 1000)
    console.log(res);
    console.log(distance+"meters")
    console.log(this.props.data)

    return (
      <div>
        <div style={{display:'flex'}}>
          <br /><br />
        <Card style={style.card}>
              <h1 style = {style.header}> Restaurant </h1>
              <CardMedia
                overlay={<CardTitle title={this.props.data.name} subtitle={this.props.data.location.address} />}
              >
                <img style={style.img} src={this.props.data.featuredImg} />
              </CardMedia>
              <p style ={style.resText}>Cost for Two</p>
              <CardTitle 
              	title={this.props.data.costForTwo}/>
              <p style ={style.resText}>Hygiene</p>
              <CardTitle 
              	subtitle={this.props.data.hygiene}/>
              <CardText>
                <strong>Distance: </strong> {distance}m <br />
                <strong>Rating: </strong> {this.props.data.averageRating.rating_text} <br />
                <strong>Cuisine: </strong> {this.props.data.cuisines} <br />
                <strong>Ambience: </strong> {this.props.data.ambience}/5 <br />
                <strong>Color: </strong> <div style={{ display: 'inline-block', borderRadius: '50%',
                                                     width: '20px', height: '20px',background: this.props.data.color}}>
                                          </div> <br />
                
                {this.renderIcons()}

              </CardText>
            </Card>
            <Paper style={style.paper}>
            <h1 style = {style.header}> Restaurant Found </h1>
            <p style ={style.text}> After endless nights of coding, zillion cups of coffee and a whole lot of searching <br /> and sorting, swiping between restaurants we finally came up with something that you will like. <br /> And also as a good sport, we are showing you how to get there with this Google Maps. </p>
            <iframe style = {style.map}
              width = "550"
              height = "350"
              src = {res}>
            </iframe>
            </Paper>
          </div>
        <RaisedButton
          label="Pick Another Restaurant?"
          onTouchTap={this.handleButtonPress.bind(this)}
          primary={true}
        />
      </div>
    )
  }
}
export default FinalPage
