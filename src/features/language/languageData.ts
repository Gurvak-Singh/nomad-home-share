// Language and currency data

// Available languages
export interface Language {
  code: string;
  name: string;
  flag: string;
}

export const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];

// Available currencies
export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export const currencies: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
  { code: 'MXN', name: 'Mexican Peso', symbol: 'Mex$' },
];

// Sample exchange rates for demo purposes
export const exchangeRates: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  JPY: 150.23,
  CAD: 1.36,
  AUD: 1.51,
  CNY: 7.24,
  INR: 83.45,
  BRL: 5.07,
  MXN: 16.82
};

// Translations
export const translations = {
  en: {
    whereToGo: 'Anywhere',
    checkIn: 'Any week',
    guests: 'Add guests',
    search: 'Search',
    hostYourHome: 'Airbnb your home',
    profile: 'Profile',
    trips: 'Trips',
    wishlist: 'Wishlist',
    messages: 'Messages',
    helpCenter: 'Help Center',
    contactUs: 'Contact Us',
    login: 'Log in',
    signup: 'Sign up',
    logout: 'Log out',
    // Property details
    overview: 'Overview',
    amenities: 'Amenities',
    location: 'Location',
    reviews: 'Reviews',
    availability: 'Availability',
    // Booking
    reserve: 'Reserve',
    checkInDate: 'Check-in Date',
    checkOutDate: 'Check-out Date',
    guestCount: 'Guests',
    total: 'Total',
    // Reviews
    writeReview: 'Write a Review',
    overallRating: 'Overall Rating',
    // Host
    hostSince: 'Host since',
    responseRate: 'Response rate',
    responseTime: 'Response time',
  },
  es: {
    whereToGo: 'Cualquier lugar',
    checkIn: 'Cualquier semana',
    guests: 'Añadir huéspedes',
    search: 'Buscar',
    hostYourHome: 'Anfitrión tu casa',
    profile: 'Perfil',
    trips: 'Viajes',
    wishlist: 'Lista de deseos',
    messages: 'Mensajes',
    helpCenter: 'Centro de ayuda',
    contactUs: 'Contáctanos',
    login: 'Iniciar sesión',
    signup: 'Registrarse',
    logout: 'Cerrar sesión',
    // Property details
    overview: 'Descripción general',
    amenities: 'Servicios',
    location: 'Ubicación',
    reviews: 'Opiniones',
    availability: 'Disponibilidad',
    // Booking
    reserve: 'Reservar',
    checkInDate: 'Fecha de llegada',
    checkOutDate: 'Fecha de salida',
    guestCount: 'Huéspedes',
    total: 'Total',
    // Reviews
    writeReview: 'Escribir una opinión',
    overallRating: 'Calificación general',
    // Host
    hostSince: 'Anfitrión desde',
    responseRate: 'Tasa de respuesta',
    responseTime: 'Tiempo de respuesta',
  },
  fr: {
    whereToGo: 'N\'importe où',
    checkIn: 'N\'importe quelle semaine',
    guests: 'Ajouter des voyageurs',
    search: 'Rechercher',
    hostYourHome: 'Mettre mon logement sur Airbnb',
    profile: 'Profil',
    trips: 'Voyages',
    wishlist: 'Liste de souhaits',
    messages: 'Messages',
    helpCenter: 'Centre d\'aide',
    contactUs: 'Nous contacter',
    login: 'Connexion',
    signup: 'Inscription',
    logout: 'Déconnexion',
    // Property details
    overview: 'Aperçu',
    amenities: 'Équipements',
    location: 'Emplacement',
    reviews: 'Commentaires',
    availability: 'Disponibilité',
    // Booking
    reserve: 'Réserver',
    checkInDate: 'Date d\'arrivée',
    checkOutDate: 'Date de départ',
    guestCount: 'Voyageurs',
    total: 'Total',
    // Reviews
    writeReview: 'Écrire un commentaire',
    overallRating: 'Note globale',
    // Host
    hostSince: 'Hôte depuis',
    responseRate: 'Taux de réponse',
    responseTime: 'Délai de réponse',
  },
};
