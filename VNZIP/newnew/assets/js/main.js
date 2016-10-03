$(document).ready(function() {
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        var form = $(this)[0];   
        var params = $.param({
           lastname: form.lastname.value,
           name: form.name.value,
           phone: form.phone.value,
           email: form.email.value,
           address: form.address.value,
           province: form.province.value,
           country: form.country.value,
           childno: form.childno.value
        });
        $.ajax({
            url: 'https://script.google.com/macros/s/AKfycbySydaat2gvvqufr59LrIcG6Q3Jclbnr42x946cU9iSCmEd9HQ/exec?' + params,
            method: 'GET'
        }).done(function(res) {
            if (JSON.parse(res).success) {
                alert('Thông tin của bạn đã được gửi đi. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.');
            }
        }).fail(function(res) {
            alert('Đã có lỗi xảy ra. Xin lỗi vì sự bất tiện này, xin hãy quay lại sau.');
        });        
    });

    $('.js-navigation li a').on('click', function() {
        var delta = 56;
        if (window.innerWidth < 768) {
            delta = 50;
        }
        var href = $(this).attr('href');
        var section = $(href);
        var offset = (section.offset().top - delta) < 0 ? 0 : section.offset().top - delta; 
        $('html, body').animate({scrollTop: offset}, 1000);
    });
});