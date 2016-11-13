var destinations = [];
var count = 0;
var map;
var styles = [{"featureType":"landscape","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape.man_made","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"color":"#eaeff2"}]},{"featureType":"landscape.natural","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape.natural.landcover","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape.natural.terrain","stylers":[{"visibility":"simplified"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#b1decc"}]},{"featureType":"poi.park","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","stylers":[{"saturation":-75},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"saturation":100}]},{"featureType":"road.highway.controlled_access","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"color":"#7c7c7c"}]},{"featureType":"road.local","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]}]
var album_covers =
["http://static.musictoday.com.rsz.io/store/bands/93/product_large/MUDD3036.JPG?width=50",
"http://www.panicmanual.com.rsz.io/wp-content/uploads/2008/10/walking_on_a_dream_cover.jpg?width=50",
"http://s-media-cache-ak0.pinimg.com.rsz.io/originals/a5/8f/d8/a58fd8a6baf6ff882a36f6f3a2afe3a5.jpg?width=50",
"http://www.repeatfanzine.co.uk.rsz.io/Images/richard's%20review%20iamges/joey/drums.jpg?width=50",
"http://stagebuddy.com.rsz.io/wp-content/uploads/2014/06/tumblr_n55rlg3KwR1smpt6lo1_1280.jpg?width=50",
"http://www.dustinfrancis.com.rsz.io/wp-content/uploads/2010/11/The-First-Days-of-Spring.jpg?width=50",
"http://images.rapgenius.com.rsz.io/6ea45a91d32294254f0c9c162423c8d4.1000x1000x1.png?width=50",
"http://popcrush.com.rsz.io/files/2013/08/miley-cyrus-bangerz-deluxe.jpg?width=50",
"http://rutorch.files.wordpress.com.rsz.io/2014/03/retrospective-2004-the-killers-hot-fuss.jpg?width=50",
"http://resources.wimpmusic.com.rsz.io/images/19402d16/c052/4a4f/8c5f/6e1105b41f9b/1280x1280.jpg?width=50",
"http://upload.wikimedia.org.rsz.io/wikipedia/en/3/30/Good_Boys_When_They're_Asleep.jpg?width=50",
"http://www.genesis-news.com.rsz.io/media/news/ly.jpg?width=50",
"http://c.directlyrics.com.rsz.io/img/upload/calvin-harris-my-way.jpg?width=50",
"http://mbvmusic.com.rsz.io/wp-content/uploads/2010/02/she-and-him-volume-2-coverart.jpg?width=50",
"http://i.ytimg.com.rsz.io/vi/VgVuZLyMqS8/maxresdefault.jpg?width=50",
"http://static.djbooth.net.rsz.io/pics-albums/Akon_-_Freedom.jpg?width=50",
"http://www.music-bazaar.com.rsz.io/album-images/vol3/165/165420/1010747-big/The-Life-Pursuit-cover.jpg?width=50",
"http://d1itmove024qgx.cloudfront.net.rsz.io/3137fce34f56f00131de5383093a9255688e4624.jpg?width=50",
"http://thestarscoopcom.fatcow.com.rsz.io/wp-content/uploads/2010/09/augustana1.jpg?width=50",
"http://streamd.hitparade.ch.rsz.io/cdimages/ike_tina_turner-sweet_rhode_island_red_s.jpg?width=50",
"http://upload.wikimedia.org.rsz.io/wikipedia/en/9/90/Katrina_%26_the_Waves_-_Walking_on_Sunshine.jpg?width=50",
"http://images.genius.com.rsz.io/9c1876cf214260e65ee9b8fb9c251e7b.500x500x1.jpg?width=50",
"http://www.andpop.com.rsz.io/wp-content/uploads/2016/05/Screen-Shot-2016-05-27-at-2.03.35-PM.png?width=50",
"http://www.mfiles.co.uk.rsz.io/signed-albums/eric-serra-the-professional.jpg?width=50",
"http://www.hellhoundmusic.com.rsz.io/wp-content/uploads/2013/03/216.jpg?width=50",
"http://a3.mzstatic.com.rsz.io/nz/r30/Music5/v4/ef/80/c8/ef80c86a-735e-b7d6-3c00-e0526a6836d4/cover600x600.jpeg?width=50",
"http://cdn.hitfix.com.rsz.io/photos/799988/colbie-caillat-all-of-you.jpg?width=50",
"http://upload.wikimedia.org.rsz.io/wikipedia/en/3/35/Rita_Ora_-_I_Will_Never_Let_You_Down_.png?width=50",
"http://okgo.net.rsz.io/build/wp-content/uploads/2012/01/OhNo.jpg?width=50",
"http://upload.wikimedia.org.rsz.io/wikipedia/en/0/07/TomPettyDebutCover.jpg?width=50",
"http://rnbxclusive.us.rsz.io/wp-content/uploads/2016/03/X-Ambassadors-American-Oxygen-495x495.jpg?width=50",
"http://pbs.twimg.com.rsz.io/media/CvTMnbrVIAAyfG2.jpg?width=50",
"http://f4.bcbits.com.rsz.io/img/a2134958880_10.jpg?width=50",
"http://www.redeep.de.rsz.io/wp-content/uploads/2014/12/fromgold_cover_1500px-750x750.jpg?width=50",
"http://cdn4.pitchfork.com.rsz.io/albums/16420/homepage_large.64d37366.jpg?width=50",
"http://cdn3.pitchfork.com.rsz.io/albums/20176/3542898f.jpg?width=50",
"http://www.themusicninja.com.rsz.io/wp-content/uploads/2016/04/Starley-Call-On-Me-600x600.jpg?width=50",
"http://covers.sndstatic.com.rsz.io/2016/09/19/1830676-sweet-madness-300.jpg?width=50",
"http://www.josepvinaixa.com.rsz.io/blog/wp-content/uploads/2016/09/MiC-LOWRY-Oh-Lord-2016-2480x2480.jpg?width=50",
"http://akns-images.eonline.com.rsz.io/eol_images/Entire_Site/2016829/rs_600x600-160929084823-600.Niall-Horan-FB-092916.jpg?width=50"
]; 

function gMilestone(route, dist, opts) {
      var markers = [],
        geo = google.maps.geometry.spherical,
        path = route.overview_path,
        point = path[0],
        distance = 0,
        leg,
        overflow,
        pos;

      for (var p = 1; p < path.length; ++p) {
        //window.setTimeout(function() {
        leg = Math.round(geo.computeDistanceBetween(point, path[p]));
        d1 = distance + 0
        distance += leg;
        overflow = dist - (d1 % dist);

        if (distance >= dist && leg >= overflow) {
          if (overflow && leg >= overflow) {
            pos = geo.computeOffset(point, overflow, geo.computeHeading(point, path[p]));
            opts.position = pos;
            opts.icon = album_covers[p%41];
            opts.zIndex = 2;
            markers.push(new google.maps.Marker(opts));
            distance -= dist;
          }

          while (distance >= dist) {
            pos = geo.computeOffset(point, dist + overflow, geo.computeHeading(point, path[p]));
            opts.position = pos;
            opts.icon = album_covers[p%41];
            opts.zIndex = 2;
            markers.push(new google.maps.Marker(opts));
            distance -= dist;
          }
        }
        point = path[p]
      //}, p * 100);
      }
      return markers;
    }

/*
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
           //url: 'http://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
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
    }*/

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

      var directionsDisplay = new google.maps.DirectionsRenderer({
        map: map,
        panel: document.getElementById('right-panel'),
      });

      var marker = {};
      marker.map = map;
      marker.animation = google.maps.Animation.DROP;

      directionsDisplay.addListener('directions_changed', function() {
        computeTotalDistance(directionsDisplay.getDirections());
      console.log("MILESTONE!" + directionsDisplay.getDirections().routes[0]);
      console.log("MILESTONE" + gMilestone(directionsDisplay.getDirections().routes[0], 5000, marker));
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
      var route = service.route({
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

    