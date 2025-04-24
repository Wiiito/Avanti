// Responsavel pela barra de pesquisa
const resultsBox = document.getElementById('searchResults')

Array.from(document.getElementsByClassName('searchBox')).forEach((form) => {
	form.addEventListener('submit', (event) => {
		event.preventDefault()
		const inputBox = event.target.querySelector('input')
		const conteudoBusca = inputBox.value

		// Colocando barra de pesquisa no lugar
		resultsBox.style.width = inputBox.getBoundingClientRect().width + 'px'
		resultsBox.style.top =
			inputBox.getBoundingClientRect().top +
			inputBox.getBoundingClientRect().height +
			1 +
			'px'
		resultsBox.style.left = inputBox.getBoundingClientRect().left + 'px'
	})
})
