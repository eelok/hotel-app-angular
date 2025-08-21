import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private reservations: Reservation[] = [];

  getReservations(): Reservation[] {
    return this.reservations;
  }

  getReservation(id: string): Reservation | undefined {
    return this.reservations.find((reservation) => reservation.id === id);
  }

  createReservation(reservation: Reservation): void {
    reservation.id = uuidv4();
    this.reservations.push(reservation);
  }

  deleteReservation(id: string): Reservation[] {
    let fileredReservations = this.reservations.filter(
      (reservation) => reservation.id !== id
    );
    this.reservations = fileredReservations;
    return this.reservations;
  }

  updateReservation(id: string, undatedReservation: Reservation) {
    let index = this.reservations.findIndex((res) => res.id === id);
    this.reservations[index] = undatedReservation;
  }
}
