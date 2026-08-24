
const menu=document.querySelector('.menu'), nav=document.querySelector('.nav-links');
menu?.addEventListener('click',()=>nav?.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>nav?.classList.remove('open')));

const reveal=document.querySelectorAll('.reveal');
const observer=new IntersectionObserver(entries=>{
 entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');observer.unobserve(e.target)}})
},{threshold:.12});
reveal.forEach(e=>observer.observe(e));

const bars=document.querySelectorAll('.bar i');
const barObserver=new IntersectionObserver(entries=>{
 entries.forEach(e=>{if(e.isIntersecting){e.target.style.width=e.target.dataset.width;barObserver.unobserve(e.target)}})
},{threshold:.5});
bars.forEach(b=>barObserver.observe(b));

const sections=[...document.querySelectorAll('main section[id]')];
const links=[...document.querySelectorAll('.nav-links a')];
function activeNav(){
 let current='';
 sections.forEach(s=>{if(scrollY>=s.offsetTop-170)current=s.id});
 links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+current));
}
addEventListener('scroll',activeNav,{passive:true});activeNav();
document.querySelector('[data-year]')?.replaceChildren(new Date().getFullYear());

/* subtle cursor glow on desktop */
if(matchMedia('(pointer:fine)').matches){
 const glow=document.createElement('div');
 glow.style.cssText='position:fixed;width:240px;height:240px;border-radius:50%;pointer-events:none;z-index:-1;opacity:.22;filter:blur(50px);background:linear-gradient(135deg,#6d5dfc,#ef5da8);transform:translate(-50%,-50%);';
 document.body.appendChild(glow);
 addEventListener('mousemove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'});
}


/* Certificate click-to-enlarge preview */
const certificateModal = document.querySelector('#certificateModal');
const certificateModalImage = document.querySelector('#certificateModalImage');
const certificateModalTitle = document.querySelector('#certificateModalTitle');
const certificateCards = document.querySelectorAll('.cert');

function closeCertificateModal(){
 if(!certificateModal) return;
 certificateModal.classList.remove('open');
 certificateModal.setAttribute('aria-hidden','true');
 document.body.classList.remove('certificate-modal-open');
}

certificateCards.forEach(card=>{
 card.setAttribute('tabindex','0');
 card.setAttribute('role','button');
 const openCertificate=()=>{
  const image=card.querySelector('img');
  const title=card.querySelector('h3');
  if(!image || !certificateModalImage) return;
  certificateModalImage.src=image.currentSrc || image.src;
  certificateModalImage.alt=image.alt;
  if(certificateModalTitle) certificateModalTitle.textContent=title?.textContent || '';
  certificateModal.classList.add('open');
  certificateModal.setAttribute('aria-hidden','false');
  document.body.classList.add('certificate-modal-open');
 };
 card.addEventListener('click',openCertificate);
 card.addEventListener('keydown',e=>{
  if(e.key==='Enter' || e.key===' '){e.preventDefault();openCertificate()}
 });
});

document.querySelectorAll('[data-close-certificate]').forEach(el=>el.addEventListener('click',closeCertificateModal));
document.addEventListener('keydown',e=>{if(e.key==='Escape') closeCertificateModal()});
