
//  Preloader
jQuery(window).on("load", function() {
    $('#preloader').fadeOut(500);
    $('#main-wrapper').addClass('show');
});


$(document).ready(function() {


    //  Header fixed
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.header').addClass("animated slideInDown fixed"), 3000;
        } else {
            $('.header').removeClass("animated slideInDown fixed"), 3000;
        }
    });

    $('select').niceSelect();

    
    // if ($(window).innerWidth() <= 991) {
    //     $('.header .dropdown').on('show.bs.dropdown', function(e) {
    //         $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
    //     });

    //     $('.header .dropdown').on('hide.bs.dropdown', function(e) {
    //         $(this).find('.dropdown-menu').first().stop(true, true).slideUp(200);
    //     });

    // }

    $(function() {
        for (var nk = window.location,
                o = $(".menu a").filter(function() {
                    return this.href == nk;
                })
                .addClass("active")
                .parent()
                .addClass("active");;) {
            // console.log(o)
            if (!o.is("li")) break;
            o = o.parent()
                .addClass("show")
                .parent()
                .addClass("active");
        }

    });

    /*$(function() {
        // var win_w = window.outerWidth;
        var win_h = window.innerHeight;
        if (win_h > 0 ? win_h : screen.height) {
            $(".content-body").css("min-height", (win_h + 60) + "px");
        };
    });*/


});




