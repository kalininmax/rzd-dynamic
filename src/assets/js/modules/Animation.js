class Animation {
	constructor() {
		this.init();
	}

	init() {
		this.initFadeIn();
		this.initGroupFadeIn();
	}
	async initFadeIn() {
		const { gsap } = await import('gsap');

		document.querySelectorAll('[data-animation="fadeIn"]').forEach(item => {
			item.anim = gsap.from(item, {
				y: 30,
				autoAlpha: 0,
				paused: true,
			});
		});
	}
	async initGroupFadeIn() {
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		document.querySelectorAll('[data-animation-group]').forEach(item => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: item,
					start: 'top center',
				},
			});

			item.querySelectorAll('[data-animation]').forEach(({ anim }, index) => {
				anim.paused(false);
				tl.add(anim, index * 0.3);
			});

			item.anim = tl;
		});
	}
}

export default new Animation();
