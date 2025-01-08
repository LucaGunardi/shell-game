// Deze functie gaat aan als de speler op de startknop drukt.
function StartSpel() {
    // Deze functie laat zien waar de bal is.
    toonBal();
    // Deze functie start de animatie en verplaatst de bal.
    setTimeout(husselen, 1000);
}

// De variabelen die nodig zijn voor deze game.
let winnen;
let mix;
let husselteller = 0;


function toonBal() {
    // Dit blokkeert het klikken op de startknop
    document.getElementById('startknop').style.display = 'none';
    // Dit bepaalt een oorspronkelijke, willekeurige positie.
    winnen = getRandomNumber();
    // Dit wordt nu bij het bijbehorende bekertje gezet met variabele winnen, bijv bekertje2 dus de onder meest rechter beker zit de bal.
    let beker = document.getElementById(`bekertje${winnen}`);
    // Zet de bal in de overeenkomstige positie d.m.v. de class met waarde winnen.
    document.getElementById('balletje').setAttribute("Class", `beker_en_balletje_positie-${winnen}`);
    // Laat de bal zien onder het geselecteerde bekertje.
    beker.classList.add('bekerOmhoog');

    // Laat het bekertje zakken na een tijdsinterval
    setTimeout(function() {
        beker.classList.remove('bekerOmhoog');
    }, 500);
    // Verwijder de bal van de pagina (visueel) na een tijdsinterval
    setTimeout(function() {
        document.getElementById('balletje').classList.remove(`beker_en_balletje_positie-${winnen}`);
    }, 1000);
}

// Deze functie genereert een willekeurig getal.
function getRandomNumber() {
    let random = Math.floor(Math.random() * 3); 
    return random;
}

// Deze functie husselt de bekers op een bepaalde snelheid.
function husselen() {
    mix = setInterval(KiesWillekeurigeBekers, 500);
}

// Deze functie kiest twee bekers uit en wisselt ze om.
function KiesWillekeurigeBekers() {
    // Hier worden twee willekeurige bekers uitgekozen.
    let beker1 = getRandomNumber();
    let beker2 = getRandomNumber();

    // Als ze niet dezelfde beker zijn kan het wisselen beginnen.
    if (beker1 !== beker2) {
        // Dit zijn de gekozen bekers
        let bekerI = document.getElementById(`bekertje${beker1}`);
        let bekerII = document.getElementById(`bekertje${beker2}`);

        // En hier krijgen ze een class toegewezen.
        let beker1class = bekerI.getAttribute('class');
        let beker2class = bekerII.getAttribute('class');

        // Hier worden hun class gewisseld. Dit betekent dat ze verplaatsen.
        bekerI.setAttribute("Class", beker2class);
        bekerII.setAttribute("Class", beker1class);

        // Deze functie kijkt of 1 van de bekers de bal heeft.
        if([beker1, beker2].includes(winnen)) {
            // Zo ja, dan verschuift de bal ook me.
            winnen = beker1 === winnen ? beker2 : beker1;
        }

        // Deze functie zorgt ervoor dat het aantal hussels/wissels toeneemt.
        husselteller++;

        // Bij een bepaald aantal hussels stopt het husselen.
        if (husselteller > 15) {
            clearInterval(mix);
            // En het aantal hussels reset weer terug naar 0.
            husselteller = 0;
            // Hier worden ze weer klikbaar gemaakt, tijdens het husselen mag er niet op worden geklikt.
            removeOnklikbaar();
        }

    } else {
        // Wanneer dezelfde beker is uitgekozen om te wisselen met zichzelf, begint de functie opnieuw.
        KiesWillekeurigeBekers();
    }
}

// Deze functie maakt de bekers tijdens het husselen onklikbaar.
function addOnklikbaar() {
    let add = document.getElementsByClassName("plasticbeker");
    for (let i = 0; i < add.length; i++) {
        add[i].setAttribute('disabled', 'disabled');
    }
}

// Deze functie zorgt ervoor dat na het husselen je weer op de bekers kan klikken.
function removeOnklikbaar() {
    let removed = document.getElementsByClassName("plasticbeker");
    for (let i = 0; i < removed.length; i++) {
        removed[i].removeAttribute('disabled');
    }
}

// Deze functie zorgt ervoor dat je een beker kan kiezen, waarvan jij denkt dat de bal eronder zit.
function selecteerBeker(x) {
    // Dit maakt de bekers klikbaar.
    addOnklikbaar();
    // Dit zoekt de geselecteerde beker die de speler gekozen heeft.
    let geselecteerdeBeker = document.getElementById(`${x}`);
    // Dit kijkt naar onder welke beker de bal zat.
    let winnendeBeker = document.getElementById(`bekertje${winnen}`);
    // Dit zoekt de bal.
    let bal = document.getElementById('balletje');
    // Dit plaatst de bal waar het nu hoort te zijn, dus onder de winnende beker.
    bal.setAttribute("Class", `beker_en_balletje_positie-${winnen}`);
    // Deze tilt de gekozen beker van de speler omhoog.
    geselecteerdeBeker.classList.add("bekerOmhoog");
    

    // Na een tijdje gaat alles terug naar zijn originele positie, hier gaan de bekers onder andere naar beneden.
    setTimeout(function() {
        geselecteerdeBeker.classList.remove("bekerOmhoog");
        winnendeBeker.classList.remove("bekerOmhoog");
        document.getElementById('startknop').style.display = 'block';
        ResetBekerClass();
    }, 1000)
}

// en hier gaan ze terug naar hun originele positie. 
function ResetBekerClass() {
    document.getElementById("bekertje0").setAttribute("Class", 'plasticbeker beker0');
    document.getElementById("bekertje1").setAttribute("Class", 'plasticbeker beker1');
    document.getElementById("bekertje2").setAttribute("Class", 'plasticbeker beker2');
}
