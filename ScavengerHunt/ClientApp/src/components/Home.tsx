import * as React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

const Home = () => (
	<main>
		<h1>Welcome Hunters!</h1>
		<p>
			This is just a simple site to help us all keep a little more of our sanity as we are kept isolate from
			each other and the rest of the world. We have gathered together a series of clues and made a very simple
			scavenger hunt we all can enjoy. Some of the clues can be tricky, so keep at it and try your best. You may,
			of course, ask friends for the answers, but that defeats the fun of the game. So try your best and see how far you get!
		</p>
		<p>
			To begin the scavenger hunt, click the "Hunt!" link at the top of the page in the navigation bar (or click
			<NavLink className="d-inline p-1" tag={Link} to="/hunt">here</NavLink>) and the race is on! The site will
			track your progress as long as you're on the same computer. If you switch devices, though, you'll need to
			start over. If you would like to start over simply for the fun of it, well then I guess you're just a
			glutton for punishment; but you can do that
			<NavLink className="d-inline p-1" tag={Link} to="/clear">here</NavLink>).
		</p>
		<p>
			Have fun!
		</p>
	</main>
);

export default connect()(Home);
