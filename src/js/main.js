/*
 * @link https://wrightshq.com/playground/placing-multiple-markers-on-a-google-map-using-api-3/
 */
// Each marker is labeled with a single alphabetical character.
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;
function initialize_page_contact() {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };
    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    map.setTilt(45);
    // Multiple Markers
    var markers = [
        ['Edina Retail Center', 44.879199,-93.319995],
        ['Roseville Retail Center', 45.016264,-93.169449],
        ['Duluth Retail Center', 46.782828,-92.104143]
    ];
    // Info Window Content
    // var infoWindowContent = [
    //     ['<div class="info_content">' +
    //     '<h3>London Eye</h3>' +
    //     '<p>The London Eye is a giant Ferris wheel situated on the banks of the River Thames. The entire structure is 135 metres (443 ft) tall and the wheel has a diameter of 120 metres (394 ft).</p>' +        '</div>'],
    //     ['<div class="info_content">' +
    //     '<h3>Palace of Westminster</h3>' +
    //     '<p>The Palace of Westminster is the meeting place of the House of Commons and the House of Lords, the two houses of the Parliament of the United Kingdom. Commonly known as the Houses of Parliament after its tenants.</p>' +
    //     '</div>']
    // ];
    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;
    // Loop through our array of markers & place each one on the map
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
          	label: labels[labelIndex++ % labels.length],
            map: map,
            title: markers[i][0]
        });
        // Allow each marker to have an info window
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                //infoWindow.setContent(infoWindowContent[i][0]);
                //infoWindow.open(map, marker);
            }
        })(marker, i));
        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }
    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(7);
        google.maps.event.removeListener(boundsListener);
    });
}

$(function(){

	var windowWidth = $(window).width();
	var currentYear = new Date().getFullYear();

	if (windowWidth > 767) { // desktop ( 768px & up)
		$('li.nav-item.dropdown').mouseover(function() {
			$(this).addClass('show');
			$(this).find('> a').attr('aria-expanded','true');
			$(this).find('> .dropdown-menu').addClass('show');
		});
		$('li.nav-item.dropdown').mouseout(function() {
			$(this).removeClass('show');
			$(this).find('> a').attr('aria-expanded','false');
			$(this).find('> .dropdown-menu').removeClass('show');
		});

		// Only call external Google Maps JS when it's needed (Desktop width on Contact page)
		if($("#map_wrapper").length > 0) {
			var script = document.createElement('script');
			script.src = '//maps.googleapis.com/maps/api/js?sensor=false&callback=initialize_page_contact';
			$("body").append(script);
			var cardMapWidth = $('.card-map').width();
			$('#map_wrapper').height(cardMapWidth-40);
			$('.card-loc-list .card-body .loc-details').height(cardMapWidth-40);
		}

	} else { // mobile (767px & down)
		// Do nothing
	}
	if (windowWidth > 767 && windowWidth <= 991) { // 768px - 991px
		$('li.nav-item.dropdown').each(function() {
			var navItemWidth = $(this).width();
			$(this).find('> .dropdown-menu').width(navItemWidth-16);
		});
	} else if (windowWidth >= 992) { // 992px and up
		$('li.nav-item.dropdown').each(function() {
			var navItemWidth = $(this).width();
			$(this).find('> .dropdown-menu').width(navItemWidth-40);
		});
	}

	/*
	 * Page - Classes
	 */
	$.tablesorter.addParser({
	    id: 'data',
	    is: function(s, table, cell, $cell) {
	      return false;
	    },
	    format: function(s, table, cell, cellIndex) {
	      var $cell = $(cell);
	      if (cellIndex === 1) {
	        return $cell.attr('data-date') || s;
	      } else if (cellIndex === 2) {
	        return $cell.attr('data-time') || s;
	      }
	      return s;
	    },
	    parsed: false,
	    type: 'text'
	  });
	  $('#table-classes').tablesorter({
	    headers: {
	      1 : { sorter: 'data' },
	      2 : { sorter: 'data' }
	    },
	  });

	/*
	 * Footer
	 * Always have current year after copyright symbol
	 */
	$('.copyright .current-year').text(currentYear);
});
