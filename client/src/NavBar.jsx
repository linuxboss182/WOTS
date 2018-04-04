import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const styles = {
	root: {
	  	flexGrow: 1,
	},
	label: {
	  	flex: 0,
	},
};

class NavBar extends Component {

	render() {

		return(
			<AppBar position="static">
				<Toolbar style={styles.root}>
					<Typography variant="title" color="inherit" style={styles.label}>
						Constellation
					</Typography>
				</Toolbar>
			</AppBar>
		)
	}
}

export default NavBar;