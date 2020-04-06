import * as React from 'react';
import { Route, Redirect } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Hunt from './components/ScavengerHunt/Hunt';
import HuntList from './components/ScavengerHunt';

import './custom.scss'

export default () => (
	<Layout>
		<Route exact path='/' component={Home} />
		<Route exact path='/hunt' component={HuntList} />
		<Route path='/hunt/:id' component={Hunt} />
		<Redirect to='/' />
	</Layout>
);
