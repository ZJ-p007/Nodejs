const fs = require('fs');
const request = require('request');

//读取城市天气编码文件
function readCityCode(codepath,cityName,callback){
    fs.readFile(codepath,function(err,data){
       var obj =  JSON.parse(data);
       console.log(obj[cityName]);
       callback(obj[cityName]);
    })
}

//发送编码获取天气信息
function requestWeatherCom(cityCode,callback){
    //"http://www.weather.com.cn/data/cityinfo/" + cityid + ".html"  返回json格式的天气信息
    weatherSRC = "http://www.weather.com.cn/data/cityinfo/" +cityCode+".html";
    request(weatherSRC,(err,data,callback) =>{
        if(err) throw err;
        console.log(data.body);
        saveCurrentWeather(data.body);
        callback;
    })
}

//存入当前查询后的天气信息

function saveCurrentWeather(body){
    fs.writeFile("city_currentWeather.json",body,"utf-8",(err)=>{
        console.log("save successful!");
    });
}
//测试
var codepath = "./city_weathercode_china.json";
var cityName = "九江";
readCityCode(codepath,cityName,requestWeatherCom);




//ctrl + F5 启动
