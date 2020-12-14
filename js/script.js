let likes = document.querySelectorAll('.element__caption-like');
for(let i = 0; i < likes.length; i++) {
  likes[i].addEventListener('mouseover', function(){
    if (!likes[i].classList.contains('element__caption-like_active')) {
      likes[i].classList.add('element__caption-like_hover');
    }
  })

  likes[i].addEventListener('mouseout', function(){
    if (likes[i].classList.contains('element__caption-like_hover')) {
      likes[i].classList.remove('element__caption-like_hover');
    }
  })

  likes[i].addEventListener('click', function(){
    likes[i].classList.toggle('element__caption-like_active');
    likes[i].classList.contains('element__caption-like_hover') ?
      likes[i].classList.remove('element__caption-like_hover') :
      likes[i].classList.add('element__caption-like_hover');
  })
}