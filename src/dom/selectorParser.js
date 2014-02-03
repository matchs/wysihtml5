/**
 * [description]
 * @return {[type]} [description]
 */
wysihtml5.dom.selectorParser = {}
wysihtml5.dom.selectorParser.parse = (function(){
 	var self = wysihtml5.dom.selectorParser;
	/**
	 * [_actions description]
	 * @type {Object}
	 */
	self._actions = {}
	self._actions.rename_tag = function(oldElement, tag) {
		return wysihtml5.dom.renameElement(oldElement, tag);
	}

	/**
	 * [remove description]
	 * @param  {[type]} oldElemnt [description]
	 * @param  {[type]} param     [description]
	 * @return {[type]}           [description]
	 */
	self._actions.remove = function(oldElemnt, param) {
		if(oldElement.parentNode)
			oldElement.parentNode.removeChild(oldElement);
	}


	/**
	 * [_convertToFragment description]
	 * @param  {[type]} element [description]
	 * @return {[type]}         [description]
	 */
	self._convertToFragment = function(element) {
		var frag = element.ownerDocument.createDocumentFragment()
		frag.appendChild(element.cloneNode(true));
		return frag;
	}


	/**
	 * [parse description]
	 * @param  {[type]} element [description]
	 * @param  {[type]} rules   [description]
	 * @return {[type]}         [description]
	 */
	function parse(element, rules){
		var frag = self._convertToFragment(element);

		for(var rule in rules){
			var selectors = frag.querySelectorAll(rule);
			for(var i = selectors.length - 1; i >= 0; i--){
		        var currElement = selectors[i];		
		        for(var action in rules[rule]){
		        	self._actions[action](currElement, rules[rule][action]);
		    	}
		    }
		}
		return frag.firstChild.innerHTML;
	}

	return parse;
})();


