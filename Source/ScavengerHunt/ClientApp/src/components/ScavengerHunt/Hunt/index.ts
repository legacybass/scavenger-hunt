import { connect } from 'react-redux';
import { ApplicationState } from '../../../store';
import { actionCreators } from '../../../store/Hunt';
import { Hunt } from './Hunt';

export default connect(
	(state: ApplicationState) => state.hunt,
	actionCreators
)(Hunt as any);
