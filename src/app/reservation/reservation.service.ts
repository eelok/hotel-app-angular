import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private reservations: Reservation[] = [];

  constructor() {
    let storedReservations = localStorage.getItem('reservations');
    this.reservations = storedReservations
      ? JSON.parse(storedReservations)
      : [];
  }

  getReservations(): Reservation[] {
    return this.reservations;
  }

  getReservation(id: string): Reservation | undefined {
    return this.reservations.find((reservation) => reservation.id === id);
  }

  createReservation(reservation: Reservation): void {
    this.reservations.push(reservation);
    console.log(reservation);
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }

  deleteReservation(id: string): Reservation[] {
    let fileredReservations = this.reservations.filter(
      (reservation) => reservation.id !== id
    );
    if (fileredReservations.length == 0) {
      throw new Error('reservation with the id:' + id + 'does not exitst');
    }
    this.reservations = fileredReservations;
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
    return this.reservations;
  }

  updateReservation(undatedReservation: Reservation) {
    let index = this.reservations.findIndex(
      (res) => res.id === undatedReservation.id
    );
    this.reservations[index] = undatedReservation;
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }
}
