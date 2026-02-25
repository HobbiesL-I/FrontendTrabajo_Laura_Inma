window.addEventListener('DOMContentLoaded', () => {
    console.log('detalles del juego de mesa');

    let params = new URLSearchParams(document.location.search);
    let idBoardgamePage = params.get("id");
    console.log(idBoardgamePage);

    let difficultyBoardgame = params.get("difficulty");
    console.log(difficultyBoardgame);

    const url = `http://localhost:8080/hobbies/boardgames/${idBoardgamePage}`;

    const getBoardgameData = async () => {
        try {
            const result = await fetch(url);
            const data = await result.json();
            console.log(data);
            createBoardgame(data);
        } catch (error) {
            console.error(error);
        }
    }

    const createBoardgame = (boardgame) => {
        console.log(boardgame);
        const boardgameElement = document.getElementById('boardgame');

        const {
            idBoardgame,
            name,
            numberPlayers,
            onePlayer,
            price,
            playTime,
            mecanic,
            age,
            difficulty,
            description,
            yearRelease,
            imageBoardgame,
            videoBoardgame,
            imageVideo
        } = boardgame

        const cardData = document.createElement(`section`);
        cardData.classList.add('container-boardgameData');
        cardData.innerHTML = `
             <div class="container-imageDescription">
                <h1>${name}</h1>
                <img src="${imageBoardgame}" alt="${name} image">
                <h2>Detalles</h2>
                <p>${description}</p>
            </div>

            <div class="container-data">
                <div class="data-information">
                    <div class="information-element">
                        <h2>${price}€</h2>
                        <div class="valorationMedia" id="valorationMedia">
                        </div>
                        <button onclick="window.location.href=''" class="btn-style"><i
                                class="fa-solid fa-star-half-stroke"></i>¡Valórame!</button>
                        <button onclick="window.location.href=''" 
                                class="btn-style" id="delete-${idBoardgame}"><i class="fa-solid fa-trash"></i></button>  
                        <a href="boardgameEditPage.html?id=${idBoardgame}&difficulty=${difficulty}">
                            <button class="btn-style">Editar</button>
                        </a>  
    
                        <div class="data-share">
                            <p>Compartir: </p>
                            <i class="fa-brands fa-square-x-twitter"></i>
                            <i class="fa-brands fa-whatsapp"></i>
                            <i class="fa-brands fa-tiktok"></i>
                        </div>
                        <table>
                            <tr>
                                <td><i class="fa-solid fa-users"></i></td>
                                <td><i class="fa-solid fa-user"></i></td>
                                <td><i class="fa-solid fa-user-clock"></i></td>
                            </tr>

                            <tr>
                                <td>${numberPlayers}</td>
                                <td><i class="fa-regular fa-circle-check"></i></td>
                                <td>${age}</td>
                            </tr>
                        </table>
                    </div>

                    <div  class="information-element">
                        <h2>Especificaciones</h2>
                        <p>Mecánica: ${mecanic}</p>
                        <p>Complejidad: ${difficulty}</p>

                        <div class="data-detail">
                            <i class="fa-solid  fa-hourglass fa-2x"></i>
                            <p>${playTime}</p>
                        </div>
                    </div>

                    <div class="video-tutorial">
                        <h2>Tutorial</h2>
                        <a href="${videoBoardgame}" target="_blank">
                            <img src="${imageVideo}" class="image-youtube" alt="Preview video youtube">
                            <div class="play-overlay">
                                <i class="fa-regular fa-circle-play fa-5x"></i>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        `;

        boardgameElement.appendChild(cardData);

    }

    const urlValoration = `http://localhost:8080/hobbies/valorationsBoardgame/${idBoardgamePage}`;

    const getValorationData = async () => {
        try {

            const result = await fetch(urlValoration);
            const valorationList = await result.json();
            console.log(valorationList);

            const filteredValorations = valorationList.filter(valoration => valoration.idBoardgame == idBoardgamePage);
            console.log('Valoraciones del juego con id ', idBoardgamePage, filteredValorations)

            if (filteredValorations.length === 0) {
                createValorationEmpty(filteredValorations);
            }
            else {
                createValoration(filteredValorations);
            }

        } catch (error) {
            console.error(error);
        }
    }

    const createValorationEmpty = () => {
        const cardValoration = document.getElementById('valorationSection');
        const valorationContent = document.createElement(`div`);
        valorationContent.classList.add('container-valorations');
        valorationContent.innerHTML = `
        <h1>¡Se el primero en valorar este juego!</h1>
        `
        cardValoration.appendChild(valorationContent);
    }

    const createValoration = (valorations) => {

        console.log(valorations);

        const cardValoration = document.getElementById('valorationSection');

        const cardValorationIntro = document.createElement(`div`);
        cardValorationIntro.classList.add('container-valorations');
        cardValorationIntro.innerHTML = `
            <h1>Mira lo que otros opinan</h1>
        `;

        cardValoration.appendChild(cardValorationIntro);

        const cardValorationList = document.createElement(`div`);
        cardValorationList.classList.add('valoration');

        valorations.forEach((valorationBoardgame) => {
            const {
                namePerson,
                qualification,
                review
            } = valorationBoardgame;

            const tableValoration = document.createElement(`table`);

            tableValoration.innerHTML = `
                    <tr>
                        <td><i class="fa-solid fa-star"></i> ${qualification}</td>
                        <td>Titulo de la valoración</td>
                    </tr>

                    <tr>
                        <td>${namePerson}</td>
                        <td>${review}</td>
                    </tr>
            `;
            cardValorationList.appendChild(tableValoration);
        });

        cardValorationIntro.appendChild(cardValorationList);

        const cardValorationMedia = document.getElementById('valorationMedia');
        const quantityValorations = valorations.length;
        let sumValorations = 0;

        valorations.forEach(valoration => {

            const {
                qualification
            } = valoration;

            sumValorations += qualification;
        });

        sumValorations = sumValorations / quantityValorations;

        if (sumValorations === 10) {
            cardValorationMedia.innerHTML = `
            <div class="stars">
                <p><i class="fa-solid fa-star"></i></p>
                <p><i class="fa-solid fa-star"></i></p>
                <p><i class="fa-solid fa-star"></i></p>
                <p><i class="fa-solid fa-star"></i></p>
                <p><i class="fa-solid fa-star"></i></p>
            </div>
            <div>
                <p>${quantityValorations} valoraciones</p>
            </div>
            `
        }

        if (sumValorations < 10 && sumValorations >= 8) {
            cardValorationMedia.innerHTML = `
            <div class="stars">
                <p><i class="fa-solid fa-star"></i></p>
                <p><i class="fa-solid fa-star"></i></p>
                <p><i class="fa-solid fa-star"></i></p>
                <p><i class="fa-solid fa-star"></i></p>
                <p><i class="fa-regular fa-star"></i></p>
            </div>
            <div>
                <p>${quantityValorations} valoraciones</p>
            </div>
            `
        }

        if (sumValorations < 8 && sumValorations >= 6) {
            cardValorationMedia.innerHTML = `
            <div class="stars">
                <p><i class="fa-solid fa-star"></i></p>
                <p><i class="fa-solid fa-star"></i></p>
                <p><i class="fa-solid fa-star"></i></p>
                <p><i class="fa-regular fa-star"></i></p>
                <p><i class="fa-regular fa-star"></i></p>
            </div>
            <div>
                <p>${quantityValorations} valoraciones</p>
            </div>
            `
        }

        if (sumValorations < 6 && sumValorations >= 4) {
            cardValorationMedia.innerHTML = `
            <div class="stars">
                <p><i class="fa-solid fa-star"></i></p>
                <p><i class="fa-solid fa-star"></i></p>
                <p><i class="fa-regular fa-star"></i></p>
                <p><i class="fa-regular fa-star"></i></p>
                <p><i class="fa-regular fa-star"></i></p>
            </div>
            <div>
                <p>${quantityValorations} valoraciones</p>
            </div>
            `
        }

        if (sumValorations < 4 && sumValorations >= 2) {
            cardValorationMedia.innerHTML = `
            <div class="stars">
                <p><i class="fa-solid fa-star"></i></p>
                <p><i class="fa-regular fa-star"></i></p>
                <p><i class="fa-regular fa-star"></i></p>
                <p><i class="fa-regular fa-star"></i></p>
                <p><i class="fa-regular fa-star"></i></p>
            </div>
            <div>
                <p>${quantityValorations} valoraciones</p>
            </div>
            `
        }

        if (sumValorations < 2) {
            cardValorationMedia.innerHTML = `
            <div class="stars">
                <p><i class="fa-regular fa-star"></i></p>
                <p><i class="fa-regular fa-star"></i></p>
                <p><i class="fa-regular fa-star"></i></p>
                <p><i class="fa-regular fa-star"></i></p>
                <p><i class="fa-regular fa-star"></i></p>
            </div>    
            <div>
                <p>${quantityValorations} valoraciones</p>
            </div>
            
            `
        }

    }

    const urlBoardgameList = `http://localhost:8080/hobbies/boardgames`;
    const getRecomendationData = async () => {
        try {
            const result = await fetch(urlBoardgameList);
            const recomendationList = await result.json();
            console.log(recomendationList);

            const filteredValorations = recomendationList.filter(recomendation => recomendation.difficulty == difficultyBoardgame);
            console.log('Recomendaciones del juego con id ', idBoardgamePage, filteredValorations);
            createRecomendation(recomendationList);
        } catch (error) {
            console.error(error);
        }
    }

    const createRecomendation = (recomendations) => {
        console.log(recomendations);

        const cardRecomendation = document.getElementById('sectionRecomendation');

        const cardRecomendationIntro = document.createElement(`div`);
        cardRecomendationIntro.classList.add('recomendation-list');
        cardRecomendationIntro.innerHTML = `
            <h1>Otros juegos que te podrian gustar</h1>
        `;

        cardRecomendation.appendChild(cardRecomendationIntro);

        const cardRecomendationList = document.createElement(`div`);
        cardRecomendationList.classList.add('recomendation-list');

        const maxRecomendations = 4;
        let recomendationQuantity = 0;
        const currentDifficulty = difficultyBoardgame;

        recomendations.forEach((boardgameRecomendation) => {
            const {
                idBoardgame,
                name,
                difficulty,
                imageBoardgame
            } = boardgameRecomendation;

            if (difficulty === currentDifficulty && recomendationQuantity <= maxRecomendations && idBoardgame != idBoardgamePage) {

                const recomendation = document.createElement(`div`);
                recomendation.innerHTML = `
                    <div>
                    <div class="recomendation-boardgame">
                        <img class="boardgame-image" src="${imageBoardgame}">
                        <p>${name}</p>
                        <div>
                            <a href="boardgamePage.html?id=${idBoardgame}&difficulty=${difficulty}">
                                <button class="btn-style">Más información</button>
                            </a>
                            <button onclick="window.location.href=''" class="btn-style">Valorar</button>
                        </div>
                    </div>
                </div>
            `;
                cardRecomendationList.appendChild(recomendation);
                recomendationQuantity++;
            }
        });

        cardRecomendation.appendChild(cardRecomendationList);

    }

    getBoardgameData().then(() => {
        getValorationData();
        getRecomendationData();
    });

});

