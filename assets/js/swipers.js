/* Swipers */
const introSwiper = new Swiper(".intro__items-swiper", {
	slidesPerView: 1.1,
	spaceBetween: 10,
	pagination: {
		el: ".intro__swiper-pagination",
		type: "bullets",
	},
	breakpoints: {
		1200: {
			slidesPerView: 4,
			spaceBetween: 20,
		},
		920: {
			slidesPerView: 3,
			spaceBetween: 16,
		},
		550: {
			slidesPerView: 2.1,
			spaceBetween: 10,
		},
	},
});

const approachSwiper = new Swiper(".approach__swiper", {
	slidesPerView: 1.1,
	spaceBetween: 10,
	pagination: {
		el: ".approach__swiper-pagination",
		type: "bullets",
	},
	breakpoints: {
		1024: {
			slidesPerView: 3,
			spaceBetween: 16,
		},
		550: {
			slidesPerView: 2.1,
			spaceBetween: 10,
		},
	},
});
const approachAboutSwiper = new Swiper(".approach__swiper-4", {
	slidesPerView: 1.1,
	spaceBetween: 10,
	pagination: {
		el: ".approach__swiper-pagination",
		type: "bullets",
	},
	breakpoints: {
		1400: {
			slidesPerView: 4,
			spaceBetween: 16,
		},
		1100: {
			slidesPerView: 3.1,
			spaceBetween: 16,
		},
		550: {
			slidesPerView: 2.1,
			spaceBetween: 10,
		},
	},
});

const reviewsSwiper = new Swiper(".reviews__swiper", {
	slidesPerView: 1.1,
	spaceBetween: 10,
	pagination: {
		el: ".reviews__swiper-pagination",
		type: "bullets",
	},
	navigation: {
		nextEl: ".reviews__swiper-button-next",
		prevEl: ".reviews__swiper-button-prev",
	},
	breakpoints: {
		1400: {
			slidesPerView: 4,
			spaceBetween: 20,
		},
		1070: {
			slidesPerView: 3,
			spaceBetween: 16,
		},
		550: {
			slidesPerView: 2.1,
			spaceBetween: 10,
		},
	},
});

const articlesSwiper = new Swiper(".articles__swiper", {
	slidesPerView: 1.1,
	spaceBetween: 10,
	pagination: {
		el: ".articles__swiper-pagination",
		type: "bullets",
	},
	navigation: {
		nextEl: ".articles__swiper-button-next",
		prevEl: ".articles__swiper-button-prev",
	},
	breakpoints: {
		1700: {
			slidesPerView: 4,
			spaceBetween: 20,
		},
		1200: {
			slidesPerView: 3,
			spaceBetween: 16,
		},
		660: {
			slidesPerView: 2.1,
			spaceBetween: 10,
		},
	},
});

const gallerySwiper = new Swiper(".gallery__swiper", {
	slidesPerView: 1.1,
	spaceBetween: 10,
	pagination: {
		el: ".gallery__swiper-pagination",
		type: "bullets",
	},
	navigation: {
		nextEl: ".gallery__swiper-button-next",
		prevEl: ".gallery__swiper-button-prev",
	},
	breakpoints: {
		1400: {
			slidesPerView: 4,
			spaceBetween: 20,
		},
		1070: {
			slidesPerView: 3,
			spaceBetween: 16,
		},
		550: {
			slidesPerView: 2.1,
			spaceBetween: 10,
		},
	},
});

const licensesSwiper = new Swiper(".licenses__swiper", {
	slidesPerView: 1.1,
	spaceBetween: 10,
	pagination: {
		el: ".licenses__swiper-pagination",
		type: "bullets",
	},
	navigation: {
		nextEl: ".licenses__swiper-button-next",
		prevEl: ".licenses__swiper-button-prev",
	},
	breakpoints: {
		1500: {
			slidesPerView: 3,
			spaceBetween: 16,
		},
		550: {
			slidesPerView: 2,
			spaceBetween: 10,
		},
	},
});

const stepsSwiper = new Swiper(".steps__swiper", {
	slidesPerView: 1.1,
	spaceBetween: 10,
	pagination: {
		el: ".steps__swiper-pagination",
		type: "bullets",
	},
	breakpoints: {
		1300: {
			slidesPerView: 4,
			spaceBetween: 20,
		},
		1024: {
			slidesPerView: 3.1,
			spaceBetween: 16,
		},
		550: {
			slidesPerView: 2.1,
			spaceBetween: 10,
		},
	},
});

const doctorsLicSwiper = new Swiper(".doctors-lic__swiper", {
	slidesPerView: 1.1,
	spaceBetween: 8,
	breakpoints: {
		1500: {
			slidesPerView: 7,
			spaceBetween: 8,
		},
		1300: {
			slidesPerView: 6,
		},
		550: {
			slidesPerView: 5,
		},
	},
});

const doctorsAllSwiper = new Swiper(".doctors-all__swiper", {
	slidesPerView: 4,
	spaceBetween: 8,
	//centeredSlides: true,
	navigation: {
		nextEl: ".doctors-all__swiper-button-next",
		prevEl: ".doctors-all__swiper-button-prev",
	},
	breakpoints: {
		1550: {
			slidesPerView: 7,
			spaceBetween: 8,
		},
		1450: {
			slidesPerView: 6,
		},
		768: {
			slidesPerView: 7,
		},
		500: {
			slidesPerView: 6,
		},
	},
});

let isSyncing = false;
const doctorsSwiper = [];
document.querySelectorAll(".doctors__swiper").forEach((element) => {
	const swiper = new Swiper(element, {
		slidesPerView: 1,
		spaceBetween: 60,
		on: {
			slideChange: function () {
				if (!isSyncing) {
					isSyncing = true;
					doctorsSwiper.forEach((otherSwiper) => {
						if (otherSwiper !== this) {
							otherSwiper.slideTo(this.activeIndex);
						}
					});
					isSyncing = false;
				}
			},
		},
		thumbs: {
			swiper: doctorsAllSwiper,
		},
	});
	doctorsSwiper.push(swiper);
});
