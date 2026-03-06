window.addEventListener('DOMContentLoaded', () => {
    console.log('Añadir una valoración nueva');

    let params = new URLSearchParams(document.location.search);
    let idBoardgamePage = params.get("id");
    console.log(idBoardgamePage);
    const urlBoardgame = `http://localhost:8080/hobbies/boardgames/${idBoardgamePage}`;
    const url = `http://localhost:8080/hobbies/valorationsBoardgame`;

    const getBoardgameData = async () => {
        try {
            const result = await fetch(urlBoardgame);
            const data = await result.json();
            console.log(data);
            createBoardgameData(data);
        } catch (error) {
            console.error(error);
        }
    }

    const createBoardgameData = (boardgame) => {
        console.log(boardgame);

        const {
            name,
            imageBoardgame,
            numberPlayers,
            playTime,
            age,
            difficulty
        } = boardgame

        document.title =`Valorando ${name}`;

        const cardBoardgameSummary = document.getElementById('boardgame-summary');
        cardBoardgameSummary.innerHTML = `
            <div class="image">
                <img src="${imageBoardgame}" alt="Portada del juego" class="game-cover">
            </div>

            <div class="data">
                <h1>${name}</h1>
                <div class="data-group">
                    <div class="data-boardgame1">
                        <div>
                            <p class="p-color"> Jugadores</p>
                            <p class="stat-value"><i class="fa-solid fa-user-group icon"></i> ${numberPlayers}</p>
                        </div>

                        <div>
                            <p class="p-color">Tiempo de partida</p>
                            <p class="stat-value"><i class="fa-solid fa-hourglass-start icon"></i> ${playTime}</p>

                        </div>
                    </div>
                    <div class="data-boardgame2">
                        <div>
                            <p class="p-color">Edad</p>
                            <p class="stat-value"><i class="fa-solid fa-circle-info icon"></i> ${age}</p>

                        </div>
                        <div>
                            <p class="p-color">Dificultad</p>
                            <p class="stat-value"><i class="fa-solid fa-book-open icon"></i> ${difficulty}</p>

                        </div>
                    </div>
                </div>
            </div>
        `
    }

    const getNewValoration = async () => {
        try {
            const result = await fetch(url);
            const data = await result.json();
            console.log(data);
            createNewValoration(data);
        } catch (error) {
            console.error(error);
        }
    }

    const createNewValoration = () => {

        const cardValorationPage = document.getElementById('valoration-page');
        cardValorationPage.innerHTML = `
            <h1>Añade tu valoración</h1>
            <p>¡Queremos conocer tu opinión! Cuéntanos qué te ha parecido y ayuda a otros usuarios a decidir.
                Rellena los campos con tu puntuación y un breve comentario sobre tu experiencia.
                Tu valoración es muy importante para seguir mejorando</p>
        `

        const cardAddValoration = document.getElementById('addValoration');
        cardAddValoration.innerHTML = `
            <div class="text-valoration">
                <h2>¡Danos tu opinión!</h2>
                <p>Comparte tu opinión sobre este juego</p>
            </div>


            <div class="form-row">
                <label>Nombre o apodo *: </label>
                <input type="text" id="namePerson" value="" required placeholder="Ej: jugador2025">
            </div>

            <div class="form-row">
                <label>Calificación *: </label>
                <input type="number" id="qualification" value="" min="0" max="10" step="0.1" required placeholder="Ej: 9.14">
            </div>

            <div class="form-row full">
                <label>Review:</label>
                <textarea id="description" placeholder="¡Da tu opinión!"></textarea>
            </div>

            <div class="form-actions">
                <a href="boardgameListPage.html">
                    <button class="btn btn-secondary">Cancelar</button>
                </a>
                <a href="boardgamePage.html?id=${idBoardgamePage}">
                    <button class="btn btn-primary" id="saveChanges">Publicar Valoración</button>
                </a>
            </div>
        `

        const saveBtn = document.getElementById('saveChanges');
        saveBtn.addEventListener('click', async (e) => {

            e.preventDefault();

            const qualification = parseFloat(document.getElementById('qualification').value);

            const dataSendAPI = {
                idBoardgame: parseInt(idBoardgamePage),
                namePerson: document.getElementById('namePerson').value.trim(),
                qualification: qualification,
                review: document.getElementById('description').value.trim()
            }

            console.log("Datos: ", dataSendAPI);

            await sendNewValoration(dataSendAPI);

        });
    }

    const sendNewValoration = async (dataSendAPI) => {
        try {
            const postResponse = await fetch(url, {
                method: "POST",
                body: JSON.stringify(dataSendAPI),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            });

            if (postResponse.ok) {
                console.log('Juego de mesa actualizado');
                window.location.href = `boardgamePage.html?id=${idBoardgamePage}`;
            }
            else {
                console.error('Error: ', postResponse.status);
            }
        }
        catch {
            console.error('Error: ', error);
        }
    }

    getBoardgameData();
    getNewValoration();
});



