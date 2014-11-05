// console.log("Hello world");
// Lik a ruby class but done in backbone
var Animal  = Backbone.Model.extend ( { // extend is a way of merging two models together. i.e. backbone and a new object that has our customisation
	defaults : {
		id: null,
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

		var animalIndexSource = $('#animalIndex').html();
		var animalIndexHTML = _.template(animalIndexSource);

		view.collection.each(function(animal) { // Goes through each animal in its collection and renders them 
			
			var animalHTML = animalIndexHTML(animal.toJSON());
			view.$el.append(animalHTML);
			
			// Replace the below with underscore template
			// var $p = $('<p/>');					// IRL, this whole thing can be done with a template
			// $p.text(animal.get('type'));
			// var id = animal.get('id');
			// var $a = $('<a>Click Here</a>');
			// $a.attr('href', '#animals/' + id);
			// $p.append($a);
			// view.$el.append($p);
		});	
	},
	greeting: function() {
		alert("You clicked the heading!");
	}
});

var animal1 = new Animal({id: 1, type: 'giraffe', ecosystem: 'savannah'});
var animal2 = new Animal({id: 2, type: 'tiger', ecosystem: 'forest'});
var animal3 = new Animal({id: 3, type: 'frog', ecosystem: 'pond'});

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
	},
	viewAnimal: function(id) {
		$('#main').empty();
		console.log("You are viewing animal", id);
	}	
});

$(document).ready(function() {
	var appRouter = new AppRouter(); 	// Instantiate the router
	Backbone.history.start();

});