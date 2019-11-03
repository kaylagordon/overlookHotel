import chai from 'chai';
const expect = chai.expect;

import Hotel from '../src/hotel';
import BookingRepository from '../src/bookingRepository';
import guestTestData from '../test-data/guest-test-data.js';
import bookingsTestData from '../test-data/bookings-test-data.js';
import roomsTestData from '../test-data/rooms-test-data.js';

describe('Hotel', function() {
  let hotel, bookingRepository;
  beforeEach(() => {
    bookingRepository = new BookingRepository(bookingsTestData);
    hotel = new Hotel(roomsTestData, bookingRepository);
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

  describe('viewRoomsAvailable', function() {
    it('should return available rooms for a specified date', function() {
      expect(hotel.viewRoomsAvailable('2019/10/12').length).to.equal(2);
    });
  });

  describe('returnPercentRoomsAvailable', function() {
    it('should return percentage of available rooms for a specified date', function() {
      expect(hotel.returnPercentRoomsAvailable('2019/10/12')).to.equal(67);
    });
  });

  describe('returnTotalRevenue', function() {
    it('should return total money spent by all guests on a specified date', function() {
      expect(hotel.returnTotalRevenue("2019/11/22")).to.equal(835.78);
    });
  });

  describe('returnTotalSpent', function() {
    it('should return total money spent by one guest prior to a specified date', function() {
      expect(hotel.returnTotalSpent("2019/11/23", 1)).to.equal(2044);
    });
  });

});