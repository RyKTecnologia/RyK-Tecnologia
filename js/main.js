document.addEventListener("DOMContentLoaded", () => {
  /* ================= SLIDES PRINCIPALES ================= */
  const container = document.querySelector(".container");
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".nav-dots .dot");
  const navLinks = document.querySelectorAll("#main-nav a");
  let currentSlide = 0;
  const totalSlides = slides.length;

  function updateSlide(index) {
    currentSlide = index;
    container.style.transform = `translateY(-${currentSlide * 100}vh)`;
    dots.forEach((dot, i) =>
      dot.classList.toggle("active", i === currentSlide)
    );
  }

  // Navegación con scroll
  document.addEventListener("wheel", (e) => {
    if (e.deltaY > 0 && currentSlide < totalSlides - 1) {
      updateSlide(currentSlide + 1);
    } else if (e.deltaY < 0 && currentSlide > 0) {
      updateSlide(currentSlide - 1);
    }
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
      if (targetIndex !== -1) {
        updateSlide(targetIndex);
      }
    });
  });

  /* ================= BOTÓN "¡LO QUIERO!" ================= */
  const btnWhatsapp = document.getElementById("btn-whatsapp");
  if (btnWhatsapp) {
    btnWhatsapp.addEventListener("click", function (e) {
      e.preventDefault();
      let modelo = document.getElementById("tel-nombre").textContent;
      let numero = "573143471458"; // número destino
      let mensaje = `Hola, quiero el ${modelo}`;
      let url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
      window.open(url, "_blank");
    });
  }

  /* ================= LISTA DE TELÉFONOS ================= */
  const telefonos = {
    honor: {
      nombre: "Honor",
      descripcion:
        "Descubre los últimos smartphones Honor con gran rendimiento y estilo.",
      video: "videos/honor.mp4",
      banner: "img/banner_honor.png",
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

  const telList = document.querySelector(".device-list");
  const telItems = document.querySelectorAll(".device-list .device-item");
  const upBtn = document.querySelector("#btn-up");
  const downBtn = document.querySelector("#btn-down");

  let currentIndex = 0;
  const itemHeight = telItems[0].offsetHeight + 20; // altura + gap
  const visibleCount = 3; // número de tarjetas visibles

  function updatePhone(index) {
    const item = telItems[index];
    const modelo = item.dataset.modelo;
    const tel = telefonos[modelo];
    if (!tel) return;

    // Actualiza info principal
    document.getElementById("tel-nombre").textContent = tel.nombre;
    document.getElementById("tel-descripcion").textContent = tel.descripcion;
    document.getElementById("tel-video").innerHTML = `
      <video autoplay muted loop playsinline>
        <source src="${tel.video}" type="video/mp4">
      </video>
    `;
    document.getElementById(
      "tel-banner"
    ).style.background = `url('${tel.banner}') center/cover no-repeat`;

    // Clase activa
    telItems.forEach((li) => li.classList.remove("active"));
    item.classList.add("active");

    // Mueve la lista dentro de la ventana
    telList.style.transform = `translateY(-${
      Math.max(0, index - (visibleCount - 1)) * itemHeight
    }px)`;

    // Control flechas
    upBtn.classList.toggle("hidden", index === 0);
    downBtn.classList.toggle("hidden", index >= telItems.length - 1);
  }

  // Eventos flechas
  upBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updatePhone(currentIndex);
    }
  });

  downBtn.addEventListener("click", () => {
    if (currentIndex < telItems.length - 1) {
      currentIndex++;
      updatePhone(currentIndex);
    }
  });

  // Click en tarjeta
  telItems.forEach((item, i) => {
    item.addEventListener("click", () => {
      currentIndex = i;
      updatePhone(currentIndex);
    });
  });

  /* ================= DESTACADOS ================= */
  const categorias = {
    televisores: {
      grande: {
        titulo: 'Samsung 65" LED 4K',
        img: "img/samsung_65.png",
        desc: "Smart TV 4K UHD",
        precio: "COP $2.339.900",
      },
      items: [
        {
          titulo: 'Samsung 50" LED 4K',
          img: "img/samsung_50.png",
          precio: "COP $1.699.900",
        },
        {
          titulo: 'Samsung Neo QLED 65"',
          img: "img/neo_samsung.png",
          precio: "COP $3.999.900",
        },
        {
          titulo: 'Kalley 50" LED',
          img: "img/kalley_50.png",
          precio: "COP $1.199.900",
        },
        {
          titulo: 'LG NanoCell 55"',
          img: "img/nano_cell50.png",
          precio: "COP $2.999.900",
        },
      ],
    },
    laptops: {
      grande: {
        titulo: "HP Laptop 15",
        img: "img/laptop_hp15.png",
        desc: "Intel i5 · 8 GB · 512 SSD",
        precio: "COP $2.999.900",
      },
      items: [
        {
          titulo: "Lenovo V15",
          img: "img/lenovo_v15.png",
          precio: "COP $2.079.900",
        },
        {
          titulo: "Asus Vivobook 14",
          img: "img/asus_vivobook14.png",
          precio: "COP $2.349.900",
        },
        {
          titulo: "MacBook Air M1",
          img: "img/macbook_air.png",
          precio: "COP $6.300.000",
        },
        {
          titulo: "Acer Swift 3",
          img: "img/acer_swift3.png",
          precio: "COP $3.900.000",
        },
      ],
    },
    lavadoras: {
      grande: {
        titulo: "LG 22 kg",
        img: "img/lg_lavadora22.png",
        desc: "Carga Frontal LG",
        precio: "COP $6.661.700",
      },
      items: [
        {
          titulo: "Kalley 14 kg",
          img: "img/kalley_14kg.png",
          precio: "COP $1.800.000",
        },
        {
          titulo: "Samsung Wash",
          img: "img/samsung_lav.png",
          precio: "COP $2.400.000",
        },
        {
          titulo: "LG TurboWash",
          img: "img/lg_turbo.png",
          precio: "COP $4.200.000",
        },
        {
          titulo: "Kalley Básica",
          img: "img/kalley_basic.png",
          precio: "COP $1.300.000",
        },
      ],
    },
    motos: {
      grande: {
        titulo: "Mobuloo Girl 3",
        img: "img/moto_girl3_gris.png",
        desc: "Autonomía entre 40 y 50 km · Velocidad 25–35 km/h · Motor 350W · Carga máxima 130kg",
        precio: "COP $4.200.000",
      },
      items: [
        {
          titulo: "Mobuloo Girl 3 - Blanca",
          img: "img/moto_girl3_blanca.png",
          precio: "COP $4.200.000",
        },
        {
          titulo: "Mobuloo Girl 3 - Negra",
          img: "img/moto_girl3_negra.png",
          precio: "COP $4.200.000",
        },
        {
          titulo: "Mobuloo Girl 3 - Verde",
          img: "img/moto_girl3_verde.png",
          precio: "COP $4.200.000",
        },
        {
          titulo: "Mobuloo Girl 3 - Rosa",
          img: "img/moto_girl3_rosa.png",
          precio: "COP $4.200.000",
        },
      ],
    },
  };

  const menuItems = document.querySelectorAll("#destacados .menu-item");
  const carrusel = document.querySelector("#carrusel-contenido");

  function renderCategoria(catKey) {
    const cat = categorias[catKey];
    if (!cat) return;

    // Animación de salida
    carrusel.style.opacity = 0;
    carrusel.style.transform = "translateY(20px)";

    setTimeout(() => {
      carrusel.innerHTML = `
      <div class="grid-destacados">
        <div class="destacado-grande">
          <img src="${cat.grande.img}" alt="${cat.grande.titulo}">
          <h3>${cat.grande.titulo}</h3>
          <p>${cat.grande.desc}</p>
          <p class="precio-ref">${cat.grande.precio}</p>
          <a href="https://wa.me/573143471458?text=${encodeURIComponent(
            "Hola, quiero comprar el " + cat.grande.titulo
          )}" 
             target="_blank" class="btn-primary">¡Lo quiero!</a>
        </div>
        <div class="destacados-laterales">
          ${cat.items
            .map(
              (i) => `
            <div class="destacado-item">
              <img src="${i.img}" alt="${i.titulo}">
              <h4>${i.titulo}</h4>
              <p class="precio-ref">${i.precio}</p>
              <a href="https://wa.me/573143471458?text=${encodeURIComponent(
                "Hola, quiero comprar el " + i.titulo
              )}" 
                 target="_blank" class="btn-secondary">¡Lo quiero!</a>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;

      // Animación de entrada
      carrusel.style.opacity = 1;
      carrusel.style.transform = "translateY(0)";
    }, 300);
  }

  // Inicial
  let currentCatIndex = 0;
  const catKeys = Object.keys(categorias);
  renderCategoria(catKeys[currentCatIndex]);
  menuItems[currentCatIndex].classList.add("active");

  // Timer autoplay
  let autoplayInterval;
  function startAutoplay() {
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(() => {
      currentCatIndex = (currentCatIndex + 1) % catKeys.length;
      const nextCat = catKeys[currentCatIndex];
      menuItems.forEach((b) => b.classList.remove("active"));
      menuItems[currentCatIndex].classList.add("active");
      renderCategoria(nextCat);
    }, 10000);
  }
  startAutoplay();

  // Eventos click
  menuItems.forEach((item, idx) => {
    item.addEventListener("click", () => {
      menuItems.forEach((b) => b.classList.remove("active"));
      item.classList.add("active");
      currentCatIndex = idx;
      renderCategoria(item.dataset.categoria);

      // Reinicia autoplay si el cliente interactúa
      startAutoplay();
    });
  });

  /* ================= INICIALIZACIÓN ================= */
  // Siempre iniciar en la primera slide
  window.history.scrollRestoration = "manual"; // Desactiva restauración de scroll del navegador
  window.scrollTo(0, 0); // Sube siempre al inicio de la página
  // Animación del contenedor al cargar
  window.addEventListener("load", () => {
    container.classList.add("loaded");
  });
  updateSlide(0);
  updatePhone(currentIndex);
});
