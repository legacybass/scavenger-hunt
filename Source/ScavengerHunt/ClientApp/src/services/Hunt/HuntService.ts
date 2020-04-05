import Environment, { Path } from '../../environment';
import { ISubmitResponse, Page, Hunt } from './SubmitResponse';

export const getHunt = async (huntId?: number, huntName?: string) => {
	const params = [['huntId', huntId], ['huntName', huntName]].filter(x => x[1]).map(x => `${x[0]}=${x[1]}`).join('&');

	const url = `${Path.combine(Environment.apiUrl, '/api/hunt')}?${params}`;

	const response = await fetch(url);

	if (response.ok)
		return await response.json() as Hunt;
	else
		throw new Error('No hunt could be found');
}

export const firstPage = async (page: number | string) => {
	const url = Path.combine(Environment.apiUrl, `/api/hunt/firststep/${page}`);
	const response = await fetch(url);

	if (response.ok)
		return await response.json() as Page;
	else
		throw new Error('No first step could be found');
}

export const submitResponse = async (answer: string, page: number | string) => {
	const url = Path.combine(Environment.apiUrl, `/api/hunt/submit/${page}`);
	const response = await fetch(url, {
		method: 'POST',
		body: JSON.stringify({ response: answer, huntStepId: page }),
		headers: { 'Content-Type': 'application/json' }
	});

	if (response.ok) {
		return await response.json() as Promise<Page>;
	} else {
		let error;
		try {
			const message = await response.text();
			error = new Error(message);
		} catch (err) {
			error = new Error(`Could not submit your answer. ${response.statusText}`);
		}
		throw error;
	}
}
