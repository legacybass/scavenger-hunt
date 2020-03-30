import Environment, { Path } from '../../environment';
import { ISubmitResponse } from './SubmitResponse';

export const submitResponse = (answer: string, page: number | string) => {
	const url = Path.combine(Environment.apiUrl, '/api/submit');
	return Promise.resolve()
	.then(() =>	fetch(url, {
		method: 'POST',
		body: JSON.stringify({ answer, page })
	}))
	.then(response => {
		if (response.ok) {
			return response.json() as Promise<ISubmitResponse>;
		} else {
			throw new Error(`Could not submit your answer. ${response.statusText}`);
		}
	});
}
