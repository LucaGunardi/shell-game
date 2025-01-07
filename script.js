    
  // Global variable to track the ball's position
  let ballPosition;
  
  // This function triggers when you click play
  function StartGame() {
    Showball();
    setTimeout(shuffling, 7000);
  }
  
  // This function lifts the thimbles
  function bekeromhoog(x) {
    x.classList.add("bekeromhoog");
  }
  
  // This function puts the thimble down
  function thimbledown(x) {
    x.classList.remove("bekeromhoog");
  }
  
  // This function selects one thimble at random, positions the ball under it, and lifts it at the beginning
  function Showball() {
    document.getElementById("startknop").style.pointerEvents = "none";
    ballPosition = getRandNum(); // Set the ball's initial position
    let thimb = document.getElementById(`Cup${ballPosition}`);
  
    document
      .getElementById("thimble_ball")
      .setAttribute("class", `beker_en_balletje_positie-${ballPosition}`);
    thimb.classList.add("bekeromhoog");
  
    setTimeout(function () {
      thimb.classList.remove("bekeromhoog");
    }, 4000);
    setTimeout(function () {
      document
        .getElementById("thimble_ball")
        .classList.remove(`beker_en_balletje_positie-${ballPosition}`);
    }, 4500);
  }
  
  // This function resets the class of all the thimbles to default
  function resetthimbclass() {
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
  
  // This function picks a random integer from 0-2
  function getRandNum() {
    return Math.floor(Math.random() * 3);
  }
  
  // This function runs pickrandcups function after every 0.5 seconds
  function shuffling() {
    mix = setInterval(PickRandCups, 500);
  }
  
  let mix;
  let shufflecounter = 0;
  
  // This function interchanges the classes of two thimbles
  function PickRandCups() {
    let Cone = getRandNum();
    let Ctwo = getRandNum();
  
    if (Cone !== Ctwo) {
      let Cupone = document.getElementById(`Cup${Cone}`);
      let Cuptwo = document.getElementById(`Cup${Ctwo}`);
  
      let CuponeClass = Cupone.getAttribute("class");
      let CuptwoClass = Cuptwo.getAttribute("class");
  
      Cupone.setAttribute("class", CuptwoClass);
      Cuptwo.setAttribute("class", CuponeClass);
  
      // Update ballPosition if it is swapped
      if (ballPosition === Cone) {
        ballPosition = Ctwo;
      } else if (ballPosition === Ctwo) {
        ballPosition = Cone;
      }
  
      shufflecounter++;
  
      if (shufflecounter > 15) {
        clearInterval(mix);
        resetthimbclass();
        removedisabled();
        shufflecounter = 0;
      }
    } else {
      PickRandCups();
    }
  }
  
  // This function removes the disabled attribute from all thimbles
  function removedisabled() {
    let removedis = document.getElementsByClassName("plasticbeker");
    for (let i = 0; i < removedis.length; i++) {
      removedis[i].removeAttribute("disabled");
    }
  }
  
  // This function adds the disabled attribute to all thimbles
  function adddisabled() {
    let addis = document.getElementsByClassName("plasticbeker");
    for (let i = 0; i < addis.length; i++) {
      addis[i].setAttribute("disabled", "disabled");
    }
  }
  
  // This function triggers when you click on a thimble
  function selectthimble(x) {
    adddisabled();
    let winningthimble = document.getElementById(`Cup${ballPosition}`);
    let selectedthimble = document.getElementById(`${x}`);
    let ballpos = document.getElementById("thimble_ball");
    ballpos.setAttribute("class", `beker_en_balletje_positie-${ballPosition}`); // Set the ball position under the selected thimble
    selectedthimble.classList.add("bekeromhoog"); // Lift the selected thimble up
  
    setTimeout(function () {
      if (winningthimble !== selectedthimble) {
        setTimeout(function () {
          selectedthimble.classList.remove("bekeromhoog");
        }, 2000); // Bring the selected thimble down after 2 secs
        setTimeout(function () {
          winningthimble.classList.remove("bekeromhoog");
        }, 2500); // Bring the winning thimble down after 2.5 secs
        alert("Try Again");
        document.getElementById("startknop").style.pointerEvents = "all"; // Make the play button clickable again
      } else {
        alert("You Won");
        setTimeout(function () {
          selectedthimble.classList.remove("bekeromhoog");
        }, 2000); // Bring the selected thimble down after 2 secs
        setTimeout(function () {
          winningthimble.classList.remove("bekeromhoog");
        }, 2500); // Bring the winning thimble down after 2.5 secs
        document.getElementById("startknop").style.pointerEvents = "all"; // Make the play button clickable again
      }
    }, 3500);
  }
  