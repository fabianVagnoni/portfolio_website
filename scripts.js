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