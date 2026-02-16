window.addEventListener('DOMContentLoaded', (event) => {
    console.log('detalles del juego de mesa');

    let params = new URLSearchParams(document.location.search);
    let id = params.get("id");
    console.log(id);

    const url = `http://localhost:8080/hobbies/boardgames/${id}`;

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
        const boardgameElement = document.getElementById('content');

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
            videoBoardgame
        } = boardgame

        const card = document.createElement(`section`);
        card.classList.add('container-boardgameData');
        card.innerHTML = `
            <div class="container-images">
                <div class="slider-frame">
                    <ul>
                        <li><img src="${imageBoardgame}" alt=""></li>
                        <li><img src="${videoBoardgame}" alt=""></li>
                        <li><img src="https://placehold.co/150x100" alt=""></li>
                        <li><img src="https://placehold.co/150x100" alt=""></li>
                    </ul>
                </div>
                <p>${description}</p>
            </div>

            <div class="container-data">
                <div class="data-title">
                    <h1>${name}</h1>
                </div>

                <div class="data-information">
                    <div class="information-element">
                        <h2>${price}</h2>
                        <button onclick="window.location.href=''" class="btn-style"><i
                                class="fa-solid fa-star-half-stroke"></i>¡Valórame!</button>
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
                                <!--TODO Falta poner que si onePlayer is true sale una cosa y si onePlayer is false sale otra-->
                                <td><i class="fa-regular fa-circle-check"></i></td>
                                <td>${age}</td>
                            </tr>
                        </table>
                    </div>

                    <div>
                        <h2>Especificaciones</h2>
                        <p>Mecánica: ${mecanic}</p>
                        <p>Complejidad: ${difficulty}</p>

                        <div class="data-detail">
                            <i class="fa-solid  fa-hourglass fa-2x"></i>
                            <p>${playTime}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        boardgameElement.appendChild(card);
    }

    getBoardgameData();

});

