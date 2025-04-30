document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const annonceId = parseInt(urlParams.get('id')); // Récupère l'ID depuis l'URL

  // Charger les colocataires depuis localStorage
  const colocataires = JSON.parse(localStorage.getItem('profils') || '[]'); // Récupère les profils sauvegardés

  // Trouver l'annonce correspondant à l'ID
  const annonce = colocataires.find(a => a.id === annonceId);

  if (annonce) {
    // Mise à jour des informations principales
    document.querySelector('h1[data-field="titre"]').textContent = annonce.nom;
    document.querySelector('.description').textContent = annonce.description;

    // Détails de la location
    document.querySelector('[data-field="quartier"]').textContent = annonce.quartiers.join(', ');
    document.querySelector('[data-field="type_chambre"]').textContent = annonce.type_chambre;
    document.querySelector('[data-field="disponibilite"]').textContent = annonce.disponibilite || 'Non spécifié';
    document.querySelector('[data-field="prix"]').textContent = `${annonce.budget.toLocaleString()} FCFA`;
    document.querySelector('[data-field="age"]').textContent = annonce.age || 'Non spécifié';

    // Préférences
    const formatBoolean = value => value ? 'Oui' : 'Non';
    const formatList = items => items.length ? items.join(', ') : 'Non spécifié';

    document.querySelector('[data-field="fumeur"]').textContent = formatBoolean(annonce.fumeur);
    document.querySelector('[data-field="animaux"]').textContent = formatBoolean(annonce.animaux);
    document.querySelector('[data-field="occupation"]').textContent = formatList(annonce.sexe || []);
    document.querySelector('[data-field="genre"]').textContent = formatList(annonce.sexe || []);

    // Numéro de téléphone
    const phoneLink = document.getElementById('phone-link');
    const numFormate = annonce.num.replace(/ /g, '');
    phoneLink.href = `tel:${numFormate}`;
    document.querySelector('[data-field="numero-display"]').textContent = annonce.num;

    // Galerie photo
    const gallery = document.querySelector('.photo-gallery');
    gallery.innerHTML = annonce.image
      ? `<img src="${annonce.image}" alt="Photo de ${annonce.nom}" class="gallery-image">`
      : '<p>Aucune photo disponible.</p>';

  } else {
    // Si aucune annonce correspond à l'ID
    document.body.innerHTML = '<h1 class="error">Profil non trouvé</h1>';
  }
});
