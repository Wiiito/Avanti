// Responsavel por alterar número dos items

Array.from(document.getElementsByClassName('productContainer')).forEach(
	(element) => {
		let count = 0
		const button = element.querySelector('button')
		const textBox = button.querySelector('.text')

		button.querySelector('.minus').addEventListener('click', () => {
			count--
		})
		button.querySelector('.more').addEventListener('click', () => {
			if (count == 4) return
			count++
		})

		button.addEventListener('click', () => {
			if (count == 4) {
				button.querySelector('.more').style.color = '#a2a2a2'
			} else {
				button.querySelector('.more').style.color = ''
			}

			if (button.classList.contains('buying')) {
				textBox.innerHTML = count
				if (count <= 0) {
					textBox.innerHTML = 'Comprar'
					button.classList.remove('buying')
				}
			} else {
				count++
				textBox.innerHTML = count
				button.classList.add('buying')
			}
		})
	}
)
