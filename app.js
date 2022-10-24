const grid = document.querySelector('.grid')
const resultsDisplay = document.querySelector('.results')
let currentShooterindex = 202
let width = 15
let direction = 1;
let invadorsId
let goingright = true
let aliansremoved = []
let results =0;

for (let i = 0; i < 225; i++) {
    const square = document.createElement('div')
    grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))

const alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
]

draw()

function draw() {

    for (let i = 0; i < alienInvaders.length; i++) {

        if (!aliansremoved.includes(i)) { // dont print thats shot
            squares[alienInvaders[i]].classList.add('invader')
        }

    }
}

function remove() {
    for (let i = 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.remove('invader')
    }
}



squares[currentShooterindex].classList.add('shooter')

function moveshooter(e) {
    squares[currentShooterindex].classList.remove('shooter')
    switch (e.key) {
        case 'ArrowLeft':
            if (currentShooterindex % width !== 0) { currentShooterindex -= 1 }
            break;

        case 'ArrowRight':
            if (currentShooterindex % width < width - 1) { currentShooterindex += 1 }
            break;

    }
    squares[currentShooterindex].classList.add('shooter')
}
document.addEventListener('keydown', moveshooter);

function moveinvadors() {
    const leftedge = alienInvaders[0] % width === 0
    const rightedge = alienInvaders[alienInvaders.length - 1] % width === width - 1
    remove()

    if (rightedge && goingright) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width + 1
            direction = -1
            goingright = false
        }
    }


    if (leftedge && !goingright) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width - 1
            direction = 1
            goingright = true
        }
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction
    }
    draw()
    if (squares[currentShooterindex].classList.contains('invader', 'shooter')) { // invaders touch shooter
        //alert('Game Over')
        resultsDisplay.innerHTML = "Game Over"
        clearInterval(invadorsId)
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        if (alienInvaders[i] > (squares.length)) {
            resultsDisplay.innerHTML = "Game Over"
            clearInterval(invadorsId)
        }
    }
if(aliansremoved.length === alienInvaders.length){
    resultsDisplay.innerHTML = 'You Win'
    clearInterval(invadorsId)
}

}

invadorsId = setInterval(moveinvadors, 500)

function shoot(e) {
    let laserID
    let currentLaserindex = currentShooterindex
    function movelaser() {
        squares[currentLaserindex].classList.remove('laser')
        currentLaserindex -= width
        squares[currentLaserindex].classList.add('laser')

        if (squares[currentLaserindex].classList.contains('invader')) {
            squares[currentLaserindex].classList.remove('laser')
            squares[currentLaserindex].classList.remove('invader')
            squares[currentLaserindex].classList.add('boom')

            setTimeout(() => squares[currentLaserindex].classList.remove('boom'), 300)
            clearInterval(laserID)

            const alienremoval = alienInvaders.indexOf(currentLaserindex)
            aliansremoved.push(alienremoval)
            results++
            resultsDisplay.innerHTML = results
            console.log(alienremoval)


        }
    }

    switch (e.key) {

        case 'ArrowUp':
            laserID = setInterval(movelaser, 100)
    }

}


document.addEventListener('keydown', shoot)