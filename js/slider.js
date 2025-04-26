// Classe sliderContainer identifica o slider automaticamente
// Slider define o conteudo
// Classe sliderDots é onde vão os pontos
// autoScroll scrolla o slider sozinho de tempos em tempos

Array.from(document.getElementsByClassName('sliderContainer')).forEach(
	(element, sliderCount) => {
		// Pegando estados do slider
		let sliderContainerWidth = element.getBoundingClientRect().width
		const fullSlider = element.getElementsByClassName('slider')[0]
		const dotsElement = element.getElementsByClassName('sliderDots')[0]

		const buttonsContainer = element.querySelector('.buttons')
		if (buttonsContainer) {
			const buttons = Array.from(buttonsContainer.querySelectorAll('button'))
			buttons.forEach((button) => {
				button.addEventListener('click', (event) => {
					let currentButton = event.target

					while (currentButton.nodeName != 'BUTTON') {
						currentButton = currentButton.parentElement
					}

					if (currentButton.classList.contains('right')) {
						fullSlider.scrollLeft += sliderContainerWidth
					} else {
						fullSlider.scrollLeft -= sliderContainerWidth
					}
				})
			})
		}

		let dots = []

		const makeDots = () => {
			sliderContainerWidth = element.getBoundingClientRect().width
			if (dotsElement) {
				dotsElement.innerHTML = ''

				const dotsCount = Math.round(
					fullSlider.scrollWidth / sliderContainerWidth
				)

				// Colocando pontos na div de pontos
				for (let i = 0; i < dotsCount; i++) {
					let inputPeer = document.createElement('input')
					inputPeer.type = 'radio'
					inputPeer.name = 'slider' + sliderCount
					inputPeer.id = 'slider' + sliderCount + '-' + i
					if (i == 0) inputPeer.checked = true

					dots.push(inputPeer)

					let labelPeer = document.createElement('label')
					labelPeer.htmlFor = inputPeer.id

					let dotDiv = document.createElement('div')
					dotDiv.appendChild(inputPeer)
					dotDiv.appendChild(labelPeer)

					dotDiv.addEventListener('click', () => {
						fullSlider.scrollLeft = i * sliderContainerWidth
					})

					dotsElement.appendChild(dotDiv)
				}

				fullSlider.addEventListener('scroll', () => {
					dots[
						Math.round(fullSlider.scrollLeft / sliderContainerWidth)
					].checked = true
				})
			}
		}
		window.addEventListener('resize', makeDots)
		makeDots()

		// AutoScroll
		if (fullSlider.classList.contains('autoScroll')) {
			setInterval(() => {
				if (
					fullSlider.scrollLeft + sliderContainerWidth >=
					fullSlider.scrollWidth
				) {
					fullSlider.scrollLeft = 0
				} else {
					fullSlider.scrollLeft = fullSlider.scrollLeft + sliderContainerWidth
				}
			}, 5000)
		}
	}
)
