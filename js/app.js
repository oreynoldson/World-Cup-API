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

		//gets team name and logo and stores in a variable
		var teamNameVar = $(this).find(".teamname").html();
		var teamLogoVar = $(this).find(".team_Logo").attr("src");
		// console.log(teamLogoVar);
		// console.log(teamNameVar);
		
		//Sets the team name and logo on the squad page
		squadHeaderFn(teamNameVar, teamLogoVar);

	})//end of .team click function

	//function when the mouse enters the player photo div
	$(".player_img").on("click", function(){
		//get the club id from data then store as an id
		var clubId = $(this).closest(".player_div").data("club-id");
		console.log("clubId: " + clubId);
		//get the player id from 
		var playerId = $(this).closest(".player_div").data("player-id");
		console.log("playerId: " + playerId);
	})//end of on mouseenter


})//end of doc ready

//function to make ajax call to get teams objects
function teamsData(){
	//var for url containing all teams
	var teamsDataUrl = "http://worldcup.kimonolabs.com/api/teams?sort=group&fields=name,logo,group,id&apikey=G2zsU3S6EO93SDps2ambg5h79WJ5qhoi"
	
	$.getJSON(teamsDataUrl)
		//returns array of team objects
		.done(function(teams_objects){
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

			})//end of .each function for teams
		});//end of .done function
}//end of teamsData function


//function to make ajax call to get squad data for team clicked
function playersData(teamId){
	//logs team id
	console.log(teamId);
	//var for url to get all players for specific team
	var playersDataUrl = "http://worldcup.kimonolabs.com/api/players?sort=position&fields=firstName,lastName,nickname,age,position,image,heightCm,weightKg,clubId,id&teamId=" + teamId +"&apikey=G2zsU3S6EO93SDps2ambg5h79WJ5qhoi"

	$.getJSON(playersDataUrl)
		//returns array of players objects
		.done(function(players_objects){
			console.log(players_objects);

			//itterates through all players in team returned 
			$.each(players_objects, function(index, player){
				//finds div corresponding with the index no
				var playerDiv = $("#p" + index);
				//adds player name to DOM
				playerDiv.find(".player_name").html(player.nickname);
				//adds player image to DOM
				playerDiv.find(".player_img").attr("src", player.image);
				//adds club id to the data tag
				playerDiv.data("club-id", player.clubId)
				//adds the player id to the data tag
				playerDiv.data("player-id", player.id);

			})//end of each fnction for players

		});//end of .done function for players data

}//end of players data function


/*Adds team name and logo to sqad page*/
function squadHeaderFn(teamNameVar, teamLogoVar) {
	var squadHeader = $(".squad_header");
	squadHeader.find(".squad_name").html(teamNameVar);
	squadHeader.find(".squad_logo").attr("src", teamLogoVar);
}//end of squad Header function
