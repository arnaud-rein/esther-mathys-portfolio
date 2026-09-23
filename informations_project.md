# Esther Mathys — Portfolio d'architecture d'intérieur

Site vitrine élégant, inspiré de l'esthétique **Chanel** (noir, ivoire, or).
Aucun outil, aucune compilation : **HTML / CSS / JavaScript pur** → parfait pour
un déploiement immédiat sur **GitHub Pages**.

---

## 🗂️ Structure des fichiers

```
Esther_portfolio/
├── index.html          ← la page (structure)
├── css/
│   └── styles.css      ← tout le style / le design
├── js/
│   ├── data.js         ← ⭐ LE FICHIER À MODIFIER (contenu : contact, services, projets)
│   └── main.js         ← les animations et interactions (à ne pas toucher)
└── assets/
    └── images/         ← dépose ici tes vraies photos
```

> 👉 **Pour changer le contenu, tu n'as qu'un seul fichier à ouvrir : `js/data.js`.**
> Tout y est commenté en français.

---

## ▶️ Lancer le site en local (sur ton ordi)

Le plus simple : **double-clique sur `index.html`**, il s'ouvre dans ton navigateur. C'est tout.

Pour un rendu 100 % identique à la version en ligne (recommandé), lance un petit
serveur local depuis le dossier du projet :

**Avec Python** (déjà installé sur beaucoup de PC) :
```bash
python -m http.server 8000
```
Puis ouvre ton navigateur sur **http://localhost:8000**

**Avec Node.js** (si tu l'as) :
```bash
npx serve
```

**Avec VS Code** : installe l'extension *Live Server*, clic droit sur `index.html`
→ « Open with Live Server ».

---

## ✏️ Modifier le contenu

Ouvre **`js/data.js`** :

- **Coordonnées / réseaux** → section `SITE` (email, téléphone, ville, Instagram…)
- **Prestations** → section `SERVICES`
- **Réalisations (galerie)** → section `PROJECTS`
- **Croquis & plans** → section `SKETCHES`
- **Logiciels & outils** (AutoCAD, Photoshop, Midjourney…) → section `TOOLS` (le `level` règle la barre dorée de maîtrise)
- **Vidéo de présentation** → section `VIDEO` (YouTube ou fichier local — voir `assets/video/`)
- **Carte des architectes de Lille** → sections `MAP` (centre/zoom) et `LANDMARKS` (les lieux)

**Ajouter un projet, un croquis ou un lieu** : copie un bloc `{ ... }` entier, colle-le,
change les valeurs. Les catégories créent automatiquement les **filtres** de la galerie.

> 📍 **Coordonnées d'un lieu** : sur Google Maps, clic droit sur le point → clique sur
> les chiffres « latitude, longitude » (ça les copie). ⚠️ Dans `data.js`, l'ordre est
> **`lng` puis `lat`** (longitude d'abord).

### Les sections du site
Accueil · À propos · Services · **Approche & IA** · Réalisations · **Croquis & plans**
· Processus · **Outils & logiciels** · **Vidéo** · **Carte 3D de Lille** · Témoignages · Contact.

### 🗺️ La carte (technique)
Carte **100 % gratuite, sans clé ni compte** : [MapLibre GL JS](https://maplibre.org/)
(open-source) + tuiles vectorielles [OpenFreeMap](https://openfreemap.org/).
Elle se **charge à la demande** (seulement quand on scrolle jusqu'à elle) → aucun
ralentissement au démarrage du site. Bouton **Vue 2D / Vue 3D** pour incliner la carte
et afficher les bâtiments en relief. Rien à installer.

**Mettre tes propres photos** : dépose-les dans `assets/images/`, puis dans `data.js`
mets par exemple `image: "assets/images/mon-projet.jpg"`.
Si une image ne charge pas, le site affiche automatiquement un joli fond doré avec le
titre du projet (pas d'image cassée).

---

## 🚀 Mettre le site en ligne avec GitHub Pages (gratuit)

1. Crée un compte sur **github.com** (si ce n'est pas déjà fait).
2. Crée un nouveau dépôt (**New repository**), par ex. `portfolio` → *Public*.
3. Envoie les fichiers du projet dans le dépôt :
   - **Le plus simple** : bouton *« Add file » → « Upload files »*, glisse-dépose
     **tout le contenu** du dossier `Esther_portfolio` (le fichier `index.html`
     doit être à la racine), puis *Commit*.
   - **En ligne de commande** :
     ```bash
     git init
     git add .
     git commit -m "Portfolio Esther Mathys"
     git branch -M main
     git remote add origin https://github.com/TON-PSEUDO/portfolio.git
     git push -u origin main
     ```
4. Sur GitHub : **Settings → Pages**.
5. Dans *« Build and deployment »*, source = **Deploy from a branch**,
   branche = **main**, dossier = **/ (root)**, puis *Save*.
6. Patiente ~1 minute : ton site est en ligne à l'adresse
   **`https://TON-PSEUDO.github.io/portfolio/`** 🎉

À chaque modification, réenvoie les fichiers (ou `git push`) et le site se met à jour tout seul.

> **Astuce nom de domaine** : tu peux plus tard brancher un vrai domaine
> (ex. `esthermathys.com`) via *Settings → Pages → Custom domain*.

---

## 🎨 Personnaliser les couleurs / polices (optionnel)

Tout est centralisé en haut de **`css/styles.css`**, dans le bloc `:root` :

```css
--noir:   #0b0b0b;   /* noir profond   */
--ivoire: #f7f3ec;   /* blanc cassé    */
--or:     #c2a05b;   /* or champagne   */
```

Change une valeur, et toute la charte se met à jour.
Polices utilisées : **Cormorant Garamond** (titres) & **Jost** (textes).

---

Réalisé avec ❤️ — élégance, simplicité, zéro prise de tête.
# esther-mathys-portfolio
