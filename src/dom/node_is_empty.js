/**
 * Checks if a given node is an empty node or not
 *
 *
 */
wysihtml5.dom.nodeIsEmpty = (function(){
  var ALLOWED_EMPTY_NODES_REGEX = new RegExp("\<img|\<iframe|\<video|\<hr|\<canvas",'i');

  /**
   * @return boolean
   */
  return function(node){
    var innerHTML = node.innerHTML;
    var innerText = wysihtml5.dom.getTextContent(node);

    return (innerText.replace(/\s/g,'').length == 0) && (innerHTML !== undefined && !ALLOWED_EMPTY_NODES_REGEX.test(innerHTML));
  }
})();
