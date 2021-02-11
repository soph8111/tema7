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
}

async function hentData() {
    const respons = await fetch(url, options);
    retter = await respons.json();
    visRetter();

    console.log(retter);

    const filterKnapper = document.querySelectorAll("nav button"); // Opretter variablen til knapperne

    filterKnapper.forEach(knap => knap.addEventListener("click", filterRetter)); // sætter eventlistener på alle knapper


    const alleRetter = document.querySelectorAll(".retter");
    const mereInfo = document.querySelectorAll(".mere_info");

    let i = 0;

    // "i"-variablen bruges her til at tælle op på variablen "allArticles"
    for (let i = 0; i < mereInfo.length; i++) {
        mereInfo[i].classList.add('hide');
    }

    alleRetter.forEach(ret => ret.addEventListener("mouseover", hover));
    alleRetter.forEach(ret => ret.addEventListener("mouseout", hoverGone));

}

// Forbindelse til HTML-elementer
const containerMedRetter = document.querySelector(".data-container");
const retterTemplate = document.querySelector("template").content;



function filterRetter() {
    filter = this.dataset.kategori; // Ændre let variablen "filter" efter hvad data-attributten er sat til i HTML
    document.querySelector(".valgt").classList.remove("valgt"); // knappen med klassen "valgt" få fjernet klassen
    this.classList.add("valgt"); // Den nye knap får klassen "valgt"

    visRetter(); // Kør funktionen "visRetter"

    const alleRetter = document.querySelectorAll(".retter");
    const mereInfo = document.querySelectorAll(".mere_info");

    let i = 0;

    // "i"-variablen bruges her til at tælle op på variablen "allArticles"
    for (let i = 0; i < mereInfo.length; i++) {
        mereInfo[i].classList.add('hide');
    }

    alleRetter.forEach(ret => ret.addEventListener("mouseover", hover));
    alleRetter.forEach(ret => ret.addEventListener("mouseout", hoverGone));
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

            klon.querySelector(".laes_mere").addEventListener("click", () => singleView(ret)); // Eventlistener fører til singleview-funktionen

            containerMedRetter.appendChild(klon);
        }
    });
}

function singleView(hvad) {
    location.href = `singleview.html?id=${hvad._id}`;
}

function hover() {
    this.querySelector(".mere_info").classList.remove("hide");
    this.querySelector(".mere_info").classList.remove("hoverGone");
    this.querySelector(".mere_info").classList.add("hover");

}

function hoverGone() {
    this.querySelector(".mere_info").classList.remove("hover");
    this.querySelector(".mere_info").classList.add("hoverGone");

}
