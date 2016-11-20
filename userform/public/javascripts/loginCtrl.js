(function(angular) {
    'use strict';
    var loginApp = angular.module("loginApp", []);
    loginApp.controller('loginCtrl', function($scope, $http, $window){
        var headers = {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        $scope.login = function(user) {
            if(user) {
                $http({
                    method: 'GET',
                    headers: headers,
                    url: 'https://userregistrationapi.herokuapp.com/api/user'
                }).then(function(res) {
                    var users = res.data || [];
                    var message = "";
                    for(var i = 0; i < users.length; i++) {
                        if(users[i].Username === user.Username) {
                            if(users[i].Password === user.Password) {
                                $window.location.href = '/success';
                                return;
                            } else {
                                message = "Password is wrong!";
                            }
                        }
                    }
                    if(message === "") message = "Username is not correct!";
                    if(message !== "") $window.alert(message);
                }, function(err) {
                    console.log(err);
                    alert("Error Getting Users.");
                });
            } else {
                $window.alert("Username and Password are Empty!");
            }
        }
    });
})(window.angular);