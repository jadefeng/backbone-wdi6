// Backbone.history.start({pushState: true}); --> python -m SimpleHTTPServer --> localhost:8000
// This is the global object which everything is attached to
var app = {};
// Group all the views together
app.Views = {};
// Group all the models together
app.Models = {};
app.Collections = {};

// First thing to build is the ROUTER
app.BlogRouter = Backbone.Router.extend({
	routes: {
		'': 'index', 	// When you go to the homepage or put nothing there, it executes the index method
		'posts/:id': 'getPost',
		'*splat': 'pageNotFound'
	},
	index: function() {
		new app.Views.AppView({collection: app.posts});
		// console.log('index page');
		// var appView = new app.Views.AppView({collection: app.posts});
		// appView.render();
	},
	getPost: function(id) {
		// console.log('getPost page', id);
		var post = app.posts.get(id); // Finds the post
		if (!post) {
			app.router.navigate('', {trigger: true});
		} else {
			var view = new app.Views.PostView({model: post});
			view.render();
		}
	},
	pageNotFound: function() {
		// TODO: redirect to the home page
		console.log("You're lost.");
		app.router.navigate("", {trigger: true});
	}
});	

// Models goes between Router and Views - this is a Model for Posts
app.Models.Post = Backbone.Model.extend({
	defaults: {
		title: 'Untitled posts',
		content: 'Your ad here'
	},
});

app.Collections.Posts = Backbone.Collection.extend({ // Collection can only have one model. But a model can belong to many collections 
	model: app.Models.Posts 	// The collection has a model which it is based in
});

// Views gets called to an ID of AppView on the HTML
app.Views.AppView = Backbone.View.extend({
	el: '#main',
	initialize: function() { 
		this.render()
	},
	render: function () {
		var template = $('#appView').html();
		this.$el.html( template );					// When you initialize, set the el to a particular HTML

		this.collection.each(function( post ) {
			var view = new app.Views.PostListView({model: post});
			view.render();
		});
	}
});

app.Views.PostListView = Backbone.View.extend({
	tagName: 'li', 				// Creates a new <li> tag each time
	events: {
		'click': 'viewPost'
	},
	initialize: function() {},
	render: function() {
		var template = $('#postListView').html();
		var postListHTML = Handlebars.compile(template);

		this.$el.html(postListHTML(this.model.toJSON()));
		$('#posts').append(this.el);
	},
	viewPost: function() {
		// Change URL to go to single page view using navigate
		app.router.navigate('posts/' + this.model.get('id'), true);
		// True so the code is run for navigation
	}

});

app.Views.PostView = Backbone.View.extend({
	el: '#main', 
	initialize: function() {},
	render: function() {
		var template = $('#postView').html();
		var postHTML = Handlebars.compile(template);

		this.$el.html(postHTML(this.model.toJSON())); 	// Causes the post to be rendered on the page
	}

});


$(document).ready(function() {
	// This is seed data!
	app.posts = new app.Collections.Posts([
		new app.Models.Post({id: 1, title: 'First post', content: "Cats"}),
		new app.Models.Post({id: 2, title: "Second post", content: "Dogs"}),
		new app.Models.Post({id: 3, title: "Third post", content: "Chickens"}),
		new app.Models.Post({id: 4, title: "Fourth post", content: "Cows"})
	]);
	// console.log(_, $, Backbone);
	app.router = new app.BlogRouter();	// Gives an instance of the router
	Backbone.history.start( ); 	// To make it start listing for url routes
});