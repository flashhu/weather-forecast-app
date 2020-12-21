// export const API_SERVER = 'http://localhost:8090/v1'
export const API_SERVER = 'http://www.flashhu.site:8090/v1'

// token
export const API_USER_LOGIN = API_SERVER + '/token';

// user
export const API_USER_TOKEN_LOGIN = API_SERVER + '/user/info';

// setting
export const API_USER_SETTING = API_SERVER + '/user/setting';

// weather 
// export const API_NOW = '/apiWeather/weather/now';
// export const API_CITY_CODE = '/apiCityCode/city/lookup';
// export const API_FORCAST = '/apiWeather/weather/3d';
// export const API_HISTORY = '/apiHistory/historical/weather';
export const API_NOW = 'https://devapi.qweather.com/v7/weather/now';
export const API_CITY_CODE = 'https://geoapi.qweather.com/v2/city/lookup';
export const API_FORCAST = 'https://devapi.qweather.com/v7/weather/3d';
export const API_HISTORY = 'https://api.qweather.com/v7/historical/weather';

// 城市图片
export const API_CITY_IMAGE = 'https://api.unsplash.com/search/photos';

// 每日一图
// export const API_HP_IMAGE = '/apiPic/HPImageArchive.aspx?format=js&idx=0&n=5&mkt=zh-CN';
export const API_HP_IMAGE = 'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=5&mkt=zh-CN';
