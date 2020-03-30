import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as HuntStore from '../../store/Hunt';

type HuntProps = HuntStore.HuntState
	& typeof HuntStore.actionCreators
	& RouteComponentProps<{}>;

export class Hunt extends React.PureComponent<HuntProps> {
	state: {
		answer: string | undefined;
	};

	constructor(props: HuntProps) {
		super(props);

		this.state = {
			answer: undefined
		};
	}

	protected Submit() {
		this.props.submit(this.state.answer || '');
	}

	protected Continue() {
		this.props.submit('');
	}

	public render() {
		return (
			<>
				{this.props.isLoading && <div className="loader"></div> }
				<h1>{this.props.page.header}</h1>
				<p>{this.props.page.content}</p>
				{this.props.page.hasInputField
				? <form onSubmit={(event) => { event.preventDefault(); this.Submit(); }}>
					<div>
						<input type="text" onChange={(event) => { this.setState({ answer: event.currentTarget.value })}} />
						<button type="submit" className="btn btn-primary">Submit Answer</button>
					</div>
				</form>
				: <form onSubmit={(event) => { event.preventDefault(); this.Continue(); }}>
					<div>
						<button type="submit" className="btn btn-primary">Continue</button>
					</div>
				</form>}
			</>
		);
	}
}
