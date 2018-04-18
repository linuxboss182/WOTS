import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import MapContainer from './MapContainer';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

const styles = ({
	root: {
		flexGrow: 1,
		padding: 24,
		width: '100%',
		margin: 0,
	},
	paper: {
	  	padding: 48,
		textAlign: 'center',
		color: 'black',
	},
	similarBusinesses: {
		padding: 10,
		textAlign: 'center',
		color: 'black',
	}
});

class ResultsPage extends Component {

	render() {
        var similarBusinesses =  (this.props.businessData === null || this.props.businessData === {}) ? (<p>No results to show</p>) : (
			this.props.businessData.similar.map(function(sim_business){
				return (
					<Card key={sim_business['name']} style={{margin: 10, display: 'flex'}}>
						<CardMedia
							style={{width: 90, height: 110}}
							image={sim_business['image_url']}
							title={sim_business['name']}
						/>
						<CardContent style={{flex: '1 0 auto', padding: 5}}>
							<Typography>
								{sim_business['name']}
							</Typography>
							<Typography>
								{"Status: " + (sim_business['is_closed'] ? "Closed" : "Open")}
							</Typography>
							<Typography>
								{"Rating: " + sim_business['rating']}
							</Typography>
							<Typography>
								{"Price: " + (sim_business['price'] === undefined ? "N/A" : sim_business['price'])}
							</Typography>
							<Typography>
								{sim_business['location']['city'] + ', ' + sim_business['location']['state'] + ' ' +
								sim_business['location']['zip_code']}
							</Typography>
						</CardContent>
					</Card>
                // <Grid container spacing={24} key={sim_business['name']}>
				// 	<Grid item xs={12} sm={4}>
				// 			<img width="100%" src={sim_business['image_url']} alt=""/>
				// 		</Grid>
				// 		<Grid item xs={12} sm={8}>
							
				// 			<b>{sim_business['name']}</b><br />
				// 			{/*<p>{"Categories: " + (sim_business['categories'].map((category) => category.title).join(", "))}</p>*/}
				// 			{/*<p>{"Services: " + (sim_business['transactions'].length > 0 ? sim_business['transactions'].join(", ") : "N/A")}</p>*/}
				// 			{"Status: " + (sim_business['is_closed'] ? "Closed" : "Open")}<br />
				// 			{"Rating: " + sim_business['rating']}<br />
				// 			{"Price: " + (sim_business['price'] === undefined ? "N/A" : sim_business['price'])}<br />
				// 			{/*<p>{"Address: " + sim_business['location']['address1']}</p>*/}
				// 			{sim_business['location']['city'] + ', ' + sim_business['location']['state'] + ' ' +
				// 			sim_business['location']['zip_code']}<br />
				// 			{/*<p>{"Phone: " + sim_business['display_phone']}</p>*/}
				// 		</Grid>
				// 	</Grid>
				);
			})
		);

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
										{this.props.businessData['reviews'].map(review => 
											<h3 key={review.id}>{"Review: " + review.text}</h3>
										)}
									</Grid>
									<Grid item xs={12} sm={4}>
										<img width="100%" src={this.props.businessData['image_url']} alt=""/>
										<div width={300} height={200} style={{overflow: 'hidden'}}>
											<MapContainer lat={this.props.businessData['coordinates']['latitude']} 
												lng={this.props.businessData['coordinates']['longitude']}
												businessIcon={this.props.businessData['image_url']}
												businessName={this.props.businessData['name']}
												currentPosition={this.props.currentPosition}
												similarBusinesses={this.props.businessData.similar}/>
										</div>
									</Grid>
								</Grid>
							)
						}
						
					</Paper>
				</Grid>
				<Grid item xs={12} sm={3}>
					<Paper style={styles.similarBusinesses}>
						<p>Similar Businesses</p>
						{(this.props.businessData === null || this.props.businessData === {}) ? (<br />) :
							(<p>Similar Average Rating {this.props.businessData['similarAvgRating']}</p>)}
						{similarBusinesses}
					</Paper>
				</Grid>
			</Grid>
		)
	}
}

export default ResultsPage;