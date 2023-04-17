import { Sunny, 
    BrokenImg, 
    MostlyCloudy, 
    Cloudy, 
    Showers, 
    PartialSunnyShowers, 
    ThunderStorms, 
    PartialSunnyThunderStorms, 
    Rain,
    Flurries,
    PartialSunnyFlurries,
    Snow,
    MostlyCloudySnow,
    Sleet,
    Ice,
    FreezingRain,
    RainAndSnow,
    Cold,
    Hot,
    Windy,
    Clear,
    MostlyCloudyNight,
    HazyMoonlight,
    PartialCloudyShowersNight,
    PartialCloudyThunderStormsNight,
    MostlyCloudyFlurriesNight,
    MostlyCloudySnowNight,
    Fog,
    HazySunshine} from "../../Icons/svgImages/Weather Icons/index";


const WeatherIcon = (props) => {

    const id = props.id;

    const iconReference = {
        1: <Sunny height={props.height} width={props.width}/>,
        2: <Sunny height={props.height} width={props.width}/>,
        3: <Sunny height={props.height} width={props.width}/>,
        4: <Sunny height={props.height} width={props.width}/>,
        5: <HazySunshine height={props.height} width={props.width}/>,
        6: <MostlyCloudy height={props.height} width={props.width}/>,
        7: <Cloudy height={props.height} width={props.width}/>,
        8: <Cloudy height={props.height} width={props.width}/>,
        11: <Fog height={props.height} width={props.width}/>,
        12: <Showers height={props.height} width={props.width}/>,
        13: <PartialSunnyShowers height={props.height} width={props.width}/>,
        14: <PartialSunnyShowers height={props.height} width={props.width}/>,
        15: <ThunderStorms height={props.height} width={props.width}/>,
        16: <PartialSunnyThunderStorms height={props.height} width={props.width}/>,
        17: <PartialSunnyThunderStorms height={props.height} width={props.width}/>,
        18: <Rain height={props.height} width={props.width}/>,
        19: <Flurries height={props.height} width={props.width}/>,
        20: <PartialSunnyFlurries height={props.height} width={props.width}/>,
        21: <PartialSunnyFlurries height={props.height} width={props.width}/>,
        22: <Snow height={props.height} width={props.width}/>,
        23: <MostlyCloudySnow height={props.height} width={props.width}/>,
        24: <Ice height={props.height} width={props.width}/>,
        25: <Sleet height={props.height} width={props.width}/>,
        26: <FreezingRain height={props.height} width={props.width}/>,
        29: <RainAndSnow height={props.height} width={props.width}/>,
        30: <Hot height={props.height} width={props.width}/>,
        31: <Cold height={props.height} width={props.width}/>,
        32: <Windy height={props.height} width={props.width}/>,
        33: <Clear height={props.height} width={props.width}/>,
        34: <Clear height={props.height} width={props.width}/>,
        35: <MostlyCloudyNight height={props.height} width={props.width}/>,
        36: <MostlyCloudyNight height={props.height} width={props.width}/>,
        37: <HazyMoonlight height={props.height} width={props.width}/>,
        38: <MostlyCloudyNight height={props.height} width={props.width}/>,
        39: <PartialCloudyShowersNight height={props.height} width={props.width}/>,
        40: <PartialCloudyShowersNight height={props.height} width={props.width}/>,
        41: <PartialCloudyThunderStormsNight height={props.height} width={props.width}/>,
        42: <PartialCloudyThunderStormsNight height={props.height} width={props.width}/>,
        43: <MostlyCloudyFlurriesNight height={props.height} width={props.width}/>,
        44: <MostlyCloudySnowNight height={props.height} width={props.width}/>     
    }

    const icon = iconReference[id] === undefined || id === undefined? <BrokenImg height={props.height} width={props.width} />: iconReference[id];
    
    return icon;
}
export default WeatherIcon