var destinations = [];
var count = 0;
var map;
var styles = [{"featureType":"landscape","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape.man_made","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"color":"#eaeff2"}]},{"featureType":"landscape.natural","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape.natural.landcover","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape.natural.terrain","stylers":[{"visibility":"simplified"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#b1decc"}]},{"featureType":"poi.park","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","stylers":[{"saturation":-75},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"saturation":100}]},{"featureType":"road.highway.controlled_access","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"color":"#7c7c7c"}]},{"featureType":"road.local","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]}]
    
var album_covers =
['http://images.contactmusic.com.rsz.io/images/press/vampire-weekend-modern-vampires-of-the-city-300-cover.jpg?width=50',
'http://upload.wikimedia.org.rsz.io/wikipedia/en/1/11/Bad_things_cover_art.jpg?width=50',
'http://upload.wikimedia.org.rsz.io/wikipedia/en/f/fd/Lady_Gaga_-_Joanne_(Official_Album_Cover).png?width=50',
'http://upload.wikimedia.org.rsz.io/wikipedia/en/8/8e/MichaelBuble-Christmas(2011)-Cover.png?width=50'
];

var markers = []
    function setMarkers(map) {
      // Adds markers to the map.

      // Marker sizes are expressed as a Size of X,Y where the origin of the image
      // (0,0) is located in the top left of the image.

      // Origins, anchor positions and coordinates of the marker increase in the X
      // direction to the right and in the Y direction down.
      // Shapes define the clickable region of the icon. The type defines an HTML
      // <area> element 'poly' which traces out a polygon as a series of X,Y points.
      // The final coordinate closes the poly by connecting to the first coordinate.
      var shape = {
        coords: [0, 0, 50],
        type: 'circle'
      };
      for (var i = 0; i < destinations.length; i++) {
         var image = {
           url: album_covers[i],
           //url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
           // This marker is 20 pixels wide by 32 pixels high.
           size: new google.maps.Size(50, 50),
           // The origin for this image is (0, 0).
           origin: new google.maps.Point(0, 0),
           // The anchor for this image is the base of the flagpole at (0, 32).
           anchor: new google.maps.Point(0, 32),
           //draggable: true
         };
        var dest = destinations[i];
        var marker = new google.maps.Marker({
          position: {
            lat: dest[1],
            lng: dest[2]
          },
          map: map,
          icon: image,
          shape: shape,
          title: dest[0],
          zIndex: dest[3]
        });
        markers.push(marker)
      }
    }

    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: {
          lat: -41.3083,
          lng: 72.9279
        }, // Yale
        disableDefaultUI: true,
        mapTypeId: 'Styled'
      })
      var styledMapType = new google.maps.StyledMapType(styles, {name: 'Styled'});
      map.mapTypes.set('Styled', styledMapType);
    }

    initMap()

    function initRoute() {
      var directionsService = new google.maps.DirectionsService;
      var shape = {
        coords: [25, 25, 30],
        type: 'circle'
      };

      var mOptions = {
          draggable: false,
          map: map,
          icon: album_covers[(Math.floor(Math.random() * destinations.length))],
          shape: shape,
          zIndex: 3
        }

      var directionsDisplay = new google.maps.DirectionsRenderer({
        map: map,
        panel: document.getElementById('right-panel'),
        markerOptions: mOptions
      });

      directionsDisplay.addListener('directions_changed', function() {
        computeTotalDistance(directionsDisplay.getDirections());
      });

      displayRoute(destinations[0][0], destinations[destinations.length - 1][0], directionsService,
        directionsDisplay);
    }
    var dept_box = document.getElementById('depart')
    var arrive_box = document.getElementById('arrive')
    var autocomplete1 = new google.maps.places.Autocomplete(dept_box);
    autocomplete1.addListener('place_changed', function() {
      var place = autocomplete1.getPlace();
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
    });
    var autocomplete2 = new google.maps.places.Autocomplete(arrive_box);
    autocomplete2.addListener('place_changed', function() {
      var place = autocomplete2.getPlace();
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
    });

    $("#create-playlist").click(function() {
      console.log(destinations)
      if ($('#depart').val() != "" && $('#arrive').val() != "") {
        $('#body-overlay').fadeOut()
        $('#back').fadeIn()
        var depart = $('#depart').val()
        var arrive = $('#arrive').val()
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address': depart}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK)
              {
                  console.log(results[0].formatted_address)
                  destinations.push([results[0].formatted_address, results[0].geometry.lat, results[0].geometry.lng, count++])
              }
              else {
                  console.log("Geocode unsuccessful - " + status);
              }
        })
        geocoder.geocode({'address': arrive}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK)
              {
                  console.log(results[0].formatted_address)
                  destinations.push([results[0].formatted_address, results[0].geometry.lat, results[0].geometry.lng, count++]);
                  initRoute();
              }
              else {
                  console.log("Geocode unsuccessful - " + status);
              }
        })
      }
    })

    $('#back').click(function() {
      $('#back').fadeOut()
      markers = []
      $('#body-overlay').fadeIn()
      $('#depart').val(destinations[0][0])
      $('#arrive').val(destinations[1][0])
      destinations = []
      count = 0
    })

    function displayRoute(origin, destination, service, display) {
      var stops = [];
      for (var i = 1; i < destinations.length - 1; i++) {
        stops.push({
          location: destinations[i][0]
        });
      }
      service.route({
        origin: origin,
        destination: destination,
        waypoints: stops,
        travelMode: 'DRIVING',
        avoidTolls: true
      }, function(response, status) {
        if (status === 'OK') {
          display.setDirections(response);
        } else {
          alert('Could not display directions due to: ' + status);
        }
      });
    }

    function computeTotalDistance(result) {
      var total = 0;
      var myroute = result.routes[0];
      for (var i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;
      }
      total = total / 1000;
      document.getElementById('total').innerHTML = total + ' km';
    }

    