// Finn alle "Legg i handlekurv"-knapper
const kjopKnapper = document.querySelectorAll('.buy-button');

kjopKnapper.forEach(knapp => {
  knapp.addEventListener('click', () => {
    // Finn produktdetaljer-seksjonen (foreldre-elementet)
    const produktDetaljer = knapp.closest('.produkt-detaljer');
    
    if (produktDetaljer) {
      // Hent informasjon om telefonen
      const navn = produktDetaljer.querySelector('.produkt-navn').textContent.trim();
      const prisTekst = produktDetaljer.querySelector('.pris strong').textContent.trim();
      const pris = parseFloat(prisTekst.replace(/[^\d]/g, '')); // fjern "kr" og mellomrom

      // Hent handlekurven fra localStorage (eller lag en tom)
      let kurv = JSON.parse(localStorage.getItem('kurv_v1')) || [];

      // Sjekk om varen allerede finnes i handlekurven
      const eksisterende = kurv.find(v => v.navn === navn);

      if (eksisterende) {
        eksisterende.antall++;
      } else {
        kurv.push({ navn, pris, antall: 1 });
      }

      // Lagre oppdatert handlekurv
      localStorage.setItem('kurv_v1', JSON.stringify(kurv));

      // Gi brukeren beskjed
      alert(`${navn} er lagt til i handlekurven!`);
    }
  });
});
    // Hent handlekurven fra localStorage
const cart = JSON.parse(localStorage.getItem("kurv_v1")) || [];

// Finn seksjonene i dokumentet
const empty = document.querySelector('.empty-state');
const filled = document.querySelector('.filled-state');
const cartDiv = document.getElementById('cart-content');

// Hvis handlekurven er tom - vis tom seksjon
if (cart.length === 0) {
  empty.style.display = "block";
  filled.style.display = "none";
} 
// Hvis handlekurven har varer - vis bestillingsoversikt
else {
  empty.style.display = "none";
  filled.style.display = "block";

  // Bygg opp HTML for hver vare i handlekurven og legge til "x"
  let html = "";
  let total = 0;
  cart.forEach((v, index) => {
    const sum = v.pris * v.antall;
    total += sum;
    html += `
        <div class="cart-item" style="position: relative; color: white; padding: 10px 14px; margin-bottom: 12px; color: white;">
        <button class="fjern-vare" data-index="${index}" aria-label="Fjern" style="position: absolute; top: 5px; right: 400px; background: none; border: none; color: white; font-size: 20px; cursor: pointer;">✖</button>
        <p><strong>${v.navn}</strong></p>
        <p>Pris: ${v.pris} NOK</p>
        <p>Antall: ${v.antall}</p>
        <p>Sum: ${sum} NOK</p>
      </div>
    `;
  });

  // Legg til subtotal nederst
  html += `
  <div style="color: white;">
    <p><strong>Subtotal: ${total} NOK</strong></p>
    <p>Frakt: <strong>Gratis</strong></p>
    <p><strong>Totalt: ${total} NOK</strong></p>
    <button id="checkout-button" class="buy-button" 
            style="margin-top: 10px; color: white; padding: 10px 16px; border: none; border-radius: 8px; cursor: pointer;">
      Kjøp
    </button>
  </div>
`;
  cartDiv.innerHTML = html;

  //Kjøp-knappen på handlekurv-siden
  const buyButton = document.getElementById('checkout-button');
if (buyButton) {
  buyButton.addEventListener('click', () => {
    alert('Takk for bestillingen! Frakt: Gratis.');
    localStorage.removeItem('kurv_v1'); // Tøm handlekurven
    location.href = 'HandleKurv.html'; // Send brukeren til handlekurven etter trykk
  });
}

  // Fjerning av varer
  document.querySelectorAll('.fjern-vare').forEach(knapp => {
    knapp.addEventListener('click', () => {
      const index = Number(knapp.dataset.index);
      const kurv = JSON.parse(localStorage.getItem('kurv_v1')) || [];
      kurv.splice(index, 1); // Fjern en vare
      localStorage.setItem('kurv_v1', JSON.stringify(kurv));
      location.reload(); // Oppdater siden
    });
  });
}
