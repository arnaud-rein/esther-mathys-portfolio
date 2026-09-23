/* =========================================================
   ESTHER MATHYS — Interactions
   (Tu n'as normalement pas besoin de toucher à ce fichier.
    Tout le contenu modifiable est dans js/data.js)
   ========================================================= */
(function () {
  "use strict";

  /* ------------------------------------------------------ */
  /* 0. Utilitaires                                         */
  /* ------------------------------------------------------ */
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));

  /* Remplace une image cassée par un dégradé + titre élégant */
  function guardImage(img, labelFallback) {
    img.addEventListener("error", function handle() {
      const card = img.closest(".wcard");
      if (card) {
        card.classList.add("no-img");
        const ph = card.querySelector(".wcard__ph");
        if (ph && labelFallback) ph.textContent = labelFallback;
      } else {
        img.style.opacity = "0"; // laisse le dégradé du parent visible
      }
    }, { once: true });
  }

  /* ------------------------------------------------------ */
  /* 1. Coordonnées & réseaux (depuis data.js)              */
  /* ------------------------------------------------------ */
  function fillContact() {
    if (typeof SITE === "undefined") return;

    const emailEl = $("#contactEmail");
    if (emailEl) { emailEl.textContent = SITE.email; emailEl.href = "mailto:" + SITE.email; }

    const phoneEl = $("#contactPhone");
    if (phoneEl) { phoneEl.textContent = SITE.phone; phoneEl.href = "tel:" + SITE.phone.replace(/\s+/g, ""); }

    const cityEl = $("#contactCity");
    if (cityEl) cityEl.textContent = SITE.city;

    const socialsEl = $("#contactSocials");
    if (socialsEl && Array.isArray(SITE.socials)) {
      socialsEl.innerHTML = SITE.socials
        .filter((s) => s.url && s.url.trim() !== "")
        .map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a>`)
        .join("");
    }
  }

  /* ------------------------------------------------------ */
  /* 2. Services (depuis data.js)                           */
  /* ------------------------------------------------------ */
  function renderServices() {
    const grid = $("#servicesGrid");
    if (!grid || typeof SERVICES === "undefined") return;
    grid.innerHTML = SERVICES.map((s, i) => `
      <article class="scard reveal-up" style="--d:${i}">
        <span class="scard__num">0${i + 1}</span>
        <h3 class="scard__title">${esc(s.title)}</h3>
        <p class="scard__text">${esc(s.text)}</p>
      </article>
    `).join("");
  }

  /* ------------------------------------------------------ */
  /* 3. Réalisations + filtres (depuis data.js)             */
  /* ------------------------------------------------------ */
  function renderWork() {
    const grid = $("#workGrid");
    const filtersEl = $("#workFilters");
    if (!grid || typeof PROJECTS === "undefined") return;

    // Cartes projets
    grid.innerHTML = PROJECTS.map((p, i) => `
      <article class="wcard reveal-up" data-index="${i}" data-cat="${esc(p.category)}" tabindex="0" role="button" aria-label="Voir le projet ${esc(p.title)}">
        <span class="wcard__ph">${esc(p.title)}</span>
        <img src="${esc(p.image)}" alt="${esc(p.title)} — ${esc(p.category)}" loading="lazy" />
        <span class="wcard__plus" aria-hidden="true">+</span>
        <div class="wcard__overlay">
          <span class="wcard__cat">${esc(p.category)}</span>
          <h3 class="wcard__title">${esc(p.title)}</h3>
          <span class="wcard__meta">${esc(p.location)} · ${esc(p.year)}</span>
        </div>
      </article>
    `).join("");

    $$("#workGrid img").forEach((img) => {
      const idx = img.closest(".wcard").dataset.index;
      guardImage(img, PROJECTS[idx] ? PROJECTS[idx].title : "");
    });

    // Filtres (catégories uniques + « Tout »)
    const cats = ["Tout", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];
    filtersEl.innerHTML = cats.map((c, i) =>
      `<button class="filter${i === 0 ? " is-active" : ""}" data-filter="${esc(c)}">${esc(c)}</button>`
    ).join("");

    filtersEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter");
      if (!btn) return;
      $$(".filter", filtersEl).forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const f = btn.dataset.filter;
      $$(".wcard", grid).forEach((card) => {
        const show = f === "Tout" || card.dataset.cat === f;
        card.classList.toggle("is-hidden", !show);
      });
    });

    // Ouverture lightbox (clic + clavier)
    grid.addEventListener("click", (e) => {
      const card = e.target.closest(".wcard");
      if (card) openLightbox(PROJECTS, +card.dataset.index);
    });
    grid.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const card = e.target.closest(".wcard");
      if (card) { e.preventDefault(); openLightbox(PROJECTS, +card.dataset.index); }
    });
  }

  /* ------------------------------------------------------ */
  /* 3b. Croquis & plans (depuis data.js)                   */
  /* ------------------------------------------------------ */
  function renderSketches() {
    const grid = $("#sketchGrid");
    if (!grid || typeof SKETCHES === "undefined") return;

    grid.innerHTML = SKETCHES.map((s, i) => `
      <article class="skcard reveal-up" data-index="${i}" tabindex="0" role="button" aria-label="Voir ${esc(s.title)}">
        <div class="skcard__inner">
          <span class="skcard__ph"><strong>${esc(s.title)}</strong><em>${esc(s.type || "")}</em></span>
          <img src="${esc(s.image)}" alt="${esc(s.title)} — ${esc(s.type || "")}" loading="lazy" />
        </div>
        <div class="skcard__cap">
          <span class="skcard__title">${esc(s.title)}</span>
          <span class="skcard__type">${esc(s.type || "")}</span>
        </div>
      </article>
    `).join("");

    $$("#sketchGrid img").forEach((img) => {
      img.addEventListener("error", () => {
        const c = img.closest(".skcard");
        if (c) c.classList.add("no-img");
      }, { once: true });
    });

    grid.addEventListener("click", (e) => {
      const c = e.target.closest(".skcard");
      if (c) openLightbox(SKETCHES, +c.dataset.index);
    });
    grid.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const c = e.target.closest(".skcard");
      if (c) { e.preventDefault(); openLightbox(SKETCHES, +c.dataset.index); }
    });
  }

  /* ------------------------------------------------------ */
  /* 3c. Outils & logiciels (depuis data.js)                */
  /* ------------------------------------------------------ */
  function renderTools() {
    const grid = $("#toolsGrid");
    if (!grid || typeof TOOLS === "undefined") return;
    grid.innerHTML = TOOLS.map((t, i) => {
      const lvl = Math.max(0, Math.min(100, Number(t.level) || 0));
      return `
      <article class="tool reveal-up" style="--lvl:${lvl}%; --d:${i % 4}">
        <h3 class="tool__name">${esc(t.name)}</h3>
        <p class="tool__role">${esc(t.role || "")}</p>
        <div class="tool__bar"><span class="tool__bar-fill"></span></div>
        <span class="tool__pct">${lvl}%</span>
      </article>`;
    }).join("");
  }

  /* ------------------------------------------------------ */
  /* 3d. Vidéo de présentation (depuis data.js)             */
  /* ------------------------------------------------------ */
  function renderVideo() {
    const el = $("#videoPlayer");
    if (!el || typeof VIDEO === "undefined") return;

    if (VIDEO.youtubeId && VIDEO.youtubeId.trim() !== "") {
      el.innerHTML =
        `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(VIDEO.youtubeId)}" ` +
        `title="Présentation d'Esther Mathys" frameborder="0" ` +
        `allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ` +
        `allowfullscreen></iframe><span class="video__frame" aria-hidden="true"></span>`;
      return;
    }

    el.innerHTML = `
      <video id="estherVideo" controls preload="metadata" poster="${esc(VIDEO.poster || "")}">
        <source src="${esc(VIDEO.file || "")}" type="video/mp4" />
        Votre navigateur ne prend pas en charge la lecture vidéo.
      </video>
      <button class="video__play" id="videoPlay" aria-label="Lire la vidéo"><span></span></button>
      <span class="video__frame" aria-hidden="true"></span>`;

    const v = $("#estherVideo");
    const b = $("#videoPlay");
    if (v && b) {
      b.addEventListener("click", () => { v.play(); });
      v.addEventListener("play", () => { b.style.display = "none"; });
    }
  }

  /* ------------------------------------------------------ */
  /* 4. Lightbox                                            */
  /* ------------------------------------------------------ */
  let lbIndex = 0;
  let lbList = [];               // liste courante (PROJECTS ou SKETCHES)
  const lb = {
    root:  $("#lightbox"),
    media: $(".lightbox__media"),
    img:   $("#lbImg"),
    cat:   $("#lbCat"),
    title: $("#lbTitle"),
    meta:  $("#lbMeta"),
    desc:  $("#lbDesc")
  };

  function openLightbox(list, i) {
    if (!Array.isArray(list) || !list[i]) return;
    lbList = list;
    lbIndex = i;
    const p = list[i];
    if (lb.media) lb.media.classList.remove("no-img");
    lb.img.style.display = "";
    lb.img.onerror = () => { lb.img.style.display = "none"; if (lb.media) lb.media.classList.add("no-img"); };
    lb.img.src = p.image;
    lb.img.alt = p.title;
    lb.cat.textContent = p.category || p.type || "";
    lb.title.textContent = p.title;
    const meta = [p.location, p.year].filter(Boolean).join(" · ");
    lb.meta.textContent = meta;
    lb.meta.style.display = meta ? "" : "none";
    lb.desc.textContent = p.description || "";
    lb.root.classList.add("is-open");
    lb.root.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lb.root.classList.remove("is-open");
    lb.root.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  function stepLightbox(dir) {
    const total = lbList.length;
    if (!total) return;
    openLightbox(lbList, (lbIndex + dir + total) % total);
  }

  function bindLightbox() {
    if (!lb.root) return;
    $("#lbClose").addEventListener("click", closeLightbox);
    $("#lbPrev").addEventListener("click", () => stepLightbox(-1));
    $("#lbNext").addEventListener("click", () => stepLightbox(1));
    lb.root.addEventListener("click", (e) => { if (e.target === lb.root) closeLightbox(); });
    document.addEventListener("keydown", (e) => {
      if (!lb.root.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") stepLightbox(1);
      if (e.key === "ArrowLeft") stepLightbox(-1);
    });
  }

  /* ------------------------------------------------------ */
  /* 5. Navigation (scroll + menu mobile)                   */
  /* ------------------------------------------------------ */
  function bindNav() {
    const nav = $("#nav");
    const burger = $("#navBurger");
    const links = $("#navLinks");

    const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    burger.addEventListener("click", () => {
      const open = links.classList.toggle("is-open");
      nav.classList.toggle("is-menu-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    links.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        links.classList.remove("is-open");
        nav.classList.remove("is-menu-open");
        burger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }

  /* ------------------------------------------------------ */
  /* 6. Reveals au scroll + compteurs                       */
  /* ------------------------------------------------------ */
  function bindReveals() {
    const items = $$(".reveal, .reveal-up");
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-in"));
      $$(".stat__num").forEach((el) => (el.textContent = el.dataset.count));
      return;
    }
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          if (entry.target.dataset && entry.target.dataset.count) countUp(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });

    items.forEach((el) => io.observe(el));
    $$(".stat__num").forEach((el) => io.observe(el));
  }

  function countUp(el) {
    const target = +el.dataset.count;
    const dur = 1600;
    const start = performance.now();
    function tick(now) {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(eased * target);
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ------------------------------------------------------ */
  /* 7. Formulaire de contact (mailto, sans serveur)        */
  /* ------------------------------------------------------ */
  function bindForm() {
    const form = $("#contactForm");
    if (!form || typeof SITE === "undefined") return;
    const note = $("#formNote");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = $("#fName").value.trim();
      const email = $("#fEmail").value.trim();
      const subject = $("#fSubject").value.trim() || "Demande de projet";
      const message = $("#fMessage").value.trim();

      const body =
        `Bonjour Esther,%0D%0A%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0A` +
        `— ${encodeURIComponent(name)}%0D%0A${encodeURIComponent(email)}`;

      window.location.href =
        `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${body}`;

      note.hidden = false;
      note.textContent = "Merci ! Votre logiciel de messagerie va s'ouvrir pour finaliser l'envoi.";
      form.reset();
    });
  }

  /* ------------------------------------------------------ */
  /* 8. Divers                                              */
  /* ------------------------------------------------------ */
  function misc() {
    const y = $("#year");
    if (y) y.textContent = new Date().getFullYear();

    // Sécurise les images statiques (hero, portrait)
    $$("img[data-img]").forEach((img) => guardImage(img));
  }

  /* ------------------------------------------------------ */
  /* 9. Carte des architectes (MapLibre + OpenFreeMap)      */
  /*    Gratuit, sans clé. Chargée à la demande (rapide).   */
  /* ------------------------------------------------------ */
  let mapMarkers = [];
  let mapInstance = null;
  let landmarkLbList = [];

  // Fiches (dans le panneau déroulant sous la carte)
  function renderLandmarks() {
    const list = $("#mapList");
    if (!list || typeof LANDMARKS === "undefined") return;

    // Version « popup image » : on réutilise la lightbox du site
    landmarkLbList = LANDMARKS.map((p) => ({
      image: p.image, title: p.name, category: p.architect,
      location: p.style, year: p.year, description: p.description
    }));

    list.innerHTML = LANDMARKS.map((p, i) => `
      <article class="mcard reveal-up" data-index="${i}" tabindex="0" role="button" aria-label="Découvrir ${esc(p.name)}">
        <span class="mcard__idx">${String(i + 1).padStart(2, "0")}</span>
        <h3 class="mcard__b">${esc(p.name)}</h3>
        <p class="mcard__a">${esc(p.architect)}</p>
        <p class="mcard__m">${esc([p.year, p.style].filter(Boolean).join(" · "))}</p>
      </article>
    `).join("");

    // Clic sur une fiche → popup image + explication, et vol vers le lieu
    list.addEventListener("click", (e) => {
      const c = e.target.closest(".mcard");
      if (!c) return;
      const i = +c.dataset.index;
      openLightbox(landmarkLbList, i);
      flyToLandmark(i);
    });
    list.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const c = e.target.closest(".mcard");
      if (c) { e.preventDefault(); c.click(); }
    });

    // Bouton « Voir en détail » présent dans les popups de la carte
    document.addEventListener("click", (e) => {
      const b = e.target.closest(".mpop__more");
      if (b) openLightbox(landmarkLbList, +b.dataset.lm);
    });
  }

  // Panneau déroulant des fiches
  function bindMapPanel() {
    const btn = $("#mapListToggle");
    const panel = $("#mapListPanel");
    const label = $("#mapListLabel");
    if (!btn || !panel) return;
    const n = (typeof LANDMARKS !== "undefined") ? LANDMARKS.length : 0;
    let open = false;
    const apply = () => {
      panel.style.maxHeight = open ? panel.scrollHeight + "px" : "0px";
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.classList.toggle("is-open", open);
      if (label) label.textContent = open ? "Masquer les lieux" : `Les ${n} lieux à explorer`;
    };
    apply();
    btn.addEventListener("click", () => { open = !open; apply(); });
    window.addEventListener("resize", () => { if (open) panel.style.maxHeight = panel.scrollHeight + "px"; });
  }

  function flyToLandmark(i) {
    if (!mapInstance || !LANDMARKS[i]) return;
    const p = LANDMARKS[i];
    mapInstance.flyTo({ center: [p.lng, p.lat], zoom: 16.5, pitch: mapInstance.getPitch(), essential: true, duration: 1400 });
    mapMarkers.forEach((m, idx) => { if (idx !== i && m.getPopup().isOpen()) m.togglePopup(); });
    if (mapMarkers[i] && !mapMarkers[i].getPopup().isOpen()) mapMarkers[i].togglePopup();
  }

  // Chargement paresseux : on n'initialise la carte qu'à l'approche de la section
  function initMapLazy() {
    const section = $("#carte");
    if (!section || typeof MAP === "undefined") return;
    let started = false;
    const start = () => { if (!started) { started = true; buildMap(); } };

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { start(); io.disconnect(); } });
      }, { rootMargin: "250px" });
      io.observe(section);
    } else {
      start();
    }
  }

  function loadAsset(tag, attrs) {
    return new Promise((resolve, reject) => {
      const el = document.createElement(tag);
      Object.assign(el, attrs);
      el.onload = resolve;
      el.onerror = reject;
      document.head.appendChild(el);
    });
  }

  async function buildMap() {
    const V = "4.7.1";
    try {
      await loadAsset("link", { rel: "stylesheet", href: `https://unpkg.com/maplibre-gl@${V}/dist/maplibre-gl.css` });
      await loadAsset("script", { src: `https://unpkg.com/maplibre-gl@${V}/dist/maplibre-gl.js` });
    } catch (err) { return mapError(); }
    if (typeof maplibregl === "undefined") return mapError();

    const map = new maplibregl.Map({
      container: "mapCanvas",
      style: MAP.style,
      center: MAP.center,
      zoom: MAP.zoom,
      pitch: 0,
      bearing: 0,
      attributionControl: true,
      cooperativeGestures: true    // évite de « voler » le scroll de la page
    });

    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "top-left");

    map.on("load", () => {
      const ph = $("#mapPlaceholder");
      if (ph) ph.style.display = "none";
      add3DBuildings(map);
      addMarkers(map);
      const t = $("#mapToggle");
      if (t) t.hidden = false;
      map.resize();
    });

    mapInstance = map;
    wireToggle(map);
  }

  function mapError() {
    const ph = $("#mapPlaceholder");
    if (ph) ph.innerHTML = '<span class="map__placeholder-txt">La carte n\'a pas pu se charger. Vérifiez votre connexion, puis rechargez la page.</span>';
  }

  // Bâtiments 3D — teinte « pierre dorée » (le style Liberty a déjà une
  // couche « building-3d » : on la recolore ; sinon on en ajoute une).
  function add3DBuildings(map) {
    try {
      if (map.getLayer("building-3d")) {
        map.setPaintProperty("building-3d", "fill-extrusion-color", "#d8c8a2");
        map.setPaintProperty("building-3d", "fill-extrusion-opacity", 0.85);
        return;
      }
      const layers = (map.getStyle() && map.getStyle().layers) || [];
      let labelId;
      for (const l of layers) {
        if (l.type === "symbol" && l.layout && l.layout["text-field"]) { labelId = l.id; break; }
      }
      map.addLayer({
        id: "3d-buildings",
        source: "openmaptiles",
        "source-layer": "building",
        type: "fill-extrusion",
        minzoom: 14,
        paint: {
          "fill-extrusion-color": "#d8c8a2",
          "fill-extrusion-height": ["coalesce", ["get", "render_height"], ["get", "height"], 0],
          "fill-extrusion-base": ["coalesce", ["get", "render_min_height"], ["get", "min_height"], 0],
          "fill-extrusion-opacity": 0.8
        }
      }, labelId);
    } catch (e) { /* schéma différent : la carte reste utilisable, sans planter */ }
  }

  function addMarkers(map) {
    mapMarkers = LANDMARKS.map((p, i) => {
      const el = document.createElement("div");
      el.className = "map-pin";
      el.innerHTML = `<span>${i + 1}</span>`;
      const popup = new maplibregl.Popup({ offset: 22, maxWidth: "290px", closeButton: true }).setHTML(
        `<div class="mpop">` +
          `<div class="mpop__img" style="background-image:url('${p.image}')"></div>` +
          `<div class="mpop__body">` +
            `<span class="mpop__idx">${String(i + 1).padStart(2, "0")}</span>` +
            `<h4 class="mpop__b">${esc(p.name)}</h4>` +
            `<p class="mpop__a">${esc(p.architect)}</p>` +
            `<p class="mpop__m">${esc([p.year, p.style].filter(Boolean).join(" · "))}</p>` +
            `<button class="mpop__more" type="button" data-lm="${i}">Voir en détail</button>` +
          `</div>` +
        `</div>`
      );
      return new maplibregl.Marker({ element: el, anchor: "center" })
        .setLngLat([p.lng, p.lat])
        .setPopup(popup)
        .addTo(map);
    });
  }

  function wireToggle(map) {
    const t = $("#mapToggle");
    if (!t) return;
    let is3d = false;
    t.addEventListener("click", () => {
      is3d = !is3d;
      map.easeTo({ pitch: is3d ? 60 : 0, bearing: is3d ? -18 : 0, duration: 900 });
      t.textContent = is3d ? "Vue 2D" : "Vue 3D";
      t.setAttribute("aria-pressed", is3d ? "true" : "false");
    });
  }

  /* ------------------------------------------------------ */
  /* INIT                                                   */
  /* ------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", () => {
    fillContact();
    renderServices();
    renderWork();
    renderSketches();
    renderTools();
    renderVideo();
    renderLandmarks();
    bindMapPanel();
    initMapLazy();
    bindLightbox();
    bindNav();
    bindForm();
    misc();
    bindReveals();      // en dernier : observe aussi le contenu injecté
  });
})();
