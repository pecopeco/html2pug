import parsehtml from 'parsehtml'

export var scope = {}

var Converter, Output, Parser, StreamOutput, StringOutput, Writer, applyOptions, entOptions, isValidJadeClassName, isValidJadeId, nspaces, useTabs, validJadeClassRegExp, validJadeIdRegExp,
__hasProp = {}.hasOwnProperty,
__extends = function(child, parent) {
  for (var key in parent) {
    if (__hasProp.call(parent, key)) child[key] = parent[key]
  } function ctor() {
    this.constructor = child
  }
  ctor.prototype = parent.prototype
  child.prototype = new ctor()
  child.__super__ = parent.prototype
  return child
}

nspaces = 2

useTabs = false

entOptions = {
  useNamedReferences: true
}

validJadeIdRegExp = /^[\w-]+$/

validJadeClassRegExp = /^[\w-]+$/

Parser = (function() {
  function Parser(options) {
    this.options = options != null ? options : {}
  }

  Parser.prototype.parse = function(arg, cb) {
    var window
    if (!arg) {
      return cb('null file')
    } else {
      window = {}
      window.document = parsehtml(arg)
      return cb(null, window)
    }
  }

  return Parser

})()

isValidJadeId = function(id) {
  id = id ? id.trim() : ""
  return id && validJadeIdRegExp.test(id)
}

isValidJadeClassName = function(className) {
  className = className ? className.trim() : ""
  return className && validJadeClassRegExp.test(className)
}

Writer = (function() {
  function Writer(options) {
    var _ref, _ref1, _ref2
    if (options == null) {
      options = {}
    }
    this.wrapLength = (_ref = options.wrapLength) != null ? _ref : 80
    this.scalate = (_ref1 = options.scalate) != null ? _ref1 : false
    this.attrSep = this.scalate || options.noattrcomma ? ' ' : ', '
    if (options.double) {
      this.attrQuote = '"'
      this.nonAttrQuote = "'"
    } else {
      this.attrQuote = '"'
      this.nonAttrQuote = '"'
    }
    this.attrQuoteEscaped = "\\" + this.attrQuote
    this.noEmptyPipe = (_ref2 = options.noemptypipe) != null ? _ref2 : false
  }

  Writer.prototype.tagHead = function(node) {
    var result, validClassNames
    result = node.tagName !== 'DIV' ? node.tagName.toLowerCase() : ''
    if (node.id && isValidJadeId(node.id)) {
      result += "#" + node.id
    }
    if (node.hasAttribute('class') && node.getAttribute('class').length > 0) {
      validClassNames = node.getAttribute('class').split(/\s+/).filter(function(item) {
        return item && isValidJadeClassName(item)
      })
      result += '.' + validClassNames.join('.')
    }
    if (result.length === 0) {
      result = 'div'
    }
    return result
  }

  Writer.prototype.tagAttr = function(node, indents) {
    var attr, attrName, attrValue, attrs, invalidClassNames, result, _i, _len
    if (indents == null) {
      indents = ''
    }
    attrs = node.attributes
    if (!attrs || attrs.length === 0) {
      return ''
    } else {
      result = []
      for (_i = 0, _len = attrs.length; _i < _len; _i++) {
        attr = attrs[_i]
        if (attr && attr.nodeName) {
          attrName = attr.nodeName
          attrValue = attr.nodeValue
          if (attrName === 'id' && isValidJadeId(attrValue)) {
            continue
          } else if (attrName === 'class') {
            invalidClassNames = node.getAttribute('class').split(/\s+/).filter(function(item) {
              return item && !isValidJadeClassName(item)
            })
            if (invalidClassNames.length > 0) {
              result.push(this.buildTagAttr(attrName, invalidClassNames.join(' ')))
            }
          } else {
            attrValue = attrValue.replace(/(\r|\n)\s*/g, "\\$1" + indents)
            result.push(this.buildTagAttr(attrName, attrValue))
          }
        }
      }
      if (result.length > 3) {
        return "(\n" + '  ' + indents + (result.join('\n' + '  ' + indents)) + "\n" + indents + ")"
      } else if (result.length > 0) {
        return "(" + (result.join(' ')) + ")"
      } else {
        return ''
      }
    }
  }

  Writer.prototype.buildTagAttr = function(attrName, attrValue) {
    if (attrName && !attrValue) {
      return attrName
    } else if (attrValue.indexOf(this.attrQuote) === -1) {
      return attrName + "=" + this.attrQuote + attrValue + this.attrQuote
    } else if (attrValue.indexOf(this.nonAttrQuote) === -1) {
      return attrName + "=" + this.nonAttrQuote + attrValue + this.nonAttrQuote
    } else {
      attrValue = attrValue.replace(new RegExp(this.attrQuote, 'g'), this.attrQuoteEscaped)
      return attrName + "=" + this.attrQuote + attrValue + this.attrQuote
    }
  }

  Writer.prototype.tagText = function(node) {
    var data, _ref
    if (((_ref = node.firstChild) != null ? _ref.nodeType : void 0) !== 3) {
      return null
    } else if (node.firstChild !== node.lastChild) {
      return null
    } else {
      data = node.firstChild.data
      if (data.length > this.wrapLength || data.match(/\r|\n/)) {
        return null
      } else {
        return data
      }
    }
  }

  Writer.prototype.forEachChild = function(parent, cb) {
    var child, _results
    if (parent) {
      child = parent.firstChild
      _results = []
      while (child) {
        cb(child)
        _results.push(child = child.nextSibling)
      }
      return _results
    }
  }

  Writer.prototype.writeTextContent = function(node, output, options) {
    var _this = this
    output.enter()
    this.forEachChild(node, function(child) {
      return _this.writeText(child, output, options)
    })
    return output.leave()
  }

  Writer.prototype.writeText = function(node, output, options) {
    var data, lines,
      _this = this
    if (node.nodeType === 3) {
      data = node.data || ''
      if (data.length > 0) {
        lines = data.split(/\r|\n/)
        return lines.forEach(function(line) {
          return _this.writeTextLine(node, line, output, options)
        })
      }
    }
  }

  Writer.prototype.writeTextLine = function(node, line, output, options) {
    var escapeBackslash, lines, pipe, prefix, wrap, _ref, _ref2, _ref4, _ref5, _ref6,
      _this = this
    if (options == null) {
      options = {}
    }
    pipe = (_ref = options.pipe) != null ? _ref : true
    wrap = (_ref2 = options.wrap) != null ? _ref2 : true
    escapeBackslash = (_ref4 = options.escapeBackslash) != null ? _ref4 : false
    if (pipe && this.noEmptyPipe && line.trim().length === 0) {
      return
    }
    prefix = pipe ? '| ' : ''
    if ((node != null ? (_ref5 = node.previousSibling) != null ? _ref5.nodeType : void 0 : void 0) !== 1) {
      line = line.trimLeft()
    }
    if ((node != null ? (_ref6 = node.nextSibling) != null ? _ref6.nodeType : void 0 : void 0) !== 1) {
      line = line.trimRight()
    }
    if (line) {
      if (line.match(/^[ ]*$/)) {
        return
      }
      if (escapeBackslash) {
        line = line.replace("\\", "\\\\")
      }
      if (!wrap || line.length <= this.wrapLength) {
        return output.writeln(prefix + line)
      } else {
        lines = this.breakLine(line)
        if (lines.length === 1) {
          return output.writeln(prefix + line)
        } else {
          return lines.forEach(function(line) {
            return _this.writeTextLine(node, line, output, options)
          })
        }
      }
    }
  }

  Writer.prototype.breakLine = function(line) {
    var lines, word, words
    if (!line || line.length === 0) {
      return []
    }
    if (line.search(/\s+/ === -1)) {
      return [line]
    }
    lines = []
    words = line.split(/\s+/)
    line = ''
    while (words.length) {
      word = words.shift()
      if (line.length + word.length > this.wrapLength) {
        lines.push(line)
        line = word
      } else if (line.length) {
        line += ' ' + word
      } else {
        line = word
      }
    }
    if (line.length) {
      lines.push(line)
    }
    return lines
  }

  return Writer

})()

Converter = (function() {
  function Converter(options) {
    var _ref, _ref1
    this.options = options != null ? options : {}
    this.scalate = (_ref = this.options.scalate) != null ? _ref : false
    this.writer = (_ref1 = this.options.writer) != null ? _ref1 : new Writer(this.options)
  }

  Converter.prototype.document = function(document, output) {
    var docTypeName, doctype
    if (document.doctype != null) {
      doctype = document.doctype
      docTypeName = void 0
      if ((doctype.name != null) && doctype.name.toLowerCase() === 'html') {
        docTypeName = 'html'
      }
      if (docTypeName != null) {
        output.writeln('doctype ' + docTypeName)
      }
    }
    if (document.documentElement) {
      return this.children(document, output, false)
    } else {
      return this.element(document, output)
    }
  }

  Converter.prototype.element = function(node, output) {
    var firstline, tagAttr, tagHead, tagName, tagText
    if (!(node != null ? node.tagName : void 0)) {
      return
    }
    tagName = node.tagName.toLowerCase()
    tagHead = this.writer.tagHead(node)
    tagAttr = this.writer.tagAttr(node, output.indents)
    tagText = this.writer.tagText(node)
    if (tagName === 'script' || tagName === 'style') {
      if (node.hasAttribute('src')) {
        output.writeln(tagHead + tagAttr)
        return this.writer.writeTextContent(node, output, {
          pipe: false,
          wrap: false
        })
      } else if (tagName === 'script') {
        return this.script(node, output, tagHead, tagAttr)
      } else if (tagName === 'style') {
        return this.style(node, output, tagHead, tagAttr)
      }
    } else if (tagName === 'conditional') {
      output.writeln('//' + node.getAttribute('condition'))
      return this.children(node, output)
    } else if (['pre'].indexOf(tagName) !== -1) {
      output.writeln(tagHead + tagAttr + '.')
      output.enter()
      firstline = true
      this.writer.forEachChild(node, function(child) {
        var data
        if (child.nodeType === 3) {
          data = child.data
          if ((data != null) && data.length > 0) {
            if (firstline) {
              if (data.search(/\r\n|\r|\n/) === 0) {
                data = data.replace(/\r\n|\r|\n/, '')
              }
              data = '\\n' + data
              firstline = false
            }
            data = data.replace(/\t/g, '\\t')
            data = data.replace(/\r\n|\r|\n/g, '\n' + output.indents)
            return output.write(data)
          }
        }
      })
      output.writeln()
      return output.leave()
    } else if (this.options.bodyless && (tagName === 'html' || tagName === 'body')) {
      return this.children(node, output, false)
    } else if (tagText) {
      return output.writeln(tagHead + tagAttr + ' ' + tagText)
    } else {
      output.writeln(tagHead + tagAttr)
      return this.children(node, output)
    }
  }

  Converter.prototype.children = function(parent, output, indent) {
    var _this = this
    if (indent == null) {
      indent = true
    }
    if (indent) {
      output.enter()
    }
    this.writer.forEachChild(parent, function(child) {
      var nodeType
      nodeType = child.nodeType
      if (nodeType === 1) {
        return _this.element(child, output)
      } else if (nodeType === 3) {
        if (parent._nodeName === 'code') {
          return _this.text(child, output, {
            pipe: true
          })
        } else {
          return _this.text(child, output, {})
        }
      } else if (nodeType === 8) {
        return _this.comment(child, output)
      }
    })
    if (indent) {
      return output.leave()
    }
  }

  Converter.prototype.text = function(node, output, options) {
    node.normalize()
    return this.writer.writeText(node, output, options)
  }

  Converter.prototype.comment = function(node, output) {
    var condition, data, lines,
      _this = this
    condition = node.data.match(/\s*\[(if\s+[^\]]+)\]/)
    if (!condition) {
      data = node.data || ''
      if (data.length === 0 || data.search(/\r|\n/) === -1) {
        return output.writeln("// " + (data.trim()))
      } else {
        output.writeln('//')
        output.enter()
        lines = data.split(/\r|\n/)
        lines.forEach(function(line) {
          return _this.writer.writeTextLine(node, line, output, {
            pipe: false,
            trim: true,
            wrap: false
          })
        })
        return output.leave()
      }
    } else {
      return this.conditional(node, condition[1], output)
    }
  }

  Converter.prototype.conditional = function(node, condition) {
    var conditionalElem, innerHTML
    innerHTML = node.textContent.trim().replace(/\s*\[if\s+[^\]]+\]>\s*/, '').replace('<![endif]', '')
    if (innerHTML.indexOf("<!") === 0) {
      condition = " [" + condition + "] <!"
      innerHTML = null
    }
    conditionalElem = node.ownerDocument.createElement('conditional')
    conditionalElem.setAttribute('condition', condition)
    if (innerHTML) {
      conditionalElem.innerHTML = innerHTML
    }
    return node.parentNode.insertBefore(conditionalElem, node.nextSibling)
  }

  Converter.prototype.script = function(node, output, tagHead, tagAttr) {
    if (this.scalate) {
      output.writeln(':javascript')
      return this.writer.writeTextContent(node, output, {
        pipe: false,
        wrap: false
      })
    } else {
      output.writeln("" + tagHead + tagAttr + ".")
      return this.writer.writeTextContent(node, output, {
        pipe: false,
        trim: true,
        wrap: false,
        escapeBackslash: true
      })
    }
  }

  Converter.prototype.style = function(node, output, tagHead, tagAttr) {
    if (this.scalate) {
      output.writeln(':css')
      return this.writer.writeTextContent(node, output, {
        pipe: false,
        wrap: false
      })
    } else {
      output.writeln("" + tagHead + tagAttr + ".")
      return this.writer.writeTextContent(node, output, {
        pipe: false,
        trim: true,
        wrap: false
      })
    }
  }

  return Converter

})()

Output = (function() {
  function Output() {
    this.indents = ''
  }

  Output.prototype.enter = function() {
    var _results
    if (useTabs) {
      return this.indents += '\t'
    } else {
      _results = []
      for (let _i = 1; 1 <= nspaces ? _i <= nspaces : _i >= nspaces; 1 <= nspaces ? ++_i : --_i) {
        _results.push(this.indents += ' ')
      }
      return _results
    }
  }

  Output.prototype.leave = function() {
    if (useTabs) {
      return this.indents = this.indents.substring(1)
    } else {
      return this.indents = this.indents.substring(nspaces)
    }
  }

  Output.prototype.write = function(data, indent) {
    if (indent == null) {
      indent = true
    }
  }

  Output.prototype.writeln = function(data, indent) {
    if (indent == null) {
      indent = true
    }
  }

  return Output

})()

StringOutput = (function(_super) {
  __extends(StringOutput, _super)

  function StringOutput() {
    StringOutput.__super__.constructor.apply(this, arguments)
    this.fragments = []
  }

  StringOutput.prototype.write = function(data, indent) {
    if (indent == null) {
      indent = true
    }
    if (data == null) {
      data = ''
    }
    if (indent) {
      return this.fragments.push(this.indents + data)
    } else {
      return this.fragments.push(data)
    }
  }

  StringOutput.prototype.writeln = function(data, indent) {
    if (indent == null) {
      indent = true
    }
    if (data == null) {
      data = ''
    }
    if (indent) {
      return this.fragments.push(this.indents + data + '\n')
    } else {
      return this.fragments.push(data + '\n')
    }
  }

  StringOutput.prototype.final = function() {
    var result
    result = this.fragments.join('')
    this.fragments = []
    return result
  }

  return StringOutput

})(Output)

StreamOutput = (function(_super) {
  __extends(StreamOutput, _super)

  function StreamOutput(stream) {
    this.stream = stream
    StreamOutput.__super__.constructor.apply(this, arguments)
  }

  StreamOutput.prototype.write = function(data, indent) {
    if (indent == null) {
      indent = true
    }
    if (data == null) {
      data = ''
    }
    if (indent) {
      return this.stream.write(this.indents + data)
    } else {
      return this.stream.write(data)
    }
  }

  StreamOutput.prototype.writeln = function(data, indent) {
    if (indent == null) {
      indent = true
    }
    if (data == null) {
      data = ''
    }
    if (indent) {
      return this.stream.write(this.indents + data + '\n')
    } else {
      return this.stream.write(data + '\n')
    }
  }

  return StreamOutput

})(Output)

scope.Output = Output

scope.StringOutput = StringOutput

scope.Converter = Converter

scope.Writer = Writer

applyOptions = function(options) {
  if (options.numeric != null) {
    entOptions.useNamedReferences = !options.numeric
  }
  if (options.nspaces != null) {
    nspaces = parseInt(options.nspaces)
  }
  if (options.tabs != null) {
    useTabs = !!options.tabs
  }
}

if (typeof exports !== "undefined" && exports !== null) {
  scope.Parser = Parser
  scope.StreamOutput = StreamOutput
  scope.convert = function(input, output, options) {
    if (options == null) {
      options = {}
    }
    applyOptions(options)
    if (options.parser == null) {
      options.parser = new Parser(options)
    }
    return options.parser.parse(input, function(errors, window) {
      if (errors != null ? errors.length : void 0) {
        return errors
      } else {
        if (output == null) {
          output = new StreamOutput(process.stdout)
        }
        if (options.converter == null) {
          options.converter = new Converter(options)
        }
        return options.converter.document(window.document, output)
      }
    })
  }
}

scope.convertHtml = function(html, options, cb) {
  if (options == null) {
    options = {}
  }
  applyOptions(options)
  if (options.parser == null) {
    options.parser = new Parser(options)
  }
  return options.parser.parse(html, function(errors, window) {
    var output, _ref
    if (errors != null ? errors.length : void 0) {
      return errors
    } else {
      output = (_ref = options.output) != null ? _ref : new StringOutput()
      if (options.converter == null) {
        options.converter = new Converter(options)
      }
      let document = window.document
      if (document.children.length) {
        for (let i = 0; i < document.children.length; i++) {
          options.converter.document(document.children[i], output)
        }
        if (cb != null) {
          return cb(null, output.final())
        }
      } else {
        options.converter.document(document, output)
        if (cb != null) {
          return cb(null, output.final())
        }
      }
    }
  })
}
