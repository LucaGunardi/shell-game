// Globale variabele om de positie van het balletje bij te houden
let balletjePositie;

// Deze functie wordt geactiveerd wanneer je op spelen klikt
function StartSpel() {
    ToonBalletje();
    setTimeout(schudden, 7000);
}

// Deze functie tilt de bekers op
function tilBekerOp(beker) {
    beker.classList.add("bekeromhoog");
}

// Deze functie laat de beker weer zakken
function laatBekerZak(beker) {
    beker.classList.remove("bekeromhoog");
}

// Deze functie kiest willekeurig een beker, plaatst het balletje eronder en tilt de beker op aan het begin
function ToonBalletje() {
    document.getElementById("startknop").style.pointerEvents = "none";
    balletjePositie = willekeurigGetal(); // Stel de beginpositie van het balletje in
    let beker = document.getElementById(`Cup${balletjePositie}`);

    document
        .getElementById("thimble_ball")
        .setAttribute("class", `beker_en_balletje_positie-${balletjePositie}`);
    beker.classList.add("bekeromhoog");

    setTimeout(function () {
        beker.classList.remove("bekeromhoog");
    }, 4000);

    setTimeout(function () {
        document
            .getElementById("thimble_ball")
            .classList.remove(`beker_en_balletje_positie-${balletjePositie}`);
    }, 4500);
}

// Deze functie reset de CSS-klassen van alle bekers naar standaard
function resetBekerKlassen() {
    document
        .getElementById("Cup0")
        .setAttribute("class", "plasticbeker beker-0");
    document
        .getElementById("Cup1")
        .setAttribute("class", "plasticbeker beker-1");
    document
        .getElementById("Cup2")
        .setAttribute("class", "plasticbeker beker-2");
}

// Deze functie genereert een willekeurig geheel getal tussen 0 en 2
function willekeurigGetal() {
    return Math.floor(Math.random() * 3);
}

// Deze functie start het schudproces
function schudden() {
    mixInterval = setInterval(kiesWillekeurigeBekers, 500);
}

let mixInterval;
let schudTeller = 0;

// Deze functie wisselt willekeurig de posities van twee bekers
function kiesWillekeurigeBekers() {
    let bekerEen = willekeurigGetal();
    let bekerTwee = willekeurigGetal();

    if (bekerEen !== bekerTwee) {
        let beker1 = document.getElementById(`Cup${bekerEen}`);
        let beker2 = document.getElementById(`Cup${bekerTwee}`);

        let beker1Klasse = beker1.getAttribute("class");
        let beker2Klasse = beker2.getAttribute("class");

        beker1.setAttribute("class", beker2Klasse);
        beker2.setAttribute("class", beker1Klasse);

        // Update balletjePositie als het wordt verwisseld
        if (balletjePositie === bekerEen) {
            balletjePositie = bekerTwee;
        } else if (balletjePositie === bekerTwee) {
            balletjePositie = bekerEen;
        }

        schudTeller++;

        if (schudTeller > 15) {
            clearInterval(mixInterval);
            resetBekerKlassen();
            verwijderUitschakeling();
            schudTeller = 0;
        }
    } else {
        kiesWillekeurigeBekers();
    }
}

// Deze functie verwijdert het disabled-attribuut van alle bekers
function verwijderUitschakeling() {
    let bekers = document.getElementsByClassName("plasticbeker");
    for (let i = 0; i < bekers.length; i++) {
        bekers[i].removeAttribute("disabled");
    }
}

// Deze functie voegt het disabled-attribuut toe aan alle bekers
function voegUitschakelingToe() {
    let bekers = document.getElementsByClassName("plasticbeker");
    for (let i = 0; i < bekers.length; i++) {
        bekers[i].setAttribute("disabled", "disabled");
    }
}

// Deze functie wordt geactiveerd wanneer een beker wordt aangeklikt
function selecteerBeker(bekerId) {
    voegUitschakelingToe();
    let winnendeBeker = document.getElementById(`Cup${balletjePositie}`);
    let geselecteerdeBeker = document.getElementById(`${bekerId}`);
    let balletje = document.getElementById("thimble_ball");
    balletje.setAttribute("class", `beker_en_balletje_positie-${balletjePositie}`);
    geselecteerdeBeker.classList.add("bekeromhoog");

    setTimeout(function () {
        if (winnendeBeker !== geselecteerdeBeker) {
            setTimeout(function () {
                geselecteerdeBeker.classList.remove("bekeromhoog");
            }, 2000);
            setTimeout(function () {
                winnendeBeker.classList.remove("bekeromhoog");
            }, 2500);
            alert("Probeer opnieuw");
            document.getElementById("startknop").style.pointerEvents = "all";
        } else {
            alert("Je hebt gewonnen!");
            setTimeout(function () {
                geselecteerdeBeker.classList.remove("bekeromhoog");
            }, 2000);
            setTimeout(function () {
                winnendeBeker.classList.remove("bekeromhoog");
            }, 2500);
            document.getElementById("startknop").style.pointerEvents = "all";
        }
    }, 3500);
}
