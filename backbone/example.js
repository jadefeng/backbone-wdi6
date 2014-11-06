// Model
// Defining an instance of the player class
var Player = Backbone.Model.extend({
	defaults: {
		type: 'Cheater',
		status: 'Winner'
	},
	initialize: function() {
		this.on('change:status', function(){
			alert('Hello. ' + this.attributes.status));
		});
	}
});

// Collection
var Team = Backbone.Collection.extend({
	model: Player
});

var TeamView = Backbone.View.extend(
	el: '#centralstation',
	render: function() {
		
	}
	)


var Record= Backbone.Model.extend();

var RecordStore = Backbone.Collection.extend({
	model: Record
});