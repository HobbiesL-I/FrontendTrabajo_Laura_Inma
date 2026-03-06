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
    const listContent = document.getElementById('boardgameList')

    //bucle para recorrer todo el array de juegos de mesa e imprimir la lista en pantalla
    boardgameList.forEach(async (boardgame) => {

        console.log(boardgame)

        const cardIntro = document.getElementById('container-addBoardgame');
        cardIntro.innerHTML=`
            <div class="intro-text">
                <h1><i class="fa-solid fa-dice"></i> El rincón de los jugones</h1>
                <p>Nuestra página cuenta con una colección de juegos de mesa de todos los estilos y
                    temáticas, desde los clásicos más conocidos hasta las últimas novedades. Si no encuentras un juego
                    en la lista, ¡no te preocupes! Tú mismo puedes añadirlo fácilmente para que otros jugadores también
                    lo descubran y compartan su experiencia. ¿No encuentras tu juego? <b>¡Añádelo tú!</b></p>
            </div>
            <div class="addBoardgameBtn">
                <a href="newBoardgamePage.html">
                    <button class="btn-style">¡Añádeme!</button>
                </a>
            </div>
        `

        //Destructuracion del objeto juego de mesa
        const {
            idBoardgame,
            name,
            numberPlayers,
            playTime,
            age,
            difficulty,
            imageBoardgame2
        } = boardgame;

        const card = document.createElement(`div`);
        card.classList.add('boardgameCard')
        card.innerHTML = `
            <img class="image-List"
                    src="${imageBoardgame2}">
                <div class="cardInfo">
                    <h2>${name}</h2>
                    <div class="info-extra">
                        <p><i class="fa-solid fa-user-group"></i> ${numberPlayers}</p>
                        <p><i class="fa-solid fa-hourglass"></i> ${playTime}</p>
                        <p><i class="fa-regular fa-calendar"></i> ${age}</p>
                    </div>

                </div>
                <div class="buttons">
                    <a href="boardgamePage.html?id=${idBoardgame}&difficulty=${difficulty}">
                        <button class="btn-style">
                            <i class="fa-solid fa-circle-info"></i> Obtener más información
                        </button>
                    </a>

                        <a href="valorateBoardgamePage.html?id=${idBoardgame}">
                            <button class="btn-style">
                                <i class="fa-solid fa-comment-medical"></i> Valorar
                            </button>
                        </a>
                            <button class="btn-style btn-delete" data-id="${idBoardgame}">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                </div>
        `;
        listContent.appendChild(card);

        const deleteBtn = card.querySelector('.btn-delete');
        deleteBtn.addEventListener('click', async (e) => {
            e.preventDefault();

            const idBoardgame = deleteBtn.dataset.id;

            await deleteBoardgame(idBoardgame);
        });
  
    });       

        const deleteBoardgame = async (idBoardgame) => {
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
            } catch (error){
                console.error('Error: ', error);
            }
        }
}

getListBoardgames();
