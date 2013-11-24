/**
 * Text Parser
 * Parses the text in a given node based on a given set of rules
 *
 *
 * @author Mateus Chagas (contato@mateuschagas.com.br) (http://github.com/matchs)
 */
wysihtml5.dom.textParser = {};
wysihtml5.dom.textParser.TEXT_PLACEMENT_MARKUP = '__#txt__';
wysihtml5.dom.textParser.TEXT_PLACEMENT_MARKUP_REGEX = new RegExp(wysihtml5.dom.textParser.TEXT_PLACEMENT_MARKUP+'$', 'gi');

/**
 * Wrote my own fold function.Didn't use native map or filter for old browser compatibility sake
 *
 *
 * @param nodeSet
 * @param accum The initial value for folding
 * @param func
 * @returns {*}
 */
wysihtml5.dom.textParser.foldNodes = function (nodeSet, accum, func) {
  return (nodeSet && nodeSet.length > 0) ?
    this.foldNodes(nodeSet.slice(1, nodeSet.length), func(accum, nodeSet[0]), func) : accum;
};

/**
 * Applies different processing functions depending on the node type
 *
 * @param node
 * @param elementProcessor Function to be executed in case of the node being an elementNode
 * @param textProcessor Function to be executed in of the node being a text node
 * @returns {*}
 */
wysihtml5.dom.textParser.processNode = function(node, elementProcessor, textProcessor){
  switch(node.nodeType){
    case 1: // ELEMENT NODE
      return elementProcessor(node);
    case 3: // #TEXT-NODE
      return textProcessor(node);
  }
};

/**
 * Extracts the text from a given node added of a separator markup for each #text-node
 *
 * Ex.: <p> foo, bar baz <a href="http://www.sanger.dk">duh, dah, daz</a>
 * will return foo, bar baz__#txt__duh, dah, daz__#txt__
 *
 * @param node
 * @returns string
 */
wysihtml5.dom.textParser.extractText = function(node){
  var that = this;
  return that.processNode(node, function(cnode){
    return that.foldNodes([].slice.call(cnode.childNodes, 0), '', function(text, currNode){
      return text + that.extractText(currNode);
    });
  }, function(cnode){
    return cnode.textContent + that.TEXT_PLACEMENT_MARKUP;
  });
};

/**
 * Returns a string with placement markups of the text nodes in a given node
 *
 * Ex.: <p> foo, bar baz <a href="http://www.sanger.dk">duh, dah, daz</a>
 * will return <p>__#txt__<a href="http://www.sanger.dk">__#txt__</a></p>
 *
 * @param node
 * @returns string
 */
wysihtml5.dom.textParser.extractNodeMarkup = function(node){
  var that = this;

  return that.processNode(node, function(node){
    return that.getNodeMarkupGuts(node);
  }, function(node){
    return that.TEXT_PLACEMENT_MARKUP;
  });
};

/**
 *
 * @param node
 * @returns {string}
 */
wysihtml5.dom.textParser.getNodeMarkupGuts = function(node){
  var that = this,
      attr = node.attributes.length > 0 ? node.outerHTML.match(/ .*?(?=>)/)[0] : '';

  return !node.firstChild ? '<' + node.nodeName.toLowerCase() + attr + '>'
    : '<' + node.nodeName.toLowerCase() + attr + '>' + (function(){
      return that.foldNodes([].slice.call(node.childNodes, 0), '', function(text, currNode){
        return text + that.extractNodeMarkup(currNode);
      });
    })() + '</' + node.nodeName.toLowerCase() + '>';
}

/**
 * Applies the rules to a given string
 *
 * @param text
 * @param rules
 * @returns {*}
 */
wysihtml5.dom.textParser.applyRules = function(text, rules){
  var that = this;
  return (rules && rules.length > 0) ?
    that.applyRules(text.replace(rules[0].rule, rules[0].replace), rules.slice(1, rules.length)) : text;
};


/**
 * Parses the innerText of a given node according to a given set of rules but preserving its sub-nodes
 *
 * @param node
 * @param rules
 * @returns String Node's innerHTML after applying the rules
 */
wysihtml5.dom.textParser.parse = function(node, rules){
    var that = this;

    /** It's not elegant, I know =(. But it's easier to make it without having to iterate over the node twice. */
    var templateText = '';
    var wholeText = that.foldNodes([].slice.call(node.childNodes, 0), '', function(accum, currNode){
      templateText += that.extractNodeMarkup(currNode);
      return accum + that.extractText(currNode);
    });

    //Replacing the text back in its original position
    return (function foldTokens(tokenSet, template){
      return (tokenSet && tokenSet.length > 0) ?
        foldTokens(tokenSet.slice(1, tokenSet.length), template.replace(that.TEXT_PLACEMENT_MARKUP, tokenSet[0])) : template;

    })(that.applyRules(wholeText.replace(that.TEXT_PLACEMENT_MARKUP_REGEX,''), rules)//Applying the rules to the text
      .split(that.TEXT_PLACEMENT_MARKUP), templateText);//Aplitting the resulting string
};