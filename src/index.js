import $ from 'jquery';
import './css/base.scss';
import Hotel from '../src/hotel';
import BookingsRepository from '../src/bookingsRepository';

let bookingsFetchData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
.then(response => response.json());

let guestsFetchData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
.then(response => response.json());

let roomsFetchData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
.then(response => response.json());

let bookingsData;
let bookingsRepository;
let customerName;
let guestsData;
let guestId;
let hotel;
let roomsData;
let todayDate = getTodayDate();

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
  addManagerDataToDom();
  addGuestDataToDOM();
})
.catch(error => {
  console.log(error);
});

$('#available-rooms').click(() => {
  if ($('.individual-rooms').hasClass('hoverable')) {
    $('.individual-rooms').removeClass('hoverable');
    $(event.target).closest('div').addClass('clicked');
  } else if ($(event.target).closest('div').hasClass('clicked')) {
    $('.individual-rooms').addClass('hoverable');
    $(event.target).closest('div').removeClass('clicked');
  }
});

$('.book-another-button').click(() => {
  location.reload();
});

$('#cancel-login-button').click(() => {
  window.location = './index.html';
});

$('.close-message-button').click(() => {
  $('.call-hotel-message').addClass('hide');
  $('.bookings-date').addClass('hoverable');
})

$('.complete-booking-button').click(() => {
  if ($('.clicked').html()) {
    completeBooking();
  }
});

$('.filter-button').click(() => {
  let numDate = numifyDate($('#start-date').val(), '-');
  let bookingDate = stringifyDate(numDate);
  $('#guest-filter-page').addClass('hide');
  let filteredRooms = hotel.filterAvailableRooms(bookingDate, $('select').val());
  showAvailableRooms(filteredRooms);
});

$('#find-available-rooms-button').click(() => {
  let numDate = numifyDate($('#start-date').val(), '-');
  let date = stringifyDate(numDate);
  if (checkDate(date)) {
    showAvailableRooms(hotel.viewRoomsAvailable(date));
  } else {
    $('#available-rooms').text('');
    $('#available-rooms').append(`
      <br/>
      That date is in the past.
      <br/>
      We do not have time travelling capabilities (yet).
      <br/>
      Please choose another date.
      `
    )
  }
});

$('#find-customer-button').click(() => {
  logIn();
  window.location = './manager-guest-view.html';
});

$('#guest-button').click(() => {
  window.location = './login.html';
});

$('#guest-booking-info').click(() => {
  $('main').addClass('darken');
  $('.call-hotel-message').removeClass('hide');
  $('.bookings-date').removeClass('hoverable');
});

$('#login-button').click(() => {
  if ($('#username-input').val().includes('customer') && $('#password-input').val() === 'overlook2019') {
    guestId = $('#username-input').val().split('r')[1];
    localStorage.setItem('guestId', guestId);
    window.location = './guest-view.html';
  } else if ($('#username-input').val() === 'manager' && $('#password-input').val() === 'overlook2019') {
    window.location = './manager-view.html';
  } else {
    $('#login-error').removeClass('hide');
  }
});

$('.logout-button').click(() => {
  window.location = './index.html';
});

$('.manager-bookings-list').click(() => {
  if ($('.bookings-date').hasClass('hoverable')) {
    $('.bookings-date').removeClass('hoverable');
    $(event.target).closest('div').addClass('clicked');
  } else if ($(event.target).closest('div').hasClass('clicked') && $(event.target).hasClass('delete-booking-button')) {
    let bookingDate = $(event.target).parent().html().split('x')[1];
    let bookingId = bookingsRepository.findBookingId(guestId, bookingDate);
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: bookingId
      })
    }).then(() => hideDeletedBooking())
    .catch(error => {
      console.log(error);
    });
  } else if ($(event.target).closest('div').hasClass('clicked')) {
    $('.bookings-date').addClass('hoverable');
    $(event.target).closest('div').removeClass('clicked');
  }
});

$('#manager-button').click(() => {
  window.location = './login.html';
});

$('.manager-go-back-button').click(() => {
  window.location = './manager-view.html';
});

$('#password-input').keyup(() => {
  $('#login-error').addClass('hide');
});

$('.show-filter-options-button').click(() => {
  $('.individual-rooms').removeClass('hoverable');
  $('#guest-filter-page').removeClass('hide');
});

$('#username-input').keyup(() => {
  $('#login-error').addClass('hide');
});

function addGuestDataToDOM() {
  guestId = parseInt(localStorage.getItem('guestId'));
  showBookings('#guest-booking-info');
  showBookings('.manager-bookings-list');
  customerName = localStorage.getItem('customerName').toUpperCase();
  $('.guest-name').text(customerName);
  $('#total-spent').text(`$${hotel.returnTotalSpent(guestId)}`);
  $('#reward-remainder').text(`$${10000 - hotel.returnTotalSpent(guestId)}`);
}

function addManagerDataToDom() {
  $('#rooms-available').text(hotel.viewRoomsAvailable(todayDate).length);
  $('#percent-occupied').text(`${hotel.returnPercentRoomsOccupied(todayDate)}%`);
  $('#total-revenue').text(`$${hotel.returnTotalRevenue(todayDate)}`);
}

function checkDate(inputDate) {
  let guestDate = numifyDate(inputDate, '/');
  let todayDate = numifyDate(getTodayDate(), '/');
  if (guestDate > todayDate) {
    return true;
  } else {
    return false;
  }
}

function completeBooking() {
  let numDate = numifyDate($('#start-date').val(), '-');
  let bookingDate = stringifyDate(numDate);
  let roomNumber = parseInt($('.clicked').html().split('x')[1]);
  let postData = bookingsRepository.makeBooking(guestId, bookingDate, roomNumber);
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  })
  .then(() => showSuccessPage())
  .catch(error => {
    console.log(error);
  });
}

function getTodayDate() {
  let date = new Date();
  let month = date.getUTCMonth() + 1;
  let day = date.getUTCDate();
  let year = date.getUTCFullYear();
  if (day < 10 && month < 10) {
    return `${year}/0${month}/0${day}`;
  } else if (day < 10 && month >= 10) {
    return `${year}/${month}/0${day}`;
  } else if (day >= 10 && month < 10) {
    return `${year}/0${month}/${day}`;
  } else {
    return `${year}/${month}/${day}`;
  }
}

function hideDeletedBooking() {
  $('.clicked').remove();
  $('.bookings-date').addClass('hoverable');
  showSuccessPage()
}

function logIn() {
  let customer = guestsData.find(guest => guest.name === $('#customer-input').val());
  guestId = customer.id;
  localStorage.setItem('guestId', guestId);
  customerName = customer.name;
  localStorage.setItem('customerName', customerName);
}

function numifyDate(date, character) {
  let year = parseInt(date.split(character)[0]);
  let month = parseInt(date.split(character)[1]);
  let day = parseInt(date.split(character)[2]);
  if (day < 10 && month < 10) {
    return parseInt(`${year}0${month}0${day}`);
  } else if (day < 10 && month >= 10) {
    return parseInt(`${year}${month}0${day}`);
  } else if (day >= 10 && month < 10) {
    return parseInt(`${year}0${month}${day}`);
  } else {
    return parseInt(`${year}${month}${day}`);
  }
}

function showAvailableRooms(method) {
  $('#available-rooms').text('');
  if (method.length) {
    method.forEach(room => {
      $('#available-rooms').append(
        `
        <div class='individual-rooms' tabindex=1>
        <b id='x${room.number}x'></b>
        <b>ROOM TYPE</b>: ${room.roomType}
        </br>
        <b>NUMBER OF BEDS</b>: ${room.numBeds}
        </br>
        <b>BED SIZE</b>: ${room.bedSize}
        </br>
        <b>PRICE</b>: $${room.costPerNight}
        <br/>
        <br/>
        </div>
        `
      )
    })
    $('.individual-rooms').addClass('hoverable');
  } else {
    $('#available-rooms').append(
      `
      <b>We are so sorry, but there are no rooms available for that date. Please try another date.</b>
      `
    )
  }
}

function showBookings(section) {
  $(section).text('');
  let bookingDates = bookingsRepository.viewBookings(guestId).map(booking => booking.date)
  let sortedBookings = sortDates(bookingDates);
  if (section === '.manager-bookings-list') {
    sortedBookings.forEach(date => {
      $(section).append(
        `
        <div class='bookings-date'>
        <b id='x${date}x'></b>
        <p><b>DATE</b>: ${date}</p>
        <br/>
        <button type='button' name='delete-booking-button' class='delete-booking-button'>DELETE BOOKING</button>
        </div>
        `
      )
    })
  } else {
    sortedBookings.forEach(date => {
      $(section).append(
        `
        <div class='bookings-date'>
        <b>DATE</b>: ${date}
        <br/>
        </div>
        `
      )
    })
  }
  $('.bookings-date').addClass('hoverable');
}

function showSuccessPage() {
  $('.clicked').removeClass('clicked');
  $('#guest-success-page').removeClass('hide');
}

function sortDates(dates) {
  let numDates = [];
  dates.forEach(date => {
    numDates.push(numifyDate(date, '/'));
  })
  return numDates.sort((a, b) => b - a).map(date => stringifyDate(date))
}

function stringifyDate(date) {
  let splitDate = date.toString().split('');
  let year = `${splitDate[0]}${splitDate[1]}${splitDate[2]}${splitDate[3]}`;
  let month = `${splitDate[4]}${splitDate[5]}`;
  let day = `${splitDate[6]}${splitDate[7]}`;
  return `${year}/${month}/${day}`
}
