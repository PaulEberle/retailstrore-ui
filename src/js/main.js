$(function(){

	var windowWidth = $(window).width();
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
});
