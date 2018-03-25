import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

const styles = ({
	root: {
		flexGrow: 1,
		padding: 24,
	},
	paper: {
	  	padding: 48,
		textAlign: 'center',
		color: 'black',
	},
});

class SearchBar extends Component {

	render() {

		return(
			<Grid container spacing={24} style={styles.root}>
				<Grid item xs={12}>
					<Paper style={styles.paper}>
						Search Bar
					</Paper>
				</Grid>
			</Grid>
		)
	}
}

export default SearchBar;