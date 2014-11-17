$(document).ready(function(){

	//on load call teams data
	teamsData();

	//when click a team hide the groups_canvas
	$(".team").on("click", function(){
		$(".groups_canvas").hide(1200);
		//get the team clicked on id from data
		var teamId = $(this).data("team-id");
		//logs team id
		// console.log(teamId);
		//new ajax call which takes the team id a url param
		playersData(teamId);
	})

})

//function to make ajax call to get teams objects
function teamsData(){
	//var for url containing all teams
	var teamsDataUrl = "http://worldcup.kimonolabs.com/api/teams?sort=group&fields=name,logo,group,id&apikey=G2zsU3S6EO93SDps2ambg5h79WJ5qhoi"
	
	$.getJSON(teamsDataUrl)

		.done(function(teams_objects){
			//returns array of team objects
			// console.log(teams_objects);

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

//function to make ajax call to get squad data for team clicked
function playersData(teamId){
	//logs team id
	console.log(teamId);
	//var for url to get all players for specific team
	var playersDataUrl = "http://worldcup.kimonolabs.com/api/players?sort=position&fields=firstName,lastName,nickname,age,position,image,heightCm,weightKg,clubId,id&teamId=" + teamId +"&apikey=G2zsU3S6EO93SDps2ambg5h79WJ5qhoi"

	$.getJSON(playersDataUrl)

		.done(function(players_objects){
			//returns array of players objects
			console.log(players_objects);
		});//end of .done function for players data

}//end of players data function
