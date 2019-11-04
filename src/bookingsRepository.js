class BookingsRepository {
  constructor(bookings) {
    this.bookings = bookings;
  }

  viewBookings(guestId) {
    return this.bookings.filter(booking => booking.userID === guestId)
  }

  makeBooking(guestId, date, room) {
    return {
      userID: guestId,
      date: date,
      roomNumber: room
    };
  }

  deleteBooking(guestId, date, room) {
    // TBD
  }

}

export default BookingsRepository;
