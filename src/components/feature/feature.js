const Default = {
	EASE: 'power3.out',
	DURATION: 0.75,
};

class Feature {
	constructor() {
		this.init();
	}

	async init() {
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		this.features = document.querySelectorAll('[data-feature]');

		this.features.forEach(item => {
			const img = item.querySelector('[data-feature-img]');
			const text = item.querySelector('[data-feature-text]');
			const numbers = item.querySelector('[data-feature-numbers]');

			const mm = gsap.matchMedia();

			mm.add('(min-width: 768px)', () => {
				gsap
					.timeline({
						paused: true,
						scrollTrigger: {
							trigger: item,
							start: 'top 70%',
						},
					})
					.from([text, numbers], {
						autoAlpha: 0,
						y: 30,
						duration: Default.DURATION,
						ease: Default.EASE,
					})
					.from(
						img,
						{
							autoAlpha: 0,
							y: 30,
							duration: Default.DURATION,
							ease: Default.EASE,
						},
						'<75%'
					);
			});
			mm.add('(max-width: 767px)', () => {
				gsap.from(img, {
					autoAlpha: 0,
					y: 30,
					duration: Default.DURATION,
					ease: Default.EASE,
					scrollTrigger: { trigger: img, start: 'top 70%' },
				});
				gsap.from([text, numbers], {
					autoAlpha: 0,
					y: 30,
					duration: Default.DURATION,
					ease: Default.EASE,
					scrollTrigger: { trigger: text, start: 'top 70%' },
				});
			});
		});
	}
}

export default new Feature();
