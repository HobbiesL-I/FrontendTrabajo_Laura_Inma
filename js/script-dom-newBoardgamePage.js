window.addEventListener('DOMContentLoaded', () => {
    console.log('Añadir un nuevo juego de mesa');

    const urlNewBoardgame = `http://localhost:8080/hobbies/boardgames`;

    const getNewBoardgame = async () => {
        try {
            const result = await fetch(urlNewBoardgame);
            const data = await result.json();
            console.log(data);
            createNewBoardgame(data);
        } catch (error) {
            console.error(error);
        }
    }

    const createNewBoardgame = () => {

        const cardIntroNew = document.getElementById('newBoardgame-intro');
        cardIntroNew.innerHTML = `
            <h1>¡Añade tu propio juego!</h1>
            <h3>¡Crea tu entrada en nuestra base de datos!</h3>
            <p>Comparte tu juego favorito con la comunidad. Rellena todos los campos con la información más completa posible
                para que otros jugadores puedan descubrirlo fácilmente. Tu contribución ayuda a crecer nuestra colección
                colaborativa de juegos de mesa</p>
        `;

        const cardFormBoardgame = document.getElementById('game-form');
        cardFormBoardgame.innerHTML = `
            <div class="form-section">
            <h3>Datos básicos</h3>
            <div class="form-row">
                <label>Título:</label>
                <input type="text" id="name" value="" required placeholder="Ej: Catan">
            </div>
            <div class="form-row">
                <label>Año:</label>
                <input type="number" id="yearRelease" value="" min="1900" max="2030" placeholder="Ej: 2026">
            </div>
            <div class="form-row">
                <label>Precio:</label>
                <input type="text" id="price" value="" placeholder="Ej: 19.20">
            </div>
            <div class="form-row">
                <label>Imagen del producto:</label>
                <input type="url" id="imageBoardgame" value="" placeholder="https://ejemplo.com/imagen.jpg">
            </div>

            <div class="form-row">
                <label>Otra imagen:</label>
                <input type="url" id="imageBoardgame2" value="" placeholder="https://ejemplo.com/imagen.jpg">
            </div>
        </div>

        <div class="form-section">
            <h3>Jugabilidad (Marca la casilla Solitario si es también para 1 jugador)</h3>
            <div class="form-row-checkbox">
                <label>Solitario:</label>
                <input type="checkbox" id="onePlayer" value="">
            </div>
            <div class="form-row">
                <label>Jugadores:</label>
                <input type="text" id="numberPlayers" value="" placeholder="Ej: 2-6">
            </div>
            <div class="form-row">
                <label>Duración:</label>
                <input type="text" id="playTime" value="" placeholder="Ej: 60-120 min">
            </div>
            <div class="form-row">
                <label>Edad mínima:</label>
                <input type="text" id="age" value="" placeholder="Ej: 12+">
            </div>
            <div class="form-row">
                <label>Dificultad:</label>
                <input type="text" id="difficulty" value="" placeholder="Ej: 12+">
            </div>
        </div>

        <div class="form-section">
            <h3>Detalles adicionales</h3>
            <div class="form-row">
                <label>Mecánicas:</label>
                <input type="text" id="mecanic" value="" placeholder="Ej: Apilar cartas">
            </div>
            <div class="form-row full">
                <label>Descripción:</label>
                <textarea id="description" placeholder="Describe el juego..."></textarea>
            </div>
        </div>

        <div class="form-section">
            <h3>Video Youtube</h3>
            <div class="form-row">
                <label>Enlace video:</label>
                <input type="url" id="videoBoardgame" value=""
                    placeholder="https://www.youtube.com/watch?v=JuLl-Kb7EHw">
            </div>
            <div class="form-row">
                <label>Thumbnail video:</label>
                <input type="url" id="imageVideo" value=""
                    placeholder="https://img.youtube.com/vi/JuLl-Kb7EHw/mqdefault.jpg">
            </div>
        </div>

        <div class="form-actions">
            <a href="boardgameListPage.html">
                <button class="btn btn-secondary">Cancelar</button>
            </a>
            <a href="boardgameListPage.html">
                <button class="btn btn-primary" id="saveChanges">Añadir juego</button>
            </a>
        </div>
        `;

        const saveBtn = document.getElementById('saveChanges');
        saveBtn.addEventListener('click', async (e) => {

            e.preventDefault();

            const dataSendAPI = {
                name: document.getElementById('name').value.trim(),
                numberPlayers: document.getElementById('numberPlayers').value.trim(),
                onePlayer: document.getElementById('onePlayer').checked,
                price: parseFloat(document.getElementById('price').value),
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

            console.log("Datos: ", dataSendAPI);

            await sendNewValoration(dataSendAPI);

        });
    }

    const sendNewValoration = async (dataSendAPI) => {
        try {
            const postResponse = await fetch(urlNewBoardgame, {
                method: "POST",
                body: JSON.stringify(dataSendAPI),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            });

            if (postResponse.ok) {
                console.log('Juego de mesa actualizado');
                window.location.href = `boardgameListPage.html`;
            }
            else {
                console.error('Error: ', postResponse.status);
            }
        }
        catch {
            console.error('Error: ', error);
        }
    }

    getNewBoardgame();
});    