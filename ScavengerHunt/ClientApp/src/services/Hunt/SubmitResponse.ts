export interface ISubmitResponse {
	correct: boolean;
	page?: Page;
	message?: string;
}

export interface Page {
	header: string;
	content: string;
	hasInputField: boolean;
};
