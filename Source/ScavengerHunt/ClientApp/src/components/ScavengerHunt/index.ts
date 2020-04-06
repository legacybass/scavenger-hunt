import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import { actionCreators } from "../../store/HuntList";
import { HuntList } from "./HuntList";

export default connect(
	(state: ApplicationState) => state.huntList,
	actionCreators
)(HuntList as any);
