import{mesDonnees} from './data.js';
// console.log(mesDonnees[0][1]); // Affiche data.js

// Initialisation 
let currentItemIndex = 0; // Question en cours
let total = 0; // Calcul moyenne
const longeurTableauQuestion = Object.keys(mesDonnees).length;
document.getElementById("next").style.visibility = "visible";


// Désactiver Ecran (2) question 
document.getElementById("game1").style.display = "none";

// Désactiver / Activer  boutons abc
    const toggleAnswerButtons = (enabled = true) => {
        const buttons = document.querySelectorAll("#a,#b,#c");
        for (const button of buttons) button.disabled = !enabled;
    }

// Désactiver Next par défaut (oblige à répondre pour avoir accès au bouton next)
// function

        const desactivNext = (enabled = true) => {
        const buttonNext = document.getElementById("next");
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
      console.log(Object.keys(mesDonnees).length + " Nombre de questions data.js")
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
        img.src = "/set/img/" + images[index]
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
      // console.log(this.points + " = point reçu"); // point reçu question
      const nbrQ = (Object.keys(mesDonnees).length);//11
      // console.log(nbrQ + " Nombre de questions");

      let tabSum = [this.points,total]; // 1, 0
      // console.log(tabSum+ " tabSum = [point][total]")

      // console.log(tabSum);
      const sum = tabSum[0]+tabSum[1]; // 1 + 0
      // console.log(sum +" tab[0] + tab[1]"); // calcul 1

      tabSum[1]=sum; // 1
      // console.log(sum + "  sum = tabSum[1]"); // 1

      // console.log(tabSum + " tableau des sommes tab[0] + tab[1] "); // 1  -> calcul 1
      // console.log(this.currentItemIndex+1) + " question n° "; // index 1

      const conversionIndexEnCours = parseInt(currentItemIndex+1); // 1,2,3,4 ...
      // console.log(conversionIndexEnCours + " Question n°");

      let affichePourcentage = (sum/conversionIndexEnCours)*100;

      // console.log((sum/conversionIndexEnCours)*100+ " %"); // 1 / 1 = 1 x 100 = 100%
      
      document.getElementById("moyenne").textContent = "Moyenne : " + Math.trunc(affichePourcentage)+ " %";
      document.getElementById("score").textContent = "Moyenne : " + Math.trunc(affichePourcentage)+ " %";
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
  
      // let objectLength = Object.keys(mesDonnees).length; // 3
      this.objectLength = Object.keys(mesDonnees).length
  
      // On crée un tableau contenant le même nombre de question
      let tableauQuestion = []
  
      for (let i = 0; i < this.objectLength; i++) {
        tableauQuestion.push(i)
        // console.log(tableauQuestion);
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
  
  // **********************************************************************************************
  let chargerTableau = new CreateArrayQuestion(mesDonnees);
  // console.log(chargerTableau.monTableauV()); // OK
  // -------------------------------------------------------------------------------
  
  // Cacher écran de GameOver
  document.getElementById("ecranfin").style.display = "none";
  
  // Lancer le jeu par un bouton
  function game() {
    let play = document.getElementById("game");
    play.onclick = StartGame // quand clique on lance la fonction StartGame();
  }

  // --------
  game() // Activer function

  function StartGame() {

    //  Désactiver écran intro du jeu
    document.getElementById("containIntro").style.display = "none";

    this.mesD = chargerTableau.monTableauV()
    new MyQuestionInterface(currentItemIndex, this.mesD)
  
    // Afficher le quiz CSS
    let afficheGame1 = document.getElementById("game1")
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
      // console.log(id); // tableau mélangé b,c,a
  
      // Mélanger les questions et inverser
      const tableauId = id.reverse()
      // console.log(tableauId + " : 2ème Mélange abc "); // tableau mélangé b,c,a
  
      this.tableauId = tableauId // this (b,c,a)
      // console.log(this.tableauId);
    }
  
    bonneReponseId() {
      // const indice = this.tableauId.findIndex((monIndex) => monIndex == "a")
      // console.log(this.tableauId[0]); // b... premier index b,c,a
      this.indice = ["a","b","c"].indexOf(this.tableauId[0]); // a = 0,1 ou 2
      return [this.indice, this.mesD[this.currentItemIndex], this.currentItemIndex];
    }
  
    afficheLaQuestion() {

        // Afficher de 1 à x 
        if(currentItemIndex>=nombreQuestionMax){
          document.getElementById("points").textContent = " Question n° "+ parseInt(currentItemIndex-1) + " / " + longeurTableauQuestion;
        } else {
          document.getElementById("points").textContent = " Question n° "+ parseInt(currentItemIndex+1) + " / " + longeurTableauQuestion;
        }
      
      // Réinitialisation des 3 boutons après chaque question getId
      document.getElementById("response").textContent = "";
      
      // ----- activer boutons
      toggleAnswerButtons(true);
  
      // Cacher l'image de l'intro
      let cacheDiv = document.getElementById("boutonPLay")
      cacheDiv.style.display = "none"
  
      // console.log(this.mesD + " /  mon mesD"); // 1er tour ok, 2eme = index error !
      this.currentItemIndex = currentItemIndex;
  
      // console.log(this.currentItemIndex + " Index (question +1 ) en cours ! "); // 0
      // console.log(this.tableauId + " : Série abc mélangée (186)");
  
      let tableauQuestion = this.mesD[this.currentItemIndex] // 6,2,8..[0] = 6
  
      // index de la question en cours exemple : 0 : 2, 1 : 8 ...
      // console.log(tableauQuestion + " index de la question n° "+ this.currentItemIndex); //ex: 4 **** NO en next
  
      this.bonneRep = mesDonnees[tableauQuestion][1]
      // console.log("La Bonne réponse est : "+ this.bonneRep); // berger allemand
  

// Ajout fonction sur boutons getId() ------------------------------------

        // Bonne Réponse = le return de la méthode [this.indice, this.mesD[this.currentItemIndex]
        const bonneReponse = this.bonneReponseId();

        const buttons = document.getElementsByClassName("buttonQ"); // Sélection buttons
    
            for (const button of buttons) {
                const id = button.getAttribute("id"); // attribut id
                button.onclick = () => getId(id, bonneReponse, this.currentItemIndex); // ajout onclick avec paramètres id et bonneReponse
            }

// ------------------------------------------------------------

      const imageEssais = document.querySelector("#questionPicture")
      imageEssais.style.backgroundImage = "url(" + "/set/img/" + tableauQuestion + ".jpg" + ")"
  
      // Titre question (ici indentique)
      document.getElementById("question").textContent = mesDonnees[tableauQuestion][0] // Ma question
      // console.log(this.tableauId + "    (abc, bac... )");
  
      // console.log(this.tableauId) // b,c,a
      this.tableauQuestion = tableauQuestion
  
      for (let index = 0; index < 3; index++) {
        // console.log(this.tableauId[index]);
        let maQ = document.getElementById(this.tableauId[index])
        maQ.textContent = mesDonnees[tableauQuestion][index + 1];
        // index(0,1,2) / a,b,c / id c,a,b 
        // console.log(index, ["a", "b", "c"][index], maQ);
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
        // console.log(conversion + "  correspond index = cliqué sur le bouton : A");
  
        toggleAnswerButtons(false); // Désactiver
        if(idC==longeurTableauQuestion-1){desactivNext(false);}else{desactivNext(true)};
        break
  
      case "b":
        conversion = 1 // 1
        // console.log(conversion + " correspond index = cliqué sur le bouton : B")
  
        toggleAnswerButtons(false);
        if(idC==longeurTableauQuestion-1){desactivNext(false);}else{desactivNext(true)};
        
        break
  
      case "c":
        conversion = 2 // 2
        // console.log(conversion + "  correspond index = cliqué sur le bouton : C")
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
          document.getElementById("response").textContent = " Bonne réponse !";

      // LancerAnimation
          // console.log("BONNE réponse lancer Animation");
          lancerAnimation(1); // 1 = vignette verte

          // bonneReponse[0]; // orange buttonQ
          let boutonsOrange=document.getElementsByClassName("buttonQ");
          // console.log(bonneReponse[0] + " bouton bonne réponse"); // Montrer la réponse
          boutonsOrange[bonneReponse[0]].style.backgroundColor = "#3771b7";
                
         
            if(idC==longeurTableauQuestion-1){
              document.getElementById("ecranfin").style.display = "block";
            } // si cliqué et fin des questions

          // --------
          new mespoints(idC,1);

        } else { // Mauvaise réponse
          document.getElementById("response").textContent = mesDonnees[bonneReponse[1]][4];

          let boutonsOrange=document.getElementsByClassName("buttonQ");
          boutonsOrange[bonneReponse[0]].style.backgroundColor = "#3771b7"; // ok
            
          
          if(idC==longeurTableauQuestion-1){
              document.getElementById("ecranfin").style.display = "block";
            } // si cliqué et fin des questions

        // LancerAnimation
        // console.log("Mauvaise réponse lancer Animation");
         lancerAnimation(0); // 0 = vignette rouge

        // --------
          new mespoints(idC,0);
        }

        return bonneReponse;
  }
  

 // *****************************************************************************

 function lancerAnimation(vraiFaux){

  // let vignette = vraiFaux;
  // console.log(vraiFaux + " Dans fonction");

    const a = document.getElementById('trueFalse');
    a.style.visibility = "visible"; // rendre le div visible (hidden)
    a.classList.add('animationDiv'); // ajout de la class qui lance l'animation

      if(vraiFaux==0){
          // console.log("Rond Rouge"); 
          a.style.backgroundImage = "url('../set/img/faux.png')";
        } 
        
        if(vraiFaux==1){
          // console.log("Rond vert"); 
          a.style.backgroundImage = "url('../set/img/vrai.png')";
        } 

}

  // ***************************** Previous / Next  *****************************
  
  let nombreQuestionMax = Object.keys(mesDonnees).length
  
  // --- previous à adpater --------------------------------------------------------------------------------------
  
    // document.getElementById("previous").onmousedown = function getPrevious() {
    //   if (currentItemIndex !== 0) {
    //     currentItemIndex--
    //     // alert(currentItemIndex);
    //     this.mesD = chargerTableau.monTableauV()
    //     new MyQuestionInterface(currentItemIndex, this.mesD) // ******************************
    //   }
    
    //   if (currentItemIndex == 0) {
    //     // Bouton previous inactif
    //     let monBoutonADesactiverP = document.getElementById("previous")
    //     monBoutonADesactiverP.disabled = true
    
    //     // si max question désactive
    //     let monBoutonADesactiverN = document.getElementById("next")
    //     monBoutonADesactiverN.disabled = false
    //   }
    
    //   if (currentItemIndex !== nombreQuestionMax - 1) {
    //     // si max question désactive
    //     let monBoutonADesactiverN = document.getElementById("next")
    //     monBoutonADesactiverN.disabled = false
    //   }
    // }
  

  // --- next --------------------------------------------------------------------------------------
  
  document.getElementById("next").onmousedown = function getNext() {

    const desactVignette = document.getElementById('trueFalse');
    const boutonsOrange=document.getElementsByClassName("buttonQ");
    // console.log(boutonsOrange);

    //retirer la couleur et remettre couleur bouton bleu
          for (let index = 0; index < 3; index++) {
            boutonsOrange[index].style.backgroundColor = "#76a5de";    
          }

    if (currentItemIndex !== nombreQuestionMax) {
      currentItemIndex++

      // Désactiver la vignette vrai ou faux
      desactVignette.style.visibility = "hidden"; // rendre le div visible (hidden)
      desactVignette.classList.remove("animationDiv"); // retirer class


      // this.mesD=chargerTableau.monTableauV()[currentItemIndex]; // index
      this.mesD = chargerTableau.monTableauV()
      // console.log(this.mesD + " tableau mesD 323 CLIC"); // errrrrrrrror
      // console.log(currentItemIndex) + " CLIC Bouton";
  
      new MyQuestionInterface(currentItemIndex, this.mesD)
      // console.log(chargerTableau.monTableauV()); // OK
      // console.log(chargerTableau.monTableauV()[1]); // OK index 
      // console.log(currentItemIndex + " / "+ nombreQuestionMax);
  
      // si fin des questions 
      if (currentItemIndex !== nombreQuestionMax -1) {  
            desactivNext(false);
      }


      else { // Désactive le bouton next quand dernière question
        // console.log("DESACTIVER le bouton NEXT ! ");

        // Cache le bouton next quand dernière question
        document.getElementById("next").style.visibility = "hidden";
        desactivNext(true);

      }
    }
  }



