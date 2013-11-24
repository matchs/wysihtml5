module("wysihtml5.dom.textParser", {

  getRules : function(){
    return [
      {
        "rule": /^\s+|\s+$/g, //Trimming text
        "replace": ""
      },
      {
        "rule": /\s{2,}/g, //Removing double spaces
        "replace": " "
      },
      {
        "rule": /^./g,
        "replace": function (txt) {//First character to uppercase
          return txt.toUpperCase();
        }
      },
      {
        "rule": /[^!?,.;:]$/g,
        "replace": function (txt) {//Putting a dot a the end of the text
          return txt + '.';
        }
      }
    ];
  },

  buildDomTree: function(){
    var node = document.createElement('p');
    node.appendChild(document.createTextNode('hello World'));
    var span = document.createElement('span');
    span.appendChild((document.createTextNode("I'm a  span")));
    node.appendChild(span);
    node.appendChild(document.createTextNode("Bye world"));

    return node;
  },

  setup: function () {
    this.container = document.createElement("div");
    document.body.appendChild(this.container);
  },

  teardown: function () {
    this.container.parentNode.removeChild(this.container);
  }

});

test('applyRules', function () {
  var rules = this.getRules();

  var text = ' This is a very very wrong text. It has a lot of empty       spaces and does end the text without proper punctuation ';

  deepEqual(wysihtml5.dom.textParser.applyRules(text, rules), 'This is a very very wrong text. It has a lot of empty spaces and does end the text without proper punctuation.', 'Rules successfully applied to text');
});

test('foldNodes', function () {
  var node = this.buildDomTree();

  var nnodes = wysihtml5.dom.textParser.foldNodes([].slice.call(node.childNodes, 0), 0, function(accum, currNode){
    return accum + 1;
  });

  equal(nnodes, 3, 'Successfully counted the number of sub-nodes');

});

test('processNode', function () {
  expect(2);

  var node = document.createElement('p');
  var text = document.createTextNode('Hello World');

  var elementFunc = function(){
    return 'element';
  };

  var textFunc = function(){
    return 'text';
  };

  equal(wysihtml5.dom.textParser.processNode(node, elementFunc, textFunc),'element','Successfully called the Element Func');
  equal(wysihtml5.dom.textParser.processNode(text, elementFunc, textFunc),'text','Successfully called the Text Func');

  node = null;
  text = null;

});

test('extractText', function () {
  var node = this.buildDomTree();

  var res = "hello World__#txt__I'm a  span__#txt__Bye world__#txt__"
  equal(wysihtml5.dom.textParser.extractText(node), res, 'Text extracted correctly');
});

test('extractNodeMarkup', function () {
  var node = this.buildDomTree();
  var res = "<p>__#txt__<span>__#txt__</span>__#txt__</p>";
  equal(wysihtml5.dom.textParser.extractNodeMarkup(node), res, 'Text extracted correctly');

  var node2 = document.createElement('p');
  node2.innerHTML = 'foo<img src="test.img"><hr/>'
  res = '<p>__#txt__<img src="test.img"><hr></p>'

  equal(wysihtml5.dom.textParser.extractNodeMarkup(node2), res, 'Text extracted correctly event from a node with a self closed element');
});

test('parse', function () {
  var rules = this.getRules();
  var node = this.buildDomTree();

  var res = "Hello World<span>I'm a span</span>Bye world.";

  equal(wysihtml5.dom.textParser.parse(node,rules), res, 'done!');
});
