import { Action, Reducer } from 'redux';

import { AppThunkAction } from '.';
import { Hunt } from '../services/Hunt/Hunt';
import { getHunts } from '../services/Hunt/HuntService';

export interface HuntListState {
	hunts: ReadonlyArray<Hunt>;
	isLoading: boolean;
	message?: string;
}

const GETTING_HUNTS = 'HUNTLIST/GETTING_HUNTS';
const GET_HUNTS_FAILED = 'HUNTLIST/GET_HUNTS_FAILED';
const UPDATE_HUNTS = 'HUNTLIST/UPDATE';

interface GettingHuntsAction {
	type: typeof GETTING_HUNTS;
};
interface GetHuntsFailedAction {
	type: typeof GET_HUNTS_FAILED;
	message: string;
};
interface UpdateHuntsAction {
	type: typeof UPDATE_HUNTS;
	hunts: ReadonlyArray<Hunt>;
}

type KnownAction = GettingHuntsAction | GetHuntsFailedAction | UpdateHuntsAction;

export const actionCreators = {
	getHunts: (): AppThunkAction<KnownAction> => async (dispatch) => {
		dispatch({ type: GETTING_HUNTS });

		try {
			const hunts = await getHunts();
			dispatch({
				type: UPDATE_HUNTS,
				hunts
			});
		} catch (err) {
			dispatch({
				type: GET_HUNTS_FAILED,
				message: err.message
			});
		}
	}
}

export const reducer: Reducer<HuntListState> = (state: HuntListState | undefined, incomingAction: Action): HuntListState => {
	if (state === undefined) {
		return {
			hunts: [],
			isLoading: false
		};
	}

	if (state.message)
		delete state.message;

	const action = incomingAction as KnownAction;

	switch(action.type) {
		case UPDATE_HUNTS:
			return {
				...state,
				hunts: action.hunts,
				isLoading: false
			};
		case GETTING_HUNTS:
			return {
				...state,
				isLoading: true
			};
		case GET_HUNTS_FAILED:
			return {
				...state,
				isLoading: false,
				message: action.message
			};
		default:
			return state;
	}
}
