const X = '💣'
const flag = '🚩';
const flag2 = '🚩 ';
const empty = '';
var gLifes = 0;

var gCellObject = {

    minesAroundCount: 0,
    isShown: true,
    isMine: false,
    isMarked: true

}


function createMines() {

    for (var i = 0; i < gLevel.MINES; i++) {

        var emptyPlaces = getEmptyPlaces(gBorad);
        var pos = drawNum(emptyPlaces)
        gBorad[pos.i][pos.j] = X;

    }
}




function cellClicked(elCell, cellI, cellJ) {
    var elLife = document.querySelectorAll('.heart')
    if (!gIsHint) {
        if (gBoard[cellI][cellJ] === X && gLifes === 2) {
            gameOver(false)
            elLife[gLifes].style.display = 'none'
        } else if (gBoard[cellI][cellJ] === X && gLifes !== 3) {
            elLife[gLifes].style.display = 'none'
            gLifes++
            var elNormalFace = document.querySelector('.random')
            var sadFace = document.querySelector('.sad')
            elNormalFace.style.display = 'none'
            sadFace.style.display = 'flex';
            setTimeout(() => {
                elNormalFace.style.display = 'flex'
                sadFace.style.display = 'none';
            }, 2000);
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
    myStopWatch()
    var allHints = document.querySelectorAll('.hint')
    allHints[0].style.display = '';
    allHints[1].style.display = '';
    allHints[2].style.display = '';
    init()
}

function medium() {
    gLevel.SIZE = 8
    gLevel.MINES = 12
    gClickCounter = 0
    myStopWatch()
    var allHints = document.querySelectorAll('.hint')
    allHints[0].style.display = '';
    allHints[1].style.display = '';
    allHints[2].style.display = '';
    init()
}

function hard() {
    gLevel.SIZE = 12
    gLevel.MINES = 30
    gClickCounter = 0
    myStopWatch()
    var allHints = document.querySelectorAll('.hint')
    allHints[0].style.display = '';
    allHints[1].style.display = '';
    allHints[2].style.display = '';
    init()
}