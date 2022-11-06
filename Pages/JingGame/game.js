const cells = document.querySelectorAll(".cell");
const huPlayer = 'O';
const aiPlayer = 'X';
var origBoard;
var Nowplayer = 0;
const winCombox = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
]
startGame();

function startGame() {
    // 隐藏上一轮游戏的结束信息
    document.querySelector(".endgame").style.display = "none";
    document.querySelector("button").style.display = "none";
    // 等同于origBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    origBoard = Array.from(Array(9).keys());
    // 初始化player
    Nowplayer = 0;
    for (let i = 0; i <= 8; i++) {
        // 清除上一轮游戏的标识
        cells[i].innerHTML = "";
        // 此处待验证
        cells[i].style.backgroundColor = "transparent";
        cells[i].addEventListener('click', turnClick, false);
    }
}

function turnClick(square) {
    // square代表一个鼠标点击事件
    // square.target.id代表的是触发事件的元素id
    let nowId = square.target.id;
    if (typeof origBoard[nowId] == 'number') { //作用存疑
        //人类玩家点击
        turn(nowId, Nowplayer == 0 ? huPlayer : aiPlayer);
    }
    Nowplayer = !Nowplayer;
}
// 根据格子id和玩家参数绘制标记
function turn(squareId, player) {
    origBoard[squareId] = player;
    document.getElementById(squareId).innerHTML = player;
    // 胜利检查
    let gameWin = checkWin(origBoard, player);
    if (gameWin) {
        gameOver(gameWin);
    }
    checkTie(origBoard);
}

function checkWin(origBoard, player) {
    let gameWin = null;
    for (let i = 0; i < winCombox.length; i++) {
        let flag = true;
        for (let j = 0; j < 3; j++)
            if (origBoard[winCombox[i][j]] != player) flag = false;
        if (flag == true) {
            gameWin = { index: i, player: player };
            break;
        }
    }
    return gameWin;
}

function checkTie(origBoard) {
    let flag = 0;
    for (let i = 0; i < origBoard.length; i++) {
        if (typeof origBoard[i] == "number")
            flag = 1;
    }
    if (flag == 0) {
        display("平局！");
    }
}

function gameOver(gameWin) {
    // 改变背景颜色
    let WinCo = "#66cdaa";
    for (let index of winCombox[gameWin.index]) {
        document.getElementById(index).style.backgroundColor = WinCo;
    }
    // 删除单击事件
    for (let i = 0; i < cells.length; i++)
        cells[i].removeEventListener('click', turnClick, false);
    let who = (gameWin.player == huPlayer) ? "Player1 胜利！" : "Player2 胜利！";
    display(who);
}

function display(endText) {
    let endGameText = document.querySelector(".endgame");
    endGameText.style.display = "block";
    document.querySelector("button").style.display = "block";
    endGameText.innerHTML = endText;
}