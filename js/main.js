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
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
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
  /* 2. Réalisations — galerie d'images (depuis data.js)    */
  /* ------------------------------------------------------ */
  function renderWork() {
    const grid = $("#workGrid");
    if (!grid || typeof GALLERY === "undefined") return;

    // Chaque image devient une entrée de lightbox (flèches ← → pour naviguer).
    const workLb = GALLERY.map((g) => ({
      image: g.image, category: "Réalisation", title: g.caption || "",
      location: "", year: "2025", description: ""
    }));

    // Une tuile par image (toutes visibles d'un coup, pas de filtres).
    grid.innerHTML = GALLERY.map((g, i) => `
      <article class="wcard reveal-up" data-index="${i}" tabindex="0" role="button" aria-label="Agrandir : ${esc(g.caption || "image")}">
        <span class="wcard__ph">${esc(g.caption || "")}</span>
        <img src="${esc(g.image)}" alt="${esc(g.caption || "Réalisation")}" loading="lazy" />
        <span class="wcard__plus" aria-hidden="true">+</span>
        <div class="wcard__overlay">
          <span class="wcard__cat">Réalisation</span>
          <h3 class="wcard__title">${esc(g.caption || "")}</h3>
        </div>
      </article>
    `).join("");

    $$("#workGrid img").forEach((img) => {
      const idx = img.closest(".wcard").dataset.index;
      guardImage(img, GALLERY[idx] ? GALLERY[idx].caption : "");
    });

    // Ouverture lightbox (clic + clavier)
    const openTile = (card) => openLightbox(workLb, +card.dataset.index);
    grid.addEventListener("click", (e) => {
      const card = e.target.closest(".wcard");
      if (card) openTile(card);
    });
    grid.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const card = e.target.closest(".wcard");
      if (card) { e.preventDefault(); openTile(card); }
    });
  }

  /* ------------------------------------------------------ */
  /* 3. Outils & logiciels (depuis data.js)                 */
  /* ------------------------------------------------------ */
  function renderTools() {
    const grid = $("#toolsGrid");
    if (!grid || typeof TOOLS === "undefined") return;
    grid.innerHTML = TOOLS.map((t, i) => {
      const lvl = Math.max(0, Math.min(100, Number(t.level) || 0));
      const logo = t.logo
        ? `<img class="tool__logo" src="${esc(t.logo)}" alt="Logo ${esc(t.name)}" loading="lazy" />`
        : `<span class="tool__logo tool__logo--empty" aria-hidden="true"></span>`;
      return `
      <article class="tool reveal-up" style="--lvl:${lvl}%; --d:${i % 4}">
        ${logo}
        <h3 class="tool__name">${esc(t.name)}</h3>
        <p class="tool__role">${esc(t.role || "")}</p>
        <div class="tool__bar"><span class="tool__bar-fill"></span></div>
        <span class="tool__pct">${lvl}%</span>
      </article>`;
    }).join("");

    // Si un logo ne charge pas, on le masque proprement.
    $$("#toolsGrid img.tool__logo").forEach((img) => {
      img.addEventListener("error", () => { img.style.visibility = "hidden"; }, { once: true });
    });
  }

  /* ------------------------------------------------------ */
  /* 4. Lightbox                                            */
  /* ------------------------------------------------------ */
  let lbIndex = 0;
  let lbList = [];               // liste courante (galerie)
  const lb = {
    root: $("#lightbox"),
    media: $(".lightbox__media"),
    img: $("#lbImg"),
    cat: $("#lbCat"),
    title: $("#lbTitle"),
    meta: $("#lbMeta"),
    desc: $("#lbDesc")
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
  /* 7. Formulaire de contact — envoi via EmailJS           */
  /*    Le message part directement dans la boîte mail,     */
  /*    sans serveur et sans ouvrir de logiciel de mail.    */
  /*    Repli mailto tant qu'EmailJS n'est pas configuré.   */
  /* ------------------------------------------------------ */
  function bindForm() {
    const form = $("#contactForm");
    if (!form || typeof SITE === "undefined") return;
    const note = $("#formNote");

    const cfg = SITE.emailjs || {};
    const ready = !!(cfg.publicKey && cfg.serviceId && cfg.templateId &&
      typeof emailjs !== "undefined");
    if (ready) {
      try { emailjs.init({ publicKey: cfg.publicKey }); } catch (e) { /* noop */ }
    }

    const showNote = (msg, isError) => {
      if (!note) return;
      note.hidden = !msg;
      note.textContent = msg;
      note.classList.toggle("is-error", !!isError);
    };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Piège anti-spam : si rempli, c'est un bot → on ignore silencieusement.
      const trap = $("#fHoneypot");
      if (trap && trap.value) { form.reset(); return; }

      const name = $("#fName").value.trim();
      const email = $("#fEmail").value.trim();
      const subject = $("#fSubject").value.trim() || "Nouveau message depuis le portfolio";
      const message = $("#fMessage").value.trim();
      // Date/heure affichée dans le template ({{time}}), format français.
      const time = new Date().toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" });

      // EmailJS pas encore configuré : on n'ouvre PAS de logiciel de messagerie.
      // On prévient dans la console (pour la config) et on affiche un message.
      if (!ready) {
        console.warn("[Contact] EmailJS non configuré — renseigne publicKey / serviceId / templateId dans js/data.js (SITE.emailjs).");
        showNote("Le formulaire n'est pas encore activé. En attendant, écrivez à " + SITE.email + ".", true);
        return;
      }

      // Envoi réel via EmailJS → arrive dans la boîte mail d'Esther.
      const btn = form.querySelector('button[type="submit"]');
      const prev = btn ? btn.innerHTML : "";
      if (btn) { btn.disabled = true; btn.innerHTML = "<span>Envoi en cours…</span>"; }
      showNote("", false);

      try {
        await emailjs.send(cfg.serviceId, cfg.templateId, {
          name: name,
          email: email,
          time: time,
          reply_to: email,
          from_name: name || "Portfolio Esther Mathys",
          subject: subject,
          message: message,
          to_email: SITE.email
        }, { publicKey: cfg.publicKey });
        showNote("Merci ! Votre message a bien été envoyé. Je vous réponds au plus vite.", false);
        form.reset();
      } catch (err) {
        showNote("L'envoi a échoué. Réessayez, ou écrivez directement à " + SITE.email + ".", true);
      } finally {
        if (btn) { btn.disabled = false; btn.innerHTML = prev; }
      }
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
  /* INIT                                                   */
  /* ------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", () => {
    fillContact();
    renderWork();
    renderTools();
    bindLightbox();
    bindNav();
    bindForm();
    misc();
    bindReveals();      // en dernier : observe aussi le contenu injecté
  });
})();
