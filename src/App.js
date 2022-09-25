import React from "react";
import { useState } from "react";
import "./App.css";

function Quote({ handleChange, quote, author }) {
	return (
		<form onSubmit={handleChange}>
			<div className="card">
				<div className="card-body">
					<div className="card-header">"{quote}"</div>
					<div className="card-subtitle"> -{author}</div>
				</div>
			</div>
			<input type="submit" value="New Quote" />
		</form>
	);
}

function App() {
	const [quoteList, setQuoteList] = useState([]);

	const getQuote = (event) => {
		event.preventDefault();
		fetch(
			`https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json`
		)
			.then((result) => result.json())
			.then((data) => {
				let i = Math.floor(Math.random() * data.quotes.length);
				setQuoteList(data.quotes[i]);
			})
			.catch((err) => console.log("ERROR"));
	};

	return (
		<div className="App">
			<div className="App-header">
				<h1>Quote Generator</h1>
			</div>
			<div className="mx-auto" style={{ maxWidth: 400 }}>
				{quoteList.length !==0 && <Quote handleChange={getQuote} quote={quoteList.quote} author={quoteList.author}/>}
				{quoteList.length ===0 && <Quote handleChange={getQuote} quote="The greatest glory in living lies not in never falling, but in rising every time we fall." author="Nelson Mandela"/>}
			</div>
		</div>
	);
}

export default App;
