const app = document.getElementById('root')

const logo = document.createElement('img')
logo.src = 'logo.png'

// Definimos el numero de caracteres que tendra la descripción de la pelicula.
var DescriptionCharactersLimit = 300

// Definimos el endpoint de la API  de studio Ghibli
const URL = 'https://ghibliapi.herokuapp.com/films'

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(logo)
app.appendChild(container)



// Creamos una variable request y le asignamos un nuevo objeto XMLHttpRequest.
var request = new XMLHttpRequest()

// Abrimos una nueva conexion, usando un request GET al endpoint de Studio Ghibli
request.open('GET',URL, true)

request.onload = function() {

	var data = JSON.parse(this.response)

	request.status >=200 && request.status <400 ? (
		  
			data.forEach(movie => {
				// Creamos un div con una clase "card"
				const card = document.createElement('div')
				card.setAttribute('class', 'card')

				// Creamos un h1 con el titulo de la película
				let h1 = document.createElement('h1')
				h1.textContent = movie.title + ' ' + '(' + movie.release_date + ')'

				// Creamos ahora un párrafo y fijamos el contenido con la descripción de la película.
				const p = document.createElement('p')

				// Contamos el numero de caracteres que tiene la descripción de la película (movie.description)
				charactersDescription = movie.description.length

				// Si tiene menos caracteres que DescriptionCharactersLimit, lo dejamos igual.
				// Si tiene más, cortamos el parrafo al numero dado por DescriptionCharactersLimit y añadimos
				// '...' para sugerir continuidad.
				
				charactersDescription <= DescriptionCharactersLimit ? ( 
					p.textContent = `${movie.description}`
					) : ( 
					movie.description = movie.description.substring(0, DescriptionCharactersLimit),
					p.textContent = `${movie.description}` + '...'
					)

				// Ponemos la card dentro del elemento container
				container.appendChild(card)

				// Dentro de cada carta añadimos el h1 y el p
				card.appendChild(h1)
				card.appendChild(p)


	})) : (
	 
		    card = document.createElement('div'),
			card.setAttribute('class', 'card'),
			container.appendChild(card),
			h1 = document.createElement('h1'),
			h1.setAttribute('class', 'error'),
			h1.textContent = 'ERROR 404 - NOT FOUND',
			container.appendChild(card),
			card.appendChild(h1)
	)

}

// Enviamos el request
request.send()