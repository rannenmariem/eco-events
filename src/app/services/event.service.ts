import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Fournit le service à toute l'application
})
export class EventService {
  // Simule des événements statiques pour votre application
  private events = [
    {
      id: 1,
      title: 'Nettoyage de Plage',
      date: '2024-12-12',
      description: 'Rejoignez-nous pour un nettoyage collectif de la plage de La Rochelle. Ensemble, nous allons collecter les déchets plastiques, sensibiliser les participants à l’impact de la pollution sur les écosystèmes marins, et discuter des actions à entreprendre pour protéger nos océans. Un geste simple qui peut avoir un impact durable !',
      category: 'Nettoyage de plage',
      location: 'Plage de La Rochelle',
      organizer: 'Association Écologique de La Rochelle',
      image: '/nettoyer.PNG',
    },
    {
      id: 2,
      title: 'Conférence Éco-Responsable',
      date: '2024-12-19',
      description: 'Participez à une conférence inspirante où des experts en développement durable discuteront des meilleures pratiques pour un mode de vie éco-responsable. Découvrez des initiatives innovantes menées par des entreprises, des ONG et des communautés locales pour construire un avenir plus vert et durable. Une occasion unique d’apprendre et de s’engager !',
      category: 'Conférence',
      location: 'Salle de Conférence Écologique',
      organizer: 'Green Future Org',
      image: '/conference.PNG',
    },
    {
      id: 3,
      title: 'Atelier Zéro Déchet',
      date: '2024-12-20',
      description: 'Apprenez à réduire vos déchets au quotidien grâce à cet atelier pratique et interactif. Nous partagerons des conseils pour réutiliser et recycler efficacement, fabriquer vos propres produits ménagers naturels et repenser vos habitudes de consommation. Rejoignez-nous pour passer à une vie plus respectueuse de l’environnement !',
      category: 'Atelier',
      location: 'Espace Écologique',
      organizer: 'Zero Waste Org',
      image: '/atelier_zero_dechet.PNG',
    },
    {
      id: 4,
      title: 'Marche Écologique',
      date: '2025-01-31',
      description: 'Participez à une grande marche dans le centre-ville de Paris pour promouvoir la sensibilisation à la protection de l’environnement. Des pancartes créatives, des slogans puissants et des moments de partage vous attendent. Ensemble, nous marcherons pour un futur plus vert et plus durable !',
      category: 'Marche',
      location: 'Centre-ville de Paris',
      organizer: 'Marche Verte',
      image: '/marche_ecologique.PNG',
    },
    {
      id: 5,
      title: 'Nettoyage des Rives du Lac',
      date: '2024-12-22',
      description: 'Un événement communautaire visant à nettoyer les rives du lac tout en sensibilisant les participants à l’impact des déchets sur les écosystèmes aquatiques. Une matinée riche en actions suivie d’une discussion avec des experts environnementaux locaux.',
      category: 'Nettoyage de plage',
      location: 'Rives du Lac d’Annecy',
      organizer: 'Green Lake Association',
      image: '/nettoyage_lac.PNG',
    },
    {
      id: 6,
      title: 'Conférence sur l’Énergie Renouvelable',
      date: '2024-12-25',
      description: 'Explorez les solutions énergétiques durables et les innovations technologiques en matière d’énergie solaire, éolienne et hydraulique. Des experts partageront leurs expériences et proposeront des pistes concrètes pour réduire notre dépendance aux énergies fossiles.',
      category: 'Conférence',
      location: 'Université Verte, Amphithéâtre Principal',
      organizer: 'Energy for Future',
      image: '/conference_energie.PNG',
    },
    {
      id: 7,
      title: 'Atelier Compostage Domestique',
      date: '2024-12-27',
      description: 'Apprenez à transformer vos déchets organiques en compost naturel, directement dans votre jardin ou appartement. Cet atelier pratique vous donnera toutes les astuces pour réduire vos déchets tout en enrichissant votre sol de manière naturelle.',
      category: 'Atelier',
      location: 'Centre Communautaire Écologique',
      organizer: 'Green Hands Workshop',
      image: '/atelier_compostage.PNG',
    },
    {
      id: 8,
      title: 'Marche Verte pour le Climat',
      date: '2024-12-12',
      description: 'Rejoignez des centaines de personnes pour une marche en faveur du climat. Cet événement a pour but de sensibiliser à l’urgence climatique et de promouvoir des actions concrètes pour limiter notre impact environnemental. Un mouvement solidaire pour un avenir meilleur !',
      category: 'Marche',
      location: 'Place du Capitole, Toulouse',
      organizer: 'Climat Actif',
      image: '/marche_climat.PNG',
    },
  ];


  constructor() {}

  // Méthode pour récupérer tous les événements
  getEvents() {
    return this.events;
  }

  // Méthode pour récupérer un événement par son ID
  getEventById(id: number) {
    return this.events.find(event => event.id === id);
  }
  // Méthode pour filtrer les événements par catégorie
  getEventsByCategory(category: string) {
    return this.events.filter(event => event.category === category);
  }
}
