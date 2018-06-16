document.addEventListener("DOMContentLoaded", function() {
  let imagesContainer = document.getElementsByClassName("carousel__images")[0],
    images = imagesContainer.getElementsByTagName("IMG"),
    arrowRight = document.getElementsByClassName("arrow__next")[0],
    arrowLeft = document.getElementsByClassName("arrow__prev")[0],
    bubblesContainer = document.getElementsByClassName("carousel__bubbles")[0],
    currentImageIndex = 0,
    slideLength = 100,
    bubbles = [];
		
  for (let i = 0; i < images.length; i++) {
    let spanElement = document.createElement("span");
    spanElement.classList.add("bubble");
    bubblesContainer.appendChild(spanElement);
    bubbles.push(spanElement);

    spanElement.addEventListener("click", function () {
      currentImageIndex = i;
      switchImage();
    });
  };

  function switchImage() {
    imagesContainer.style.transform = "translateX(-"+slideLength*currentImageIndex+"%)";
    bubbles.forEach(function (b, i){
      if (i === currentImageIndex) {
        b.classList.add("active");
      } else {
        b.classList.remove("active");
      }
    })
  };

  function nextSlide(){
    currentImageIndex++
    if (currentImageIndex >= images.length) {
      currentImageIndex = 0;
      imagesContainer.style.transform = "translateX(0%)";
    };
    switchImage();
  };

  function prevSlide(){
    currentImageIndex--
    if (currentImageIndex < 0) {
      currentImageIndex = images.length - 1;
      imagesContainer.style.transform = "translateX(-"+slideLength*currentImageIndex+"%)";
    };
    switchImage();
  };
    arrowRight.addEventListener("click", nextSlide);
    arrowLeft.addEventListener("click", prevSlide);
    switchImage();
});

