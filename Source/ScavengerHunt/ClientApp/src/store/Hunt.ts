import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import { submitResponse, firstPage, getHunt } from '../services/Hunt/HuntService';
import { Hunt } from '../services/Hunt/Hunt';
import { Page } from '../services/Hunt/Page';

export interface HuntState {
	isLoading: boolean;
	page: Page;
	message?: string;
	huntId: number;
}

const UPDATE_HUNT = 'HUNT/UPDATE';
const UPDATE_HUNT_FAILED = 'HUNT/UPDATE_FAILED';
const NEXT_PAGE = 'HUNT/NEXT_PAGE';
const SUBMITTING = 'HUNT/SUBMITTING';
const INCORRECT_ANSWER = 'HUNT/INCORRECT_ANSWER';

interface GetHuntAction extends Hunt {
	type: typeof UPDATE_HUNT
};
interface GetHuntFailedAction {
	type: typeof UPDATE_HUNT_FAILED;
	message: string;
};
interface NextPageAction extends Page {
	type: typeof NEXT_PAGE;
};
interface IncorrectAnswerAction { type: typeof INCORRECT_ANSWER; message: string; };
interface SubmittingAnswerAction { type: typeof SUBMITTING; };

type KnownAction = IncorrectAnswerAction | NextPageAction | SubmittingAnswerAction | GetHuntAction | GetHuntFailedAction;

export const actionCreators = {
	getHunt: (huntId: number): AppThunkAction<KnownAction> => async (dispatch) => {
		dispatch({ type: SUBMITTING });

		try {
			const hunt = await getHunt(huntId);
			dispatch({
				type: UPDATE_HUNT,
				...hunt
			});
		} catch (err) {
			dispatch({
				type: UPDATE_HUNT_FAILED,
				message: err.message
			});
		}
	},
	submit: (answer: string): AppThunkAction<KnownAction> => async (dispatch, getState) => {
		dispatch({ type: SUBMITTING });

		const appState = getState();
		const { page: { huntStepId }, huntId } = appState.hunt as HuntState;

		try {
			let page;
			if (huntStepId === -1) {
				page = await firstPage(huntId);
			} else {
				page = await submitResponse(answer, huntStepId);
			}

			dispatch({
				type: NEXT_PAGE,
				title: page.title,
				content: page.content,
				url: page.url,
				isFinished: page.isFinished,
				huntStepId: page.huntStepId
			});

		} catch(err) {
			dispatch({
				type: INCORRECT_ANSWER,
				message: err.message
			});
		}
	}
};

export const reducer: Reducer<HuntState> = (state: HuntState | undefined, incomingAction: Action): HuntState => {
	if (state === undefined) {
		return {
			page: {
				title: 'Hello Hunters!',
				content: 'Welcome to the scavenger hunt! To continue, click the button below.',
				huntStepId: -1,
				isFinished: false
			},
			isLoading: false,
			huntId: -1
		};
	}

	if (state.message)
		delete state.message;

	const action = incomingAction as KnownAction;
	switch(action.type) {
		case UPDATE_HUNT:
			return {
				...state,
				huntId: action.huntId,
				page: {
					...state.page,
					title: action.name,
					content: action.description
				},
				isLoading: false
			};
		case NEXT_PAGE:
			return {
				...state,
				page: {
					content: action.content,
					title: action.title,
					isFinished: action.isFinished,
					huntStepId: action.huntStepId,
					image: action.image,
					url: action.url
				},
				isLoading: false,
				message: undefined
			};
		case UPDATE_HUNT_FAILED:
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
