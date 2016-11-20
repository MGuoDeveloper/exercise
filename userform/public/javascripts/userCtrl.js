(function(angular) {
    'use strict';
    var app = angular.module("app", []);
    var compareTo = function() {
        return {
            require: "ngModel",
            scope: {
                otherModelValue: "=compareTo"
            },
            link: function(scope, element, attributes, ngModel) {
                ngModel.$validators.compareTo = function(modelValue) {
                    return modelValue == scope.otherModelValue;
                };
                scope.$watch("otherModelValue", function() {
                    ngModel.$validate();
                });
            }
        };
    };
    app.directive("compareTo", compareTo);
    app.controller('userCtrl', function($scope, $http, $window){
        $scope.test = "Meng Guo";
        $scope.edit = true;
        $scope.invalidUsername = false;
        var headers = {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        $scope.submit = function(user){
            console.log(user);
            $http({
                 method: 'POST',
                 headers: headers,
                 url: 'https://userregistrationapi.herokuapp.com/api/user',
                 data: user
            }).then(function(data) {
                 $window.location.href = '/success';
            }, function(err) {
                 console.log(err);
                 alert("Error creating User.");
            });
        };

        $scope.check = function(username) {
            if(username){
                $http({
                    method: 'GET',
                    headers: headers,
                    url: 'https://userregistrationapi.herokuapp.com/api/user'
                }).then(function(res) {
                    var users = res.data || [];
                    $scope.invalidUsername = false;
                    for(var i = 0; i < users.length; i++) {
                        if(users[i].Username === username) {
                            $scope.invalidUsername = true;
                        }
                    }
                }, function(err) {
                    console.log(err);
                    alert("Error Getting Users.");
                });
            }
        };

        $scope.nextStep = function(){
            $scope.edit = false;
        };

        $scope.preStep = function(){
            $scope.edit = true;
        };
    });
})(window.angular);


