const url = `http://localhost:8080/hobbies/boardgames`

const getListBoardgames = async () => {
    try {
        const result = await fetch(url);
        const data = await result.json();
        console.log(data);
        createBoardgames(data);

    } catch (error) {
        console.error(error);
    }
}

const createBoardgames = (boardgameList) => {
    console.log(boardgameList);
    const listContent = document.getElementById('content')

    //bucle para recorrer todo el array de juegos de mesa e imprimir la lista en pantalla
    boardgameList.forEach(async (boardgame) => {

        console.log(boardgame)

        //Destructuracion del objeto juego de mesa
        const {
            idBoardgame,
            name,
            difficulty,
            imageBoardgame
        } = boardgame;

        const card = document.createElement(`div`);
        card.classList.add('list-boardgame')
        card.innerHTML = `
            <img class="boardgame-image" src="${imageBoardgame}">
                <p>${name}</p>
                <div>
                    <a href="boardgamePage.html?id=${idBoardgame}&difficulty=${difficulty}">
                        <button class="btn-style">Más información</button>
                    </a>
                    <button onclick="window.location.href=''" class="btn-style">Valorar</button>
                    <a href="boardgameDeletePage.html?id=${idBoardgame}&name=${name}">
                        <button class="btn-style"><i class="fa-solid fa-trash"></i></button>
                    </a>
                    
                </div>
        `;

        listContent.appendChild(card);
    });
}

//Funciones para sacar las opciones
const getOptions = async () => {
    try {
        const result = await fetch(url);
        const data = await result.json();
        createOptions(data);

    } catch (error) {
        console.error(error);
    }
}

const createOptions = (boardgameOptions) => {

    //Mostramos los rangos edades registradas en la base de datos en un elemento ul.
    const listAge = document.getElementById('age');
    const ages = boardgameOptions.map(boardgame => boardgame.age);
    const differentAges = [];

    for (let i = 0; i < ages.length; i++) {
        if (!differentAges.includes(ages[i])) {
            differentAges.push(ages[i]);
        }
    };

    const ageCard = document.createElement('ul');

    differentAges.forEach(age => {
        const ageLi = document.createElement('li');
        ageLi.textContent = age;
        ageCard.appendChild(ageLi);
    });

    listAge.appendChild(ageCard);

    //Mostramos los rangos de numero de jugadores registrados en la base de datos en un elemento ul.
    const listPlayers = document.getElementById('numberPlayers');
    const players = boardgameOptions.map(boardgame => boardgame.numberPlayers);
    const differentPlayers = [];

    for (let i = 0; i < players.length; i++) {
        if (!differentPlayers.includes(players[i])) {
            differentPlayers.push(players[i]);
        }
    }

    const playersCard = document.createElement('ul');

    differentPlayers.forEach(player => {
        const playerLi = document.createElement('li');
        playerLi.textContent = player;
        playersCard.appendChild(playerLi);
    });

    listPlayers.appendChild(playersCard);

    //Mostramos los rangos de precios registradas en la base de datos en un elemento ul.
    const listPrice = document.getElementById('price');
    const price = boardgameOptions.map(boardgame => boardgame.price);
    console.log(price)
    const differentPrices = [];
    let label = null;

    for (let i = 0; i < price.length; i++) {

        if (price[i] > 10.00) {
            label = '+10';
        }

        if (price[i] > 20.00) {
            label = '+20';
        }

        if (price[i] > 50.00) {
            label = '+50';
        }

        if (price[i] > 100.00) {
            label = '+100';
        }

        if(!differentPrices.includes(label)){
            differentPrices.push(label);
        }
    }

    const priceCard = document.createElement('ul');

    differentPrices.forEach(price => {
        const priceLi = document.createElement('li');
        priceLi.textContent = price;
        priceCard.appendChild(priceLi);
    });

    listPrice.appendChild(priceCard);
}

getListBoardgames();
getOptions();