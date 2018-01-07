    
	/*Menu-toggle*/
    jQuery("#menu-toggle").click(function(e) {
        e.preventDefault();
        jQuery("#wrapper").toggleClass("active");
    });

    /*Scroll Spy*/
    jQuery('body').scrollspy({ target: '#spy', offset:80});

    /*Smooth link animation*/
    jQuery('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

            var target = jQuery(this.hash);
            target = target.length ? target : jQuery('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                jQuery('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });