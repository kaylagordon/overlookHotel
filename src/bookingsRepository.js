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

  findBookingId(guestId, date) {
    return this.bookings.find(booking => booking.userID === guestId && booking.date === date).id;
  }

}

export default BookingsRepository;
