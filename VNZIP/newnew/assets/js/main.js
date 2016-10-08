$(document).ready(function() {
    var lang = window.location.pathname.split('/')[1] || 'vi';
    var successMessage = 'Thông tin của bạn đã được gửi đi. Cảm ơn bạn đã đăng ký. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.';
    var failMessage = 'Đã có lỗi xảy ra. Xin lỗi bạn vì sự bất tiện này. Vui lòng thử lại sau';
    var submittingText = 'ĐANG GỬI...';
    var submitText = 'ĐĂNG KÝ';
    if (lang === 'en') {
        successMessage = 'Your information have been sent. Thank you for registration. We will contact you as soon as possible.';
        failMessage = 'There are some errors. Sorry for this inconvienent. Please try again later';
        submittingText = 'SENDING...';
        submitText = 'SEND';
    }

    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        var submitButton = $('.form-btn-submit');
        var form = $(this)[0];
        var params = $.param({
            lastname: form.lastname.value,
            name: form.name.value,
            phone: form.phone.value,
            email: form.email.value,
            address: form.address.value,
            province: form.province.value,
            country: form.country.value,
            childno: form.childno.value,
            useragent: navigator.userAgent
        });

        submitButton.html(submittingText);
        submitButton.attr('disabled','');
        $.ajax({
            url: 'https://script.google.com/macros/s/AKfycbySydaat2gvvqufr59LrIcG6Q3Jclbnr42x946cU9iSCmEd9HQ/exec?' + params,
            method: 'GET',
            error: function(jqXHR, textStatus, errorThrow) {
                if (jqXHR.status === 405 || jqXHR.status === 0) {
                    alert(successMessage);
                } else {
                    alert(failMessage);
                }
                submitButton.removeAttr('disabled');
                submitButton.html(submitText);                        
            }
        }).done(function(res) {
            if (JSON.parse(res).success) {
                alert(successMessage);
                submitButton.removeAttr('disabled');
                submitButton.html(submitText);
            }
        });
    });

    $('.js-navigation li a, a[href^="#"]:not([data-toggle], [data-slide])').on('click', function() {
        var delta = 56;
        if (window.innerWidth < 768) {
            delta = 50;
        }
        var href = $(this).attr('href');
        var section = $(href);
        var offset = (section.offset().top - delta) < 0 ? 0 : section.offset().top - delta; 
        $('html, body').animate({scrollTop: offset}, 1000);

        if ($('.navbar-collapse').hasClass('in')) {
            $('.navbar-collapse').collapse('hide');
        }
    });

    $('.navbar-collapse').on('shown.bs.collapse', function() {       
        $('.body').css({
            height: '100vh',
            overflow: 'hidden'
        });
    });
    $('.navbar-collapse').on('hidden.bs.collapse', function() {
        $('.body').css({
            height: 'auto',
            overflow: 'auto'
        });
    });

    var amountScrolled = 300;

    $(window).scroll(function() {
        if ( $(window).scrollTop() > amountScrolled ) {
            $('a.back-to-top').fadeIn('slow');
        } else {
            $('a.back-to-top').fadeOut('slow');
        }
    });
});