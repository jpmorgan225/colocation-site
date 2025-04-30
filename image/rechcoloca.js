document.addEventListener('DOMContentLoaded', () => {
  // Récupérer l'ID de l'annonce à partir de l'URL
  const urlParams = new URLSearchParams(window.location.search);
  const annonceId = urlParams.get('id');
  console.log(annonceId);

  // Charger les annonces depuis le localStorage
  const annonces = JSON.parse(localStorage.getItem('annonces') || '[]');
  console.log(annonces);

  // Trouver l'annonce correspondant à l'ID
  const annonce = annonces.find(a => a.id == annonceId); // Comparer avec == car ID est parfois un nombre
  console.log(annonce);

  if (annonce) {
    // Mise à jour des informations principales
    document.querySelector('span[data-field="quartier"]').textContent = annonce.quartier;
    document.querySelector('span[data-field="type_chambre"]').textContent = annonce.type_chambre;
    document.querySelector('span[data-field="disponibilite"]').textContent = annonce.disponibilite;
    document.querySelector('ul[data-field="equipements"]').innerHTML = 
      annonce.equipements.map(eq => `<li>${eq}</li>`).join('');
    
    // Règles de colocation
    const formatBoolean = value => value ? 'Oui' : 'Non';
    const formatList = items => Array.isArray(items) ? items.join('/') : items;

    document.querySelector('span[data-field="fumeur"]').textContent = formatBoolean(annonce.fumeur);
    document.querySelector('span[data-field="animaux"]').textContent = formatBoolean(annonce.animaux);
    document.querySelector('span[data-field="occupation"]').textContent = formatList(annonce.regles?.occupation || []);
    document.querySelector('span[data-field="genre"]').textContent = formatList(annonce.regles?.genre || []);
    document.querySelector('[data-field="numero-display"]').textContent = annonce.num;

    // Ajouter image principale
    const mainImage = document.querySelector('#main-image');
    if (mainImage && annonce.image) {
      mainImage.src = annonce.image;
      mainImage.alt = `Image principale de ${annonce.titre}`;
    }

    // Si l'annonce a des photos supplémentaires
    if (annonce.photos && annonce.photos.length) {
      const galleryContainer = document.querySelector('.gallery .additional-images');
      if (galleryContainer) {
        annonce.photos.forEach(photo => {
          const img = document.createElement('img');
          img.src = photo;
          img.alt = `Photo supplémentaire de ${annonce.titre}`;
          galleryContainer.appendChild(img);
        });
      }
    }
  } else {
    // Gérer le cas où l'annonce n'est pas trouvée
    document.body.innerHTML = '<h1>Annonce non trouvée</h1>';
  }
});
