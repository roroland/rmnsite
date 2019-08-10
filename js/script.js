const itemNav = document.querySelectorAll('.itemNav li a');
const showFeature = document.querySelector('.showFeature');
const closeFeature = document.getElementById('close');
let itemNavId = '';

closeFeature.onclick = close;
function getFeature() {
  showFeature.classList.add('show', 'show-' + itemNavId);
  alert(itemNavId);
  }
itemNav.forEach(function (item) {
  item.onclick = function (e) {
    e.preventDefault();
    itemNavId = this.getAttribute('id');
    getFeature();
  }
});

function close(e) {
  e.preventDefault();
  showFeature.classList.remove('show', 'show-' + itemNavId);
  itemNavId = '';
}