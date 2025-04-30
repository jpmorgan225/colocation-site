document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".cards-container");
    const resultsCount = document.querySelector('.results-count');
    const annonces = JSON.parse(localStorage.getItem("annonces") || "[]");
  
    // Récupérer le mot-clé dans l'URL
    const params = new URLSearchParams(window.location.search);
    const search = (params.get("search") || "").toLowerCase();
  
    // Filtrer les annonces avec le mot-clé dans le quartier, titre ou description
    const filtered = annonces.filter((annonce) => {
      return (
        annonce.quartier.toLowerCase().includes(search) ||
        annonce.titre.toLowerCase().includes(search) ||
        annonce.description.toLowerCase().includes(search)
      );
    });
  
    // Affichage du nombre de résultats
    if (resultsCount) {
      resultsCount.textContent = `${filtered.length} résultat${filtered.length > 1 ? 's' : ''} pour "${search}"`;
    }
  
    // Affichage des cartes filtrées
    container.innerHTML = ""; // Vider les anciennes cartes
    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="no-results">
          <i class="fas fa-search"></i>
          <p>Aucun résultat pour "${search}"</p>
        </div>`;
    } else {
      filtered.forEach((annonce) => {
        const card = document.createElement("article");
        card.classList.add("card");
  
        card.innerHTML = `
          <a href="image/rechcoloca.html?id=${annonce.id}" class="card-link">
            <div class="colocation-card" data-location="${annonce.quartier}">
              <img src="${annonce.image}" alt="Image de la colocation">
              <div class="info">
                <div class="location-price">
                  <span class="location">${annonce.quartier}</span>
                  <span class="price">${annonce.prix} FCFA/mois</span>
                </div>
                <h2 class="card-title">${annonce.titre}</h2>
                <p class="description">${annonce.description}</p>
                <div class="details">${annonce.disponibilite} | ${annonce.type_chambre}</div>
              </div>
            </div>
          </a>
        `;
        container.appendChild(card);
      });
    }
  });
  