'use strict';
const qs = (s, root = document) => root.querySelector(s);
const qsa = (s, root = document) => [...root.querySelectorAll(s)];
qs('#year').textContent = new Date().getFullYear();
const nav = qs('header nav');
qs('.menu-toggle').addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  qs('.menu-toggle').setAttribute('aria-expanded', String(open));
  qs('.menu-toggle').setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  qs('.menu-toggle').textContent = open ? '×' : '☰';
});
qsa('header nav a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open'); qs('.menu-toggle').setAttribute('aria-expanded','false');
  qs('.menu-toggle').setAttribute('aria-label','Open navigation'); qs('.menu-toggle').textContent = '☰';
}));
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => { if(entry.isIntersecting) qsa('header nav a').forEach(a => {
    const active = a.getAttribute('href') === '#' + entry.target.id;
    a.classList.toggle('active',active); if(active) a.setAttribute('aria-current','location'); else a.removeAttribute('aria-current');
  }); });
}, {rootMargin:'-20% 0px -55% 0px'});
qsa('main section[id]').forEach(s => sectionObserver.observe(s));
function updateProgress(){const h=document.documentElement.scrollHeight-innerHeight;qs('.progress').style.width=(h>0?scrollY/h*100:0)+'%';}
addEventListener('scroll',updateProgress,{passive:true});addEventListener('resize',updateProgress);updateProgress();
let storyCategory='all';
function filterStories(){
  const term=qs('#story-search').value.trim().toLowerCase();let count=0;
  qsa('[data-filter]').forEach(b=>{const selected=b.dataset.filter===storyCategory;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',String(selected));});
  qsa('.project').forEach(p=>{const matchesCategory=storyCategory==='all'||p.dataset.categories.split(' ').includes(storyCategory);p.hidden=!matchesCategory||!p.textContent.toLowerCase().includes(term);if(!p.hidden){count++;if(document.documentElement.dataset.motion==='on'&&p.animate)p.animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:350,easing:'ease-out'});}});
  qs('#story-count').textContent=`${count} stor${count===1?'y':'ies'}`;
  qs('.filter-status').textContent=`Showing ${count} matching project stor${count===1?'y':'ies'}`;
  qs('#empty-stories').hidden=count!==0;
}
qsa('[data-filter]').forEach(button=>button.addEventListener('click',()=>{storyCategory=button.dataset.filter;filterStories();}));
qs('#story-search').addEventListener('input',filterStories);
qs('#reset-stories').addEventListener('click',()=>{storyCategory='all';qs('#story-search').value='';filterStories();qs('#story-search').focus();});
function closePortfolioDialog(dialog){
  if(!dialog.open || dialog.dataset.closing==='true') return;
  if(document.documentElement.dataset.motion!=='on' || !dialog.animate){dialog.close();return;}
  dialog.dataset.closing='true';
  const closing=dialog.animate([{opacity:1,transform:'translateY(0) scale(1)'},{opacity:0,transform:'translateY(14px) scale(.985)'}],{duration:180,easing:'ease-in',fill:'forwards'});
  closing.finished.catch(()=>{}).then(()=>{dialog.close();closing.cancel();delete dialog.dataset.closing;});
}
function wireModalEvents(dialog){
  qs('.dialog-close',dialog).addEventListener('click',()=>closePortfolioDialog(dialog));
  dialog.addEventListener('cancel',e=>{e.preventDefault();closePortfolioDialog(dialog);});
  dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));
  dialog.addEventListener('click',e=>{const r=dialog.getBoundingClientRect();if(e.target===dialog&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))closePortfolioDialog(dialog);});
}
function wireDialog(trigger,id){const dialog=qs(id);qs(trigger).addEventListener('click',()=>{dialog.showModal();document.body.classList.add('modal-open');});wireModalEvents(dialog);}
wireDialog('#open-project','#project-dialog');wireDialog('#open-readiness','#readiness-dialog');wireDialog('#open-icu','#icu-dialog');
const tabs=qsa('[role=tab]');
function activateTab(tab){tabs.forEach(t=>{const active=t===tab;t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;qs('#'+t.getAttribute('aria-controls')).hidden=!active;});const panel=qs('#'+tab.getAttribute('aria-controls'));if(document.documentElement.dataset.motion==='on'&&panel.animate){panel.getAnimations().forEach(a=>a.cancel());panel.animate([{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}],{duration:300,easing:'ease-out'});}}
tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>activateTab(tab));tab.addEventListener('keydown',e=>{let i;if(e.key==='ArrowRight')i=(index+1)%tabs.length;else if(e.key==='ArrowLeft')i=(index+tabs.length-1)%tabs.length;else if(e.key==='Home')i=0;else if(e.key==='End')i=tabs.length-1;else return;e.preventDefault();activateTab(tabs[i]);tabs[i].focus();});});
qs('#copy-email').addEventListener('click',async()=>{try{await navigator.clipboard.writeText('Souravyadav122002@gmail.com');qs('#copy-status').textContent='Email copied. Let’s start a conversation.';qs('#copy-email').textContent='Copied ✓';}catch{qs('#copy-status').textContent='Copy this address: Souravyadav122002@gmail.com';}});

const certificateDialog=qs('#certificate-dialog');
qsa('[data-image]').forEach(button=>button.addEventListener('click',()=>{
  qs('#certificate-title').textContent=button.dataset.title;
  qs('#certificate-image').src=button.dataset.image;
  qs('#certificate-image').alt=qs('img',button).alt;
  qs('#certificate-download').href=button.dataset.image;
  certificateDialog.showModal();document.body.classList.add('modal-open');
}));
wireModalEvents(certificateDialog);
