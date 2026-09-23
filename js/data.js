/* =========================================================
   DONNÉES DU SITE — LE SEUL FICHIER À MODIFIER AU QUOTIDIEN
   ---------------------------------------------------------
   Ici tu peux tout changer sans toucher au design :
     • SITE      → coordonnées, réseaux sociaux
     • SERVICES  → les prestations proposées
     • PROJECTS  → les réalisations de la galerie

   Pour AJOUTER un projet : copie un bloc { ... } complet,
   colle-le, puis change les valeurs. Sépare chaque bloc
   par une virgule. C'est tout !
   ========================================================= */

/* ---------- 1. COORDONNÉES & RÉSEAUX ---------- */
const SITE = {
  name:     "Esther Mathys",
  role:     "Architecte d'intérieur",
  email:    "contact@esthermathys.com",   // ← remplace par ton vrai email
  phone:    "+33 6 12 34 56 78",          // ← ton téléphone
  city:     "Paris — France",             // ← ta ville / zone d'intervention

  // Réseaux sociaux (mets "" pour masquer un lien)
  socials: [
    { label: "Instagram", url: "https://instagram.com/" },
    { label: "Pinterest", url: "https://pinterest.com/" },
    { label: "LinkedIn",  url: "https://linkedin.com/" }
  ]
};

/* ---------- 2. SERVICES / PRESTATIONS ---------- */
const SERVICES = [
  {
    title: "Architecture d'intérieur",
    text:  "Conception globale et repensée de vos espaces : plans, circulation, volumes et lumière pour révéler tout le potentiel du lieu."
  },
  {
    title: "Décoration & agencement",
    text:  "Sélection du mobilier, des matières et des couleurs. Une mise en scène raffinée où chaque objet trouve sa juste place."
  },
  {
    title: "Home staging",
    text:  "Valoriser un bien avant une vente ou une location. Un relooking stratégique qui déclenche le coup de cœur."
  },
  {
    title: "Conseil & accompagnement",
    text:  "Consultation ponctuelle, planches d'ambiance, shopping-list et suivi de chantier. À la carte, selon vos besoins."
  }
];

/* ---------- 3. RÉALISATIONS (GALERIE) ----------
   Champs disponibles pour chaque projet :
     title      : nom du projet
     category   : catégorie (sert aussi de filtre) —
                  garde les mêmes libellés pour regrouper
     year       : année
     location   : lieu
     image      : URL de la photo (ou "assets/images/mon-image.jpg")
     description: texte affiché dans la fenêtre agrandie
   ------------------------------------------------ */
const PROJECTS = [
  {
    title:       "Appartement Haussmannien",
    category:    "Résidentiel",
    year:        "2024",
    location:    "Paris 8e",
    image:       "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
    description: "Rénovation complète de 140 m² : moulures d'origine préservées, palette ivoire et laiton, mobilier chiné et pièces sur-mesure pour une élégance parisienne intemporelle."
  },
  {
    title:       "Suite Hôtelière",
    category:    "Hôtellerie",
    year:        "2024",
    location:    "Deauville",
    image:       "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
    description: "Une suite pensée comme un écrin : velours profonds, marbre veiné et éclairages tamisés pour une expérience hôtelière feutrée et luxueuse."
  },
  {
    title:       "Villa Contemporaine",
    category:    "Résidentiel",
    year:        "2023",
    location:    "Bordeaux",
    image:       "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    description: "Espaces ouverts baignés de lumière, matières naturelles et lignes épurées. Un dialogue subtil entre confort familial et sophistication."
  },
  {
    title:       "Boutique Maison Lauren",
    category:    "Commercial",
    year:        "2023",
    location:    "Lyon",
    image:       "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    description: "Agencement d'une boutique de prêt-à-porter : parcours client soigné, présentoirs en laiton brossé et jeux de miroirs pour sublimer les collections."
  },
  {
    title:       "Loft Industriel",
    category:    "Rénovation",
    year:        "2023",
    location:    "Paris 11e",
    image:       "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    description: "Transformation d'un ancien atelier en loft raffiné : verrières, béton ciré et touches dorées pour adoucir le brut et créer un cocon chic."
  },
  {
    title:       "Chambre Parentale",
    category:    "Résidentiel",
    year:        "2022",
    location:    "Neuilly-sur-Seine",
    image:       "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
    description: "Une chambre-suite enveloppante : tête de lit capitonnée, textiles nobles et dressing sur-mesure. Le raffinement au service du repos."
  },
  {
    title:       "Salle à Manger d'Exception",
    category:    "Résidentiel",
    year:        "2022",
    location:    "Cannes",
    image:       "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1200&q=80",
    description: "Réception grand format : table en marbre, suspensions sculpturales et boiseries claires. Un lieu conçu pour recevoir avec panache."
  },
  {
    title:       "Espace Bien-être & Spa",
    category:    "Commercial",
    year:        "2022",
    location:    "Annecy",
    image:       "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80",
    description: "Un spa privatif tout en sérénité : pierres naturelles, éclairage indirect et palette apaisante. L'art du luxe discret et du ressourcement."
  }
];

/* ---------- 4. CROQUIS & PLANS ----------
   Même principe que PROJECTS. « type » sert de petit label.
   Astuce : si tu n'as pas encore d'image, laisse l'URL —
   le site affichera automatiquement une jolie fiche « papier »
   avec le titre du croquis.
   ----------------------------------------- */
const SKETCHES = [
  {
    title:       "Plan d'aménagement",
    type:        "Plan technique",
    image:       "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1100&q=80",
    description: "Plan côté d'un appartement : optimisation des circulations, des rangements et de la lumière naturelle avant toute décision décorative."
  },
  {
    title:       "Croquis d'ambiance",
    type:        "Dessin à main levée",
    image:       "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1100&q=80",
    description: "Première intention dessinée à la main : poser une atmosphère, un volume, une émotion en quelques traits avant de passer à la modélisation."
  },
  {
    title:       "Perspective 3D",
    type:        "Rendu",
    image:       "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1100&q=80",
    description: "Vue perspective réaliste : matières, éclairages et mobilier sont testés virtuellement pour valider le projet avant le chantier."
  },
  {
    title:       "Planche matières & couleurs",
    type:        "Moodboard",
    image:       "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1100&q=80",
    description: "Sélection des textiles, finitions et nuances. La planche d'ambiance garantit une harmonie parfaite du sol au plafond."
  },
  {
    title:       "Élévation & détails",
    type:        "Plan technique",
    image:       "https://images.unsplash.com/photo-1461344577544-4e5dc9487184?auto=format&fit=crop&w=1100&q=80",
    description: "Élévations et coupes de détail : chaque menuiserie sur-mesure est dessinée au millimètre pour les artisans."
  },
  {
    title:       "Exploration par IA",
    type:        "Recherche générative",
    image:       "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1100&q=80",
    description: "Variations d'ambiances générées par intelligence artificielle, point de départ créatif ensuite affiné à la main et à l'œil expert."
  }
];

/* ---------- 5. OUTILS & LOGICIELS ----------
   name  : nom du logiciel
   role  : à quoi il sert
   level : niveau de maîtrise en % (barre dorée)
   -------------------------------------------- */
const TOOLS = [
  { name: "AutoCAD",          role: "Plans & dessin technique",     level: 95 },
  { name: "SketchUp",         role: "Modélisation 3D",              level: 92 },
  { name: "3ds Max + V-Ray",  role: "Rendus photoréalistes",        level: 85 },
  { name: "Photoshop",        role: "Retouche & planches",          level: 90 },
  { name: "Illustrator",      role: "Dessin vectoriel",             level: 82 },
  { name: "InDesign",         role: "Books & mise en page",         level: 80 },
  { name: "Midjourney",       role: "IA générative d'ambiances",    level: 88 },
  { name: "Revit",            role: "BIM & maquette numérique",     level: 75 }
];

/* ---------- 6. VIDÉO DE PRÉSENTATION ----------
   Deux options (au choix) :
   • YouTube  → mets l'identifiant de la vidéo dans "youtubeId"
                (ex : dans youtube.com/watch?v=ABC123, l'ID est "ABC123")
   • Fichier  → dépose une vidéo dans assets/video/ et indique son
                chemin dans "file" (laisse "youtubeId" vide)
   "poster" = image affichée avant la lecture.
   ----------------------------------------------- */
const VIDEO = {
  youtubeId: "",                                     // ← ex : "dQw4w9WgXcQ"
  file:      "assets/video/presentation-esther.mp4", // ← ou une vidéo locale
  poster:    "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1600&q=80"
};

/* ---------- 7. CARTE — INTÉRIEURS REMARQUABLES DE LILLE ----------
   Carte gratuite (MapLibre GL JS + tuiles OpenFreeMap),
   visible en 2D et en 3D. Aucune clé, aucun compte requis.

   • MAP        : centrage & zoom de départ
   • LANDMARKS  : les lieux d'architecture d'intérieur à explorer

   Champs d'un lieu :
     name        : nom du lieu
     architect   : architecte / designer d'intérieur
     year        : année
     style       : style ou nature de l'intérieur
     description : le texte affiché dans la popup au clic
     image       : photo de l'intérieur (URL ou "assets/images/xxx.jpg")
     lng, lat    : coordonnées (⚠️ longitude PUIS latitude)

   Astuce coordonnées : sur Google Maps, clic droit sur le point →
   clique sur « lat, lng » pour les copier (puis inverse l'ordre ici).
   Les images sont des visuels d'ambiance à remplacer par de vraies
   photos ; si une image ne charge pas, un fond dégradé élégant s'affiche.
   ----------------------------------------------------------------- */
const MAP = {
  center: [3.0670, 50.6340],  // [longitude, latitude] — cœur de Lille
  zoom:   12.6,
  style:  "https://tiles.openfreemap.org/styles/liberty"
};

const LANDMARKS = [
  {
    name: "Villa Cavrois", architect: "Robert Mallet-Stevens", year: "1932", style: "Modernisme — intérieur total",
    description: "Chef-d'œuvre de l'architecture d'intérieur moderniste : Mallet-Stevens y dessine tout, du mobilier aux luminaires, pour une harmonie absolue de volumes, de lumière et de matières nobles.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    lng: 3.1519, lat: 50.6773
  },
  {
    name: "La Piscine (Roubaix)", architect: "Albert Baert · musée : Jean-Paul Philippon", year: "1932", style: "Art déco — reconversion",
    description: "Une piscine Art déco métamorphosée en musée : sous la verrière solaire et les mosaïques, les œuvres se reflètent dans le bassin. Une reconversion intérieure devenue culte.",
    image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80",
    lng: 3.1808, lat: 50.6906
  },
  {
    name: "Opéra de Lille", architect: "Louis-Marie Cordonnier", year: "1923", style: "Décor néo-classique",
    description: "Derrière la façade, un grand foyer à l'italienne : marbres, dorures, lustres et escalier d'apparat — l'art décoratif lillois dans toute sa splendeur.",
    image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1200&q=80",
    lng: 3.0648, lat: 50.6380
  },
  {
    name: "L'Hermitage Gantois", architect: "Rénovation : agence MAES", year: "XVe → 2003", style: "Hôtel 5★ — patrimoine & design",
    description: "Un hospice du XVe siècle devenu hôtel de luxe : l'intérieur marie boiseries Louis XV, taffetas de soie et pièces design (chaises Lucite de Philippe Starck). Patrimoine et contemporain en dialogue.",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
    lng: 3.0673, lat: 50.6300
  },
  {
    name: "Clarance Hôtel", architect: "Hôtel particulier du XVIIIe", year: "2015", style: "Boutique-hôtel raffiné",
    description: "Niché dans un hôtel particulier du XVIIIe, ce boutique-hôtel de 27 chambres joue les teintes pastel, les matières nobles, le mobilier ancien et les œuvres choisies. Le raffinement sur-mesure.",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
    lng: 3.0596, lat: 50.6402
  },
  {
    name: "Vieille Bourse", architect: "Julien Destrée", year: "1653", style: "Renaissance flamande",
    description: "Sa cour intérieure ciselée : bois sculptés, cartouches dorés et arcades. Un écrin Renaissance flamande, aujourd'hui repaire des bouquinistes.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    lng: 3.0637, lat: 50.6372
  },
  {
    name: "Maison Coilliot", architect: "Hector Guimard", year: "1900", style: "Art nouveau",
    description: "L'unique réalisation lilloise de Guimard : lave émaillée, ferronneries organiques et boiseries — l'Art nouveau jusque dans le moindre détail intérieur.",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80",
    lng: 3.0577, lat: 50.6259
  },
  {
    name: "Palais des Beaux-Arts", architect: "Rénovation : Ibos & Vitart", year: "1892 · 1997", style: "Galeries & escalier monumental",
    description: "Escalier monumental, verrières et enfilades de galeries : un décor intérieur du XIXe sublimé par la rénovation contemporaine d'Ibos & Vitart.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
    lng: 3.0626, lat: 50.6304
  },
  {
    name: "Gare Saint-Sauveur", architect: "Reconversion culturelle", year: "2009", style: "Industriel-chic",
    description: "Ancienne gare de marchandises reconvertie en lieu culturel : charpentes, béton et volumes bruts habillés avec justesse. Tout l'esprit industriel-chic.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    lng: 3.0723, lat: 50.6270
  },
  {
    name: "L'Huîtrière", architect: "Décor Art déco", year: "1928", style: "Restaurant — mosaïques",
    description: "Écrin Art déco du Vieux-Lille : mosaïques marines, céramiques et boiseries précieuses. L'un des plus beaux décors de restaurant de la ville.",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80",
    lng: 3.0648, lat: 50.6392
  },
  {
    name: "Le Tripostal", architect: "Reconversion post-industrielle", year: "2009", style: "Lieu d'expositions",
    description: "L'ancien centre de tri postal transformé en scène d'expositions : béton, structures apparentes et grands plateaux modulables. La beauté du post-industriel.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    lng: 3.0736, lat: 50.6378
  },
  {
    name: "Hôtel de Ville de Lille", architect: "Émile Dubuisson", year: "1932", style: "Hall Art déco",
    description: "Un hall Art déco monumental en béton, rythmé de piliers — prouesse intérieure sous le plus haut beffroi civil de France.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    lng: 3.0731, lat: 50.6262
  }
];
