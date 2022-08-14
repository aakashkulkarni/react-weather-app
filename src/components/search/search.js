import { AsyncPaginate } from "react-select-async-paginate";
import React, {useState} from "react";
import { GEO_API_URL, geoApiOptions } from "../../api";

const Search = ({onSearchChange}) => {
    const [search, setSearch] = useState(null);

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    const loadOptions = (val) => {
        return fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${val}`, geoApiOptions)
	    .then(response => response.json())
	    .then(response => {
            return {
                options: response.data.map((city) => {
                    return {
                        coordinates: `${city.latitude} ${city.longitude}`,
                        label: `${city.name}, ${city.countryCode}`
                    }
                })
            }
        })
	    .catch(err => console.error(err));
    }

    return (
        <AsyncPaginate 
            placeholder="Search for city"
            debounceTimeout={600}
            value="search"
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    )
}

export default Search;