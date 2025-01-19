import { Injectable } from '@nestjs/common';
import { WeatherResponseDto } from 'src/dto/weather-response.dto';
import { WeatherApiResponse } from 'src/types/weather.interface';

@Injectable()
export class WeatherService {
	// private readonly WEATHER_API_DOMAIN = "https://api.openweathermap.org/data/2.5";
	private readonly TOMORROW_API_DOMAIN = "https://api.tomorrow.io/v4/weather";
	private readonly cityName = "Yokohama shi";
	private readonly latitude = 35.465;
	private readonly lon = 139.622;
	private readonly stepFormat = "1d";
	private readonly units = "metric";
	private readonly lang = "ja";

	async getTomorrow(): Promise<WeatherResponseDto> {
		const forecastData = await this.getForecastData();
		return this.takeTomorrow(forecastData);
	}

	private getForecastData(): Promise<WeatherApiResponse> {
		const TOMORROW_URL = this.TOMORROW_API_DOMAIN + `/forecast
		?location=${this.cityName}
		&timesteps=${this.stepFormat}
		&units=${this.units}
		&lang=${this.lang}
		&apikey=${process.env.TOMORROW_API_KEY}`;

		return fetch(TOMORROW_URL)
			.then(response => response.json())
			.then(data => data)
			.catch((error) => {
				console.error("error: ", error);
			});
	}

	private takeTomorrow(response: WeatherApiResponse): WeatherResponseDto {
		const tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		const tomorrowDateString = tomorrow.toISOString().split('T')[0];

		const dailyWeather = response.timelines.daily.find((daily) => {
			const itemDate = new Date(daily.time).toISOString().split('T')[0];
			return itemDate === tomorrowDateString;
		});

		let tomorrowWeather = new WeatherResponseDto();
		tomorrowWeather.humidityAvg = dailyWeather.values.humidityAvg;
		tomorrowWeather.precipitationProbabilityAvg = dailyWeather.values.precipitationProbabilityAvg;
		tomorrowWeather.rainAccumulationAvg = dailyWeather.values.rainAccumulationAvg;
		tomorrowWeather.temperatureAvg = dailyWeather.values.temperatureAvg;
		tomorrowWeather.temperatureMax = dailyWeather.values.temperatureMax;
		tomorrowWeather.temperatureMin = dailyWeather.values.temperatureMin;
		tomorrowWeather.temperatureApparentAvg = dailyWeather.values.temperatureApparentAvg;
		tomorrowWeather.windSpeedAvg = dailyWeather.values.windSpeedAvg;
		tomorrowWeather.cloudCoverAvg = dailyWeather.values.cloudCoverAvg;

		return tomorrowWeather;
	}
}
