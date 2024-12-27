export interface IWeatherCondition {
    icon: string;
    code: number;
    description: string;
}

export interface IObservation {
    sunrise: string;
    sunset: string;
    timezone: string;
    city_name: string; 
    country_code: string; 
    wind_spd: number;
    gust: number;
    wind_dir: number;
    temp: number;
    app_temp: number;
    rh: number;
    clouds: number;
    pod: string;
    weather: IWeatherCondition;
    vis: number;
    snow: number;
    uv: number;
}

export interface IWeather {
    data: IObservation[];
}
