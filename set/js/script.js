import{mesDonnees} from './data.js';

// Initialisation 
let currentItemIndex = 0; // Question en cours
let total = 0; // Calcul moyenne
const longeurTableauQuestion = Object.keys(mesDonnees).length;
document.querySelector("#next").style.visibility = "visible";


// Désactiver Ecran (2) question 
document.querySelector("#game1").style.display = "none";

// Désactiver / Activer  boutons abc
    const toggleAnswerButtons = (enabled = true) => {
        const buttons = document.querySelectorAll("#a,#b,#c");
        for (const button of buttons) button.disabled = !enabled;
    }

// Désactiver Next par défaut (oblige à répondre pour avoir accès au bouton next)
// function

        const desactivNext = (enabled = true) => {
        const buttonNext = document.querySelector("#next");
        buttonNext.disabled = !enabled;}
    // -----
        desactivNext(false);
  

  // ------------------------------------Preload images----------------------------------------
  
  class Images {
    constructor(mesDonnees, objectLength) {
      this.mesDonnees = mesDonnees
      this.objectLength = objectLength
      this.creationListeImage()
      this.preload()
    }
  
    creationListeImage() {
      // console.log(Object.keys(mesDonnees).length + " Nombre de questions data.js");
      this.objectLength = Object.keys(mesDonnees).length;
  
      let images = [] // tableau des noms des images ["1.jpg","2.jpg","3.jpg"]
  
      for (let i = 0; i < this.objectLength; i++) {
        images.push(i + ".jpg") // Charger les images
        // console.log(images);
      }
  
      return this.objectLength // retourne la longeur
    }
  
    // -------------------------------------------------------------------------------
  
    preload(imageArray, index) {
      index = index || 0 // index = index OU 0
      if (imageArray && imageArray.length > index) {
        let img = new Image()
  
        img.onload = function () {
          preload(imageArray, index + 1)
        }
        img.src = "set/img/" + images[index]
      }
    }
  }
  
  new Images()
  
// -----------------------  points moyenne en % -----------------------------------

class mespoints{

  constructor(currentItemIndex,points){
    this.currentItemIndex=currentItemIndex
    this.points=points;
    this.count();
  }

    count(){
      const nbrQ = (Object.keys(mesDonnees).length);//11

      let tabSum = [this.points,total]; // 1, 0

      // console.log(tabSum);
      const sum = tabSum[0]+tabSum[1]; // 1 + 0

      tabSum[1]=sum; // 1
      const conversionIndexEnCours = parseInt(currentItemIndex+1); // 1,2,3,4 ...
      // console.log(conversionIndexEnCours + " Question n°");

      let affichePourcentage = (sum/conversionIndexEnCours)*100;

      // console.log((sum/conversionIndexEnCours)*100+ " %"); // 1 / 1 = 1 x 100 = 100%
      
      document.querySelector("#moyenne").textContent = "Moyenne : " + Math.trunc(affichePourcentage)+ " %";
      document.querySelector("#score").textContent = "Moyenne : " + Math.trunc(affichePourcentage)+ " %";
      total = sum; // 1 
    }
}

// -----------------------création de mon tableau  -----------------------------------
  
  class CreateArrayQuestion {
    constructor(mesDonnees, mesD, objectLength, monTab, resultat, resultatTableau2) {
      this.mesDonnees = mesDonnees
      this.mesD = mesD
      this.objectLength = objectLength
      this.monTab = monTab
      this.resulat = resultat
      this.resultatTableau2 = resultatTableau2
      this.monTableau()
      this.monTableauV()
    }
  
  // ---------
      monTableau() {
  
      this.objectLength = Object.keys(mesDonnees).length
  
      // On crée un tableau contenant le même nombre de question
      let tableauQuestion = [];
  
      for (let i = 0; i < this.objectLength; i++) {
        tableauQuestion.push(i);

      }
  
      // On mélange les valeurs du tableau
      //(pour éviter de commencer toujours par les mêmes questions)
      function shuffleArray(inputArray) {
        inputArray.sort(() => Math.random() - 0.5);
      }
  
      // Mélanger tableau général
    shuffleArray(tableauQuestion);
      this.mesD = tableauQuestion;
      // console.log(this.mesD); // Bon Tableau
      return this.mesD;
    }
  
    monTableauV() {
      let tableau = this.mesD;
      let resultatTableau2 = [...tableau];
      this.resultatTableau2 = resultatTableau2;
      return this.resultatTableau2;
    }
  }
  

  let chargerTableau = new CreateArrayQuestion(mesDonnees);
  // -------------------------------------------------------------------------------
  
  // Cacher écran de GameOver
  document.querySelector("#ecranfin").style.display = "none";
  
  // Lancer le jeu par un bouton
  function game() {
    let play = document.querySelector("#game");
    play.onclick = StartGame // quand clique on lance la fonction StartGame();
  }

  // --------
  game() // Activer function

  function StartGame() {

    //  Désactiver écran intro du jeu
    document.querySelector("#containIntro").style.display = "none";

    this.mesD = chargerTableau.monTableauV()
    new MyQuestionInterface(currentItemIndex, this.mesD)
  
    // Afficher le quiz CSS
    let afficheGame1 = document.querySelector("#game1")
    afficheGame1.style.display = "block";

  }
  

  // -------------------------------------------------------------------------------
  
  class MyQuestionInterface {
    constructor(currentItemIndex, mesD, bonneRep, tableauId, indice, tableauQuestion, resultatTableau2, tabABC) {
      this.currentItemIndex = currentItemIndex
      this.mesD = mesD
      this.bonneRep = bonneRep
      this.tableauId = tableauId
      this.tableauQuestion = tableauQuestion
      this.resultatTableau2 = resultatTableau2
      this.indice = indice
      this.tabABC = tabABC
      this.melAbc()
      this.afficheLaQuestion()
    }
  
    // ----------------------------------------------------------------------------
  
    melAbc() {
      const id = ["a", "b", "c"]
      // Mélanger les questions 1x
      id.sort(() => Math.random() - 0.5)
  
      // Mélanger les questions et inverser
      const tableauId = id.reverse()
  
      this.tableauId = tableauId // this (b,c,a)
    }
  
    bonneReponseId() {
      this.indice = ["a","b","c"].indexOf(this.tableauId[0]); // a = 0,1 ou 2
      return [this.indice, this.mesD[this.currentItemIndex], this.currentItemIndex];
    }
  
    afficheLaQuestion() {

        const nbrQ = Object.keys(mesDonnees).length-1;
      
        // Afficher de 1 à x 
        if(currentItemIndex>=nombreQuestionMax){
          document.querySelector("#points").textContent = " Question n° "+ parseInt(currentItemIndex-1) + " / " + nbrQ;
        } else {
          document.querySelector("#points").textContent = " Question n° "+ parseInt(currentItemIndex+1) + " / " + nbrQ;
        }
      
      // Réinitialisation des 3 boutons après chaque question getId
      document.querySelector("#response").textContent = "";
      
      // ----- activer boutons
      toggleAnswerButtons(true);
  
      // Cacher l'image de l'intro
      let cacheDiv = document.querySelector("#boutonPLay")
      cacheDiv.style.display = "none"
  
      this.currentItemIndex = currentItemIndex;  
      let tableauQuestion = this.mesD[this.currentItemIndex] // 6,2,8..[0] = 6
      // index de la question en cours exemple : 0 : 2, 1 : 8 ...
      this.bonneRep = mesDonnees[tableauQuestion][1]
  

// Ajout fonction sur boutons getId() ------------------------------------

        const bonneReponse = this.bonneReponseId();

        const buttons = document.getElementsByClassName("buttonQ"); // Sélection buttons
    
            for (const button of buttons) {
                const id = button.getAttribute("id"); // attribut id
                button.onclick = () => getId(id, bonneReponse, this.currentItemIndex); // ajout onclick avec paramètres id et bonneReponse
            }

// ------------------------------------------------------------

      const imageEssais = document.querySelector("#questionPicture")
      imageEssais.style.backgroundImage = "url(" + "set/img/" + tableauQuestion + ".jpg" + ")"
  
      // Titre question (ici identique)
      document.querySelector("#question").textContent = mesDonnees[tableauQuestion][0] // Ma question

      this.tableauQuestion = tableauQuestion
  
      for (let index = 0; index < 3; index++) {
        let maQ = document.getElementById(this.tableauId[index]);//*** */
        maQ.textContent = mesDonnees[tableauQuestion][index + 1];
      }
    }
  }
  
  // ----------------------------------------------------------------------------
  
  function getId(idButton, bonneReponse, idC) { // idButton de cette function = id , bonneReponseId()
    console.log(bonneReponse+" (Bonne réponse / .. / index en cours)");
    let conversion = -1; // converti a,b,c cliqué en chiffre
    
    switch (idButton) {
      case "a":
        conversion = 0 // 0
  
        toggleAnswerButtons(false); // Désactiver
        if(idC==longeurTableauQuestion-1){desactivNext(false);}else{desactivNext(true)};
        break
  
      case "b":
        conversion = 1 // 1
  
        toggleAnswerButtons(false);
        if(idC==longeurTableauQuestion-1){desactivNext(false);}else{desactivNext(true)};
        
        break
  
      case "c":
        conversion = 2 // 2
        if(idC==longeurTableauQuestion-1){desactivNext(false);}else{desactivNext(true)};
        toggleAnswerButtons(false);

        break
  
      default:
        conversion = -1
        alert("Réponse non autorisée");
        desactivNext(false); // Désactiver
    }
  
// Bonne et mauvaise réponse ------------------------------------------------
  
        if (conversion == bonneReponse[0]) { // Bonne réponse
          document.querySelector("#response").textContent = " Bonne réponse !";

      // LancerAnimation
          lancerAnimation(1); // 1 = vignette verte

          let boutonsOrange=document.getElementsByClassName("buttonQ");
          boutonsOrange[bonneReponse[0]].style.backgroundColor = "#3771b7";               
         
            if(idC==longeurTableauQuestion-1){
              document.querySelector("#ecranfin").style.display = "block";
            } // si cliqué et fin des questions

          // --------
          new mespoints(idC,1);

        } else { // Mauvaise réponse
          document.querySelector("#response").textContent = mesDonnees[bonneReponse[1]][4];

          let boutonsOrange=document.getElementsByClassName("buttonQ");
          boutonsOrange[bonneReponse[0]].style.backgroundColor = "#3771b7"; // ok        
          
          if(idC==longeurTableauQuestion-1){
              document.querySelector("#ecranfin").style.display = "block";
            } // si cliqué et fin des questions

        // LancerAnimation
         lancerAnimation(0); // 0 = vignette rouge

        // --------
          new mespoints(idC,0);
        }

        return bonneReponse;
  }
  

 // *****************************************************************************

 function lancerAnimation(vraiFaux){

  const a = document.getElementById('trueFalse');
    a.style.visibility = "visible"; // rendre le div visible (hidden)
    a.classList.add('animationDiv'); // ajout de la class qui lance l'animation

      if(vraiFaux==0){
          a.style.backgroundImage = "url('set/img/faux.png')";
        } 
        
        if(vraiFaux==1){
          a.style.backgroundImage = "url('set/img/vrai.png')";
        } 

}

  // ***************************** Previous / Next  *****************************
  
  let nombreQuestionMax = Object.keys(mesDonnees).length
  
  // --- previous à adpater --------------------------------------------------------------------------------------

  // --- next --------------------------------------------------------------------------------------
  
  document.querySelector("#next").onmousedown = function getNext() {

    const desactVignette = document.querySelector('#trueFalse');
    const boutonsOrange=document.getElementsByClassName("buttonQ");

    //retirer la couleur et remettre couleur bouton bleu
          for (let index = 0; index < 3; index++) {
            boutonsOrange[index].style.backgroundColor = "#76a5de";    
          }

    if (currentItemIndex !== nombreQuestionMax) {
      currentItemIndex++

      // Désactiver la vignette vrai ou faux
      desactVignette.style.visibility = "hidden"; // rendre le div invisible (hidden)
      desactVignette.classList.remove("animationDiv"); // retirer class

      this.mesD = chargerTableau.monTableauV()

      new MyQuestionInterface(currentItemIndex, this.mesD)
  
      // si fin des questions 
      // if (currentItemIndex !== nombreQuestionMax -1) {

        if (currentItemIndex !== nombreQuestionMax-1) {  
      desactivNext(false); //ok
      }


      else { // Désactive le bouton next quand dernière question

        // Cache le bouton next quand dernière question
        document.querySelector("#next").style.visibility = "hidden";
        document.querySelector("#game1").style.visibility = "hidden";

        document.querySelector("#ecranfin").style.display = "block";
        // Ajouter animation classe anim

        desactivNext(true);

      }
    }
  }