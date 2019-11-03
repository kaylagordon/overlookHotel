class Hotel {
  constructor(rooms, bookingRepo) {
    this.rooms = rooms;
    this.bookings = bookingRepo.bookings;
  }

  viewRoomsAvailable(date) {
    let bookingsOnDate = this.bookings.filter(booking => booking.date === date).map(booking => booking.roomNumber);
    let availableRooms = this.rooms.reduce((openRooms, room) => {
      if (!bookingsOnDate.includes(room.number)) {
        openRooms.push(room);
      }
      return openRooms;
    }, []);
    return availableRooms;
  };

  returnPercentRoomsAvailable(date) {
    let decimal = this.viewRoomsAvailable(date).length / this.rooms.length;
    let percent = Math.round(decimal * 100);
    return percent;
  }

  returnTotalRevenue(date) {
    let bookingsOnDate = this.bookings.filter(booking => booking.date === date).map(booking => booking.roomNumber);
    let totalRevenue = this.rooms.reduce((totalMoney, room) => {
      if (bookingsOnDate.includes(room.number)) {
        totalMoney += room.costPerNight;
      }
      return totalMoney;
    }, 0);
    return totalRevenue;
  };

  returnTotalSpent(date, guestId) {
    let guestBookings = this.bookings.filter(booking => booking.userID === guestId).map(booking => booking.roomNumber);
    let totalSpent = guestBookings.reduce((totalMoney, roomNumber) => {
      this.rooms.forEach(room => {
        if (room.number === roomNumber) {
          totalMoney += room.costPerNight;
        }
      });
      return totalMoney;
    }, 0);
    return Math.round(totalSpent);
  }
};

export default Hotel;
