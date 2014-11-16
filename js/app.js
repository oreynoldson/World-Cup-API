$(document).ready(function(){
//on load call teams data
teamsData();

})

//function to make ajax call to get teams objects
function teamsData(){
	//var for url containing all teams
	var teamsDataUrl = "http://worldcup.kimonolabs.com/api/teams?sort=group&fields=name,logo,group,id&apikey=G2zsU3S6EO93SDps2ambg5h79WJ5qhoi"
	
	$.getJSON(teamsDataUrl)

		.done(function(teams_objects){
			//returns array of objects
			// console.log(teams_objects);
			$.each(teams_objects, function(index, team){
				var teamPlace = $("#g" + this.group + "t"+ index)
				//returns all team names
				console.log(this.name + index + this.group);
				//returns all objects in array
				// console.log(this);
				// $.each(this, function(property, value){
					//logs all the properties and values for each object
					// console.log(property + ": " + value);
				// })//end of second each function

			})//end of first .each function


			// var teamLi = $("#gAt1");
			// teamLi.find(".team_Logo").attr("src", data.logo)
		});//end of .done function


}//end of teamsData function

