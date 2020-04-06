import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import * as HuntStore from '../../../store/Hunt';
import { Loader } from '../../Loader';

import './Hunt.scss';
import { Alert, Card, CardHeader, CardBody, CardLink, Button, Form, Input, CardText } from 'reactstrap';

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
		const huntId = (this.props.match.params as any).id;
		this.props.getHunt(huntId);
	}

	componentWillUnmount() {
		this.props.clearHunt();
		this.setState({ answer: '' });
	}

	protected Submit() {
		(this.props.submit(this.state.answer || '') as unknown as Promise<boolean>)
		.then(success => {
			if (success)
				this.setState({ answer: '' });
		});;
	}

	protected Continue() {
		this.props.submit('');
	}

	public render() {
		const isFirstStep = !this.props.page.huntStepId;

		return (
			<>
				{this.props.isLoading && <Loader></Loader> }

				<h2>
					{this.props.huntTitle}<br />
					{isFirstStep && <small>{this.props.huntDescription}</small>}
				</h2>

				{this.props.message && <Alert color="danger">{this.props.message}</Alert>}

				{isFirstStep
				? <Form onSubmit={(event) => { event.preventDefault(); this.Continue(); }}>
					<div>
						<button type="submit" className="btn btn-primary">Continue</button>
					</div>
				</Form>
				: <Card>
					<CardHeader>{this.props.page.title}</CardHeader>

					<div className="text-center">
						{this.props.page.image && <img src={this.props.page.image} alt="Hunt Step" className="question-image" />}
					</div>

					<CardBody>
						<CardText>{this.props.page.content}</CardText>
					</CardBody>

					{this.props.page.url && <CardBody>
						<CardLink href={this.props.page.url}>{this.props.page.url}</CardLink>
					</CardBody>}

					{!this.props.page.isFinished && <div className="card-footer">
						<Form onSubmit={(event) => { event.preventDefault(); this.Submit(); }}>
							<div>
								<input className="form-control" type="text" onChange={(event) => { this.setState({ answer: event.currentTarget.value })}}
									placeholder="Submit your answer here" value={this.state.answer} />
							</div>
							<Button type="submit" color="primary" className="d-block ml-auto my-2">Submit Answer</Button>
						</Form>
					</div>}
				</Card>}
			</>
		);
	}
}
