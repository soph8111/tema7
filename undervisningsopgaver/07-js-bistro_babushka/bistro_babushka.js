document.addEventListener("DOMContentLoaded", start);

const url = "https://babushka-dd8a.restdb.io/rest/menu";

const billeder = "https://babushka-dd8a.restdb.io/media/";

const options = {
    headers: {
        'x-apikey': "600ec2fb1346a1524ff12de4"
    }
}


function start() {
    hentData(); // Kører funktionen "hentData"

    const filterKnapper = document.querySelectorAll("nav button"); // Opretter variablen til knapperne

    filterKnapper.forEach(knap => knap.addEventListener("click", filterRetter)); // sætter eventlistener på alle knapper

}

async function hentData() {
    const respons = await fetch(url, options);
    retter = await respons.json();
    visRetter();

    console.log(retter);
}

// Forbindelse til HTML-elementer
const containerMedRetter = document.querySelector(".data-container");
const retterTemplate = document.querySelector("template").content;



function filterRetter() {
    filter = this.dataset.kategori; // Ændre let variablen "filter" efter hvad data-attributten er sat til i HTML
    document.querySelector(".valgt").classList.remove("valgt"); // knappen med klassen "valgt" få fjernet klassen
    this.classList.add("valgt"); // Den nyee knap får klassen "valgt"

    visRetter(); // Kør funktionen "visRetter"
}

// Opret let variabler - let da dataen ændre sig
let retter;
let filter = "alle";

// Udskriv data loop
function visRetter() {

    containerMedRetter.textContent = ""; //Ryd container inden der kommer frisk indhold

    retter.forEach(ret => {
        console.log("Kategori: ", ret.kategori);
        // Loop igennem retter
        if (filter == ret.kategori || filter == "alle") {
            const klon = retterTemplate.cloneNode(true);
            klon.querySelector("h3").textContent = ret.navn;
            klon.querySelector("img").src = billeder + ret.billede;
            klon.querySelector("p").textContent = ret.pris + ",-";
            klon.querySelector(".kort_beskrivelse").textContent = ret.kortbeskrivelse;

            containerMedRetter.appendChild(klon);
        }
    });
}
