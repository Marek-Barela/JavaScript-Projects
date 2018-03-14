const modalBtn = document.getElementById('modalBtn'),
  closeBtn = document.getElementsByClassName('closeBtn')[0],
  modalLayer = document.getElementById('modalLayer');

  modalBtn.addEventListener('click', function(){
     modalLayer.style.display = "block";
  });

  closeBtn.addEventListener('click', function(){
    modalLayer.style.display = "none";
  });

  window.addEventListener('click', outsideClick);

function outsideClick(e) {
    if(e.target == modalLayer){
        modalLayer.style.display = "none";
    }
};