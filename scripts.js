function toggleMenu() {
    /* target element in webpage & using it */
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburguer-icon");
    menu.classList.toggle('open');
    icon.classList.toggle('open');
}

// Modal functionality and multimedia navigation
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalVideo = document.getElementById('modalVideo');
    const closeBtn = document.querySelector('.modal-close');
    
    // Get all project media elements
    const projectMedia = document.querySelectorAll('.project-media');
    
    // Handle multimedia menu navigation
    const mediaMenus = document.querySelectorAll('.media-menu');
    mediaMenus.forEach(menu => {
        const mediaContainer = menu.parentElement;
        const mediaButtons = menu.querySelectorAll('.media-btn');
        const mediaElements = mediaContainer.querySelectorAll('.project-media');
        
        mediaButtons.forEach((button, index) => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons and media
                mediaButtons.forEach(btn => btn.classList.remove('active'));
                mediaElements.forEach(media => {
                    media.classList.remove('active');
                    media.style.display = 'none';
                    if (media.tagName.toLowerCase() === 'video') {
                        media.pause();
                    }
                });
                
                // Add active class to clicked button and corresponding media
                button.classList.add('active');
                mediaElements[index].classList.add('active');
                mediaElements[index].style.display = 'block';
            });
        });
    });
    
    // Function to open modal with image
    function openImageModal(src, alt) {
        modal.style.display = 'block';
        modalImage.src = src;
        modalImage.alt = alt;
        modalImage.style.display = 'block';
        modalVideo.style.display = 'none';
        modalVideo.pause(); // Pause any playing video
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    // Function to open modal with video
    function openVideoModal(src) {
        modal.style.display = 'block';
        modalVideo.src = src;
        modalVideo.style.display = 'block';
        modalImage.style.display = 'none';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    // Function to close modal
    function closeModal() {
        modal.style.display = 'none';
        modalImage.src = '';
        modalVideo.src = '';
        modalVideo.pause();
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
    
    // Add click event listeners to project media
    projectMedia.forEach(function(media) {
        media.addEventListener('click', function() {
            if (media.tagName.toLowerCase() === 'img') {
                openImageModal(media.src, media.alt);
            } else if (media.tagName.toLowerCase() === 'video') {
                const source = media.querySelector('source');
                if (source) {
                    openVideoModal(source.src);
                }
            }
        });
    });
    
    // Close modal when clicking the X button
    closeBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking on the background (but not on the content)
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
});

// Carousel functionality
let currentSlide = 0;

function getCarouselSettings() {
    const isMobile = window.innerWidth <= 600;
    const totalProjects = document.querySelectorAll('.project-slide').length;
    
    return {
        slideWidth: isMobile ? 100 : 50, // 100% width on mobile, 50% on desktop
        totalSlides: isMobile ? totalProjects : Math.max(1, totalProjects - 1), // On mobile: all projects, on desktop: positions to show all
        projectsPerView: isMobile ? 1 : 2,
        totalProjects: totalProjects
    };
}

function moveCarousel(direction) {
    const carousel = document.querySelector('.projects-carousel');
    const settings = getCarouselSettings();
    
    currentSlide += direction;
    
    // Handle boundaries
    if (currentSlide < 0) {
        currentSlide = settings.totalSlides - 1;
    } else if (currentSlide >= settings.totalSlides) {
        currentSlide = 0;
    }
    
    // Apply transform
    // On desktop: slideWidth is 50% (one project width)
    // On mobile: slideWidth is 100% (one project width)
    const translateX = -currentSlide * settings.slideWidth;
    carousel.style.transform = `translateX(${translateX}%)`;
    
    // Update indicators
    updateIndicators();
}

function goToSlide(slideIndex) {
    const settings = getCarouselSettings();
    if (slideIndex >= 0 && slideIndex < settings.totalSlides) {
        currentSlide = slideIndex;
        const carousel = document.querySelector('.projects-carousel');
        const translateX = -currentSlide * settings.slideWidth;
        carousel.style.transform = `translateX(${translateX}%)`;
        updateIndicators();
    }
}

function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    const settings = getCarouselSettings();
    const isMobile = window.innerWidth <= 600;
    
    indicators.forEach((indicator, index) => {
        if (isMobile) {
            // Mobile: show indicators for all projects
            if (index < settings.totalProjects) {
                indicator.style.display = 'block';
                indicator.classList.toggle('active', index === currentSlide);
            } else {
                indicator.style.display = 'none';
            }
        } else {
            // Desktop: show indicators for carousel positions
            if (index < settings.totalSlides) {
                indicator.style.display = 'block';
                indicator.classList.toggle('active', index === currentSlide);
            } else {
                indicator.style.display = 'none';
            }
        }
    });
}

function initializeCarousel() {
    const settings = getCarouselSettings();
    currentSlide = Math.min(currentSlide, settings.totalSlides - 1);
    const carousel = document.querySelector('.projects-carousel');
    const translateX = -currentSlide * settings.slideWidth;
    carousel.style.transform = `translateX(${translateX}%)`;
    updateIndicators();
}

// Auto-play carousel (optional - uncomment if desired)
/*
setInterval(() => {
    moveCarousel(1);
}, 5000); // Move every 5 seconds
*/

// Handle keyboard navigation for carousel
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        moveCarousel(-1);
    } else if (e.key === 'ArrowRight') {
        moveCarousel(1);
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    initializeCarousel();
    // Small delay to ensure layout changes are complete
    setTimeout(equalizeProjectHeights, 100);
});

// Function to equalize project container heights
function equalizeProjectHeights() {
    const projectContainers = document.querySelectorAll('#projects .details-container');
    
    // Reset heights first
    projectContainers.forEach(container => {
        container.style.height = 'auto';
    });
    
    // Small delay to ensure tech stack elements are fully rendered
    setTimeout(() => {
        // Get the maximum height
        let maxHeight = 0;
        projectContainers.forEach(container => {
            const height = container.offsetHeight;
            if (height > maxHeight) {
                maxHeight = height;
            }
        });
        
        // Apply the maximum height to all containers
        projectContainers.forEach(container => {
            container.style.height = maxHeight + 'px';
        });
    }, 50);
}

// Initialize carousel on page load
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure all elements are loaded
    setTimeout(() => {
        initializeCarousel();
        equalizeProjectHeights();
    }, 100);
});