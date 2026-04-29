export interface Bus {
  id: number;
  type: string;
  name: string;
  dailyPrice: number;
  weeklyPrice: number;
  specs: {
    transmission: string;
    capacity: string;
    ac: string;
  };
  image: string;
  description: string;
}

export const fleetData: Bus[] = [
  {
    id: 1,
    type: "Mini Bus",
    name: "City Sprinter",
    dailyPrice: 10000,
    weeklyPrice: 65000,
    specs: {
      transmission: "Auto",
      capacity: "10 Persons",
      ac: "Air Conditioner",
    },
    image: "/city-sprinter.jpg",
    description: "Perfect for small groups requiring a comfortable and agile ride through the city.",
  },
  {
    id: 3,
    type: "Mini Bus",
    name: "Transit Van",
    dailyPrice: 12000,
    weeklyPrice: 75000,
    specs: {
      transmission: "Auto",
      capacity: "15 Persons",
      ac: "Air Conditioner",
    },
    image: "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?q=80&w=2938&auto=format&fit=crop",
    description: "A versatile choice for corporate transfers and family gateways with extra cargo space.",
  },
  {
    id: 2,
    type: "Shuttle Bus",
    name: "Metro Oxford",
    dailyPrice: 20000,
    weeklyPrice: 125000,
    specs: {
      transmission: "Auto",
      capacity: "30 Persons",
      ac: "Air Conditioner",
    },
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2938&auto=format&fit=crop",
    description: "Ideal for medium-sized groups, offering spacious seating and premium entertainment.",
  },
];

export const POPULAR_LOCATIONS = [
  {
    category: "Airports",
    items: [
      "Ninoy Aquino International Airport (NAIA)",
      "Clark International Airport (CRK)",
      "Mactan-Cebu International Airport (MCIA)",
      "Davao International Airport (DVO)",
    ],
  },
  {
    category: "Business Hubs",
    items: [
      "Makati Central Business District",
      "Bonifacio Global City (BGC)",
      "Ortigas Center, Pasig",
      "Filinvest City, Alabang",
      "Eastwood City, QC",
    ],
  },
  {
    category: "Famous Landmarks",
    items: [
      "Intramuros, Manila",
      "Rizal Park (Luneta)",
      "SM Mall of Asia",
      "National Museum of Fine Arts",
      "National Museum of Natural History",
      "Cultural Center of the Philippines (CCP)",
    ],
  },
  {
    category: "Major Cities & Regions",
    items: [
      "Tagaytay City",
      "Subic Bay Freeport",
      "Baguio City",
      "Vigan City",
      "Puerto Princesa, Palawan",
      "Boracay / Caticlan Jetty",
      "Banaue Rice Terraces",
      "Chocolate Hills, Bohol",
    ],
  },
  {
    category: "Malls & Destinations",
    items: [
      "Greenbelt / Glorietta, Makati",
      "SM North EDSA",
      "Ayala Malls Manila Bay",
      "Nuvali, Santa Rosa",
      "Enchanted Kingdom",
    ],
  },
];
