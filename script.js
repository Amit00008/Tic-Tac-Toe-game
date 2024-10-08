let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let newGameBtn = document.querySelector(".new");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");
let clickCount = 0;
let WinnCon = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
];
let turn = true;

const Draw = () => {
    if (clickCount === 9) {
        msgContainer.classList.remove("hide");
        msg.textContent = "It's a draw";
    }
};

const showWinner = (winner) => {
    msgContainer.classList.remove("hide");
    msg.textContent = `${winner} is the winner`;
};

const resetGame = () => {
    boxes.forEach((box) => {
        box.textContent = "";
        box.disabled = false;
        box.style.backgroundColor = "#3F334D";
    });
    msgContainer.classList.add("hide");
    turn = true;
    clickCount = 0; // Reset click count
};

const CheckWinner = () => {
    for (let pattern of WinnCon) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 === pos2 && pos2 === pos3 && pos1 !== "") {
            boxes[pattern[0]].style.backgroundColor = "green";
            boxes[pattern[1]].style.backgroundColor = "green";
            boxes[pattern[2]].style.backgroundColor = "green";

            showWinner(pos1);
            boxes.forEach((box) => {
                box.disabled = true;
            });
            return; // Exit the function if a winner is found
        }
    }
    Draw(); // Check for draw if no winner is found
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn) {
            box.textContent = "X";
            turn = !turn;
        } else {
            box.textContent = "O";
            turn = !turn;
        }
        box.disabled = true;
        clickCount++;
        CheckWinner();
    });
});
