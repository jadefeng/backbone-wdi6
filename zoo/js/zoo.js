// console.log("Hello world");
// Lik a ruby class but done in backbone
var Animal  = Backbone.Model.extend ( { // extend is a way of merging two models together. i.e. backbone and a new object that has our customisation
	defaults : {
		type: 'animal',
		ecosystem: "",
		stripes: 0
	},

	initialize: function () { // Each time we make a new animal, the initialize function runs
		console.log("I am an animal.");
		this.on('change:type', function (model) {
			var type = model.get('type');
			console.log("I am now a ", type);
		});
	}
});


var Zoo = Backbone.Collection.extend ({
	model: Animal // Zoo is a collection of animals	
});

var ZooView = Backbone.View.extend( {
	el: '#main', // This makes a JQ $this element 
	initialize: function () {

	},
	events: { 	// events to do with the view happens in the events itself!
		'click h2': 'greeting'			// event + selector : run function
	},
	render: function() {
		var view = this;
		view.$el.empty();
		view.$el.append('<h2> Our Menagerie </h2>');
		this.collection.each(function(animal) { // Goes through each animal in its collection and renders them 
			var $p = $('<p/>');
			$p.text(animal.get('type'));
			view.$el.append($p);
		});	
	},
	greeting: function() {
		alert("You clicked the heading!");
	}
});

var animal1 = new Animal({type: 'giraffe', ecosystem: 'savannah'});
var animal2 = new Animal({type: 'tiger', ecosystem: 'forest'});
var animal3 = new Animal({type: 'frog', ecosystem: 'pond'});

var weBoughtAZoo = new Zoo([animal1, animal2, animal3]);
console.log(weBoughtAZoo.models);


var AppRouter = Backbone.Router.extend({
	routes: {
		'': 'index', 			// Routes that are supported
		'animals/:id': 'viewAnimal'
	},
	index: function() {
		console.log("You reached the root page.");
		var zooView = new ZooView({collection: weBoughtAZoo});
		zooView.render();
	}	
});

$(document).ready(function() {


});