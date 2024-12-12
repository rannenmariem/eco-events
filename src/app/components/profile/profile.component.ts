import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EventStateService } from '../../services/event-state.service'; // Gestion des états
import { EventService } from '../../services/event.service'; // Gestion des détails des événements
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importation des classes nécessaires
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userForm!: FormGroup;
  interestedEvents: any[] = [];
  participatingEvents: any[] = [];

  user = {
    firstName: 'Mariem',
    lastName: 'Rannen',
    email: 'mariem@gmail.com',
    birthdate: '2001-11-17',
    city: 'Sfax',
    address: 'Cité ONS',
    job: 'Etudiante',
    profileImage: '/profil.PNG', // L'image par défaut
  };

  isModalOpen = false;
  // Conserver une copie de l'image initiale
  originalProfileImage: string = this.user.profileImage;

  constructor(
    private fb: FormBuilder,
    private eventStateService: EventStateService,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      birthdate: [this.user.birthdate, Validators.required],
      city: [this.user.city, Validators.required],
      address: [this.user.address, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      job: [this.user.job, Validators.required],
      profileImage: [this.user.profileImage], // Ajout de l'image au formulaire
    });

    this.loadEvents();
  }

  loadEvents() {
    const allEvents = this.eventService.getEvents();

    this.interestedEvents = allEvents.filter((event) =>
      this.eventStateService.getEventState(event.id).isInterested
    );

    this.participatingEvents = allEvents.filter((event) =>
      this.eventStateService.getEventState(event.id).isParticipating
    );
  }

  toggleInterest(event: any) {
    event.isInterested = !event.isInterested;
    this.eventStateService.updateEventState(event.id, {
      isInterested: event.isInterested,
      isParticipating: event.isParticipating,
    });

    this.loadEvents();
  }

  toggleParticipation(event: any) {
    event.isParticipating = !event.isParticipating;
    this.eventStateService.updateEventState(event.id, {
      isInterested: event.isInterested,
      isParticipating: event.isParticipating,
    });

    this.loadEvents();
  }

  openEditModal() {
    this.isModalOpen = true;
  }

  closeEditModal() {
    // Lors de la fermeture de la modale, si l'utilisateur annule, réinitialiser l'image à l'état d'origine
    this.user.profileImage = this.originalProfileImage;
    this.isModalOpen = false;
  }

  updateProfile() {
    if (this.userForm.valid) {
      // Lors de l'enregistrement, assurez-vous que l'image est mise à jour
      this.user = { ...this.userForm.value, profileImage: this.user.profileImage };
      this.originalProfileImage = this.user.profileImage;
      console.log('Profil mis à jour :', this.user);
      this.isModalOpen = false;    }
  }

  // Méthode pour gérer le changement de l'image de profil
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.profileImage = e.target.result; // Met à jour l'image du profil avec le fichier sélectionné
      };
      reader.readAsDataURL(file); // Convertit l'image en une URL base64
    }
  }
}
