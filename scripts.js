function toggleMenu() {
    /* target element in webpage & using it */
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburguer-icon");
    menu.classList.toggle('open');
    icon.classList.toggle('open');
}

// Modal functionality for project images and videos
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalVideo = document.getElementById('modalVideo');
    const closeBtn = document.querySelector('.modal-close');
    
    // Get all project images and videos
    const projectImages = document.querySelectorAll('.project-img');
    const projectVideos = document.querySelectorAll('.project-video');
    
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
    
    // Add click event listeners to project images
    projectImages.forEach(function(img) {
        img.addEventListener('click', function() {
            openImageModal(this.src, this.alt);
        });
    });
    
    // Add click event listeners to project videos
    projectVideos.forEach(function(video) {
        video.addEventListener('click', function() {
            const source = video.querySelector('source');
            if (source) {
                openVideoModal(source.src);
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