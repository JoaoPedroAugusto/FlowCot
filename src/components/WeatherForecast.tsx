import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Thermometer, Wind, Droplets, Sunrise, Sunset, Gauge, Shield } from 'lucide-react';
import { fetchWeatherApi } from 'openmeteo';

interface WeatherData {
  current: {
    time: Date;
    temperature2m: number;
  };
  hourly: {
    time: Date[];
    temperature2m: number[];
    precipitation: number[];
    rain: number[];
    relativeHumidity2m: number[];
    windSpeed10m: number[];
    windDirection10m: number[];
    apparentTemperature: number[];
    surfacePressure: number[];
    cloudCover: number[];
    visibility: number[];
    uvIndex?: number[];
  };
  daily: {
    time: Date[];
    temperature2mMax: number[];
    temperature2mMin: number[];
    apparentTemperatureMax: number[];
    apparentTemperatureMin: number[];
    precipitationProbabilityMax: number[];
    windSpeed10mMax: number[];
    windDirection10mDominant: number[];
    sunrise: Date[];
    sunset: Date[];
    uvIndexMax: number[];
    sunshineDuration: number[];
  };
}

const WeatherForecast: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState({ latitude: -15.7801, longitude: -47.9292 }); // Brasília como padrão
  const [expandedView, setExpandedView] = useState<boolean>(false);

  useEffect(() => {
    // Tenta obter a localização do usuário
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        () => {
          // Em caso de erro, mantém a localização padrão
          console.log("Usando localização padrão");
        }
      );
    }
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const params = {
          latitude: location.latitude,
          longitude: location.longitude,
          hourly: [
            "temperature_2m", 
            "precipitation", 
            "rain", 
            "relative_humidity_2m", 
            "wind_speed_10m", 
            "wind_direction_10m", 
            "apparent_temperature", 
            "surface_pressure", 
            "cloud_cover", 
            "visibility"
          ],
          daily: [
            "precipitation_probability_max", 
            "wind_speed_10m_max", 
            "wind_direction_10m_dominant", 
            "temperature_2m_max", 
            "temperature_2m_min", 
            "apparent_temperature_max", 
            "apparent_temperature_min", 
            "sunrise", 
            "sunset", 
            "sunshine_duration", 
            "uv_index_max"
          ],
          current: ["temperature_2m"]
        };
        
        const url = "https://api.open-meteo.com/v1/forecast";
        const responses = await fetchWeatherApi(url, params);
        
        // Processa a primeira localização
        const response = responses[0];
        
        // Atributos para timezone e localização
        const utcOffsetSeconds = response.utcOffsetSeconds();
        
        const current = response.current()!;
        const hourly = response.hourly()!;
        const daily = response.daily()!;
        
        const sunrise = daily.variables(7)!;
        const sunset = daily.variables(8)!;
        
        // Estrutura os dados meteorológicos
        const data: WeatherData = {
          current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            temperature2m: current.variables(0)!.value(),
          },
          hourly: {
            time: [...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())].map(
              (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
            ),
            temperature2m: hourly.variables(0)!.valuesArray()!,
            precipitation: hourly.variables(1)!.valuesArray()!,
            rain: hourly.variables(2)!.valuesArray()!,
            relativeHumidity2m: hourly.variables(3)!.valuesArray()!,
            windSpeed10m: hourly.variables(4)!.valuesArray()!,
            windDirection10m: hourly.variables(5)!.valuesArray()!,
            apparentTemperature: hourly.variables(6)!.valuesArray()!,
            surfacePressure: hourly.variables(7)!.valuesArray()!,
            cloudCover: hourly.variables(8)!.valuesArray()!,
            visibility: hourly.variables(9)!.valuesArray()!,
          },
          daily: {
            time: [...Array((Number(daily.timeEnd()) - Number(daily.time())) / daily.interval())].map(
              (_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
            ),
            precipitationProbabilityMax: daily.variables(0)!.valuesArray()!,
            windSpeed10mMax: daily.variables(1)!.valuesArray()!,
            windDirection10mDominant: daily.variables(2)!.valuesArray()!,
            temperature2mMax: daily.variables(3)!.valuesArray()!,
            temperature2mMin: daily.variables(4)!.valuesArray()!,
            apparentTemperatureMax: daily.variables(5)!.valuesArray()!,
            apparentTemperatureMin: daily.variables(6)!.valuesArray()!,
            sunrise: [...Array(sunrise.valuesInt64Length())].map(
              (_, i) => new Date((Number(sunrise.valuesInt64(i)) + utcOffsetSeconds) * 1000)
            ),
            sunset: [...Array(sunset.valuesInt64Length())].map(
              (_, i) => new Date((Number(sunset.valuesInt64(i)) + utcOffsetSeconds) * 1000)
            ),
            sunshineDuration: daily.variables(9)!.valuesArray()!,
            uvIndexMax: daily.variables(10)!.valuesArray()!,
          },
        };
        
        setWeatherData(data);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar dados meteorológicos:", err);
        setError("Não foi possível carregar os dados meteorológicos");
        setLoading(false);
      }
    };
    
    fetchWeather();
  }, [location]);

  // Verifica se vai chover nas próximas 24 horas
  const willRainToday = weatherData?.hourly.rain.slice(0, 24).some(rain => rain > 0.1);
  
  // Calcula a temperatura máxima e mínima para as próximas 24 horas
  const maxTemp = weatherData?.daily.temperature2mMax[0];
  const minTemp = weatherData?.daily.temperature2mMin[0];
  
  // Calcula a precipitação total para as próximas 24 horas
  const totalPrecipitation = weatherData?.hourly.precipitation.slice(0, 24).reduce((sum, precip) => sum + precip, 0);

  // Formata a hora atual
  const currentTime = weatherData?.current.time.toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  // Formata horários de nascer e pôr do sol
  const sunriseTime = weatherData?.daily.sunrise[0]?.toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  const sunsetTime = weatherData?.daily.sunset[0]?.toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  // Converte direção do vento de graus para pontos cardeais
  const getWindDirection = (degrees: number) => {
    const directions = ['N', 'NE', 'L', 'SE', 'S', 'SO', 'O', 'NO'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  };

  // Determina o período do dia para exibir o ícone apropriado
  const getWeatherIcon = () => {
    if (!weatherData) return <Cloud className="h-10 w-10 text-gray-400" />;
    
    const hour = weatherData.current.time.getHours();
    const isRaining = weatherData.hourly.rain[0] > 0.1;
    const cloudCover = weatherData.hourly.cloudCover[0];
    
    if (isRaining) {
      return <CloudRain className="h-10 w-10 text-blue-500" />;
    } else if (hour >= 6 && hour < 18) {
      return cloudCover > 50 ? 
        <Cloud className="h-10 w-10 text-gray-400" /> : 
        <Sun className="h-10 w-10 text-yellow-500" />;
    } else {
      return <Cloud className="h-10 w-10 text-gray-400" />;
    }
  };

  // Determina recomendações agrícolas com base nas condições meteorológicas
  const getAgriculturalRecommendation = () => {
    if (!weatherData) return '';
    
    const isRaining = willRainToday;
    const windSpeed = weatherData.hourly.windSpeed10m[0];
    const humidity = weatherData.hourly.relativeHumidity2m[0];
    const uvIndex = weatherData.daily.uvIndexMax[0];
    
    if (isRaining) {
      return 'Recomendamos verificar o sistema de drenagem das plantações devido à previsão de chuva.';
    } else if (windSpeed > 20) {
      return 'Ventos fortes previstos. Considere adiar pulverizações e proteger mudas jovens.';
    } else if (humidity < 30) {
      return 'Umidade baixa. Aumente a frequência de irrigação para evitar estresse hídrico nas plantas.';
    } else if (uvIndex > 8) {
      return 'Índice UV muito alto. Proteja trabalhadores e considere sombreamento para culturas sensíveis.';
    } else {
      return 'Condições favoráveis para trabalhos no campo hoje.';
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <Thermometer className="h-5 w-5 text-gray-500 mr-2" />
          <h3 className="text-base font-medium text-gray-700">Previsão do Tempo</h3>
        </div>
        {!loading && !error && weatherData && (
          <button 
            onClick={() => setExpandedView(!expandedView)}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            {expandedView ? 'Ver menos' : 'Ver mais detalhes'}
          </button>
        )}
      </div>
      
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-gray-200 rounded-lg p-4 sm:p-5">
        {loading ? (
          <div className="flex justify-center items-center h-24">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : weatherData ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                {getWeatherIcon()}
                <div className="ml-3">
                  <p className="text-sm text-gray-500">Agora • {currentTime}</p>
                  <p className="text-2xl font-bold text-gray-800">{weatherData.current.temperature2m.toFixed(1)}°C</p>
                  <p className="text-sm text-gray-600">
                    Sensação: {weatherData.hourly.apparentTemperature[0].toFixed(1)}°C
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Máx/Mín</p>
                <p className="text-lg font-semibold text-gray-800">
                  {maxTemp?.toFixed(1)}°/{minTemp?.toFixed(1)}°
                </p>
                <p className="text-xs text-gray-500">
                  Sensação: {weatherData.daily.apparentTemperatureMax[0].toFixed(1)}°/{weatherData.daily.apparentTemperatureMin[0].toFixed(1)}°
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-white bg-opacity-70 rounded-lg p-3">
                <div className="flex items-center mb-1">
                  <CloudRain className="h-4 w-4 text-blue-500 mr-1" />
                  <p className="text-sm text-gray-500">Precipitação</p>
                </div>
                <p className="text-lg font-semibold text-gray-800">
                  {totalPrecipitation?.toFixed(1)} mm
                </p>
                <p className="text-xs text-gray-500">
                  Prob: {weatherData.daily.precipitationProbabilityMax[0]}%
                </p>
              </div>
              <div className="bg-white bg-opacity-70 rounded-lg p-3">
                <div className="flex items-center mb-1">
                  <Wind className="h-4 w-4 text-gray-500 mr-1" />
                  <p className="text-sm text-gray-500">Vento</p>
                </div>
                <p className="text-lg font-semibold text-gray-800">
                  {weatherData.hourly.windSpeed10m[0].toFixed(1)} km/h
                </p>
                <p className="text-xs text-gray-500">
                  Direção: {getWindDirection(weatherData.hourly.windDirection10m[0])}
                </p>
              </div>
            </div>
            
            {expandedView && (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  <div className="bg-white bg-opacity-70 rounded-lg p-3">
                    <div className="flex items-center mb-1">
                      <Droplets className="h-4 w-4 text-blue-400 mr-1" />
                      <p className="text-xs text-gray-500">Umidade</p>
                    </div>
                    <p className="text-base font-semibold text-gray-800">
                      {weatherData.hourly.relativeHumidity2m[0].toFixed(0)}%
                    </p>
                  </div>
                  
                  <div className="bg-white bg-opacity-70 rounded-lg p-3">
                    <div className="flex items-center mb-1">
                      <Gauge className="h-4 w-4 text-gray-500 mr-1" />
                      <p className="text-xs text-gray-500">Pressão</p>
                    </div>
                    <p className="text-base font-semibold text-gray-800">
                      {(weatherData.hourly.surfacePressure[0] / 10).toFixed(0)} kPa
                    </p>
                  </div>
                  
                  <div className="bg-white bg-opacity-70 rounded-lg p-3">
                    <div className="flex items-center mb-1">
                      <Shield className="h-4 w-4 text-orange-400 mr-1" />
                      <p className="text-xs text-gray-500">Índice UV</p>
                    </div>
                    <p className="text-base font-semibold text-gray-800">
                      {weatherData.daily.uvIndexMax[0].toFixed(0)}
                    </p>
                  </div>
                  
                  <div className="bg-white bg-opacity-70 rounded-lg p-3">
                    <div className="flex items-center mb-1">
                      <Cloud className="h-4 w-4 text-gray-400 mr-1" />
                      <p className="text-xs text-gray-500">Nuvens</p>
                    </div>
                    <p className="text-base font-semibold text-gray-800">
                      {weatherData.hourly.cloudCover[0].toFixed(0)}%
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white bg-opacity-70 rounded-lg p-3">
                    <div className="flex items-center mb-1">
                      <Sunrise className="h-4 w-4 text-amber-500 mr-1" />
                      <p className="text-xs text-gray-500">Nascer do Sol</p>
                    </div>
                    <p className="text-base font-semibold text-gray-800">{sunriseTime}</p>
                  </div>
                  
                  <div className="bg-white bg-opacity-70 rounded-lg p-3">
                    <div className="flex items-center mb-1">
                      <Sunset className="h-4 w-4 text-orange-500 mr-1" />
                      <p className="text-xs text-gray-500">Pôr do Sol</p>
                    </div>
                    <p className="text-base font-semibold text-gray-800">{sunsetTime}</p>
                  </div>
                </div>
                
                <div className="bg-white bg-opacity-70 rounded-lg p-3 mb-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">Previsão para os próximos dias</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[0, 1, 2].map((dayIndex) => (
                      <div key={dayIndex} className="text-center">
                        <p className="text-xs text-gray-500">
                          {weatherData.daily.time[dayIndex].toLocaleDateString('pt-BR', { weekday: 'short' })}
                        </p>
                        <p className="text-sm font-medium">
                          {weatherData.daily.temperature2mMax[dayIndex].toFixed(0)}°/
                          {weatherData.daily.temperature2mMin[dayIndex].toFixed(0)}°
                        </p>
                        <p className="text-xs text-gray-500">
                          {weatherData.daily.precipitationProbabilityMax[dayIndex]}% chuva
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
            
            <div className="mt-3 text-sm text-gray-600">
              <p>{getAgriculturalRecommendation()}</p>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default WeatherForecast;
