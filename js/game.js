const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
    'COLÊNQUIMA 1',
    'ESCLERÊNQUIMA 1',
    'ESTÔMATO 1',
    'FLOEMA 1',
    'FLOR 1',
    'FRUTO 1',
    'PARÊNQUIMA 1',
    'RADICULAR 1',
    'SEMENTE 1',
    'XILEMA 1',
    'COLÊNQUIMA 2',
    'ESCLERÊNQUIMA 2',
    'ESTÔMATO 2',
    'FLOEMA 2',
    'FLOR 2',
    'FRUTO 2',
    'PARÊNQUIMA 2',
    'RADICULAR 2',
    'SEMENTE 2',
    'XILEMA 2',
]

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length == 20) {
        clearInterval(this.loop);
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML}`);
    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter == secondCharacter) {

        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();

    } else {

        setTimeout(() => {
            
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';

        }, 500);
    }

}

const revealCard = ({ target }) => {

    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard == '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    
    } else if (secondCard == '') {

        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();

    }


    
}

const createCard = (character) => {

    const card = createElement('div','card');
    const front = createElement('div','face front');
    const back = createElement('div','face back');

    front.style.backgroundImage = `URL('../image/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click',revealCard);
    card.setAttribute('data-character', character.split(' ')[0]);


    return card;
    }

const loadGame = () => {

    const shuffledArray = characters.sort( () => Math.random() -0.5 );

    shuffledArray.forEach((character) => {

        const card = createCard(character);
        grid.appendChild(card);

    });
}

const startTimer = () => {

     this.loop = setInterval(() => {
     const currentTime = +timer.innerHTML;
     timer.innerHTML = currentTime + 1;
     }, 1000);
}

window.onload = () => {
     spanPlayer.innerHTML = localStorage.getItem('player');
     startTimer();
     loadGame();
}
