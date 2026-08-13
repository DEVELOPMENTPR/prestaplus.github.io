  const PHONE = "51967857903";

  function buildLink(msg){
    return `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
  }
  function loanMsg(amount, dias){
    return `Hola, quiero información sobre un préstamo de S/ ${amount} a ${dias} días.`;
  }

  // default CTAs
  const defaultMsg = "Hola, quiero información sobre un préstamo de hasta S/ 2000.";
  ['navCta','heroWsp','phonePill','floatWsp'].forEach(id=>{
    document.getElementById(id).href = buildLink(defaultMsg);
  });

  // extend term button — fixed predetermined message
  document.getElementById('extendWsp').addEventListener('click', ()=>{
    window.open(buildLink("Quiero aumentar mi plazo de pago 1 mes más"), '_blank', 'noopener');
  });

  // hero counter
  const heroCounter = document.getElementById('heroCounter');
  (function animateCounter(){
    const target = 2000, duration = 1300, start = performance.now();
    function step(now){
      const p = Math.min((now-start)/duration, 1);
      const eased = 1 - Math.pow(1-p, 3);
      heroCounter.textContent = Math.round(eased*target).toLocaleString('es-PE');
      if(p<1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  })();

  // float card subtle parallax
  const floatCard = document.getElementById('floatCard');
  window.addEventListener('mousemove', (e)=>{
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    floatCard.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
  });

  // reveal on scroll
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting) entry.target.classList.add('in');
    });
  }, {threshold:0.15});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

  // simulator
  const simAmount = document.getElementById('simAmount');
  const simAmountLabel = document.getElementById('simAmountLabel');
  const plazoBtns = document.querySelectorAll('.plazo-btn');
  const rMonto = document.getElementById('rMonto');
  const rPlazo = document.getElementById('rPlazo');
  const rInteres = document.getElementById('rInteres');
  const rTotal = document.getElementById('rTotal');
  const simWsp = document.getElementById('simWsp');

  let dias = 30, tasa = 0.20;

  function fmt(n){ return 'S/ ' + n.toLocaleString('es-PE', {minimumFractionDigits:2, maximumFractionDigits:2}); }

  function updateSim(){
    const amount = parseInt(simAmount.value, 10);
    simAmountLabel.textContent = 'S/ ' + amount;
    const interes = amount * tasa;
    const total = amount + interes;

    rMonto.textContent = fmt(amount);
    rPlazo.textContent = dias + ' días';
    rInteres.textContent = fmt(interes) + ` (${Math.round(tasa*100)}%)`;
    rTotal.textContent = fmt(total);

    simWsp.href = buildLink(loanMsg(amount, dias));
  }

  simAmount.addEventListener('input', updateSim);
  plazoBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      plazoBtns.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      dias = parseInt(btn.dataset.dias, 10);
      tasa = parseFloat(btn.dataset.tasa);
      updateSim();
    });
  });
  updateSim();
