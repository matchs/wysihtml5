/**
 * Taking care of events
 *  - Simulating 'change' event on contentEditable element
 *  - Handling drag & drop logic
 *  - Catch paste events
 *  - Dispatch proprietary newword:composer event
 *  - Keyboard shortcuts
 *  - Error prevention
 *  - Auto-correct
 */
(function(wysihtml5) {
  var dom       = wysihtml5.dom,
      browser   = wysihtml5.browser,
      /**
       * Map keyCodes to query commands
       */
      shortcuts = {
        "66": "bold",     // B
        "73": "italic",   // I
        "85": "underline" // U
      };

  wysihtml5.views.Composer.prototype.observe = function() {
    var that                = this,
        state               = this.getValue(),
        iframe              = this.sandbox.getIframe(),
        element             = this.element,
        focusBlurElement    = browser.supportsEventsInIframeCorrectly() ? element : this.sandbox.getWindow(),
        pasteEvents         = ["drop", "paste"];

    //----------- Returns the current offset of the carret without counting the line breaks
    this._getCaretOffset = (function (el) {
      var doc = el.ownerDocument || el.document;
      var win = doc.defaultView || doc.parentWindow;

      return function () {
        var sel, range, preCaretRange, caretOffset = 0;
        if (typeof win.getSelection != "undefined") {
          sel = win.getSelection();
          if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            preCaretRange = range.cloneRange();

            preCaretRange.selectNodeContents(el);
            preCaretRange.setEnd(range.endContainer, range.endOffset);

            var preCaretOffset = preCaretRange.toString().replace(/\n{2,}/g, '');
            caretOffset = preCaretOffset.length;

            var match = preCaretOffset.match(/\n/g);
            if (match !== null) {
              caretOffset -= match.length;
            }
          }
        } else if ((sel = doc.selection) && sel.type != "Control") {
          range = doc.selection.createRange();
          preCaretRange = doc.body.createTextRange();
          preCaretRange.moveToElementText(element);
          preCaretRange.setEndPoint("EndToEnd", textRange);
          caretOffset = preCaretTextRange.text.length + preCaretOffset;
        }
        return caretOffset;
      }
    })(element);

    // --------- Returns the text around the caret from lookback to lookahead
    this._getTextAroundCaret = function (charCode, lookback, lookahead) {
      var itxt = that.element.innerText.replace(/\n|^\b/g, '');
      var char = String.fromCharCode(charCode);

      var caretPos = that._getCaretOffset();
      var str = itxt.substring(caretPos - lookback, caretPos + lookahead);
      return str.slice(0, lookback) + char + str.slice(lookback, str.length - 1);
    }

    // --------- Error prevention logic ---------
    this._applyDenyRules = function (rules, txt, event) {
      if (rules.length <= 0) {
        return false;
      } else if (rules[0].rule.test(txt)) {
        event.preventDefault();
        that.parent.fire("deny:composer", {
          rule:rules[0],
          text:txt
        });
        return true;
      } else {
        return this._applyDenyRules(rules.slice(1, rules.length), txt, event);
      }
    }

    // --------- Auto-correct logic ---------
    this._applyFixRules = function (rules, txt, char, event) {
      if (rules.length <= 0) {
        return false;
      } else if (rules[0].rule.test(txt)) {
        event.preventDefault();
        var fixed = rules[0].fix(char);
        that.commands.exec("insertHTML", fixed);
        that.parent.fire("fix:composer", {
          rule:rules[0],
          text:char,
          fixed:rules[0].fix(char)
        });
        return;
      } else {
        return this._applyFixRules(rules.slice(1, rules.length), txt, char, event);
      }
    }

    // --------- Error prevention and auto-correct logic ---------
    dom.observe(element, "keypress", function (event) {

      var str = that._getTextAroundCaret(event.charCode, 3, 3);

      if (that._applyDenyRules(that.config.parserRules.deny, str, event) !== true) {
          that._applyFixRules(that.config.parserRules.fix, str, String.fromCharCode(event.charCode), event);
      }
    });

    // --------- destroy:composer event ---------
    dom.observe(iframe, "DOMNodeRemoved", function() {
      clearInterval(domNodeRemovedInterval);
      that.parent.fire("destroy:composer");
    });

    // DOMNodeRemoved event is not supported in IE 8
    var domNodeRemovedInterval = setInterval(function() {
      if (!dom.contains(document.documentElement, iframe)) {
        clearInterval(domNodeRemovedInterval);
        that.parent.fire("destroy:composer");
      }
    }, 250);

    // --------- Focus & blur logic ---------
    dom.observe(focusBlurElement, "focus", function() {
      that.parent.fire("focus").fire("focus:composer");

      // Delay storing of state until all focus handler are fired
      // especially the one which resets the placeholder
      setTimeout(function() { state = that.getValue(); }, 0);
    });

    dom.observe(focusBlurElement, "blur", function() {
      if (state !== that.getValue()) {
        that.parent.fire("change").fire("change:composer");
      }
      that.parent.fire("blur").fire("blur:composer");
    });

    // --------- Drag & Drop logic ---------
    dom.observe(element, "dragenter", function() {
      that.parent.fire("unset_placeholder");
    });

    dom.observe(element, pasteEvents, function() {
      setTimeout(function() {
        that.parent.fire("paste").fire("paste:composer");
      }, 0);
    });

    // --------- neword event ---------
    dom.observe(element, "keyup", function(event) {
      var keyCode = event.keyCode;
      if (keyCode === wysihtml5.SPACE_KEY || keyCode === wysihtml5.ENTER_KEY) {
        that.parent.fire("newword:composer");
      }
    });

    this.parent.on("paste:composer", function() {
      setTimeout(function() { that.parent.fire("newword:composer"); }, 0);
    });

    // --------- Make sure that images are selected when clicking on them ---------
    if (!browser.canSelectImagesInContentEditable()) {
      dom.observe(element, "mousedown", function(event) {
        var target = event.target;
        if (target.nodeName === "IMG") {
          that.selection.selectNode(target);
          event.preventDefault();
        }
      });
    }

    if (browser.hasHistoryIssue() && browser.supportsSelectionModify()) {
      dom.observe(element, "keydown", function(event) {
        if (!event.metaKey && !event.ctrlKey) {
          return;
        }

        var keyCode   = event.keyCode,
            win       = element.ownerDocument.defaultView,
            selection = win.getSelection();

        if (keyCode === 37 || keyCode === 39) {
          if (keyCode === 37) {
            selection.modify("extend", "left", "lineboundary");
            if (!event.shiftKey) {
              selection.collapseToStart();
            }
          }
          if (keyCode === 39) {
            selection.modify("extend", "right", "lineboundary");
            if (!event.shiftKey) {
              selection.collapseToEnd();
            }
          }
          event.preventDefault();
        }
      });
    }

    // --------- Shortcut logic ---------
    dom.observe(element, "keydown", function(event) {
      var keyCode  = event.keyCode,
          command  = shortcuts[keyCode];
      if ((event.ctrlKey || event.metaKey) && !event.altKey && command) {
        that.commands.exec(command);
        event.preventDefault();
      }
    });

    // --------- Make sure that when pressing backspace/delete on selected images deletes the image and it's anchor ---------
    dom.observe(element, "keydown", function(event) {
      var target  = that.selection.getSelectedNode(true),
          keyCode = event.keyCode,
          parent;
      if (target && target.nodeName === "IMG" && (keyCode === wysihtml5.BACKSPACE_KEY || keyCode === wysihtml5.DELETE_KEY)) { // 8 => backspace, 46 => delete
        parent = target.parentNode;
        // delete the <img>
        parent.removeChild(target);
        // and it's parent <a> too if it hasn't got any other child nodes
        if (parent.nodeName === "A" && !parent.firstChild) {
          parent.parentNode.removeChild(parent);
        }

        setTimeout(function() { wysihtml5.quirks.redraw(element); }, 0);
        event.preventDefault();
      }
    });

    // --------- IE 8+9 focus the editor when the iframe is clicked (without actually firing the 'focus' event on the <body>) ---------
    if (browser.hasIframeFocusIssue()) {
      dom.observe(this.iframe, "focus", function() {
        setTimeout(function() {
          if (that.doc.querySelector(":focus") !== that.element) {
            that.focus();
          }
        }, 0);
      });

      dom.observe(this.element, "blur", function() {
        setTimeout(function() {
          that.selection.getSelection().removeAllRanges();
        }, 0);
      });
    }

    // --------- Show url in tooltip when hovering links or images ---------
    var titlePrefixes = {
      IMG: "Image: ",
      A:   "Link: "
    };

    dom.observe(element, "mouseover", function(event) {
      var target   = event.target,
          nodeName = target.nodeName,
          title;
      if (nodeName !== "A" && nodeName !== "IMG") {
        return;
      }
      var hasTitle = target.hasAttribute("title");
      if(!hasTitle){
        title = titlePrefixes[nodeName] + (target.getAttribute("href") || target.getAttribute("src"));
        target.setAttribute("title", title);
      }
    });
  };
})(wysihtml5);