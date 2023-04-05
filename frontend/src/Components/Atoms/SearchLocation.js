import { useState, useEffect } from "react";
import processed_locations from '../../data/processed_locations.json'

import '../../Styles/searchBar.css';

import { useDispatch,useSelector } from "react-redux";
import { getLocation, setLocation } from "../../Features/locations/chooseLocationToAddSlice";

const SearchLocation = () => {

    const [isFocused, setIsFocused] = useState(false);
    const [searchValue, setSearchValue] = useState(null);
    const [previousQuery, setPreviousQuery] = useState(null);
    const [queryResult, setQueryResult] = useState([]);
    
    const dispatch = useDispatch();

    const AMOUNT_OF_RESULTS_TO_DISPLAY = 10;

    const handleChange = (newValue) => {
        setSearchValue(newValue);
    }

    useEffect(() => {
        queryLocations(searchValue);
    }, [searchValue])

    const doWordArraysMatch = (userQueryWordsArray, locationWordsArray, startIndex = 0, endIndex = userQueryWordsArray.length) => {
        for (let i = startIndex; i < endIndex; i++) {
            //if not the final word in the query, assume the word is complete and do not match any words that extend past the query word
            //if the word is the final word in the query, autocomplete is on (assume user didnt finish typing and thus match with words longer than the query word)
            const regexExpr = i === endIndex - 1 ? '^' + userQueryWordsArray[i] : '^' + userQueryWordsArray[i] + '$';
            const regexQuery = new RegExp(regexExpr);

            if (!regexQuery.test(locationWordsArray[i])) {
                return false;
            }
        }
        return true;
    }

    const queryLocations = (query) => {

        if (query === '' || query === null || query === undefined) return;
        if (query.length < 3) {
            setQueryResult([]);
            return; //only query after atleast 3 letters, reduces lag
        }

        const queryWithoutPunc = query.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
        const queryLowercase = queryWithoutPunc.toLowerCase().trim();
        const queryArray = queryLowercase.split(/\s+/);

        //cache previous search result
        //Add a way to query from the previous result? 
        //(if the result is longer than the previous result)
        //(not sure about shorter)
        //Reduces time complexity
        if (queryArray === previousQuery) return;
        else setPreviousQuery(queryResult);

        const citiesQueryResults = []
        processed_locations.forEach(country => {
            country.states?.forEach(state => {
                state.cities?.forEach(city => {

                    const lowercaseCity = city.toLowerCase();
                    const cityArray = lowercaseCity.split(/\s+/);
                    const numCityWords = cityArray.length;

                    const lowercaseState = state.name.toLowerCase();
                    const lowercaseCountry = country.name.toLowerCase();

                    const regexExpr = '^' + queryArray[0];
                    const regexQuery = new RegExp(regexExpr);


                    //this search assumes the user types in the city name first

                    //initial filter to lower matching results
                    if (regexQuery.test(lowercaseCity)) {

                        //2 cases if there is a match:
                        //user query has less words than city name
                        //or user query has more words than city name
                        //in either case check if it matches the city first
                        if (queryArray.length <= numCityWords) {

                            //check if each word in the city matches each word in the query
                            if (doWordArraysMatch(queryArray, cityArray)) {
                                citiesQueryResults.push({
                                    'location': {
                                        'city': city,
                                        'state': state.name,
                                        'country': country.name
                                    }
                                });
                            }
                        }

                        //need to add more logic for when the user attempts to type in the state and country after city
                        //...
                        //...
                    }
                })
            })

        })
        const topResults = [];
        citiesQueryResults.slice(0, AMOUNT_OF_RESULTS_TO_DISPLAY - 1).map(item => topResults.push(item))
        setQueryResult(topResults);
    }

    const handleDropDownSelect = (city, state, country) => {
        console.log("test click");
        dispatch(setLocation({
            "city": city,
            "province": state,
            "country": country
        }));
    }

    const citiesQueryResultsElements = queryResult.length === 0 ? <></> : queryResult.map((item, index) =>
        <div
            className="queryResult"
            key={index}
            onClick={() => handleDropDownSelect(item.location.city, item.location.state, item.location.country)}>
            {'' + item.location.city + ', ' + item.location.state + ', ' + item.location.country}
        </div>
    );

    const dropDown = isFocused ? <div className="dropdownBorder border">
        <label className="dropdownLabel" htmlFor="dropdownResults" ><b>Choose a city:</b></label>
        <div id="dropdownResults ">{citiesQueryResultsElements}</div>
    </div> : <></>;

    return (
        <div id="location-search-container">
            <input id="location-search"
                type="text"
                name="cities"
                placeholder={"Search for a city..."}
                onChange={(e) => handleChange(document.getElementById("location-search").value)}
                onFocus={() => setIsFocused(true)}
                /* onBlur={() => setIsFocused(false)} */
                maxLength={100}
            />
            {dropDown}
        </div>

    )
}

export default SearchLocation