// replace this entire code block with the config found in the firebase dashboard
// for your created database
var config = {
    apiKey: "AIzaSyDD0I1ZO4E8swFn41v9bZdmS-TzqgNVl8I",
    authDomain: "test-project-75011.firebaseapp.com",
    databaseURL: "https://test-project-75011.firebaseio.com",
    projectId: "test-project-75011",
    storageBucket: "test-project-75011.appspot.com",
    messagingSenderId: "383451246079"
  };
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

$(function(){
	$('#add-button').on('click', function(){
		var newValue = $('#new-item').val();
		//  grab a reference to the todo-items key in firebase and then create a new item we set the data on
		var item = database.ref("/todo-items").push();
		item.set( {value: newValue} )
	})

	// grab a reference to the todo-items key
	database.ref('/todo-items').on('value', function(snapshot){
		var list = $('#list-items');
		list.empty();
		snapshot.forEach(function(listItem){
			var item = listItem.val().value;
			var appendContent = '<li data-id="'+ listItem.key + '">' + item + ' <a href="#" class="remove">Remove</a></li>';
			list.append(appendContent);
		});
	})

	$('#list-items').on('click', 'li a', function(){
		var itemID = $(this).parent().data('id');
		database.ref('/todo-items/' + itemID).remove();
		console.log(itemID);
	})
})