const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'img/logo.png';

const descriptionCharactersLimit = 300;

const endpointURL = 'https://ghibliapi.herokuapp.com/films';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);

// Creamos una variable request y le asignamos un nuevo objeto XMLHttpRequest.
var request = new XMLHttpRequest();

// Abrimos una nueva conexion, usando un request GET al endpoint de Studio Ghibli
request.open('GET', endpointURL, true);

request.onload = function() {
	var data = JSON.parse(this.response);

	request.status >= 200 && request.status < 400 ? noError() : error404();

	function noError() {
		data.forEach(movie => {
			const card = document.createElement('div');
			card.setAttribute('class', 'card');

			let h1 = document.createElement('h1');
			h1.textContent = movie.title + ' ' + '(' + movie.release_date + ')';

			const p = document.createElement('p');

			const posterMovie = document.createElement('img');
			posterMovie.setAttribute('class', 'posterMovie');
			posterMovie.src = 'img/' + movie.title + '.jpg';

			charactersDescription = movie.description.length;

			// Si tiene menos caracteres que DescriptionCharactersLimit, lo dejamos igual.
			// Si tiene más, cortamos el parrafo al numero dado por DescriptionCharactersLimit y añadimos
			// '...' para sugerir continuidad.

			charactersDescription <= descriptionCharactersLimit
				? (p.textContent = `${movie.description}`)
				: ((movie.description = movie.description.substring(
						0,
						descriptionCharactersLimit
				  )),
				  (p.textContent = `${movie.description}` + '...'));

			container.appendChild(card);
			card.appendChild(h1);
			card.appendChild(p);
			p.prepend(posterMovie);
		});
	}

	function error404() {
		(card = document.createElement('div')),
			card.setAttribute('class', 'card'),
			container.appendChild(card),
			(h1 = document.createElement('h1')),
			h1.setAttribute('class', 'error'),
			(h1.textContent = 'ERROR 404 - NOT FOUND'),
			container.appendChild(card),
			card.appendChild(h1);
	}
};

// Enviamos el request
request.send();
