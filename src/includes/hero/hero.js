const TABLET_BREAKPOINT = 1024;

class Hero {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('[data-hero]');

		if (!this.container) {
			return;
		}

		this.train = this.container.querySelector('[data-hero-train]');

		const setPath = () => {
			this.path =
				window.innerWidth <= TABLET_BREAKPOINT
					? this.container.querySelector('[data-hero-bg-tablet] [data-hero-path]')
					: this.container.querySelector('[data-hero-bg] [data-hero-path]');

			this.initialProgress = window.innerWidth <= TABLET_BREAKPOINT ? 0.088 : 0.138;
		};

		setPath();

		window.addEventListener('load', async () => {
			this.initAnim();

			const { gsap } = await import('gsap');
			const { ScrollTrigger } = await import('gsap/ScrollTrigger');
			gsap.registerPlugin(ScrollTrigger);

			gsap.from('.history__train-wrapper', {
				x: '-150vw',
				duration: 1.5,
				ease: 'power4.out',
				scrollTrigger: {
					trigger: '.history__train-wrapper',
					start: 'top bottom',
				},
			});
		});

		window.addEventListener('resize', () => {
			setPath();
			this.destroy();

			this.TO && clearTimeout(this.TO);
			this.TO = setTimeout(() => {
				this.initAnim();
			}, 1000);
		});
	}

	async initAnim() {
		const { gsap } = await import('gsap');

		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		const { MotionPathPlugin } = await import('gsap/MotionPathPlugin');
		gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

		gsap.set(this.train, { autoAlpha: 1 });

		this.TL = gsap.timeline({ paused: true }).to(this.train, {
			duration: 100,
			motionPath: {
				path: this.path,
				align: this.path,
				alignOrigin: [0.5, 0],
				autoRotate: 90,
			},
		});

		this.anim = gsap.fromTo(
			this.TL,
			{
				progress: 0,
			},
			{
				progress: this.initialProgress,
				duration: 1.5,
				immediateRender: false,
				ease: 'Power2.out',
			}
		);

		this.animTrigger = gsap.fromTo(
			this.TL,
			{
				progress: this.initialProgress,
			},
			{
				progress: 1,
				scrollTrigger: {
					trigger: this.container,
					start: 'top top',
					end: window.innerWidth <= TABLET_BREAKPOINT ? '+=250%' : '+=150%',
					scrub: 1,
				},
			}
		);
	}
	destroy() {
		this.TL.progress(0).kill();
		this.anim.kill();
		this.animTrigger.kill();
	}
}

export default new Hero();
