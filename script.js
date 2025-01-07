    // Pre-loader
window.addEventListener("load", () => {
    const preloader = document.querySelector(".preloader");
    preloader.classList.add("preload-finish");
  });
  
  // Global variable to track the ball's position
  let ballPosition;
  
  // This function triggers when you click play
  function StartGame() {
    Showball();
    setTimeout(shuffling, 7000);
  }
  
  // This function lifts the thimbles
  function thimbleup(x) {
    x.classList.add("thimbleup");
  }
  
  // This function puts the thimble down
  function thimbledown(x) {
    x.classList.remove("thimbleup");
  }
  
  // This function selects one thimble at random, positions the ball under it, and lifts it at the beginning
  function Showball() {
    document.getElementById("Playbutton").style.pointerEvents = "none";
    ballPosition = getRandNum(); // Set the ball's initial position
    let thimb = document.getElementById(`Cup${ballPosition}`);
  
    document
      .getElementById("thimble_ball")
      .setAttribute("class", `thimble_ball_position-${ballPosition}`);
    thimb.classList.add("thimbleup");
  
    setTimeout(function () {
      thimb.classList.remove("thimbleup");
    }, 4000);
    setTimeout(function () {
      document
        .getElementById("thimble_ball")
        .classList.remove(`thimble_ball_position-${ballPosition}`);
    }, 4500);
  }
  
  // This function resets the class of all the thimbles to default
  function resetthimbclass() {
    document
      .getElementById("Cup0")
      .setAttribute("class", "sewing_thimble thimble-0");
    document
      .getElementById("Cup1")
      .setAttribute("class", "sewing_thimble thimble-1");
    document
      .getElementById("Cup2")
      .setAttribute("class", "sewing_thimble thimble-2");
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
    let removedis = document.getElementsByClassName("sewing_thimble");
    for (let i = 0; i < removedis.length; i++) {
      removedis[i].removeAttribute("disabled");
    }
  }
  
  // This function adds the disabled attribute to all thimbles
  function adddisabled() {
    let addis = document.getElementsByClassName("sewing_thimble");
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
    ballpos.setAttribute("class", `thimble_ball_position-${ballPosition}`); // Set the ball position under the selected thimble
    selectedthimble.classList.add("thimbleup"); // Lift the selected thimble up
  
    setTimeout(function () {
      if (winningthimble !== selectedthimble) {
        setTimeout(function () {
          selectedthimble.classList.remove("thimbleup");
        }, 2000); // Bring the selected thimble down after 2 secs
        setTimeout(function () {
          winningthimble.classList.remove("thimbleup");
        }, 2500); // Bring the winning thimble down after 2.5 secs
        alert("Try Again");
        document.getElementById("Playbutton").style.pointerEvents = "all"; // Make the play button clickable again
      } else {
        alert("You Won");
        setTimeout(function () {
          selectedthimble.classList.remove("thimbleup");
        }, 2000); // Bring the selected thimble down after 2 secs
        setTimeout(function () {
          winningthimble.classList.remove("thimbleup");
        }, 2500); // Bring the winning thimble down after 2.5 secs
        document.getElementById("Playbutton").style.pointerEvents = "all"; // Make the play button clickable again
      }
    }, 3500);
  }
  