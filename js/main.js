document.addEventListener("DOMContentLoaded", () => {
  /* =================================================
     SLIDES PRINCIPALES (Inicio / Destacados / Teléfonos)
     ================================================= */
  const container = document.querySelector(".container");
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".nav-dots .dot");
  const navLinks = document.querySelectorAll("#main-nav a");

  let currentSlide = 0;
  const totalSlides = 3; // inicio, destacados, teléfonos

  function updateSlide(index) {
    currentSlide = index;
    container.style.transform = `translateY(-${currentSlide * 100}vh)`;
    dots.forEach((dot, i) =>
      dot.classList.toggle("active", i === currentSlide)
    );
  }

  // Navegación con scroll vertical
  let isScrolling = false;
  document.addEventListener("wheel", (e) => {
    if (isScrolling) return;
    if (e.deltaY > 0 && currentSlide < totalSlides - 1) {
      updateSlide(currentSlide + 1);
    } else if (e.deltaY < 0 && currentSlide > 0) {
      updateSlide(currentSlide - 1);
    }
    isScrolling = true;
    setTimeout(() => (isScrolling = false), 800);
  });

  // Navegación con dots
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => updateSlide(i));
  });

  // Navegación con menú superior
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetIndex = [...slides].findIndex((s) => s.id === targetId);
      if (targetIndex !== -1) updateSlide(targetIndex);
    });
  });

  // Evita que carruseles o listas roben gestos de scroll vertical
  const swipeZones = document.querySelectorAll(
    ".carrusel-destacados, .carrusel-window, .menu-scroll, .slider, .device-list, [data-swipe='x']"
  );

  swipeZones.forEach((el) => {
    ["touchstart", "touchmove", "touchend"].forEach((evt) =>
      el.addEventListener(evt, (e) => e.stopPropagation(), { passive: true })
    );
    el.addEventListener("wheel", (e) => e.stopPropagation(), {
      passive: false,
    });
  });

  /* =================================================
     BOTÓN WHATSAPP (¡Lo quiero!)
     ================================================= */
  const btnWhatsapp = document.getElementById("btn-whatsapp");
  if (btnWhatsapp) {
    btnWhatsapp.addEventListener("click", (e) => {
      e.preventDefault();
      let modelo = document.getElementById("tel-nombre").textContent;
      let numero = "573143471458";
      let mensaje = `Hola, quiero el ${modelo}`;
      let url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
      window.open(url, "_blank");
    });
  }

  /* =================================================
     TELÉFONOS (lista vertical con video/banner dinámico)
     ================================================= */
  const telefonos = {
    honor: {
      nombre: "Honor",
      descripcion:
        "Descubre los últimos smartphones Honor con gran rendimiento y estilo.",
      video: "videos/honor.mp4",
      banner: "img/banner_honor.webp",
    },
    infinixHot50: {
      nombre: "Infinix Hot 50 5G",
      descripcion: "Smartphone 5G con gran rendimiento y batería duradera.",
      video: "videos/infinix_hot50.mp4",
      banner: "img/banner_infinix_hot50.png",
    },
    infinixNote50: {
      nombre: "Infinix Note 50 Pro",
      descripcion: "Pantalla amplia y diseño elegante con cámara avanzada.",
      video: "videos/infinix_note50.mp4",
      banner: "img/banner_infinix_note50.png",
    },
    iphone14pro: {
      nombre: "iPhone 14 Pro",
      descripcion: "El último iPhone con Dynamic Island y cámaras Pro.",
      video: "videos/iphone14pro.mp4",
      banner: "img/banner_iphone14pro.png",
    },
    motorolaG40: {
      nombre: "Motorola G40",
      descripcion: "Motorola G40 con gran batería y pantalla FHD+.",
      video: "videos/motorola_g40.mp4",
      banner: "img/banner_moto_g40.png",
    },
    oppo: {
      nombre: "Oppo",
      descripcion: "La nueva línea Oppo, innovación y estilo en tu mano.",
      video: "videos/oppo.mp4",
      banner: "img/banner_oppo.png",
    },
    samsungA16: {
      nombre: "Samsung A16",
      descripcion: "Samsung A16 con diseño premium y gran rendimiento.",
      video: "videos/samsung_a16.mp4",
      banner: "img/banner_samsung_a16.png",
    },
    xiaomiNote14: {
      nombre: "Xiaomi Note 14 Pro",
      descripcion: "Xiaomi con pantalla AMOLED y carga ultrarrápida.",
      video: "videos/xiaomi_note14.mp4",
      banner: "img/banner_xiaomi_note14.png",
    },
    tecnoSpark: {
      nombre: "Tecno Spark Go2",
      descripcion: "Diseño compacto y funciones esenciales para el día a día.",
      video: "videos/tecno_sparkgo2.mp4",
      banner: "img/banner_tecno_sparkgo2.png",
    },
  };

  // Preload
  Object.values(telefonos).forEach((tel) => {
    if (tel.banner) new Image().src = tel.banner;
    if (tel.video) {
      const v = document.createElement("video");
      v.src = tel.video;
      v.preload = "auto";
    }
  });

  const telList = document.querySelector(".device-list");
  const telItems = document.querySelectorAll(".device-list .device-item");
  const upBtn = document.querySelector("#btn-up");
  const downBtn = document.querySelector("#btn-down");
  let currentIndex = 0;
  const itemHeight = telItems[0].offsetHeight + 20;
  const visibleCount = 3;

  function updatePhone(index) {
    const item = telItems[index];
    const modelo = item.dataset.modelo;
    const tel = telefonos[modelo];
    if (!tel) return;

    document.getElementById("tel-nombre").textContent = tel.nombre;
    document.getElementById("tel-descripcion").textContent = tel.descripcion;
    document.getElementById("tel-video").innerHTML = `
      <video autoplay muted loop playsinline>
        <source src="${tel.video}" type="video/mp4">
      </video>`;
    document.getElementById(
      "tel-banner"
    ).style.background = `url('${tel.banner}') center/cover no-repeat`;

    telItems.forEach((li) => li.classList.remove("active"));
    item.classList.add("active");

    telList.style.transform = `translateY(-${
      Math.max(0, index - (visibleCount - 1)) * itemHeight
    }px)`;
    upBtn.classList.toggle("hidden", index === 0);
    downBtn.classList.toggle("hidden", index >= telItems.length - 1);
  }

  upBtn.addEventListener("click", () => {
    if (currentIndex > 0) updatePhone(--currentIndex);
  });
  downBtn.addEventListener("click", () => {
    if (currentIndex < telItems.length - 1) updatePhone(++currentIndex);
  });
  telItems.forEach((item, i) => {
    item.addEventListener("click", () => {
      currentIndex = i;
      updatePhone(currentIndex);
    });
  });

  /* =================================================
     DESTACADOS (carrusel horizontal)
     ================================================= */
  const categorias = {
    lavadoras: {
      grande: {
        titulo: "Lavadora doble tina Kalley 10k",
        img: "img/lavadora10k.webp",
        desc: "Lavadora Kalley doble tina capacidad 10kg",
        precio: "COP $...",
      },
      items: [
        {
          titulo: "Lavadora doble tina Kalley 7k",
          img: "img/lavadora7k.webp",
          precio: "COP $...",
        },
      ],
    },
    televisores: {
      grande: {
        titulo: "Tv 60 pulgadas Kalley",
        img: "img/tv60kalley.webp",
        desc: "Smart TV Kalley 60'' UHD",
        precio: "COP $...",
      },
      items: [
        {
          titulo: "Tv 43 pulgadas Kalley",
          img: "img/tv43kalley.webp",
          precio: "COP $...",
        },
        {
          titulo: "Tv 32 pulgadas Kalley",
          img: "img/tv32kalley.webp",
          precio: "COP $...",
        },
        {
          titulo: "Tv 40 pulgadas Samsung",
          img: "img/tv40samsung.webp",
          precio: "COP $...",
        },
        {
          titulo: "Tv 43 pulgadas Samsung",
          img: "img/tv43samsung.webp",
          precio: "COP $...",
        },
      ],
    },
    parlantes: {
      grande: {
        titulo: "Parlante Samsung MX50",
        img: "img/parlante_mx50.webp",
        desc: "Audio potente Samsung MX50",
        precio: "COP $...",
      },
      items: [
        {
          titulo: "Parlante 5PK 300D",
          img: "img/parlante_300d.webp",
          precio: "COP $...",
        },
        {
          titulo: "Parlante Niatec Cubit (4 unidades)",
          img: "img/niatec_cubit.webp",
          precio: "COP $...",
        },
        {
          titulo: "Parlante Niatec NT-PB16 (3 unidades)",
          img: "img/niatec_ntpb16.webp",
          precio: "COP $...",
        },
      ],
    },
    freidoras: {
      grande: {
        titulo: "Freidora Kalley 6.3L",
        img: "img/freidora63.webp",
        desc: "Freidora de aire Kalley 6.3 litros",
        precio: "COP $...",
      },
      items: [
        {
          titulo: "Freidora Kalley 4.5L",
          img: "img/freidora45.webp",
          precio: "COP $...",
        },
      ],
    },
    motos: {
      grande: {
        titulo: "Mobuloo Girl 3",
        img: "img/moto_girl3.webp",
        desc: "Autonomía entre 40 y 50 km · Velocidad 25–35 km/h · Motor 350W · Carga máxima 130kg",
        precio: "COP $4.200.000",
      },
      items: [
        {
          titulo: "Mobuloo Girl 3 - Blanca",
          img: "img/moto_girl3_blanca.webp",
          precio: "COP $4.200.000",
        },
        {
          titulo: "Mobuloo Girl 3 - Negra",
          img: "img/moto_girl3_negra.webp",
          precio: "COP $4.200.000",
        },
        {
          titulo: "Mobuloo Girl 3 - Verde",
          img: "img/moto_girl3_verde.webp",
          precio: "COP $4.200.000",
        },
        {
          titulo: "Mobuloo Girl 3 - Rosa",
          img: "img/moto_girl3_rosa.webp",
          precio: "COP $4.200.000",
        },
      ],
    },
  };

  // Preload imágenes destacados
  Object.values(categorias).forEach((cat) => {
    [cat.grande.img, ...cat.items.map((i) => i.img)].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  });

  const menuItems = document.querySelectorAll("#destacados .menu-item");
  const carruselInner = document.getElementById("carrusel-contenido");
  const carruselWin = carruselInner.parentElement;
  const btnPrev = document.getElementById("carrusel-prev");
  const btnNext = document.getElementById("carrusel-next");
  let currentCatKey = "lavadoras";
  let currentOffset = 0;
  const step = 320;

  const isMobile = () => matchMedia("(max-width: 768px)").matches;

  function renderCategoria(catKey) {
    const cat = categorias[catKey];
    if (!cat) return;
    currentCatKey = catKey;
    currentOffset = 0;

    carruselInner.style.opacity = 0;
    carruselInner.style.transform = "translateY(20px)";

    setTimeout(() => {
      carruselInner.innerHTML = `
        <div class="product">
          <img src="${cat.grande.img}" alt="${cat.grande.titulo}">
          <h3>${cat.grande.titulo}</h3>
          <p>${cat.grande.desc}</p>
          <p class="precio-ref">${cat.grande.precio}</p>
          <a href="https://wa.me/573143471458?text=${encodeURIComponent(
            "Hola, quiero comprar el " + cat.grande.titulo
          )}" target="_blank">¡Lo quiero!</a>
        </div>
        ${cat.items
          .map(
            (i) => `
          <div class="product">
            <img src="${i.img}" alt="${i.titulo}">
            <h4>${i.titulo}</h4>
            <p class="precio-ref">${i.precio}</p>
            <a href="https://wa.me/573143471458?text=${encodeURIComponent(
              "Hola, quiero comprar el " + i.titulo
            )}" target="_blank">¡Lo quiero!</a>
          </div>
        `
          )
          .join("")}
      `;

      if (isMobile()) {
        carruselWin.scrollLeft = 0;
        carruselInner.style.transform = "none";
      } else {
        carruselInner.style.transform = "translateX(0)";
      }

      carruselInner.style.opacity = 1;
      setupCarruselHighlight();
      updateButtons();
    }, 200);
  }

  function updateButtons() {
    const maxOffset = carruselInner.scrollWidth - carruselWin.offsetWidth;
    if (isMobile()) {
      btnPrev.classList.toggle("hidden", carruselWin.scrollLeft <= 0);
      btnNext.classList.toggle("hidden", carruselWin.scrollLeft >= maxOffset);
    } else {
      btnPrev.classList.toggle("hidden", currentOffset <= 0);
      btnNext.classList.toggle("hidden", currentOffset >= maxOffset);
    }
  }

  btnPrev.addEventListener("click", () => {
    if (isMobile()) {
      carruselWin.scrollBy({
        left: -carruselWin.clientWidth * 0.9,
        behavior: "smooth",
      });
    } else {
      currentOffset = Math.max(0, currentOffset - step * 2);
      carruselInner.style.transform = `translateX(-${currentOffset}px)`;
    }
    updateButtons();
  });

  btnNext.addEventListener("click", () => {
    const maxOffset = carruselInner.scrollWidth - carruselWin.offsetWidth;
    if (isMobile()) {
      carruselWin.scrollBy({
        left: carruselWin.clientWidth * 0.9,
        behavior: "smooth",
      });
    } else {
      currentOffset = Math.min(maxOffset, currentOffset + step * 2);
      carruselInner.style.transform = `translateX(-${currentOffset}px)`;
    }
    updateButtons();
  });

  window.addEventListener("resize", () => {
    if (isMobile()) {
      carruselInner.style.transform = "none";
      carruselWin.scrollLeft = 0;
    } else {
      currentOffset = 0;
      carruselInner.style.transform = "translateX(0)";
    }
    updateButtons();
  });

  // Efecto Xbox: resalta tarjeta centrada
  function setupCarruselHighlight() {
    const items = [...carruselInner.querySelectorAll(".product")];
    if (!items.length) return;

    const onScroll = () => {
      const center = carruselWin.scrollLeft + carruselWin.offsetWidth / 2;
      items.forEach((card) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const active = Math.abs(center - cardCenter) < card.offsetWidth / 2;
        card.classList.toggle("active", active);
      });
    };

    carruselWin.removeEventListener("scroll", onScroll);
    carruselWin.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Cambiar de categoría
  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      menuItems.forEach((b) => b.classList.remove("active"));
      item.classList.add("active");
      renderCategoria(item.dataset.categoria);
    });
  });

  // Inicializar
  renderCategoria("lavadoras");
  menuItems[0].classList.add("active");

  /* =================================================
     MENÚ MÓVIL (hamburguesa)
     ================================================= */
  const menuToggle = document.getElementById("menu-toggle");
  const mainNav = document.getElementById("main-nav");
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
    menuToggle.classList.toggle("active");
  });
  document.querySelectorAll("#main-nav a").forEach((link) =>
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.classList.remove("active");
    })
  );

  /* =================================================
     INICIALIZACIÓN
     ================================================= */
  window.history.scrollRestoration = "manual";
  window.scrollTo(0, 0);
  window.addEventListener("load", () => container.classList.add("loaded"));
  updateSlide(0);
  updatePhone(currentIndex);
});
