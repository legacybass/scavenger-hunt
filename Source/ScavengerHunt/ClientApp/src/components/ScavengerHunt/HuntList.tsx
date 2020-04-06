import * as React from 'react';
import { RouteComponentProps, Redirect,  } from 'react-router';
import { NavLink, CardColumns, Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';
import { Link } from 'react-router-dom';

import * as HuntListStore from '../../store/HuntList';
import { Loader } from '../Loader';
import { Hunt } from '../../services/Hunt/Hunt';

type ListProps = HuntListStore.HuntListState
	& typeof HuntListStore.actionCreators
	& RouteComponentProps<{}>;

export class HuntList extends React.PureComponent<ListProps> {
	state = {
		location: ''
	}

	public componentDidMount() {
		this.props.getHunts();
	}

	public componentWillUnmount() {
		this.setState({ location: '' });
	}

	public render() {
		if (this.state.location) {
			const { location } = this.state;
			return <Redirect to={location} />
		}

		return (
			<>
				{this.props.isLoading && <Loader></Loader>}
				<h2 className="h2">Please select from the list of scavenger hunts below:</h2>
				<CardColumns className="mt-5 cursor-pointer">
					{Array.isArray(this.props.hunts) && this.props.hunts.map((hunt: Hunt) => (
						<Card key={hunt.huntId} onClick={() => this.setState({ location: `/hunt/${hunt.huntId}`})}>
							{hunt.image && <CardImg top src={hunt.image} alt={`${hunt.name}`} />}
							<CardBody>
								<CardTitle>{hunt.name}</CardTitle>
								<CardText>{hunt.description}</CardText>
							</CardBody>
						</Card>
					))}
				</CardColumns>
			</>
		)
	}
}
