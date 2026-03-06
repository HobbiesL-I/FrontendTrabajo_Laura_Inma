window.addEventListener('DOMContentLoaded', (event) => {
    const urlBoardgames = `http://localhost:8080/hobbies/boardgames`;
    const urlMovies = `http://localhost:8080/hobbies/movies`;
    const urlValorationBoardgames = `http://localhost:8080/hobbies/valorationsBoardgame`;
    const urlValorationMovies = `http://localhost:8080/hobbies/valorations`;

    const getRandomMovieImages = async () => {
        try {
            const result = await fetch(urlMovies);
            const RandomMovies = await result.json();
            console.log(RandomMovies)
            createRandomMovieList(RandomMovies);
        }
        catch (error) {
            console.log(error);
        }
    }

    const createRandomMovieList = (movieList) => {
        console.log(movieList);

        function randomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        const size = movieList.length;
        const RandomMovies = [];

        let counter =0;
        let arrayNumbers= [];

        while (counter < 3){
           let number = movieList[randomInt(0, size - 1)];
            if(!arrayNumbers.includes(number)){
                RandomMovies.push(number);
                arrayNumbers.push(number);
                counter ++;
            }
        }

        console.log(RandomMovies);

        const movieElement = document.getElementById('movies-images');

        RandomMovies.forEach((movie) => {
            const {
                title,
                image
            } = movie;

            const imageDisplay = document.createElement(`img`);
            imageDisplay.classList.add('imageMovie-size')
            imageDisplay.src = `./imagenes/${image}`;
            imageDisplay.alt = title;

            movieElement.appendChild(imageDisplay);
            console.log("Elemento añadido correctamente.");
        });

    }

    const getRandomBoardgameImages = async () => {
        try {
            const result = await fetch(urlBoardgames);
            const RandomBoardgames = await result.json();
            console.log(RandomBoardgames)
            createRandomBoardgameList(RandomBoardgames);
        }
        catch (error) {
            console.log(error);
        }
    }

    const createRandomBoardgameList = (boardgameList) => {
        console.log(boardgameList);

        function randomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        const size = boardgameList.length;
        const RandomBoardgames = [];

        let counter =0;
        let arrayNumbers= [];

        while (counter < 3){
           let number = boardgameList[randomInt(0, size - 1)];
            if(!arrayNumbers.includes(number)){
                RandomBoardgames.push(number);
                arrayNumbers.push(number);
                counter ++;
            }
        }

        console.log(RandomBoardgames);

        const boardgameElement = document.getElementById('boardgames-images');

        RandomBoardgames.forEach((boardgame) => {
            const {
                name,
                imageBoardgame
            } = boardgame;

            const imageDisplay = document.createElement(`img`);
            imageDisplay.src = imageBoardgame;
            imageDisplay.alt = name;

            boardgameElement.appendChild(imageDisplay);
            console.log("Elemento añadido correctamente.");
        });

    }

    const getRecentValorationsBoardgames = async () => {
        try {
            const result = await fetch(urlValorationBoardgames);
            const recentValorations = await result.json();
            console.log(recentValorations)
            createValorationBoardgameList(recentValorations);
        }
        catch (error) {
            console.log(error);
        }
    }

    const createValorationBoardgameList = (boardgameValoration) => {
        console.log(boardgameValoration);

        const sizeArrayValoration = boardgameValoration.length;
        const lastValorations = [];

        for (let i = sizeArrayValoration - 1; i > sizeArrayValoration - 3; i--) {
            lastValorations.push(boardgameValoration[i]);
        }
        console.log(lastValorations);

        const cardValoration = document.getElementById('valorationBoardgame-card');

        lastValorations.forEach((boardgameValoration) => {
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

    const getRecentValorationsMovies = async () => {
        try {
            const result = await fetch(urlValorationMovies);
            const recentValorations = await result.json();
            console.log(recentValorations)
            createValorationMovieList(recentValorations);
        }
        catch (error) {
            console.log(error);
        }
    }

    const createValorationMovieList = (movieValoration) => {
        console.log(movieValoration);

        const sizeArrayValoration = movieValoration.length;
        const lastValorations = [];

        for (let i = sizeArrayValoration - 1; i > sizeArrayValoration - 3; i--) {
            lastValorations.push(movieValoration[i]);
        }
        console.log(lastValorations);

        const cardValoration = document.getElementById('valorationMovie-card');

        lastValorations.forEach((movieValoration) => {
            const divCardValoration = document.createElement(`div`);
            divCardValoration.classList.add('valoration-card')

            const {
                user_name,
                score,
                comment
            } = movieValoration;

            /*Función para convertir el puntaje del comentario en estrellas */
            const getStars = (score) => {
                const valorationStars = Math.trunc(score / 2);
                console.log(valorationStars);
                const emptyStars = 5 - valorationStars;
                console.log(emptyStars)
                let htmlStars = ' '

                for (let i = 0; i < valorationStars; i++) {
                    htmlStars += '<i class="fa-solid fa-star"></i>'
                }

                for (let i = 0; i < emptyStars; i++) {
                    htmlStars += '<i class="fa-regular fa-star"></i>'
                }

                return htmlStars;
            };

            divCardValoration.innerHTML = `
            <div class="card-header">
                <i class="fa-regular fa-comment-dots fa-2x"></i>
                <h3 class="user-name">${user_name}</h3>
                <div>${getStars(score)}</div>
                <h3>${score}</h3>
                </div>
                <p class="text-align">${comment}</p>
            `
            cardValoration.appendChild(divCardValoration);
        });
    }

    getRandomMovieImages().then(() => {
        getRandomBoardgameImages();
        getRecentValorationsBoardgames();
        getRecentValorationsMovies();
    });

});
