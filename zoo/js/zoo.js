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

});

var animal1 = new Animal({type: 'giraffe', ecosystel: 'savannah'});
var animal2 = new Animal({type: 'tiger', ecosystel: 'forest'});
var animal3 = new Animal({type: 'frog', ecosystel: 'pond'});

var weBoughtAZoo = new Zoo([animal1, animal2, animal3]);
console.log(weBoughtAZoo.models);