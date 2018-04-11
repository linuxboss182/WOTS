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
							(this.props.businessData === null || this.props.businessData === {}) ? (<p>No results to show</p>) : (
								<Grid container spacing={24}>
									<Grid item xs={12} sm={8}>
										<h1>{this.props.businessData['name']}</h1>
										<h3>{"Categories: " + (this.props.businessData['categories'].map((category) => category.title).join(", "))}</h3>
										<h3>{"Services: " + (this.props.businessData['transactions'].length > 0 ? this.props.businessData['transactions'].join(", ") : "N/A")}</h3>
										<h2>{"Status: " + (this.props.businessData['is_closed'] ? "Closed" : "Open")}</h2>
										<h2>{"Rating: " + this.props.businessData['rating']}</h2>
										<h2>{"Price: " + (this.props.businessData['price'] === undefined ? "N/A" : this.props.businessData['price'])}</h2>
										<h2>{"Address: " + this.props.businessData['location']['address1']}</h2> 
										<h2>{this.props.businessData['location']['city'] + ', ' + this.props.businessData['location']['state'] + ' ' + 
											this.props.businessData['location']['zip_code']}</h2>
										<h2>{"Phone: " + this.props.businessData['display_phone']}</h2>
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