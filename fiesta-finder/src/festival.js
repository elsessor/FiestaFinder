export const FestivalCategories = {
  ALL: 'All Festivals',
  RELIGIOUS: 'Religious',
  CULTURAL: 'Cultural',
  HISTORICAL: 'Historical',
  NATURE: 'Nature'
};

export const FestivalMonths = {
  ALL_YEAR: 'All Year',
  JANUARY: 'January',
  FEBRUARY: 'February',
  APRIL: 'April',
  MAY: 'May',
  SEPTEMBER: 'September',
  OCTOBER: 'October',
  DECEMBER: 'December'
};

export const festivals = [
  {
    id: 'barlin-festival',
    name: 'Barlin Festival',
    location: 'Baao, Camarines Sur',
    month: 'January',
    description: 'Commemorates the birthday of Bishop Jorge I. Barlin, the first Filipino bishop. It\'s a blend of religious processions and cultural activities.',
    category: 'Religious',
    expectedAttendees: 25000,
    rating: 4.2,
    year: 2025
  },
  {
    id: 'tinagba-festival',
    name: 'Tinagba Festival',
    location: 'Iriga City, Camarines Sur',
    month: 'February',
    description: 'A cultural and religious festival celebrating Our Lady of Lourdes. It features a beautiful parade of carts decorated with newly harvested crops, re-enacting pre-Hispanic harvest rituals.',
    category: 'Religious',
    expectedAttendees: 45000,
    rating: 4.6,
    year: 2025
  },
  {
    id: 'karanowan-fish-tival',
    name: 'Karanowan Fish-tival',
    location: 'Bato, Camarines Sur',
    month: 'February',
    description: 'Celebrates the rich marine life of Lake Bato. Activities include boat races, fresh seafood festivals, and showcasing local fishing traditions.',
    category: 'Nature',
    expectedAttendees: 20000,
    rating: 4.2,
    year: 2025
  },
  {
    id: 'baybayon-festival',
    name: 'Baybayon Festival',
    location: 'Sagñay, Camarines Sur',
    month: 'April',
    description: 'Highlights the beautiful beaches and coastal life of Sagñay. The festival includes beach activities, seafood feasts, and coastal cultural shows.',
    category: 'Nature',
    expectedAttendees: 18000,
    rating: 4.1,
    year: 2025
  },
  {
    id: 'may-ilaoud-festival',
    name: 'May Ilaoud Festival',
    location: 'Milaor, Camarines Sur',
    month: 'April',
    description: 'A summer festival held in late April to early May, commemorating the founding anniversary and feast day of St. Joseph the Worker. It features a showcase of local products and cultural presentations.',
    category: 'Cultural',
    expectedAttendees: 15000,
    rating: 3.9,
    year: 2025
  },
  {
    id: 'kaogma-festival',
    name: 'Kaogma Festival',
    location: 'Pili, Camarines Sur',
    month: 'May',
    description: 'The biggest festival in Camarines Sur, celebrating the province\'s founding anniversary. It\'s a week-long event packed with sports, cultural parades, and local delicacies.',
    category: 'Cultural',
    expectedAttendees: 75000,
    rating: 4.8,
    year: 2025
  },
  {
    id: 'boa-boahan-festival',
    name: 'Boa-Boahan Festival',
    location: 'Nabua, Camarines Sur',
    month: 'May',
    description: 'A unique cultural festival with pagan origins that celebrates fertility and thanksgiving. Participants use traditional costumes and perform ancient rituals.',
    category: 'Cultural',
    expectedAttendees: 40000,
    rating: 4.5,
    year: 2025
  },
  {
    id: 'penafrancia-festival',
    name: 'Peñafrancia Festival',
    location: 'Naga City, Camarines Sur',
    month: 'September',
    description: 'The largest and most famous festival in the Bicol region. This month-long religious celebration honors Our Lady of Peñafrancia with a grand fluvial procession along the Naga River.',
    category: 'Religious',
    expectedAttendees: 200000,
    rating: 4.9,
    year: 2025
  },
  {
    id: 'cimarrones-festival',
    name: 'Cimarrones Festival',
    location: 'Pili, Camarines Sur',
    month: 'October',
    description: 'Honors the indigenous group that bravely opposed Spanish colonization. It\'s a town fiesta that celebrates San Rafael Arcangel and features historical reenactments.',
    category: 'Historical',
    expectedAttendees: 50000,
    rating: 4.3,
    year: 2025
  },
  {
    id: 'kamundagan-festival',
    name: 'Kamundagan Festival',
    location: 'Naga City, Camarines Sur',
    month: 'December',
    description: 'A month-long Christmas festival in Naga City. The city is decorated with beautiful lights and displays, featuring traditional Christmas markets and religious celebrations.',
    category: 'Religious',
    expectedAttendees: 60000,
    rating: 4.4,
    year: 2025
  },
  {
    id: 'bamboo-festival',
    name: 'Bamboo Festival',
    location: 'Bula, Camarines Sur',
    month: 'December',
    description: 'Celebrates the bamboo plant, which is significant to the town\'s history. The festival includes showcases of bamboo crafts, traditional music using bamboo instruments, and local cuisine.',
    category: 'Cultural',
    expectedAttendees: 12000,
    rating: 4.0,
    year: 2025
  }
];

export const featuredFestivals = festivals.filter(f => 
  ['penafrancia-festival', 'kaogma-festival', 'cimarrones-festival', 'boa-boahan-festival', 'karanowan-fish-tival', 'tinagba-festival'].includes(f.id)
);