const itemNav = document.querySelectorAll('.itemNav li a');
const showFeature = document.querySelector('.showFeature');
const closeFeature = document.getElementById('close');
let itemNavId = '';

closeFeature.onclick = close;
function getFeature() {
  showFeature.classList.add('show', 'show-' + itemNavId);
}
itemNav.forEach(function (item) {
  item.onclick = function (e) {
    e.preventDefault();
    itemNavId = this.getAttribute('id');
    getFeature();
    move();
  }
});

function close(e) {
  e.preventDefault();
  showFeature.classList.remove('show', 'show-' + itemNavId);
  itemNavId = '';
}
function move() {
  let root = document.documentElement;
  let placeholder = document.querySelector('.contentItem-text');
  let listener = placeholder.addEventListener(('mouseenter', 'mousemove'), e => {
    root.style.setProperty('--xpos', -e.clientX + (placeholder.offsetHeight/2) + "px");
    root.style.setProperty('--ypos', -e.clientY + (placeholder.offsetHeight/2) + "px");
  })
  placeholder.removeEventListener(('mouseout', 'mouseleave'), listener);
}