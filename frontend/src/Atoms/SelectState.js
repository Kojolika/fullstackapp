import Select from 'react-select'
import { useEffect } from 'react';
import { useGetStatesQuery } from '../Features/locations/locationApiSlice';

const SelectState = (props) => {

    const { data, isSuccess, refetch } = useGetStatesQuery({ "country": props.country });
    const states = isSuccess ? data.data : [];
    const optionsStates = [];
    states.forEach(item => {
        optionsStates.push({
            value: item.state,
            label: item.state
        });
    });

    useEffect(() =>{
        refetch();
    },[props.country])

    return (
        <div>
            <label htmlFor='state'>State/Province</label>
            <br />
            <Select
                id='state'
                options={optionsStates}
                onChange={(newValue) => props.setState(newValue.value)}
            />
        </div>
    )
}

export default SelectState