import Select from 'react-select'
import { useEffect } from 'react';
import { useGetStatesQuery } from '../../Features/locations/locationApiSlice';

const SelectLocation = (props) => {

    const {useQuery, placeholderMessage, loadingMessage, locationType, refetchOnMountOrArgChange} = props.options;

    const refetchOnArg = refetchOnMountOrArgChange ? refetchOnMountOrArgChange : false;
    const query = props.query ? props.query : null;
    const { data, currentData, isLoading, isSuccess, isError, refetch } = useQuery( query, {refetchOnMountOrArgChange: refetchOnArg});

    const locations = isSuccess ? currentData ? currentData : data : [];
    const options = [];
    locations.forEach(item => {
        options.push({
            value: item[locationType],
            label: item[locationType],
        });
    });

    const handleChange = (newValue) =>{
        props.setLocation(newValue.value)
    }

    useEffect(()=>{
        if (isError) {
            props.setErrorMessage('No server response');
            refetch();
        }
        else props.setErrorMessage('');
    },[isError])


    return (
        <div>
            <label htmlFor={locationType}>{locationType}</label>
            <br />
            <Select
                id={locationType}
                placeholder = {placeholderMessage}
                isLoading={isLoading ? true : false}
                loadingMessage={()=>loadingMessage}
                options={options}
                onChange={newValue => handleChange(newValue)}
                autoFocus={true}
                required={true}
            />
        </div>
    )
}

export default SelectLocation