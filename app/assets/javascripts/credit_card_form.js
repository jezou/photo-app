$(document).ready(function() {
  console.log("start");
  var show_error, stripeResponseHandler, submitHandler;

  submitHandler = function(event) {
    console.log("submit handler");
    var $form = $(event.target);
    $form.find("input[type=submit]").prop("disabled", true)

    console.log("asdf");

    if(Stripe) {
      Stripe.card.createToken($form, stripeResponseHandler);
      console.log("created token");
    }
    else {
      show_error("Failed to load credit card processing. Please reload page in browser");
    }
    return false
  };

  $(".cc_form").on("submit", submitHandler);

  stripeResponseHandler = function(status, response) {
    var token, $form;
    $form = $('.cc_form');
    console.log("stripe response");
    console.log(response.error.message);

    if(response.error) {
      console.log(response.error.message);
      show_error(response.error.message);
      $form.find("input[type=submit]").prop("disabled", false);
    }
    else {
      token = reponse.id;
      $form.append($("<input type=\"hidden\" name=\"payment[token]\"/>").val(token));
      $("[data-stripe=number]").remove();
      $("[data-stripe=cvv]").remove();
      $("[data-stripe=exp-year]").remove();
      $("[data-stripe=exp-month]").remove();
      $("[data-stripe=label]").remove();
      $form.get(0).submit();
    }
    return false;
  };

  show_error = function(message) {
    console.log("here");
    if($("#flash-messages").size() < 1) {
      $('div.container.main div:first').prepend("<div id='flash-messages'></div>")
    }
    $("#flash-messages").html('<div class="alert alert-warning"><a class="close" data-dismiss="alert">x</a><div id="flash_alert">' + message + "</div></div>");
    $(".alert").delay(5000).fadeOut(3000);
    return false;
  };
});