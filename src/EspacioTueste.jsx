'use client';

import React, { useState, useEffect } from 'react';

// ==========================================
// TUESTE SPECIALTY COFFEE - ESPACIO DIGITAL
// Colores: #4C3524, #B68150, #EBC7A3
// Tipografías: STIX Two Text + Noto Sans
// ==========================================

const colors = {
  cafe: '#4C3524',
  castano: '#B68150',
  crema: '#EBC7A3',
  cremaLight: '#F5EBE0',
  white: '#FFFFFF',
  text: '#3D3229',
};

// Logo Component - Replica exacta del manual con epsilon
const TuesteLogo = ({ size = 'md', color = 'default' }) => {
  const sizes = { sm: 32, md: 48, lg: 64, xl: 80 };
  const s = sizes[size];
  
  // Colores: t, u (castaño) | ε (epsilon café) | s (castaño) | t (castaño) | e (castaño)
  const castano = color === 'white' ? colors.white : colors.castano;
  const cafe = color === 'white' ? colors.white : colors.cafe;
  const subColor = color === 'white' ? colors.white : colors.cafe;

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <div style={{
        fontFamily: "'STIX Two Text', Georgia, serif",
        fontSize: `${s}px`,
        fontWeight: 400,
        letterSpacing: '0.02em',
        lineHeight: 1,
        display: 'flex',
        alignItems: 'baseline'
      }}>
        <span style={{ color: castano }}>t</span>
        <span style={{ color: castano }}>u</span>
        <span style={{ 
          color: cafe,
          fontFamily: "'Times New Roman', 'Noto Serif', serif",
          fontStyle: 'normal'
        }}>e</span>
        <span style={{ color: castano }}>s</span>
        <span style={{ color: castano }}>t</span>
        <span style={{ color: castano }}>e</span>
      </div>
      <div style={{
        fontFamily: "'STIX Two Text', serif",
        fontSize: `${s * 0.28}px`,
        fontWeight: 400,
        letterSpacing: '0.15em',
        color: subColor,
        marginTop: '4px'
      }}>
        Specialty Coffee
      </div>
    </div>
  );
};

// Contact Bar Component
const ContactBar = () => (
  <div style={{
    background: colors.cafe,
    color: colors.white,
    padding: '8px 24px',
    fontSize: '13px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '32px',
    flexWrap: 'wrap'
  }}>
    <a href="https://instagram.com/tuestespecialtycoffee" target="_blank" rel="noopener noreferrer" style={{ color: colors.white, textDecoration: 'none' }}>
       @tuestespecialtycoffee
    </a>
    <a href="https://g.page/tueste" target="_blank" rel="noopener noreferrer" style={{ color: colors.white, textDecoration: 'none' }}>
       Google Maps
    </a>
    <a href="https://wa.me/34XXXXXXXXX" target="_blank" rel="noopener noreferrer" style={{ color: colors.white, textDecoration: 'none' }}>
      📱 WhatsApp
    </a>
  </div>
);

// DATA
const companyData = {
  values: [
    { title: 'Honestidad', desc: 'Nuestro valor principal, aplicado a todo lo que hacemos. Sin atajos, sin trucos.' },
    { title: 'Sin Intermediarios', desc: 'Trabajamos con Café Sin Intermediarios para garantizar la relación más directa con origen.' },
    { title: 'Tueste Fresco', desc: 'Tostado semanalmente en Pozoblanco (Córdoba). Cada taza sabe a recién tostado.' },
    { title: 'Repostería de Autor', desc: 'Dulces exclusivos by Inma Cobos, inspirados en el café.' }
  ]
};

const menuData = {
  // CAFÉS ESPRESSO BASE
  espresso: {
    title: 'Cafés Espresso',
    intro: 'Base pura de café de especialidad. Cada shot es extraído con precisión siguiendo estándares SCA.',
    items: [
      { name: 'Espresso', desc: 'Un solo shot', price: '2.50€' },
      { name: 'Doble Espresso', desc: 'Doble shot', price: '3.00€' }
    ]
  },

  // CAFÉS CON LECHE
  conLeche: {
    title: 'Cafés con Leche',
    intro: 'Preparados con leche entera o tu alternativa favorita sin coste adicional.',
    items: [
      { name: 'Cortado', desc: 'Espresso con un toque de leche', price: '2.50€' },
      { name: 'Cappuccino', desc: 'Espresso, leche vaporizada y espuma', price: '3.00€' },
      { name: 'Latte', desc: 'Espresso con abundante leche vaporizada', price: '3.00€' },
      { name: 'Flat White', desc: 'Doble shot con microespuma sedosa', price: '3.80€', note: 'Nuestro clásico australiano' },
      { name: 'Café con Leche', desc: 'La versión española tradicional', price: '3.00€' }
    ]
  },

  // CAFÉS FRÍOS
  frios: {
    title: 'Cafés Fríos',
    intro: 'Perfectos para cualquier hora. Preparados con hielo o método cold brew.',
    items: [
      { name: 'Cold Brew', desc: 'Infusión en frío 12h, suave y dulce', price: '3.50€' },
      { name: 'Iced Latte', desc: 'Espresso con leche fría sobre hielo', price: '3.50€' },
      { name: 'Iced Americano', desc: 'Espresso alargado con agua fría', price: '3.00€' }
    ]
  },

  // SIN CAFEÍNA O ALTERNATIVAS
  alternativas: {
    title: 'Alternativas',
    intro: 'Para quienes buscan opciones sin cafeína o sabores diferentes.',
    items: [
      { name: 'Americano', desc: 'Espresso alargado con agua caliente', price: '2.50€', note: 'Sin leche' },
      { name: 'Matcha Latte', desc: 'Té verde japonés con leche vaporizada', price: '3.50€' },
      { name: 'Chai Latte', desc: 'Té especiado con leche vaporizada', price: '3.50€' },
      { name: 'Té Premium', desc: 'Selección de Café Sin Intermediarios', price: '2.50€' }
    ]
  },

  // EXTRAS Y PERSONALIZACIONES
  extras: {
    title: 'Extras',
    items: [
      { name: 'Leche vegetal o sin lactosa', price: 'GRATIS', highlight: true },
      { name: 'Shot extra de café', price: '+1.50€' },
      { name: 'Sirope (vainilla, caramelo)', price: '+0.50€' }
    ]
  },

  // BEBIDAS EMBOTELLADAS
  bebidas: {
    title: 'Bebidas Frías Embotelladas',
    intro: 'Selección de Bebidas Urbanas: kombuchas, refrescos naturales y más.',
    categories: {
      onLemon: {
        name: 'On Lemon',
        size: '33cl',
        items: [
          { name: 'Cola', price: '3.50€' },
          { name: 'Lima', price: '3.50€' },
          { name: 'Naranja', price: '3.50€' },
          { name: 'Matchbata', price: '3.50€' },
          { name: 'ICEBATA Jasmine', price: '3.50€' }
        ]
      },
      kombucha: {
        name: 'Vigo Kombucha',
        items: [
          { name: 'Original', size: '33cl', price: '4.00€' },
          { name: 'Açaí', size: '33cl', price: '4.00€' },
          { name: 'BIO Mango & Maracuyá', size: '33cl', price: '4.50€' },
          { name: 'BIO Yerba Mate', size: '33cl', price: '4.50€' },
          { name: 'BIO Frambuesa & Romero', size: '33cl', price: '4.50€' }
        ]
      },
      mama: {
        name: 'MAMA BIO',
        size: '33cl',
        items: [
          { name: 'Limón', price: '3.50€' },
          { name: 'Mango', price: '3.50€' },
          { name: 'Pineapple', price: '3.50€' },
          { name: 'Fruta de la Pasión', price: '3.50€' }
        ]
      },
      otras: {
        name: 'Otras',
        items: [
          { name: 'Tónica Original', size: '20cl', price: '2.80€' }
        ]
      }
    }
  },

  // CERVEZAS
  cervezas: {
    title: 'Cervezas Artesanas',
    intro: 'Selección de cervezas artesanas españolas. Perfectas para acompañar tu tarde en Tueste.',
    items: [
      { name: 'Alhambra Reserva 1925', type: 'Lager', size: '33cl', price: '3.20€' },
      { name: 'Alhambra Especial', type: 'Pilsner', size: '33cl', price: '2.80€' },
      { name: 'La Virgen 360°', type: 'IPA', size: '33cl', price: '3.80€' },
      { name: 'La Virgen Jamonera', type: 'Wheat Ale', size: '33cl', price: '3.80€' },
      { name: 'Mahou Barrica', type: 'Barrica de Bourbon', size: '33cl', price: '3.50€' },
      { name: 'Cruzcampo Gran Reserva', type: 'Lager Premium', size: '33cl', price: '3.20€' },
      { name: 'Sin Alcohol', type: 'Varios', size: '33cl', price: '2.80€' }
    ]
  },

  // REPOSTERÍA
  pastry: {
    title: 'Repostería de Autor',
    intro: 'Por Inma Cobos. Dulces artesanos que llevan café como ingrediente. No es acompañamiento: es parte de la experiencia.',
    items: [
      { name: 'Brownie de Café', desc: 'Con nueces pecanas', price: '3.00€', provisional: true },
      { name: 'Financier', desc: 'Almendra y café', price: '2.80€', provisional: true },
      { name: 'Cookie XXL', desc: 'Con granos de café tostado', price: '3.20€', provisional: true },
      { name: 'Canelé', desc: 'Tradicional con espresso', price: '2.50€', provisional: true },
      { name: 'Muffin de Café', desc: 'Con chips de chocolate', price: '2.80€', provisional: true },
      { name: 'Biscotti', desc: 'Para dipear en café', price: '2.50€', provisional: true },
      { name: 'Cinnamon Roll', desc: 'Con glaseado de café', price: '3.50€', provisional: true },
      { name: 'Tarta del Día', desc: 'Consulta al barista', price: '3.80€', provisional: true }
    ]
  },

  // COMBO
  combo: {
    title: 'Combo Tueste',
    desc: 'Cualquier café + cualquier dulce',
    price: '5.90€',
    note: 'Calculado: promedio bebidas (2.90€) + dulce (3.00€)',
    highlight: true
  }
  combo: { name: 'Combo Café + Dulce', price: '5.90€', desc: 'Cualquier café + repostería' },
};

const coffeeProfiles = [
  {
    id: 1, name: "Etiopía Sidamo", origin: "Etiopía", process: "Lavado",
    scaScores: { aroma: 8, sabor: 8, acidez: 8, finalizacion: 7.75, cuerpo: 7.75, balance: 8, global: 8, uniformidad: 10, dulzor: 10, limpieza: 10 },
    notes: "Jazmín, albaricoque, caramelo, lima y mazapán"
  },
  {
    id: 2, name: "Honduras Cecilia Finca Arroyo", origin: "Honduras", process: "Lavado",
    scaScores: { aroma: 8, sabor: 8, acidez: 8, finalizacion: 9, cuerpo: 8, balance: 7.5, global: 7.5, uniformidad: 10, dulzor: 10, limpieza: 10 },
    notes: "Chocolate leche, caramelo y frutas cítricas"
  },
  {
    id: 3, name: "Colombia Huila Especial", origin: "Colombia", process: "Lavado",
    scaScores: { aroma: 7.5, sabor: 7.5, acidez: 7.5, finalizacion: 7.5, cuerpo: 7.5, balance: 7.5, global: 7.5, uniformidad: 10, dulzor: 10, limpieza: 10 },
    notes: "Chocolate, caramelo, frutos rojos"
  },
  {
    id: 4, name: "Brasil Cerrado Mineiro", origin: "Brasil", process: "Natural",
    scaScores: { aroma: 7.5, sabor: 8, acidez: 7.5, finalizacion: 8, cuerpo: 8.5, balance: 8, global: 8, uniformidad: 10, dulzor: 10, limpieza: 10 },
    notes: "Chocolate negro, nueces, caramelo"
  },
  {
    id: 5, name: "Nicaragua Matagalpa", origin: "Nicaragua", process: "Lavado",
    scaScores: { aroma: 7.5, sabor: 7.5, acidez: 8, finalizacion: 7.5, cuerpo: 7.5, balance: 8, global: 8, uniformidad: 10, dulzor: 10, limpieza: 10 },
    notes: "Cítricos, caramelo, miel"
  },
  {
    id: 6, name: "México Chiapas", origin: "México", process: "Lavado",
    scaScores: { aroma: 7.5, sabor: 7.5, acidez: 7.5, finalizacion: 7.5, cuerpo: 8, balance: 7.5, global: 7.5, uniformidad: 10, dulzor: 10, limpieza: 10 },
    notes: "Chocolate con leche, nueces, vainilla"
  },
  {
    id: 7, name: "Guatemala Antigua", origin: "Guatemala", process: "Lavado",
    scaScores: { aroma: 8, sabor: 8, acidez: 8, finalizacion: 8, cuerpo: 8.5, balance: 8, global: 8.5, uniformidad: 10, dulzor: 10, limpieza: 10 },
    notes: "Cacao, caramelo, frutos secos"
  },
  {
    id: 8, name: "Costa Rica Tarrazú", origin: "Costa Rica", process: "Miel",
    scaScores: { aroma: 8, sabor: 8.5, acidez: 8, finalizacion: 8, cuerpo: 8, balance: 8.5, global: 8.5, uniformidad: 10, dulzor: 10, limpieza: 10 },
    notes: "Miel, frutas tropicales, cítricos"
  },
  {
    id: 9, name: "Kenia AA Nyeri", origin: "Kenia", process: "Lavado",
    scaScores: { aroma: 8.5, sabor: 9, acidez: 9, finalizacion: 8.5, cuerpo: 8, balance: 8.5, global: 9, uniformidad: 10, dulzor: 10, limpieza: 10 },
    notes: "Grosella negra, tomate cherry, vino tinto"
  },
  {
    id: 10, name: "Ruanda Bourbon", origin: "Ruanda", process: "Lavado",
    scaScores: { aroma: 8, sabor: 8.5, acidez: 8.5, finalizacion: 8, cuerpo: 7.5, balance: 8, global: 8.5, uniformidad: 10, dulzor: 10, limpieza: 10 },
    notes: "Flores, té negro, cítricos"
  },
  {
    id: 11, name: "Perú Cajamarca", origin: "Perú", process: "Lavado",
    scaScores: { aroma: 7.5, sabor: 7.5, acidez: 7.5, finalizacion: 7.5, cuerpo: 8, balance: 7.5, global: 7.5, uniformidad: 10, dulzor: 10, limpieza: 10 },
    notes: "Chocolate, almendras, caramelo"
  },
  {
    id: 12, name: "Sumatra Mandheling", origin: "Indonesia", process: "Húmedo",
    scaScores: { aroma: 8, sabor: 8, acidez: 7, finalizacion: 8, cuerpo: 9, balance: 8, global: 8, uniformidad: 10, dulzor: 10, limpieza: 10 },
    notes: "Tierra, cedro, chocolate oscuro, especias"
  }
];

const booksData = {
  esenciales: [
    { title: 'The World Atlas of Coffee', author: 'James Hoffmann', year: '2018', url: '#AMAZON_ATLAS', provisional: false },
    { title: 'How to Make the Best Coffee at Home', author: 'James Hoffmann', year: '2022', url: '#AMAZON_BEST', provisional: false },
    { title: 'Craft Coffee', author: 'Jessica Easto', year: '2017', url: '#AMAZON_CRAFT', provisional: false }
  ],
  brewing: [
    { title: 'The Blue Bottle Craft of Coffee', author: 'James Freeman', year: '2012', url: '#AMAZON_BLUEBOTTLE', provisional: false },
    { title: 'Coffee Obsession', author: 'DK Publishing', year: '2014', url: '#AMAZON_OBSESSION', provisional: false },
    { title: 'The Coffee Dictionary', author: 'Maxwell Colonna-Dashwood', year: '2017', url: '#AMAZON_DICTIONARY', provisional: false }
  ],
  historia: [
    { title: 'Uncommon Grounds', author: 'Mark Pendergrast', year: '2010', url: '#AMAZON_UNCOMMON', provisional: false },
    { title: 'God in a Cup', author: 'Michaele Weissman', year: '2008', url: '#AMAZON_GODCUP', provisional: false },
    { title: 'The Monk of Mokha', author: 'Dave Eggers', year: '2018', url: '#AMAZON_MONK', provisional: false }
  ],
  avanzado: [
    { title: "The Coffee Roaster's Companion", author: 'Scott Rao', year: '2014', url: '#AMAZON_ROASTER', provisional: false },
    { title: 'The Craft and Science of Coffee', author: 'Britta Folmer', year: '2017', url: '#AMAZON_SCIENCE', provisional: false },
    { title: "The Professional Barista's Handbook", author: 'Scott Rao', year: '2008', url: '#AMAZON_BARISTA', provisional: false }
  ]
};

const learnData = {
  youtube: [
    { name: 'James Hoffmann', desc: 'Campeón mundial barista. 2.3M subs', url: 'https://youtube.com/@jameshoffmann', provisional: false },
    { name: 'European Coffee Trip', desc: 'Viajes y reviews de cafeterías', url: 'https://youtube.com/@EuropeanCoffeeTrip', provisional: false },
    { name: 'The Real Chris Baca', desc: 'Barista profesional y educador', url: 'https://youtube.com/@TheRealChrisBaca', provisional: false },
    { name: 'Re:co Symposium', desc: 'Conferencias SCA oficiales', url: 'https://youtube.com/@recosymposium', provisional: false }
  ],
  articulos: [
    { name: 'Perfect Daily Grind', desc: 'Artículos en inglés y español', url: 'https://perfectdailygrind.com', provisional: false },
    { name: 'Barista Magazine', desc: 'Revista profesional online', url: 'https://www.baristamagazine.com', provisional: false },
    { name: 'SCA News', desc: 'Noticias oficiales SCA', url: 'https://sca.coffee/news', provisional: false }
  ],
  herramientas: [
    { name: 'SCA Flavor Wheel', desc: 'Rueda de sabores interactiva', url: 'https://notbadcoffee.com/flavor-wheel-en/', provisional: false },
    { name: 'Coffee Ad Astra', desc: 'Calculadoras de extracción', url: 'https://www.coffeead astra.com', provisional: false },
    { name: 'SCA Resources', desc: 'Recursos educativos gratis', url: 'https://sca.coffee/research', provisional: false }
  ]
};

const communityData = {
  telegram: {
    es: { name: 'Telegram Tueste (ES)', url: '#TELEGRAM_ES', provisional: true },
    en: { name: 'Telegram Tueste (EN)', url: '#TELEGRAM_EN', provisional: true }
  },
  social: {
    instagram: { name: '@tuestespecialtycoffee', url: 'https://instagram.com/tuestespecialtycoffee', provisional: false },
    google: { name: 'Google Maps', url: '#GOOGLE_MAPS', provisional: true }
  }
};

const playlistsData = {
  community: { title: "Playlist Comunitaria", url: "https://open.spotify.com/playlist/37i9dQZF1DWZd79rJ6a7lp" },
  times: [
    { title: "Mañanas con Café", url: "https://open.spotify.com/playlist/37i9dQZF1DX0sm0LYsmbMT" },
    { title: "Café de Tarde", url: "https://open.spotify.com/playlist/37i9dQZF1DWXe9gFZP0gtP" },
    { title: "Noches Tranquilas", url: "https://open.spotify.com/playlist/37i9dQZF1DX4PP3DA4J0N8" }
  ],
  origins: [
    { country: "Brasil", title: "Bossa Nova", url: "https://open.spotify.com/playlist/37i9dQZF1DXd9zR7tdziuQ" },
    { country: "Colombia", title: "Cumbia", url: "https://open.spotify.com/playlist/37i9dQZF1DX14fiWYoe7Oh" },
    { country: "Etiopía", title: "Ethiopian Jazz", url: "https://open.spotify.com/playlist/37i9dQZF1DX8FwnYE6PRvL" },
    { country: "México", title: "Rancheras", url: "https://open.spotify.com/playlist/37i9dQZF1DX1vvOF52xHMI" }
  ],
  about: [
    { title: "Coffee - beabadoobee", url: "https://open.spotify.com/track/0DvojO8TBG4WH8OPTRiMZm" },
    { title: "One More Cup of Coffee - Bob Dylan", url: "https://open.spotify.com/track/6xvAo3kK6W1N6dvOxYrqPD" },
    { title: "Black Coffee - Ella Fitzgerald", url: "https://open.spotify.com/track/5aP7RKvU4h1aLxoTpwGgZ4" }
  ]
};

// MAIN COMPONENT
export default function EspacioTueste() {
  const [lang, setLang] = useState('es');
  const [activeSection, setActiveSection] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentCoffeeIndex, setCurrentCoffeeIndex] = useState(0);
  const [tempScores, setTempScores] = useState({});
  const [userScores, setUserScores] = useState([]);
  const [gameFinished, setGameFinished] = useState(false);
  const [showSCAInfo, setShowSCAInfo] = useState(false);

  const resetGame = () => {
    setGameStarted(false);
    setGameFinished(false);
    setCurrentCoffeeIndex(0);
    setTempScores({});
    setUserScores([]);
  };
  const [gameStarted, setGameStarted] = useState(false);
  const [currentCoffeeIndex, setCurrentCoffeeIndex] = useState(0);
  const [userScores, setUserScores] = useState([]);
  const [tempScores, setTempScores] = useState({});
  const [gameFinished, setGameFinished] = useState(false);

  const attributes = ['aroma', 'sabor', 'acidez', 'finalizacion', 'cuerpo', 'balance', 'global', 'uniformidad', 'dulzor', 'limpieza'];
  const attrLabels = ['Aroma', 'Sabor', 'Acidez', 'Finalización', 'Cuerpo', 'Balance', 'Global', 'Uniformidad', 'Dulzor', 'Limpieza'];

  const handleScoreChange = (attr, value) => {
    setTempScores({ ...tempScores, [attr]: parseFloat(value) });
  };

  const handleNextCoffee = () => {
    userScores.push({ coffeeId: coffeeProfiles[currentCoffeeIndex].id, scores: { ...tempScores } });
    setUserScores([...userScores]);
    setTempScores({});
    if (currentCoffeeIndex < coffeeProfiles.length - 1) {
      setCurrentCoffeeIndex(currentCoffeeIndex + 1);
    } else {
      setGameFinished(true);
    }
  };

  const calculateResults = () => {
    let totalDeviation = 0;
    coffeeProfiles.forEach((coffee, i) => {
      if (!userScores[i]) return;
      let coffeeDeviation = 0;
      let count = 0;
      attributes.forEach(attr => {
        const scaValue = coffee.scaScores[attr];
        const userValue = userScores[i].scores[attr] || 0;
        coffeeDeviation += Math.abs(scaValue - userValue);
        count++;
      });
      totalDeviation += (coffeeDeviation / count);
    });
    const globalAvg = (totalDeviation / coffeeProfiles.length).toFixed(2);
    return { globalAvgDeviation: globalAvg, winner: globalAvg <= 1 };
  };

  const resetGame = () => {
    setGameStarted(false);
    setCurrentCoffeeIndex(0);
    setUserScores([]);
    setTempScores({});
    setGameFinished(false);
  };

  return (
    <div style={{ fontFamily: "'Noto Sans', sans-serif", color: colors.text }}>
      <link href="https://fonts.googleapis.com/css2?family=STIX+Two+Text:wght@400;500;600&family=Noto+Sans:wght@300;400;600&display=swap" rel="stylesheet" />
      
      <ContactBar />

      {/* Nav */}
      <nav style={{
        position: 'sticky',
        top: 0,
        background: colors.crema + 'F5',
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${colors.castano}30`,
        zIndex: 1000,
        padding: '16px 24px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div onClick={() => setActiveSection(0)} style={{ cursor: 'pointer' }}>
            <TuesteLogo size="sm" />
          </div>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            {['Inicio', 'Carta', 'El Juego', 'Playlists', 'Biblioteca', 'Aprendizaje', 'Comunidad'].map((item, i) => (
              <button key={i} onClick={() => setActiveSection(i)} style={{
                background: 'none', border: 'none', color: activeSection === i ? colors.cafe : colors.castano,
                fontWeight: activeSection === i ? 600 : 400, fontSize: '15px', cursor: 'pointer',
                borderBottom: activeSection === i ? `2px solid ${colors.cafe}` : '2px solid transparent'
              }}>
                {item}
              </button>
            ))}
            <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} style={{
              background: colors.castano, color: colors.white, border: 'none', borderRadius: '20px',
              padding: '6px 16px', fontSize: '13px', fontWeight: 600, cursor: 'pointer'
            }}>
              {lang === 'es' ? 'EN' : 'ES'}
            </button>
          </div>
        </div>
      </nav>

      <main>
        {/* SECTION 0: INICIO */}
        {activeSection === 0 && (
          <>
            {/* Hero */}
            <section style={{ minHeight: '85vh', background: `linear-gradient(135deg, ${colors.cremaLight} 0%, ${colors.crema} 100%)`, display: 'flex', alignItems: 'center', padding: '60px 24px' }}>
              <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
                <div>
                  <div style={{ marginBottom: '32px' }}><TuesteLogo size="xl" /></div>
                  <h1 style={{ fontFamily: "'STIX Two Text', serif", fontSize: '42px', color: colors.cafe, marginBottom: '24px' }}>
                    El café que mereces,<br/>sin intermediarios
                  </h1>
                  <p style={{ fontSize: '18px', color: colors.castano, marginBottom: '40px', lineHeight: 1.7 }}>
                    En Tueste trabajamos directamente con origen. Cada café que pruebas tiene nombre, apellido y una historia real. 
                    Tostamos en Córdoba, semanalmente, para que llegue fresco a tu taza.
                  </p>
                  <button onClick={() => setActiveSection(1)} style={{
                    background: colors.cafe, color: colors.white, border: 'none', borderRadius: '8px',
                    padding: '16px 40px', fontSize: '16px', fontWeight: 600, cursor: 'pointer'
                  }}>
                    Ver Carta
                  </button>
                </div>
                <div style={{ 
                  borderRadius: '16px', 
                  overflow: 'hidden',
                  background: `linear-gradient(135deg, ${colors.castano} 0%, ${colors.cafe} 100%)`,
                  height: '500px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: colors.white,
                  fontSize: '14px',
                  fontStyle: 'italic',
                  opacity: 0.7
                }}>
                  [Imagen: Café de especialidad]
                </div>
              </div>
            </section>

            {/* Valores */}
            <section style={{ padding: '80px 24px', background: colors.white }}>
              <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h2 style={{ fontFamily: "'STIX Two Text', serif", fontSize: '36px', color: colors.cafe, textAlign: 'center', marginBottom: '16px' }}>
                  Lo que nos define
                </h2>
                <p style={{ fontSize: '16px', color: colors.castano, textAlign: 'center', marginBottom: '60px' }}>
                  No es solo café. Es una forma de trabajar.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px' }}>
                  {companyData.values.map((v, i) => (
                    <div key={i} style={{ background: colors.cremaLight, borderRadius: '12px', padding: '32px' }}>
                      <h3 style={{ fontFamily: "'STIX Two Text', serif", fontSize: '20px', color: colors.cafe, marginBottom: '12px' }}>
                        {v.title}
                      </h3>
                      <p style={{ fontSize: '14px', lineHeight: 1.6, color: colors.text }}>{v.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Repostería */}
            <section style={{ padding: '80px 24px', background: colors.crema }}>
              <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
                <div style={{ 
                  borderRadius: '16px', 
                  background: `linear-gradient(135deg, ${colors.castano}30 0%, ${colors.crema} 100%)`,
                  height: '400px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: colors.cafe,
                  fontSize: '14px',
                  fontStyle: 'italic'
                }}>
                  [Imagen: Repostería artesana]
                </div>
                <div>
                  <h2 style={{ fontFamily: "'STIX Two Text', serif", fontSize: '36px', color: colors.cafe, marginBottom: '16px' }}>
                    Repostería de Autor
                  </h2>
                  <h3 style={{ fontSize: '20px', color: colors.castano, marginBottom: '24px', fontStyle: 'italic' }}>
                    Por Inma Cobos
                  </h3>
                  <p style={{ fontSize: '16px', lineHeight: 1.8, marginBottom: '24px' }}>
                    Trabajamos con Inma Cobos, pastelera de Córdoba, para crear dulces que dialogan con el café. 
                    No es acompañamiento: es parte de la experiencia. Cada pieza lleva café como ingrediente.
                  </p>
                  <button onClick={() => setActiveSection(1)} style={{
                    background: colors.cafe, color: colors.white, border: 'none', borderRadius: '8px',
                    padding: '14px 32px', fontSize: '15px', fontWeight: 600, cursor: 'pointer'
                  }}>
                    Ver Carta Completa
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {/* SECTION 1: CARTA */}
        {/* SECTION 1: CARTA */}
        {activeSection === 1 && (
          <section style={{ minHeight: '100vh', padding: '80px 24px', background: colors.white }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              
              {/* Header de la carta */}
              <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <h2 style={{ fontFamily: "'STIX Two Text', serif", fontSize: '48px', color: colors.cafe, marginBottom: '16px' }}>
                  Nuestra Carta
                </h2>
                <p style={{ fontSize: '18px', color: colors.castano, lineHeight: 1.6, maxWidth: '700px', margin: '0 auto' }}>
                  Café de especialidad tostado en Córdoba. Bebidas y dulces pensados para disfrutar sin prisas.
                </p>
              </div>

              {/* COMBO DESTACADO */}
              <div style={{
                background: `linear-gradient(135deg, ${colors.cafe} 0%, ${colors.castano} 100%)`,
                borderRadius: '20px',
                padding: '48px',
                textAlign: 'center',
                color: colors.white,
                marginBottom: '60px',
                boxShadow: `0 8px 24px ${colors.cafe}30`
              }}>
                <h3 style={{ fontFamily: "'STIX Two Text', serif", fontSize: '32px', marginBottom: '12px', fontWeight: 400 }}>
                  {menuData.combo.title}
                </h3>
                <p style={{ fontSize: '18px', marginBottom: '24px', opacity: 0.9 }}>
                  {menuData.combo.desc}
                </p>
                <div style={{ fontSize: '48px', fontWeight: 700, marginBottom: '8px' }}>
                  {menuData.combo.price}
                </div>
                <p style={{ fontSize: '14px', opacity: 0.8, fontStyle: 'italic' }}>
                  {menuData.combo.note}
                </p>
              </div>

              {/* CATEGORÍA: CAFÉS ESPRESSO */}
              <div style={{ marginBottom: '60px' }}>
                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{ fontFamily: "'STIX Two Text', serif", fontSize: '32px', color: colors.cafe, marginBottom: '12px' }}>
                    {menuData.espresso.title}
                  </h3>
                  <p style={{ fontSize: '15px', color: colors.text, lineHeight: 1.6 }}>
                    {menuData.espresso.intro}
                  </p>
                </div>
                <div style={{ display: 'grid', gap: '16px' }}>
                  {menuData.espresso.items.map((item, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '20px',
                      background: colors.cremaLight,
                      borderRadius: '12px',
                      border: `1px solid ${colors.crema}`
                    }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '18px', fontWeight: 600, color: colors.cafe, marginBottom: '4px' }}>
                          {item.name}
                        </h4>
                        <p style={{ fontSize: '14px', color: colors.text, margin: 0 }}>
                          {item.desc}
                        </p>
                      </div>
                      <div style={{ fontSize: '20px', fontWeight: 600, color: colors.castano, marginLeft: '24px' }}>
                        {item.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CATEGORÍA: CAFÉS CON LECHE */}
              <div style={{ marginBottom: '60px' }}>
                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{ fontFamily: "'STIX Two Text', serif", fontSize: '32px', color: colors.cafe, marginBottom: '12px' }}>
                    {menuData.conLeche.title}
                  </h3>
                  <p style={{ fontSize: '15px', color: colors.text, lineHeight: 1.6 }}>
                    {menuData.conLeche.intro}
                  </p>
                </div>
                <div style={{ display: 'grid', gap: '16px' }}>
                  {menuData.conLeche.items.map((item, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '20px',
                      background: colors.cremaLight,
                      borderRadius: '12px',
                      border: `1px solid ${colors.crema}`
                    }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '18px', fontWeight: 600, color: colors.cafe, marginBottom: '4px' }}>
                          {item.name}
                        </h4>
                        <p style={{ fontSize: '14px', color: colors.text, margin: 0 }}>
                          {item.desc}
                        </p>
                        {item.note && (
                          <p style={{ fontSize: '13px', color: colors.castano, margin: '4px 0 0 0', fontStyle: 'italic' }}>
                            {item.note}
                          </p>
                        )}
                      </div>
                      <div style={{ fontSize: '20px', fontWeight: 600, color: colors.castano, marginLeft: '24px' }}>
                        {item.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CATEGORÍA: CAFÉS FRÍOS */}
              <div style={{ marginBottom: '60px' }}>
                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{ fontFamily: "'STIX Two Text', serif", fontSize: '32px', color: colors.cafe, marginBottom: '12px' }}>
                    {menuData.frios.title}
                  </h3>
                  <p style={{ fontSize: '15px', color: colors.text, lineHeight: 1.6 }}>
                    {menuData.frios.intro}
                  </p>
                </div>
                <div style={{ display: 'grid', gap: '16px' }}>
                  {menuData.frios.items.map((item, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '20px',
                      background: colors.cremaLight,
                      borderRadius: '12px',
                      border: `1px solid ${colors.crema}`
                    }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '18px', fontWeight: 600, color: colors.cafe, marginBottom: '4px' }}>
                          {item.name}
                        </h4>
                        <p style={{ fontSize: '14px', color: colors.text, margin: 0 }}>
                          {item.desc}
                        </p>
                      </div>
                      <div style={{ fontSize: '20px', fontWeight: 600, color: colors.castano, marginLeft: '24px' }}>
                        {item.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CATEGORÍA: ALTERNATIVAS */}
              <div style={{ marginBottom: '60px' }}>
                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{ fontFamily: "'STIX Two Text', serif", fontSize: '32px', color: colors.cafe, marginBottom: '12px' }}>
                    {menuData.alternativas.title}
                  </h3>
                  <p style={{ fontSize: '15px', color: colors.text, lineHeight: 1.6 }}>
                    {menuData.alternativas.intro}
                  </p>
                </div>
                <div style={{ display: 'grid', gap: '16px' }}>
                  {menuData.alternativas.items.map((item, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '20px',
                      background: colors.cremaLight,
                      borderRadius: '12px',
                      border: `1px solid ${colors.crema}`
                    }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '18px', fontWeight: 600, color: colors.cafe, marginBottom: '4px' }}>
                          {item.name}
                        </h4>
                        <p style={{ fontSize: '14px', color: colors.text, margin: 0 }}>
                          {item.desc}
                        </p>
                        {item.note && (
                          <p style={{ fontSize: '13px', color: colors.castano, margin: '4px 0 0 0', fontStyle: 'italic' }}>
                            {item.note}
                          </p>
                        )}
                      </div>
                      <div style={{ fontSize: '20px', fontWeight: 600, color: colors.castano, marginLeft: '24px' }}>
                        {item.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CATEGORÍA: EXTRAS */}
              <div style={{ marginBottom: '60px' }}>
                <h3 style={{ fontFamily: "'STIX Two Text', serif", fontSize: '32px', color: colors.cafe, marginBottom: '24px' }}>
                  {menuData.extras.title}
                </h3>
                <div style={{ display: 'grid', gap: '12px' }}>
                  {menuData.extras.items.map((item, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '16px 20px',
                      background: item.highlight ? `${colors.castano}15` : colors.cremaLight,
                      borderRadius: '8px',
                      border: `1px solid ${item.highlight ? colors.castano : colors.crema}`
                    }}>
                      <span style={{ fontSize: '16px', fontWeight: item.highlight ? 600 : 400, color: colors.cafe }}>
                        {item.name}
                      </span>
                      <span style={{ fontSize: '18px', fontWeight: 600, color: item.highlight ? colors.cafe : colors.castano }}>
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CATEGORÍA: CERVEZAS */}
              <div style={{ marginBottom: '60px' }}>
                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{ fontFamily: "'STIX Two Text', serif", fontSize: '32px', color: colors.cafe, marginBottom: '12px' }}>
                    {menuData.cervezas.title}
                  </h3>
                  <p style={{ fontSize: '15px', color: colors.text, lineHeight: 1.6 }}>
                    {menuData.cervezas.intro}
                  </p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                  {menuData.cervezas.items.map((item, i) => (
                    <div key={i} style={{
                      padding: '20px',
                      background: colors.cremaLight,
                      borderRadius: '12px',
                      border: `1px solid ${colors.crema}`
                    }}>
                      <h4 style={{ fontSize: '18px', fontWeight: 600, color: colors.cafe, marginBottom: '6px' }}>
                        {item.name}
                      </h4>
                      <p style={{ fontSize: '13px', color: colors.castano, margin: '0 0 8px 0' }}>
                        {item.type} · {item.size}
                      </p>
                      <p style={{ fontSize: '20px', fontWeight: 600, color: colors.castano, margin: 0 }}>
                        {item.price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CATEGORÍA: BEBIDAS EMBOTELLADAS */}
              <div style={{ marginBottom: '60px' }}>
                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{ fontFamily: "'STIX Two Text', serif", fontSize: '32px', color: colors.cafe, marginBottom: '12px' }}>
                    {menuData.bebidas.title}
                  </h3>
                  <p style={{ fontSize: '15px', color: colors.text, lineHeight: 1.6 }}>
                    {menuData.bebidas.intro}
                  </p>
                </div>

                {/* On Lemon */}
                <div style={{ marginBottom: '32px' }}>
                  <h4 style={{ fontSize: '20px', fontWeight: 600, color: colors.cafe, marginBottom: '16px' }}>
                    {menuData.bebidas.categories.onLemon.name} <span style={{ fontSize: '14px', fontWeight: 400, color: colors.castano }}>({menuData.bebidas.categories.onLemon.size})</span>
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
                    {menuData.bebidas.categories.onLemon.items.map((item, i) => (
                      <div key={i} style={{
                        padding: '16px',
                        background: colors.cremaLight,
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <span style={{ fontSize: '15px', color: colors.cafe }}>{item.name}</span>
                        <span style={{ fontSize: '16px', fontWeight: 600, color: colors.castano }}>{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Kombucha */}
                <div style={{ marginBottom: '32px' }}>
                  <h4 style={{ fontSize: '20px', fontWeight: 600, color: colors.cafe, marginBottom: '16px' }}>
                    {menuData.bebidas.categories.kombucha.name}
                  </h4>
                  <div style={{ display: 'grid', gap: '12px' }}>
                    {menuData.bebidas.categories.kombucha.items.map((item, i) => (
                      <div key={i} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '16px 20px',
                        background: colors.cremaLight,
                        borderRadius: '8px'
                      }}>
                        <div>
                          <span style={{ fontSize: '16px', color: colors.cafe, marginRight: '12px' }}>{item.name}</span>
                          <span style={{ fontSize: '13px', color: colors.castano }}>({item.size})</span>
                        </div>
                        <span style={{ fontSize: '18px', fontWeight: 600, color: colors.castano }}>{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* MAMA BIO */}
                <div style={{ marginBottom: '32px' }}>
                  <h4 style={{ fontSize: '20px', fontWeight: 600, color: colors.cafe, marginBottom: '16px' }}>
                    {menuData.bebidas.categories.mama.name} <span style={{ fontSize: '14px', fontWeight: 400, color: colors.castano }}>({menuData.bebidas.categories.mama.size})</span>
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
                    {menuData.bebidas.categories.mama.items.map((item, i) => (
                      <div key={i} style={{
                        padding: '16px',
                        background: colors.cremaLight,
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <span style={{ fontSize: '15px', color: colors.cafe }}>{item.name}</span>
                        <span style={{ fontSize: '16px', fontWeight: 600, color: colors.castano }}>{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Otras */}
                <div>
                  <h4 style={{ fontSize: '20px', fontWeight: 600, color: colors.cafe, marginBottom: '16px' }}>
                    {menuData.bebidas.categories.otras.name}
                  </h4>
                  <div style={{ display: 'grid', gap: '12px' }}>
                    {menuData.bebidas.categories.otras.items.map((item, i) => (
                      <div key={i} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '16px 20px',
                        background: colors.cremaLight,
                        borderRadius: '8px'
                      }}>
                        <div>
                          <span style={{ fontSize: '16px', color: colors.cafe, marginRight: '12px' }}>{item.name}</span>
                          <span style={{ fontSize: '13px', color: colors.castano }}>({item.size})</span>
                        </div>
                        <span style={{ fontSize: '18px', fontWeight: 600, color: colors.castano }}>{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CATEGORÍA: REPOSTERÍA */}
              <div>
                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{ fontFamily: "'STIX Two Text', serif", fontSize: '32px', color: colors.cafe, marginBottom: '12px' }}>
                    {menuData.pastry.title}
                  </h3>
                  <p style={{ fontSize: '15px', color: colors.text, lineHeight: 1.6 }}>
                    {menuData.pastry.intro}
                  </p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                  {menuData.pastry.items.map((item, i) => (
                    <div key={i} style={{
                      padding: '20px',
                      background: item.provisional ? `${colors.castano}10` : colors.cremaLight,
                      borderRadius: '12px',
                      border: `1px solid ${item.provisional ? colors.castano + '40' : colors.crema}`,
                      position: 'relative'
                    }}>
                      {item.provisional && (
                        <div style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          padding: '4px 8px',
                          background: colors.castano,
                          color: colors.white,
                          fontSize: '10px',
                          borderRadius: '4px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          Provisional
                        </div>
                      )}
                      <h4 style={{ fontSize: '18px', fontWeight: 600, color: colors.cafe, marginBottom: '6px' }}>
                        {item.name}
                      </h4>
                      <p style={{ fontSize: '14px', color: colors.text, margin: '0 0 12px 0' }}>
                        {item.desc}
                      </p>
                      <p style={{ fontSize: '20px', fontWeight: 600, color: colors.castano, margin: 0 }}>
                        {item.price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>
        )}

        {/* SECTION 2: EL JUEGO */}
        {activeSection === 2 && (
          <section style={{ minHeight: '100vh', background: 'linear-gradient(145deg, #1a1612 0%, #2d251f 50%, #1a1612 100%)', padding: '80px 24px' }}>
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Outfit:wght@300;400;500&display=swap');
              .coffee-card-game { background: linear-gradient(135deg, rgba(62,50,40,0.9) 0%, rgba(45,37,31,0.95) 100%); border: 1px solid rgba(180,150,110,0.2); border-radius: 12px; padding: 20px; cursor: pointer; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); position: relative; overflow: hidden; }
              .coffee-card-game::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #b4966e, #d4b896, #b4966e); opacity: 0; transition: opacity 0.3s; }
              .coffee-card-game:hover { transform: translateY(-4px); border-color: rgba(180,150,110,0.5); box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
              .coffee-card-game:hover::before { opacity: 1; }
              .origin-badge-game { display: inline-block; padding: 4px 12px; background: rgba(180,150,110,0.15); border: 1px solid rgba(180,150,110,0.3); border-radius: 20px; font-family: 'Outfit', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; color: #d4b896; }
              .slider-track { display: flex; justify-content: space-between; align-items: center; position: relative; height: 60px; padding: 0 8px; }
              .slider-line { position: absolute; top: 50%; left: 8px; right: 8px; height: 2px; background: linear-gradient(90deg, rgba(180,150,110,0.3), rgba(180,150,110,0.6), rgba(180,150,110,0.3)); transform: translateY(-50%); }
              .slider-point { width: 12px; height: 12px; border-radius: 50%; background: #2d251f; border: 2px solid rgba(180,150,110,0.4); cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); position: relative; z-index: 2; flex-shrink: 0; }
              .slider-point:hover { transform: scale(1.4); border-color: #d4b896; background: rgba(180,150,110,0.2); }
              .slider-point.active { background: linear-gradient(135deg, #d4b896, #b4966e); border-color: #d4b896; transform: scale(1.5); box-shadow: 0 0 20px rgba(212,184,150,0.5); }
              .progress-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(180,150,110,0.3); transition: all 0.3s; }
              .progress-dot.completed { background: #b4966e; }
              .progress-dot.current { background: #d4b896; box-shadow: 0 0 10px rgba(212,184,150,0.5); transform: scale(1.3); }
            `}</style>

            <div style={{ maxWidth: '800px', margin: '0 auto', color: '#e8e0d5' }}>
              {!gameStarted && !gameFinished && (
                <>
                  <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: '#b4966e', marginBottom: '12px' }}>Tueste Specialty Coffee</div>
                    <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: '300', margin: '0 0 8px 0', letterSpacing: '0.02em', background: 'linear-gradient(135deg, #e8e0d5 0%, #d4b896 50%, #e8e0d5 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      El Juego de la Cata
                    </h2>
                  </div>

                  <div style={{ background: 'linear-gradient(135deg, rgba(62,50,40,0.95) 0%, rgba(45,37,31,0.98) 100%)', border: '1px solid rgba(180,150,110,0.3)', borderRadius: '16px', padding: '32px', marginBottom: '40px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
                      <div>
                        <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '13px', fontWeight: '500', letterSpacing: '2px', textTransform: 'uppercase', color: '#d4b896', margin: '0 0 12px 0' }}>Protocolo Oficial SCA</h3>
                        <p style={{ fontSize: '15px', fontWeight: '300', lineHeight: '1.7', color: '#c0b0a0', margin: '0' }}>
                          Las puntuaciones de nuestros cafés siguen el <strong style={{ color: '#e8e0d5' }}>protocolo de cata de la Specialty Coffee Association</strong>, el estándar internacional para evaluar café de especialidad desde 1982.
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowSCAInfo(!showSCAInfo)} 
                      style={{ background: 'none', border: 'none', color: '#b4966e', fontFamily: "'Outfit', sans-serif", fontSize: '12px', letterSpacing: '1px', cursor: 'pointer', padding: '8px 0' }}
                    >
                      {showSCAInfo ? '▲ Ocultar información' : '▼ Más sobre el protocolo SCA'}
                    </button>
                    {showSCAInfo && (
                      <div style={{ marginTop: '16px', padding: '20px', background: 'rgba(0,0,0,0.25)', borderRadius: '8px', borderLeft: '3px solid #b4966e' }}>
                        <p style={{ fontSize: '14px', lineHeight: '1.8', color: '#b0a090', margin: '0 0 16px 0' }}>
                          La <strong style={{ color: '#d4b896' }}>Specialty Coffee Association (SCA)</strong> es una organización sin ánimo de lucro que reúne a productores, tostadores, baristas y catadores de todo el mundo.
                        </p>
                        <p style={{ fontSize: '14px', lineHeight: '1.8', color: '#b0a090', margin: '0 0 16px 0' }}>
                          El protocolo evalúa <strong style={{ color: '#d4b896' }}>10 atributos sensoriales</strong> en una escala de 6 a 10. Solo los cafés que superan los <strong style={{ color: '#d4b896' }}>80 puntos totales</strong> pueden llamarse "café de especialidad".
                        </p>
                        <p style={{ fontSize: '13px', fontStyle: 'italic', color: '#908070', margin: '0' }}>
                          Más información: <a href="https://sca.coffee" target="_blank" rel="noopener noreferrer" style={{ color: '#d4b896', textDecoration: 'none', borderBottom: '1px solid rgba(212,184,150,0.3)' }}>sca.coffee</a>
                        </p>
                      </div>
                    )}
                  </div>

                  <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <p style={{ fontSize: '17px', fontWeight: '300', lineHeight: '1.8', color: '#c0b0a0', fontStyle: 'italic', maxWidth: '600px', margin: '0 auto' }}>
                      ¿Crees que puedes identificar las cualidades de un café de especialidad? Evalúa nuestros cafés con los mismos criterios que usan los catadores profesionales.
                    </p>
                  </div>

                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', color: '#b4966e', marginBottom: '20px', textAlign: 'center' }}>
                    Selecciona el café que vas a catar
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                    {coffeeProfiles.map((coffee) => (
                      <div 
                        key={coffee.id} 
                        className="coffee-card-game" 
                        onClick={() => {
                          setCurrentCoffeeIndex(coffeeProfiles.indexOf(coffee));
                          setGameStarted(true);
                          setTempScores({});
                        }}
                      >
                        <div className="origin-badge-game" style={{ marginBottom: '12px' }}>{coffee.origin}</div>
                        <h3 style={{ fontSize: '20px', fontWeight: '400', margin: '0 0 6px 0', color: '#e8e0d5' }}>{coffee.name}</h3>
                        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '11px', color: '#908070', margin: '0 0 10px 0' }}>{coffee.region}</p>
                        <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#b4966e', margin: '0', lineHeight: '1.5' }}>{coffee.notes}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {gameStarted && !gameFinished && (
                <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <button 
                      onClick={() => {
                        setGameStarted(false);
                        setTempScores({});
                      }} 
                      style={{ background: 'none', border: 'none', color: '#b4966e', fontFamily: "'Outfit', sans-serif", fontSize: '12px', cursor: 'pointer' }}
                    >
                      ← Volver
                    </button>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '11px', color: '#908070' }}>
                      {Object.keys(tempScores).length} / {attributes.length}
                    </div>
                  </div>

                  <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '11px', letterSpacing: '3px', color: '#b4966e', textTransform: 'uppercase', marginBottom: '8px' }}>Catando</div>
                    <h2 style={{ fontSize: '28px', fontWeight: '400', margin: '0', color: '#e8e0d5' }}>{coffeeProfiles[currentCoffeeIndex].name}</h2>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '40px' }}>
                    {attributes.map((attr, idx) => (
                      <div 
                        key={attr} 
                        className={`progress-dot ${tempScores[attr] !== undefined ? 'completed' : ''}`}
                      />
                    ))}
                  </div>

                  <div style={{ display: 'grid', gap: '24px', marginBottom: '32px' }}>
                    {attributes.map((attr, i) => {
                      const descriptions = {
                        aroma: 'Los olores que percibes del café: primero en seco (fragancia) y después con agua caliente (aroma).',
                        sabor: 'Los gustos que percibes cuando el café toca tu lengua y paladar. Es la categoría más importante.',
                        acidez: 'La vivacidad, el "brillo" del café. No es acidez estomacal - es una cualidad positiva.',
                        finalizacion: 'El sabor que permanece en tu boca después de tragar.',
                        cuerpo: 'La sensación física del café en tu boca - su "peso" y textura.',
                        balance: 'Cómo trabajan juntos todos los elementos: acidez, dulzor, amargor, cuerpo.',
                        global: 'Tu impresión holística del café.',
                        uniformidad: 'La consistencia entre diferentes tazas de la misma muestra.',
                        dulzor: 'La presencia de dulzura natural en el café, sin añadir azúcar.',
                        limpieza: 'La ausencia de defectos o sabores extraños.'
                      };

                      return (
                        <div key={attr} style={{ background: 'linear-gradient(135deg, rgba(62,50,40,0.9) 0%, rgba(45,37,31,0.95) 100%)', border: '1px solid rgba(180,150,110,0.2)', borderRadius: '12px', padding: '24px' }}>
                          <h4 style={{ fontSize: '18px', fontWeight: '400', margin: '0 0 8px 0', color: '#e8e0d5' }}>{attrLabels[i]}</h4>
                          <p style={{ fontSize: '13px', fontStyle: 'italic', color: '#b4966e', margin: '0 0 20px 0' }}>{descriptions[attr]}</p>
                          
                          <div className="slider-track">
                            <div className="slider-line" />
                            {[6, 6.25, 6.5, 6.75, 7, 7.25, 7.5, 7.75, 8, 8.25, 8.5, 8.75, 9, 9.25, 9.5, 9.75, 10].map((step) => (
                              <div 
                                key={step} 
                                className={`slider-point ${tempScores[attr] === step ? 'active' : ''}`}
                                onClick={() => setTempScores({ ...tempScores, [attr]: step })}
                              />
                            ))}
                          </div>
                          {tempScores[attr] !== undefined && (
                            <div style={{ textAlign: 'center', marginTop: '12px', fontFamily: "'Outfit', sans-serif", fontSize: '14px', color: '#d4b896' }}>
                              Tu puntuación: <strong>{tempScores[attr]}</strong>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => {
                      userScores.push({ coffeeId: coffeeProfiles[currentCoffeeIndex].id, scores: { ...tempScores } });
                      setUserScores([...userScores]);
                      setGameFinished(true);
                    }}
                    disabled={Object.keys(tempScores).length < 10}
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: Object.keys(tempScores).length >= 10 ? 'linear-gradient(135deg, #b4966e, #8a7050)' : 'rgba(180,150,110,0.3)',
                      border: 'none',
                      color: Object.keys(tempScores).length >= 10 ? '#1a1612' : '#706050',
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '13px',
                      fontWeight: '500',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      cursor: Object.keys(tempScores).length >= 10 ? 'pointer' : 'not-allowed',
                      borderRadius: '4px',
                      transition: 'all 0.3s'
                    }}
                  >
                    {Object.keys(tempScores).length >= 10 ? 'Ver Resultados' : `Completa las ${10 - Object.keys(tempScores).length} categorías restantes`}
                  </button>
                </div>
              )}

              {gameFinished && (() => {
                const coffee = coffeeProfiles[currentCoffeeIndex];
                let totalDiff = 0;
                let count = 0;
                
                attributes.forEach(attr => {
                  const real = coffee.scaScores[attr];
                  const user = userScores[userScores.length - 1].scores[attr];
                  if (user !== undefined) {
                    totalDiff += Math.abs(real - user);
                    count++;
                  }
                });
                
                const precision = Math.round(Math.max(0, 100 - ((count > 0 ? totalDiff / count : 0) * 25)));

                return (
                  <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '11px', letterSpacing: '3px', color: '#b4966e', textTransform: 'uppercase', marginBottom: '8px' }}>Resultados</div>
                      <h2 style={{ fontSize: '32px', fontWeight: '400', margin: '0', color: '#e8e0d5' }}>{coffee.name}</h2>
                    </div>

                    <div style={{ width: '160px', height: '160px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(180,150,110,0.2), rgba(180,150,110,0.05))', border: '3px solid #b4966e', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px' }}>
                      <div style={{ fontSize: '48px', fontWeight: '300', color: '#d4b896' }}>{precision}%</div>
                      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '11px', letterSpacing: '2px', color: '#908070', textTransform: 'uppercase' }}>Precisión</div>
                    </div>

                    <p style={{ textAlign: 'center', fontSize: '18px', fontStyle: 'italic', color: '#b4966e', marginBottom: '40px' }}>
                      {precision >= 90 ? "¡Increíble! Tienes paladar de Q Grader" : precision >= 75 ? "¡Muy bien! Tu paladar está bien entrenado" : precision >= 60 ? "¡Buen trabajo! Vas por buen camino" : "Sigue practicando y explorando"}
                    </p>

                    <div style={{ background: 'linear-gradient(135deg, rgba(62,50,40,0.9) 0%, rgba(45,37,31,0.95) 100%)', border: '1px solid rgba(180,150,110,0.2)', borderRadius: '16px', padding: '24px', marginBottom: '30px' }}>
                      <div style={{ marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid rgba(180,150,110,0.2)' }}>
                        <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '12px', color: '#908070' }}>Comparativa de puntuaciones</span>
                      </div>
                      
                      {attributes.map((attr, i) => {
                        const userVal = userScores[userScores.length - 1].scores[attr];
                        const realVal = coffee.scaScores[attr];
                        const diff = Math.abs(userVal - realVal);
                        
                        return (
                          <div key={attr} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px 60px', gap: '12px', padding: '12px 0', borderBottom: '1px solid rgba(180,150,110,0.1)', alignItems: 'center' }}>
                            <span style={{ fontSize: '15px', color: '#c0b0a0' }}>{attrLabels[i]}</span>
                            <span style={{ textAlign: 'center', fontSize: '14px', color: '#e8e0d5' }}>{userVal}</span>
                            <span style={{ textAlign: 'center', fontSize: '14px', color: '#d4b896', fontWeight: '500' }}>{realVal}</span>
                            <span style={{ 
                              padding: '4px 8px', 
                              borderRadius: '4px', 
                              fontSize: '11px', 
                              textAlign: 'center',
                              background: diff === 0 ? 'rgba(100,180,100,0.2)' : diff <= 0.5 ? 'rgba(180,150,110,0.2)' : 'rgba(180,100,100,0.2)',
                              color: diff === 0 ? '#90c090' : diff <= 0.5 ? '#d4b896' : '#c09090'
                            }}>
                              {diff === 0 ? '✓' : `±${diff.toFixed(2)}`}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                      <button 
                        onClick={resetGame}
                        style={{ padding: '16px 40px', background: 'linear-gradient(135deg, #b4966e, #8a7050)', border: 'none', color: '#1a1612', fontFamily: "'Outfit', sans-serif", fontSize: '13px', fontWeight: '500', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer', borderRadius: '4px' }}
                      >
                        Catar Otro Café
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </section>
        )}

        {/* SECTION 3: PLAYLISTS */}
        {activeSection === 3 && (
          <section style={{ minHeight: '100vh', padding: '80px 24px', background: colors.cremaLight }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h2 style={{ fontFamily: "'STIX Two Text', serif", fontSize: '42px', color: colors.cafe, textAlign: 'center', marginBottom: '16px' }}>
                Bandas Sonoras del Café
              </h2>
              <p style={{ fontSize: '18px', color: colors.castano, textAlign: 'center', marginBottom: '60px' }}>
                Música para cada momento
              </p>

              {/* Community Playlist - Destacada */}
              <div style={{
                background: `linear-gradient(135deg, ${colors.cafe} 0%, ${colors.castano} 100%)`,
                borderRadius: '20px',
                padding: '48px',
                marginBottom: '60px',
                textAlign: 'center',
                color: colors.white,
                position: 'relative',
                overflow: 'hidden',
                boxShadow: `0 8px 32px ${colors.cafe}40`
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-50px',
                  right: '-50px',
                  width: '200px',
                  height: '200px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '50%'
                }}></div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ fontSize: '64px', marginBottom: '16px' }}></div>
                  <h3 style={{ fontFamily: "'STIX Two Text', serif", fontSize: '32px', marginBottom: '16px', fontWeight: 600 }}>
                    {playlistsData.community.title}
                  </h3>
                  <p style={{ fontSize: '18px', marginBottom: '32px', opacity: 0.9 }}>
                    Colaborativa - Añade tus canciones favoritas
                  </p>
                  <a href={playlistsData.community.url} target="_blank" rel="noopener noreferrer" style={{
                    display: 'inline-block',
                    background: colors.white,
                    color: colors.cafe,
                    padding: '16px 48px',
                    borderRadius: '30px',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '16px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 24px rgba(0,0,0,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
                  }}>
                    ▶ Abrir en Spotify
                  </a>
                </div>
              </div>

              {/* Momentos del día */}
              <div style={{ marginBottom: '60px' }}>
                <h3 style={{ fontFamily: "'STIX Two Text', serif", fontSize: '32px', color: colors.cafe, marginBottom: '32px', textAlign: 'center' }}>
                   Música por Momentos
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                  {playlistsData.times.map((p, i) => {
                    const bgColors = ['#FDB44B', '#F4845F', '#7C5295'];
                    return (
                      <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" style={{
                        background: colors.white,
                        borderRadius: '16px',
                        padding: '32px',
                        textDecoration: 'none',
                        color: 'inherit',
                        boxShadow: `0 4px 20px ${colors.cafe}10`,
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-8px)';
                        e.currentTarget.style.boxShadow = `0 12px 40px ${colors.cafe}20`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = `0 4px 20px ${colors.cafe}10`;
                      }}>
                        <div style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          width: '80px',
                          height: '80px',
                          background: bgColors[i] + '20',
                          borderRadius: '50%',
                          transform: 'translate(30%, -30%)'
                        }}></div>
                        <div style={{ position: 'relative' }}>
                          <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                            {i === 0 ? '' : i === 1 ? '🌤️' : '🌙'}
                          </div>
                          <h4 style={{ fontFamily: "'STIX Two Text', serif", fontSize: '22px', fontWeight: 600, marginBottom: '8px', color: colors.cafe }}>
                            {p.title}
                          </h4>
                          <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: colors.castano,
                            fontSize: '14px',
                            fontWeight: 600,
                            marginTop: '16px'
                          }}>
                            <span>Escuchar</span>
                            <span style={{ fontSize: '12px' }}>▶</span>
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Orígenes */}
              <div style={{ marginBottom: '60px' }}>
                <h3 style={{ fontFamily: "'STIX Two Text', serif", fontSize: '32px', color: colors.cafe, marginBottom: '32px', textAlign: 'center' }}>
                   Sonidos de Origen
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                  {playlistsData.origins.map((p, i) => {
                    const flags = ['🇧🇷', '🇨🇴', '🇪🇹', '🇲🇽'];
                    const bgGradients = [
                      'linear-gradient(135deg, #009B3A 0%, #FEDF00 100%)',
                      'linear-gradient(135deg, #FCD116 0%, #CE1126 50%, #003893 100%)',
                      'linear-gradient(135deg, #078930 0%, #FCDD09 50%, #DA121A 100%)',
                      'linear-gradient(135deg, #006847 0%, #FFFFFF 50%, #CE1126 100%)'
                    ];
                    return (
                      <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" style={{
                        background: colors.white,
                        borderRadius: '16px',
                        padding: '28px',
                        textDecoration: 'none',
                        color: 'inherit',
                        boxShadow: `0 4px 20px ${colors.cafe}10`,
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-6px)';
                        e.currentTarget.style.boxShadow = `0 10px 30px ${colors.cafe}20`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = `0 4px 20px ${colors.cafe}10`;
                      }}>
                        <div style={{ fontSize: '40px', marginBottom: '12px' }}>{flags[i]}</div>
                        <h4 style={{ fontFamily: "'STIX Two Text', serif", fontSize: '20px', fontWeight: 600, marginBottom: '6px', color: colors.cafe }}>
                          {p.country}
                        </h4>
                        <p style={{ fontSize: '14px', color: colors.castano, marginBottom: '12px' }}>{p.title}</p>
                        <div style={{
                          height: '4px',
                          background: bgGradients[i],
                          borderRadius: '2px',
                          marginTop: '16px'
                        }}></div>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Canciones sobre café */}
              <div>
                <h3 style={{ fontFamily: "'STIX Two Text', serif", fontSize: '32px', color: colors.cafe, marginBottom: '32px', textAlign: 'center' }}>
                   Canciones sobre Café
                </h3>
                <div style={{ background: colors.white, borderRadius: '16px', padding: '32px', boxShadow: `0 4px 20px ${colors.cafe}10` }}>
                  {playlistsData.about.map((s, i) => (
                    <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '20px',
                      borderBottom: i < playlistsData.about.length - 1 ? `1px solid ${colors.crema}` : 'none',
                      textDecoration: 'none',
                      color: colors.text,
                      borderRadius: '8px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = colors.cremaLight;
                      e.currentTarget.style.paddingLeft = '24px';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.paddingLeft = '20px';
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          background: `linear-gradient(135deg, ${colors.castano} 0%, ${colors.cafe} 100%)`,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: colors.white,
                          fontSize: '20px',
                          fontWeight: 600
                        }}>
                          {i + 1}
                        </div>
                        <span style={{ fontSize: '16px', fontWeight: 500 }}>{s.title}</span>
                      </div>
                      <div style={{ color: colors.castano, fontSize: '20px' }}>▶</div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 4: BIBLIOTECA */}
        {activeSection === 4 && (
          <section style={{ minHeight: '100vh', padding: '80px 24px', background: colors.white }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h2 style={{ fontFamily: "'STIX Two Text', serif", fontSize: '42px', color: colors.cafe, textAlign: 'center', marginBottom: '16px' }}>
                Biblioteca del Café
              </h2>
              <p style={{ fontSize: '18px', color: colors.castano, textAlign: 'center', marginBottom: '60px' }}>
                Libros imprescindibles para amantes del café
              </p>

              {[
                { key: 'esenciales', title: 'Esenciales', icon: '⭐' },
                { key: 'brewing', title: 'Preparación', icon: '' },
                { key: 'historia', title: 'Historia & Cultura', icon: '📖' },
                { key: 'avanzado', title: 'Avanzado', icon: '🎓' }
              ].map((cat, idx) => (
                <div key={idx} style={{ marginBottom: '48px' }}>
                  <h3 style={{ fontFamily: "'STIX Two Text', serif", fontSize: '28px', color: colors.cafe, marginBottom: '24px' }}>
                    {cat.icon} {cat.title}
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                    {booksData[cat.key].map((book, i) => (
                      <a key={i} href={book.url} target="_blank" rel="noopener noreferrer" style={{
                        background: colors.cremaLight, borderRadius: '12px', padding: '24px',
                        textDecoration: 'none', color: 'inherit', display: 'block',
                        transition: 'transform 0.2s ease', cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                        <h4 style={{ fontSize: '18px', fontWeight: 600, color: colors.cafe, marginBottom: '8px' }}>
                          {book.title}
                          {book.provisional && <span style={{ color: '#FF6B35', fontSize: '11px', marginLeft: '8px' }}>(PROVISIONAL)</span>}
                        </h4>
                        <p style={{ fontSize: '14px', color: colors.castano, marginBottom: '4px' }}>
                          {book.author} · {book.year}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              ))}

              <div style={{ marginTop: '48px', padding: '24px', background: colors.crema, borderRadius: '12px', textAlign: 'center' }}>
                <p style={{ fontSize: '14px', fontStyle: 'italic', margin: 0 }}>
                  Enlaces de afiliados de Amazon - Los precios correctos se actualizarán próximamente
                </p>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 5: APRENDIZAJE */}
        {activeSection === 5 && (
          <section style={{ minHeight: '100vh', padding: '80px 24px', background: colors.cremaLight }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h2 style={{ fontFamily: "'STIX Two Text', serif", fontSize: '42px', color: colors.cafe, textAlign: 'center', marginBottom: '16px' }}>
                Recursos Gratuitos
              </h2>
              <p style={{ fontSize: '18px', color: colors.castano, textAlign: 'center', marginBottom: '60px' }}>
                Aprende sobre café de especialidad
              </p>

              {/* YouTube */}
              <div style={{ marginBottom: '48px' }}>
                <h3 style={{ fontFamily: "'STIX Two Text', serif", fontSize: '28px', color: colors.cafe, marginBottom: '24px' }}>
                   Canales de YouTube
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                  {learnData.youtube.map((ch, i) => (
                    <a key={i} href={ch.url} target="_blank" rel="noopener noreferrer" style={{
                      background: colors.white, borderRadius: '12px', padding: '24px',
                      textDecoration: 'none', color: 'inherit', display: 'block'
                    }}>
                      <h4 style={{ fontSize: '18px', fontWeight: 600, color: colors.cafe, marginBottom: '8px' }}>
                        {ch.name}
                      </h4>
                      <p style={{ fontSize: '14px', color: colors.text, margin: 0 }}>{ch.desc}</p>
                    </a>
                  ))}
                </div>
              </div>

              {/* Artículos */}
              <div style={{ marginBottom: '48px' }}>
                <h3 style={{ fontFamily: "'STIX Two Text', serif", fontSize: '28px', color: colors.cafe, marginBottom: '24px' }}>
                   Artículos y Publicaciones
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                  {learnData.articulos.map((art, i) => (
                    <a key={i} href={art.url} target="_blank" rel="noopener noreferrer" style={{
                      background: colors.white, borderRadius: '12px', padding: '24px',
                      textDecoration: 'none', color: 'inherit', display: 'block'
                    }}>
                      <h4 style={{ fontSize: '18px', fontWeight: 600, color: colors.cafe, marginBottom: '8px' }}>
                        {art.name}
                      </h4>
                      <p style={{ fontSize: '14px', color: colors.text, margin: 0 }}>{art.desc}</p>
                    </a>
                  ))}
                </div>
              </div>

              {/* Herramientas */}
              <div>
                <h3 style={{ fontFamily: "'STIX Two Text', serif", fontSize: '28px', color: colors.cafe, marginBottom: '24px' }}>
                   Herramientas
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                  {learnData.herramientas.map((tool, i) => (
                    <a key={i} href={tool.url} target="_blank" rel="noopener noreferrer" style={{
                      background: colors.white, borderRadius: '12px', padding: '24px',
                      textDecoration: 'none', color: 'inherit', display: 'block'
                    }}>
                      <h4 style={{ fontSize: '18px', fontWeight: 600, color: colors.cafe, marginBottom: '8px' }}>
                        {tool.name}
                      </h4>
                      <p style={{ fontSize: '14px', color: colors.text, margin: 0 }}>{tool.desc}</p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 6: COMUNIDAD */}
        {activeSection === 6 && (
          <section style={{ minHeight: '100vh', padding: '80px 24px', background: colors.white }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
              <h2 style={{ fontFamily: "'STIX Two Text', serif", fontSize: '42px', color: colors.cafe, marginBottom: '16px' }}>
                Comunidad Tueste
              </h2>
              <p style={{ fontSize: '18px', color: colors.castano, marginBottom: '60px' }}>
                Conecta con otros amantes del café
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginBottom: '60px' }}>
                {/* Telegram ES */}
                <div style={{ background: colors.cremaLight, borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}></div>
                  <h3 style={{ fontSize: '22px', color: colors.cafe, marginBottom: '16px' }}>
                    {communityData.telegram.es.name}
                    {communityData.telegram.es.provisional && <div style={{ color: '#FF6B35', fontSize: '11px', marginTop: '4px' }}>(PROVISIONAL)</div>}
                  </h3>
                  <a href={communityData.telegram.es.url} target="_blank" rel="noopener noreferrer" style={{
                    display: 'inline-block', background: colors.cafe, color: colors.white, padding: '12px 32px',
                    borderRadius: '24px', textDecoration: 'none', fontWeight: 600
                  }}>
                    Unirse
                  </a>
                </div>

                {/* Telegram EN */}
                <div style={{ background: colors.cremaLight, borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}></div>
                  <h3 style={{ fontSize: '22px', color: colors.cafe, marginBottom: '16px' }}>
                    {communityData.telegram.en.name}
                    {communityData.telegram.en.provisional && <div style={{ color: '#FF6B35', fontSize: '11px', marginTop: '4px' }}>(PROVISIONAL)</div>}
                  </h3>
                  <a href={communityData.telegram.en.url} target="_blank" rel="noopener noreferrer" style={{
                    display: 'inline-block', background: colors.cafe, color: colors.white, padding: '12px 32px',
                    borderRadius: '24px', textDecoration: 'none', fontWeight: 600
                  }}>
                    Join
                  </a>
                </div>

                {/* Instagram */}
                <div style={{ background: colors.cremaLight, borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}></div>
                  <h3 style={{ fontSize: '22px', color: colors.cafe, marginBottom: '16px' }}>Instagram</h3>
                  <a href={communityData.social.instagram.url} target="_blank" rel="noopener noreferrer" style={{
                    display: 'inline-block', background: colors.cafe, color: colors.white, padding: '12px 32px',
                    borderRadius: '24px', textDecoration: 'none', fontWeight: 600
                  }}>
                    {communityData.social.instagram.name}
                  </a>
                </div>

                {/* Google Maps */}
                <div style={{ background: colors.cremaLight, borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}></div>
                  <h3 style={{ fontSize: '22px', color: colors.cafe, marginBottom: '16px' }}>
                    Encuéntranos
                    {communityData.social.google.provisional && <div style={{ color: '#FF6B35', fontSize: '11px', marginTop: '4px' }}>(PROVISIONAL)</div>}
                  </h3>
                  <a href={communityData.social.google.url} target="_blank" rel="noopener noreferrer" style={{
                    display: 'inline-block', background: colors.cafe, color: colors.white, padding: '12px 32px',
                    borderRadius: '24px', textDecoration: 'none', fontWeight: 600
                  }}>
                    Ver en Google Maps
                  </a>
                </div>

                {/* Newsletter */}
                <div style={{ background: colors.cremaLight, borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}></div>
                  <h3 style={{ fontSize: '22px', color: colors.cafe, marginBottom: '16px' }}>Newsletter</h3>
                  <input type="email" placeholder="tu@email.com" style={{
                    width: '100%', padding: '12px', borderRadius: '8px', border: `2px solid ${colors.castano}40`,
                    marginBottom: '16px', fontSize: '15px'
                  }} />
                  <button style={{
                    background: colors.cafe, color: colors.white, border: 'none', padding: '12px 32px',
                    borderRadius: '24px', fontWeight: 600, cursor: 'pointer'
                  }}>
                    Suscribirse
                  </button>
                </div>

                {/* Eventos */}
                <div style={{ background: colors.cremaLight, borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}></div>
                  <h3 style={{ fontSize: '22px', color: colors.cafe, marginBottom: '16px' }}>Eventos</h3>
                  <button style={{
                    background: colors.cafe, color: colors.white, border: 'none', padding: '12px 32px',
                    borderRadius: '24px', fontWeight: 600, cursor: 'pointer'
                  }}>
                    Ver Calendario
                  </button>
                </div>
              </div>

              <div style={{ background: colors.cremaLight, borderRadius: '16px', padding: '40px' }}>
                <h3 style={{ fontSize: '26px', color: colors.cafe, marginBottom: '24px' }}>Visítanos</h3>
                <p style={{ fontSize: '16px', marginBottom: '8px' }}> Calle Deanes 1, Córdoba</p>
                <p style={{ fontSize: '16px', marginBottom: '8px' }}>📞 +34 XXX XXX XXX</p>
                <p style={{ fontSize: '16px' }}> hola@tuestespecialtycoffee.com</p>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer style={{ background: colors.cafe, color: colors.white, padding: '60px 24px 40px', textAlign: 'center' }}>
        <div style={{ marginBottom: '24px' }}>
          <TuesteLogo size="md" color="white" />
        </div>
        <p style={{ fontSize: '14px', opacity: 0.8, marginTop: '24px' }}>
          © 2026 Tueste Specialty Coffee · Córdoba, España
        </p>
        <p style={{ fontSize: '13px', opacity: 0.6, marginTop: '8px' }}>
          Calle Deanes 1 · +34 XXX XXX XXX · hola@tuestespecialtycoffee.com
        </p>
      </footer>
    </div>
  );
}
