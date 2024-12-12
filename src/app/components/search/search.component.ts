import { Component } from '@angular/core';
import { EventService } from '../../services/event.service'; // Importation du service
import { FormsModule } from '@angular/forms'; // Importation de FormsModule
import { RouterModule } from '@angular/router'; // Importation de RouterModule
import { CommonModule } from '@angular/common'; // Importation de CommonModule
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchTerm = ''; // Variable liée à ngModel pour la recherche par mots-clés
  selectedCategory = ''; // Variable pour la sélection de la catégorie
  selectedLocation = ''; // Variable pour la localisation
  selectedDate: string = ''; // Variable pour la date
  events: any[] = []; // Liste de tous les événements
  filteredEvents: any[] = []; // Liste des événements filtrés
  categories: string[] = ['Nettoyage de plage', 'Conférence', 'Atelier', 'Marche']; // Liste des catégories

  constructor(private eventService: EventService) {
    this.events = this.eventService.getEvents(); // Récupère tous les événements
    this.filteredEvents = [...this.events]; // Initialisation de la liste des événements filtrés
  }

  // Fonction pour filtrer les événements en fonction des critères
  filterEvents() {
    this.filteredEvents = this.events.filter(event => {
      // Filtrage par mots-clés dans le titre ou la description
      const matchesSearchTerm = this.searchTerm
        ? event.title.toLowerCase().includes(this.searchTerm.toLowerCase()) || event.description.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;

      // Filtrage par catégorie
      const matchesCategory = this.selectedCategory ? event.category === this.selectedCategory : true;

      // Filtrage par localisation
      const matchesLocation = this.selectedLocation ? event.location.toLowerCase().includes(this.selectedLocation.toLowerCase()) : true;

      // Filtrage par date
      const matchesDate = this.selectedDate ? event.date === this.selectedDate : true;

      return matchesSearchTerm && matchesCategory && matchesLocation && matchesDate;
    });
  }
}
