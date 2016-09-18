var module = angular.module('weather', ['ngResource', 'angularMoment']);

module
// .config(['$httpProvider', function($httpProvider) {
//         $httpProvider.defaults.useXDomain = true;
//         delete $httpProvider.defaults.headers.common['X-Requested-With'];
//     }
// ])
// .factory('WeatherFactory', function($resource) {
//   return $resource('//api.openweathermap.org/data/2.5/forecast?q=Philadelphia,us&APPID=b807823360d8c1ec92d00ed82356178d', {},{
//     get: {method:'GET', isArray: false}
//   });
// })
// .service('openweathermapDataService', function () {
//   this.fillDataInObjectByList = function (_object, _params, _list) {
//     angular.forEach(_list, function (value, key) {
//       if (angular.isDefined(_params[value])) {
//         _object.object[value] = _params[value];
//       }
//     });
//     return _object;
//   };

//   return openweathermapData;
// })
.filter('weatherIcons', function($filter){
  var icons =  [
  { id: 200, description: "thunderstorm with light rain ", icon: "wi-storm-showers" },
  { id: 201, description: "thunderstorm with rain ", icon: "wi-storm-showers" },
  { id: 202, description: "thunderstorm with heavy rain ", icon: "wi-storm-showers" },
  { id: 210, description: "light thunderstorm ", icon: "wi-storm-showers" },
  { id: 211, description: "thunderstorm ", icon: "wi-storm-showers" },
  { id: 212, description: "heavy thunderstorm ", icon: "wi-storm-showers" },
  { id: 221, description: "agged thunderstorm ", icon: "wi-storm-showers" },
  { id: 230, description: "thunderstorm with light drizzle", icon: "wi-storm-showers" },
  { id: 231, description: "thunderstorm with drizzle", icon: "wi-storm-showers" },
  { id: 232, description: "thunderstorm with heavy drizzle", icon: "wi-storm-showers" },
  { id: 300, description: "light intensity drizzle", icon: "wi-sprinkle" },
  { id: 301, description: "drizzle", icon: "wi-sprinkle" },
  { id: 302, description: "heavy intensity drizzle", icon: "wi-sprinkle" },
  { id: 310, description: "light intensity drizzle rain", icon: "wi-sprinkle" },
  { id: 311, description: "drizzle rain", icon: "wi-sprinkle" },
  { id: 312, description: "heavy intensity drizzle rain", icon: "wi-sprinkle" },
  { id: 313, description: "shower rain and drizzle", icon: "wi-sprinkle" },
  { id: 314, description: "heavy shower rain and drizzle", icon: "wi-sprinkle" },
  { id: 321, description: "shower drizzle", icon: "wi-sprinkle" },
  { id: 500, description: "light rain", icon: "wi-sprinkle" },
  { id: 501, description: "moderate rain", icon: "wi-sprinkle" },
  { id: 502, description: "heavy intensity rain", icon: "wi-sprinkle" },
  { id: 503, description: "very heavy rain", icon: "wi-sprinkle" },
  { id: 504, description: "extreme rain", icon: "wi-sprinkle" },
  { id: 511, description: "freezing rain", icon: "wi-sleet" },
  { id: 520, description: "light intensity shower rain", icon: "wi-sprinkle" },
  { id: 521, description: "shower rain", icon: "wi-sprinkle" },
  { id: 522, description: "heavy intensity shower rain", icon: "wi-sprinkle" },
  { id: 531, description: "ragged shower rain", icon: "wi-sprinkle" },
  { id: 600, description: "light snow", icon: "wi-snowflake-cold" },
  { id: 601, description: "snow", icon: "wi-snowflake-cold" },
  { id: 602, description: "heavy snow", icon: "wi-snowflake-cold" },
  { id: 611, description: "sleet", icon: "wi-snowflake-cold" },
  { id: 612, description: "shower sleet", icon: "wi-snowflake-cold" },
  { id: 615, description: "light rain & snow", icon: "wi-snowflake-cold" },
  { id: 616, description: "rain and snow", icon: "wi-snowflake-cold" },
  { id: 620, description: "light shower snow", icon: "wi-snowflake-cold" },
  { id: 621, description: "shower snow", icon: "wi-snowflake-cold" },
  { id: 622, description: "heavy shower snow", icon: "wi-snowflake-cold" },
  { id: 701, description: "mist", icon: "wi-cloudy-gusts" },
  { id: 711, description: "smoke", icon: "wi-cloudy-gusts" },
  { id: 721, description: "haze", icon: "wi-cloudy-gusts" },
  { id: 731, description: "sand, dust whirls", icon: "wi-cloudy-gusts" },
  { id: 741, description: "fog", icon: "wi-cloudy-gusts" },
  { id: 751, description: "sand", icon: "wi-cloudy-gusts" },
  { id: 761, description: "dust", icon: "wi-cloudy-gusts" },
  { id: 762, description: "volcanic ash", icon: "wi-cloudy-gusts" },
  { id: 771, description: "squalls", icon: "wi-cloudy-gusts" },
  { id: 781, description: "tornado", icon: "wi-cloudy-gusts" },
  { id: 800, description: "clear sky", icon: "wi-day-sunny" },
  { id: 801, description: "few clouds", icon: "wi-cloud" },
  { id: 802, description: "scattered clouds", icon: "wi-cloud" },
  { id: 803, description: "broken clouds", icon: "wi-cloud" },
  { id: 804, description: "Overcast Clouds", icon: "wi-cloud" },
  { id: 900, description: "tornado", icon: "wi-tornado" },
  { id: 901, description: "tropical storm", icon: "" },
  { id: 902, description: "hurricane", icon: "wi-hurricane" },
  { id: 903, description: "cold", icon: "wi-snowflake-cold" },
  { id: 904, description: "hot", icon: "wi-thermometer" },
  { id: 905, description: "windy", icon: "wi-strong-wind" },
  { id: 906, description: "hail", icon: "wi-hail" },
  { id: 951, description: "calm", icon: "" },
  { id: 952, description: "light breeze", icon: "wi-cloudy-windy" },
  { id: 953, description: "gentle breeze", icon: "wi-cloudy-windy" },
  { id: 954, description: "moderate breeze", icon: "wi-cloudy-windy" },
  { id: 955, description: "fresh breeze", icon: "wi-cloudy-windy" },
  { id: 956, description: "strong breeze", icon: "wi-cloudy-gusts" },
  { id: 957, description: "high wind, near gale", icon: "wi-cloudy-gusts" },
  { id: 958, description: "gale", icon: "wi-gale-warning" },
  { id: 959, description: "severe gale", icon: "wi-gale-warning" },
  { id: 960, description: "storm", icon: "wi-thunderstorm" },
  { id: 961, description: "violent storm", icon: "wi-thunderstorm" },
  { id: 962, description: "hurricane", icon: "wi-hurricane" }
  ];

  return function(input) {
    var object_by_id = $filter('filter')(icons, {id: input })[0];
    return object_by_id.icon;
  };
})
.factory('openweathermapFactory', ['$http', 'openweathermapSearchDataService', function ($http, openweathermapSearchDataService) {

        var openweathermapFactory = {};

        openweathermapFactory.getWeatherFromCitySearchByName = function (_params) {
            var searchData = openweathermapSearchDataService.getNew("citySearchByName", _params);
            return $http({
                method: 'GET',
                url: searchData.url,
                params: searchData.object,
            });
        };

        openweathermapFactory.getWeatherFromCityById = function (_params) {
            var searchData = openweathermapSearchDataService.getNew("cityById", _params);
            return $http({
                method: 'GET',
                url: searchData.url,
                params: searchData.object,
            });
        };

        openweathermapFactory.getWeatherFromGroupOfCitiesById = function (_params) {
            var searchData = openweathermapSearchDataService.getNew("citiesById", _params);
            return $http({
                method: 'GET',
                url: searchData.url,
                params: searchData.object,
            });
        };

        openweathermapFactory.getWeatherFromLocationByCoordinates = function (_params) {
            var searchData = openweathermapSearchDataService.getNew("locationByCoordinates", _params);
            return $http({
                method: 'GET',
                url: searchData.url,
                params: searchData.object,
            });
        };

        openweathermapFactory.getWeatherFromLocationByZipcode = function (_params) {
            var searchData = openweathermapSearchDataService.getNew("locationByZipcode", _params);
            return $http({
                method: 'GET',
                url: searchData.url,
                params: searchData.object,
            });
        };

        return openweathermapFactory;
    }])
    .service('openweathermapSearchDataService', function () {
        this.getApiBaseUrl = function (_params) {
            return "http://api.openweathermap.org/data/2.5/";
        };

        this.fillDataInObjectByList = function (_object, _params, _list) {
            angular.forEach(_list, function (value, key) {
                if (angular.isDefined(_params[value])) {
                    _object.object[value] = _params[value];
                }
            });
            return _object;
        };

        this.getNew = function (_type, _params) {

            var openweathermapSearchData = {
                object: {
                    appid: _params.appid,
                },
                url: "",
            };

            switch (_type) {
                case "citySearchByName":
                    openweathermapSearchData = this.fillDataInObjectByList(openweathermapSearchData, _params, [
                        'q', 'lang', 'type', "units", 'cnt',
                    ]);
                    openweathermapSearchData.url = this.getApiBaseUrl() + "forecast/daily";
                    break;

                case "cityById":
                    openweathermapSearchData = this.fillDataInObjectByList(openweathermapSearchData, _params, [
                        'id', 'lang', "units",
                    ]);
                    openweathermapSearchData.url = this.getApiBaseUrl() + "daily";
                    break;

                case "citiesById":
                    openweathermapSearchData = this.fillDataInObjectByList(openweathermapSearchData, _params, [
                        'id', 'lang', "units",
                    ]);
                    openweathermapSearchData.url = this.getApiBaseUrl() + "group";
                    break;

                case "locationByCoordinates":
                    openweathermapSearchData = this.fillDataInObjectByList(openweathermapSearchData, _params, [
                        'lat', 'lon', 'lang', "units",
                    ]);
                    openweathermapSearchData.url = this.getApiBaseUrl() + "daily";
                    break;

                case "locationByZipcode":
                    openweathermapSearchData = this.fillDataInObjectByList(openweathermapSearchData, _params, [
                        'zip', 'lang', "units",
                    ]);
                    openweathermapSearchData.url = this.getApiBaseUrl() + "daily";
                    break;
            }
            return openweathermapSearchData;
        };
    })
.controller('WeatherCtrl', function($scope, $interval, openweathermapFactory, openweathermapSearchDataService) {
  // $scope.weatherInfo = WeatherFactory.get();

  var _appid = "b807823360d8c1ec92d00ed82356178d";
  var getWeather = function(){
    openweathermapFactory.getWeatherFromCitySearchByName({
      q:"Philadelphia", //city name and country code divided by comma, use ISO 3166 country codes eg "London,uk"
      //lang:"<LANGUAGE>", // (optional) http://openweathermap.org/current#multi
      units:"imperial", // (optinal) http://openweathermap.org/current#data
      //type:"<TYPE>", // (optional) 'like' = close result, 'accurate' = accurate result
      cnt: "7",
      appid:_appid
    }).then(function(_data){
      //on success
      $scope.weatherInfo = _data.data;
    }).catch(function (_data) {
      //on error
      $scope.weatherInfo = _data.data;
    });

  }
  
  getWeather();
  $interval(getWeather, 3600000);
});