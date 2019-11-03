class BookingRepository {
  constructor(bookings) {
    this.bookings = bookings;
  }

  viewBookings(guestId) {
    return this.bookings.filter(booking => booking.userID === guestId)
  }

  makeBooking(guestId, date, room) {
    return {
      id: Date.now(),
      userID: guestId,
      date: date,
      roomNumber: room,
      roomServiceCharges: []
    };
  }

  deleteBooking(guestId, date, room) {
    // TBD
  }

}

export default BookingRepository;
