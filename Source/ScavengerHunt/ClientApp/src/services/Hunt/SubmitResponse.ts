export interface ISubmitResponse {
	correct: boolean;
	page?: Page;
	message?: string;
}

export interface Page {
	huntStepId: number;
	title: string;
	content: string;
	image?: string;
	url?: string;
	isFinished: boolean;
};

export interface Hunt {
	huntId: number;
	name: string;
	description: string;
}
