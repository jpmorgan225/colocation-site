document.querySelector(".recherche form").addEventListener("submit", function (e) {
  e.preventDefault();
   const normaLize=(str)=> str
   .normalize("NFD")
   .replace(/[\u0300-\u036f]/g, "")
   .toLowerCase()
    .replace(/[^a-z0-9]/g, "-");

  const searchValue = normaLize(document.querySelector(".inputsearch").value.trim());  
  const selectedType = document.querySelector('input[name="type"]:checked').value;

  let targetPage = "";
  // Correction des valeurs de comparaison
  if (selectedType === "location") {
    targetPage = "rechcoloc.html";
  } else if (selectedType === "colocation") {
    targetPage = "rechcolocataire.html";
  }

  if (searchValue) {
    window.location.href = `${targetPage}?search=${encodeURIComponent(searchValue)}`;
  } else {
    window.location.href = targetPage;
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const bt= document.querySelector(".bouton1");
  bt.addEventListener("click", function () {
    window.location.href = "publierchambre.html";
  })
})
document.addEventListener("DOMContentLoaded", function () {
  const bt= document.querySelector(".bouton2");
  bt.addEventListener("click", function () {
    window.location.href = "publierprofil.html";
  })
})