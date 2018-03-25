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

class ResultsPage extends Component {

	render() {

		return(
			<Grid container spacing={24} style={styles.root}>
				<Grid item xs={12} sm={9}>
					<Paper style={styles.paper}>
						Results
					</Paper>
				</Grid>
				<Grid item xs={12} sm={3}>
					<Paper style={styles.paper}>
						Similar Businesses
					</Paper>
				</Grid>
			</Grid>
		)
	}
}

export default ResultsPage;