import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import MapContainer from './MapContainer';
import Card, { CardContent, CardMedia, CardHeader } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

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
		zIndex: 1500,
		position: 'relative'
	},
	chip: {
		marginRight: 10,
	},
	chipAvatar: {
		backgroundColor: '#3F51B5',
		color: '#FFDA56',
	},
	keyWords: {
		width: '20%',
		margin: 5,
		display: 'inline-block',
		padding: 10,
		textAlign: 'center',
		backgroundColor: 'lightblue',
		color: 'white'
	},
	reviews: {
		textAlign: 'left',
	},
	reviewCard: {
		marginBottom: 10,
	}
});

class ResultsPage extends Component {

	constructor(props) {
		super(props);

		this.createSearchHandler = this.createSearchHandler.bind(this);
		this.callApi = this.callApi.bind(this);
	}

	callApi = async (path) => {
        const response = await fetch(path);
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
	};
	
	createSearchHandler(searchTerm) {
		return function() {
			this.callApi('/search?name='+searchTerm+'&zipcode='+this.props.zipCode+'&lat='+this.props.currentPosition.lat+'&long='+this.props.currentPosition.lng)
				.then(res => {
					console.log(res);
					this.props.setBusinessData(res);
				})
				.catch(err => {
					this.props.setBusinessData(null);
				});	
		}.bind(this);
	}

	render() {
        var similarBusinesses =  (this.props.businessData === null || this.props.businessData === {}) ? (<p>No results to show</p>) : (
			this.props.businessData.similar.map(function(sim_business){
				return (
					<Card onClick={this.createSearchHandler(sim_business['name'])} key={sim_business['name']} style={{margin: 10, display: 'flex'}}>
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
				);
			}.bind(this))
		);

		var topTfIdf = (this.props.businessData === null || this.props.businessData === {}) ? [] : this.props.businessData['topTfIdf'].map(pair => 
			<Chip style={styles.chip} key={pair.word + pair.val + Date.now()} avatar={<Avatar style={styles.chipAvatar}>#</Avatar>} label={pair.word} />
		);

        return(
			<Grid container spacing={24} style={styles.root}>
				<Grid item xs={12} sm={9}>
					<Paper style={styles.paper}>
						{
							(this.props.businessData === null || this.props.businessData === {}) ? (<p>No results to show</p>) : (
								<Grid container spacing={24}>
									<Grid item xs={12} sm={8}>
										{topTfIdf}
										{/* {this.props.businessData['topTfIdf'].map(pair => 
											<div key={pair.word + pair.val} style={styles.keyWords}>{pair.word}</div>
										)} */}
										<h1>{this.props.businessData['name']}</h1>
										<h3>{"Categories: " + (this.props.businessData['categories'].map((category) => category.title).join(", "))}</h3>
										<h3>{"Services: " + (this.props.businessData['transactions'].length > 0 ? this.props.businessData['transactions'].join(", ") : "N/A")}</h3>
										<Grid container spacing={24}>
											<Grid item xs={12} md={6}>
												<h3>{"Status: " + (this.props.businessData['is_closed'] ? "Closed" : "Open")}</h3>
												<h3>{"Rating: " + this.props.businessData['rating']}</h3>
												<h3>{"Price: " + (this.props.businessData['price'] === undefined ? "N/A" : this.props.businessData['price'])}</h3>
											</Grid>
											<Grid item xs={12} md={6}>
												<h3>{"Address: " + this.props.businessData['location']['address1']}</h3> 
												<h3>{this.props.businessData['location']['city'] + ', ' + this.props.businessData['location']['state'] + ' ' + 
													this.props.businessData['location']['zip_code']}</h3>
												<h3>{"Phone: " + this.props.businessData['display_phone']}</h3>
											</Grid>
										</Grid>
										{this.props.businessData['yelpReviews'].map(review => 
											<Card key={review.id} style={styles.reviewCard}>
												<CardHeader
													avatar={<Avatar src={"../res/yelp.svg"}/>}
													title={"Rating: " + review.rating}
													subheader={review.time_created}
												/>
												<CardContent>
													<Typography component="p" style={styles.reviews}>
														{review.text}
													</Typography>
												</CardContent>
											</Card>
											// <div style={styles.reviews} key={review.id}>{"Yelp Review: " + review.text}</div>
										)}
										{this.props.businessData['googleReviews'].map(review => 
											<Card key={review.author_name+review.time} style={styles.reviewCard}>
												<CardHeader
													avatar={<Avatar src={"../res/google.svg"}/>}
													title={"Rating: " + review.rating}
													subheader={review.relative_time_description}
												/>
												<CardContent>
													<Typography component="p" style={styles.reviews}>
														{review.text}
													</Typography>
												</CardContent>
											</Card>
											// <div style={styles.reviews} key={review.time}>{"Google review: " + review.text}</div>
										)}
									</Grid>
									<Grid item xs={12} sm={4}>
										<img width="100%" src={this.props.businessData['image_url']} ref={image => this.image = image} alt=""/>
										<div width={300} height={200} style={{overflow: 'hidden'}}>
											<MapContainer lat={this.props.businessData['coordinates']['latitude']} 
												lng={this.props.businessData['coordinates']['longitude']}
												businessIcon={this.props.businessData['image_url']}
												businessName={this.props.businessData['name']}
												currentPosition={this.props.currentPosition}
												similarBusinesses={this.props.businessData.similar}
												imageRef={this.image}/>
										</div>
									</Grid>
								</Grid>
							)
						}
						
					</Paper>
				</Grid>
				<Grid item xs={12} sm={3}>
					<Paper style={styles.similarBusinesses}>
						<h1>Similar Businesses</h1>
						{(this.props.businessData === null || this.props.businessData === {}) ? (<br />) :
							(<h3>Similar Average Rating {this.props.businessData['similarAvgRating']}</h3>)}
						{similarBusinesses}
					</Paper>
				</Grid>
			</Grid>
		)
	}
}

export default ResultsPage;