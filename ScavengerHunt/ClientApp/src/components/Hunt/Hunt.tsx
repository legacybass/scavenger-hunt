import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as HuntStore from '../../store/Hunt';

type HuntProps = HuntStore.HuntState
	& typeof HuntStore.actionCreators
	& RouteComponentProps<{}>;

export class Hunt extends React.PureComponent<HuntProps> {
	public render() {
		return (
			<h1>Hello Hunters!</h1>
		);
	}
}
