const environment = {
	apiUrl: process.env.API || 'http://localhost:61051/ScavengerHunt/',
	game: process.env.GAME || 'CoronaVirus'
};

Object.freeze(environment);

export default environment;

export const Path = {
	combine(...args: string[]): string {
		if (args === null || args === undefined || !Array.isArray(args) || args.length === 0) {
			return '';
		}

		return args.reduce((str, current) => {
			if (typeof current !== 'string') {
				return str;
			}

			if (str.endsWith('/')) {
				if (current.startsWith('/')) {
					return `${str}${current.substring(1)}`;
				} else {
					return `${str}${current}`;
				}
			} else {
				if (current.startsWith('/')) {
					return `${str}${current}`;
				} else {
					return `${str}/${current}`;
				}
			}
		});
	}
};
