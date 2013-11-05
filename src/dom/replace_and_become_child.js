/**
 * Takes an element, replaces it by a given node and inserts that element as it's child
 *
 * @param {Node} oldNode The node which is going to be replaced with the newNode
 * @param {Node} newNode The node which the oldNode is going to be inserted in
 */
wysihtml5.dom.replaceAndBecomeChild = function(oldNode, newNode) {
  if (!oldNode.parentNode) {
    return;
  }
  var parentNode = oldNode.parentNode;
  /*var fragment = newNode.ownerDocument.createDocumentFragment();
  fragment.appendChild(oldNode);*/
  parentNode.replaceChild(newNode, oldNode);
  newNode.appendChild(oldNode);

  return newNode;
};
