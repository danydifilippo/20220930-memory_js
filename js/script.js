//Creo un array di emoticon per le carte
let arrayCards = ['🍭','🍔','🔮','🎈','💍','🌂','💎',
'💜','🍭','🍔','🔮','🎈','💍','🌂','💎','💜']

// creo una funzione che generi le carte in maniera random e che le inserisca in array - 
// funzione shuffle che mescola le carte pescandone 1 alla volta con un numero a caso nell'array 
// e le mette in ordine di pescaggio in un altro array
function lancia(a) {
    //vabiabile che indica lunghezza del parametro a
    let currentIndex = a.length;
    //variabile per indice random e per valore temporaneo per ogni carta
    let temporaryValue, randomIndex;
    //finchè l'indice corrente è diverso da zero viene preso un numero random per il numero di carte rimaste
    // diminuendone questo numero ad ogni giro, 
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // il numero che esce dal random viene assegnato al numero nell'array di tuttii simboli che viene inserito
      // in ordine di pescaggio in un altro array dando così il nuovo valore alla carta.
      temporaryValue = a[currentIndex];
      a[currentIndex] = a[randomIndex];
      a[randomIndex] = temporaryValue;
    }
    // viene creato un nuovo ordine di carte
    return a;
  }

// creo una variabile che utilizzerò per ripulire il tempo ad ogni inizio gioco 
  let interval;
  
// creo un timer di 1 minuto per trovare tutte le carte

function timerStart () {
    let s=60;
    let timer=document.getElementById('timer');
    let timing=document.getElementById('timing')
    interval = setInterval (function() {
        timer.innerHTML = `Hai a disposizione: ${s} secondi per trovare tutte le carte`;
        s--;
        let seconds = 60 - s
        timing.innerHTML = `Hai impiegato ${seconds} secondi!`
        if(s<0){
            // appena finisce il tempo si attiva la classe al messaggio di 'ritenta' e pulisce l'intervallo
            clearInterval(interval);
            let lose = document.getElementById('lose')
            lose.classList.add('attiva');
        }
    },1000);
}

// button start che fa partire il gioco

function start() {
    //mescolare le carte con funzione shuffle
    let arraylancia = lancia(arrayCards);
    //far ripartire il tempo da un minuto
    clearInterval(interval);
    // richiamo arrayComparison vuoto che mi servirà da contenitore per comparare le prime due carte pescate
    arrayComparison = [];
    // creo una variabile per avere una lista delle carte
    let lista = document.getElementById('grid');
        // finchè il parent lista ha dei figli ad ogni giro viene rimosso il primo figlio
        while (lista.hasChildNodes()) {
            lista.removeChild(lista.firstChild);
        }
        //ciclo for che parte da zero fino ad massimo di 16 carte, crea un div per ogni carta e per ogni simbolo
        // dare la classe icon per il div del simbolo che sarà il figlio del div carta che sarà figlio del div griglia
        // i div dei simboli saranno elementi dell'array per la funzione shuffle
        for (i=0;i<16;i++) {
            let box = document.createElement('div');
            let element = document.createElement('div');
            element.className = 'icon';
            document.getElementById('grid').appendChild(box).appendChild(element);
            element.innerHTML = arraylancia[i];
        }

        //parte funzione tempo
    timerStart();
        // dare variabile a tutte le carte con classe icon e icons  che mette tutte in un array
    let icon = document.getElementsByClassName('icon');
    let icons = [...icon];
        // ciclo for per tutta la lunghezza dell'array che contiene le icone, parte da 0 e va avanti
        // applica la funzione display e openFinish per le carte cliccate
    for (i=0; i<icons.length;i++){
        icons[i].addEventListener('click',display);
        icons[i].addEventListener('click',openFinish);
    }
    }

// funzione display: legge tutte le carte e attiva per ogni carta scoperta la classe show.
function display(eventclick){
    let found = document.getElementsByClassName('find');
    let icon = document.getElementsByClassName('icon')
    let icons = [...icon];
    eventclick.target.classList.toggle('show');
    // inserisce le carte scoperte nell'arrayComparison, 
    arrayComparison.push(this);

    let lunghezza=arrayComparison.length;
    // quando la lunghezza dell'array max 2 (2 carte scoperte), le confronta
    if(lunghezza===2){
    // se uguali aggiunge le classi find e disability per disattivare il click.
        if(arrayComparison[0].innerHTML===arrayComparison[1].innerHTML){
            arrayComparison.forEach(function(item) {
                item.classList.add('find','disability');
            });
        // pulisce l'arrayComparison
        arrayComparison=[];
        } else {
        // se non uguali aggiunge la classe disability per disattivare il click
            icons.forEach(function(oggetto) {
                oggetto.classList.add('disability')
            });
        // funzione setTimeout: per le 2 carte nell'array rimuove classe show 
            setTimeout(function(){
                arrayComparison.forEach(function(item) {
                    item.classList.remove('show');
                });
        // per ogni elemento della grigla abilita il click tranne per le carte con classe find dove lo aggiunge
                icons.forEach(function(oggetto) {
                    oggetto.classList.remove('disability');
                    for(i=0;i<found.lenght;i++){
                        found[i].classList.add('disability');
                    }
                });
        // pulisce l'arrayComparison e termina la funzione in 0.7 secondi.
        arrayComparison=[];
            },700);
        }
    }
}

// funzioni per le finestre finali: 
let finish = document.getElementById('finish');



//se vengono indovinate tutte le carte viene inserita la classe attiva alla finestra
function openFinish(){
    let find = document.getElementsByClassName('find');
    if(find.length>=16){
        clearInterval(interval);
        finish.classList.add('attiva');
        document.getElementById("totalTime").innerHTML = timing.innerHTML;
        closeFinish();
    }
}
// viene rimossa la classe attiva se si chiude la finestra
function closeFinish(){
    closeicon.addEventListener('click', function(n){
        finish.classList.remove('attiva');
        lose.classList.remove('attiva');
        start();
    });
}
//funzione gioca di nuovo e ritenta
function playAgain(){
    finish.classList.remove('attiva');
    lose.classList.remove('attiva');
    start();
}