// Mock data for Amuse Museum App
export const museumData = {
  sections: [
    {
      id: 'paintings',
      name: 'Paintings',
      icon: '🎨',
      description: 'Classical and modern masterpieces from renowned artists',
      artworkCount: 3
    },
    {
      id: 'sculptures',
      name: 'Sculptures', 
      icon: '🗿',
      description: 'Three-dimensional art from ancient to contemporary',
      artworkCount: 3
    },
    {
      id: 'historical',
      name: 'Historical Artifacts',
      icon: '🏺',
      description: 'Ancient relics and cultural treasures',
      artworkCount: 3
    }
  ],

  artworks: {
    paintings: [
      {
        id: 'mona-lisa',
        title: 'Mona Lisa',
        artist: 'Leonardo da Vinci',
        year: '1503-1519',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/687px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
        category: 'paintings',
        location: 'Room A - Renaissance Gallery',
        nfcCode: 'NFC001',
        qrCode: 'QR001',
        description: 'The most famous portrait in the world, known for the subject\'s enigmatic smile.',
        artist_info: 'Leonardo da Vinci (1452-1519) was an Italian polymath of the High Renaissance.',
        historical_context: 'Painted during the Italian Renaissance, this portrait revolutionized the art of portraiture with its innovative techniques.',
        techniques: 'Oil on poplar wood panel, sfumato technique for soft transitions, atmospheric perspective',
        cultural_significance: 'Symbol of Renaissance art, inspired countless artists and became a global cultural icon',
        dimensions: '77 cm × 53 cm (30 in × 21 in)',
        medium: 'Oil on poplar panel',
        provenance: 'Created in Florence, acquired by Francis I of France, housed in Louvre since 1797',
        interesting_facts: [
          'The subject is believed to be Lisa Gherardini, wife of a Florentine merchant',
          'The painting was stolen in 1911 and recovered in 1913',
          'Napoleon hung it in his bedroom for a time',
          'The smile appears to change when viewed from different angles'
        ]
      },
      {
        id: 'starry-night',
        title: 'The Starry Night',
        artist: 'Vincent van Gogh',
        year: '1889',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1024px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
        category: 'paintings',
        location: 'Room B - Post-Impressionist Gallery',
        nfcCode: 'NFC002',
        qrCode: 'QR002',
        description: 'A swirling night sky over a village, painted from van Gogh\'s asylum window.',
        artist_info: 'Vincent van Gogh (1853-1890) was a Dutch post-impressionist painter known for his bold colors and emotional directness.',
        historical_context: 'Painted during van Gogh\'s stay at the Saint-Paul-de-Mausole asylum in Saint-Rémy-de-Provence.',
        techniques: 'Oil on canvas, impasto technique with thick paint application, dynamic brushstrokes',
        cultural_significance: 'One of the most recognized works in modern art, symbolizing the beauty found in mental struggle',
        dimensions: '73.7 cm × 92.1 cm (29 in × 36 1⁄4 in)',
        medium: 'Oil on canvas',
        provenance: 'Created in asylum, acquired by MoMA in 1941',
        interesting_facts: [
          'Painted from memory and imagination, not direct observation',
          'The cypress tree was added to connect earth and sky',
          'Van Gogh considered it a failure initially',
          'The swirls may represent turbulence in fluid dynamics'
        ]
      },
      {
        id: 'girl-pearl-earring',
        title: 'Girl with a Pearl Earring',
        artist: 'Johannes Vermeer',
        year: 'c. 1665',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/800px-1665_Girl_with_a_Pearl_Earring.jpg',
        category: 'paintings',
        location: 'Room A - Dutch Golden Age Gallery',
        nfcCode: 'NFC003',
        qrCode: 'QR003',
        description: 'A captivating portrait featuring a girl wearing an exotic dress and a large pearl earring.',
        artist_info: 'Johannes Vermeer (1632-1675) was a Dutch Baroque Period painter specialized in domestic interior scenes.',
        historical_context: 'Created during the Dutch Golden Age, a period of great wealth and cultural achievement in the Netherlands.',
        techniques: 'Oil on canvas, masterful use of light and shadow, ultramarine blue pigment',
        cultural_significance: 'Represents the pinnacle of Dutch Golden Age painting, inspiring literature and film',
        dimensions: '44.5 cm × 39 cm (17.5 in × 15.4 in)',
        medium: 'Oil on canvas',
        provenance: 'Private collections until acquired by Mauritshuis in 1902',
        interesting_facts: [
          'The pearl is painted with just two brushstrokes',
          'The girl\'s identity remains unknown',
          'Often called the "Mona Lisa of the North"',
          'Inspired Tracy Chevalier\'s novel and subsequent film'
        ]
      }
    ],

    sculptures: [
      {
        id: 'thinking-man',
        title: 'The Thinker',
        artist: 'Auguste Rodin',
        year: '1904',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/The_Thinker%2C_Rodin.jpg/800px-The_Thinker%2C_Rodin.jpg',
        category: 'sculptures',
        location: 'Sculpture Hall - Modern Section',
        nfcCode: 'NFC005',
        qrCode: 'QR005',
        description: 'A bronze sculpture depicting a nude male figure sitting on a rock with his chin resting on his hand.',
        artist_info: 'Auguste Rodin (1840-1917) was a French sculptor, known as the founder of modern sculpture.',
        historical_context: 'Originally part of "The Gates of Hell," inspired by Dante\'s Divine Comedy.',
        techniques: 'Cast in bronze using the lost-wax casting process, multiple versions exist',
        cultural_significance: 'Universal symbol of intellectual activity and creative contemplation',
        dimensions: '186 cm × 98 cm × 140 cm',
        medium: 'Bronze',
        provenance: 'Multiple casts exist worldwide, original plaster in Musée Rodin',
        interesting_facts: [
          'Originally titled "The Poet" representing Dante',
          'Over 25 full-size castings exist worldwide',
          'Inspired by Michelangelo\'s figures on the Sistine Chapel',
          'Has become one of the most recognizable sculptures in art'
        ]
      },
      {
        id: 'pieta',
        title: 'Pietà',
        artist: 'Michelangelo',
        year: '1498-1499',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Michelangelo%27s_Pieta_5450_cropncleaned_edit.jpg/800px-Michelangelo%27s_Pieta_5450_cropncleaned_edit.jpg',
        category: 'sculptures',
        location: 'Sculpture Hall - Renaissance Section',
        nfcCode: 'NFC006',
        qrCode: 'QR006',
        description: 'A Renaissance marble sculpture depicting the Virgin Mary holding the dead body of Jesus Christ.',
        artist_info: 'Michelangelo di Lodovico Buonarroti Simoni (1475-1564), Italian sculptor, painter, architect, and poet.',
        historical_context: 'Commissioned for a French cardinal\'s funeral monument during the High Renaissance.',
        techniques: 'Carved from a single block of Carrara marble with extraordinary attention to anatomical detail',
        cultural_significance: 'Masterpiece of Renaissance art representing divine love and human suffering',
        dimensions: '1.74 m × 1.95 m (5.7 ft × 6.4 ft)',
        medium: 'Carrara marble',
        provenance: 'Originally in St. Peter\'s Basilica, now housed in Vatican Museums',
        interesting_facts: [
          'The only work Michelangelo ever signed',
          'Mary appears younger than Jesus, symbolizing her purity',
          'Survived an attack with a hammer in 1972',
          'Michelangelo was only 24 when he completed it'
        ]
      },
      {
        id: 'discus-thrower',
        title: 'Discobolus (Discus Thrower)',
        artist: 'Myron (Roman Copy)',
        year: 'c. 140 AD (Roman copy of 450 BC Greek original)',
        image: 'https://placehold.co/600x900/c9b8a1/5a4a3a?text=Discus+Thrower',
        category: 'sculptures',
        location: 'Sculpture Hall - Ancient Greek Section',
        nfcCode: 'NFC010',
        qrCode: 'QR010',
        description: 'A Roman marble copy of the famous Greek bronze statue showing an athlete about to throw a discus.',
        artist_info: 'Original by Myron (c. 480-440 BC), ancient Greek sculptor known for athletic figures.',
        historical_context: 'Created during Classical Greece when depicting athletic perfection was paramount.',
        techniques: 'Lost-wax bronze casting for original, marble carving for Roman copies',
        cultural_significance: 'Represents Greek ideals of physical perfection and athletic achievement',
        dimensions: 'Life-sized, approximately 155 cm tall',
        medium: 'Marble (Roman copy)',
        provenance: 'Roman copy, various museums hold versions including British Museum',
        interesting_facts: [
          'Original bronze was lost, known only through Roman marble copies',
          'Shows revolutionary twisting motion captured in stone',
          'Became symbol of Olympic Games',
          'Myron was famous for capturing motion in static form'
        ]
      }
    ],

    historical: [
      {
        id: 'rosetta-stone',
        title: 'Rosetta Stone',
        artist: 'Ancient Egyptian Scribes',
        year: '196 BC',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Rosetta_Stone.JPG/800px-Rosetta_Stone.JPG',
        category: 'historical',
        location: 'Ancient Civilizations Wing',
        nfcCode: 'NFC007',
        qrCode: 'QR007',
        description: 'A granodiorite stele inscribed with a decree in three scripts: hieroglyphic, Demotic, and Greek.',
        artist_info: 'Created by ancient Egyptian priests and scribes during the Ptolemaic dynasty.',
        historical_context: 'Created during the reign of Ptolemy V as a public decree, discovered during Napoleon\'s Egyptian campaign.',
        techniques: 'Carved in granodiorite stone using ancient Egyptian stone-carving techniques',
        cultural_significance: 'Key to deciphering Egyptian hieroglyphs, crucial breakthrough in understanding ancient Egyptian civilization',
        dimensions: '114.4 cm × 72.3 cm × 27.9 cm',
        medium: 'Granodiorite stone',
        provenance: 'Discovered in 1799 near Rosetta, acquired by British Museum in 1802',
        interesting_facts: [
          'The key that unlocked ancient Egyptian hieroglyphs',
          'Discovered by French soldiers during Napoleon\'s campaign',
          'Jean-François Champollion deciphered it in 1822',
          'The same text is written in three different scripts'
        ]
      },
      {
        id: 'mask-tutankhamun',
        title: 'Mask of Tutankhamun',
        artist: 'Ancient Egyptian Artisans',
        year: 'c. 1323 BC',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/CairoEgMuseumTaaMaskMostlyPhotographed.jpg/800px-CairoEgMuseumTaaMaskMostlyPhotographed.jpg',
        category: 'historical',
        location: 'Ancient Civilizations Wing - Egyptian Section',
        nfcCode: 'NFC008',
        qrCode: 'QR008',
        description: 'The golden funerary mask of the Egyptian pharaoh Tutankhamun, discovered in his intact tomb.',
        artist_info: 'Created by skilled ancient Egyptian artisans and goldsmiths during the 18th Dynasty.',
        historical_context: 'Made for the boy king Tutankhamun who ruled Egypt during the New Kingdom period.',
        techniques: 'Beaten gold with inlaid precious stones, cloisonné technique, and detailed metalwork',
        cultural_significance: 'Symbol of ancient Egyptian wealth and artistry, represents beliefs about the afterlife',
        dimensions: '54 cm × 39.3 cm × 49 cm',
        medium: 'Gold with precious stone inlays',
        provenance: 'Discovered by Howard Carter in 1922 in the Valley of the Kings',
        interesting_facts: [
          'Made from 11 kilograms of solid gold',
          'Features lapis lazuli, quartz, and obsidian inlays',
          'Tutankhamun died at approximately age 19',
          'The tomb was the most intact pharaoh\'s tomb ever found'
        ]
      },
      {
        id: 'portland-vase',
        title: 'Portland Vase',
        artist: 'Roman Glassmakers',
        year: 'c. 1-25 AD',
        image: 'https://placehold.co/600x900/2c3e50/ecf0f1?text=Portland+Vase',
        category: 'historical',
        location: 'Ancient Civilizations Wing - Roman Section',
        nfcCode: 'NFC011',
        qrCode: 'QR011',
        description: 'A Roman cameo glass vase featuring white relief figures against a dark blue background, masterpiece of ancient glassmaking.',
        artist_info: 'Created by unknown Roman glassmakers using the cameo glass technique.',
        historical_context: 'Made during the reign of Augustus, represents the pinnacle of Roman luxury glass production.',
        techniques: 'Cameo glass technique - white glass layer carved away to reveal dark blue background',
        cultural_significance: 'One of the finest examples of Roman cameo glass, inspired generations of artists',
        dimensions: '24.5 cm tall',
        medium: 'Cameo glass',
        provenance: 'Discovered in Rome, now in British Museum after being famously smashed and restored',
        interesting_facts: [
          'Was shattered by a visitor in 1845 and painstakingly restored',
          'Inspired Wedgwood to create jasperware pottery',
          'Exact manufacturing technique still debated by scholars',
          'Originally may have been used as a funerary urn'
        ]
      }
    ]
  },

  tours: [
    {
      id: 'highlights-tour',
      name: 'Museum Highlights',
      duration: '45 minutes',
      description: 'A curated journey through our most famous pieces',
      artworks: ['mona-lisa', 'starry-night', 'venus-de-milo', 'rosetta-stone'],
      stops: [
        {
          artwork: 'mona-lisa',
          duration: '10 minutes',
          focus: 'Renaissance techniques and the mystery of her smile'
        },
        {
          artwork: 'starry-night', 
          duration: '10 minutes',
          focus: 'Post-impressionist movement and van Gogh\'s mental state'
        },
        {
          artwork: 'venus-de-milo',
          duration: '15 minutes',
          focus: 'Ancient Greek ideals of beauty and classical sculpture'
        },
        {
          artwork: 'rosetta-stone',
          duration: '10 minutes',
          focus: 'Ancient civilizations and deciphering hieroglyphs'
        }
      ]
    },
    {
      id: 'art-history-tour',
      name: 'Art Through the Ages',
      duration: '60 minutes',
      description: 'Explore the evolution of art from ancient to modern times',
      artworks: ['parthenon-marbles', 'girl-pearl-earring', 'starry-night', 'thinking-man'],
      stops: [
        {
          artwork: 'parthenon-marbles',
          duration: '15 minutes',
          focus: 'Classical Greek art and democratic ideals'
        },
        {
          artwork: 'girl-pearl-earring',
          duration: '15 minutes', 
          focus: 'Dutch Golden Age painting techniques'
        },
        {
          artwork: 'starry-night',
          duration: '15 minutes',
          focus: 'Post-impressionist revolution in art'
        },
        {
          artwork: 'thinking-man',
          duration: '15 minutes',
          focus: 'Modern sculpture and philosophical themes'
        }
      ]
    }
  ]
};

// Mock handlers for app functionality
export const museumHandlers = {
  // Favorites management (using localStorage)
  getFavorites: () => {
    const favorites = localStorage.getItem('amuse_favorites');
    return favorites ? JSON.parse(favorites) : [];
  },

  addToFavorites: (artworkId) => {
    const favorites = museumHandlers.getFavorites();
    if (!favorites.includes(artworkId)) {
      favorites.push(artworkId);
      localStorage.setItem('amuse_favorites', JSON.stringify(favorites));
    }
    return favorites;
  },

  removeFromFavorites: (artworkId) => {
    const favorites = museumHandlers.getFavorites();
    const updated = favorites.filter(id => id !== artworkId);
    localStorage.setItem('amuse_favorites', JSON.stringify(updated));
    return updated;
  },

  // NFC/QR Code simulation
  scanNFC: async (nfcCode) => {
    console.log('NFC scan simulated:', nfcCode);
    // Simulate scanning delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find artwork by NFC code
    const allArtworks = Object.values(museumData.artworks).flat();
    const artwork = allArtworks.find(art => art.nfcCode === nfcCode);
    
    return artwork || null;
  },

  scanQR: async (qrCode) => {
    console.log('QR scan simulated:', qrCode);
    // Simulate scanning delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Find artwork by QR code
    const allArtworks = Object.values(museumData.artworks).flat();
    const artwork = allArtworks.find(art => art.qrCode === qrCode);
    
    return artwork || null;
  },

  // AR simulation
  initializeAR: async () => {
    console.log('AR initialization simulated');
    await new Promise(resolve => setTimeout(resolve, 2000));
    return { success: true, message: 'AR mode activated' };
  },

  // Get artwork by ID
  getArtwork: (artworkId) => {
    const allArtworks = Object.values(museumData.artworks).flat();
    return allArtworks.find(art => art.id === artworkId) || null;
  },

  // Get artworks by category
  getArtworksByCategory: (category) => {
    return museumData.artworks[category] || [];
  },

  // Tour management
  getTour: (tourId) => {
    return museumData.tours.find(tour => tour.id === tourId) || null;
  }
};