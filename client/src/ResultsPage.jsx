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
						{
							this.props.businessData === null ? (<p>No results to show</p>) : (
								<Grid container spacing={24}>
									<Grid item xs={12} sm={8}>
										<h1>{this.props.businessData['name']}</h1>
										<h2>{"Rating: " + this.props.businessData['rating']}</h2>
									</Grid>
									<Grid item xs={12} sm={4}>
										<img width="100%" src={this.props.businessData['image_url']} alt=""/>
									</Grid>
								</Grid>
							)
						}
						
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