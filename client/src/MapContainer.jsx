import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import ReactDOM from 'react-dom';

export class MapContainer extends Component {
	constructor(props) {
		super(props);
		
	}

	componentDidUpdate() {
		this.map.recenterMap();
	}

	render() {
		var similarMarkers= this.props.similarBusinesses.map(b => {
			return (<Marker key={b['name']} title={b['name']} position={{
				lat: b['coordinates']['latitude'],
				lng: b['coordinates']['longitude']
			}}
			icon={{
				url: b['image_url'],
				anchor: new this.props.google.maps.Point(32,32),
				scaledSize: new this.props.google.maps.Size(32,32)
			}}/>)
		})
	

	  	return (
			<Map google={this.props.google} 
				style={{width: 300, height: 200}} 
				initialCenter={{
					lat: this.props.lat,
					lng: this.props.lng
				}}
				zoom={12}
				ref={map => {this.map = map}}>

				{this.props.currentPosition !== null ? 
					<Marker title={"You are here"} position={{
							lat: this.props.currentPosition.lat,
							lng: this.props.currentPosition.lng
						}}/> : []
				}
	
				<Marker title={this.props.businessName} position={{
						lat: this.props.lat,
						lng: this.props.lng
					}}
					icon={{
						url: this.props.businessIcon,
						anchor: new this.props.google.maps.Point(32,32),
						scaledSize: new this.props.google.maps.Size(32,32)
					}}/>

				{similarMarkers}
			</Map>
	  );
	}
  }
  
export default GoogleApiWrapper({
	apiKey: ("AIzaSyCyQGiLW5zlcFMLYvwgXRA5DEa5ASoi3kQ"),
	style: {width: 300, height: 200}
})(MapContainer)