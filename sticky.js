// Sticky v1.0 by Daniel Raftery
// http://thrivingkings.com/sticky
//
// http://twitter.com/ThrivingKings

// Sticky2 v1.0 by Victor Castelan
// victorcastelan@gmail.com
// Sticky2 is the same of the original sticky, but with a few mods.
// Thanks Daniel Raftery for your great plugin.
/*
 * Whats new on v2:
 * Add remove() when closing
 * Add onClose callback as parameter option
 * Add position as parameter option
 * Add addClass as parameter option. The classes in css will be prefixed with "sticky-"
   addClass:"myClass" will call "sticky-myClass" css class
 * Add style as parameter option
 
 Example:
 $.sticky('hello world',{position:"up-right", style:"width:500px", onClose:function(){alert('I am closing')});
 $.sticky('hello world',{position:"bottom-right", style:"background-color:#cccccc");
 multiple sticky can be displayed at the same time in different positions
 */

(function( $ ) {
	
	// Using it without an object
	$.sticky = function(note, options, callback) {return $.fn.sticky(note, options, callback);};
	
	$.fn.sticky = function(note, options, callback) {
		// Default settings
		var settings = {
			"speed"			:	"fast",	 // animations: fast, slow, or integer
			"duplicates"	:	true,  // true or false
			"autoclose"		:	5000,  // integer or false
			"onClose"		:   function() {},
			"position"		:	"bottom-left",  // top-left, top-right, bottom-left, or bottom-right
			"addClass"		:   "", //Clase que agregaremos al sticky
			"style"			:   ""
		};
		
		// Passing in the object instead of specifying a note
		if(!note) note = this.html();
		
		if(options) $.extend(settings, options);
        
		//Classes
		if (settings.addClass) settings.addClass = 'sticky-'+settings.addClass;
		
		// Variables
		var display = true;
		var duplicate = 'no';
		
		// Somewhat of a unique ID
		var uniqID = Math.floor(Math.random()*99999);
		
		// Handling duplicate notes and IDs
		$('.sticky-note').each(function() {
			if($(this).html() == note && $(this).is(':visible')) { 
				duplicate = 'yes';
				if(!settings.duplicates) display = false;
			}
			if($(this).attr('id')==uniqID) uniqID = Math.floor(Math.random()*9999999);
		});
		
		// Make sure the sticky queue exists
		if(!$('body').find('.sticky-queue.'+settings.position).is('*')) {
            $('body').append('<div class="sticky-queue ' + settings.position + '"></div>');
        }
		
		// Can it be displayed?
		if(display) {
			// Building and inserting sticky note
			$('.sticky-queue.'+settings.position).prepend('<div class="sticky border-' + settings.position + ' ' + settings.addClass + '" id="' + uniqID + '" style="'+settings.style+'"></div>');
			$('#' + uniqID).append('<img src="/img/misc/stickyClose.png" class="sticky-close" rel="' + uniqID + '" title="Close" />');
			$('#' + uniqID).append('<div class="sticky-note" rel="' + uniqID + '">' + note + '</div>');
			
			// Smoother animation
			var height = $('#' + uniqID).height();
			$('#' + uniqID).css('min-height', height);
			
			$('#' + uniqID).slideDown(settings.speed);
			display = true;
			}
		
		// Callback data
		var response = {
            "id"        :   uniqID,
			"duplicate"	:	duplicate,
            "displayed" :	display,
			"position"	:	settings.position
		};

		$('#'+uniqID).data('sticky',{
			"response" : $.extend({}, response),
			"settings" : $.extend({}, settings)
		});
		var stickyData = $('#'+uniqID).data('sticky');
			
		// Listeners
		$('.sticky').ready(function() {
			// If 'autoclose' is enabled, set a timer to close the sticky
			if(settings.autoclose) {
				stickyData.settings.onClose(stickyData.response);
				$('#' + uniqID).delay(settings.autoclose).fadeOut(settings.speed,function(){
                    
					$('#'+uniqID).removeData('sticky');
					$('#'+uniqID).find('.sticky-close').unbind();
					$(this).remove();
				});
			}
		});
		// Closing a sticky
		$('#'+uniqID).find('.sticky-close').one('click',function() {
			var thisRel = $('#' + $(this).attr('rel'));
			stickyData.settings.onClose(stickyData.response);
			thisRel.dequeue().fadeOut(settings.speed,function(){
				
				$(this).removeData('sticky');
				$(this).remove();
			}); 
		});

		// Callback function?
		if(callback) {
            callback(response);
        } else {
            return(response);
        }
		
	};
})( jQuery );
	