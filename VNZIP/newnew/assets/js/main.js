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
        console.log(params);
        $.ajax({
            url: 'https://script.google.com/macros/s/AKfycbySydaat2gvvqufr59LrIcG6Q3Jclbnr42x946cU9iSCmEd9HQ/exec?' + params,
            method: 'GET'
        }).done(function() {
            alert('Thông tin của bạn đã được gửi đi. Chúng tôi sẽ liên hệ với bạn trong thời sớm nhất.')
        }).fail(function() {
            alert('Đã có lỗi xảy ra. Xin lỗi vì sự bất tiện này, xin hãy quay lại sau.');
        });        
    });
});