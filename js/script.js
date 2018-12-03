"use strict";
jQuery(document).ready(function ($) {
    
    // scroll Up
    $('.scrollUp').hide();

    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.scrollUp').fadeIn('slow');
        } else {
            $('.scrollUp').fadeOut('slow');
        }
    });
    $('.scrollUp').click(function () {
        $("html, body").animate({scrollTop: 0}, 700);
        return false;
    });
    
    // smooth menu scrolling
    
    $("#menu").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 700);
    });
    
    // accordeon
    
     $('#accordeon .acc-head').on('click', function() {
        if(!$(this).hasClass('active')){
            $('#accordeon .acc-head').removeClass('active').next().slideUp();
            $(this).addClass('active').next().slideToggle();
        }
    });
    
    // magnificPopup with Google map

    $('.map-link').magnificPopup({
        midClick: true,
        closeBtnInside: true,
        callbacks: {
            open: function () {
                initMap();
            }
        }
    });
    
    // magnificPopup with register modal window
    
    $('.popup-with-form').magnificPopup({
       type: 'inline',
       focus: '#registerName'
    });

	  // phone number mask
    var keyCode;

    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        // if (pos < 3) event.preventDefault(); // for Russia
        if (pos < 1) event.preventDefault();
        // var matrix = "+7 (___) ___-__-__", // for Russia
        var matrix = "+_ (___) ___-__-__",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          new_value = matrix.replace(/[_\d]/g, function(a) {
            return i < val.length? val.charAt(i++) || def.charAt(i): a
          });
        i = new_value.indexOf("_");
        if (i != -1) {
          i < 5 && (i = 3);
          new_value = new_value.slice(0, i)
        }
        var reg = matrix.substr(0, this.value.length).replace(/_+/g,
          function(a) {
            return "\\d{1," + a.length + "}"
          }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5) this.value = ""
    }

      var input = document.querySelector("#userphone");
      input.addEventListener("input", mask, false);
      input.addEventListener("focus", mask, false);
      input.addEventListener("blur", mask, false);
      input.addEventListener("keydown", mask, false);

      var input = document.querySelector("#registerPhone");
      input.addEventListener("input", mask, false);
      input.addEventListener("focus", mask, false);
      input.addEventListener("blur", mask, false);
      input.addEventListener("keydown", mask, false);
    
    // animation
    
    $('.benefitsItem h4').addClass("hiddenBlock").viewportChecker({
        classToAdd: 'visibleBlock animated zoomIn',
        offset: 100
    });

    $('.whyChoseUsItemLeft').addClass("hiddenBlock").viewportChecker({
        classToAdd: 'visibleBlock animated slideInLeft',
        offset: 100
    });

    $('.whyChoseUsItemRight').addClass("hiddenBlock").viewportChecker({
        classToAdd: 'visibleBlock animated slideInRight',
        offset: 100
    });

    $('.whyChoseUsItem').addClass("hiddenBlock").viewportChecker({
        classToAdd: 'visibleBlock animated fadeIn',
        offset: 100
    });
    
    $('.achievementsNumber').addClass("hiddenBlock").viewportChecker({
        classToAdd: 'visibleBlock animated zoomIn',
        offset: 100
    });

    $('.galleryItem').addClass("hiddenBlock").viewportChecker({
        classToAdd: 'visibleBlock animated fadeIn',
        offset: 100
    });

    $('.ourTeamItem').addClass("hiddenBlock").viewportChecker({
        classToAdd: 'visibleBlock animated zoomIn',
        offset: 100
    });
    
    $('.footerItem').addClass("hiddenBlock").viewportChecker({
        classToAdd: 'visibleBlock animated fadeIn',
        offset: 100
    });


});

// Google map

function initMap() {
    var element = document.getElementById('map');
    var options = {
        zoom: 12,
        center: {lat: 42.361145, lng: -71.057083}
    };

    var myMap = new google.maps.Map(element, options);

    var markers = [
        {
            coordinates: {lat: 42.361145, lng: -71.057083},
            info: '<h3>We are located here</h3>'
        }
    ];

    for(var i = 0; i < markers.length; i++) {
        addMarker(markers[i]);
    }

    function addMarker(properties) {
        var marker = new google.maps.Marker({
            position: properties.coordinates,
            map: myMap
        });

        if(properties.info) {
            var InfoWindow = new google.maps.InfoWindow({
                content: properties.info
            });

            marker.addListener('click', function(){
                InfoWindow.open(myMap, marker);
            })
        }
    }
}