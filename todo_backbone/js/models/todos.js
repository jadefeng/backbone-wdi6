// js/models/todo.js


var app = app || {};

app.Todo = Backbone.Model.extend({
	// Defaults
	defaults: {
		title = '',
		completed: false
	},

	// When the 'completed' status of the todo item is toggled
	toggle: function() {
		this.save({
			completed: !this.get('completed')
		});
	},

	// Filter the remaining todos that are not finished
	remaining: function () {
		return this.without.apply(this, this.completed() );
	},

	// Todos in 
});