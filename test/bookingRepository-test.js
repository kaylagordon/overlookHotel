import chai from 'chai';
const expect = chai.expect;

import BookingRepository from '../src/bookingRepository';
import guestTestData from '../test-data/guest-test-data.js';
import bookingsTestData from '../test-data/bookings-test-data.js';
import roomsTestData from '../test-data/rooms-test-data.js';

describe('bookingRepository', function() {
  let bookingRepository;
  beforeEach(() => {
    bookingRepository = new BookingRepository(bookingsTestData);
  });

  it('should be a function', function() {
    expect(BookingRepository).to.be.a('function');
  });

  it('should hold bookings', function() {
    expect(bookingRepository.bookings.length).to.equal(10);
    expect(bookingRepository.bookings[3]).to.deep.equal(  {
      id: 4,
      userID: 2,
      date: "2019/11/15",
      roomNumber: 2,
      roomServiceCharges: [ ]
      });
  });

  describe('viewBookings', function() {
    it('should return all bookings for specified guest', function() {
      expect(bookingRepository.viewBookings(1).length).to.equal(5);
      expect(bookingRepository.viewBookings(1)[0]).to.deep.equal({
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
      expect(bookingRepository.makeBooking(1, '2020/10/12', 3).userID).to.equal(1);
    });
  });

  // describe('deleteBooking', function() {
  //   it('should return all bookings for specified guest', function() {
  //     expect(bookingRepository.deleteBooking()).to.equal();
  //   });
  // });

});
