window.addEventListener('DOMContentLoaded', () => {
    console.log('Editar del juego de mesa');

    let params = new URLSearchParams(document.location.search);
    let idBoardgamePage = params.get("id");
    console.log(idBoardgamePage);

    const url = `http://localhost:8080/hobbies/boardgames/${idBoardgamePage}`;

    const getEditBoardgameData = async () => {
        try {
            const result = await fetch(url);
            const data = await result.json();
            console.log(data);
            editBoardgame(data);
        } catch (error) {
            console.error(error);
        }
    }

    const editBoardgame = (boardgame) => {
        console.log(boardgame);

        const {
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
            imageVideo,
            imageBoardgame2
        } = boardgame

        document.title=`Editando ${name}`;

        const previewInfo = document.getElementById('boardgame-summary');
        previewInfo.classList.add('boardgame-summary');

        previewInfo.innerHTML = `
            <img src="${imageBoardgame}" alt="Portada del juego"
                class="game-cover">

            <h1>${name}</h1>

            <div class="old-stats">
                <div class="stat">
                    <p class="stat-value">${numberPlayers}</p>
                    <p>Jugadores</p>
                </div>
                <div class="stat">
                    <p class="stat-value">${playTime}</p>
                    de partida
                </div>
                <div class="stat">
                    <p class="stat-value">${age}</p>
                    Edad
                </div>
                <div class="stat">
                    <p class="stat-value">${difficulty}</p>
                    Dificultad
                </div>
            </div>
        `

        const cardGameForm = document.getElementById('game-form');
        cardGameForm.classList.add('game-form');
        cardGameForm.innerHTML = `
        <h2>Editar ${name}</h2>

            <div class="form-section">
                <h3>Datos básicos</h3>
                <div class="form-row">
                    <label>Título:</label>
                    <input type="text" id="name" value="${name}" required placeholder="Ej: Catan">
                </div>
                <div class="form-row">
                    <label>Año:</label>
                    <input type="number" id="yearRelease" value="${yearRelease}" min="1900" max="2030">
                </div>
                <div class="form-row">
                    <label>Precio:</label>
                    <input type="text" id="price" value="${price || ''}" placeholder="Ej: 19.20">
                </div>
                <div class="form-row">
                    <label>Primera imagen juego de mesa:</label>
                    <input type="url" id="imageBoardgame" value="${imageBoardgame}" placeholder="https://ejemplo.com/imagen.jpg">
                </div>

                 <div class="form-row">
                    <label>Segunda imagen juego de mesa:</label>
                    <input type="url" id="imageBoardgame2" value="${imageBoardgame2}" placeholder="https://ejemplo.com/imagen.jpg">
                </div>
            </div>

            <div class="form-section">
                <h3>Jugabilidad (Marca la casilla Solitario si es también para 1 jugador)</h3>
                <div class="form-row-checkbox">
                    <label>Solitario:</label>
                    <input type="checkbox" id="onePlayer" ${onePlayer ? 'checked' : ''}>
                </div>
                <div class="form-row">
                    <label>Jugadores:</label>
                    <input type="text" id="numberPlayers" value="${numberPlayers}" placeholder="Ej: 2-6">
                </div>
                <div class="form-row">
                    <label>Duración:</label>
                    <input type="text" id="playTime" value="${playTime}" placeholder="Ej: 60-120 min">
                </div>
                <div class="form-row">
                    <label>Edad mínima:</label>
                    <input type="text" id="age" value="${age || ''}" placeholder="Ej: 12+">
                </div>
                <div class="form-row">
                    <label>Dificultad:</label>
                    <input type="text" id="difficulty" value="${difficulty}" placeholder="Ej: 12+">
                </div>
            </div>

            <div class="form-section">
                <h3>Detalles adicionales</h3>
                <div class="form-row">
                    <label>Mecánicas:</label>
                    <input type="text" id="mecanic" value="${mecanic}">
                </div>
                <div class="form-row full">
                    <label>Descripción:</label>
                    <textarea id="description"
                        placeholder="Describe el juego...">${description}</textarea>
                </div>
            </div>

            <div class="form-section">
                <h3>Video Youtube</h3>
                <div class="form-row">
                    <label>Enlace video:</label>
                    <input type="url" id="videoBoardgame" value="${videoBoardgame}" placeholder="https://www.youtube.com/watch?v=JuLl-Kb7EHw">
                </div>
                <div class="form-row">
                    <label>Thumbnail video:</label>
                    <input type="url" id="imageVideo" value="${imageVideo}" placeholder="https://img.youtube.com/vi/JuLl-Kb7EHw/mqdefault.jpg">
                </div>
            </div>

            <div class="form-actions">
                <a href="boardgamePage.html?id=${idBoardgamePage}">
                    <button class="btn btn-secondary">Cancelar</button>
                </a>
                <a href="boardgameListPage.html">
                    <button class="btn btn-primary" id="saveChanges">Guardar cambios</button>
                </a>
            </div>
        `

        const saveBtn = document.getElementById('saveChanges');
        saveBtn.addEventListener('click', async (e) => {

            e.preventDefault();

            const dataSendAPI = {
                name: document.getElementById('name').value.trim(),
                numberPlayers: document.getElementById('numberPlayers').value.trim(),
                onePlayer: document.getElementById('onePlayer').checked,
                price: parseFloat(document.getElementById('price').value.replace('€', '')),
                playTime: document.getElementById('playTime').value.trim(),
                mecanic: document.getElementById('mecanic').value.trim(),
                age: document.getElementById('age').value,
                difficulty: document.getElementById('difficulty').value.trim(),
                description: document.getElementById('description').value.trim(),
                yearRelease: parseInt(document.getElementById('yearRelease').value),
                imageBoardgame: document.getElementById('imageBoardgame').value.trim(),
                videoBoardgame: document.getElementById('videoBoardgame').value.trim(),
                imageVideo: document.getElementById('imageVideo').value.trim(),
                imageBoardgame2: document.getElementById('imageBoardgame2').value.trim()
            }

            await sendDataBoardgame(dataSendAPI, idBoardgamePage);

        });
    }

    const sendDataBoardgame = async (dataSendAPI, idBoardgamePage) => {
        try {
            const PutResponse = await fetch(`http://localhost:8080/hobbies/boardgames/${idBoardgamePage}`, {
                method: "PUT",
                body: JSON.stringify(dataSendAPI),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            });

            if (PutResponse.ok) {
                console.log('Juego de mesa actualizado');
                window.location.href = `boardgamePage.html?id=${idBoardgamePage}`;
            }
            else {
                console.error('Error: ', PutResponse.status);
            }
        }
        catch {
            console.error('Error: ', error);
        }
    }

    getEditBoardgameData();
});