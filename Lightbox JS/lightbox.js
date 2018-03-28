const lightboxContent = document.querySelectorAll('.lightbox-img img')[0],
      lightboxImages = document.querySelectorAll('.lightbox-images img');
(function() {
    lightboxImages.forEach(function(img){
        img.addEventListener('click', function(e){
            if (lightboxContent.src == e.target.src) {
                return -1
            }
            lightboxReset()
            lighboxFadeIn()
            lightboxContent.src = e.target.src
            e.target.style.opacity = 0.4      
        })
    })
})();
function lightboxReset() {
    lightboxImages.forEach(function(img){
        img.style.opacity = 1
    })
};
function lighboxFadeIn() {
    lightboxImages.forEach(function(img){
        lightboxContent.classList.add('lightbox-img')
        setTimeout(function(){
            lightboxContent.classList.remove('lightbox-img')
        }, 300) 
    })
};