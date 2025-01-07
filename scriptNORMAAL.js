  // Global variable to track the ball's position
  let balpositie;
  
  // Deze functie gaat aan als de speler op de startknop drukt.
  function StartSpel() {
    ToonBalletje();
    setTimeout(schudden, 7000);
  }
  
  // Deze functie tilt de beker omhoog
  function bekeromhoog(x) { 
    x.classList.add("bekeromhoog");
  }
  
  // Deze functie selecteert een willekeurige beker, zet er een bal onder, en tilt de beker op.
  function ToonBalletje() {
    document.getElementById("startknop").style.pointerEvents = "none";
    balpositie = kiesWillekeurigeBeker(); // Set the ball's initial position
    let beker = document.getElementById(`Bekertje${balpositie}`);
  
    document
      .getElementById("balletje")
      .setAttribute("class", `beker_en_balletje_positie-${balpositie}`);
    beker.classList.add("bekeromhoog");
  
    setTimeout(function () {
      beker.classList.remove("bekeromhoog");
    }, 4000);
    setTimeout(function () {
      document
        .getElementById("balletje")
        .classList.remove(`beker_en_balletje_positie-${balpositie}`);
    }, 4500);
  }
  
  // Deze functie zet de class van de bekers weer naar het oude.
  function resetbekerclass() {
    document
      .getElementById("Bekertje0")
      .setAttribute("class", "plasticbeker beker-0");
    document
      .getElementById("Bekertje1")
      .setAttribute("class", "plasticbeker beker-1");
    document
      .getElementById("Bekertje2")
      .setAttribute("class", "plasticbeker beker-2");
  }
  
  // Deze functie kiest een willekeurige integer tussen 0 en 2
  function kiesWillekeurigeBeker() {
    return Math.floor(Math.random() * 3);
  }
  
  // Deze functie zorgt dat KiesWillekeurigeBekers te werk gaat om de 0,5 seconden.
  function schudden() {
    mix = setInterval(kiesWillekeurigeBekers, 500);
  }
  
  let mix;
  let schudlengte = 0;
  
  // Deze functie verwisselt de class van twee verschillende bekers.
  function kiesWillekeurigeBekers() {
    let BekerI = kiesWillekeurigeBeker();
    let BekerII = kiesWillekeurigeBeker();
  
    if (BekerI !== BekerII) {
      let Beker1 = document.getElementById(`Bekertje${BekerI}`);
      let Beker2 = document.getElementById(`Bekertje${BekerII}`);
  
      let Beker1Class = Beker1.getAttribute("class");
      let Beker2Class = Beker2.getAttribute("class");
  
      Beker1.setAttribute("class", Beker2Class);
      Beker2.setAttribute("class", Beker1Class);
  
      // Dit update de balpositie als het wisselt.
      if (balpositie === BekerI) {
        balpositie = BekerII;
      } else if (balpositie === BekerII) {
        balpositie = BekerI;
      }
  
      schudlengte++;
  
      if (schudlengte > 15) {
        clearInterval(mix);
        resetbekerclass();
        removeOnklikbaar();
        schudlengte = 0;
      }
    } else {
      kiesWillekeurigeBekers();
    }
  }
  
  // Deze functie zet een disabled attribuut aan bij alle bekers, dit zorgt ervoor dat je niet op de bekers kan klikken als het spel gestart is.
  function addOnklikbaar() {
    let addOnk = document.getElementsByClassName("plasticbeker");
    for (let i = 0; i < addOnk.length; i++) {
      addOnk[i].setAttribute("disabled", "disabled");
    }
  }
  
  // Deze functie zet de disabled attribuut weer uit, nu kan je weer klikken op de bekers.
  function removeOnklikbaar() {
    let removeOnk = document.getElementsByClassName("plasticbeker");
    for (let i = 0; i < removeOnk.length; i++) {
      removeOnk[i].removeAttribute("disabled");
    }
  }
  
  
  
  // Deze functie gaat aan als je een beker selecteert.
  function selecteerBeker(x) {
    addOnklikbaar();
    let winnendeBeker = document.getElementById(`Bekertje${balpositie}`);
    let geselecteerdeBeker = document.getElementById(`${x}`);
    let balpos = document.getElementById("balletje");
    balpos.setAttribute("class", `beker_en_balletje_positie-${balpositie}`); // Dit zet een bal onder een beker.
    geselecteerdeBeker.classList.add("bekeromhoog"); // Dit tilt de beker omhoog.
    winnendeBeker.classList.add("bekeromhoog");

    setTimeout(function () {
      if (winnendeBeker !== geselecteerdeBeker) {
        setTimeout(function () {
          geselecteerdeBeker.classList.remove("bekeromhoog");
        }, 2500); // Dit brengt de geselecteerde beker omlaag na 2,5 seconden bij een verloren spel.
        setTimeout(function () {
          winnendeBeker.classList.remove("bekeromhoog");
        }, 2000); // Dit brengt de winnende beker omlaag na 2 seconden bij een verloren spel.
        alert("Try Again");
        document.getElementById("startknop").style.pointerEvents = "all"; // Dit zorgt ervoor dat de startknop opnieuw gedrukt kan worden bij een verloren spel.
      } else {
        alert("You Won");

        setTimeout(function () {
          geselecteerdeBeker.classList.remove("bekeromhoog");
        }, 2500); // Dit brengt de geselecteerde beker omlaag na 2,5 seconden bij een gewonnen spel.
        setTimeout(function () {
          winnendeBeker.classList.remove("bekeromhoog");
        }, 2000); // Dit brengt de winnende beker omlaag na 2 seconden bij een gewonnen spel.
        document.getElementById("startknop").style.pointerEvents = "all"; // Dit zorgt ervoor dat de startknop opnieuw gedrukt kan worden bij een gewonnen spel.
      }
    }, 3500);
  }
  