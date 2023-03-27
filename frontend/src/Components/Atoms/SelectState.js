import Select from 'react-select'
import { useEffect, useState } from 'react';
import { useGetStatesQuery } from '../../Features/locations/locationApiSlice';

const SelectState = (props) => {

    const { data: stateList, currentData: currentStateList, isLoading, isSuccess, refetch } = useGetStatesQuery({ "country": props.country });
    const states = isSuccess ? currentStateList ? currentStateList : stateList : [];
    const optionsStates = [];
    states.forEach(item => {
        optionsStates.push({
            value: item.state,
            label: item.state
        });
    });
    const [selectValue, setSelectValue] = useState(null);
    const placeholderMessage = 'Select a state or province';
    const loadingMessage = 'Loading States...';

    const handleChange = (newValue) =>{
        props.setState(newValue.value)
        setSelectValue(newValue);
    }
    const resetValue = () => null;

    useEffect(() => {
        refetch();
        setSelectValue(null);
    }, [props.country])

    return (
        <div>
            <label htmlFor='state'>State/Province</label>
            <br />
            <Select
                id='state'
                placeholder = {placeholderMessage}
                isLoading={isLoading ? true : false}
                loadingMessage={()=>loadingMessage}
                options={optionsStates}
                onChange={(newValue) => handleChange(newValue)}
                value = {selectValue}
            />
        </div>
    )
}

export default SelectState