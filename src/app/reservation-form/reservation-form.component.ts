import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css'],
})
export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', [Validators.required, Validators.min(1)]],
    });

    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.reservationService
        .getReservation(id)
        .subscribe((reservationFromApi) => {
          if (reservationFromApi) {
            this.reservationForm.patchValue(reservationFromApi);
          }
        });
    }
  }

  submitReservation() {
    if (this.reservationForm.valid) {
      let newReservation = this.reservationForm.value;

      let id = this.activatedRoute.snapshot.paramMap.get('id');

      if (!id) {
        this.reservationService
          .createReservation(newReservation)
          .subscribe(() => {
            console.log('new reservation was rpecessed');
          });
      } else {
        this.reservationService
          .updateReservation(id, newReservation)
          .subscribe(() => console.log("update request was processed"));
      }

      this.router.navigate(['/list']);
    }
  }
}
