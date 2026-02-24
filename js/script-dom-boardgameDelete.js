window.addEventListener('DOMContentLoaded', () => {
    console.log('Juego de mesa a eliminar');

    let params = new URLSearchParams(document.location.search);
    let idBoardgamePage = params.get("id");
    console.log(idBoardgamePage);

    let boardgameName = params.get("name");
    console.log(boardgameName);

    const url = `http://localhost:8080/hobbies/boardgames/${idBoardgamePage}`;

    
});