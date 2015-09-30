var url = '';

var nameList = [];

angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, $cordovaVibration, $ionicPopup, $timeout, $ionicHistory, $state, $stateParams, ClinicNameService, AllClinicsService, URLService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.clinicData = {};
  $scope.updatedClinic = "";

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/create.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.init = function(){
    console.log("something!!!");
    url = URLService.getURL();
  }

  $scope.test= function(){
    return nameList;
  }

  $scope.prefixList = function(query){
    result = [];
    //result.push();
    console.log(query);
    for(i in nameList){
      name = nameList[i].toLowerCase();
      if(query.length>name.length){
        continue;
      }
      else{
        if(query.toLowerCase() == name.slice(0, query.length)){
          result.push(nameList[i]);
        }
      }
    }
    return result.sort();
  }

  $scope.searchInit = function(){
    var card = document.getElementById("card");
    card.style.display = "None";
    $http.get(url+'queryall').
      then(function(response) {

        if(response) {
          data = response.data;
          if("error" in data){
            alert(data.error);
          }
          else{
            AllClinicsService.clinics = data;
            for(i in data){
              nameList.push(data[i].name);
            }
          }

        } else {
          alert('no data');
        }
    }, function(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log("error");
    });
  }

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  $scope.searchCardOnHold = function(){
     $cordovaVibration.vibrate(100);
     this.deleteConfirm();
  }

  // Open the login modal
  $scope.create = function() {
    $scope.modal.show();
  };

  $scope.goToUpdate = function(){
    console.log("go to update!");
    var cname = document.getElementById("searchbar").value;
    ClinicNameService.clinicName = cname;
    $state.go("app.update");
  }

  $scope.backToSearch = function(){
    $ionicHistory.goBack();
  }

  // Perform the login action when the user submits the login form
  $scope.doCreate = function() {
    console.log('Doing login', $scope.clinicData);
    $http.post(url+'createClinic', $scope.clinicData).success(function(data) {
      if(data) {
        if("error" in data){
          alert(data.error);
        }
        deferred.resolve(data);
      } else {
          deferred.reject(data);
      }
    }).error(function(error) {
        deferred.reject(error);
    });

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $scope.search = function(form){
    $http.post(url+'searchClinic', form).success(function(data) {
      if(data) {
        if("error" in data){
          alert(data.error);
        }
        else{
          var card = document.getElementById("card");
          card.style.display = "block";
          var header = document.getElementById("cardheader");
          var address1 = document.getElementById("address1");
          var address2 = document.getElementById("address2");
          var estate = document.getElementById("estate");
          var telephone = document.getElementById("telephone");
          var footer = document.getElementById("cardfooter");
          header.innerHTML = data.name
          footer.innerHTML = data.id
          address1.innerHTML = data.address_1
          address2.innerHTML = data.address_2
          estate.innerHTML = data.estate
          telephone.innerHTML = data.telephone
        }

        deferred.resolve(data);
      } else {
          deferred.reject(data);
      }
    }).error(function(error) {
        deferred.reject(error);
    });
  }

  $scope.update = function(form){
    form.name = ClinicNameService.getClinicName();
    $http.post(url+'updateClinic', form).success(function(data) {
      if(data) {
        if("error" in data){
          alert(data.error);
        }
        else{
          var p = document.getElementById('name');
          p.innerHTML = data.name + " " + "updated!";
        }
        deferred.resolve(data);
      } else {
          deferred.reject(data);
      }
    }).error(function(error) {
        deferred.reject(error);
    });
    $ionicHistory.goBack();
  }


  $scope.deleteConfirm = function() {
   var confirmPopup = $ionicPopup.confirm({
      title: 'Consume Ice Cream',
      template: 'Are you sure you want to eat this ice cream?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        var p = document.getElementById('cardheader');
        // p.innerHTML works
        var clinic = {};
        clinic["name"] = p.innerHTML;
        $http.post(url+'deleteClinic', clinic).success(function(data) {
          if(data) {
            if("error" in data){
              alert(data.error);
            }
            else{
              var card = document.getElementById('card');
              var header = document.getElementById("cardheader");
              var address1 = document.getElementById("address1");
              var address2 = document.getElementById("address2");
              var estate = document.getElementById("estate");
              var telephone = document.getElementById("telephone");
              var footer = document.getElementById("cardfooter");
              header.innerHTML = "";
              footer.innerHTML = "";
              address1.innerHTML = "";
              address2.innerHTML = "";
              estate.innerHTML = "";
              telephone.innerHTML = "";
              card.style.display = "None";

              var searchBar = document.getElementById('searchbar');
              searchBar.value = "";
            }

            deferred.resolve(data);
          } else {
              deferred.reject(data);
          }
        }).error(function(error) {
            deferred.reject(error);
        });

     }
     else {
        // not deleting
        console.log('Clinic not deleted');
     }
    });
  };

  // init update with params
  $scope.initUpdate = function(){
    var clinicName = document.getElementById('clinicname');
    var nameInput = document.getElementById('nameinput');
    clinicName.innerHTML = ClinicNameService.getClinicName();
    nameInput.value = ClinicNameService.getClinicName();
  }

})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('DeleteCtrl', function($scope, $stateParams, $http){
  $scope.init = function(){
    console.log("delete init!");
  }

  $scope.deleteClinic = function(form){
    console.log('delete clinic!');
    console.log(form.name);
    $http.post(url+'deleteClinic', form).success(function(data) {
      if(data) {
        if("error" in data){
          alert(data.error);
        }
        else{
          var p = document.getElementById('info');
          var success = document.getElementById('success');
          p.innerHTML = data.id
          success.innerHTML = data.name + " " + "deleted!"
        }

        deferred.resolve(data);
      } else {
          deferred.reject(data);
      }
    }).error(function(error) {
        deferred.reject(error);
    });
  }
});
