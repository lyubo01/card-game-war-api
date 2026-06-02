let deckId = "";
// win/war counters (persisted for the session only)
let p1Wins = 0;
let p2Wins = 0;
let warCount = 0;

    fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
    .then(res => res.json())
    .then(
        data => {
            console.log(data)
            deckId = data.deck_id;
        }
    )
    .catch(error => {
        console.log(`error ${err}`)
    });

    document.querySelector("button").addEventListener('click', drawTwo)
// reset button (added in HTML)
const resetBtn = document.getElementById('reset-scores');
if (resetBtn) resetBtn.addEventListener('click', resetScores);

// initialize counters from sessionStorage and update UI
initCounters();

    function drawTwo() {
        
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
    .then(
        data => {
            console.log(data)
           document.querySelector("#player1").src=data.cards[0].image;
           document.querySelector("#player2").src=data.cards[1].image;
           let player1Val = convertToNum(data.cards[0].value)
           let player2Val = convertToNum(data.cards[1].value)
           if (player1Val > player2Val) {
            document.querySelector("h3").innerText = "Player 1 Wins"
            document.querySelector("h3").style.color = "rgb(0, 68, 255)"
            p1Wins += 1;
            saveAndRenderCounters();
           }else if(player2Val > player1Val){
            document.querySelector("h3").innerText = "Player 2 Wins";
            document.querySelector("h3").style.color = "rgb(136, 0, 0)";
            p2Wins += 1;
            saveAndRenderCounters();
            }
            else{
                
                document.querySelector("h3").innerText = "WAR!"
                warCount += 1;
                saveAndRenderCounters();

            }
           
        }
    )
    .catch(error => {
        console.log(`error ${err}`)
    });
    }

    function convertToNum(val){
        if (val === "ACE") {
            return 14;
        }
        else if (val === "KING") {
            return 13;
        }
        else if (val === "QUEEN") {
            return 12;
        }
        else if (val === "JACK") {
            return 11;
        }
        else{
            return Number(val);
        }
    }

function initCounters(){
    const p1 = sessionStorage.getItem('p1Wins');
    const p2 = sessionStorage.getItem('p2Wins');
    const w = sessionStorage.getItem('warCount');
    p1Wins = p1 ? Number(p1) : 0;
    p2Wins = p2 ? Number(p2) : 0;
    warCount = w ? Number(w) : 0;
    renderCounters();
}

function saveAndRenderCounters(){
    sessionStorage.setItem('p1Wins', String(p1Wins));
    sessionStorage.setItem('p2Wins', String(p2Wins));
    sessionStorage.setItem('warCount', String(warCount));
    renderCounters();
}

function renderCounters(){
    const el1 = document.getElementById('p1-wins');
    const el2 = document.getElementById('p2-wins');
    const elW = document.getElementById('war-count');
    if (el1) el1.innerText = p1Wins;
    if (el2) el2.innerText = p2Wins;
    if (elW) elW.innerText = warCount;
}

function resetScores(){
    p1Wins = 0; p2Wins = 0; warCount = 0;
    saveAndRenderCounters();
}
