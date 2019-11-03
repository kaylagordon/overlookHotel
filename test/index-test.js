import chai from 'chai';
const expect = chai.expect;

import Hotel from '../src/hotel';
import guestTestData from '../test-data/guest-test-data.js';
import bookingsTestData from '../test-data/bookings-test-data.js';
import roomsTestData from '../test-data/rooms-test-data.js';

describe('Hotel', function() {
  let hotel, bookings;
  beforeEach(() => {
    hotel = new Hotel(roomsTestData, bookingsTestData);
  });

  it('should be a function', function() {
    expect(Hotel).to.be.a('function');
  });

  it('should hold hotel rooms', function() {
    expect(hotel.rooms.length).to.equal(3);
    expect(hotel.rooms[0].roomType).to.equal('residential suite');
  });

  it('should hold bookings', function() {
    expect(hotel.bookings.length).to.equal(10);
    expect(hotel.bookings[3]).to.deep.equal(  {
      id: 4,
      userID: 2,
      date: "2019/11/15",
      roomNumber: 2,
      roomServiceCharges: [ ]
      });
  });

});
