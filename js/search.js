// Responsavel pela barra de pesquisa
const resultsBox = document.getElementById('searchResults')
const searchText = document.getElementById('searchText')
const searchResults = document.getElementById('searchResultsBox')

let listaDeItems = [
	{
		image:
			'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcREuk5ZAZJwXMDT1DGwN0HmBspuS8NMqpk3tgO59N12SW3v1Y1IGxM9ST8PUh1kDG6z82nlZP-xMezYyDBt958BcTSkBZ38EbAldXem6EPtondb_V49mTcWbjlLURsUwVLt7c2DiOU&usqp=CAc',
		name: 'Camisa Social Branca',
		value: 'R$50,00',
	},
	{
		image:
			'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ4LnAjrEhG-Ev2Z1nHU2wod155iF_ImRMUaBNcRsBwKPDV71PbQMMBSZ83rd5h1cPNk1wPwMs7Lugxiaqbqp-J4ImJtyfJE7112ip8Dbj9U4rekToWcyEiS6CK9XcDU3fu_a-hUmU&usqp=CAc',
		name: 'Camisa Polo Azul',
		value: 'R$60,00',
	},
	{
		image:
			'https://torratorra.vtexassets.com/arquivos/ids/2228149/Camisa-Masculina-Xadrez-Flanelada-Vermelha.jpg?v=638751079113700000',
		name: 'Camisa Xadrez Vermelha',
		value: 'R$70,00',
	},
	{
		image:
			'https://acdn-us.mitiendanube.com/stores/002/864/137/products/71-b39bafcb9797d394f616800534046508-1024-1024.jpg',
		name: 'Camisa Listrada Preta e Branca',
		value: 'R$65,00',
	},
	{
		image:
			'https://images.tcdn.com.br/img/img_prod/682008/camisa_jeans_feminina_western_azul_claro_1423_2_10f4af25e05bb0d4280f4ffabe34e2b6.jpg',
		name: 'Camisa Jeans Azul Clara',
		value: 'R$80,00',
	},
	{
		image:
			'https://acdn-us.mitiendanube.com/stores/002/864/137/products/camisa-xadrez-verde-de-flanela-03111-618e1963a31a1119d016843439447113-480-0.jpg',
		name: 'Camisa Flanelada Verde',
		value: 'R$75,00',
	},
	{
		image:
			'https://ecoms1.com/1035/@v3/1698432253729-camisa-masculina-azul-marinho-marsala-1023.jpg',
		name: 'Camisa Social Azul Escura',
		value: 'R$55,00',
	},
	{
		image:
			'https://db7qxt7xxlq5m.cloudfront.net/n49shopv2_lojapadrao/images/products/636cff2abf19a/camisamc_linho_bege_padrao_55563_1-636cff2abf26a.jpg',
		name: 'Camisa de Linho Bege',
		value: 'R$90,00',
	},
	{
		image:
			'https://poemastore.com.br/wp-content/uploads/2024/06/Imagem-do-WhatsApp-de-2024-06-09-as-18.03.12_04f2207e.jpg',
		name: 'Camisa Estampada Colorida',
		value: 'R$85,00',
	},
	{
		image:
			'https://valentinatshirt.com/media/catalog/product/cache/1e1d2c878257f15acfc4eb9812fff879/b/l/blusa-valentina-tshirt-moda-feminina__1.jpg',
		name: 'Camisa Gola V Preta',
		value: 'R$60,00',
	},
]

let filterList

// O fetch é usado para caso o site esteja exposto a uma rota (mundo ideal)
// caso o recrutador apenas abra o html, será usado os valores iniciais da lista
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
