import * as React from 'react';
import { connect } from 'react-redux';

const Home = () => (
	<main>
		<h1 className="h1">Welcome All!</h1>
		<p className="lead">
			Welcome to this site! Since everyone is currently locked down and unable to go out and do things, I decided
			to try and help by making something that can get us engaged. This site provides us with the opportunity to
			create our own community style game types and publish them for others to enjoy.
		</p>
		<p>
			Each game type can be accessed from the navigation menu at the top of the page. Currently, only scavenger
			hunts have been created, and so only they show up. As more game types are made available, they will also
			show up in the menu.
		</p>
		<p>
			If you have ideas for game types, please feel free to contact me and submit them (this includes any new
			scavenger hunts) and I will get them entered as soon as I am able. Please be patient, I'm creating this
			all on my own and it does take time.
		</p>
		<p>
			Have fun!
		</p>
	</main>
);

export default connect()(Home);
