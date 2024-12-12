import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class EventStateService {
  private eventsState: { [id: number]: { isInterested: boolean; isParticipating: boolean } } = {};

  // Récupérer l'état d'un événement par son ID
  getEventState(eventId: number) {
    return this.eventsState[eventId] || { isInterested: false, isParticipating: false };
  }

  // Mettre à jour l'état d'un événement par son ID
  updateEventState(eventId: number, state: { isInterested: boolean; isParticipating: boolean }) {
    this.eventsState[eventId] = { ...this.getEventState(eventId), ...state };
  }
}
