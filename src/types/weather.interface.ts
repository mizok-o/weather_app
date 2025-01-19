export interface DailyWeather {
	time: string;
	values: {
		humidityAvg: number;
		precipitationProbabilityAvg: number;
		rainAccumulationAvg: number;
		temperatureAvg: number;
		temperatureMax: number;
		temperatureMin: number;
		temperatureApparentAvg: number;
		windSpeedAvg: number;
		weatherCodeMax: number;
		cloudCoverAvg: number;
	};
}

export interface WeatherApiResponse {
	timelines: {
		daily: DailyWeather[];
	};
}
