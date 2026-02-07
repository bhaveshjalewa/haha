document.addEventListener("DOMContentLoaded", function(){

const puzzle = [
"0LIFECYCLE000",
"0N000000TBR0",
"0T000000CAPM",
"0C000NPVRULE",
"0OVERDEBRATIO",
"000000POISON0",
"000000SHARPE0",
"000000STDDEV0",
"000000UNSYSRISK",
"000000EMH0000",
"000000ABS0000",
"000000QUICK00",
"000000CALL000",
"000000NPV0000",
"000000BETA000"
];

const acrossClues = [
"Consumption smoothing across working and retirement years",
"Government security benchmark rate",
"Covariance-based asset pricing model",
"Capital budgeting rule aligned with wealth maximization",
"Leverage ratio total debt divided by equity",
"Hostile takeover defense using dilution",
"Risk-adjusted return per total volatility",
"Square root of variance",
"Risk remaining after diversification",
"Markets reflect all available information",
"Securitized pooled receivables",
"Liquidity ratio excluding inventory",
"Right but not obligation to buy",
"Project acceptance rule based on value",
"Regression slope measuring systematic risk"
];

const downClues = [
"Interest coverage measure",
"Basel capital adequacy ratio",
"Non-diversifiable risk",
"Duration matching strategy",
"Equity risk premium component",
"Four percent retirement rule",
"Dividend certainty preference theory",
"Efficient portfolio boundary",
"Bond sensitivity measure",
"Market fear index",
"Risk shifting agency issue",
"Bond yield held to maturity",
"Weighted average cost of capital",
"Expected shortfall measure",
"Leveraged buyout abbreviation"
];

const FIXED_CODE =
"CAPITALFINANCEMBA2026CROSSWORDWEEKCOMPLETEXX";

let startBtn = document.getElementById("startBtn");
let startScreen = document.getElementById("startScreen");
let gameContainer = document.getElementById("gameContainer");

let grid = document.getElementById("grid");
let acrossDiv = document.getElementById("acrossClues");
let downDiv = document.getElementById("downClues");
let timerDisplay = document.getElementById("timer");
let submitBtn = document.getElementById("submitBtn");
let clearBtn = document.getElementById("clearBtn");
let messageDiv = document.getElementById("message");

let timerInterval = null;
let startTime = null;

/* START BUTTON */
startBtn.addEventListener("click", function(){
    startScreen.style.display = "none";
    gameContainer.style.display = "block";

    startTime = Date.now();

    timerInterval = setInterval(updateTimer,1000);
});

/* TIMER */
function updateTimer(){
    let diff = Math.floor((Date.now() - startTime)/1000);
    let m = Math.floor(diff/60);
    let s = diff%60;
    timerDisplay.textContent =
        (m<10?"0"+m:m)+":"+(s<10?"0"+s:s);
}

/* BUILD GRID */
function buildGrid(){
    const rows = puzzle.length;
    const cols = Math.max(...puzzle.map(r=>r.length));
    grid.style.gridTemplateColumns = `repeat(${cols},38px)`;

    let number = 1;

    for(let r=0;r<rows;r++){
        for(let c=0;c<cols;c++){

            const char = puzzle[r][c] || "0";
            const wrapper = document.createElement("div");

            if(char === "0"){
                wrapper.className="disabled-cell";
            }else{

                const input = document.createElement("input");
                input.className="cell";
                input.maxLength=1;
                input.dataset.row=r;
                input.dataset.col=c;

                input.addEventListener("input",(e)=>{
                    e.target.value=e.target.value.toUpperCase();
                });

                const startsAcross =
                    (c===0 || puzzle[r][c-1]==="0") &&
                    (puzzle[r][c+1] && puzzle[r][c+1]!=="0");

                const startsDown =
                    (r===0 || puzzle[r-1][c]==="0") &&
                    (puzzle[r+1] && puzzle[r+1][c]!=="0");

                if(startsAcross || startsDown){
                    const num=document.createElement("span");
                    num.className="cell-number";
                    num.textContent=number++;
                    wrapper.appendChild(num);
                }

                wrapper.appendChild(input);
            }

            grid.appendChild(wrapper);
        }
    }

    renderClues();
}

/* CLUES */
function renderClues(){
    acrossClues.forEach((clue,i)=>{
        const div=document.createElement("div");
        div.className="clue";
        div.textContent=(i+1)+". "+clue;
        acrossDiv.appendChild(div);
    });

    downClues.forEach((clue,i)=>{
        const div=document.createElement("div");
        div.className="clue";
        div.textContent=(i+1)+". "+clue;
        downDiv.appendChild(div);
    });
}

/* CHECK */
function checkAnswers(){
    let correct=true;
    document.querySelectorAll(".cell").forEach(cell=>{
        let r=cell.dataset.row;
        let c=cell.dataset.col;
        if(cell.value!==puzzle[r][c]) correct=false;
    });
    return correct;
}

/* SUBMIT */
submitBtn.addEventListener("click", function(){
    if(checkAnswers()){
        clearInterval(timerInterval);
        messageDiv.style.color="green";
        messageDiv.innerHTML=
        "Solved Completely!<br><br>Completion Code:<br>"+FIXED_CODE;
    }else{
        messageDiv.style.color="#c62828";
        messageDiv.textContent="Some answers are incorrect. Please review.";
    }
});

clearBtn.addEventListener("click", function(){
    document.querySelectorAll(".cell").forEach(c=>c.value="");
    messageDiv.textContent="";
});

buildGrid();

});
