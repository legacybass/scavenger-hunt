import * as React from 'react';

export const Loader = () => {
	const styles = {
		'--loader-color': 'var(--primary, hsl(200, 70%, 75%))',
		justifyContent: 'unset' // just to make the TypeScript like this object
	};

	return (
		<div className="modal-loader">
			<div className="box loader-16" style={styles}>
				<div className="loader-16"></div>
			</div>
		</div>
	)
}
