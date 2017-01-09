$(document).ready(function() {
  $('#mc-embedded-subscribe-form').formchimp();

  $('#contact-form').submit(function(e) {
      var name = $('#inputName')
      var email = $('#inputEmail')
      var message = $('#inputMessage')
      var subject = $('#inputSubject')

      if(name.val() == "" || email.val() == "" || message.val() == "") {
        $('.submit-fail').fadeToggle(400);
        return false;
      }
      else {
        $.ajax({
          method: 'POST',
          url: '//formspree.io/hello@welltraveled.io',
          data: $('#contact-form').serialize(),
          datatype: 'json'
        });
        e.preventDefault();
        $(this).get(0).reset();
        $('.submit-success').fadeToggle(400);
      }
    });

  $('.submit-fail, .submit-success').click(function() {
    $(this).hide();
  })
  

  // for counter
  $('.count').each(function () {
      $(this).prop('Counter',554).animate({
          Counter: $(this).text()
      }, {
          duration: 7000,
          easing: 'swing',
          step: function (now) {
              $(this).text(Math.ceil(now));
          }
      });
  });

  // $(window).scroll(function() {
  //     var scroll = $(window).scrollTop();
  //
  //     if (scroll >= 100) {
  //         console.log(scrolled);
  //     } else {
  //       console.log(notscrolled);
  //     }
  //       console.log(notscrolled);
  // });
  });
