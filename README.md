jquwery sticky
=============
// Sticky v1.0 by Daniel Raftery
// http://thrivingkings.com/sticky

// Sticky2 v1.0 by Victor Castelan
// victorcastelan@gmail.com
// Sticky2 is the same of the original sticky, but with a few mods.
// Thanks Daniel Raftery for your great plugin.

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


