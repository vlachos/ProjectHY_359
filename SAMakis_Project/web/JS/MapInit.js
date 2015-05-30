/* global google */
var initialLocation;
var defaultLocation = new google.maps.LatLng(35.3383767,25.1367471);
var browserSupportFlag = new Boolean();
var marker;

function initialize() {
  var mapProp = {
    //center:new google.maps.LatLng(35.3383767,25.1367471),
    zoom:15,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
  
  // Try to get automatic location
  if(navigator.geolocation) {
    //browserSupportFlag = true;
    navigator.geolocation.getCurrentPosition(function(position) {
      initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      map.setCenter(initialLocation);
      marker = new google.maps.Marker({
        map:map,
        draggable:false,
        animation: null,
        position: initialLocation
  });
  google.maps.event.addListener(marker, 'click', toggleBounce);

    function toggleBounce() {

      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    };
    
    }, function() {
      handleNoGeolocation(browserSupportFlag);
    });
  }
  // Browser doesn't support Geolocation
  else {
    browserSupportFlag = false;
    handleNoGeolocation(browserSupportFlag);
  }
  
  function handleNoGeolocation() {
    map.setCenter(defaultLocation);
      marker = new google.maps.Marker({
        map:map,
        draggable:false,
        animation: google.maps.Animation.BOUNCE,
        position: defaultLocation});
    google.maps.event.addListener(marker, 'click', toggleBounce);
    
  }
};

google.maps.event.addDomListener(window, 'load', initialize);