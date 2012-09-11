Particlus
=========

Particlus is a highly performant particle system for HTML5 canvas, written in javascript. It is released under the MIT license, which means it can be used (commercially) by anyone as long as you reference the original author (me).

To use Particlus, simply insert the scripts/ParticleSystem.js file into your project. All the other files are just there for the web demo. The entire particle system is contained within the ParticleSystem.js file, which has no external dependencies.

Live demo: http://www.silenistudios.com/particlus

To create a particle, use the following code:

```
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
```

To draw the particle system at a given location on a canvas AND to update the particle engine at the same time (ie, move forward in time), call the following command:
  
```
  system.draw(canvas, 0, 0, dt); // dt is the number of milliseconds the particle engine should move forward - typically the number of ms passed since last draw() call
```

That's it! Enjoy.