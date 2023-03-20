import Select from 'react-select'
import { useGetCitiesQuery } from '../Features/locations/locationApiSlice';


const SelectCity = (props) => {

    const { data, isSuccess } = useGetCitiesQuery({ "country": props.country, "state": props.state });
    const cities = isSuccess ? data.data : [];
    const optionsCities = [];
    cities.forEach(item => {
        optionsCities.push({
            value: item.city,
            label: item.city
        });
    });

    return (
        <div>
            <span>City</span>
            <br />
            <Select
                options={optionsCities}
                onChange={(newValue) => props.setCity(newValue.value)}
            />
        </div>
    )
}

export default SelectCity