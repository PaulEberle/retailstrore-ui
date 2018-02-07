/**
 * Possible address to coordinates API
 * @link https://www.geocode.farm/v3/json/forward/?addr=6807+York+Avenue+South+Edina+MN+55435+US&country=us&lang=en&count=1
 */

/*
 * @link https://wrightshq.com/playground/placing-multiple-markers-on-a-google-map-using-api-3/
 */
// Each marker is labeled with a single alphabetical character.
var labels = '123456789';
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
			script.src = '//maps.googleapis.com/maps/api/js?callback=initialize_page_contact';
			$("body").append(script);
			var cardMapWidth = $('.card-map').width();
			$('#map_wrapper').height(cardMapWidth-40);
			$('.card-loc-list .card-body .loc-details').height(cardMapWidth-40);
		}

		// Size map appropriately for location specific pages
		if($("#map_wrapper_specific").length > 0) {
			var cardMapWidth = $('.card-map').width();
			$('#map_wrapper_specific').height(cardMapWidth-20);
		}

		// Initiate Bootstrap Date Picker
		if ( $( "#table-classes" ).length ) {
			$("#datepicker")
				.datepicker({
					multidate: false,
					todayHighlight: true,
					// daysOfWeekDisabled: [0, 6], // Disable weekends
					datesDisabled: [ // This is just for example/dummy purposes
						"09/01/2017",
						"09/02/2017",
						"09/03/2017",
						"09/04/2017",
						"09/05/2017",
						"09/06/2017",
						"09/07/2017",
						"09/08/2017",
						"09/09/2017",
						"09/10/2017",
						"09/11/2017",
						"09/12/2017",
						"09/14/2017",
						"09/15/2017",
						"09/16/2017",
						"09/17/2017",
						"09/19/2017",
						"09/20/2017",
						"09/23/2017",
						"09/24/2017",
						"09/25/2017",
						"09/27/2017",
						"09/29/2017",
						"09/21/2017"
					]
				})
				.on("changeDate", function(e) {
					$("#apptDate").val(e.format("yyyy-mm-dd"));
				});
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

	if ($('.card-loc-list .loc-details').length > 0) {
		//$('.card-loc-list .loc-details').css('background-color','red');
  		$.getJSON("https://api.myjson.com/bins/nzzot", function(result){
            $.each(result, function(i, locDataDesktop){
                //$("div").append(field.name + "<br>");
                //alert('Success!!');
                i++;
              $('.card-loc-list .loc-details').append('<div class="location"><h2>'+locDataDesktop.name+'<span class="badge badge-warning float-right">'+i+'</span></h2><div class="address"><div class="location-name">'+locDataDesktop.address.addressLine1+'</div><div class="street-1">'+locDataDesktop.address.addressLine2+'</div><div class="city-st-zip">'+locDataDesktop.address.city+', '+locDataDesktop.address.state+' '+locDataDesktop.address.zip+'</div></div><div class="phone"><strong>Phone:</strong><div class="phone-number">'+locDataDesktop.phone.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3")+'</div><div class="tty">TTY users call 711</div></div><div class="hours"><strong>Hours:</strong><div class="week">'+locDataDesktop.hours+'</div></div><div class="parking">'+locDataDesktop.parking+'</div><a href="#" class="btn btn-primary d-block">View Classes and Events</a><a href="#" class="btn btn-primary d-block">Schedule an Appointment</a></div><hr>');
            });
        });
	}

	if ($('.card-table #table-classes tbody').length > 0) {
		$.getJSON("https://gm31gahou9.execute-api.us-west-2.amazonaws.com/Stage/event", function(result){
	    $.each(result, function(i, classesData){
	      $('.card-table #table-classes tbody').append('<tr><td><a href="#'+classesData.id+'" class="class-name d-none d-md-block">'+classesData.name+'</a><a href="#'+classesData.id+'" class="d-md-none"><div class="line-1"><span class="class-name">'+classesData.name+'</span> <span class="location">'+classesData.location+'</span></div><div class="line-2"><span class="date">'+classesData.date+'</span><br><span class="time">'+classesData.startTime+' - '+classesData.endTime+'</span></div><div class="line-3"><span class="option">Sign Up</span></div></a></td><td data-date="20170906-1200" class="date">'+classesData.date+'</td><td data-time="1200" class="time">'+classesData.startTime+' - '+classesData.endTime+'</td><td class="location">'+classesData.location+'</td><td class="seats">'+classesData.capacity+'</td><td class="option"><a href="#'+classesData.id+'" class="btn btn-primary d-block">Sign Up</a></td></tr>');
	    });
	  });
	}

	/*
	 * Page - Classes
	 */
	if ( $( "#table-classes" ).length ) {
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
	}

	/*
	 * Modals
	 */
	// Desktop - Form #1 to Form #2
	$('#desktopForm1Submit').click(function(){
		$('#desktopForm1').css('cssText', 'display: none !important');
		$('#desktopForm2').css('cssText', 'display: block !important');
		$('#desktopForm1Submit').css('cssText', 'display: none !important');
		$('#desktopForm2Submit').css('cssText', 'display: block !important');
	});
	// Mobile - Form #1 to Form #2
	$('#mobileForm1 label.btn-secondary').click(function(){
		$('#mobileForm1').css('cssText', 'display: none !important');
		$('#mobileForm2').css('cssText', 'display: block !important');
	});
	// Desktop - Form #2 to Form #1
	$('#mobileForm2 p.btn-secondary').click(function(){
		$('#mobileForm2').css('cssText', 'display: none !important');
		$('#mobileForm1').css('cssText', 'display: block !important');
	});
	// Desktop - Form #2 to Form #3
	$('#mobileForm2 label.btn-secondary').click(function(){
		$('#mobileForm2').css('cssText', 'display: none !important');
		$('#mobileForm3').css('cssText', 'display: block !important');
	});
	// Desktop - Form #3 to Form #2
	$('#mobileForm3 p.btn-secondary').click(function(){
		$('#mobileForm3').css('cssText', 'display: none !important');
		$('#mobileForm2').css('cssText', 'display: block !important');
	});
	// Desktop - Form #3 to Form #4
	$('#mobileForm3 label.btn-secondary').click(function(){
		$('#mobileForm3').css('cssText', 'display: none !important');
		$('#mobileForm4').css('cssText', 'display: block !important');
	});
	// Desktop - Form #4 to Form #3
	$('#mobileForm4 p.btn-secondary').click(function(){
		$('#mobileForm4').css('cssText', 'display: none !important');
		$('#mobileForm3').css('cssText', 'display: block !important');
	});
	// Desktop - Form #4 to Form #5
	$('#mobileForm4 label.btn-secondary').click(function(){
		$('#mobileForm4').css('cssText', 'display: none !important');
		$('#mobileForm5').css('cssText', 'display: block !important');
	});
	// Desktop - Form #5 to Form #4
	$('#mobileForm5 p.btn-secondary').click(function(){
		$('#mobileForm5').css('cssText', 'display: none !important');
		$('#mobileForm4').css('cssText', 'display: block !important');
	});

	/*
	 * Admin - Schedule Appointments
	 */
	if ( $( "#form-sched-appts" ).length || $( "#form-checkins" ).length ) {
		var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var today = now.getFullYear()+"-"+(month)+"-"+(day);
      	$('#form-sched-appts input#date').val(today);
      	$('#form-checkins input#date').val(today);
	}

	/*
	 * Footer
	 * Always have current year after copyright symbol
	 */
	$('.copyright .current-year').text(currentYear);



});
