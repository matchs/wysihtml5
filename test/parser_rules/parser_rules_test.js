$(function(){

  function ParserRulesTestCase(tagsObject) {

    this.tagsObject = tagsObject;
    /*
     * Tests if the object is like the pattern:
     * "tag": {
     *   "check_attributes": {
     *     "attribute": "value"
     *   }
     * }
     */
    this.assertAttributesValues = function(tag, attributesMap) {
      var obj = this.tagsObject[tag];
      for (attribute in attributesMap) {
        equal(obj["check_attributes"][attribute], attributesMap[attribute], "The tag <" + tag + "> has the attribute '" + attribute + "' with the value '" + attributesMap[attribute] + "' at `check_attributes`.");
      }
      equal(Object.keys(obj["check_attributes"]).length, Object.keys(attributesMap).length, "The 'check_attributes' attribute of tag <" + tag + "> key has the expected value.");
    };

    /*
     * Tests if the object is like the pattern:
     * "tag": {
     *   "set_attributes": {
     *     "attribute": "value"
     *   }
     * }
     */
    this.assertSetAttributes = function(tag, attributesMap) {
      var obj = this.tagsObject[tag];
      for (attribute in attributesMap) {
        equal(obj["set_attributes"][attribute], attributesMap[attribute], "The tag <" + tag + "> has the attribute '" + attribute + "' with the value '" + attributesMap[attribute] + "' at `set_attributes`.");
      }
      equal(Object.keys(obj["set_attributes"]).length, Object.keys(attributesMap).length, "The 'set_attributes' attribute of tag <" + tag + "> key has the expected value.");
    };

    /*
     * Tests if the object is like the pattern:
     * "tag": {
     *   "remove": 1
     * }
     */
    this.assertRemoveTag = function(tag) {
      var obj = this.tagsObject[tag];
      equal(obj["remove"], 1, "The tag <" + tag + "> will be removed.");
    };

    /*
     * Tests if the object is like the pattern:
     * "tag": {
     *   "rename_tag": 1
     * }
     */
    this.assertReplaceTag = function(tag, newTag) {
      var obj = this.tagsObject[tag];
      try {
        equal(obj["rename_tag"], newTag, "The tag <" + tag + "> will be replaced by <" + newTag + "> tag.");
      } catch(e) {
        if (e instanceof TypeError && obj === undefined) {
          throw new Error("The tag <" + tag + "> doesn't exists in the tags object");
        }
        else {
          throw e
        }
      }
    };

    /*
     * Tests if the object is like the pattern:
     * "tag": {
     *   "set_class": "class"
     * }
     */
    this.assertSetClass = function(tag, htmlClass) {
      var obj = this.tagsObject[tag];
      equal(obj["set_class"], htmlClass, "The 'set_class' attribute has the class" + htmlClass);
    };

    /*
     * Tests if the object is like the pattern:
     * "tag": {
     *   "add_class": "class"
     * }
     */
    this.assertAddClass = function(tag, classMap) {
      var obj = this.tagsObject[tag];
      for (key in classMap) {
        equal(obj["add_class"][key], classMap[key], "The tag <" + tag + "> has the class '" + key + "' with the value '" + classMap[key] + "' at `add_class` map.");
      }
      equal(Object.keys(obj["add_class"]).length, Object.keys(classMap).length, "The 'add_class' attribute of tag <" + tag + "> key has the expected value.");
    };

    /*
     * Tests if the object is like the pattern:
     * "tag": {}
     */
    this.assertEmptyRule = function(tag) {
      var obj = this.tagsObject[tag];
      deepEqual(obj, {}, "The tag <" + tag + "> hasn't any parser rule.");
    };


    /**
     * Tests if a given rule matches an inputted text correctly
     * @param rule
     * @param inputSet Array
     */
    this.assertDenyRule = function(rule, inputSet, expec){
      for(var i in inputSet){
        deepEqual(new RegExp(rule.rule).test(inputSet[i]), expec, 'Text "'+inputSet[i]+'" was denied by rule "'+rule.rule+'"');
      }
    }

    /**
     * Tests if a given rule filters an inputted text correctly
     * @param rule
     * @param testSet
     */
    this.assertFixRule = function(rule, text, testSet){
      for(var i in testSet){
        deepEqual(rule.rule.test(testSet[i].text + testSet[i].input), true, 'Rule matched '+ testSet[i].text+testSet[i].input);
        deepEqual(testSet[i].text + rule.fix(testSet[i].input), testSet[i].expec, 'Text "'+testSet[i].text + testSet[i].input+'" was transformed into "'+testSet[i].expec + '"');
      }
    }


    /**
     * Tests if a given rule parses a given text correctly
     * @param rule
     * @param input
     * @param expec
     */
    this.assertParserRules = function(rules, input, expec){
      var txt = input;

      for(var i in rules){
        txt = txt.replace(rules[i].rule, rules[i].replace);
      }

      deepEqual(txt, expec, 'Text: "' + input + "\" was correctly parsed and became:\n\""+txt+'"');

    }

    /**
     * Tests if a given rule parses the text inside a give node correctly
     * @param node
     * @param input
     * @param expec
     */
    this.assertNodeParserRule = function(tags, node, input, expec) {
      equal(typeof  tags[node], "object", 'the node <' + node + '> has rule');
      equal(typeof tags[node].parse, "function", 'the node <' + node + '> has specific parser rule' );
      deepEqual(tags[node].parse(input), expec, 'the node <' + node + '>\'s parser rule parsed "'+ input +'" into "'+ expec +'" correctly');
    }
  }


  qunitModule('wysihtml5 parser');

  test('Tests the wysihtml5 parser object', function () {
    //var parseRules = module('editor').parseRules();
    var parseRules = wysihtml5ParserRules;

    deepEqual(parseRules.classes, {
      'period-divider': 1
    }, 'The allowed classes are as expected');

    var tags = parseRules.tags;
    var testCase = new ParserRulesTestCase(tags);

    testCase.assertReplaceTag("abbr", "span");
    testCase.assertReplaceTag("acronym", "span");

    // correct replace anything for div???
    testCase.assertReplaceTag("address", "div");

    testCase.assertReplaceTag("bdi", "span");
    testCase.assertReplaceTag("bdo", "span");
    testCase.assertReplaceTag("big", "span");
    testCase.assertReplaceTag("blink", "span");
    testCase.assertReplaceTag("body", "div");
    //testCase.assertReplaceTag("br", "p");
    testCase.assertReplaceTag("button", "span");
    testCase.assertReplaceTag("center", "div");
    testCase.assertReplaceTag("details", "div");
    testCase.assertReplaceTag("dir", "ul");
    testCase.assertReplaceTag("div", "p");
    testCase.assertReplaceTag("form", "div");
    testCase.assertReplaceTag("rt", "span");
    testCase.assertReplaceTag("multicol", "div");
    testCase.assertReplaceTag("figure", "div");
    testCase.assertReplaceTag("xmp", "span");
    testCase.assertReplaceTag("small", "span");
    testCase.assertReplaceTag("time", "span");
    testCase.assertReplaceTag("progress", "span");
    testCase.assertReplaceTag("dfn", "span");
    testCase.assertReplaceTag("figcaption", "div");
    testCase.assertReplaceTag("rb", "span");
    testCase.assertReplaceTag("footer", "div");
    testCase.assertReplaceTag("u", "span");
    testCase.assertReplaceTag("sup", "span");
    testCase.assertReplaceTag("nav", "div");
    testCase.assertReplaceTag("dd", "div");
    testCase.assertReplaceTag("s", "span");
    testCase.assertReplaceTag("option", "span");
    testCase.assertReplaceTag("select", "span");
    testCase.assertReplaceTag("map", "div");
    testCase.assertReplaceTag("mark", "span");
    testCase.assertReplaceTag("output", "span");
    testCase.assertReplaceTag("marquee", "span");
    testCase.assertReplaceTag("rp", "span");
    testCase.assertReplaceTag("aside", "div");
    testCase.assertReplaceTag("section", "div");
    testCase.assertReplaceTag("nobr", "span");
    testCase.assertReplaceTag("html", "div");
    testCase.assertReplaceTag("summary", "span");
    testCase.assertReplaceTag("var", "span");
    testCase.assertReplaceTag("meter", "span");
    testCase.assertReplaceTag("textarea", "span");
    testCase.assertReplaceTag("hgroup", "div");
    testCase.assertReplaceTag("font", "span");
    testCase.assertReplaceTag("tt", "span");
    testCase.assertReplaceTag("plaintext", "span");
    testCase.assertReplaceTag("legend", "span");
    testCase.assertReplaceTag("label", "span");
    testCase.assertReplaceTag("dl", "div");
    testCase.assertReplaceTag("kbd", "span");
    testCase.assertReplaceTag("listing", "div");
    testCase.assertReplaceTag("dt", "span");
    testCase.assertReplaceTag("datalist", "span");
    testCase.assertReplaceTag("samp", "span");
    testCase.assertReplaceTag("article", "div");
    testCase.assertReplaceTag("menu", "ul");
    testCase.assertReplaceTag("ins", "span");
    testCase.assertReplaceTag("header", "div");
    testCase.assertReplaceTag("optgroup", "span");
    testCase.assertReplaceTag("ruby", "span");
    testCase.assertReplaceTag("sub", "span");
    testCase.assertReplaceTag("table", "p");
    testCase.assertReplaceTag("tr", "p");
    testCase.assertReplaceTag("td", "span");
    testCase.assertReplaceTag("th", "span");
    testCase.assertReplaceTag("h1", "h3");
    testCase.assertReplaceTag("h2", "h3");
    testCase.assertReplaceTag("h4", "h3");
    testCase.assertReplaceTag("h5", "h3");
    testCase.assertReplaceTag("h6", "h3");
    testCase.assertReplaceTag("tbody", "span");

    testCase.assertRemoveTag("applet");
    testCase.assertRemoveTag("area");
    testCase.assertRemoveTag("base");
    testCase.assertRemoveTag("basefont");
    testCase.assertRemoveTag("bgsound");
    testCase.assertRemoveTag("command");
    testCase.assertRemoveTag("canvas");
    testCase.assertRemoveTag("col");
    testCase.assertRemoveTag("colgroup");
    testCase.assertRemoveTag("comment");
    testCase.assertRemoveTag("strike");
    testCase.assertRemoveTag("title");
    //testCase.assertRemoveTag("iframe");
    testCase.assertRemoveTag("br");
    testCase.assertRemoveTag("noframes");
    testCase.assertRemoveTag("head");
    testCase.assertRemoveTag("object");
    testCase.assertRemoveTag("track");
    testCase.assertRemoveTag("wbr");
    testCase.assertRemoveTag("noscript");
    testCase.assertRemoveTag("svg");
    testCase.assertRemoveTag("input");
    testCase.assertRemoveTag("keygen");
    testCase.assertRemoveTag("meta");
    testCase.assertRemoveTag("isindex");
    testCase.assertRemoveTag("video");
    testCase.assertRemoveTag("spacer");
    testCase.assertRemoveTag("source");
    testCase.assertRemoveTag("frame");
    testCase.assertRemoveTag("del");
    testCase.assertRemoveTag("style");
    testCase.assertRemoveTag("device");
    testCase.assertRemoveTag("embed");
    testCase.assertRemoveTag("noembed");
    testCase.assertRemoveTag("xml");
    testCase.assertRemoveTag("param");
    testCase.assertRemoveTag("nextid");
    testCase.assertRemoveTag("audio");
    testCase.assertRemoveTag("link");
    testCase.assertRemoveTag("script");
    testCase.assertRemoveTag("frameset");

    testCase.assertEmptyRule("b");
    testCase.assertEmptyRule("code");
    testCase.assertEmptyRule("cite");
    testCase.assertEmptyRule("em");
    testCase.assertEmptyRule("ul");
    testCase.assertEmptyRule("li");
    testCase.assertEmptyRule("i");
    testCase.assertEmptyRule("strong");
    testCase.assertEmptyRule("span");
    testCase.assertEmptyRule("ol");
    testCase.assertEmptyRule("pre");
    //testCase.assertEmptyRule("p");
    testCase.assertEmptyRule("h3");
    testCase.assertEmptyRule("blockquote");

    testCase.assertSetAttributes("a", {
      "rel": "nofollow",
      "target": "_blank"
    });
    testCase.assertAttributesValues("a", {
      "href": "href"
    });
    testCase.assertAttributesValues("img", {
      "width": "numbers",
      "alt": "alt",
      "src": "src",
      "height": "numbers"
    });
    testCase.assertAttributesValues("q",  {
      "cite": "url"
    });

    testCase.assertSetClass("big", "wysiwyg-font-size-larger");
    testCase.assertSetClass("center", "wysiwyg-text-align-center");
    testCase.assertSetClass("small", "wysiwyg-font-size-smaller");
    testCase.assertSetClass("hr", "period-divider");
    testCase.assertAddClass("caption", {
      "align": "align_text"
    });
    testCase.assertAddClass("img", {
      "align": "align_img"
    });
    testCase.assertAddClass("tfoot", {
      "align": "align_text"
    });
    testCase.assertAddClass("font", {
      "size": "size_font"
    });
    testCase.assertAddClass("thead", {
      "align": "align_text"
    });



    testCase.assertNodeParserRule(tags, 'a', 'WWW.GOOGLE.COM', 'www.google.com');
    testCase.assertNodeParserRule(tags, 'a', 'WWW . GOOGLE . COM', 'www.google.com');

    testCase.assertNodeParserRule(tags, 'p', 'um texto de teste', 'um texto de teste.');
    testCase.assertNodeParserRule(tags, 'p', 'um texto de teste!', 'um texto de teste!');
    testCase.assertNodeParserRule(tags, 'p', '...um texto de teste!', '(...)um texto de teste!');

    var denyRules = parseRules.deny;

    testCase.assertDenyRule(denyRules[0], [
      'Um texto com  espaços extras',
      "     Um texto     com muuuuitos       espaços extras          "
    ], true);

    testCase.assertDenyRule(denyRules[1], [
      'Um texto com espaços antes de pontuação .',
      'Um texto com espaços antes de pontuação !',
      'Um texto com espaços antes de pontuação ?',
      'Um texto com espaços antes de pontuação ;',
      'Um texto com espaços antes de pontuação :',
      'Um texto com espaços antes de pontuação ,'
    ], true);

    testCase.assertDenyRule(denyRules[2], [
      "Um texto com espaços no fim da linha \n"
    ], true);

    testCase.assertDenyRule(denyRules[3], ["" +
      "Um texto com muita exclamação!!!!!!!!",
      "Um texto com muita interrogação??????",
      "Um texto com muita exclamação! ! ! ! ! ! ! !",
      "Um texto com muita interrogação? ? ? ? ? ? ",
      "Um texto com muita interrogação e exclamação !?!?!???",
      "Um texto com muita interrogação e exclamação ?!?!?!?!?!!!!"
    ], true);

    testCase.assertDenyRule(denyRules[4], [
      "Um texto com muita pontuação .....",
      "Um texto com muita pontuação ,,,,,",
      "Um texto com muita pontuação :::::",
      "Um texto com muita pontuação :,",
      "Um texto com muita pontuação .,",
      "Um texto com muita pontuação ,.",
      "Um texto com muita pontuação ;.",
      "Um texto com muita pontuação ;:"
    ], true);

    testCase.assertDenyRule(denyRules[5], [
      "Um texto com muitos símbolos @@@@@@@@",
      "Um texto com muitos símbolos @&&",
      "Um texto com muitos símbolos &&&&",
      "Um texto com muitos símbolos ****",
      "Um texto com muitos símbolos %%%%",
      "Um texto com muitos símbolos -----",
      "Um texto com muitos símbolos #####",
      "Um texto com muitos símbolos $$$$$",
      "Um texto com muitos símbolos @&$%+-",
      "Um texto com muitos símbolos +++++"
    ], true);


    var fixRules = parseRules.fix;

    testCase.assertFixRule(fixRules[0], [
      {
        text:'Olá,',
        input:'e',
        expec:'Olá, e'
      },
      {
        text:'Olá',
        input:',',
        expec:'Olá, '
      }
    ]);

    testCase.assertFixRule(fixRules[1], [
      {
        text:'http:,',
        input:'/',
        expec:'http:/'
      },
      {
        text:'E foi assim:',
        input:'J',
        expec:'E foi assim: J'
      },
      {
        text:'E foi assim',
        input:':',
        expec:'E foi assim: '
      }
    ]);

    testCase.assertFixRule(fixRules[2], [
      {
        text:'Olá!',
        input:'e',
        expec:'Olá! E'
      },
      {
        text:'Olá',
        input:'!',
        expec:'Olá! '
      },
    ]);

    testCase.assertFixRule(fixRules[3], [
      {
        text:'Olá. ',
        input:'e',
        expec:'Olá. E'
      },
      {
        text:'Olá! ',
        input:'e',
        expec:'Olá! E'
      },
      {
        text:'Olá? ',
        input:'e',
        expec:'Olá? E'
      },
    ]);

    var parserRules = parseRules.parser;

    var text = " este é um texto com muitos erros.Alguns bem grosseiros .Outros , nem tanto,nem tão pouco . Espaços    repetidos !!!! acredita???? Símbolos @@@@ repetidos .... muitos deles várias vezes ";
    var expec = "Este é um texto com muitos erros. Alguns bem grosseiros. Outros, nem tanto, nem tão pouco. Espaços repetidos! Acredita? Símbolos @ repetidos... Muitos deles várias vezes"

    testCase.assertParserRules(parserRules, text, expec);

  });
});
