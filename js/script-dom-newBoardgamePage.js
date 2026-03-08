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

            const {
                name,
                numberPlayers,
                price, playTime,
                mecanic,
                age,
                difficulty,
                imageBoardgame,
                videoBoardgame,
                imageVideo,
                imageBoardgame2
            } = dataSendAPI;

            if (!name) {
                Swal.fire({
                    title: 'El campo título está vacío',
                    confirmButtonText: 'Volver al formulario'
                });
                return;
            }

            if (numberPlayers === 0 || !numberPlayers) {
                Swal.fire({
                    title: 'El campo jugadores está vacío',
                    confirmButtonText: 'Volver al formulario'
                });
                return;
            }

            if (price === 0 || !price) {
                Swal.fire({
                    title: 'El campo precio está vacío',
                    confirmButtonText: 'Volver al formulario'
                });
                return;
            }

            if (playTime === 0 || !playTime) {
                Swal.fire({
                    title: 'El campo duración está vacío',
                    confirmButtonText: 'Volver al formulario'
                });
                return
            }

            if (!mecanic) {
                Swal.fire({
                    title: 'El campo mecánicas está vacío',
                    confirmButtonText: 'Volver al formulario'
                });
                return;
            }

            if (!age) {
                Swal.fire({
                    title: 'El campo edad mínima está vacío',
                    confirmButtonText: 'Volver al formulario'
                });
                return;
            }

            if (!difficulty) {
                Swal.fire({
                    title: 'El campo dificultad está vacío',
                    confirmButtonText: 'Volver al formulario'
                });
                return;
            }

            if (!imageBoardgame) {
                Swal.fire({
                    title: 'El campo imagen del producto está vacío',
                    confirmButtonText: 'Volver al formulario'
                });
                return;
            }

            if (!imageBoardgame2) {
                Swal.fire({
                    title: 'El campo otra imagen está vacío',
                    confirmButtonText: 'Volver al formulario'
                });
                return;
            }

            if (!videoBoardgame) {
                Swal.fire({
                    title: 'El campo enlace del video está vacío',
                    confirmButtonText: 'Volver al formulario'
                });
                return;
            }

            if (!imageVideo) {
                Swal.fire({
                    title: 'El campo thumbnail del video está vacío',
                    confirmButtonText: 'Volver al formulario'
                });
                return;
            }

            await sendNewBoardgame(dataSendAPI);

        });
    }

    const sendNewBoardgame = async (dataSendAPI) => {
        try {
            const postResponse = await fetch(urlNewBoardgame, {
                method: "POST",
                body: JSON.stringify(dataSendAPI),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

            if (postResponse.ok) {
                Swal.fire({
                    title: 'Nuevos datos añadidos!',
                    text: 'Se ha añadido el juego de mesa a la base de datos',
                    icon: 'success',
                    iconColor: '#318a3a',
                    confirmButtonText: 'Volver al catálogo',
                    confirmButtonColor: '#2a1418'
                }).then(() => {
                    window.location.href = `boardgameListPage.html`;
                });
            }
            else {
                Swal.fire({
                    title: 'Error',
                    text: `Error: ${postResponse.status}`,
                    icon: 'error'
                });
            }
        }
        catch {
            Swal.fire({
                title: 'Error de conexión',
                text: error.message,
                icon: 'error'
            });
        }
    }

    getNewBoardgame();
});    