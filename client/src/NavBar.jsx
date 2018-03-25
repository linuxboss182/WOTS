import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const styles = {
	root: {
	  	flexGrow: 1,
	},
	flex: {
	  	flex: 1,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
};

class NavBar extends Component {

	render() {

		return(
			<AppBar position="static">
				<Toolbar>
					<Typography variant="title" color="inherit" className={styles.flex}>
						Constellation
					</Typography>
				</Toolbar>
			</AppBar>
		)
	}
}

export default NavBar;