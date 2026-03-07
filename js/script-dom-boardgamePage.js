window.addEventListener('DOMContentLoaded', () => {
    console.log('detalles del juego de mesa');

    let params = new URLSearchParams(document.location.search);
    let idBoardgamePage = params.get("id");
    console.log(idBoardgamePage);

    let difficultyBoardgame = params.get("difficulty");
    console.log(difficultyBoardgame);

    const url = `http://localhost:8080/hobbies/boardgames/${idBoardgamePage}`;
    const urlValoration = `http://localhost:8080/hobbies/valorationsBoardgame/${idBoardgamePage}`;

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

        const {
            idBoardgame,
            name,
            onePlayer,
            numberPlayers,
            price,
            playTime,
            mecanic,
            age,
            difficulty,
            description,
            yearRelease,
            imageBoardgame,
            videoBoardgame,
            imageVideo,
            imageBoardgame2
        } = boardgame;

        document.title=`${name}`;

        const cardBoardgameIntro = document.getElementById('boardgame-intro');

        const cardSectionIntro = document.createElement(`section`);
        cardSectionIntro.classList.add('intro-boardgame');

        cardSectionIntro.innerHTML = `
        <div class="intro">
                <h2 class="h2-color">${name}</h2>
                <div class="stars">
                    <div class="stars" id="stars"></div>
                </div>
            </div>
            <div class="display-information">
                <div class="information">
                    <h1><i class="fa-solid fa-user-group icon"></i></h1>

                    <div class="information-subElements">
                        <p class="sub-p">Jugadores</p>
                        <p class="font-subelement">${numberPlayers}</p>
                    </div>
                </div>

                <div class="information">
                    <h1><i class="fa-solid fa-user icon"></i></h1>

                    <div class="information-subElements">
                        <p class="sub-p">Solitario</p>
                        <p class="font-subelement" id="onePlayer-message">${onePlayer ? '¡Juega solo!' : 'No se puede'}</p>
                    </div>
                </div>

                <div class="information">
                    <h1><i class="fa-solid fa-hourglass-start icon"></i></h1>

                    <div class="information-subElements">
                        <p class="sub-p">Tiempo</p>
                        <p class="font-subelement">${playTime}</p>
                    </div>
                </div>

                <div class="information">
                    <h1><i class="fa-solid fa-thumbs-up icon"></i></h1>
                    <div class="information-subElements">
                        <p class="sub-p">Valora</p>
                        <p class="font-subelement">Da tu opinión</p>
                    </div>
                </div>

                <div class="information">
                    <h1><i class="fa-solid fa-trash icon"></i></h1>
                    <div class="information-subElements">
                        <p class="sub-p">Elimina</p>
                        <p class="font-subelement">Elimina el juego</p>
                    </div>
                </div>
            </div>
        `;

        cardBoardgameIntro.appendChild(cardSectionIntro);
        document.querySelector('.intro').style.backgroundImage = `url(${imageBoardgame2})`;

        const cardBoardgameColumn1 = document.getElementById('boardgame-column1');
        const cardDivColumn1 = document.createElement(`div`);
        cardDivColumn1.classList.add('boardgame-description');

        cardDivColumn1.innerHTML = `
            <img class="boardgame-image"
                    src="${imageBoardgame}">
                <div class="boardgame-details">
                    <h1>Detalles</h1>
                    <p>${description}</p>
                    <div>
                        <h1>Mecanica</h1>
                        <p>${mecanic}</p>
                    </div>
                    <div class="display-information">

                        <div class="information">
                            <h1><i class="fa-solid fa-book-open icon"></i></h1>

                            <div class="information-subElements">
                                <p class="sub-p">Dificultad</p>
                                <p class="font-subelement">${difficulty}</p>
                            </div>
                        </div>

                        <div class="information">
                            <h1><i class="fa-solid fa-circle-info icon"></i></h1>

                            <div class="information-subElements">
                                <p class="sub-p">Edad</p>
                                <p class="font-subelement">${age}</p>
                            </div>
                        </div>

                        <div class="information">
                            <h1><i class="fa-solid fa-euro-sign icon"></i></h1>

                            <div class="information-subElements">
                                <p class="sub-p">Precio</p>
                                <p class="font-subelement">${price}</p>
                            </div>
                        </div>

                        <div class="information">
                            <h1><i class="fa-solid fa-calendar icon"></i></h1>

                            <div class="information-subElements">
                                <p class="sub-p">Año de salida</p>
                                <p class="font-subelement">${yearRelease}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <a href="boardgameListPage.html">
                            <button class="btn-style" id="deleteBoardgame">
                            <i class="fa-solid fa-trash"></i> Eliminar juego</button>
                        </a>    

                        <a href="valorateBoardgamePage.html?id=${idBoardgamePage}">
                            <button class="btn-style">
                            <i class="fa-solid fa-comment-medical"></i> ¡Valóralo!</button>
                        </a>    
                    </div>
                    

                </div>
            </div>
        `;

        cardBoardgameColumn1.appendChild(cardDivColumn1);

        const cardValorationsColumn1 = document.createElement(`div`);
        cardValorationsColumn1.classList.add('container-valorations');

        cardValorationsColumn1.innerHTML = `
            <div class="valoration-intro">
                    <h1>¡Mira lo que otros usuarios opinan de este juego!</h1>
                    <p>Descubre las experiencias reales de quien ya ha probado este juego: desde sus puntos
                        fuertes hasta los pequeños matices que lo hacen único. Sus valoraciones te ayudarán a saber si
                        este juego encaja con tu estilo de partida y qué esperar antes de jugarlo por primera vez.</p>
                </div>
                <div class="valorations-section" id="valorations">

                </div>
        `;

        cardBoardgameColumn1.appendChild(cardValorationsColumn1);

        const cardBoardgameColumn2 = document.getElementById('boardgame-column2');

        const cardEditBoardgame = document.createElement(`div`);
        cardEditBoardgame.classList.add('edit-boardgame');
        cardEditBoardgame.innerHTML = `
            <h1>¿Ves algo raro?</h1>
            <p>Si ves que el número de jugadores, la duración, la dificultad, el año de publicación u otro detalle
                    de este juego no es correcto, puedes corregirlo para que la información esté siempre al día.</p>
            <a href="boardgameEditPage.html?id=${idBoardgame}">
                <button class="btnEdit-style">
                    <i class="fa-solid fa-pen-to-square"></i> ¡Edítame!</button>
            </a>
        `;

        cardBoardgameColumn2.appendChild(cardEditBoardgame);


        const cardVideo = document.createElement(`div`);
        cardVideo.classList.add('video');
        cardVideo.innerHTML = `
            <h1>¿No sabes como jugar?</h1>
            <div class="video-tutorial">
                <a href="${videoBoardgame}" target="_blank">
                    <img src="${imageVideo}" class="image-youtube"
                        alt="Preview video youtube">
                    <div class="play-overlay">
                        <i class="fa-regular fa-circle-play fa-5x"></i>
                    </div>
                </a>
            </div>
        `;

        cardBoardgameColumn2.appendChild(cardVideo);

        const cardRecomendations = document.createElement(`div`);
        cardRecomendations.classList.add('recomendations')
        cardRecomendations.innerHTML = `
            <h1>Juegos recomendados</h1>
            <p>Creemos que estos juegos te pueden interesar</p>

            <div class="boardgame-recomendation" id="boardgameRecomendation">
            </div>
        `;

        cardBoardgameColumn2.appendChild(cardRecomendations);

        const deleteBtn = document.getElementById('deleteBoardgame');
        deleteBtn.addEventListener('click', async (e) => {
            e.preventDefault();

            const confirmAction = window.confirm(`¿Segur@ que deseas eliminar el juego de mesa ${name}? También se eliminarán las valoraciones que tenga.`);
            if(!confirmAction) return;

            await deleteBoardgame(idBoardgamePage);
        });

        const deleteBoardgame = async () => {
            try {
                const deleteResponse = await fetch(`http://localhost:8080/hobbies/boardgames/${idBoardgame}`, {
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json; charset=UFT-8",

                    }
                });

                if (deleteResponse.ok) {
                    console.log('Juego de mesa eliminado');
                    window.location.href = 'boardgameListPage.html';
                }
                else {
                    console.error('Error: ', deleteResponse.status);
                }
            } catch (error) {
                console.error('Error: ', error);
            }
        }
    }

    const getStarsBoardgame = async () => {
        try {

            const result = await fetch(urlValoration);
            const valorationList = await result.json();
            console.log(valorationList);

            const filteredValorations = valorationList.filter(valoration => valoration.idBoardgame == idBoardgamePage);
            console.log('Valoraciones del juego con id ', idBoardgamePage, filteredValorations)

            createStarsBoardgame(filteredValorations);

        } catch (error) {
            console.error(error);
        }
    }

    const createStarsBoardgame = (boardgameValoration) => {
        console.log(boardgameValoration);

        const cardStars = document.getElementById('stars');
        cardStars.innerHTML = ``

        let qualificationBoardgame = 0;
        let quantityValorations = 0;
        let mediaQualifications = 0;

        boardgameValoration.forEach((valoration) => {

            const {
                qualification
            } = valoration;

            qualificationBoardgame += qualification;
            quantityValorations++;
        });

        mediaQualifications = qualificationBoardgame / quantityValorations;
        mediaQualifications = Math.round(mediaQualifications * 100) / 100;

        const getStars = (qualification) => {
            console.log(qualification);
            const valorationStarsBoardgame = Math.trunc(qualification / 2);
            console.log(valorationStarsBoardgame);
            const emptyStarsBoardgame = 5 - valorationStarsBoardgame;
            let htmlStarsBoardgame = ' '

            for (let i = 0; i < valorationStarsBoardgame; i++) {
                htmlStarsBoardgame += '<i class="fa-solid fa-star icon-color"></i>'
            }

            for (let i = 0; i < emptyStarsBoardgame; i++) {
                htmlStarsBoardgame += '<i class="fa-regular fa-star icon-color"></i>'
            }

            return htmlStarsBoardgame;
        };

        cardStars.innerHTML = getStars(mediaQualifications);

        mediaQualifications = mediaQualifications || 0;

        const cardValoration = document.createElement(`p`);
        cardValoration.classList.add('p-color');
        cardValoration.innerHTML = `
            <b>${mediaQualifications}/10</b>
        `
        cardStars.appendChild(cardValoration);
    }

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
        const cardValoration = document.getElementById('valorations');
        const valorationContent = document.createElement(`div`);

        valorationContent.classList.add('valorationsEmpty');
        valorationContent.innerHTML = `
        <h2>Todavía no hay valoraciones de este juego</h2>`
        cardValoration.appendChild(valorationContent);
    }

    const createValoration = (valorations) => {

        console.log(valorations);

        const cardValoration = document.getElementById('valorations');

        valorations.forEach((boardgameValoration) => {
            const divCardValoration = document.createElement(`div`);
            divCardValoration.classList.add('valoration-card');

            const {
                namePerson,
                qualification,
                review
            } = boardgameValoration;

            const getStars = (qualification) => {
                const valorationStarsBoardgame = Math.trunc(qualification / 2);
                console.log(valorationStarsBoardgame);
                const emptyStarsBoardgame = 5 - valorationStarsBoardgame;
                let htmlStarsBoardgame = ' '

                for (let i = 0; i < valorationStarsBoardgame; i++) {
                    htmlStarsBoardgame += '<i class="fa-solid fa-star"></i>'
                }

                for (let i = 0; i < emptyStarsBoardgame; i++) {
                    htmlStarsBoardgame += '<i class="fa-regular fa-star"></i>'
                }

                return htmlStarsBoardgame;


            };

            divCardValoration.innerHTML = `
            <div class="card-header">
                <i class="fa-regular fa-comment-dots fa-2x"></i>
                <h3 class="user-name">${namePerson}</h3>
                <div>${getStars(qualification)}</div>
                <h3>${qualification}</h3>
                </div>
                <p class="text-align">${review}</p>
            `
            cardValoration.appendChild(divCardValoration);
        });

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

        const cardRecomendations = document.getElementById('boardgameRecomendation');

        const maxRecomendations = 3;
        let recomendationQuantity = 0;

        recomendations.forEach((boardgameRecomendation) => {

            const cardBoardgameRecomendation = document.createElement(`div`);
            cardBoardgameRecomendation.classList.add('boardgame');

            const {
                idBoardgame,
                name,
                numberPlayers,
                playTime,
                imageBoardgame
            } = boardgameRecomendation;



            if (recomendationQuantity < maxRecomendations && idBoardgame !== Number(idBoardgamePage)) {
                cardBoardgameRecomendation.innerHTML = `
                <a href="boardgamePage.html?id=${idBoardgame}">
                    <img class="image-size" src="${imageBoardgame}">
                </a>
                    <div>
                        <h2>${name}</h2>
                        <div class="little-info">
                            <p><i class="fa-solid fa-user-group"></i>${numberPlayers}</p>
                            <p><i class="fa-solid fa-user-group"></i>${playTime}</p>
                        </div>
                    </div>
                    
                `

                cardRecomendations.appendChild(cardBoardgameRecomendation);
                recomendationQuantity++;

            }
        });

    }

    getBoardgameData().then(() => {
        getStarsBoardgame();
        getValorationData();
        getRecomendationData();
    });

});

