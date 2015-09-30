angular.module('starter.services', [])

.service('ClinicNameService', function(){
	// clinic name for updating the clinic information
	// and when the
	return{
		clinicName : 'clinic name!!!!',
		getClinicName: function(){
			return this.clinicName;
		}
	}

})

.service('AllClinicsService', function(){
	return{
		clinics: [],
		test : "tested!",
		getClinics : function(){
			return this.clinics;
		},
		getPrefix : function(prefix){
			return [];
		}
	}

})

.service('URLService', function(){
	return{
		url: 'http://10.10.2.226:5000/',
		getURL : function(){
			return this.url;
		}
	}

})
