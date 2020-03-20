import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import { submitResponse } from '../services/Hunt/HuntService';
import { Page } from '../services/Hunt/SubmitResponse';


export interface HuntState {
	isLoading: boolean;
	page: number;
	pageText: Page;
	message?: string;
}

const NEXT_PAGE = 'HUNT/NEXT_PAGE';
const SUBMITTING = 'HUNT/SUBMITTING';
const INCORRECT_ANSWER = 'HUNT/INCORRECT_ANSWER';

interface NextPageAction { type: typeof NEXT_PAGE; header: string; content: string; hasInputField: boolean; };
interface IncorrectAnswerAction { type: typeof INCORRECT_ANSWER; message: string; };
interface SubmittingAnswerAction { type: typeof SUBMITTING; };

type KnownAction = IncorrectAnswerAction | NextPageAction | SubmittingAnswerAction;

export const actionCreators = {
	submit: (answer: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
		dispatch({ type: SUBMITTING });

		const appState = getState();
		const { page } = appState.hunt as HuntState;

		submitResponse(answer, page)
		.then(data => {
			if (data.correct) {
				dispatch({
					type: NEXT_PAGE,
					header: data.page.header,
					content: data.page.content,
					hasInputField: data.page.hasInputField
				});
			} else {
				dispatch({ type: INCORRECT_ANSWER, message: data.message as string });
			}
		})
		.catch(error => {
			dispatch({ type: INCORRECT_ANSWER, message: error.message });
		})
	}
};

export const reducer: Reducer<HuntState> = (state: HuntState | undefined, incomingAction: Action): HuntState => {
	if (state === undefined) {
		return {
			page: 0,
			pageText: {
				header: 'Hello Hunters!',
				content: 'Welcome to the scavenger hunt! To continue, click the submit button below.',
				hasInputField: false
			},
			isLoading: false
		};
	}

	const action = incomingAction as KnownAction;
	switch(action.type) {
		case NEXT_PAGE:
			return {
				...state,
				page: state.page + 1,
				pageText: {
					action.text
				},
				isLoading: false
			};
		case INCORRECT_ANSWER:
			return {
				...state,
				isLoading: false,
				message: action.message
			};
		case SUBMITTING:
			return {
				...state,
				isLoading: true
			};
		default:
			return state;
	}
}
