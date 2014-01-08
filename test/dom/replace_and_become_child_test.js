module("wysihtml5.dom.replace_and_become_child", {
  setup: function() {
    this.container = document.createElement('div');
    this.container.id='container';
  },
  
  teardown: function() {
    this.container = null;
  } 
});


test("Basic test", function() {

  var oldNode = document.createElement('div');
  oldNode.id = 'oldNode';

  this.container.appendChild(oldNode);



  var newNode = document.createElement('div');
  newNode.id = 'newNode';

  oldNode.appendChild(newNode);

  ok(this.container.firstElementChild == oldNode);

  var result = wysihtml5.dom.replaceAndBecomeChild(oldNode,newNode);

  ok(result == newNode);
  ok(newNode.firstElementChild == oldNode);
  ok(this.container.firstElementChild == newNode);
});
