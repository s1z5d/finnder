import obj from "json!./merged_file.json"
import { changeRestaurantList } from './App.js'

export function filterController() {
    //new array of json objects, filtered to pick only stuff we need
    //also checks if any of them are o and randomises them
    var customised = [];
    customised = readAndFilterDump();

    //TODO decide what needs to be added, randomize and add it
    //need to add a distance variable which calculates distance using lat and long  
    customised = getExtraFilters(customised);
    //changeRestaurantList(customised);


    return customised; 
}




export function readAndFilterDump() {

  var customised = [];
  var len = obj.places.length;
  var asianPhotos = ["http://suitelife.com/blog/wp-content/uploads/2015/08/327013.jpg", "http://nebula.wsimg.com/82c2438bcec6ce077fdb9f5777483347?AccessKeyId=FB771320EF82836BDCA7&disposition=0&alloworigin=1", "http://img.huffingtonpost.com/asset/scalefit_970_noupscale/585be1aa1600002400bdf2a6.jpeg"]
  var cafePhotos = ["http://sawadacoffee.com/wp-content/uploads/Sawada-Coffee-10DEC2015-003.jpg", "https://static1.squarespace.com/static/552bda39e4b022585607fe5e/56c540c320c6470c42bd1c99/56cf831b7c65e4630a2aa8ac/1456440113793/CAFE+LULA-1019.jpg?format=1500w"]
  var indianPhotos = ["http://www.missindia.menu/wp-content/uploads/2014/10/home-panel-11-1.jpg"]
  var pizzaPhotos = ["http://cchunterbooks.com/blog/wp-content/uploads/2017/01/pizza2.jpg", "http://blog.oxforddictionaries.com/wp-content/uploads/pizza.jpg", "https://www.roccbox.com/wp-content/uploads/2016/03/Pizza.jpg"]
  var stockPhotos = ["https://www.colourbox.com/preview/3276632-wine-glasses-on-a-table-in-a-restaurant.jpg"]
  for (var i = 0; i < len; i++) {
    var test = {};
    test.name = obj.places[i].restaurant.name;
  	test.id = obj.places[i].restaurant.id;
  	test.location =  obj.places[i].restaurant.location;
  	test.cuisines = obj.places[i].restaurant.cuisines;
  	test.costForTwo =  obj.places[i].restaurant.average_cost_for_two;        

  	if (test.costForTwo == 0) {   
  	  test.costForTwo = Math.floor(Math.random()*(60-15+1)+15);
  	}

  	test.averageRating = obj.places[i].restaurant.user_rating;

  	if (test.averageRating.aggregate_rating == 0) {
  	  test.averageRating.aggregate_rating = (Math.random()*(5-1+1)+0).toFixed(2);
  	  test.averageRating.rating_text = getRatingText(test.averageRating.aggregate_rating);
  	}

    test.averageRating.votes = parseInt(test.averageRating.votes);

  	test.hasDelivery = Math.random() > 0.5 ? 1 : 0;        
  	test.hasTableBooking =  obj.places[i].restaurant.has_table_booking;
  	//test.featuredImg = obj.places[i].restaurant.featured_image;
  	if (obj.places[i].restaurant.featured_image != "") {
      if (test.name.indexOf("Guzman") != -1) {
        console.log("found you gyg")
        test.featuredImg = "http://halalsearch.com.au/wp-content/uploads/job-manager-uploads/company_logo/2016/02/Guzman-Y-Gomez.jpg"
      } else if (test.name.indexOf("Mamma") != -1) {
        test.featuredImg = "https://b.zmtcdn.com/data/reviews_photos/6ed/2f7aff07867df83d8854c91c2054a6ed_1469331215.jpg?fit=around%7C574%3A574&crop=574%3A574%3B%2A%2C%2A"
      } else {
        test.featuredImg = obj.places[i].restaurant.featured_image;
      }
    } else {
      console.log("stockPhotos");
      if (obj.places[i].restaurant.cuisines.indexOf("Asian") != -1 ||
          obj.places[i].restaurant.cuisines.indexOf("Chinese") != -1 ||
          obj.places[i].restaurant.cuisines.indexOf("Vietnamese") != -1 ||
          obj.places[i].restaurant.cuisines.indexOf("Sushi") != -1 ||
          obj.places[i].restaurant.cuisines.indexOf("Japanese") != -1 ||
          obj.places[i].restaurant.cuisines.indexOf("Thai") != -1 ||
          obj.places[i].restaurant.cuisines.indexOf("Indonesian") != -1) {
        test.featuredImg = asianPhotos[Math.floor(Math.random()*(2))];
        console.log("asian" + test.name);
      } else if (obj.places[i].restaurant.cuisines.indexOf("Cafe") != -1 || 
          obj.places[i].restaurant.cuisines.indexOf("Bakery") != -1) {
        test.featuredImg = cafePhotos[Math.floor(Math.random()*(1))]
        console.log("cafe" + test.name);
      } else if (obj.places[i].restaurant.cuisines.indexOf("Indian") != -1) {
        test.featuredImg = indianPhotos[0]
        console.log("indian" + test.name);
      } else if (obj.places[i].restaurant.cuisines.indexOf("Pizza") != -1 ||
          obj.places[i].restaurant.cuisines.indexOf("Italian") != -1) {
        test.featuredImg = pizzaPhotos[Math.floor(Math.random()*2)]
        console.log("italian " + test.name);
      } else {
        test.featuredImg = stockPhotos[0];
        console.log("stock " + test.name);
      }
    }
    test.distance = getDistanceFromLatLonInKm(-33.9173,151.2313,obj.places[i].restaurant.location.latitude,obj.places[i].restaurant.location.longitude);
  	customised[i] = test;
  }
  return customised;
}

export function getRatingText(num) {
  if (num == 0) {
    return "Not Rated";
  } else if (num < 1) {
    return "Very Poor";
  } else if (num < 2) {
    return "Poor";
  } else if (num < 3) {
    return "Average";
  } else if (num < 4) {
    return "Good"
  } else if (num < 5) {
    return "Very Good";
  } else {
    return "Invalid Rating";
  }
}

export function getExtraFilters(customised) {

  var len = customised.length;
  for (var i = 0; i < len; i++) {
    customised[i].color = getRandomColor();
    customised[i].number = i;
    customised[i].hygiene = Math.floor(Math.random()*101);
    customised[i].open_late = getRandom5();
    customised[i].bathroom = randomIntFrom1to5();
    customised[i].eftpos = getRandom8();
    customised[i].calories = randomIntFrom1to5();
    customised[i].wifi = getRandom8();
    customised[i].tv = getRandom5();
    customised[i].chef = getRandom8();
    customised[i].ambience = randomIntFrom1to5(); 
  }
  return customised;

}

export function filterObjects(customised, state) {
      
  var minRating = state.starRating;
  var filterText = state.inputText;
  var maxDistance = state.secondSlider;
  //var minHygiene = state.secondSlider;
  var minPrice = 0; 
  var maxPrice = state.priceSlider;
  var cuisine = "";
  if (state.cuisineValue == 1) {
    cuisine = "Cafe";
  } else if (state.cuisineValue == 2) {
    cuisine = "Indian";
  } else if (state.cuisineValue == 3) {
    cuisine = "Thai"; 
  } else if (state.cuisineValue == 4) {
    cuisine = "Chinese";
  } else if (state.cuisineValue == 5) {
    cuisine = "Mexican";
  }

  var color = state.pickedColor;
  var preset = ["netflix","date","nighter"];
  var delivery = state.booking;
  var booking = state.booking;

  var i = 0;
  var len = customised.length;
  console.log("lkfdjskldjklsjlk    " + len)
  while (i < len) {

      if (filterText != "") {
        if (customised[i].name.toUpperCase().indexOf(filterText.toUpperCase()) == -1) {
            customised.splice(i,1);
            len--;
            continue;
        }
      }
      if (booking && !customised[i].hasTableBooking) {
          customised.splice(i,1);
          len--;
          continue;
      }
      if (delivery && !customised[i].hasDelivery) {
          customised.splice(i,1);
          len--;
          continue;
      }      
      if (customised[i].cuisines.indexOf(cuisine) == -1) {
          customised.splice(i,1);
          len--;
          continue;
      }      
      if (customised[i].averageRating.aggregate_rating < minRating) {
          customised.splice(i,1);
          len--;
          continue;
      }
      if (customised[i].distance > maxDistance) {
          customised.splice(i,1);
          len--;
          continue;
      }
      if (customised[i].distance > maxDistance) {
          customised.splice(i,1);
          len--;
          continue;
      }
      if (customised[i].distance > maxDistance) {
          customised.splice(i,1);
          len--;
          continue;
      }      
/*      if (customised[i].hygiene < minHygiene) {
          customised.splice(i,1);
          len--;
          continue;
      }*/
      if (customised[i].costForTwo < minPrice || customised[i].costForTwo > maxPrice) {
          customised.splice(i,1);
          len--;
          continue;
      }
      if (state.pickedColor != "") {
        if (customised[i].color.indexOf(state.pickedColor) == -1) {
            customised.splice(i,1);
            len--;
            continue;
        }
      } 
      i++;
  }
  console.log("length after filtering    " + len)
  return customised;
}

export function sortData(filtered) {
   var i, j, nswaps, temp;
   for (i = 1; i < filtered.length; i++) {
      nswaps = 0;
      for (j = filtered.length-1; j >= i; j--) {
         if (filtered[j].averageRating.votes >  filtered[j-1].averageRating.votes) {
            temp = filtered[j];
            filtered[j] = filtered[j-1]
            filtered[j-1] = temp;
            nswaps++;
         }
      }
      if (nswaps == 0) break;
   }
}

export function getPresetFilter(input,customised){   
      
      if(/netflix/.test(input)){
        customised = NFnC(customised);
      }
      if(/date/.test(input)){
        customised = DATE(customised);
      }
      if(/nighter/.test(input)){
        customised = NIGHTER(customised);
      }
      if(/comfort/.test(input)){
        customised = ComfortFood(customised);
      }
      if(/loner/.test(input)){
        customised = Loner(customised);
      }
      if(/bulking/.test(input)){
        customised = Bulking(customised);
      }
      if(/cutting/.test(input)){
        customised = Cutting(customised);
      }
      if(/pub/.test(input)){
        customised = PubCrawl(customised);
      }
      if(/business/.test(input)){
        customised = BusinessMeeting(customised);
      }

    return customised; 
  }
  
  
  
  function NFnC (customised){
    var i = 0;
    //console.log(1);
    //console.log(customised);
    var len = customised.length;
    var pat1 = /Fast/;
    var pat2 = /Mex/;
    var pat3 = /Chin/
    while (i < len) {
      
      if(!pat1.test(customised[i].cuisines) && !pat2.test(customised[i].cuisines) && !pat3.test(customised[i].cuisines)){
        customised.splice(i,1);
        len--;
        continue;
      }
      if (customised[i].hasDelivery == 0) {
            customised.splice(i,1);
            len--;
            continue;
      }
      if (customised[i].open_late == 1) {
            customised.splice(i,1);
            len--;
            continue;
      }  

      i++;
    }
    
    return customised;
  }
  
  function DATE (customised){
    var len = customised.length;
    var i = 0;
    console.log(len);
    while (i < len) {
      if (customised[i].hasTableBooking == 0) {
              var x = linearSearch(customised,customised[i]);
              customised.splice(x,1);
              len--;
              continue;
      }

      if (customised[i].averageRating.aggregate_rating < 3.5) {
          customised.splice(i,1);
          len--;
          continue;
      }
      
      i++;
    }
    return customised;
  }

  function NIGHTER (customised){
    var i = 0;
    var len = customised.length;
    var pat2 = /Caf/;
    while (i < len) {
      
      if (customised[i].open_late == 0) {
          customised.splice(i,1);
          len--;
          continue;
      }
      if (customised[i].bathroom < 2) {
          customised.splice(i,1);
          len--;
          continue;
      }
      if (customised[i].eftpos == 0) {
          customised.splice(i,1);
          len--;
          continue;
      }
        i++; 
    }
    return customised;
  }

  function ComfortFood (customised){
    var i = 0;
    var pat3 = /Ita/;
    //var pat4 = /Mex/
    var pat5 = /Des/
    //var pat6 = /Fast/
    var len = customised.length;
    while (i < len) {
      if(!pat3.test(customised[i].cuisines) && !pat5.test(customised[i].cuisines)){
        customised.splice(i,1);
        len--;
        continue;
      }
      i++;   
    }
    return customised;
  } 

  function Bulking (customised){
    var i = 0;
    var pat4 = /Veg/;
    var len = customised.length;
    while (i < len) {
      if (customised[i].calories < 4) {
        customised.splice(i,1);
        len--;
        continue;
      }
      if (customised[i].averageRating.aggregate_rating < 3.5) {
        customised.splice(i,1);
        len--;
        continue;
      }
      i++;
    }
    return customised;
  }

  function Loner (customised){
    var i = 0;
    var len = customised.length;
    while (i < len) {
          if (customised[i].wifi == 0) {
              customised.splice(i,1);
              len--;
              continue;
          }
          if (customised[i].tv == 0) {
              customised.splice(i,1);
              len--;
              continue;
          }
        i++;
    }
    return customised;
  }

  function Cutting (customised){
    var i = 0;
    var len = customised.length;
    var pat5 = /Pub/;
    while (i < len) {
      if (pat5.test(customised[i].cuisines)) {
              customised.splice(i,1);
              len--;
              continue;
      }
      if (customised[i].calories > 2) {
              customised.splice(i,1);
              len--;
              continue;
      }
      if (customised[i].averageRating.aggregate_rating < 3.5) {
              customised.splice(i,1);
              len--;
              continue;
      }
      i++;
    }
    return customised;
  }

  function PubCrawl (customised){
    var i = 0;
    var pat5 = /Pub/;
    var pat6 = /Drin/
    var len = customised.length;
    while (i < len) {
      if(!pat5.test(customised[i].cuisines) && !pat6.test(customised[i].cuisines)){
        customised.splice(i,1);
        len--;
        continue;
      }
      i++;
    }
    return customised;
  }

  function BusinessMeeting (customised){
    var i = 0;
    var len = customised.length;
    var pat5 = /Pub/
    while (i < len) {
      if(pat5.test(customised[i].cuisines)){
        customised.splice(i,1);
        len--;
        continue;
      }
      if (customised[i].ambience < 4) {
              customised.splice(i,1);
              len--;
              continue;
      }
      if (customised[i].costForTwo < 40) {
        customised.splice(i,1);
        len--;
        continue;
      }
      i++;
    }
    return customised;
  }

function linearSearch(customised, element){
  var n =0;
  var check = false;
  while(n < customised.length)
  {
    if(customised[n] == element){
      check = true;
      return n;
    }
    n = n+1;
  }
  return customised;
}

function getRandom8() {
      var value = Math.random() < 0.8 ? 0 : 1;
      return value;
    }
function getRandom5() {
      var value = Math.random() < 0.5 ? 0 : 1;
      return value;
    }
function randomIntFrom1to5() {
      return Math.floor(Math.random()*(5-1+1)+1);
  }



export function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

export function deg2rad(deg) {
  return deg * (Math.PI/180)
}

//if you find a better way, let me know
export function getRandomColor() {
	var color = [];
  var defaultColors = ["#f44336", "#e91e63", "#9c27b0",
	                     "#673ab7", "#3f51b5", "#2196f3",
	                     "#03a9f4", "#00bcd4", "#009688",
	                     "#4caf50", "#8bc34a", "#cddc39",
	                     "#ffeb3b", "#ffc107", "#ff9800",
	                     "#ff5722", "#795548", "#607d8b"] 
	var ran1 = Math.floor(Math.random() * 17)
  var ran2 = Math.floor(Math.random() * 17);
  var ran3 = Math.floor(Math.random() * 17);
  var ran4 = Math.floor(Math.random() * 17);
  var ran5 = Math.floor(Math.random() * 17);
  var ran6 = Math.floor(Math.random() * 17);
  var ran7 = Math.floor(Math.random() * 17);
  var ran8 = Math.floor(Math.random() * 17);
  var ran9 = Math.floor(Math.random() * 17);
  while (ran2 == ran1) {
    ran2 = Math.floor(Math.random() * 17)
  }
  while (ran3 == ran2 || ran3 == ran1) {
    ran3 = Math.floor(Math.random() * 17)
  }
  while (ran3 == ran2 || ran3 == ran1) {
    ran3 = Math.floor(Math.random() * 17)
  }
  while (ran4 == ran3 || ran4 == ran2 || ran4 == ran1) {
    ran4 = Math.floor(Math.random() * 17)
  }
  while (ran5 == ran4 || ran5 == ran3 || ran5 == ran2 || ran5 == ran1) {
    ran5 = Math.floor(Math.random() * 17)
  }
  while (ran6 == ran5 || ran6 == ran4 || ran6 == ran3 || ran6 == ran2 || ran6 == ran1) {
    ran6 = Math.floor(Math.random() * 17)
  }
  while (ran7 == ran6 || ran7 == ran5 || ran7 == ran4 || ran7 == ran3 || ran7 == ran2 || ran7 == ran1) {
    ran7 = Math.floor(Math.random() * 17)
  }
  while (ran8 == ran7 || ran8 == ran6 || ran8 == ran5 || ran8 == ran4 || ran8 == ran3 || ran8 == ran2 || ran8 == ran1) {
    ran8 = Math.floor(Math.random() * 17)
  }
  while (ran9 == ran8 || ran9 == ran7 || ran9 == ran6 || ran9 == ran5 || ran9 == ran4 || ran9 == ran3 || ran9 == ran2 || ran9 == ran1) {
    ran9 = Math.floor(Math.random() * 17)
  }
  color[0] = defaultColors[ran1];
  color[1] = defaultColors[ran2];
  color[2] = defaultColors[ran3];
  color[3] = defaultColors[ran4];
  color[4] = defaultColors[ran5];
  color[5] = defaultColors[ran6];
  color[6] = defaultColors[ran7];
  color[7] = defaultColors[ran8];
  color[8] = defaultColors[ran9];
	return color;
}
