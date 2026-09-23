/* =========================================================
   DONNÉES DU SITE — LE SEUL FICHIER À MODIFIER AU QUOTIDIEN
   ---------------------------------------------------------
   Ici tu peux tout changer sans toucher au design :
     • SITE     → coordonnées, réseaux sociaux, envoi du formulaire
     • GALLERY  → les images de tes réalisations
     • TOOLS    → tes logiciels & outils

   Pour AJOUTER une image : copie une ligne { ... } complète,
   colle-la, puis change les valeurs. Sépare chaque ligne
   par une virgule. C'est tout !
   ========================================================= */

/* ---------- 1. COORDONNÉES & RÉSEAUX ---------- */
const SITE = {
  name: "Esther Mathys",
  role: "Architecture d'intérieur",
  email: "esthermathys57@gmail.com",
  phone: "06 14 37 07 57",
  city: "Lille — France",

  // Réseaux sociaux (mets "" pour masquer un lien).
  // ⚠️ Remplace les "" par tes vraies adresses quand tu les as.
  socials: [
    { label: "Instagram", url: "" },
    { label: "LinkedIn", url: "" }
  ],

  /* ✉️ ENVOI DES E-MAILS — via la librairie EmailJS (https://www.emailjs.com).
     Le message part DIRECTEMENT dans ta boîte mail, sans serveur et sans
     ouvrir de logiciel de messagerie. À configurer une seule fois :
       1) Crée un compte gratuit sur emailjs.com
       2) « Email Services » → connecte ton Gmail / Outlook → copie le SERVICE ID
       3) « Email Templates » → crée un modèle qui utilise les variables
          {{name}}, {{email}}, {{subject}}, {{message}} → copie le TEMPLATE ID
       4) « Account » → copie ta PUBLIC KEY
       5) Colle les 3 valeurs ci-dessous (entre les guillemets).
     Tant que les 3 champs sont vides, repli automatique (rien ne casse). */
  emailjs: {
    publicKey: "T8tUkXObPsZp_txln",   // Account → General → Public Key
    serviceId: "service_kop10jb",   // Email Services → Service ID
    templateId: "template_jujfj9m"    // Email Templates → Template ID
  }
};

/* ---------- 2. RÉALISATIONS (GALERIE) ----------
   Pour l'instant, une simple galerie : chaque image s'affiche dans
   la grille et s'agrandit au clic (avec les flèches ← → pour naviguer).
     image   : URL de la photo (ou "assets/images/mon-image.jpg")
     caption : petite légende (facultatif)
   Ces 4 images viennent du projet « Habitat extension ».
   Ajoute autant d'images que tu veux, séparées par une virgule.
   ------------------------------------------------ */
const GALLERY = [
  {
    image: "https://res.cloudinary.com/de3xvrrq5/image/upload/v1790196758/plan_maison_gris_bois_plantes_kfp1ee.webp",
    caption: "Habitat extension — plan"
  },
  {
    image: "https://res.cloudinary.com/de3xvrrq5/image/upload/v1790196758/cascade_rlskgz.webp",
    caption: "Habitat extension — perspective"
  },
  {
    image: "https://res.cloudinary.com/de3xvrrq5/image/upload/v1790196758/crayon_plan_qqdhkn.webp",
    caption: "Habitat extension — croquis"
  },
  {
    image: "https://res.cloudinary.com/de3xvrrq5/image/upload/v1790196758/crayon_plan_2_fmokun.webp",
    caption: "Habitat extension — croquis"
  }
];

/* ---------- 3. OUTILS & LOGICIELS ----------
   name  : nom du logiciel
   role  : à quoi il sert
   level : niveau de maîtrise en % (barre dorée)
   logo  : (facultatif) URL du logo (ou "assets/images/mon-logo.png").
           Sans logo, la carte s'affiche simplement sans image.
   -------------------------------------------- */
const TOOLS = [
  { name: "AutoCAD", role: "Plans & dessin technique", level: 65, logo: "https://res.cloudinary.com/de3xvrrq5/image/upload/v1790202325/autocad_bk1brp.webp" },
  { name: "Photoshop", role: "Retouche & planches d'ambiance", level: 75, logo: "https://res.cloudinary.com/de3xvrrq5/image/upload/v1790202325/Adobe_Photoshop_CC_icon.svg_mpg0vc.webp" },
  { name: "Illustrator", role: "Dessin vectoriel & mise en page", level: 70, logo: "https://res.cloudinary.com/de3xvrrq5/image/upload/v1790202325/illustrator_logo_xgl7x4.webp" },
  // { name: "Pack Office", role: "Word · Excel · PowerPoint", level: 90 }
];
