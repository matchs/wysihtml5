var wysihtml5ParserRules = {
  // More info about the parser rules in `wysihtml5_parser_sample.js` file.
  "classes": {
    "period-divider": 1
  },
  "tags": {
    "a": {
      "check_attributes": {
        "href": "href"
      },
      "set_attributes": {
        "rel": "nofollow",
        "target": "_blank"
      }
    },
    "abbr": {
      "rename_tag": "span"
    },
    "acronym": {
      "rename_tag": "span"
    },
    "address": {
      "rename_tag": "div"
    },
    "applet": {
      "remove": 1
    },
    "area": {
      "remove": 1
    },
    "b": {},
    "base": {
      "remove": 1
    },
    "basefont": {
      "remove": 1
    },
    "bdi": {
      "rename_tag": "span"
    },
    "bdo": {
      "rename_tag": "span"
    },
    "bgsound": {
      "remove": 1
    },
    "big": {
      "rename_tag": "span",
      "set_class": "wysiwyg-font-size-larger"
    },
    "blockquote": {},
    "blink": {
      "rename_tag": "span"
    },
    "body": {
      "rename_tag": "div"
    },
    "br": {
      "remove": 1
    },
    "button": {
      "rename_tag": "span"
    },
    "code": {},
    "command": {
      "remove": 1
    },
    "caption": {
      "add_class": {
        "align": "align_text"
      }
    },
    "canvas": {
      "remove": 1
    },
    "center": {
      "rename_tag": "div",
      "set_class": "wysiwyg-text-align-center"
    },
    "col": {
      "remove": 1
    },
    "cite": {},
    "colgroup": {
      "remove": 1
    },
    "comment": {
      "remove": 1
    },
    "details": {
      "rename_tag": "div"
    },
    "dir": {
      "rename_tag": "ul"
    },
    "div": {
      "rename_tag": "p"
    },
    "em": {},
    "tr": {
      "rename_tag": "p"
    },
    "strike": {
      "remove": 1
    },
    "form": {
      "rename_tag": "div"
    },
    "rt": {
      "rename_tag": "span"
    },
    "title": {
      "remove": 1
    },
    "multicol": {
      "rename_tag": "div"
    },
    "figure": {
      "rename_tag": "div"
    },
    "xmp": {
      "rename_tag": "span"
    },
    "small": {
      "rename_tag": "span",
      "set_class": "wysiwyg-font-size-smaller"
    },
    "time": {
      "rename_tag": "span"
    },
    "ul": {},
    "progress": {
      "rename_tag": "span"
    },
    "dfn": {
      "rename_tag": "span"
    },
    "iframe": {
      "check_attributes":{
        "src":"url",
        "width":"numbers",
        "height":"numbers"
      }
    },
    "figcaption": {
      "rename_tag": "div"
    },
    "img": {
      "check_attributes": {
        "width": "numbers",
        "alt": "alt",
        "src": "src",
        "height": "numbers"
      },
      "add_class": {
        "align": "align_img"
      }
    },
    "rb": {
      "rename_tag": "span"
    },
    "footer": {
      "rename_tag": "div"
    },
    "noframes": {
      "remove": 1
    },
    "u": {
      "rename_tag": "span"
    },
    "sup": {
      "rename_tag": "span"
    },
    "nav": {
      "rename_tag": "div"
    },
    "h1": {
      "rename_tag": "h3"
    },
    "h2": {
      "rename_tag": "h3"
    },
    "h3": {},
    "h4": {
      "rename_tag": "h3"
    },
    "h5": {
      "rename_tag": "h3"
    },
    "h6": {
      "rename_tag": "h3"
    },
    "head": {
      "remove": 1
    },
    "tbody": {
      "rename_tag": "span"
    },
    "dd": {
      "rename_tag": "div"
    },
    "s": {
      "rename_tag": "span"
    },
    "li": {},
    "td": {
      "rename_tag": "span"
    },
    "object": {
      "remove": 1
    },
    "option": {
      "rename_tag": "span"
    },
    "select": {
      "rename_tag": "span"
    },
    "i": {},
    "track": {
      "remove": 1
    },
    "wbr": {
      "remove": 1
    },
    "fieldset": {
      "rename_tag": "div"
    },
    "noscript": {
      "remove": 1
    },
    "svg": {
      "remove": 1
    },
    "input": {
      "remove": 1
    },
    "table": {
      "rename_tag": "p"
    },
    "keygen": {
      "remove": 1
    },
    "meta": {
      "remove": 1
    },
    "map": {
      "rename_tag": "div"
    },
    "isindex": {
      "remove": 1
    },
    "mark": {
      "rename_tag": "span"
    },
    "tfoot": {
      "add_class": {
        "align": "align_text"
      }
    },
    "video": {
      "remove": 1
    },
    "strong": {},
    "output": {
      "rename_tag": "span"
    },
    "marquee": {
      "rename_tag": "span"
    },
    "q": {
      "check_attributes": {
        "cite": "url"
      }
    },
    "span": {},
    "rp": {
      "rename_tag": "span"
    },
    "spacer": {
      "remove": 1
    },
    "source": {
      "remove": 1
    },
    "aside": {
      "rename_tag": "div"
    },
    "frame": {
      "remove": 1
    },
    "section": {
      "rename_tag": "div"
    },
    "ol": {},
    "nobr": {
      "rename_tag": "span"
    },
    "html": {
      "rename_tag": "div"
    },
    "summary": {
      "rename_tag": "span"
    },
    "var": {
      "rename_tag": "span"
    },
    "del": {
      "remove": 1
    },
    "style": {
      "remove": 1
    },
    "device": {
      "remove": 1
    },
    "meter": {
      "rename_tag": "span"
    },
    "textarea": {
      "rename_tag": "span"
    },
    "embed": {
      "remove": 1
    },
    "hgroup": {
      "rename_tag": "div"
    },
    "font": {
      "rename_tag": "span",
      "add_class": {
        "size": "size_font"
      }
    },
    "tt": {
      "rename_tag": "span"
    },
    "noembed": {
      "remove": 1
    },
    "thead": {
      "add_class": {
        "align": "align_text"
      }
    },
    "plaintext": {
      "rename_tag": "span"
    },
    "xml": {
      "remove": 1
    },
    "param": {
      "remove": 1
    },
    "th": {
      "rename_tag": "span"
    },
    "legend": {
      "rename_tag": "span"
    },
    "hr": {
      "set_class": "period-divider"
    },
    "label": {
      "rename_tag": "span"
    },
    "dl": {
      "rename_tag": "div"
    },
    "kbd": {
      "rename_tag": "span"
    },
    "listing": {
      "rename_tag": "div"
    },
    "dt": {
      "rename_tag": "span"
    },
    "nextid": {
      "remove": 1
    },
    "pre": {},
    "audio": {
      "remove": 1
    },
    "datalist": {
      "rename_tag": "span"
    },
    "samp": {
      "rename_tag": "span"
    },
    "article": {
      "rename_tag": "div"
    },
    "link": {
      "remove": 1
    },
    "script": {
      "remove": 1
    },
    "menu": {
      "rename_tag": "ul"
    },
    "ins": {
      "rename_tag": "span"
    },
    "p": {},
    "frameset": {
      "remove": 1
    },
    "header": {
      "rename_tag": "div"
    },
    "optgroup": {
      "rename_tag": "span"
    },
    "ruby": {
      "rename_tag": "span"
    },
    "sub": {
      "rename_tag": "span"
    }
  },

  /**
   * HTML Sanitizer rules using CSS selectors. 
   * For now only the 'rename_tag' and 'remove' actions are supproted
   */
  "selectors" :{
      "body>div, blockquote>div":{
        "rename_tag":'p'
      },
      "p>p":{
        "rename_tag":'p'
      },
      "div>div":{
        "rename_tag":'p'
      }
  },

  /**
   * What to to with root text nodes. body > #text or blockquote > #text
   * Ommit in case of doing nothing
   */
  'root_text_nodes':'p',

  /**
   * Preserve rules. Matching texts to this rule won't be affected by the text parser.
   * Can be used to preserve urls, e-mail, credit card numbers etc
   * It's mandatory to be a regular or not be declared
   */
  "preserve" : /((https?:\/\/|www\.)[^\s<]{3,}\.[^\s]{2,})|(\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b)|(\b([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25}\b)|(\d{2}.?\d{3}.?\d{3}\/?\d{4}-?\d{2})|(\d{3}\.\d{3}\.\d{3}-\d{2})|(^\d{3}\d{3}\d{3}\d{2})/gi,

  /**
   * Text parsing patterns
   *
   * Used to automatically parse pasted or pre-loaded texts within the editor
   *
   *  - rule: A regular expression used to be matched over the whole text that's being inserted within the editor.
   *  - replace: A string or filtering function. The function receives the matched string and must return a transformation over it.
   *             The string supports backreferencing for the matched pattern/rule.
   */
  "parser": [
    {
      "rule": /^\s+|\s+$|\,$/g,
      "replace": function(txt){return ""}
    },
    {
      "rule": /\s{2,}/g,
      "replace": " "
    },
    {
      "rule": /[\.!?][a-zçáàéèíìóòúùñãõüïâêîôû]/gi,
      "replace": function (txt) {
        return txt[0] + ' ' + txt[1].toUpperCase();
      }
    },
    {
      "rule": /[\.!?][\u00a0\t\ ][a-zçáàéèíìóòúùñãõüïâêîôû]/g,
      "replace": function (txt) {
        return txt.toUpperCase();
      }
    },
    {
      "rule": /\s\,/g,
      "replace": ","
    },
    {
      "rule": /[,]\S/g,
      "replace": function(txt){
        return txt[0] + ' ' + txt[1];
      }
    },
    {
      "rule": /!{2,}/g,
      "replace": "!"
    },
    {
      "rule": /\?{2,}/g,
      "replace": "?"
    },
    {
      "rule": /([!?]([\u00a0\t\ ]+[!?.,:;])+)/g,
      "replace": function (txt) {
        return txt[0];
      }
    },
    {
      "rule": /(!\?|\?!)[!?]+/g,
      "replace": "!?"
    },
    {
      "rule": /\.{4,}/g,
      "replace": '...'
    },
    {
      "rule": /^\.\.\./g,
      "replace": "($&)"
    },
    {
      "rule": /[.!?][\u00a0\t\ ]\S/g,
      "replace": function (txt) {
        return txt.toUpperCase();
      }
    },
    {
      "rule": /[@&*%&#+-]{2,}/g,
      "replace": function(txt){
        return txt[0];
      }
    },
    {
      "rule": /[,:;][a-zçáàéèíìóòúùñãõüïâêîôû]/g,
      "replace": function(txt){
        return txt[0] + ' ' + txt[1];
      }
    },
    {
      "rule": /\s+[.,;:!?]/g,
      "replace": function(txt){
        return txt[txt.length - 1];
      }
    },
    {
      "rule": /^[a-zçáàéèíìóòúùñãõüïâêîôû]/g,
      "replace": function (txt) {
        return txt.toUpperCase();
      }
    },
    {
      "rule": /[^!?:;.]$/gmi,
      "replace": "$&."
    }
  ],

  /**
   * Deny patterns
   *
   * Used to avoid such patterns to being written in the editor
   *
   *  - rule: A regular expression to be matched with the future resulting text around the caret position.
   *  - message: A message to be sent through an event. Can be used to warn the user about mistypes etc.
   */
  "deny": [
    {
      "rule": /[\u00a0\t\ ]{2,}/gi,
      "msg": "Avoid using extra spaces"
    },
    {
      "rule": /[\u00a0\t\ ][.,:;!?]/gmi,
      "msg": "Avoid white spaces before punctuation"
    },
    {
      "rule": /[\u00a0\t\ ]+\n/img,
      "msg": "Avoid empty spaces at the end of line"
    },
    {
      "rule": /(\?{2,}|!{2,}|!\?[!?]+|\?![!?]+)|([!?](\s+[!?.,:;])+)/g,
      "msg": "Avoid using too much ! or ?"
    },
    {
      "rule": /(\.([,:;!?]+|\.{3,}))|([,:;][.,:;!?]+)|([.,:;](\s+[.,:;!?])+)|([!?]\s*[.,:;])/g,
      "msg": "Avoid excessive punctuation"
    },
    {
      "rule": /[@&*%$#+-]{2,}/g,
      "msg": "Avoid excessive usage of symbols"
    }
  ],

  /**
   * Auto-fix or auto-correct patterns
   *
   * Used to provide patterns in order to automatically correct them while the text is typed bu the user
   *
   *  - rule: A regular expression that matches text around the caret
   *  - fix:  A function that receives char that's being inputted and returns a transformation over it
   *
   */
  "fix": [
    {
      "rule": /[,;]\S/i,//Punctuation followed by any non-whitespace character
      "fix": function (char) {
        if (/[,;]/.test(char)) {
          return char + ' ';
        } else {
          return ' ' + char;
        }
      }
    },
    {
      "rule": /:\S/i,//Inserting white-space after : only if not http:// case
      "fix": function (char) {
        if (char == ':') {
          return char + ' ';
        } else {
          return ' ' + char;
        }
      }
    },
    {
      "rule": /[.][\u00a0\t\ ][a-zçáàéèíìóòúùñãõüïâêîôû]/,//Period followed by any non-whitespace character
      "fix": function (char) {
        return char.toUpperCase();
      }

    },
    {
      "rule": /[!?][\u00a0\t\ ][a-zçáàéèíìóòúùñãõüïâêîôû]?/,//Period followed by any non-whitespace character
      "fix": function (char) {
        return char.toUpperCase();
      }

    }
  ]
};
