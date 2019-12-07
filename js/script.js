const itemNav = document.querySelectorAll('.itemNav li a');
const itemAnim = document.querySelectorAll('.animatable');
const imgAll = document.querySelectorAll('img');
const imgLazy = document.querySelectorAll('.lazy');
const showFeature = document.querySelector('.showFeature');
const more = document.querySelector('#more');
const closeLink = document.querySelector('.close');

let itemNavId = '';
let closeFeature = '';
let cover = '';
let root = document.documentElement;
let initX = root.style.setProperty('--xpos', 150);
let initY = root.style.setProperty('--ypos', 350);
let sub = document.querySelectorAll('.subMenu li a');

// More about
more.addEventListener('click', function (e) {
  e.preventDefault();
  let moreAbout = document.querySelector('.moreAbout');
  let timeline = document.querySelector('.timeline');
  moreAbout.classList.add('is-open');
  window.scrollTo({
    top: moreAbout.offsetTop * 2,
    behavior: 'smooth',
  })
  this.style.setProperty('display', 'none');
  setTimeout(timeline.classList.add('is-open'), 3000);
});

// Menu
itemNav.forEach(function (item) {
  
  item.onclick = function (e) {
    e.preventDefault();
    if (itemNavId == '') {
      itemNavId = this.getAttribute('id');
      showFeature.scrollIntoView({block: 'center'});
      getFeature();
    } else {
      itemNav.forEach(function (item) {
        item.classList.remove('is-active');
      });
      // itemNavId = this.getAttribute('id');
      // getFeature();
    }
    
    this.classList.toggle('is-active');
    
  }
});

let observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      entry.target.style.animation = `${entry.target.dataset.anim} .75s ${entry.target.dataset.delay} ease-out forwards`;
      observer.unobserve(entry.target);
    } else {
      entry.target.style.animation = 'none';
    }
  })
});

let imgObs = new IntersectionObserver((images) => {
  images.forEach(image => { 
    if (image.intersectionRatio > 0) {
      let obsSrc = image.target.dataset.source;
      image.target.src = obsSrc;
      imgSrc = obsSrc;
      image.target.classList.add('is-active');
      imgObs.unobserve(image.target);
    }
  })
})


imgLazy.forEach(item => {
  imgObs.observe(item);
});

itemAnim.forEach(itm => {
  observer.observe(itm)
});

// Open feature
function getFeature() {
  coverActive = true;
  showFeature.classList.add('show', 'show-' + itemNavId);
  subRun();
  cover = document.querySelector('.contentItem-' + itemNavId + ' .placeholder');
  if (coverActive) {
    setTimeout(function () {
      coverOut();
      coverActive = false;
    }, 1500);
  }
  move();
}

// Move placeholder
function move() {
  wait = false;
  let placeholder = document.querySelector('.contentItem-' + itemNavId + ' .contentItem--wrapper');
  let listener = placeholder.addEventListener(('touchstart', 'touchmove', 'mouseenter', 'mousemove'), e => {
    if (!wait) {
      wait = true;
      root.style.setProperty('--xpos', -e.clientX + (placeholder.offsetHeight / 2) + "px");
      root.style.setProperty('--ypos', -e.clientY + (placeholder.offsetHeight / 2) + "px");
      setTimeout(function () { wait = false; }, 25);
    }
  })
  placeholder.removeEventListener(('touchend', 'touchleave', 'mouseout', 'mouseleave'), listener);
}

// Fade cover for placeholder
function coverOut() {
  cover.classList.add('is-active');
}


// Close feature modal
closeLink.addEventListener('click', close);
function close(e) {
  e.preventDefault();
  showFeature.classList = 'showFeature';
  itemNavId = '';
  cover.classList.remove('is-active');
  initX = root.style.setProperty('--xpos', 150);
  initY = root.style.setProperty('--ypos', 350);
}

// Sub menu
function subRun() {
  sub.forEach(event => {
    event.addEventListener('click', e => {
      e.preventDefault();
      let ph = e.target.parentNode.parentNode.parentNode;
      ph.classList.toggle('placeholder2');
      ph.classList.toggle('placeholder1');
    })
  })
}