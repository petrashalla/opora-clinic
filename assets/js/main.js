Fancybox.bind("[data-fancybox]", {
	// Your custom options
});

// animation
const animationItems = document.querySelectorAll(".animation-item");
if (animationItems.length > 0) {
	function onEntry(e) {
		e.forEach((e) => {
			e.isIntersecting && e.target.classList.add("animation-active");
		});
	}
	let options = {
			threshold: [0.5],
		},
		observer = new IntersectionObserver(onEntry, options);
	for (let e of animationItems) observer.observe(e);
}
// end animation

let scrollWidthFunc = () => {
	let scrollWidth = window.innerWidth - document.body.clientWidth;
	document.querySelector("html").style.paddingRight = scrollWidth + "px";
	document.querySelector("header").style.paddingRight = scrollWidth + "px";
};
const scrollTop = document.querySelector(".scroll-top");
if (scrollTop)
	scrollTop.addEventListener("click", () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	});

document.addEventListener("DOMContentLoaded", function () {
	/* burger menu */
	const burgerMenu = document.querySelector(".burger");
	if (burgerMenu) {
		const headerMobile = document.querySelector(".header__menu");
		burgerMenu.addEventListener("click", () => {
			if (burgerMenu.classList.contains("active")) {
				document.body.classList.remove("burger-lock");
			} else {
				document.body.classList.add("burger-lock");
			}
			headerMobile.classList.toggle("active");
			burgerMenu.classList.toggle("active");

			document.querySelector("html").classList.toggle("burger-lock");
		});
	}
	/* end burger menu */

	/* mobile menu */
	// Функция пересчёта полной высоты (с учётом вложенных списков)
	function getFullHeight(element) {
		let clone = element.cloneNode(true);
		clone.style.maxHeight = "none";
		clone.style.height = "auto";
		clone.style.opacity = "0";
		clone.style.position = "absolute";
		clone.style.pointerEvents = "none";
		document.body.appendChild(clone);
		let height = clone.scrollHeight;
		document.body.removeChild(clone);
		return height;
	}

	const navButtons = document.querySelectorAll(".header__nav-item");
	// Первый уровень аккордеона
	navButtons.forEach((btn) => {
		const sublist = btn.querySelector(".header__nav-sublist");
		const arrow = btn.querySelector(".header__nav-arrow");

		arrow?.addEventListener("click", (e) => {
			if (window.innerWidth >= 1024) return;
			if (sublist.contains(e.target)) return;

			btn.classList.toggle("active");

			if (btn.classList.contains("active")) {
				sublist.style.maxHeight = getFullHeight(sublist) + "px";
			} else {
				sublist.style.maxHeight = null;
			}
		});

		// Второй уровень аккордеона
		const arrows = sublist?.querySelectorAll(".header__nav-arrow");
		arrows?.forEach((arrow) => {
			const link = arrow.previousElementSibling;
			const subsublist = arrow.nextElementSibling;

			arrow.addEventListener("click", (e) => {
				e.stopPropagation();
				arrow.classList.toggle("active");
				link.classList.toggle("active");

				if (arrow.classList.contains("active")) {
					subsublist.style.maxHeight = subsublist.scrollHeight + "px";
				} else {
					subsublist.style.maxHeight = null;
				}
				sublist.style.maxHeight = getFullHeight(sublist) + "px";
			});
		});
	});
	/* end mobile menu */

	/* discount time */
	const counterStocks = document.querySelectorAll(".stock-date-js");
	counterStocks.forEach((counterStock) => {
		if (counterStock) {
			const counterStocksParts = counterStock.querySelectorAll("span");
			const fullCycleSeconds = 24 * 60 * 60;

			function formatTimePart(value) {
				return value.toString().padStart(2, "0");
			}

			function timeStocks() {
				const now = new Date();
				const midnight = new Date(now);
				midnight.setHours(24, 0, 0, 0);
				const secondsLeft = Math.floor((midnight - now) / 1000);
				const hours = Math.floor(secondsLeft / 3600);
				const minutes = Math.floor((secondsLeft % 3600) / 60);
				const seconds = secondsLeft % 60;

				if (counterStocksParts.length >= 3) {
					counterStocksParts[0].textContent = formatTimePart(hours);
					counterStocksParts[1].textContent = formatTimePart(minutes);
					counterStocksParts[2].textContent = formatTimePart(seconds);
					return;
				}
				counterStock.textContent = `${formatTimePart(hours)} : ${formatTimePart(minutes)} : ${formatTimePart(seconds)}`;
			}

			timeStocks();

			setInterval(function () {
				timeStocks();
			}, 1000);
		}
	});
	/* end discount time */

	// Popups
	function popupClose(popupActive) {
		popupActive.classList.remove("open");
		setTimeout(() => {
			if (!popupActive.classList.contains("open")) {
				popupActive.classList.remove("active");
			}
		}, 400);
		document.body.classList.remove("lock");
		document.querySelector("html").style.paddingRight = 0;
		document.querySelector("html").classList.remove("lock");
		document.querySelector("header").removeAttribute("style");
	}
	const popupOpenBtns = document.querySelectorAll(".popup-btn");
	const popups = document.querySelectorAll(".popup");
	const originalTitlePopup2 = document.querySelector(".original-title").innerHTML;
	const closePopupBtns = document.querySelectorAll(".close-popup-btn");
	closePopupBtns.forEach(function (el) {
		el.addEventListener("click", function (e) {
			popupClose(e.target.closest(".popup"));
		});
	});
	popupOpenBtns.forEach(function (el) {
		el.addEventListener("click", function (e) {
			e.preventDefault();
			const path = e.currentTarget.dataset.path;
			const currentPopup = document.querySelector(`[data-target="${path}"]`);
			if (currentPopup) {
				popups.forEach(function (popup) {
					popupClose(popup);
					popup.addEventListener("click", function (e) {
						if (!e.target.closest(".popup__content")) {
							popupClose(e.target.closest(".popup"));
						}
					});
				});
				currentPopup.classList.add("active");
				setTimeout(() => {
					currentPopup.classList.add("open");
				}, 10);
				if (currentPopup.getAttribute("data-target") == "popup-change") {
					let originaTitle = currentPopup.querySelector(".original-title");
					if (el.classList.contains("change-item__btn")) {
						if (el.classList.contains("doctor__btn-js")) {
							let currentItem = el.closest(".change-item");
							let currentTitile = currentItem.querySelector(".change-item__title");
							originaTitle.innerHTML = "Записаться на приём к врачу: " + currentTitile.innerHTML;
						} else {
							if (el.classList.contains("change-item__btn_current")) {
								originaTitle.textContent = el.textContent;
							} else {
								let currentItem = el.closest(".change-item");
								let currentTitile = currentItem.querySelector(".change-item__title");
								originaTitle.innerHTML = currentTitile.innerHTML;
							}
						}
					} else {
						originaTitle.innerHTML = originalTitlePopup2;
					}
				}

				if (currentPopup.getAttribute("data-target") == "popup-jobs") {
					let currentItems = el.closest(".jobs__items");
					let originalText = currentPopup.querySelector(".jobs__inner_original");
					if (originalText && currentItems.querySelector(".jobs__inner")) {
						originalText.innerHTML = currentItems.querySelector(".jobs__inner").innerHTML;
					}
				}
				e.stopPropagation();
				scrollWidthFunc();
				document.querySelector("html").classList.add("lock");
			}
		});
	});
	// end popups

	/*  btn more  */
	const moreBtns = document.querySelectorAll(".btn-more");
	moreBtns.forEach((moreBtn) => {
		if (moreBtn) {
			const moreContent = moreBtn.previousElementSibling;

			if (moreContent.scrollHeight <= moreContent.clientHeight) {
				moreBtn.style.display = "none";
			} else {
				const textBtn = moreBtn.innerHTML;
				moreBtn.addEventListener("click", function () {
					const heightMoreContent = moreContent.style.maxHeight;
					this.classList.toggle("active");

					if (moreContent.style.maxHeight) {
						moreContent.style.maxHeight = null;
						this.textContent = textBtn;
					} else {
						moreContent.style.maxHeight = moreContent.scrollHeight + "px";
						this.textContent = "Свернуть";
					}
				});
			}
		}
	});
	/*  end btn more  */

	/*  read more review  */
	const moreRevBtns = document.querySelectorAll(".btn-more-review");
	moreRevBtns.forEach((moreBtn) => {
		if (moreBtn) {
			const moreContent = moreBtn.previousElementSibling;
			const originalMaxHeight = window.getComputedStyle(moreContent).maxHeight;
			if (moreContent.scrollHeight <= moreContent.clientHeight) {
				moreBtn.style.display = "none";
			} else {
				const currentHeight = moreContent.clientHeight;
				moreContent.style.maxHeight = currentHeight - 50 + "px";
				const textBtn = moreBtn.innerHTML;
				moreBtn.addEventListener("click", function () {
					this.classList.toggle("active");
					if (parseFloat(moreContent.style.maxHeight) > parseFloat(originalMaxHeight) - 50) {
						moreContent.style.maxHeight = parseFloat(originalMaxHeight) - 50 + "px";
						this.textContent = textBtn;
					} else {
						moreContent.style.maxHeight = moreContent.scrollHeight + "px";
						this.textContent = "Свернуть";
					}
				});
			}
		}
	});
	/*  end read more review  */

	/* yandex map */
	const map = document.querySelectorAll("#map");
	if (map.length > 0) {
		function onEntryMap(e) {
			e.forEach((e) => {
				e.isIntersecting && loadMap() && initMap();
			});
		}
		let options = {
				threshold: [0.5],
			},
			observer = new IntersectionObserver(onEntryMap, options);
		for (let e of map) observer.observe(e);
	}
	function loadMap() {
		if (!document.querySelector('[src="https://api-maps.yandex.ru/2.1/?lang=ru_RU"]')) {
			const script = document.createElement("script");
			script.type = "text/javascript";
			script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
			script.onload = initMap;
			document.head.appendChild(script);
		}
	}
	function initMap() {
		ymaps.ready(function () {
			const myMap = new ymaps.Map("map", {
				center: [47.231129, 39.728721],
				zoom: 15,
				controls: [],
			});
			const myPlacemark = new ymaps.Placemark(
				[47.231129, 39.728721],
				{
					hintContent: "Новосибирск, ул. Примерная, д. 10",
					balloonContent: "Новосибирск, ул. Примерная, д. 10",
				},
				{
					iconLayout: "default#image",
					iconImageHref: "assets/img/icons/map-pin.png",
					iconImageSize: [100, 50],
					iconImageOffset: [-50, -25],
				},
			);
			myMap.geoObjects.add(myPlacemark);
			myMap.behaviors.disable(["scrollZoom"]);
		});
	}
	/* end yandex map */

	/*  accordion  */
	const acc = document.getElementsByClassName("accordion");
	for (let i = 0; i < acc.length; i++) {
		if (acc[i]) {
			acc[i].addEventListener("click", function () {
				const accContent = this.querySelector(".accordion__content") || this.parentElement.querySelector(".accordion__content");
				if (accContent.classList.contains("active")) {
					accContent.classList.remove("active");
					this.classList.remove("active");
					accContent.style.maxHeight = "0";
				} else {
					accContent.classList.add("active");
					this.classList.add("active");

					const contentHeight = accContent.scrollHeight;
					accContent.style.maxHeight = `${contentHeight}px`;
				}
			});
		}
	}
	/*  end accordion   */

	/*  tab  */
	const showTab = (elTabBtn) => {
		const elTab = elTabBtn.closest(".tab");
		if (elTabBtn.classList.contains("active")) {
			return;
		}
		const targetId = elTabBtn.dataset.id;
		const elTabPanes = elTab.querySelectorAll(`.tab-content[data-id="${targetId}"]`);
		const elTabBtnsActive = elTab.querySelectorAll(".tab-btn.active");
		elTabBtnsActive.forEach((btn) => btn.classList.remove("active"));

		const elTabPaneShow = elTab.querySelectorAll(".tab-content.active");
		elTabPaneShow.forEach((pane) => pane.classList.remove("active"));

		const allSameButtons = elTab.querySelectorAll(`.tab-btn[data-id="${targetId}"]`);
		allSameButtons.forEach((btn) => btn.classList.add("active"));
		elTabPanes.forEach((pane) => pane.classList.add("active"));
	};

	const tabButtons = document.querySelectorAll(".tab-btn");
	tabButtons.forEach((btn) => {
		if (btn) {
			btn.addEventListener("click", function (e) {
				showTab(this);
			});
		}
	});
	/*  end tab */

	/* фильтрация карточек */
	document.querySelectorAll(".filter").forEach((filter) => {
		const buttonsWrap = filter.querySelector(".filter__btns");
		const buttons = Array.from(filter.querySelectorAll(".filter-btn"));
		const cards = filter.querySelectorAll(".filter-card");
		const mobileMedia = window.matchMedia("(max-width: 1024px)");

		if (!buttonsWrap || !buttons.length) return;

		const isMobile = () => mobileMedia.matches;

		const closeDropdown = () => {
			buttonsWrap.classList.remove("is-open");
		};

		const updateDropdownHeight = () => {
			buttonsWrap.style.setProperty("--filter-dropdown-height", `${buttonsWrap.scrollHeight}px`);
		};

		const resetDesktopState = () => {
			closeDropdown();
			buttonsWrap.style.removeProperty("--filter-dropdown-height");
		};

		const moveActiveButtonToTop = () => {
			const activeButton = buttonsWrap.querySelector(".filter-btn.active");

			if (activeButton) {
				buttonsWrap.prepend(activeButton);
				updateDropdownHeight();
			}
		};

		const updateLayout = () => {
			if (isMobile()) {
				moveActiveButtonToTop();
			} else {
				resetDesktopState();
			}
		};

		const filterCards = (activeButton) => {
			const activeId = activeButton.dataset.id;

			buttons.forEach((button) => {
				button.classList.toggle("active", button === activeButton);
			});

			cards.forEach((card) => {
				const shouldShow = activeId === "all" || card.dataset.id === activeId;
				card.classList.toggle("is-hidden", !shouldShow);
			});
		};

		const onButtonClick = (event, button) => {
			const isActiveButton = button.classList.contains("active");
			if (isMobile() && isActiveButton) {
				event.preventDefault();
				buttonsWrap.classList.toggle("is-open");
				updateDropdownHeight();
				return;
			}
			filterCards(button);
			updateLayout();
			closeDropdown();
		};

		buttons.forEach((button) => {
			button.addEventListener("click", (event) => {
				onButtonClick(event, button);
			});
		});

		mobileMedia.addEventListener("change", updateLayout);
		updateLayout();
	});
	/* end фильтрация карточек */

	/* Кнопка Показать еще */
	document.querySelectorAll(".show-more-cards").forEach((cardsWrap) => {
		const SHOW_MORE_STEP = cardsWrap.dataset.count ? parseInt(cardsWrap.dataset.count, 10) : 16;
		const root = cardsWrap.parentElement;
		const button = root ? root.querySelector(".show-more-btn") : null;
		const cards = [...cardsWrap.children];

		if (!button || !cards.length) return;

		let visibleCount = Math.min(SHOW_MORE_STEP, cards.length);

		const render = () => {
			cards.forEach((card, index) => {
				card.hidden = index >= visibleCount;
			});

			if (cards.length <= SHOW_MORE_STEP) {
				button.hidden = true;
				return;
			}

			button.hidden = false;
			button.textContent = visibleCount >= cards.length ? "Скрыть" : "Показать еще";
		};

		button.addEventListener("click", () => {
			if (visibleCount >= cards.length) {
				visibleCount = SHOW_MORE_STEP;
			} else {
				visibleCount = Math.min(visibleCount + SHOW_MORE_STEP, cards.length);
			}
			render();
		});
		render();
	});
	/* end Показать еще */

	// Диаграмма на главной
	const rects = document.querySelectorAll(".diagram__column-rect");
	rects.forEach((rect) => {
		const value = parseInt(rect.getAttribute("data-value"), 10);
		if (!isNaN(value)) {
			const percent = Math.min(100, Math.max(0, value));
			rect.style.minHeight = percent + "%";
		}
	});
	// end Диаграмма на главной

	// Виджет
	const widget = document.querySelector(".widget");
    const widgetBtn = widget?.querySelector(".widget__close");
    if (!widget || !widgetBtn) return;
    widgetBtn.addEventListener("click", () => {
        widget.classList.toggle("is-open");
    });
    // end Виджет

	/* search  */
    const searchBlocks = document.querySelectorAll('.search-wrapper');
    searchBlocks.forEach((block) => {
        const input = block.querySelector('.search-input');
        const resultBlock = block.querySelector('.search-result');
        const resultMessage = block.querySelector('.search-result-message');
        const popularBlock = block.querySelector('.search-popular');
        const items = [...block.querySelectorAll('.search-result .search-name')];

		console.log(input);
		console.log(resultBlock);
		console.log(resultMessage);
		console.log(popularBlock);
		console.log(items);

        if (!input || !resultBlock || !resultMessage || !items.length) return;

        const normalizeText = (text) => {
            return text.toLowerCase().trim();
        };

        input.addEventListener('input', () => {
            const value = normalizeText(input.value);

            if (!value) {
                resultBlock.classList.add('none');
                resultMessage.classList.add('none');
                popularBlock?.classList.remove('none');

                items.forEach((item) => {
                    item.closest('li').classList.remove('none');
                });

                return;
            }

            let hasResult = false;

            items.forEach((item) => {
                const cityName = normalizeText(item.textContent);
                const listItem = item.closest('li');

                if (cityName.includes(value)) {
                    listItem.classList.remove('none');
                    hasResult = true;
                } else {
                    listItem.classList.add('none');
                }
            });

            resultBlock.classList.remove('none');

            if (hasResult) {
                resultMessage.classList.add('none');
                popularBlock?.classList.add('none');
            } else {
                resultMessage.classList.remove('none');
                popularBlock?.classList.remove('none');
            }
        });
    });
	/* end search */

	/* Содержание */
	const articleNavigation = document.querySelector(".navigation");
	if (articleNavigation) {
		const jsScrollBlockList = document.querySelectorAll(".text-block h1, .text-block h2, .text-block h3, .text-block h4");

		if (jsScrollBlockList.length > 0) {
			for (let i = 0; i < jsScrollBlockList.length; i += 1) {
				const jsScrollBlock = jsScrollBlockList[i];
				const titleBlock = jsScrollBlock.textContent;
				const articleNavigationList = document.querySelector(".navigation__list");
				const articleNavigationItem = document.createElement("li");
				const articleNavigationLink = document.createElement("a");
				if (jsScrollBlock.tagName == "H1") {
					articleNavigationItem.classList.add("nav-title-h1");
				}
				articleNavigationItem.classList.add("navigation__item");
				if (jsScrollBlock.tagName == "H2") {
					articleNavigationItem.classList.add("nav-title-h2");
				} else if (jsScrollBlock.tagName == "H3") {
					articleNavigationItem.classList.add("nav-title-h3");
				} else if (jsScrollBlock.tagName == "H4") {
					articleNavigationItem.classList.add("nav-title-h4");
				} else if (jsScrollBlock.tagName == "H5") {
					articleNavigationItem.classList.add("nav-title-h5");
				} else if (jsScrollBlock.tagName == "H6") {
					articleNavigationItem.classList.add("nav-title-h6");
				}
				articleNavigationLink.classList.add("navigation__link");
				jsScrollBlock.setAttribute("id", `${i}`);
				articleNavigationLink.setAttribute("href", `$${i}`);
				articleNavigationLink.textContent = " " + titleBlock;
				articleNavigationItem.append(articleNavigationLink);
				articleNavigationList.append(articleNavigationItem);
			}
			document.querySelectorAll('a[href^="$"').forEach((link) => {
				link.addEventListener("click", function (e) {
					e.preventDefault();
					let href = this.getAttribute("href").substring(1);
					const scrollTarget = document.getElementById(href);
					const topOffset = 160;
					const elementPosition = scrollTarget.getBoundingClientRect().top;
					const offsetPosition = elementPosition - topOffset;
					window.scrollBy({
						top: offsetPosition,
						behavior: "smooth",
					});
				});
			});
		} else {
			if (articleNavigation.querySelector(".navigation")) {
				articleNavigation.querySelector(".navigation").remove();
			}
		}
	}
	/* end Содержание */


	/* -- COOKIE POLICY START -- */
	const cookiePolicy = document.getElementById('cookie');
	if (cookiePolicy) {
	const agreeBtn = cookiePolicy.querySelector('.cookie__agree');
	const closeBtn = cookiePolicy.querySelector('.cookie__close');
	const toggleBtn = cookiePolicy.querySelector('.cookie__toggle');

	const hasConsent = document.cookie.indexOf('cookie-policyz=en') !== -1;

	const updateCookieOffset = function () {
		const isVisible =
		cookiePolicy.style.display !== 'none' &&
		cookiePolicy.classList.contains('is-active');

		if (!isVisible) {
		document.documentElement.style.setProperty('--cookie-offset', '0px');
		return;
		}

		const cookieHeight = cookiePolicy.offsetHeight || 0;
		const extraGap = 10;

		document.documentElement.style.setProperty('--cookie-offset', (cookieHeight + extraGap) + 'px');
	};

	const acceptCookiePolicy = function () {
		cookiePolicy.classList.remove('is-active');
		document.documentElement.style.setProperty('--cookie-offset', '0px');

		setTimeout(function () {
		cookiePolicy.style.display = 'none';
		document.documentElement.style.setProperty('--cookie-offset', '0px');
		}, 300);

		document.cookie = 'cookie-policyz=en; path=/; max-age=31536000';
	};

	if (!hasConsent) {
		cookiePolicy.style.display = '';
		cookiePolicy.classList.add('is-active');

		setTimeout(function () {
		updateCookieOffset();
		}, 50);
	} else {
		cookiePolicy.style.display = 'none';
		document.documentElement.style.setProperty('--cookie-offset', '0px');
	}

	if (agreeBtn) {
		agreeBtn.addEventListener('click', function (e) {
		e.preventDefault();
		acceptCookiePolicy();
		});
	}

	if (closeBtn) {
		closeBtn.addEventListener('click', function (e) {
		e.preventDefault();
		acceptCookiePolicy();
		});
	}

	if (toggleBtn) {
		toggleBtn.addEventListener('click', function (e) {
		e.preventDefault();

		cookiePolicy.classList.toggle('is-expanded');
		toggleBtn.textContent = cookiePolicy.classList.contains('is-expanded')
			? 'Скрыть'
			: 'Подробнее';

		setTimeout(function () {
			updateCookieOffset();
		}, 50);
		});
	}

	window.addEventListener('resize', function () {
		updateCookieOffset();
	});

	window.addEventListener('load', function () {
		updateCookieOffset();
	});
	}
	/* -- COOKIE POLICY END -- */
});

// === КАЛЬКУЛЯТОР ===
document.addEventListener("DOMContentLoaded", function () {
	//  ФУНКЦИЯ ДЛЯ ПОЛУЧЕНИЯ ЦЕНЫ ИЗ ТЕКСТА
	function getPriceFromText(priceText) {
		let withoutSpaces = priceText.replace(/\s/g, "");
		const numbers = withoutSpaces.match(/\d+/g);
		if (numbers) {
			return parseInt(numbers[0]);
		}
		return 0;
	}

	//  ВЫБОР КАРТОЧЕК (только одна в каждой группе)
	const allCards = document.querySelectorAll(".calc-card");

	allCards.forEach(function (card) {
		card.addEventListener("click", function () {
			const parentGroup = this.closest(".calc-cards");
			const cardsInGroup = parentGroup.querySelectorAll(".calc-card");
			cardsInGroup.forEach(function (c) {
				c.classList.remove("active");
			});
			this.classList.add("active");
			updateResults();
		});
	});

	//  ЧЕКБОКСЫ
	const allCheckboxes = document.querySelectorAll('.calc-checbox input[type="checkbox"]');
	allCheckboxes.forEach(function (checkbox) {
		checkbox.addEventListener("change", function () {
			updateResults();
		});
	});

	//  КНОПКА СБРОСА
	const clearBtn = document.querySelector(".calc-clear");
	if (clearBtn) {
		clearBtn.addEventListener("click", function () {
			const allCards2 = document.querySelectorAll(".calc-card");
			allCards2.forEach(function (card) {
				card.classList.remove("active");
			});
			const allChecks = document.querySelectorAll('.calc-checbox input[type="checkbox"]');
			allChecks.forEach(function (checkbox) {
				checkbox.checked = false;
			});
			updateResults();
		});
	}

	//  ФУНКЦИЯ ОБНОВЛЕНИЯ СПИСКА И СУММЫ
	function updateResults() {
		const resultsList = document.querySelector(".calculator__results-list");
		const sumElement = document.querySelector(".calc-sum");
		if(!resultsList || !sumElement) return;
		resultsList.innerHTML = "";
		let totalSum = 0;

		const activeCards = document.querySelectorAll(".calc-card.active");
		activeCards.forEach(function (card) {
			const name = card.querySelector(".calculator__item-name").textContent;
			let priceText = card.querySelector(".calculator__item-price").textContent;
			let price = getPriceFromText(priceText);
			const li = document.createElement("li");
			li.innerHTML = "<p>" + name + "</p><span>+" + price + " ₽</span>";
			resultsList.appendChild(li);
			totalSum = totalSum + price;
		});

		const checkedBoxes = document.querySelectorAll('.calc-checbox input[type="checkbox"]:checked');
		checkedBoxes.forEach(function (checkbox) {
			const container = checkbox.closest(".calc-checbox");
			const name = container.querySelector(".calculator__item-name").textContent;
			let priceText = container.querySelector(".calculator__item-price").textContent;
			let price = getPriceFromText(priceText);
			const li = document.createElement("li");
			li.innerHTML = "<p>" + name + "</p><span>+" + price + " ₽</span>";
			resultsList.appendChild(li);
			totalSum = totalSum + price;
		});

		if (activeCards.length === 0 && checkedBoxes.length === 0) {
			const li = document.createElement("li");
			li.innerHTML = "<p>Ничего не выбрано</p><span>0 ₽</span>";
			resultsList.appendChild(li);
		}
		sumElement.textContent = totalSum + " ₽";
	}

	updateResults();
});


