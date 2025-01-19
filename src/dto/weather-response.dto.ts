import { Exclude, Expose } from "class-transformer";

@Exclude()
export class WeatherResponseDto {
	// 平均気温
	@Expose()
	temperatureAvg: number;

	// 最大気温
	@Expose()
	temperatureMax: number;

	// 最小気温
	@Expose()
	temperatureMin: number;

	// 平均体感温度
	@Expose()
	temperatureApparentAvg: number;

	// 平均降水確率
	@Expose()
	precipitationProbabilityAvg: number;

	// 平均降水量
	@Expose()
	rainAccumulationAvg: number;

	// 平均湿度
	@Expose()
	humidityAvg: number;

	// 平均風速
	@Expose()
	windSpeedAvg: number;

	// 平均雲カバー率
	@Expose()
	cloudCoverAvg: number;
}
