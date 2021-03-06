
/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// score
		score : 0
	},
	
	
	// Run on page load.
	"onload" : function () {
	// Initialize the video.
	if (!me.video.init("screen", 272, 272, true, 'auto')) {
		alert("Your browser does not support HTML5 canvas.");
		return;
	}

	// add "#debug" to the URL to enable the debug Panel
	if (document.location.hash === "#debug") {
		window.onReady(function () {
			me.plugin.register.defer(this, debugPanel, "debug");
		});
	}

	// Initialize the audio.
	me.audio.init("mp3,ogg");

	// Set a callback to run when loading is complete.
	me.loader.onload = this.loaded.bind(this);

	// Load the resources.
	me.loader.preload(game.resources);

	// Initialize melonJS and display a loading screen.
	me.state.change(me.state.LOADING);
},
	// Run on game resources loaded.
	"loaded" : function () {
	   // set the "Play/Ingame" Screen Object
	   me.state.set(me.state.PLAY, new game.PlayScreen());
	     
	   // register our player entity in the object pool
	   me.pool.register("link_player", game.PlayerEntity);
	             
	   // enable the keyboard
	   me.input.bindKey(me.input.KEY.LEFT,  "left");
	   me.input.bindKey(me.input.KEY.RIGHT, "right");
	      
	   // start the game 
	   me.state.change(me.state.PLAY);
	}
};
