import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service'; // Importation du service
import { CommonModule } from '@angular/common'; // Importation de CommonModule
import { EventStateService } from '../../services/event-state.service';
@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit {
  event: any = null;
  isInterested: boolean = false;  // État de l'intérêt pour l'événement
  isParticipating: boolean = false;  // État de la participation à l'événement

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private eventStateService: EventStateService // Injection du service
  ) {}

  ngOnInit() {
    const eventId = Number(this.route.snapshot.paramMap.get('id'));
    this.event = this.eventService.getEventById(eventId);

    // Récupération de l'état global pour l'événement
    const eventState = this.eventStateService.getEventState(eventId);
    this.isInterested = eventState.isInterested;
    this.isParticipating = eventState.isParticipating;
  }

  toggleInterest() {
    this.isInterested = !this.isInterested;
    this.eventStateService.updateEventState(this.event.id, {
      isInterested: this.isInterested,
      isParticipating: this.isParticipating
    });
  }

  toggleParticipation() {
    this.isParticipating = !this.isParticipating;
    this.eventStateService.updateEventState(this.event.id, {
      isInterested: this.isInterested,
      isParticipating: this.isParticipating
    });
  }

}
