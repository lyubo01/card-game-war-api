let deckId = "";

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
           }else if(player2Val > player1Val){
            document.querySelector("h3").innerText = "Player 2 Wins";
            document.querySelector("h3").style.color = "rgb(136, 0, 0)";
            }
            else{
                
                document.querySelector("h3").innerText = "WAR!"

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
            return val;
        }
    }
