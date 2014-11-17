$(document).ready(function(){

	//on load call teams data
	teamsData();

	//when click a team hide the groups_canvas
	$(".group").on("click", function(){
		$(".groups_canvas").hide(1200);
	})

})

//function to make ajax call to get teams objects
function teamsData(){
	//var for url containing all teams
	var teamsDataUrl = "http://worldcup.kimonolabs.com/api/teams?sort=group&fields=name,logo,group,id&apikey=G2zsU3S6EO93SDps2ambg5h79WJ5qhoi"
	
	$.getJSON(teamsDataUrl)

		.done(function(teams_objects){
			//returns array of objects
			console.log(teams_objects);

			//itterates through all the objects in array returned,
			//and for each carries out a function
			$.each(teams_objects, function(index, team){
				//finds the li corresponding with the id
				var teamPlace = $("#t-" + index);
				//Adds team name to the paragraph in the li
				teamPlace.find(".teamname").html(team.name);
				//Adds team logo to img in the li
				teamPlace.find(".team_Logo").attr("src", team.logo);
				//Adds the teamId to the data attr - will use for next ajax call
				teamPlace.attr("data-team-id", team.id);

			})//end of first .each function
		});//end of .done function


}//end of teamsData function

