if (wysihtml5.browser.supported()) {

  module("wysihtml5.composer.observe", {
    setup: function () {
      this.container = document.createElement("div");
      this.element = document.createElement("textarea");
      this.element.id = "wysihtml5-observer-test"
      this.container.appendChild(this.element);
      document.body.appendChild(this.container);

      this.makeEvent = function (eventName, charCode) {
        var evt_data = {//Press A
          altGraphKey: false,
          altKey: false,
          bubbles: true,
          cancelBubble: false,
          cancelable: true,
          charCode: charCode,
          clipboardData: undefined,
          ctrlKey: false,
          currentTarget: null,
          defaultPrevented: false,
          detail: 0,
          eventPhase: 0,
          keyCode: 65,
          keyIdentifier: "",
          keyLocation: 0,
          layerX: 0,
          layerY: 0,
          location: 0,
          metaKey: false,
          pageX: 0,
          pageY: 0,
          returnValue: true,
          shiftKey: true,
          which: charCode
        };

        return window.crossBrowser_initKeyboardEvent(eventName, evt_data);
      };


    },

    teardown: function () {
      this.container.parentNode.removeChild(this.container);

      var iframe;
      while (iframe = document.querySelector("iframe.wysihtml5-sandbox")) {
        iframe.parentNode.removeChild(iframe);
      }
    }
  });

  /*asyncTest('_applyDenyRules while typing', function () {
    expect(2);

    var that = this;

    var body;

    var editor = new wysihtml5.Editor("wysihtml5-observer-test", {
      parserRules: {
        "deny": [
          {
            "rule": /A{2,}/g,
            "msg": "Two or more A's are not allowed"
          }
        ],
        "fix": []
      }
    }).on('load',function () {

        body = this.currentView.element;
        var evt = that.makeEvent("keypress", "A".charCodeAt(0));

        setTimeout(function () {
          body.innerText = "A";

          editor.focus(true);
          body.dispatchEvent(evt);

        }, 500);

      }).on("deny:composer", function (data) {
        //body = this.currentView.element;
        equal(data.rule.msg, "Two or more A's are not allowed", "Message wasn't correct");
        equal(body.innerText.replace(/\s$/, ''), "A", "Restriction didn't apply");
        start();
      });

  });

  asyncTest('_applyFixRules while typing', function () {
    expect(3);

    var that = this;

    var body;

    var editor = new wysihtml5.Editor("wysihtml5-observer-test", {
      parserRules: {
        "deny": [],
        "fix": [
          {
            "rule": /\,\S/i,
            "fix": function (char) {
              if (char == ',') {
                return char + ' '
              } else {
                return ' ' + char;
              }
            }
          }
        ]
      }
    }).on('load',function () {
        body = this.currentView.element;
        var evt = that.makeEvent("keypress", "A".charCodeAt(0));
        setTimeout(function () {
          body.innerText = "AAA,";
          editor.focus(true);
          body.dispatchEvent(evt);
        }, 500)
      }).on("fix:composer", function (data) {

        equal(data.text, "A", "Input char wasn't correct");
        equal(data.fixed, " A", "Text wasn't correctly fixed");
        equal(body.innerText.replace(/\s$/, ''), "AAA, A", "Fixing didn't apply");
        start();
      });
  });

  asyncTest('Caret monitoring', function(){
    expect(2);

    var that = this;

    that.element.innerHTML="AAA"

    var editor = new wysihtml5.Editor("wysihtml5-observer-test",{});
    editor.composer._create();
    setTimeout(function(){
      equal(editor.composer._getTextAroundCaret("A".charCodeAt(0),3,3), "AAAA", "Text around caret is correct");
      equal(editor.composer._getCaretOffset(),0, "Caret offset is correct");
      start();
    }, 100);

  });*/

  asyncTest('Composer dom handling methods', function(){
    var that = this;

    that.element.innerHTML="AAA"

    var editor = new wysihtml5.Editor("wysihtml5-observer-test",{});
    editor.composer._create();
    setTimeout(function(){
      var p = editor.composer.makeEmptyParagraph();

      //Testing if an empty paragraph element is created
      ok(p !== undefined);
      ok(typeof p == "object") ;
      ok(p.nodeType == 1);
      ok(p.nodeName == "P");
      ok(p.innerHTML == "<br>");


      var div = document.createElement('div');
      editor.composer.element.appendChild(div);

      //Testing if a Div element is replaced with a new empty paragraph
      var res = editor.composer.replaceNodeWith(div, [p]);
      equal(p, res, 'node was replaced');
      ok(div.parentNode == null);


     //Testing if an element is inserted right after another element
      var div2 = document.createElement('div');
      var p2 = editor.composer.makeEmptyParagraph();
      p2.innerHTML = "AAA"
      editor.composer.element.appendChild(div2);
      var currNode = editor.composer.insertNodes(div2,[p2]);

      equal(currNode, p2, 'Correct node returned');
      equal(div2.nextElementSibling, p2, 'Node inserted correctly');

      //Testing if caret is being correctly repositioned
      editor.composer.repositionCaretAt(p2);
      var tac = editor.composer._getTextAroundCaret("A".charCodeAt(0),3,3);
      ok(tac="AAA");


      //Testing if node is empty asserts correctly empty nodes
      var node1 = document.createElement('div'),
        node2 = document.createElement('div'),
        node3 = document.createElement('div'),
        node4 = document.createElement('div'),
        node5 = document.createElement('div'),
        node6 = document.createElement('div'),
        node7 = document.createElement('div'),
        node8 = document.createElement('div'),
        node9 = document.createElement('div'),
        node10 = document.createElement('div');
        node11 = document.createElement('div');

      node1.appendChild(document.createElement('a'));
      node2.appendChild(document.createElement('iframe'));
      node3.appendChild(document.createElement('img'));
      node4.appendChild(document.createElement('hr'));
      node5.appendChild(document.createElement('video'));
      node6.appendChild(document.createElement('canvas'));
      node7.innerText = "AAAAA";
      node8.innerText = "         ";
      node9.innerHTML = "<b></b>";
      node10.innerHTML = "<div><span></span></div>";
      node11.innerHTML = "<br>";

      ok(editor.composer.nodeIsEmpty(node1) == true);
      ok(editor.composer.nodeIsEmpty(node2) == false);
      ok(editor.composer.nodeIsEmpty(node3) == false);
      ok(editor.composer.nodeIsEmpty(node4) == false);
      ok(editor.composer.nodeIsEmpty(node5) == false);
      ok(editor.composer.nodeIsEmpty(node6) == false);
      ok(editor.composer.nodeIsEmpty(node7) == false);
      ok(editor.composer.nodeIsEmpty(node8) == true);
      ok(editor.composer.nodeIsEmpty(node9) == true);
      ok(editor.composer.nodeIsEmpty(node10) == true);
      ok(editor.composer.nodeIsEmpty(node11) == true);





      start();

    }, 100);
  });



}
