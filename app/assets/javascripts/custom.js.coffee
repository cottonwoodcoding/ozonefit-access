$(document).ready ->

  $(".button-collapse").sideNav()
  
  $('.alert').show ->
    setTimeout (->
      $('.alert').slideToggle()
    ), 5000