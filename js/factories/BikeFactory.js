/* eslint no-undef: "off" */
angular.module('urbykeApp')

.factory('BikeFactory', function($http) {

    function getBikeStations() {
        var url = 'http://api.citybik.es/v2/networks/bicing'
        
        
        function getResults(response) {
          return response.data.network.stations
        }

        function getStations(stations) {
            console.log(stations)
                return stations.map(function(elem) {
                  var stationsInfo = {
                        id: elem.id,
                        name: elem.name,
                        bikes: elem.free_bikes,
                        slots: elem.empty_slots,
                        latitude: elem.latitude,
                        longitude: elem.longitude
                    }
                    return stationsInfo
                })

        }

        return $http.get(url)
            .then(getResults)
            .then(getStations) 
    }


    function getStationDetails( idStation ) {
        console.log('hola')
        return getBikeStations()
            .then(function(stations) {
                console.log(stations)
                return stations.filter( function(station){
                    console.log(station)
                    return station.id === idStation;
                })

            })
    }

    return {
        getBikeStations: getBikeStations,
        getStationDetails: getStationDetails
    }
})
