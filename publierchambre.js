document.getElementById("publicationForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const formData = new FormData(this);
    const reader = new FileReader();
    const imageFile = formData.get("image");
  
    reader.onload = function () {
      const annonce = {
        id: Date.now(),
        titre: formData.get("titre"),
        prix: formData.get("prix"),
        quartier: formData.get("quartier"),
        disponibilite: formData.get("disponibilite"),
        type_chambre: formData.get("type_chambre"),
        description: formData.get("description"),
        num: formData.get("num"),
        image: reader.result, // image en base64
        equipements: formData.getAll("equipements[]"),
        fumeur: formData.get("fumeur") !== null,
        animaux: formData.get("animaux") !== null
      };
  
      const annonces = JSON.parse(localStorage.getItem("annonces") || "[]");
      annonces.push(annonce);
      localStorage.setItem("annonces", JSON.stringify(annonces));
  
      document.getElementById("confirmation").textContent = "Annonce publiée avec succès !";
      document.getElementById("confirmation").style.display = "block";
      document.getElementById("publicationForm").reset();
    };
  
    if (imageFile) {
      reader.readAsDataURL(imageFile); // convertit l’image en base64
    }
  });
  function getNextId() {
    const annonces = JSON.parse(localStorage.getItem("annonces") || "[]");
    const ids = annonces.map(a => a.id);
    const maxId = ids.length ? Math.max(...ids) : 3; // commence à 4
    return maxId + 1;
  }
  document.getElementById("publicationForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const id = getNextId();
    const titre = document.getElementById("text").value;
    const prix = document.getElementById("prix").value;
    const quartier = document.getElementById("quartier").value;
    const disponibilite = document.querySelector("select[name='disponibilité']").value;
    const type_chambre = document.querySelector("select[name='type_chambre']").value;
    const description = document.querySelector("textarea[name='description']").value;
    const image = "image/default.jpg"; // ⚠️ à remplacer par un traitement réel de l'image
  
    const annonce = {
      id,
      titre,
      prix,
      quartier,
      disponibilite,
      type_chambre,
      description,
      image
    };
  
    const annonces = JSON.parse(localStorage.getItem("annonces") || "[]");
    annonces.push(annonce);
    localStorage.setItem("annonces", JSON.stringify(annonces));
  
    // Optionnel : rediriger ou afficher confirmation
    alert("Annonce publiée !");
    window.location.href = "rechcoloc.html";
  });
    
  