const lightboxGallery = document.querySelectorAll('.lightbox-gallery img'),
      lightboxLayer = document.querySelector('.lightbox-layer'),
      lightboxContent = document.querySelector('.lightbox-content img'),
      closeLightbox = document.getElementById('close-btn');

(function changeSlide() {
    lightboxGallery.forEach(function(img){
        img.addEventListener('click', function(e) {
            lightboxContent.src = e.target.src
            showLayer()
            closeSlide()
        })
    })
})();
function closeSlide() {
    closeLightbox.addEventListener('click', function(){
        closeLayer()
    })
};
function showLayer() {
    lightboxLayer.style.display = 'block'
};
function closeLayer() {
    lightboxLayer.style.display = 'none'
};