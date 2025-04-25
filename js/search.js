// Responsavel pela barra de pesquisa
const resultsBox = document.getElementById('searchResults')
const searchText = document.getElementById('searchText')
const searchResults = document.getElementById('searchResultsBox')

let listaDeItems
let filterList

fetch('/js/itemsBusca.json')
	.then((response) => response.json())
	.then((json) => (listaDeItems = json))

const showSearchBox = (input) => {
	// Colocando barra de pesquisa no lugar
	resultsBox.style.display = 'block'
	resultsBox.style.width = input.getBoundingClientRect().width + 'px'
	resultsBox.style.top =
		input.getBoundingClientRect().top +
		input.getBoundingClientRect().height +
		1 +
		'px'
	resultsBox.style.left = input.getBoundingClientRect().left + 'px'
}

const createItemElement = (item) => {
	const element = document.createElement('div')
	element.classList.add('searchItem')

	const left = document.createElement('div')
	left.classList.add('left')
	element.appendChild(left)

	const imageBox = document.createElement('div')
	imageBox.classList.add('image')
	left.appendChild(imageBox)

	const image = document.createElement('img')
	image.src = item.image
	image.alt = item.name
	imageBox.appendChild(image)

	const text = document.createElement('h4')
	text.innerHTML = item.name
	left.appendChild(text)

	const right = document.createElement('div')
	right.classList.add('right')
	element.appendChild(right)

	const price = document.createElement('div')
	price.classList.add('price')
	price.innerHTML = item.value
	right.appendChild(price)

	const button = document.createElement('button')
	button.innerHTML = 'Ver'
	right.appendChild(button)

	return element
}

const search = (searchValue) => {
	filterList = Array.from(listaDeItems).filter((item) => {
		if (String(item.name).includes(searchValue)) {
			return item
		}
	})

	searchResults.innerHTML = ''

	filterList.forEach((item) => {
		searchResults.appendChild(createItemElement(item))
	})
}

Array.from(document.getElementsByClassName('searchBox')).forEach((form) => {
	const inputBox = form.querySelector('input')

	inputBox.addEventListener('focusout', () => {
		resultsBox.style.display = 'none'
	})

	inputBox.addEventListener('focusin', () => {
		showSearchBox(inputBox)
	})

	form.addEventListener('submit', (event) => {
		event.preventDefault()

		const conteudoBusca = inputBox.value

		search(conteudoBusca)

		if (inputBox.value) showSearchBox(inputBox)

		searchText.innerHTML = conteudoBusca
	})
})
