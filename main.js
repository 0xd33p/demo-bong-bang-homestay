(function(){
  var html=document.documentElement;
  var meta={
    vi:{title:document.title,desc:document.querySelector('meta[name=description]').content},
    en:{title:'Bống Bang Homestay – Family homestay in Yên Minh, Hà Giang',desc:'Bống Bang Homestay: a stone, wood and earthen-wall house built in 1992 in Nà Mạ village, Yên Minh. 4.9★ from 1,373 Google reviews. Private rooms, dorms, family dinner. Call +84 852 803 803.'}
  };
  function setLang(l){
    document.querySelectorAll('[data-en]').forEach(function(el){
      if(el.dataset.vi===undefined) el.dataset.vi=el.innerHTML;
      el.innerHTML = l==='en'?el.dataset.en:el.dataset.vi;
    });
    document.querySelectorAll('[data-en-alt]').forEach(function(el){
      if(el.dataset.viAlt===undefined) el.dataset.viAlt=el.alt;
      el.alt = l==='en'?el.dataset.enAlt:el.dataset.viAlt;
    });
    html.lang=l; html.classList.toggle('is-en',l==='en');
    document.title=meta[l].title; document.querySelector('meta[name=description]').content=meta[l].desc;
    document.querySelectorAll('.lang button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.lang===l?'true':'false');});
    try{localStorage.setItem('bb-lang',l);}catch(e){}
  }
  var q=new URLSearchParams(location.search).get('lang');
  var saved=null; try{saved=localStorage.getItem('bb-lang');}catch(e){}
  var start=(q==='en'||q==='vi')?q:(saved||'vi');
  if(start!=='vi') setLang(start);
  document.querySelectorAll('.lang button').forEach(function(b){b.addEventListener('click',function(){setLang(b.dataset.lang);});});

  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{rootMargin:'0px 0px -8% 0px'});
    els.forEach(function(el){io.observe(el);});
  } else els.forEach(function(el){el.classList.add('in');});

  var nav=document.querySelector('.nav');
  var onS=function(){nav.classList.toggle('scrolled',window.scrollY>40);};
  window.addEventListener('scroll',onS,{passive:true});onS();

  var lb=document.getElementById('lb'),li=lb.querySelector('img');
  document.querySelectorAll('.g').forEach(function(g){
    g.addEventListener('click',function(){li.src=g.dataset.full;li.alt=g.querySelector('img').alt;lb.hidden=false;document.body.style.overflow='hidden';});
  });
  function close(){lb.hidden=true;li.src='';document.body.style.overflow='';}
  lb.addEventListener('click',function(e){if(e.target!==li)close();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!lb.hidden)close();});
})();
