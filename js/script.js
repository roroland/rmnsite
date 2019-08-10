const itemNav = document.querySelector('.itemNav');
const showFeature = document.querySelector('.showFeature');
const closeFeature = document.getElementById('close');
itemNav.onclick = showAlert;
closeFeature.onclick = close;
function showAlert(e) {
  e.preventDefault();
  showFeature.classList.add('show');
}
function close(e) {
  e.preventDefault();
  showFeature.classList.remove('show');
}