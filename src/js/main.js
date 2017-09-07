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
	} else { // mobile (767px & down)
		// Do nothing
	}
	if (windowWidth > 767 && windowWidth <= 991) {
		$('li.nav-item.dropdown').each(function() {
			var navItemWidth = $(this).width();
			$(this).find('> .dropdown-menu').width(navItemWidth-16);
		});
	} else if (windowWidth >= 992) {
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
