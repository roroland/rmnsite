"use strict";

const itemAnim = document.querySelectorAll('.animatable');
const imgAll = document.querySelectorAll('img');
const imgLazy = document.querySelectorAll('.lazy');
const showFeature = document.querySelector('.showFeature');
const itemDecoAnim = document.querySelectorAll('.itemDecoAnim');
const itemCountry = document.querySelector('.world--container');
const itemCountryContent = document.querySelectorAll('.world--container ul li');



// More about
const more = document.querySelector('#more');
more.addEventListener('click', function (e) {
  e.preventDefault();
  let moreAbout = document.querySelector('.moreAbout');
  let timeline = document.querySelector('.timeline');
  moreAbout.classList.add('is-open');
  this.scrollIntoView({
    block: 'start',
    behavior: 'smooth'
  })
  this.style.setProperty('display', 'none');
  setTimeout(timeline.classList.add('is-open'), 3000);
});

// Menu
const itemNav = document.querySelectorAll('.itemNav > li > a');
itemNav.forEach(function (item) {
  let itemNavId = item.getAttribute('id');
  item.addEventListener('click', function (e) {
    e.preventDefault();
    itemNav.forEach(function (item) {
      item.classList.remove('is-active');
    });
    item.classList.toggle('is-active');
    getFeature(itemNavId);
  });
});

// UI blocks IO
let uiAnimOptions = {
  threshold: 0,
  rootMargin: '-150px 0px'
};
let uiAnim = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = `${entry.target.dataset.anim} .75s ${entry.target.dataset.delay} ease-out forwards`;
      if(entry.target.dataset.duration != null){
        entry.target.style.animation = `${entry.target.dataset.anim} ${entry.target.dataset.duration} ${entry.target.dataset.delay} ease-out forwards`;
      }
      uiAnim.unobserve(entry.target);
    }
    else {
      entry.target.style.animation = 'none';
      return;
    }
  })
}, uiAnimOptions);
itemAnim.forEach(itm => {
  uiAnim.observe(itm)
});
// end

// Country UI

let countryAnimOptions = {
  threshold: 0,
  rootMargin: '50px 0px'
}

let countryAnim = new IntersectionObserver((mispaises, self) => {
  let paises = mispaises.map(pais => {
    if (pais.isIntersecting) {
      self.unobserve(pais.target);
      console.log(pais.target);
      return pais.target;
    }
  });
  let tlmCountry = gsap.timeline({});
  tlmCountry.fromTo(paises, { opacity: 0, scale: .25, rotation: 20, x: 100 }, { duration: 1, opacity: 1, scale: 1, rotation: 0, x: 0, ease: 'power1.out', stagger: 0.5 }, 2);
  tlmCountry.to(paises, { opacity: .5, scale: .85, duration: 2, ease: 'sine.inOut', stagger: .5, yoyo: true, repeat: 10 }, "-=.5");
}, countryAnimOptions);

itemCountryContent.forEach((paises) => {
  countryAnim.observe(paises);
})

// Main deco IO
let decoAnimOptions = {
  threshold: 0.10
}
let decoAnim = new IntersectionObserver((decoitems) => {
  decoitems.forEach(decoitem => {
    if (decoitem.isIntersecting) {
      tlm.resume();
    }
    else {
      tlm.pause();
      return;
    }
  })
}, decoAnimOptions);
itemDecoAnim.forEach(decoItem => {
  decoAnim.observe(decoItem)
});
// end

// Portfolio images IO
let imgAnimOptions = {
  threshold: 0,
  rootMargin: '50px 0px'
};
let imgAnimObs = new IntersectionObserver((images) => {
  images.forEach(image => {
    if (image.isIntersecting) {
      let obsSrc = image.target.dataset.source;
      image.target.src = obsSrc;
      imgSrc = obsSrc;
      image.target.classList.add('is-active');
      imgAnimObs.unobserve(image.target);
    } 
  })
}, imgAnimOptions);
imgLazy.forEach(item => {
  imgAnimObs.observe(item);
});
// end

// Menu wrapper IO
const navWrapper = document.querySelector('.menuTop');
const navWrapperMenu = document.querySelector('.mainNav');

const options = {
  root: document.body.main, 
  threshold: 0
}
function handleIntersection(entries) {
  entries.map((entry) => {
    if (entry.isIntersecting) {
      navWrapperMenu.classList.remove('is-top');
      // console.log('in');
    } else {
      navWrapperMenu.classList.add('is-top');
      // console.log('out');
    }
  });
}

const menuobserver = new IntersectionObserver(handleIntersection, options);
menuobserver.observe(navWrapper);
// end


// Feature
let cover = '';
let coverActive = '';
let root = document.documentElement;
let initX = root.style.setProperty('--xpos', 150);
let initY = root.style.setProperty('--ypos', 350);
let imgSrc = '';

function getFeature(itemNavId) {
  const closeLink = document.querySelector('.close');
  if (itemNavId === 'layout') {
    fetch('./content/layout.html')
    .then(function (response) {
      console.log(response.ok);
      return response.text();
    })
    .then(function (data) {
      document.getElementById('templateLayout').innerHTML = data;
      featureUI(itemNavId, closeLink);
    })
  } else if (itemNavId === 'rwd') {
    fetch('./content/rwd.html')
    .then(function (response) {
      console.log(response.ok);
      return response.text();
    })
    .then(function (data) {
      document.getElementById('templateRwd').innerHTML = data;
      featureUI(itemNavId, closeLink);
    })
  } else if (itemNavId === 'css') {
    fetch('./content/css.html')
    .then(function (response) {
      console.log(response.ok);
      return response.text();
    })
    .then(function (data) {
      document.getElementById('templateCss').innerHTML = data;
      featureUI(itemNavId, closeLink);
    })
  } else if (itemNavId === 'music') {
    fetch('./content/music.html')
    .then(function (response) {
      console.log(response.ok);
      return response.text();
    })
    .then(function (data) {
      document.getElementById('templateMusic').innerHTML = data;
      featureUI(itemNavId, closeLink);
    })
  } else if (itemNavId === 'ui') {
    fetch('./content/ui.html')
    .then(function (response) {
      console.log(response.ok);
      return response.text();
    })
    .then(function (data) {
      document.getElementById('templateUi').innerHTML = data;
      featureUI(itemNavId, closeLink);
    })
  }
}

let featureUI = function (itemNavId, closeLink) {
  coverActive = true;
  showFeature.className = '';
  showFeature.classList.add('showFeature', 'show', 'show-' + itemNavId);
  showFeature.scrollIntoView({block: 'center'});
  cover = document.querySelector('.contentItem-' + itemNavId + ' .placeholder');
  closeLink.addEventListener('click', close);
  
  subRun();
  
  let time = setTimeout(() => {
    coverActive = false;
    if (cover !== null) {
      cover.classList.add('is-active');
    }
    if (coverActive === false && itemNavId !== 'music' && itemNavId !== 'css') {
      clearTimeout(time);
      move(itemNavId);
      console.log('cleared');
    }
  }, 1000);
}

// Move placeholder
function move(itemNavId) {
  let wait = false;
  let placeholder = document.querySelector('.contentItem-' + itemNavId + ' .contentItem--wrapper .placeholder');
  let listener = placeholder.addEventListener(('mouseenter', 'mousemove'), e => {
    if (!wait) {
      wait = true;
      root.style.setProperty('--xpos', -e.clientX + (screen.width - placeholder.offsetWidth)  + "px");
      root.style.setProperty('--ypos', -e.clientY + (screen.height - placeholder.offsetHeight )  + "px");
      setTimeout(function () { wait = false; }, 25);
    }
  })
  placeholder.removeEventListener(('mouseout', 'mouseleave'), listener);
}

// Close feature modal
function close(e) {
  e.preventDefault();
  showFeature.classList = 'showFeature';
  e.itemNavId = '';
  if (cover !== null) {
    cover.classList.remove('is-active');
  }
  initX = root.style.setProperty('--xpos', 150);
  initY = root.style.setProperty('--ypos', 350);
  window.scrollBy(0, -window.innerHeight/2);
}

// Sub menu
function subRun() {
  let sub = document.querySelectorAll('.subMenu > li > a');
  sub.forEach(event => {
    event.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      sub.forEach(anchor => {
        anchor.classList.remove('is-active');
      })
      e.target.classList.add('is-active');
      let ph = e.target.parentNode.parentNode.parentNode;
      ph.classList.toggle('placeholder2');
      ph.classList.toggle('placeholder1');
    }, true)
  })
}

// Gsap interactions - swirl decoration
const tlm = gsap.timeline({});
const decomiddle = document.querySelector('#middle');
const decogrey = document.querySelector('#grey');
const decoredtop = document.querySelector('#redtop');
const decoblue = document.querySelector('#blue');

tlm.pause();

tlm.to(decomiddle, { duration: 10, repeat: -1, translateX: -400, ease: 'power3.inOut', yoyo: true}, 0);
tlm.from(decogrey, { duration: 8, repeat: -1, translateX: -600, ease: 'power4.inOut', yoyo: true}, 1);
tlm.to(decoredtop, { duration: 7, repeat: -1, translateX: -550, ease: 'none', yoyo: true}, -.5);
tlm.from(decoblue, { duration: 8, repeat: -1, translateX: -500, ease: 'power1.inOut', yoyo: true}, 1.5);


// Gsap interactions intro anim
const introLm = gsap.timeline({});
const hero = document.querySelector('.heroText');
const introLines = document.querySelector('.intro--wrapper h3');
const introText = document.querySelector('.intro--wrapper h4');
const mainNav = document.querySelector('.mainNav');

if (window.matchMedia("(min-width: 48em)").matches) {
  introLm.to(hero, { duration: 1, opacity: 1, translateY: 0, ease: 'power2.out' }, 0);
  introLm.to(hero, { duration: 1.5, translateY: -150, ease: 'power2.out' }, "+=3.75");
  introLm.to(introLines, { duration: 3, opacity: 1, ease: 'power2.out' }, "-=1");
  introLm.to(introText, { duration: 2, opacity: 1, ease: 'power2.out' }, "-=2");
  introLm.to(mainNav, { duration: 1, opacity: 1, ease: 'power2.out' }, "-=.5");
  introLm.to(hero, { duration: 1, translateY: -150, css: { borderColor: "#E5E5E5" }, ease: 'power2.out' }, "-=2");
} else {
  introLm.to(hero, { duration: 1, opacity: 1, translateY: 0, ease: 'power2.out' }, 0);
  introLm.to(hero, { duration: 1.5, translateY: 0, ease: 'power2.out' }, "+=3.75");
  introLm.to(introLines, { duration: 3, opacity: 1, ease: 'power2.out' }, "-=1");
  introLm.to(introText, { duration: 2, opacity: 1, ease: 'power2.out' }, "-=2");
  introLm.to(mainNav, { duration: 1, opacity: 1, ease: 'power2.out' }, "-=.5");
  introLm.to(hero, { duration: 1, translateY: 0, css: { borderColor: "#E5E5E5" }, ease: 'power2.out' }, "-=2");
}


