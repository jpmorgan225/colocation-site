document.getElementById("profilForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Empêche le rechargement de la page

    const formData = new FormData(this);
    const imageFile = formData.get("image");
    const reader = new FileReader();

    // Gestion de l'image (conversion en base64)
    reader.onload = function () {
        const profil = {
            id: Date.now(),
            nom: formData.get("nom"),
            age: formData.get("age"), // Ajout de l'âge
            budget: formData.get("budget"),
            quartiers: formData.get("quartiers").split(",").map(q => q.trim()),
            type_chambre: formData.get("type_chambre"),
            description: formData.get("description"),
            num: formData.get("num"),
            fumeur: formData.get("fumeur") !== null,
            animaux: formData.get("animaux") !== null,
            sexe: formData.getAll("sexe[]"),
            image: reader.result // Ajout de l'image convertie en base64
        };

        // Sauvegarde dans le localStorage
        const profils = JSON.parse(localStorage.getItem("profils") || "[]");
        profils.push(profil);
        localStorage.setItem("profils", JSON.stringify(profils));

        // Affichage d'un message de confirmation
        document.getElementById("confirmation").textContent = "Profil publié avec succès !";
        document.getElementById("confirmation").style.display = "block";

        // Réinitialiser le formulaire
        document.getElementById("profilForm").reset();
    };

    if (imageFile) {
        reader.readAsDataURL(imageFile); // Convertit l'image en base64
    } else {
        alert("Veuillez ajouter une image.");
    }
});
