import Select from 'react-select'
import { useEffect } from 'react';

const SelectLocation = (props) => {

    const { useQuery, placeholderMessage, loadingMessage, locationType, refetchOnMountOrArgChange } = props.options;

    const isRefetchOnArg = refetchOnMountOrArgChange ? refetchOnMountOrArgChange : false;
    const query = props.query ? props.query : null;
    const { data, currentData, isLoading, isSuccess, isError, refetch, error } = useQuery(query, { refetchOnMountOrArgChange: isRefetchOnArg });

    const locations = isSuccess ? currentData ? currentData : data : [];
    const options = [];
    locations.forEach(item => {
        options.push({
            value: item[locationType],
            label: item[locationType],
        });
    });

    const handleChange = (newValue) => {
        props.setLocation(newValue.value)
    }

    useEffect(() => {
        if (isError) {
            props.setErrorMessage(error?.data?.message);
        }
        else props.setErrorMessage('');
    }, [isError])

    const capitalLocation = locationType.charAt(0).toUpperCase() + locationType.slice(1);

    const refetchButton = isError? <button onClick={()=>refetch()}>Retry</button>: <></>;

    return (
        <div>

            <label htmlFor={locationType}>{capitalLocation}</label>
            <br />
            <Select
                id={locationType}
                placeholder={placeholderMessage}
                isLoading={isLoading ? true : false}
                loadingMessage={() => loadingMessage}
                options={options}
                onChange={newValue => handleChange(newValue)}
                autoFocus={true}
                required={true}
            />
            {refetchButton}
        </div>
    )
}

export default SelectLocation