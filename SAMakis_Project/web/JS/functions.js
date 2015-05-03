function initialize() {
  var mapProp = {
    center:new google.maps.LatLng(35.3383767,25.1367471),
    zoom:15,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
};
google.maps.event.addDomListener(window, 'load', initialize);