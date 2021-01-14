var directionsDisplay = new google.maps.DirectionsRenderer({ draggable: true });
var directionsService = new google.maps.DirectionsService();
var map;
var line;
var int;
var buttonRoute = document.querySelector('#routeGo')
var buttonWaypoint = document.querySelector('#waypointAdd')
var routeFrom= document.querySelector('#routeFrom')

var routeTo=document.querySelector('#routeTo')

buttonRoute.addEventListener('click',calcRoute)
buttonWaypoint.addEventListener('click',addWaypoint)
load()
function load() {
    var myOptions = {
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: new google.maps.LatLng(29.1492, 75.7217),
    };
  map = new google.maps.Map(document.getElementById("map"), myOptions);
  var autocomplete = new google.maps.places.Autocomplete(routeFrom);
  autocomplete.bindTo('bounds', map);
  var autocomplete1 = new google.maps.places.Autocomplete(routeTo);
  autocomplete1.bindTo('bounds', map);
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById("directions"));
};

function addWaypoint(){
  routeTo.insertAdjacentHTML('beforebegin',
    `<div style="margin-bottom:7px"><input type="text"  name="waypoint" value="" />
    <label>Waypoint</label><button style="margin-left:10px;" class="remove btn btn-danger btn-sm">Remove</button><div>`) 
  let arr = document.querySelectorAll('.remove')
   arr[arr.length-1].addEventListener('click', function() {
     this.parentNode.remove()
    });
  }
function calcRoute() {
    const locations = []
    const waypoints = document.querySelectorAll('input[name="waypoint"]')
    waypoints.forEach(function(item){
        if(item.value !==''){
            locations.push({
                location:item.value,
                stopover:true
            })
        }
    })
    var request = {
        origin: routeFrom.value,
        destination: routeTo.value,
        waypoints: locations,
       optimizeWaypoints: true,
        travelMode: "DRIVING"
    };
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
};




