document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const search = params.get('search')?.toLowerCase();

    const cardsContainer = document.querySelector('.cards-container');
    const resultsCount = document.querySelector('.results-count');

    // Fonction pour charger les annonces depuis le localStorage
    const loadAnnonces = () => {
        const annonces = JSON.parse(localStorage.getItem('profils') || '[]'); // Récupère les profils sauvegardés
        let htmlContent = '';

        annonces.forEach(annonce => {
            // Utilisation de l'image du profil ou d'une image par défaut
            const imageSrc = annonce.image ? annonce.image : "image/default.jpg";

            htmlContent += `
                <article class="card">
                    <a href="rechcoloco.html?id=${annonce.id}" class="card-link">
                        <div class="colocation-card" data-location="${annonce.quartiers.join(', ')}">
                            <img src="${imageSrc}" alt="${annonce.nom}, colocataire à ${annonce.quartiers.join(', ')}">
                            <div class="info">
                                <div class="location-price">
                                    <span class="location">${annonce.quartiers.join(', ')}</span>
                                    <span class="price">Budget : ${annonce.budget} FCFA</span>
                                </div>
                                <h2 class="card-title">${annonce.nom}, ${annonce.age || 'âge non spécifié'}</h2>
                                <p class="description">${annonce.description}</p>
                                <div class="details">Type de chambre : ${annonce.type_chambre} | ${annonce.fumeur ? 'Fumeur' : 'Non-fumeur'}</div>
                            </div>
                        </div>
                    </a>
                </article>`;
        });

        cardsContainer.innerHTML = htmlContent || '<p>Aucune annonce disponible pour le moment.</p>';
        resultsCount.textContent = `${annonces.length} profil${annonces.length > 1 ? 's' : ''} trouvés`;
    };

    // Recherche avancée
    const filterAnnonces = (searchTerm) => {
        const cards = document.querySelectorAll('.card');
        let matchCount = 0;

        const normalize = (str) => {
            return str
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "") // Supprime les accents
                .toLowerCase()
                .replace(/['’]/g, "") // Supprime les apostrophes
                .replace(/[^a-z0-9]/g, " ") // Remplace les caractères spéciaux
                .replace(/\s+/g, " ") // Supprime les espaces multiples
                .trim();
        };

        if (searchTerm) {
            const normalizedSearch = normalize(searchTerm);

            cards.forEach(card => {
                const location = normalize(card.querySelector('.location').textContent);
                const description = normalize(card.querySelector('.description').textContent);
                const details = normalize(card.querySelector('.details').textContent);

                const searchContent = `${location} ${description} ${details}`;

                if (searchContent.includes(normalizedSearch)) {
                    card.style.display = 'block';
                    matchCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            // Mise à jour du message des résultats
            resultsCount.textContent = matchCount > 0 
                ? `${matchCount} résultat${matchCount > 1 ? 's' : ''} pour "${search}"`
                : `Aucun résultat pour "${search}"`;

            // Message si aucun résultat
            if (matchCount === 0) {
                cardsContainer.innerHTML = `
                    <div class="no-results">
                        <i class="fas fa-search"></i>
                        <p>Aucun résultat pour "${search}"</p>
                        <small>Vérifiez l'orthographe ou essayez un autre terme</small>
                    </div>`;
            }
        } else {
            // Restaure toutes les cartes si aucune recherche n'est active
            cards.forEach(card => card.style.display = 'block');
            resultsCount.textContent = `${cards.length} profil${cards.length > 1 ? 's' : ''} trouvés`;
        }
    };

    // Charger les annonces au démarrage
    loadAnnonces();

    // Appliquer le filtre si un terme de recherche est présent
    if (search) filterAnnonces(search);
});
