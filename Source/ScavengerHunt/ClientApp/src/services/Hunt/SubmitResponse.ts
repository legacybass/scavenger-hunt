import { Page } from "./Page";

export interface ISubmitResponse {
	correct: boolean;
	page?: Page;
	message?: string;
}
