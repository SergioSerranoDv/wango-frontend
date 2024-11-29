import { fetchWeatherApi } from "openmeteo";

export const calculateEt0andETc = async (latitude: number, longitude: number) => {
  console.log("Calculating ET0 and ETc...", latitude, longitude);
  const params = {
    latitude: latitude,
    longitude: longitude,
    hourly: ["evapotranspiration", "et0_fao_evapotranspiration"],
    timezone: "auto",
    forecast_days: 1,
  };
  const url = "https://api.open-meteo.com/v1/forecast";

  const weatherResponse = await fetchWeatherApi(url, params);

  const weatherData = weatherResponse[0].hourly()!;
  const et0Array = weatherData.variables(1)!.valuesArray()!;
  const etcArray = weatherData.variables(0)!.valuesArray()!;

  // Calcular la suma de los valores de ET0 y ETc
  const et0Sum = et0Array.reduce((acc, value) => acc + Number(value), 0);
  const etcSum = etcArray.reduce((acc, value) => acc + Number(value), 0);

  // Calcular el promedio de ET0 y ETc
  //const et0Average = et0Sum / et0Array.length;
  //const etcAverage = etcSum / etcArray.length;

  // Redondear los promedios a dos decimales
  //const roundedEt0Average = et0Average.toFixed(2);
  //const roundedEtcAverage = etcAverage.toFixed(2);

  // Actualizar el estado de formData con los valores de ET0 y ETc
  return {
    eto: et0Sum.toFixed(2),
    etc: etcSum.toFixed(2),
  }; // Promedio de ET0
};
