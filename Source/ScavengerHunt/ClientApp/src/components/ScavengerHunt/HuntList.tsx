import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

import * as HuntListStore from '../../store/HuntList';
import { Loader } from '../Loader';
import { Hunt } from '../../services/Hunt/Hunt';

type ListProps = HuntListStore.HuntListState
	& typeof HuntListStore.actionCreators
	& RouteComponentProps<{}>;

export class HuntList extends React.PureComponent<ListProps> {
	public componentDidMount() {
		this.props.getHunts();
	}

	public render() {
		return (
			<div>
				{this.props.isLoading && <Loader></Loader>}

				<h2>Please select from the list of scavenger hunts below</h2>
				<ul>
					{Array.isArray(this.props.hunts) && this.props.hunts.map((hunt: Hunt) => (
						<li key={hunt.huntId}>
							<NavLink tag={Link} className="text-dark" to={`/hunt/${hunt.huntId}`}>{hunt.name}</NavLink>
						</li>
					))}
				</ul>
			</div>
		)
	}
}
