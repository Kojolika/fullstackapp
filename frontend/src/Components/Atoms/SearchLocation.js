import { useGetWorldDataQuery } from "../../Features/locations/locationApiSlice";

const SearchLocation = () => {

    const { data: worldData, isLoading: isLoadingWorldData, isSuccess: isSuccessWorldData } = useGetWorldDataQuery();
    return (
        <input id="location-search" type="text"></input>
    )
}

export default SearchLocation