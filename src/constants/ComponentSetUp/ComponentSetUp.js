import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../store/reducers';

function ComponentSetUp({
	component: Component,
	store,
	...props
}) {
	return <Component store={store} {...props} />;
}

export default connect(
	mapStateToProps,
	null
)(ComponentSetUp);
