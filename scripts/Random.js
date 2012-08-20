define([], new function() {
	return {
		getInt: function(min, max) {
			if (typeof min == 'undefined') min = 0;
			if (typeof max == 'undefined') max = 1;
			return Math.round(min + Math.random() * (max - min));
		},
		
		getDouble: function(min, max) {
			if (typeof min == 'undefined') min = 0;
			if (typeof max == 'undefined') max = 1;
			return min + Math.random() * (max - min);
		},

		getNormDouble: function(avg, variance) {
			if (typeof avg == 'undefined') avg = 0.0;
			if (typeof variance == 'undefined') variance = 1.0;
			var x1, x2, w, y1, y2;
			do {
				x1 = 2.0 * this.getDouble() - 1.0;
				x2 = 2.0 * this.getDouble() - 1.0;
				w = x1 * x1 + x2 * x2;
			} while ( w >= 1.0 );
			
			w = Math.sqrt( (-2.0 * Math.log( w ) ) / w );
			y1 = x1 * w;
			//y2 = x2 * w;
			return avg + y1 * variance;
		}
	}
});