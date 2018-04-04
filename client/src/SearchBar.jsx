import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Search from 'material-ui-icons/Search';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { MenuItem } from 'material-ui/Menu';

const styles = ({
	root: {
		flexGrow: 1,
		padding: 24,
	},
	paper: {
	  	padding: 48,
		textAlign: 'center',
		color: 'black',
		height: 50,
	},
	// suggestionContainer: {
	// 	position: 'relative',
	// 	zIndex: 1600,
	// 	margin: 0,
	// 	padding: 0,
	// 	listStyleType: 'none',
	// },
	// suggestionsContainerOpen: {
	// 	position: 'absolute',
	// 	zIndex: 1,
	// 	left: 0,
	// 	right: 0,
	// },
	// suggestion: {
	// 	display: 'block',
	// },
	container: {
		flexGrow: 1,
		position: 'relative',
		height: 250,
	},
	suggestionsContainerOpen: {
		position: 'absolute',
		zIndex: 1,
		left: 0,
		right: 0,
	},
	suggestion: {
		display: 'block',
	},
	suggestionsList: {
		margin: 0,
		padding: 0,
		listStyleType: 'none',
	},
	button: {
		marginLeft: 20,
	},
	icon: {
		marginLeft: 5,
	},
});

function renderInput(inputProps) {
	const { classes, ref, ...other } = inputProps;
	
	  return (
		<TextField
			fullWidth
			label="Search for a business..."
			InputProps={{
				inputRef: ref,
				...other,
			}}
		/>
	);
}

function renderSuggestionsContainer(options) {
	const { containerProps, children } = options;
  
	return (
		<Paper {...containerProps} square>
			{children}
		</Paper>
	);
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
	const matches = match(suggestion, query);
	const parts = parse(suggestion, matches);
  
	return (
		<MenuItem selected={isHighlighted} component="div">
			<div>
				{parts.map((part, index) => {
					return part.highlight ? (
						<span key={String(index)}>
							<strong>{part.text}</strong>
						</span>
					) : (
						<span key={String(index)}>
							{part.text}
						</span>
					);
				})}
			</div>
		</MenuItem>
	);
}

function getSuggestionValue(suggestion) {
	return suggestion;
}

function getSuggestions(value) {
	const inputValue = value.trim().toLowerCase();
	const inputLength = inputValue.length;
	let count = 0;

	let suggestions = ['the sole proprietor', 'the boynton', 'the goats head'];
  
	return inputLength === 0
	  ? []
	  : suggestions.filter(suggestion => {
		  const keep =
			count < 5 && suggestion.toLowerCase().slice(0, inputLength) === inputValue;
  
		  if (keep) {
			count += 1;
		  }
  
		  return keep;
		});
}

class SearchBar extends Component {

	constructor(props){
		super(props);

		this.state = {
			searchText: "",
			suggestions: [],
		};

		this.inputChange = this.inputChange.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
	}

	inputChange = (event, { newValue }) => {
		this.setState({searchText: newValue});
	}

	handleSearch(event) {
		event.preventDefault();
		if(this.state.searchText !== ""){
			this.callApi('/search?name='+this.state.searchText)
				.then(res => {
					console.log(res);
				})
				.catch(err => console.log(err));	
		}
	}

	callApi = async (path) => {
        const response = await fetch(path);
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };

	handleSuggestionsFetchRequested = ({ value }) => {
		this.setState({
		 	suggestions: getSuggestions(value),
		});
	};
	
	handleSuggestionsClearRequested = () => {
		this.setState({
			suggestions: [],
		});
	};

	render() {

		return(
			<Grid container spacing={24} style={styles.root}>
				<Grid item xs={12}>
					<Paper style={styles.paper}>
						<form autoComplete="off" onSubmit={this.handleSearch}>
							<Grid container spacing={24}>
								<Grid item sm={2}/>
								<Grid item sm={6}>
									<Autosuggest
										theme={{
											container: styles.container,
											suggestionsContainerOpen: styles.suggestionsContainerOpen,
											suggestionsList: styles.suggestionsList,
											suggestion: styles.suggestion,
										}}
										renderInputComponent={renderInput}
										suggestions={this.state.suggestions}
										onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
										onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
										renderSuggestionsContainer={renderSuggestionsContainer}
										getSuggestionValue={getSuggestionValue}
										renderSuggestion={renderSuggestion}
										inputProps={{
											value: this.state.searchText,
											onChange: this.inputChange,
										}}	
									/>
								</Grid>
								<Grid item sm={2}>
									<Button
										variant="raised"
										color="primary"
										style={styles.button}
										type="submit"
									>
										Search
										<Search style={styles.icon}/>
									</Button>
								</Grid>
								<Grid item sm={2}/>
							</Grid>
						</form>
					</Paper>
				</Grid>
			</Grid>
		)
	}
}

export default SearchBar;