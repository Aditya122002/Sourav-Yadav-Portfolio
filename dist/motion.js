(() => {
  'use strict';
  const root=document.documentElement;
  const control=document.querySelector('#motion-toggle');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer=matchMedia('(hover: hover) and (pointer: fine)');
  const hero=document.querySelector('.hero');
  const portrait=document.querySelector('.hero-portrait');
  const base=portrait.querySelector('img');
  base.classList.add('portrait-base');
  const color=base.cloneNode();color.className='portrait-color';color.alt='';color.setAttribute('aria-hidden','true');color.removeAttribute('fetchpriority');portrait.append(color);
  const statement=document.querySelector('.statement-section');
  const words=[...statement.querySelectorAll('.statement-word')];
  const targets=[...document.querySelectorAll('.section-heading,.project,.education-column,.approach-column,.approach-step,.perspective-panel,.credential-group-heading,.credential-card,.contact>* ,.work-note')];
  const counters=[...document.querySelectorAll('.hero-facts strong')].filter(el=>/^\d+$/.test(el.textContent.trim())).map(el=>({el,original:el.textContent.trim(),value:Number(el.textContent.trim())}));
  let storedPause=false,frame=0,counterFrame=0,counterTimer=0,countersStarted=false;
  try{storedPause=localStorage.getItem('portfolio-motion')==='paused';}catch{}
  const enabled=()=>root.dataset.motion==='on';
  const clamp=(n,min=0,max=1)=>Math.min(max,Math.max(min,n));
  function finishCounts(){clearTimeout(counterTimer);cancelAnimationFrame(counterFrame);counters.forEach(item=>item.el.textContent=item.original);}
  function countFacts(){
    if(countersStarted||!enabled())return;countersStarted=true;
    const start=performance.now(),duration=1000;
    const tick=now=>{const progress=clamp((now-start)/duration),eased=1-Math.pow(1-progress,3);counters.forEach(item=>item.el.textContent=String(Math.round(item.value*eased)).padStart(item.original.length,'0'));if(progress<1&&enabled())counterFrame=requestAnimationFrame(tick);else finishCounts();};
    counterFrame=requestAnimationFrame(tick);
  }
  function updateScroll(){
    frame=0;
    const rect=statement.getBoundingClientRect();
    const visible=rect.bottom>0&&rect.top<innerHeight;
    statement.classList.toggle('statement-in-view',visible&&enabled());
    const progress=enabled()?clamp((innerHeight*.85-rect.top)/(innerHeight*.65+rect.height*.28)):1;
    words.forEach((word,index)=>word.classList.toggle('is-emphasized',!enabled()||index/words.length<=progress));
    statement.style.setProperty('--statement-progress',progress);
    const heroRect=hero.getBoundingClientRect();
    const heroProgress=enabled()&&finePointer.matches?clamp(-heroRect.top/heroRect.height):0;
    hero.style.setProperty('--hero-scroll',heroProgress);portrait.style.setProperty('--portrait-scroll',(heroProgress*22)+'px');
  }
  function queueScroll(){if(!frame)frame=requestAnimationFrame(updateScroll);}
  function syncMotion(){
    const paused=storedPause||reduced.matches;
    root.dataset.motion=paused?'paused':'on';
    control.textContent=reduced.matches?'Reduced motion ✓':paused?'Resume motion ▷':'Pause motion Ⅱ';
    control.setAttribute('aria-pressed',String(paused));control.disabled=reduced.matches;
    control.setAttribute('aria-label',reduced.matches?'Reduced motion enabled by your device':paused?'Resume animations':'Pause animations');
    if(paused){targets.forEach(el=>el.classList.add('is-visible'));finishCounts();portrait.classList.remove('portrait-hover');}
    document.dispatchEvent(new CustomEvent('portfolio:motionchange',{detail:{paused}}));queueScroll();
  }
  control.addEventListener('click',()=>{storedPause=!storedPause;try{localStorage.setItem('portfolio-motion',storedPause?'paused':'on');}catch{}syncMotion();});
  reduced.addEventListener?.('change',syncMotion);finePointer.addEventListener?.('change',queueScroll);syncMotion();
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}});},{threshold:.08,rootMargin:'0px 0px -25px 0px'});
    targets.forEach((el,index)=>{el.classList.add('reveal');el.style.setProperty('--reveal-delay',(index%2*110)+'ms');if(!enabled())el.classList.add('is-visible');observer.observe(el);});root.classList.add('motion-ready');
    const countObserver=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)&&enabled()){counterTimer=setTimeout(countFacts,1050);countObserver.disconnect();}},{threshold:.4});countObserver.observe(document.querySelector('.hero-facts'));
  }
  document.addEventListener('focusin',event=>event.target.closest?.('.reveal')?.classList.add('is-visible'));
  addEventListener('beforeprint',()=>{targets.forEach(el=>el.classList.add('is-visible'));finishCounts();words.forEach(el=>el.classList.add('is-emphasized'));});
  addEventListener('scroll',queueScroll,{passive:true});addEventListener('resize',queueScroll,{passive:true});updateScroll();
  document.querySelectorAll('[data-reading-for]').forEach(el=>{const article=document.getElementById(el.dataset.readingFor);if(article)el.textContent=Math.max(1,Math.ceil(article.textContent.trim().split(/\s+/).length/200))+' min read';});
  let portraitFrame=0,point;
  portrait.addEventListener('pointermove',event=>{
    if(!enabled()||!finePointer.matches||event.pointerType==='touch')return;
    point={x:event.clientX,y:event.clientY};portrait.classList.add('portrait-hover');
    if(portraitFrame)return;portraitFrame=requestAnimationFrame(()=>{portraitFrame=0;const rect=portrait.getBoundingClientRect(),x=clamp(point.x-rect.left,0,rect.width),y=clamp(point.y-rect.top,0,rect.height);portrait.style.setProperty('--portrait-x',x+'px');portrait.style.setProperty('--portrait-y',y+'px');portrait.style.setProperty('--portrait-dx',((x/rect.width-.5)*8)+'px');portrait.style.setProperty('--portrait-dy',((y/rect.height-.5)*6)+'px');});
  });
  portrait.addEventListener('pointerleave',()=>{cancelAnimationFrame(portraitFrame);portraitFrame=0;portrait.classList.remove('portrait-hover');portrait.style.setProperty('--portrait-dx','0px');portrait.style.setProperty('--portrait-dy','0px');});
  document.querySelectorAll('[data-open-story]').forEach(cover=>{
    const cue=document.createElement('span');cue.className='cover-cue';cue.setAttribute('aria-hidden','true');cue.innerHTML='Read<br>story ↗';cover.append(cue);
    const open=()=>document.getElementById(cover.dataset.openStory).click();cover.addEventListener('click',open);cover.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();open();}});
    let pending=0,point;
    cover.addEventListener('pointermove',event=>{if(!enabled()||!finePointer.matches)return;point={x:event.clientX,y:event.clientY};if(pending)return;pending=requestAnimationFrame(()=>{pending=0;const r=cover.getBoundingClientRect(),x=clamp((point.x-r.left)/r.width),y=clamp((point.y-r.top)/r.height);cover.style.setProperty('--pointer-x',x*100+'%');cover.style.setProperty('--pointer-y',y*100+'%');cover.style.setProperty('--tilt-x',(y-.5)*-3+'deg');cover.style.setProperty('--tilt-y',(x-.5)*4+'deg');});});
    cover.addEventListener('pointerleave',()=>{cancelAnimationFrame(pending);pending=0;['--pointer-x','--pointer-y','--tilt-x','--tilt-y'].forEach(key=>cover.style.removeProperty(key));});
  });
  const steps=[...document.querySelectorAll('.approach-step')];
  function setStep(step,open=true){steps.forEach(row=>{const active=row===step&&open;row.querySelector('.step-toggle').setAttribute('aria-expanded',String(active));row.querySelector('.step-panel').setAttribute('aria-hidden',String(!active));});}
  steps.forEach(step=>{let hoverTimer;const button=step.querySelector('.step-toggle');button.addEventListener('click',()=>{clearTimeout(hoverTimer);setStep(step,button.getAttribute('aria-expanded')!=='true');});step.addEventListener('pointerenter',()=>{if(finePointer.matches&&enabled())hoverTimer=setTimeout(()=>setStep(step),200);});step.addEventListener('pointerleave',()=>clearTimeout(hoverTimer));});
})();
/* Keep normal anchor URLs and browser history while animating section changes. */
(() => {
  const root=document.documentElement;
  let transition;
  let fallbackAnimation;
  let navigationSequence=0;
  function motionEnabled(){return root.dataset.motion==='on'&&!matchMedia('(prefers-reduced-motion: reduce)').matches;}
  document.addEventListener('portfolio:motionchange',event=>{
    if(event.detail.paused){transition?.skipTransition();fallbackAnimation?.cancel();}
  });
  document.addEventListener('click',event=>{
    const link=event.target.closest('a[href^="#"]');
    if(!link||link.classList.contains('skip')||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    const hash=link.getAttribute('href');
    const target=document.getElementById(hash.slice(1));
    if(!target||!target.closest('main'))return;
    event.preventDefault();
    const sequence=++navigationSequence;
    transition?.skipTransition();fallbackAnimation?.cancel();
    const arrive=(smooth=false)=>{
      target.querySelectorAll('.reveal').forEach(el=>el.classList.add('is-visible'));
      target.classList.add('is-visible');
      if(location.hash!==hash)history.pushState(null,'',hash);
      const top=Math.max(0,target.getBoundingClientRect().top+scrollY-94);
      window.scrollTo({top,behavior:smooth?'smooth':'instant'});
      target.setAttribute('tabindex','-1');target.focus({preventScroll:true});
    };
    if(!motionEnabled()){arrive();return;}
    if(document.startViewTransition){
      transition=document.startViewTransition(()=>arrive());
      transition.finished.catch(()=>{});
    }else{
      const content=document.querySelector('main');
      if(!content.animate){arrive(true);return;}
      const outgoing=content.animate([{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-12px)'}],{duration:140,easing:'ease-in',fill:'forwards'});
      fallbackAnimation=outgoing;
      outgoing.finished.catch(()=>{}).then(()=>{
        if(sequence!==navigationSequence)return;
        arrive();outgoing.cancel();
        if(motionEnabled())fallbackAnimation=content.animate([{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}],{duration:420,easing:'cubic-bezier(.2,.7,.2,1)'});
      });
    }
  });
})();

