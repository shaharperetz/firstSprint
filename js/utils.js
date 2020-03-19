//**************helpers*********************** */



function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function renderCell(i, j, value) {
    var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
    elCell.innerText = value
}

function renderCellForOpen(i, j) {
    var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
    elCell.classList.remove('hide')
        // if (gBorad[i][j] === empty) {
        //     cellClicked(elCell, i, j)
        // }
}

function renderCellForClose(i, j) {
    var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
    elCell.classList.add('hide')
        // if (gBorad[i][j] === empty) {
        //     cellClicked(elCell, i, j)
        // }
}


var gInterval = null



function myStartWatch() {
    gInterval = setInterval(changeClock, 1000);
}

function changeClock() {
    var clock = document.querySelector('.clock');
    gGame.secPassed++
        clock.innerText = gGame.secPassed
}




function myStopWatch() {
    clearInterval(gInterval);

}


function checkWin() {
    if (gLevel.MINES === gGame.markedCount) gameOver(true)
    else if (gGame.showCount === gLevel.SIZE ** 2 - gLevel.MINES) gameOver(true)
    else return
}

function drawNum(emptyPlaces) {
    var rndIdx = getRandomInt(0, emptyPlaces.length - 1)
    var splicedNums = emptyPlaces.splice(rndIdx, 1);
    // console.log(splicedNums[0]);
    // debugger
    return splicedNums[0]
}

function getEmptyPlaces(board) {
    var emptyPlaces = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var cell = board[i][j]
            if (cell === empty) {
                emptyPlaces.push({ i, j })
            }
        }
    }
    return emptyPlaces
}


function changeToHint(elHintButton) {
    gIsHint = true
    elHintButton.style.display = 'none'
}

function openSpaceToHint(cellI, cellJ, mat) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;
            renderCellForOpen(i, j)


        }

    }
}


function popUpLifeDown() {
    var popup = document.querySelector('.popup')
    popup.style.display = 'block'
    setTimeout(() => {
        popup.style.display = 'none'
    }, 1200);
}