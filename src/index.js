// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');

$('#guest-button').click(() => {
  window.location = './login.html';
})

$('#manager-button').click(() => {
  window.location = './login.html';
})

$('#login-button').click(() => {
  if ($('#username-input').val().includes('customer') && $('#password-input').val() === 'overlook2019') {
    window.location = './guest-view.html';
  } else if ($('#username-input').val() === 'manager' && $('#password-input').val() === 'overlook2019') {
    window.location = './manager-view.html';
  } else {
    $('#login-error').removeClass('hide');
  }
})

$('#username-input').keyup(() => {
  $('#login-error').addClass('hide');
})

$('#password-input').keyup(() => {
  $('#login-error').addClass('hide');
})

$('#cancel-login-button').click(() => {
  window.location = './index.html';
})

$('.logout-button').click(() => {
  window.location = './index.html';
})
