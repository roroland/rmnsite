const itemNav = document.querySelectorAll('.itemNav li a');
const showFeature = document.querySelector('.showFeature');
let itemNavId = '';
let closeFeature = '';
let cover = '';

itemNav.forEach(function (item) {
  item.onclick = function (e) {
    e.preventDefault();
    itemNavId = this.getAttribute('id');
    getFeature();
  }
});

function getFeature() {
  showFeature.classList.add('show', 'show-' + itemNavId);
  closeFeature = document.querySelector('.contentItem-' + itemNavId + ' .close');
  closeFeature.addEventListener('click', close);
  cover = document.querySelector('.contentItem-' + itemNavId + ' .placeholder');
  setTimeout(coverOut, 3000);
  move();
}

function move() {
  let root = document.documentElement;
  let placeholder = document.querySelector('.contentItem-' + itemNavId + ' .contentItem-text');
  let listener = placeholder.addEventListener(('touchstart', 'touchmove', 'mouseenter', 'mousemove'), e => {
    root.style.setProperty('--xpos', -e.clientX + (placeholder.offsetHeight / 2) + "px");
    root.style.setProperty('--ypos', -e.clientY + (placeholder.offsetHeight / 2) + "px");
  })
  placeholder.removeEventListener(('touchend', 'touchleave', 'mouseout', 'mouseleave'), listener);
}
function coverOut() {
  cover.classList.add('is-active');
}
function close(e) {
  e.preventDefault();
  showFeature.classList.remove('show', 'show-' + itemNavId);
  itemNavId = '';
  cover.classList.remove('is-active');
  clearTimeout(coverOut);
}

