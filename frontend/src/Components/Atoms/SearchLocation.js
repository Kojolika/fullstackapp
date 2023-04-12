import { useState, useEffect, useRef } from "react";
import processed_locations from '../../data/processed_locations.json'
import { useNavigate } from "react-router-dom";

import '../../Styles/searchBar.css';

import { useDispatch, } from "react-redux";
import { setCurrentLocation } from "../../Features/locations/locationsSlice";

import useOutsideClick from "../../app/hooks/useOutsideClick";
import { Search } from "../../Icons/svgImages/index";

const SearchLocation = () => {

    const [isFocused, setIsFocused] = useState(false);
    const [searchValue, setSearchValue] = useState(null);
    const [previousQuery, setPreviousQuery] = useState(null);
    const [queryResult, setQueryResult] = useState([]);
    
    const searchbarRef = useRef();
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const AMOUNT_OF_RESULTS_TO_DISPLAY = 10;

    const handleChange = (newValue) => {
        setSearchValue(newValue);
    }

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

                    const lowercaseCity = city.name.toLowerCase();
                    const cityArray = lowercaseCity.split(/\s+/);
                    const numCityWords = cityArray.length;

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
                                        "city": {
                                            "name": city.name
                                        },
                                        "province": {
                                            "name": state.name,
                                            "state_code": state.state_code
                                        },
                                        "country": {
                                            "name": country.name,
                                            "iso2": country.iso2
                                        }
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

    useEffect(() => {
        if (searchValue !== null) queryLocations(searchValue);
    }, [searchValue])

    const handleDropDownSelect = (city, province, country) => { 
        dispatch(setCurrentLocation({
            "city": city,
            "province": province,
            "country": country
        }));
        navigate('/location');
    }

    const citiesQueryResultsElements = queryResult.length === 0 ? <></> : queryResult.map((item, index) =>
        <div
            className="dropDownSelection"
            key={index}
            onClick={() => handleDropDownSelect(item.location.city, item.location.province, item.location.country)}>
            {'' + item.location.city.name + ', ' + item.location.province.name + ', ' + item.location.country.name}
        </div>
    );

    const dropDown = isFocused ? <div className="dropdownBorder border">
        <label className="dropdownLabel" htmlFor="dropdownResults" ><b>Choose a city:</b></label>

        <div id="dropdownResults ">{citiesQueryResultsElements}</div>
    </div> : <></>;

    useOutsideClick(searchbarRef, () => {
        setIsFocused(false);
    })

    return (
        <div id="location-search-container" ref={searchbarRef}>
            <div id="location-search">
                <input id="location-search-input"
                    type="text"
                    name="cities"
                    placeholder={"Search for a city..."}
                    onChange={(e) => handleChange(document.getElementById("location-search-input").value)}
                    onFocus={() => setIsFocused(true)}
                    maxLength={100}
                />
                <Search />
            </div>
            {dropDown}
        </div>

    )
}

export default SearchLocation