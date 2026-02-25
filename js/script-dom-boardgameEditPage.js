window.addEventListener('DOMContentLoaded', () => {
    console.log('Editar del juego de mesa');

    let params = new URLSearchParams(document.location.search);
    let idBoardgamePage = params.get("id");
    console.log(idBoardgamePage);

    let difficultyBoardgame = params.get("difficulty");
    console.log(difficultyBoardgame);

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
        const boardgameElement = document.getElementById('editBoardgame');

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
            imageVideo
        } = boardgame

        const cardData = document.createElement(`section`);
        cardData.classList.add('container-boardgameData');
        cardData.innerHTML = `

            <div class="container-data">
                
                <div class="data-information">
                    <div>
                        <h2>Nombre del juego</h2>
                        <textarea id="name">${name}</textarea>
                    <div>
                        <textarea id="imageBoardgame">${imageBoardgame}</textarea>
                        <h2>Detalles</h2>
                        <textarea id="description">${description}</textarea>
                    </div>
                    <div class="information-element">
                        <div>
                            <h1>Precio</h1>
                            <!--cambiar a input para los que contienen poco texto o datos numericos-->
                            <textarea id="price">${price}€</textarea>
                        </div>
                        <div class="valorationMedia" id="valorationMedia">
                        </div>        
                        <div>
                            <div>
                                <p>Rango de jugadores</p>
                                <textarea id="numberPlayers">${numberPlayers}</textarea>
                            </div>
                            <div>
                                <p>Modo solitario. 0 si no tiene. 1 si tiene</p>
                                <textarea id="onePlayer">${onePlayer}</textarea>
                            </div>
                            <div>
                                <p>Edad recomendada</p>
                                <textarea id="age">${age}</textarea>
                            </div>
                        </div>
                    </div>

                    <div  class="information-element">
                        <h2>Especificaciones</h2>
                        <div>
                            <p>Mecanica del juego</p>
                            <textarea id="mecanic">${mecanic}</textarea>
                        </div>

                        <div>
                            <p>Dificultad del juego</p>
                            <textarea id="difficulty">${difficulty}</textarea>
                        </div>
                        <div>
                            <p>Tiempo de la partida</p>
                            <textarea id="playTime">${playTime}</textarea>
                        </div>
                    </div>

                    <div class="video-tutorial">
                        <h2>Tutorial</h2>
                        <div>
                            <p>Enlace del video:</p>
                            <textarea id="videoBoardgame">${videoBoardgame}</textarea>
                        </div>
                        <div>
                            <p>Enlace del thumbnail del video. Sigue esta estructura: https://img.youtube.com/vi/ID_del_Video/mqdefault.jpg</p>
                            <textarea id="imageVideo">${imageVideo}</textarea>
                        </div>
                    </div>

                    <div>
                        <button class="btn-style" id="saveChanges">Guardar</button>
                        <button onclick="window.location.href='boardgameListPage.html'" class="btn-style">Cancelar</button>
                    </div>
                </div>
            </div>
        `;

        boardgameElement.appendChild(cardData);

        const saveBtn = document.getElementById('saveChanges');
        saveBtn.addEventListener('click', async (e) => {

            const dataSendAPI = {
            name: document.getElementById('name').value,
            numberPlayers: document.getElementById('numberPlayers').value,
            onePlayer: document.getElementById('onePlayer').value,
            price: parseFloat(document.getElementById('price').value.replace('€', '')),
            playTime: document.getElementById('playTime').value,
            mecanic: document.getElementById('mecanic').value,
            age: document.getElementById('age').value,
            difficulty: document.getElementById('difficulty').value,
            description: document.getElementById('description').value,
            imageBoardgame: document.getElementById('imageBoardgame').value,
            videoBoardgame: document.getElementById('videoBoardgame').value,
            imageVideo: document.getElementById('imageVideo').value
        }

        await sendDataBoardgame(dataSendAPI, idBoardgamePage);

        });
    }

    const sendDataBoardgame = async (dataSendAPI, idBoardgamePage) => {
        try{
            const PutResponse = await fetch(`http://localhost:8080/hobbies/boardgames/${idBoardgamePage}`, {
                method: "PUT",
                body: JSON.stringify(dataSendAPI),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            });

            if(PutResponse.ok){
                console.log('Juego de mesa actualizado');
                window.location.href = 'boardgameListPage.html';
            }
            else{
                console.error('Error: ', PutResponse.status);
            }
        } 
        catch{
            console.error('Error: ', error);
        }
    }

    getEditBoardgameData();
});