document.addEventListener("DOMContentLoaded", start);

const url = "https://babushka-dd8a.restdb.io/rest/menu";

const billeder = "https://babushka-dd8a.restdb.io/media/";

const options = {
    headers: {
        'x-apikey': "600ec2fb1346a1524ff12de4"
    }
}

function start() {
    hentdata;
}

async function hentData() {
    const respons = await fetch(url, options);
    const json = await respons.json();
    vis(json);
}

// Forbindelse til HTML-elementer
const containerMedRetter = document.querySelector(".data-container");
const retterTemplate = document.querySelector("template").content;

// Udskriv data loop
function vis(json) {
    console.log(json);

    json.forEach(ret => {
        const klon = retterTemplate.cloneNode(true);
        klon.querySelector("h3").textContent = ret.navn;
        klon.querySelector("img").src = billeder + ret.billede;
        klon.querySelector("p").textContent = ret.pris + ",-";
        klon.querySelector(".kort_beskrivelse").textContent = ret.kortbeskrivelse;
        containerMedRetter.appendChild(klon);
    });
}
