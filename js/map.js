(function( $, window ) {
	window.getActiveMQ = function() {
		$('<div id="getActiveMQ-watcher"></div>').appendTo('body').hide();
		
		var computed = window.getComputedStyle, watcher = document.getElementById('getActiveMQ-watcher');
		if ('currentStyle' in watcher) {
			window.getActiveMQ = function() {
				return watcher.currentStyle['fontFamily'].replace(/['"]/g,'');
			};
		}
		else if (computed) {
			window.getActiveMQ = function() {
				return computed(watcher, null).getPropertyValue('font-family').replace(/['"]/g,'');
			};
		}
		else {
			window.getActiveMQ = function() {
				return 'unknown';
			};
		}
		
		return window.getActiveMQ();
	};

	window.watchResize = function(callback) {
		var resizing;
		
		function done() {
			clearTimeout(resizing);
			resizing = null;
			callback();
		}
		
		$(window).resize(function() {
			if (resizing) {
				clearTimeout(resizing);
				resizing = null;
			}
			resizing = setTimeout(done, 50);
		});
		
		callback();
	};
	
	window.watchResize(function() {
		var size = window.getActiveMQ().replace("break-", "");
		window.WesternUnion = window.getActiveMQ();
	});

	//A fix for theWebKit Resize Bug https://bugs.webkit.org/show_bug.cgi?id=53166
	$(window).on('load', function() {
		window.watchResize(function() {
			var $body = $('body');
			$body.css('overflow', 'hidden').height();
			$body.css('overflow', 'auto');
		});
	});
}(jQuery, window));

(function($, window) {
	var $body = $('body');
	$(document).ready(function() {
		mapInfoInit();
	});

	function mapInfoInit() {
		$('.map-location-marker').click(function(e) {
			e.preventDefault();
			$('#map-info, #overlay').remove();
			buildmapInfo(
				$(this).data('mapLink'),
				$(this).data('mapTitle'),
				$(this).data('mapEvent'),
				$(this).data('mapDate')
			);
		});
	}

	function buildmapInfo (location, title, event, date) {
		$('<div id="map-info">')
			.addClass(location)
			.fadeIn('slow')
			.appendTo('#places-map .map')
			.html(
				'<h1>' + title + '</h1><br>' +
				'<p>' + event + '</p><p>' + date + '</p>' +
				'<span class="close-btn"></span>'
			);
			
		// Close map info if click anywhere outside of it
		var mapInfo = $('#map-info');
		$(document).mouseup(function(e) {
			if (!mapInfo.is(e.target) && mapInfo.has(e.target).length === 0) {
				mapInfo.fadeOut('slow', function() {
					$(this).remove();
				});
			}
		});
		
		$('#map-info .close-btn').click(function(e) {
			$('#map-info').fadeOut('slow', function() {
				$(this).remove();
			 });
		});
	}
}(jQuery,window));
