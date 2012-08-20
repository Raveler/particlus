
require(["Logger", "FPSTimer", "Vector2", "Color", "ParticleSystem"], function callback(Logger, FPSTimer, Vector2, Color) {

	// formatJson() :: formats and indents JSON string
	function formatJson(val) {
		var retval = '';
		var str = val;
	    var pos = 0;
	    var strLen = str.length;
		var indentStr = '   ';
	    var newLine = '\n';
		var char = '';
		
		for (var i=0; i<strLen; i++) {
			char = str.substring(i,i+1);
			
			if (char == '}' || char == ']') {
				retval = retval + newLine;
				pos = pos - 1;
				
				for (var j=0; j<pos; j++) {
					retval = retval + indentStr;
				}
			}
			
			retval = retval + char;	
			
			if (char == '{' || char == '[' || char == ',') {
				retval = retval + newLine;
				
				if (char == '{' || char == '[') {
					pos = pos + 1;
				}
				
				for (var k=0; k<pos; k++) {
					retval = retval + indentStr;
				}
			}
		}
		
		return retval;
	}

	// create canvas
	var div = document.getElementById('main');
	var canvas = document.createElement('canvas');
	canvas.width = 800;
	canvas.height = 600;
	canvas.className = 'main-canvas';
	div.appendChild(canvas);

	// render the effect
	var renderEffect = function(system) {

		// draw function
		var frame = 1;
		var maxFrame = 20;
		var startTime = new Date().getTime();
		var drawFunction = function() {
			var startFrameTime = new Date().getTime();
			canvas.getContext('2d').clearRect(0, 0, 800, 600);
			system.draw(canvas, 0, 0, 1000 / 24);
			var stopFrameTime = new Date().getTime();
			//Logger.log('Frame ' + frame + ': ' + (stopFrameTime - startFrameTime));
			//if (++frame <= maxFrame) {
			if (!system.isDone()) {
				setTimeout(drawFunction, 5);
			}
			else {
				var stopTime = new Date().getTime();
				Logger.log('Total draw time: ' + (stopTime - startTime));
				var avgFrameTime = ((stopTime - startTime) / system.getFrame());
				var fps = 1000 / avgFrameTime;
				Logger.log('FPS: ' + fps);
			}
		};
		drawFunction();
	};

	// draw the log
	var log = document.getElementById("log");
	log.appendChild(Logger.getElement());
	
	// create particle system
	var effect = {
		emitterStartLocation: new Vector2(400, 190),
		emitterStopLocation: new Vector2(440, 190),
		systemLifeSpan: 1,
		particleSpawnArea: new Vector2(190, 0),
		maxParticles: 600,
		averageLifeSpan: 1,
		lifeSpanVariance: 0.5,
		startColor: new Color(255,167,63,1.0),
		stopColor: new Color(13,141,0,1.0),
		averageVelocity: new Vector2(0, 0.8),
		velocityVariance: new Vector2(0, 0.3),
		minParticleSize: 1,
		maxParticleSize: 10,
		particleFadeTime: 0.8,
		globalCompositeOperation: 'lighter'
	};
	var system = new ParticleSystem(effect);
	renderEffect(system);
	// get the form and make it work
	var textArea = document.getElementById("edit-text");
	textArea.value = formatJson(JSON.stringify(effect));
	var button = document.getElementById("edit-submit");
	button.onclick = function(evt) {
		var effect = JSON.parse(textArea.value);
		var system = new ParticleSystem(effect);
		renderEffect(system);
		textArea.value = formatJson(JSON.stringify(effect));
	}
});