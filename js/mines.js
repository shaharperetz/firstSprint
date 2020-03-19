const X = '💣'
const flag = '🚩';
const flag2 = '🚩 ';
const empty = '';

var gCellObject = {

    minesAroundCount: 0,
    isShown: true,
    isMine: false,
    isMarked: true

}



// function createMines() {
//     var first = [0, 1, 2, 3, 4, 5, 6, 7];
//     var second = [0, 1, 2, 3, 4, 5, 6, 7];
//     for (var i = 0; i < gLevel.MINES; i++) {
//         var x = first.splice(getRandomInt(0, first.length), 1)
//         var y = second.splice(getRandomInt(0, second.length), 1)

function createMines() {

    for (var i = 0; i < gLevel.MINES; i++) {

        var emptyPlaces = getEmptyPlaces(gBorad);
        var pos = drawNum(emptyPlaces)
        gBorad[pos.i][pos.j] = X;

    }
}




function cellClicked(elCell, cellI, cellJ) {
    if (!gIsHint) {
        if (gBoard[cellI][cellJ] === X) {
            gameOver(false)
        } else if (gBoard[cellI][cellJ] === empty) {
            elCell.classList.remove('hide');
            openSpace(cellI, cellJ, gBorad)
            gGame.showCount++
                console.log('showCount', gGame.showCount)
        } else {
            elCell.classList.remove('hide');
            gGame.showCount++
                console.log(gGame.showCount)
        }
        if (gGame.isOn === false) {
            myStartWatch()
            gGame.isOn = true
        }
        if (gGame.isOn === true) checkWin()

    } else {
        hint(elCell, cellI, cellJ)


        gIsHint = false
    }
}

function openSpace(cellI, cellJ, mat) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;
            if (mat[i][j] !== X) {
                renderCellForOpen(i, j)


            }
        }

    }
}

function closedSpace(cellI, cellJ, mat) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;
            renderCellForClose(i, j)


        }

    }
}


function markedCell(elCell, cellI, cellJ, e) {
    e.preventDefault()

    if (gBoard[cellI][cellJ] === X) {
        gBoard[cellI][cellJ] = flag;
        gGame.markedCount++
            elCell.classList.toggle('marked')
        elCell.classList.remove('hide')
        renderCell(cellI, cellJ, flag)


    } else if (gBoard[cellI][cellJ] === flag) {
        gGame.markedCount--
            gBoard[cellI][cellJ] = X
        elCell.classList.toggle('marked')
        elCell.classList.add('hide')
        renderCell(cellI, cellJ, X)


    } else if (gBoard[cellI][cellJ] === empty) {
        gBoard[cellI][cellJ] = flag2;
        elCell.classList.toggle('marked');
        elCell.classList.remove('hide');
        renderCell(cellI, cellJ, flag2)


    } else if (gBoard[cellI][cellJ] === flag2) {
        // debugger
        if (!countNeighbors(cellI, cellJ, gBorad)) {
            gBoard[cellI][cellJ] = empty
            elCell.classList.toggle('marked');
            elCell.classList.add('hide');
            renderCell(cellI, cellJ, empty)

        } else {
            var num = '' + countNeighbors(cellI, cellJ, gBorad)
            gBoard[cellI][cellJ] = num;
            elCell.classList.add('hide')
            elCell.classList.toggle('marked');
            renderCell(cellI, cellJ, num)

        }
    } else {
        gBoard[cellI][cellJ] = flag2;
        elCell.classList.toggle('marked');
        elCell.classList.remove('hide');
        renderCell(cellI, cellJ, flag2)

    }
    console.log('marked count', gGame.markedCount)
    checkWin()

}


function easy() {
    gLevel.SIZE = 4
    gLevel.MINES = 2
    gClickCounter = 0
    init()
}

function medium() {
    gLevel.SIZE = 8
    gLevel.MINES = 12
    gClickCounter = 0
    init()
}

function hard() {
    gLevel.SIZE = 12
    gLevel.MINES = 30
    gClickCounter = 0
    init()
}