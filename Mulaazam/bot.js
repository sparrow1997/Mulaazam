console.log('Bot is starting');
var Twit = require('twit');
var auth = require('./authentications/auth.js');
var bot = new Twit(auth);
var fs= require('fs');

function bot_post()
{
var r = Math.floor(Math.random()*100);
var p = "Success Tip" + r +" #get_Buckled_Up";
 bot.post('statuses/update',
{status  : p},
function(err,data){
		console.log(data);
	});


}

function tweet_search(tweet)
{
	bot.get('search/tweets' ,
	{q: tweet , count : 10},
	function(err,data){
		var tweeets = data.statuses;
		for (var i = 0 ;i<tweeets.length; i++)
			{
				console.log(tweeets[i].text);
			}
});			
}

function get_followers_list()
{
bot.get('followers/ids',{screen_name: 'Kage_Bushaan'},
	function(err, data)
	{
		console.log(data);
	}
	);
}

// tweet_search('Twitter');
// bot_post('My Mid Evaluation is going on right now');

function post_image(path,stat)
{

var b64content = fs.readFileSync(path, { encoding: 'base64' }); 

bot.post('media/upload', { media_data: b64content }, function (err, data, response) {

  var mediaIdStr = data.media_id_string;
  var altText = "Small flowers in a planter on a sunny balcony, blossoming.";
  var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };
 
  bot.post('media/metadata/create', meta_params, function (err, data, response) {
    if (!err) {
      // now we can reference the media and post a tweet (media will attach to the tweet) 
      var params = { status: stat, media_ids: [mediaIdStr] };
 
      bot.post('statuses/update', params, function (err, data, response) {
        console.log(data);
      });
    }
  });
});


}



// setInterval(bot_post,1000*20)

function go_live(follow_reply , tweet_reply)
{
	 var stream = bot.stream('user');

	// stream.on('follow',function(event){
	// 	console.log('I was followed by ' + event.source.name + event.source.screen_name);
	
	// bot.post('statuses/update',
	// 	{status  : follow_reply + ' @'+event.source.screen_name},
	// 	function(err,data){
	// 		console.log(data);
	// 	});
	// 	});

	 
	 stream.on('tweet',function(event){

	
		if(event.in_reply_to_screen_name == "Kage_Bushaan")
		{
			bot.post('statuses/update',
		{status  : tweet_reply + ' @'+event.user.screen_name},
		function(err,data){
			console.log(data);
		});

		}
		


	});
}
go_live("Now we are comarades" , "Service");












