import chai from 'chai';
const expect = chai.expect;

import Hotel from '../src/hotel';
import BookingsRepository from '../src/bookingsRepository';
import guestsTestData from '../test-data/guests-test-data.js';
import bookingsTestData from '../test-data/bookings-test-data.js';
import roomsTestData from '../test-data/rooms-test-data.js';

describe('Hotel', function() {
  let hotel, bookingsRepository;
  beforeEach(() => {
    bookingsRepository = new BookingsRepository(bookingsTestData);
    hotel = new Hotel(roomsTestData, bookingsRepository);
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

  describe('returnPercentRoomsOccupied', function() {
    it('should return percentage of available rooms for a specified date', function() {
      expect(hotel.returnPercentRoomsOccupied('2019/10/12')).to.equal(33);
    });
  });

  describe('returnTotalRevenue', function() {
    it('should return total money spent by all guests on a specified date', function() {
      expect(hotel.returnTotalRevenue('2019/11/22')).to.equal(836);
    });
  });

  describe('returnTotalSpent', function() {
    it('should return total money spent by one guest prior to a specified date', function() {
      expect(hotel.returnTotalSpent('2019/11/23', 1)).to.equal(2044);
    });
  });

  describe('filterAvailableRooms', function() {
    it('should return available rooms that match given room type', function() {
      expect(hotel.filterAvailableRooms('2019/12/23', 'residential suite')).to.deep.equal([{
        number: 1,
        roomType: "residential suite",
        bidet: true,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 358.4
      }]);
    });
  });

});
