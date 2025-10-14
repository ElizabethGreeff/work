document.addEventListener("DOMContentLoaded", () => {
    const fadeElements = document.querySelectorAll(".fade-in");

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.2 });

    fadeElements.forEach(el => appearOnScroll.observe(el));

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    document.querySelectorAll('.activity').forEach((el) => observer.observe(el));

    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("show");
        });
    }
    
});

// === IMAGE GALLERY MODAL (multiple sets) ===
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    const closeBtn = document.getElementById("closeModal");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    // Galleries for each bungalow
    const galleries = {
        couples: [
            "images/couples-idea.webp",
            "images/bungalow-inside-1.webp",
            "images/bungalow-outside-2.webp"
        ],
        women: [
            "images/womens-idea.webp",
            "images/bungalow-inside-2.webp",
            "images/bungalow-outside-1.webp"
        ],
        men: [
            "images/mens-idea.webp",
            "images/bungalow-inside-3.webp",
            "images/bungalow-outside-2.webp"
        ]
    };

    let currentGallery = [];
    let currentIndex = 0;

    // Open modal for selected bungalow
    function openModal(galleryName, startIndex = 0) {
        currentGallery = galleries[galleryName];
        currentIndex = startIndex;
        modalImg.src = currentGallery[currentIndex];
        modal.classList.add("show");
        modal.style.display = "flex";
    }

    // Close modal
    function closeModal() {
        modal.classList.remove("show");
        setTimeout(() => (modal.style.display = "none"), 400);
    }

    // Navigation
    function showNext() {
        currentIndex = (currentIndex + 1) % currentGallery.length;
        modalImg.src = currentGallery[currentIndex];
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
        modalImg.src = currentGallery[currentIndex];
    }

    // Click listeners for each bungalow image
    document.querySelectorAll(".card-fade-in img").forEach((img) => {
        const galleryName = img.closest(".card-fade-in").dataset.gallery;
        img.addEventListener("click", () => openModal(galleryName));
    });

    // Button + background listeners
    closeBtn.addEventListener("click", closeModal);
    nextBtn.addEventListener("click", showNext);
    prevBtn.addEventListener("click", showPrev);

    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });
});