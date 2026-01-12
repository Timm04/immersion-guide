// Image lightbox with modal functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create modal container
    const modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.className = 'modal';
    
    // Create modal image
    const modalImg = document.createElement('img');
    modalImg.className = 'modal-img';
    modalImg.id = 'modalImage';
    
    modal.appendChild(modalImg);
    document.body.appendChild(modal);
    
    // Add click handlers to all images in content
    const contentImages = document.querySelectorAll('.md-typeset img');
    
    contentImages.forEach(function(img) {
        img.style.cursor = 'pointer';
        
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
            modalImg.alt = this.alt;
            modalImg.className = 'modal-img'; // Reset animation
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal when clicking on the background
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
    
    function closeModal() {
        modalImg.className = 'modal-img modal-img__zoom-out';
        // Wait for animation to complete, then hide modal
        modalImg.addEventListener('animationend', function hideAfterAnimation() {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            modalImg.removeEventListener('animationend', hideAfterAnimation);
        }, { once: true });
    }
});
