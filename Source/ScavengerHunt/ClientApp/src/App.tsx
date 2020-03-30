import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Hunt from './components/Hunt';

import './custom.css'

export default () => (
	<Layout>
		<Route exact path='/' component={Home} />
		<Route path='/hunt' component={Hunt} />
	</Layout>
);
