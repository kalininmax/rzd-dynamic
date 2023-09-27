class RZD {
	constructor() {
		(async function () {
			this.env = await import('./utils/env').default;
			this.utils = await import('./utils/utils').default;
			this.components = {
				Hero: await import('../../includes/hero/hero'),
				Feature: await import('../../components/feature/feature'),
			};
			this.helpers = {};
			this.modules = {
				Lottie: await import('./modules/Lottie'),
				Animation: await import('./modules/Animation'),
			};
			document.addEventListener('DOMContentLoaded', () => {
				document.documentElement.classList.remove('_loading');
			});
		})();
	}
}

global.RZD = new RZD();

if (module.hot) {
	module.hot.accept();
}
