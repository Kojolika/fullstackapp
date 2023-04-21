const formatLocation = (location) =>{
    const id = location?.id;
    const cityName = location?.city?.name ? location.city.name : location?.city;
    const provinceName = location?.province?.name ? location.province.name : location?.province;
    const stateCode = location?.province?.state_code ? location.province.state_code : location?.state_code;
    const countryName = location?.country?.name ? location.country.name : location?.country;
    const iso2 = location?.country?.iso2 ? location.country.iso2 : location?.iso2;
    const longitude = location?.longitude;
    const latitude = location?.latitude;

    return {
        "id": id,
        "city": {
            "name": cityName,
        },
        "province":{
            "name": provinceName,
            "state_code": stateCode
        },
        "country":{
            "name": countryName,
            "iso2": iso2
        },
        "longitude": longitude,
        "latitude": latitude
    }
}

export default formatLocation