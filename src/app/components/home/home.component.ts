import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service'; // Importation du service
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Importation de RouterModule pour routerLink
import { FormsModule } from '@angular/forms'; // Pour utiliser ngModel
import { EventStateService } from '../../services/event-state.service'; // Import du service partagé

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // Ajout de RouterModule ici
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  events: any[] = [];
  filteredEvents: any[] = [];
  categories: string[] = ['Nettoyage de plage', 'Conférence', 'Atelier', 'Marche'];
  selectedCategory: string = '';

  constructor(
    private eventService: EventService,
    private eventStateService: EventStateService // Injection du service
  ) {}
  ngOnInit() {
    // Récupérer tous les événements
    this.events = this.eventService.getEvents().map(event => ({
      ...event,
      ...this.eventStateService.getEventState(event.id), // Récupérer l'état global
      isOngoing: this.isEventOngoing(event.date),
    }));

    // Trier les événements par date (les plus proches en premier)
    this.events.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA - dateB; // Tri ascendant, plus proche en haut
    });

    this.filteredEvents = this.events;
  }
  // Vérifier si l'événement a lieu aujourd'hui
  isEventOngoing(eventDate: string): boolean {
    const today = new Date();
    const eventDateObj = new Date(eventDate);

    // Comparer la date de l'événement avec la date d'aujourd'hui
    return (
      today.getFullYear() === eventDateObj.getFullYear() &&
      today.getMonth() === eventDateObj.getMonth() &&
      today.getDate() === eventDateObj.getDate()
    );
  }

  filterEventsByCategory() {
    if (this.selectedCategory) {
      this.filteredEvents = this.eventService.getEventsByCategory(this.selectedCategory);
    } else {
      this.filteredEvents = this.events;
    }
    // Trier les événements filtrés par date (les plus proches en premier)
  this.filteredEvents.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateA - dateB; // Tri ascendant, plus proche en haut
  });
    // Synchronisation des états pour les événements filtrés
    this.filteredEvents = this.filteredEvents.map(event => {
      const eventState = this.eventStateService.getEventState(event.id);
      return { ...event, ...eventState };  // Mise à jour de l'état du bouton pour chaque événement
    });
  }

  // Méthodes pour gérer l'état des boutons
  toggleInterest(event: any) {
    event.isInterested = !event.isInterested;
    this.eventStateService.updateEventState(event.id, {
      isInterested: event.isInterested,
      isParticipating: event.isParticipating
    });

    // Synchroniser les événements filtrés après modification de l'état
    this.filteredEvents = this.filteredEvents.map(e => {
      if (e.id === event.id) {
        return { ...e, isInterested: event.isInterested };
      }
      return e;
    });
  }

  toggleParticipation(event: any) {
    event.isParticipating = !event.isParticipating;
    this.eventStateService.updateEventState(event.id, {
      isInterested: event.isInterested,
      isParticipating: event.isParticipating
    });

    // Synchroniser les événements filtrés après modification de l'état
    this.filteredEvents = this.filteredEvents.map(e => {
      if (e.id === event.id) {
        return { ...e, isParticipating: event.isParticipating };
      }
      return e;
    });
  }

}
