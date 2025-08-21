import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private reservations: Reservation[] = [];

  private baseUrl = 'http://localhost:3001/';

  constructor(private http: HttpClient) { }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.baseUrl + 'reservations');
  }

  getReservation(id: string): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.baseUrl}reservations/${id}`);
  }

  createReservation(reservation: Reservation): Observable<void> {
    reservation.id = uuidv4();
    return this.http.post<void>(this.baseUrl + 'reservations', reservation);
  }

  deleteReservation(id: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + 'reservations/' + id);
  }

  updateReservation(id: string, undatedReservation: Reservation): Observable<void> {
    return this.http.put<void>(this.baseUrl + 'reservations/' + id, undatedReservation);
  }
}
