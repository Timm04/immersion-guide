// Image lightbox with modal functionality
// Works with Material for MkDocs instant navigation (document$ hook).

// Ensure modal exists once
const ensureModal = () => {
    let modal = document.getElementById('imageModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'imageModal';
        modal.className = 'modal';

        const modalImg = document.createElement('img');
        modalImg.className = 'modal-img';
        modalImg.id = 'modalImage';

        modal.appendChild(modalImg);
        document.body.appendChild(modal);
    }
    return modal;
};

const wireImages = () => {
    const modal = ensureModal();
    const modalImg = modal.querySelector('#modalImage');
    const contentImages = document.querySelectorAll('.md-typeset img');

    contentImages.forEach(function(img) {
        img.style.cursor = 'pointer';

        // Avoid duplicate listeners
        img.onclick = function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
            modalImg.alt = this.alt;
            modalImg.className = 'modal-img'; // Reset animation
            document.body.style.overflow = 'hidden';
        };
    });

    modal.onclick = function(e) {
        if (e.target === modal) {
            closeModal();
        }
    };

    document.onkeydown = function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    };

    function closeModal() {
        modalImg.className = 'modal-img modal-img__zoom-out';
        modalImg.addEventListener('animationend', function hideAfterAnimation() {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            modalImg.removeEventListener('animationend', hideAfterAnimation);
        }, { once: true });
    }
};

// Initial load and subsequent instant navigation loads
if (window.document$) {
    window.document$.subscribe(() => {
        wireImages();
    });
} else {
    document.addEventListener('DOMContentLoaded', wireImages);
}
