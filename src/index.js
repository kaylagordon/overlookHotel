// IMPORTS
import $ from 'jquery';
import './css/base.scss';
import Hotel from '../src/hotel';
import BookingsRepository from '../src/bookingsRepository';

// FETCH
let roomsFetchData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
.then(response => response.json());

let bookingsFetchData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
.then(response => response.json());

let guestsFetchData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
.then(response => response.json());

let roomsData;
let bookingsData;
let guestsData;
let bookingsRepository;
let hotel;

Promise.all([roomsFetchData, bookingsFetchData, guestsFetchData])
.then(data => {
  roomsData = data[0].rooms;
  bookingsData = data[1].bookings;
  guestsData = data[2].users;
})
.then(() => {
  bookingsRepository = new BookingsRepository(bookingsData);
  hotel = new Hotel(roomsData, bookingsRepository);
})
.then(() => {
  //do all the things
  console.log('hotel:', hotel);
  console.log('bookings:', bookingsRepository);
});

// HTML PAGE NAVIGATION
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
