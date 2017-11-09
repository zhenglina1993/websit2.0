var mainApp = angular.module("mainApp", ['ngRoute']);

mainApp.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/addStudent', {
            templateUrl: 'content/ngtemp/addStudent.html',
            controller: 'AddStudentController'
        }).
        when('/viewStudents', {
            templateUrl: 'content/ngtemp/viewStudents.html',
            controller: 'ViewStudentsController'
        }).
        otherwise({
            redirectTo: '/addStudent'
        });
  }]);

mainApp.controller('AddStudentController', ["$scope", "$http", function (scope, http) {
    scope.message = "This page will be used to display add student form";
}]);

mainApp.controller('ViewStudentsController', function ($scope) {
    $scope.message = "This page will be used to display all the students";
});