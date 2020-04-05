import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as HuntStore from '../../store/Hunt';
import { Loader } from '../Loader';

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

	componentDidMount() {
		this.props.getHunt();
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
				{this.props.isLoading && <Loader></Loader> }

				<h1>{this.props.page.title}</h1>

				{this.props.page.image && <img src={this.props.page.image} alt="Hunt Image" />}

				<p>{this.props.page.content}</p>

				{this.props.page.url && <a href={this.props.page.url}>{this.props.page.url}</a>}

				{this.props.message && <p>{this.props.message}</p>}

				{this.props.page.huntStepId === -1
					? <form onSubmit={(event) => { event.preventDefault(); this.Continue(); }}>
						<div>
							<button type="submit" className="btn btn-primary">Continue</button>
						</div>
					</form>
				: !this.props.page.isFinished
				? <form onSubmit={(event) => { event.preventDefault(); this.Submit(); }}>
					<div>
						<input type="text" onChange={(event) => { this.setState({ answer: event.currentTarget.value })}} />
						<button type="submit" className="btn btn-primary">Submit Answer</button>
					</div>
				</form>
				: null}
			</>
		);
	}
}
