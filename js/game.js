// *******************

var gBorad = null
var gClickCounter = 0;
var gIsHint = false

var gLevel = {
    SIZE: 8,
    MINES: 12
}


var gGame = {
    isOn: false,
    showCount: 0,
    markedCount: 0,
    secPassed: 000
}




function init() {
    gGame.isOn = false
    gGame.secPassed = 000
    gGame.markedCount = 0
    gGame.showCount = 0
    var clock = document.querySelector('.clock');
    clock.innerText = gGame.secPassed
    gBorad = buildBoard()
    renderBoard(gBorad)
    createMines()
    gBoard = runGeneration(gBorad)
    renderBoard(gBorad)



}

function buildBoard() {
    var board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([])
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = empty
        }
    }
    return board;

}

function runGeneration(board) {
    var newBoard = gBorad
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var numOfNeighbors = countNeighbors(i, j, board);
            if (numOfNeighbors === 1) {
                if (board[i][j] === empty) newBoard[i][j] = '1';
            } else if (numOfNeighbors === 2) {
                if (board[i][j] === empty) newBoard[i][j] = '2';
            } else if (numOfNeighbors === 3) {
                if (board[i][j] === empty) newBoard[i][j] = '3';
            } else if (numOfNeighbors === 4) {
                if (board[i][j] === empty) newBoard[i][j] = '4';
            } else if (numOfNeighbors === 5) {
                if (board[i][j] === empty) newBoard[i][j] = '5';
            } else if (numOfNeighbors === 6) {
                if (board[i][j] === empty) newBoard[i][j] = '6';
            } else if (numOfNeighbors === 7) {
                if (board[i][j] === empty) newBoard[i][j] = '7';
            } else if (numOfNeighbors === 8) {
                if (board[i][j] === empty) newBoard[i][j] = '8';
            }

        }
    }
    return newBoard;
}

function countNeighbors(cellI, cellJ, mat) {
    var neighborsSum = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;
            if (mat[i][j] === X) neighborsSum++;
        }
    }
    return neighborsSum;
}


function renderBoard(board) {
    var strHtml = ''
    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < board[i].length; j++) {
            var className = (board[i][j]) ? 'mine' : ''
            var dataName = `data-i="${i}" data-j="${j}"`
            strHtml += `<td ${dataName} oncontextmenu="markedCell(this ,${i}, ${j},event )" onclick="cellClicked(this ,${i}, ${j} )"
             class="hide ${className}"  >
            ${board[i][j]}
            </td> `
        }
        strHtml += '</tr>'
    }
    var elTbody = document.querySelector('.board')
    elTbody.innerHTML = strHtml

}


function gameOver(win) {
    if (win === false) {
        var elTbody = document.querySelectorAll('.hide')
        for (var i = 0; i < elTbody.length; i++) {
            elTbody[i].classList.remove('hide')
        }
        var button = document.querySelector('.btn')
        button.style.display = 'block'
        myStopWatch()

    } else if (win === true)
        alert('Victory')
    var elTbody = document.querySelectorAll('.hide')
    for (var i = 0; i < elTbody.length; i++) {
        elTbody[i].classList.remove('hide')
    }
    var button = document.querySelector('.btn')
    button.style.display = 'block'
    myStopWatch()

}

function restart() {
    gClickCounter = 0;
    init()
    var button = document.querySelector('.btn')
    button.style.display = 'none';
    myStopWatch()

}

function hint(elCell, cellI, cellJ) {
    elCell.classList.remove('hide');
    openSpaceToHint(cellI, cellJ, gBorad);
    setTimeout(() => {
        elCell.classList.add('hide')
        closedSpace(cellI, cellJ, gBorad)
    }, 1000);


}