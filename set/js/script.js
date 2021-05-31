import{mesDonnees} from './data.js';
// console.log(mesDonnees[0][1]); // Affiche data.js

var currentItemIndex = 0;
console.log("Index de Départ :" + currentItemIndex);

// ------------------------------------Preload images----------------------------------------

class Images{

        constructor (mesDonnees,objectLength){
            this.mesDonnees=mesDonnees;
            this.objectLength=objectLength;
            this.creationListeImage();
            this.preload();
        }

        creationListeImage(){
            console.log(Object.keys(mesDonnees).length+ " Nombre de questions data.js");
            this.objectLength = Object.keys(mesDonnees).length; // 3

            let images=[]; // tableau des noms des images ["1.jpg","2.jpg","3.jpg"]

                    for (let i = 0; i < this.objectLength; i++) {
                        images.push(i+".jpg"); // Charger les images 
                        // console.log(images);   
                    }

                    return this.objectLength; // retourne la longeur
        }

// -------------------------------------------------------------------------------

        preload(imageArray, index) {
    
            index = index || 0; // index = index OU 0
            if (imageArray && imageArray.length > index) {
                let img = new Image ();

                    img.onload = function() {
                        preload(imageArray, index + 1);
                    }
                    
                    img.src = "/set/img/"+images[index];     
            }
        }
}

new Images();


// -----------------------création de mon tableau  -----------------------------------

class CreateArrayQuestion{

    constructor(mesDonnees,mesD,objectLength,monTab,resultat,resultatTableau2){
        this.mesDonnees=mesDonnees;
        this.mesD=mesD;
        this.objectLength=objectLength;
        this.monTab=monTab;
        this.resulat=resultat;
        this.resultatTableau2=resultatTableau2;
        this.monTableau();
        this.monTableauV()
    }

monTableau(){

    // let objectLength = Object.keys(mesDonnees).length; // 3
    this.objectLength = Object.keys(mesDonnees).length;
    
    // On crée un tableau contenant le même nombre de question
    let tableauQuestion = [];

    for (let i = 0; i < this.objectLength; i++) {
    tableauQuestion.push(i);
    // console.log(tableauQuestion);   
    }

    // On mélange les valeurs du tableau 
    //(pour éviter de commencer toujours par les mêmes questions)
    function shuffleArray(inputArray){
    inputArray.sort(()=> Math.random() - 0.5);
    }

    // Mélanger tableau général
    shuffleArray(tableauQuestion);
    this.mesD=tableauQuestion;
    // console.log(this.mesD); // Bon Tableau
    return this.mesD;
    }

    monTableauV(){
        let tableau = this.mesD;
        let resultatTableau2 = [...tableau];
        this.resultatTableau2=resultatTableau2;
        return this.resultatTableau2
    } 
}


// -------------------------------------------------------------------------------


// Lancer le jeu par un bouton
function game(){

    let play = document.getElementById("game");
    play.onclick = StartGame; // quand clique on lance la fonction StartGame()
    };

    game(); // Activer function


function StartGame(){

    // console.log(Object.keys(mesDonnees).length+ " Nombre de questions data.js");
    let chargerTableau = new CreateArrayQuestion(mesDonnees);
    new MyQuestionInterface(chargerTableau.monTableauV());

}




// -------------------------------------------------------------------------------

class MyQuestionInterface{

    constructor(mesD,bonneRep,tableauId,indice,tableauQuestion,resultatTableau2){
        this.mesD=mesD;
        this.bonneRep=bonneRep;
        this.tableauId=tableauId;
        this.tableauQuestion=tableauQuestion;
        this.resultatTableau2=resultatTableau2;
        this.indice=indice;
        this.melAbc();
        this.bonneReponseId();
        this.afficheLaQuestion();

    };

// ----------------------------------------------------------------------------

        melAbc(){ 

            const id = ["a","b","c"];   
            // Mélanger les questions 1x
            id.sort(()=> Math.random() - 0.5);
            // console.log(id); // tableau mélangé b,c,a

            // Mélanger les questions et inverser 
            const tableauId = id.reverse();
            // console.log(tableauId + " : 2ème Mélange abc "); // tableau mélangé b,c,a

            this.tableauId=tableauId; // this (b,c,a)
            // console.log(this.tableauId);        
        }

        bonneReponseId(tableauId){

            tableauId=this.tableauId;
            console.log(tableauId); // b,c,a
            const indice = this.tableauId.findIndex(monIndex => monIndex === "a");
            this.indice=indice;
            console.log(this.indice+ " = indice de A (bonne réponse)"); // 2)
            document.getElementById("bonIndex").textContent = this.indice;
            return this.indice;
        }

        afficheLaQuestion(){
            // console.log(currentItemIndex)
            console.log(this.mesD)

            console.log(this.tableauId + " : Série abc mélangée (121)");
            let tableauQuestion=this.mesD[currentItemIndex];// 6,2,8..[0] = 6
            // let tableauQuestion=this.resultatTableau2[currentItemIndex];// 6,2,8..[0] = 6
            
            // index de la question en cours exemple : 0 : 2, 1 : 8 ...
            console.log(tableauQuestion + " index de la question n° "+ currentItemIndex); //ex: 4
            
            this.bonneRep = mesDonnees[tableauQuestion][1];
            console.log("La Bonne réponse est : "+ this.bonneRep); // berger allemand

            // div a,b,c
            // tableau id mélangé b,c,a
            // console.log(this.tableauId);

                // Selection et ajout getId
                document.getElementsByClassName("buttonQ")[0].addEventListener("click", getId);
                document.getElementsByClassName("buttonQ")[1].addEventListener("click", getId);
                document.getElementsByClassName("buttonQ")[2].addEventListener("click", getId);

                const imageEssais= document.querySelector("#questionPicture");
                imageEssais.style.backgroundImage = "url("+"/set/img/"+tableauQuestion+".jpg"+")";
            
                // Titre question
                document.getElementById("question").textContent = mesDonnees[tableauQuestion][0]; // Ma question 

                // Boutons A,B,C
                document.getElementById(this.tableauId[0]).textContent = mesDonnees[tableauQuestion][1]; // ex: b = 
                document.getElementById(this.tableauId[1]).textContent = mesDonnees[tableauQuestion][2]; // ex: a
                document.getElementById(this.tableauId[2]).textContent = mesDonnees[tableauQuestion][3]; // ex: c

                // info mauvaise réponse
                document.getElementById("response").textContent = mesDonnees[tableauQuestion][4]; // Fausse réponse 
        
                this.tableauQuestion=tableauQuestion;
                console.log(this.tableauQuestion+" Index de la question en cours "); // ok, ex: 3
            }
}

// ----------------------------------------------------------------------------


function getId(){

       // Ce bouton cliqué
        const boutonClique = this;

        // id de l'element
        const idBouton = this.getAttribute('id');

        // Désactiver les boutons

                switch (idBouton) {
                    case 'a':
                    console.log('A.');
                    break;
                    case 'b':
                    console.log('B.');
                    break;
                    case 'c':
                    console.log('C.');
                    break;
                    default:
                    alert("Réponse non autorisée");
                }
}


class Id extends MyQuestionInterface {

    constructor(indice){
        super(indice);
        this.checkId();
    }

    checkId(){
        console.log(this.indice+ " Indice dans Class Id");
    }
}


class Reponse{

        constructor(idBouton,indice){
        this.idBouton=idBouton; // idBouton
        this.indice=indice; //bonne réponse
        this.maFct();       
        }

            maFct(){
            // console.log(MelangeAbc.bonneReponseId.indice);
            
            // let b = new MelangeAbc;
            // let c = b.bonneReponseId();
            // alert(c);    
            
            // this.indice = c; // ex: b,(a),c
            console.log(this.indice + " Le bon index du A ");

            let divAcliquer = -1; // init div;
            console.log(divAcliquer + " Div à cliquer ")
            
                if(this.indice==0){
                    divAcliquer="a";
                }
                if(this.indice==1){
                    divAcliquer="b";
                }
                if(this.indice==2){
                    divAcliquer="c";
                }


                // Condition 
                    if(this.id=="a" && divAcliquer=="a"){ 
                        alert("Bonne réponse");           
                    }; // no
                    if(this.id=="b" && divAcliquer=="b"){ 
                        alert("Bonne réponse");
                    }; // ok
                    if(this.id=="c" && divAcliquer=="c"){ 
                        alert("Bonne réponse");
                    }; // no

            // div id a,b,c
            // a=0,b=1,c=2
        // alert(this.indice + " Ma réponse");
        }
}

// Appel classe
// let a = new MelangeAbc();


// console.log(a.melAbc()); // appel et nouvel objet

// let b = a.melAbc();
// console.log(b); // appel et nouvel objet


// ----------------------------------------------------------------------------


// function previousNext(tableauId){

//     let a =  new MelangeAbc;
//     let b = a.melAbc();
//     this.tableauId=b;
//     console.log(this.tableauId + " : Série abc mélangée (121)");


//         console.log(this.mesD + " Liste entière");
//         let tableauQuestion=this.mesD;
//         this.tableauId=tableauId;

//         console.log(tableauQuestion[currentItemIndex]+" tableau question index courant")
//         // Bouton Previous


//         document.getElementById("previous").onmousedown = function getPrevious()
//         {
//                 if(currentItemIndex!==0){
//                 currentItemIndex--; // décompte
//                 console.log(currentItemIndex);
//                 }
    
//                 if(currentItemIndex==0){
//                 alert("Désactive le bouton"); // si 0
//                 }

//                 // question();
//                 return currentItemIndex
//             } 

// // Bouton Next

//         document.getElementById("next").onmousedown = function getNext()
//         {
//             // let tableauId=20;
//             alert(this.tableauId)
            
//             // Longeur du nombre de questions
//             const nombreQuestionMax= Object.keys(mesDonnees).length;

//             if(currentItemIndex!==nombreQuestionMax){
//                 currentItemIndex++; // ajout
//                 console.log(currentItemIndex+" Bouton Next"); // 0,1,2,3 ...
//                 console.log(mesDonnees[tableauQuestion[currentItemIndex]][0]);

//             // Titre question
//             document.getElementById("question").textContent = mesDonnees[tableauQuestion[currentItemIndex]][0]; // Ma question 

//             // Boutons A,B,C
//             document.getElementById(this.tableauId[0]).textContent = mesDonnees[tableauQuestion[currentItemIndex]][1]; // ex: b = 
//             document.getElementById(this.tableauId[1]).textContent = mesDonnees[tableauQuestion[currentItemIndex]][2]; // ex: a
//             document.getElementById(this.tableauId[2]).textContent = mesDonnees[tableauQuestion[currentItemIndex]][3]; // ex: c

//             // info mauvaise réponse
//             document.getElementById("response").textContent = mesDonnees[tableauQuestion[currentItemIndex]][4]; // Fausse réponse 

//                 }
    
//                 if(currentItemIndex==nombreQuestionMax){
//                 alert("Désactive le bouton next"); // hors limite
//                 }

//                 return currentItemIndex;
//         }

// }



