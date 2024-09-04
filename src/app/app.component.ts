import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  seatLayout = [
    Array(7).fill('available'), // 11 rows with 7 seats each
    Array(7).fill('available'),
    Array(7).fill('available'),
    Array(7).fill('available'),
    Array(7).fill('available'),
    Array(7).fill('available'),
    Array(7).fill('available'),
    Array(7).fill('available'),
    Array(7).fill('available'),
    Array(7).fill('available'),
    Array(7).fill('available'),
    Array(3).fill('available')  // Last row with 3 seats
  ];

  numSeats: number = 1;
  bookedSeats: number[] = []; // To keep track of all booked seats

  // Function to get seat number based on row and seat index
  getSeatNumber(rowIndex: number, seatIndex: number): number {
    let seatNumber = rowIndex * 7 + seatIndex + 1;
    if (rowIndex === this.seatLayout.length - 1) {
      seatNumber = (this.seatLayout.length - 1) * 7 + seatIndex + 1;
    }
    return seatNumber;
  }

  // Function to reserve seats based on input
  reserveSeats() {
    let seatsToBook = this.numSeats;
    let bookedInThisAction: number[] = [];

    // Step 1: Try to book in one row
    for (let rowIndex = 0; rowIndex < this.seatLayout.length; rowIndex++) {
      let row = this.seatLayout[rowIndex];
      let startIndex = -1;
      let count = 0;

      for (let seatIndex = 0; seatIndex < row.length; seatIndex++) {
        if (row[seatIndex] === 'available') {
          if (startIndex === -1) startIndex = seatIndex;
          count++;
        } else {
          startIndex = -1;
          count = 0;
        }

        if (count === seatsToBook) {
          for (let i = startIndex; i < startIndex + seatsToBook; i++) {
            row[i] = 'booked';
            bookedInThisAction.push(this.getSeatNumber(rowIndex, i));
          }
          this.bookedSeats = [...this.bookedSeats, ...bookedInThisAction];
          return; // Booking complete
        }
      }
    }

    // Step 2: If not enough seats in one row, book the nearest seats
    seatsToBook = this.numSeats;
    bookedInThisAction = [];
    for (let rowIndex = 0; rowIndex < this.seatLayout.length; rowIndex++) {
      let row = this.seatLayout[rowIndex];
      for (let seatIndex = 0; seatIndex < row.length; seatIndex++) {
        if (row[seatIndex] === 'available' && seatsToBook > 0) {
          row[seatIndex] = 'booked';
          bookedInThisAction.push(this.getSeatNumber(rowIndex, seatIndex));
          seatsToBook--;
          if (seatsToBook === 0) {
            this.bookedSeats = [...this.bookedSeats, ...bookedInThisAction];
            return; // Booking complete
          }
        }
      }
    }
  }

  // Function to handle seat click events
  bookSeat(rowIndex: number, seatIndex: number) {
    if (this.seatLayout[rowIndex][seatIndex] === 'available') {
      this.seatLayout[rowIndex][seatIndex] = 'booked';
      this.bookedSeats.push(this.getSeatNumber(rowIndex, seatIndex));
    }
  }
}
