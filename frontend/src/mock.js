// Mock data for Amuse Museum App
export const museumData = {
  sections: [
    {
      id: 'paintings',
      name: 'Paintings',
      icon: '🎨',
      description: 'Classical and modern masterpieces from renowned artists',
      artworkCount: 12
    },
    {
      id: 'sculptures',
      name: 'Sculptures', 
      icon: '🗿',
      description: 'Three-dimensional art from ancient to contemporary',
      artworkCount: 8
    },
    {
      id: 'historical',
      name: 'Historical Artifacts',
      icon: '🏺',
      description: 'Ancient relics and cultural treasures',
      artworkCount: 10
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
        id: 'david',
        title: 'David',
        artist: 'Michelangelo',
        year: '1501-1504',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/David_von_Michelangelo.jpg/800px-David_von_Michelangelo.jpg',
        category: 'sculptures',
        location: 'Sculpture Hall - Renaissance Section',
        nfcCode: 'NFC004',
        qrCode: 'QR004',
        description: 'A masterpiece of Renaissance sculpture depicting the biblical hero David.',
        artist_info: 'Michelangelo di Lodovico Buonarroti Simoni (1475-1564), Italian sculptor, painter, architect, and poet.',
        historical_context: 'Commissioned during the height of the Florentine Republic as a symbol of strength and beauty.',
        techniques: 'Carved from a single block of Carrara marble using traditional Renaissance sculpting methods',
        cultural_significance: 'Symbol of Renaissance humanism and the ideal of physical and moral perfection',
        dimensions: '5.17 m (17.0 ft) tall',
        medium: 'Carrara marble',
        provenance: 'Originally placed in Piazza della Signoria, moved to Galleria dell\'Accademia in 1873',
        interesting_facts: [
          'Carved from a damaged block of marble abandoned for 40 years',
          'David\'s hands and head are disproportionally large',
          'Originally intended for the Florence Cathedral roofline',
          'Weighs approximately 6 tons'
        ]
      },
      {
        id: 'thinking-man',
        title: 'The Thinking Man',
        artist: 'Auguste Rodin',
        year: '1904',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Paris_2010_-_Le_Penseur.jpg/800px-Paris_2010_-_Le_Penseur.jpg',
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
        nfcCode: 'NFC006',
        qrCode: 'QR006',
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
        id: 'terracotta-warriors',
        title: 'Terracotta Warriors',
        artist: 'Ancient Chinese Artisans',
        year: '210-209 BC',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Terracotta_Army_Pit_1_-_14-04-2014.jpg/1024px-Terracotta_Army_Pit_1_-_14-04-2014.jpg',
        category: 'historical',
        location: 'Ancient Civilizations Wing - Chinese Section',
        nfcCode: 'NFC007',
        qrCode: 'QR007',
        description: 'A collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China.',
        artist_info: 'Created by thousands of ancient Chinese artisans and craftsmen under imperial commission.',
        historical_context: 'Buried with Emperor Qin Shi Huang in 210-209 BCE to protect him in the afterlife.',
        techniques: 'Terracotta clay modeling, firing, and painting techniques with individual facial features',
        cultural_significance: 'Represents ancient Chinese beliefs about death and afterlife, showcases advanced craftsmanship',
        dimensions: 'Over 8,000 soldiers, varying heights 183-195 cm',
        medium: 'Terracotta clay',
        provenance: 'Discovered in 1974 by local farmers, ongoing archaeological excavation',
        interesting_facts: [
          'Each warrior has unique facial features and expressions',
          'Originally painted in bright colors that faded upon exposure',
          'Includes horses, chariots, and non-military figures',
          'Considered the Eighth Wonder of the World'
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
      artworks: ['mona-lisa', 'starry-night', 'david', 'rosetta-stone'],
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
          artwork: 'david',
          duration: '15 minutes',
          focus: 'Renaissance sculpture and symbolism of David'
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
      artworks: ['terracotta-warriors', 'girl-pearl-earring', 'starry-night', 'thinking-man'],
      stops: [
        {
          artwork: 'terracotta-warriors',
          duration: '15 minutes',
          focus: 'Ancient Chinese artistry and burial customs'
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