const app = document.getElementById('root')

const logo = document.createElement('img')
logo.src = 'logo.png'

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(logo)
app.appendChild(container)

// Definimos el numero de caracteres que tendra la descripción de la pelicula.
var DescriptionCharactersLimit = 300

// Creamos una variable request y le asignamos un nuevo objeto XMLHttpRequest.
var request = new XMLHttpRequest()

// Abrimos una nueva conexion, usando un request GET al endpoint de Studio Ghibli
request.open('GET','https://ghibliapi.herokuapp.com/films', true)

request.onload = function() {

	var data = JSON.parse(this.response)

	if (request.status >=200 && request.status <400)
		{   
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
				
				if (charactersDescription <= DescriptionCharactersLimit) {

					// Si tiene menos de la cifra de la var DescriptionCharactersLimit, lo dejamos igual
					p.textContent = `${movie.description}`

				} else {

					// Si tiene más de la cifra de la var DescriptionCharactersLimit, cortamos el parrafo
					// a ese numero y le añadimos '...' detras para sugerir una continuidad.	
					movie.description = movie.description.substring(0, DescriptionCharactersLimit)
					p.textContent = `${movie.description}` + '...'
				}

				// Ponemos la card dentro del elemento container
				container.appendChild(card)

				// Dentro de cada carta añadimos el h1 y el p
				card.appendChild(h1)
				card.appendChild(p)


	})
	} else {
		console.log('error')
	}

}

// Enviamos el request
request.send()