import chai from 'chai';
const expect = chai.expect;

import BookingsRepository from '../src/bookingsRepository';
import guestsTestData from '../test-data/guests-test-data.js';
import bookingsTestData from '../test-data/bookings-test-data.js';
import roomsTestData from '../test-data/rooms-test-data.js';

describe('bookingsRepository', function() {
  let bookingsRepository;
  beforeEach(() => {
    bookingsRepository = new BookingsRepository(bookingsTestData);
  });

  it('should be a function', function() {
    expect(BookingsRepository).to.be.a('function');
  });

  it('should hold bookings', function() {
    expect(bookingsRepository.bookings.length).to.equal(10);
    expect(bookingsRepository.bookings[3]).to.deep.equal(  {
      id: 4,
      userID: 2,
      date: "2019/11/15",
      roomNumber: 2,
      roomServiceCharges: [ ]
      });
  });

  describe('viewBookings', function() {
    it('should return all bookings for specified guest', function() {
      expect(bookingsRepository.viewBookings(1).length).to.equal(5);
      expect(bookingsRepository.viewBookings(1)[0]).to.deep.equal({
      id: 1,
      userID: 1,
      date: "2019/10/06",
      roomNumber: 1,
      roomServiceCharges: [ ]
      });
    });
  });

  describe('addBooking', function() {
    it('should return all bookings for specified guest', function() {
      expect(bookingsRepository.makeBooking(1, '2020/10/12', 3).userID).to.equal(1);
    });
  });

  describe('findBookingId', function() {
    it('should return all bookings for specified guest', function() {
      expect(bookingsRepository.findBookingId(2, '2019/11/15')).to.equal(4);
    });
  });

});
