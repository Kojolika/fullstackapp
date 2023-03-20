import Select from 'react-select'
import { useGetStatesQuery } from '../Features/locations/locationApiSlice';

const SelectState = (props) => {

    const { data: dataStates, isSuccess: isSuccessStates } = useGetStatesQuery({ "country": props.country });
    const states = isSuccessStates ? dataStates.data : [];
    const optionsStates = [];
    states.forEach(item => {
        optionsStates.push({
            value: item.state,
            label: item.state
        });
    });

    return (
        <div>
            <span>State/Province</span>
            <br />
            <Select
                options={optionsStates}
                onChange={(newValue) => props.setState(newValue.value)}
            />
        </div>
    )
}

export default SelectState