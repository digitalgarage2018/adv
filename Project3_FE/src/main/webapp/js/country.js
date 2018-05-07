$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8070/country/2",
	type: "GET"
    }).then(function(data) {
       $('.country-id').append(data.id);
       $('.country-content').append(data.countryName);
    });
});
