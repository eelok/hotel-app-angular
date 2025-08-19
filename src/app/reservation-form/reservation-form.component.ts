import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css'],
})
export class ReservationFormComponent {
  reservationForm: FormGroup = new FormGroup({});

  submitReservation() {
    console.log('>>>>> submitReservation');
  }
}
