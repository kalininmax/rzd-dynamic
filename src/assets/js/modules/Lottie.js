class Lottie {
	constructor() {
		this.init();
	}

	async init() {
		const { gsap } = await import('gsap');
		const lottie = await import('lottie-web');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		document.querySelectorAll('[data-lottie]').forEach(el => {
			el.lottieAnim = lottie.loadAnimation({
				container: el,
				renderer: 'svg',
				autoplay: false,
				path: el.getAttribute('data-lottie'),
			});

			el.scrollTrigger = ScrollTrigger.create({
				trigger: el,
				start: 'top 80%',
				end: 'bottom top',
				onEnter: () => {
					el.lottieAnim.play();
				},
				onEnterBack: () => {
					el.lottieAnim.play();
				},
				onLeave: () => {
					el.lottieAnim.stop();
				},
				onLeaveBack: () => {
					el.lottieAnim.stop();
				},
			});
		});
	}
}

export default new Lottie();
