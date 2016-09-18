var module = angular.module('todo', ['ngResource']);

module
.factory('wunderlistFactory', ['$http', 'wunderlistSearchDataService', function ($http, wunderlistSearchDataService) {

        var wunderlistFactory = {};

        wunderlistFactory.getListById = function (_params) {
            var searchData = wunderlistSearchDataService.getNew("listSearchById", _params);
            return $http({
                method: 'GET',
                url: searchData.url,
                params: searchData.object,
            });
        };

        return wunderlistFactory;
    }])
    .service('wunderlistSearchDataService', function () {
        this.getApiBaseUrl = function (_params) {
            return "http://a.wunderlist.com/api/v1/";
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

            var wunderlistSearchData = {
                object: {
                    appid: _params.appid,
                },
                url: "",
            };

            switch (_type) {
                case "listSearchById":
                    wunderlistSearchData = this.fillDataInObjectByList(wunderlistSearchData, _params, [
                        'q', 'lang', 'type', "client_id", 'access_token', 'list_id'
                    ]);
                    wunderlistSearchData.url = this.getApiBaseUrl() + 'tasks';
                    break;
            }
            return wunderlistSearchData;
        };
    })
.controller('ToDoCtrl', function($scope, $interval, wunderlistFactory, wunderlistSearchDataService) {
  $scope.listInfo = 'testing';

  // https://www.wunderlist.com/oauth/authorize?client_id=6591b0b301be1d4739f6&redirect_uri=http://dashboard.aroscoe.com&state=RANDOM
  // var _appid = "b807823360d8c1ec92d00ed82356178d";
  var getList = function(){
    wunderlistFactory.getListById({
      client_id: "6591b0b301be1d4739f6",
      access_token: "5fe7dda773b707876df33258d35147f24cd0d940ade2aedc2189f289efe5",
      list_id: "266875478"
    }).then(function(_data){
      //on success
      // console.log('todo: ' + _data.data);
      $scope.listInfo = _data.data;
    }).catch(function (_data) {
      //on error
      // console.log('todo error: ' + _data.data);
      $scope.listInfo = _data.data;
    });

  }
  
  getList();
  $interval(getList, 900000); // 15 min
  // $interval(getList, 60000); // min
});