let arrayCards = ['🍭','🍔','🔮','🎈','💍','🌂','💎',
'💜','🍭','🍔','🔮','🎈','💍','🌂','💎','💜']

// creiamo una funzione che generi le carte in maniera random e che le inserisca in array
function lancia(a) {
    let currentIndex = a.length;
    let temporaryValue, randomIndex;
  
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = a[currentIndex];
      a[currentIndex] = a[randomIndex];
      a[randomIndex] = temporaryValue;
    }
    return a;
  }

// creiamo una variabile che ripulisce il tempo ad ogni inizio gioco 
  let interval
  
// creiamo un timer di 2 minuti per trovare tutte le carte


function timerStart () {
    let s=30, m=1;
    let timer=document.getElementById('timer');
    interval = setInterval (function() {
        timer.innerHTML = `Hai a disposizione: ${m} min ${s} sec per trovare tutte le carte`;
        s--;
    if(s==0 && m===1){
        clearInterval(interval);
        let finishLose = document.getElementById('finishLose')
        finishLose.classList.add('attiva');
        }else{
        m--;
        s=59;
        }
    },1000);
}

// button start che fa partire il gioco

function start() {
    let arraylancia = lancia(arrayCards);

    clearInterval(interval);
    arrayComparison = [];

    let lista = document.getElementById('grid');
        while (lista.hasChildNodes()) {
            lista.removeChild(lista.firstChild);
        }

        for (i=0;i<16;i++) {
            let box = document.createElement('div');
            let element = document.createElement('div');
            element.className = 'icon';
            document.getElementById('grid').appendChild(box).appendChild(element);
            element.innerHTML = arraylancia[i];
        }

    timerStart();

    let icon = document.getElementsByClassName('icon');
    let icons = [...icon];

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

// funzione per la finestra finale, se vengono indovinate tutte le carte
let finish = document.getElementById('finish');



function openFinish(){
    let find = document.getElementsByClassName('find');
    if(find.length>=16){
        clearInterval(interval);
        finish.classList.add('attiva');
        closeFinish();
    }
}

function closeFinish(){
    closeicon.addEventListener('click', function(n){
        finish.classList.remove('attiva');
        finishLose.classList.remove('attiva');
        start();
    });
}

function playAgain(){
    finish.classList.remove('attiva')
    finishLose.classList.remove('attiva');
    start();
}