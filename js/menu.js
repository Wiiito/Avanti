// Responsavel por todas as interações dos menus, tanto mobile quanto desktop

const menuHamburguer = document.getElementById('menuHamburguer')
const mobileMenuHamburguer = document.getElementById('mobileMenuHamburguer')

const menu = document.getElementById('menu')
const menuDepartamento = document.getElementById('todosDepartamentos')

const departamentosMenus = Array.from(
	document.getElementsByClassName('departamento')
)

const itemsDepartamento = Array.from(
	document.getElementsByClassName('itemsDepartamento')
)

const colorBlue = (element) => {
	element.style.color = '#005cff'
	Array.from(element.querySelectorAll('span')).forEach((elem) => {
		elem.style.backgroundColor = '#005cff'
	})
}

const colorBlack = (element) => {
	element.style.color = '#000000'
	Array.from(element.querySelectorAll('span')).forEach((elem) => {
		elem.style.backgroundColor = '#000000'
	})
}

let hidden = true

const reset = () => {
	colorBlack(menuHamburguer)
	colorBlack(mobileMenuHamburguer)
	resetMenuDepartamento()
	hideItemsDepartamento()
	resetDepartamentos()

	menu.classList.add('hidden')
	menu.classList.remove('flex')

	menuDepartamento.classList.add('hidden')
	menuDepartamento.classList.remove('flex')

	itemsDepartamento.forEach((elem) => {
		elem.querySelector('h3').classList.add('hidden')
		elem.querySelector('h3').classList.remove('block')
	})
}

const resetMenuDepartamento = () => {
	menuDepartamento.querySelectorAll('div').forEach((elem) => {
		elem.style.color = '#000000'
	})
}

const resetDepartamentos = () => {
	departamentosMenus.forEach((elem) => {
		elem.style.color = '#000000'
	})
}

const hideItemsDepartamento = () => {
	itemsDepartamento.forEach((elem) => {
		elem.classList.remove('flex')
		elem.classList.add('hidden')
	})
}

menuDepartamento.querySelectorAll('div').forEach((elem, number) => {
	elem.addEventListener('mouseenter', () => {
		resetMenuDepartamento()

		elem.style.color = '#005cff'

		hideItemsDepartamento()

		itemsDepartamento[number].classList.remove('hidden')
		itemsDepartamento[number].classList.add('flex')
	})
})

const openMenu = () => {
	reset()

	colorBlue(menuHamburguer)
	colorBlue(mobileMenuHamburguer)

	menu.classList.remove('hidden')
	menu.classList.add('flex')

	menuDepartamento.classList.remove('hidden')
	menuDepartamento.classList.add('flex')
}

menuHamburguer.addEventListener('mouseenter', () => {
	openMenu()
})

mobileMenuHamburguer.addEventListener('click', () => {
	if (hidden) {
		openMenu()
	} else {
		reset()
	}
	hidden = !hidden
})

menu.addEventListener('mouseleave', () => {
	reset()
	hidden = true
})

departamentosMenus.forEach((element, elementNumber) => {
	element.addEventListener('mouseenter', () => {
		reset()

		colorBlue(element)

		menu.classList.remove('hidden')
		menu.classList.add('flex')

		menuDepartamento.classList.remove('flex')
		menuDepartamento.classList.add('hidden')

		itemsDepartamento[elementNumber].classList.remove('hidden')
		itemsDepartamento[elementNumber].classList.add('block')

		itemsDepartamento[elementNumber].querySelector('h3').classList.add('block')
		itemsDepartamento[elementNumber]
			.querySelector('h3')
			.classList.remove('hidden')
	})
})
