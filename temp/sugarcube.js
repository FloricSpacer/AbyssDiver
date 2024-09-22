/*! SugarCube JS */
if (document.documentElement.getAttribute('data-init') === 'loading') {
  ;(function (window, document, jQuery, undefined) {
    'use strict'
    function _classCallCheck (instance, Constructor) {
      if (!(instance instanceof Constructor))
        throw new TypeError('Cannot call a class as a function')
    }
    function _defineProperties (target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i]
        ;(descriptor.enumerable = descriptor.enumerable || !1),
          (descriptor.configurable = !0),
          'value' in descriptor && (descriptor.writable = !0),
          Object.defineProperty(target, descriptor.key, descriptor)
      }
    }
    function _createClass (Constructor, protoProps, staticProps) {
      return (
        protoProps && _defineProperties(Constructor.prototype, protoProps),
        staticProps && _defineProperties(Constructor, staticProps),
        Object.defineProperty(Constructor, 'prototype', { writable: !1 }),
        Constructor
      )
    }
    function _slicedToArray (arr, i) {
      return (
        _arrayWithHoles(arr) ||
        _iterableToArrayLimit(arr, i) ||
        _unsupportedIterableToArray(arr, i) ||
        _nonIterableRest()
      )
    }
    function _nonIterableRest () {
      throw new TypeError(
        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
      )
    }
    function _iterableToArrayLimit (arr, i) {
      var _i =
        null == arr
          ? null
          : ('undefined' != typeof Symbol && arr[Symbol.iterator]) ||
            arr['@@iterator']
      if (null != _i) {
        var _s,
          _e,
          _arr = [],
          _n = !0,
          _d = !1
        try {
          for (
            _i = _i.call(arr);
            !(_n = (_s = _i.next()).done) &&
            (_arr.push(_s.value), !i || _arr.length !== i);
            _n = !0
          );
        } catch (err) {
          ;(_d = !0), (_e = err)
        } finally {
          try {
            _n || null == _i.return || _i.return()
          } finally {
            if (_d) throw _e
          }
        }
        return _arr
      }
    }
    function _arrayWithHoles (arr) {
      if (Array.isArray(arr)) return arr
    }
    function _toConsumableArray (arr) {
      return (
        _arrayWithoutHoles(arr) ||
        _iterableToArray(arr) ||
        _unsupportedIterableToArray(arr) ||
        _nonIterableSpread()
      )
    }
    function _nonIterableSpread () {
      throw new TypeError(
        'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
      )
    }
    function _unsupportedIterableToArray (o, minLen) {
      if (o) {
        if ('string' == typeof o) return _arrayLikeToArray(o, minLen)
        var n = Object.prototype.toString.call(o).slice(8, -1)
        return (
          'Object' === n && o.constructor && (n = o.constructor.name),
          'Map' === n || 'Set' === n
            ? Array.from(o)
            : 'Arguments' === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            ? _arrayLikeToArray(o, minLen)
            : void 0
        )
      }
    }
    function _iterableToArray (iter) {
      if (
        ('undefined' != typeof Symbol && null != iter[Symbol.iterator]) ||
        null != iter['@@iterator']
      )
        return Array.from(iter)
    }
    function _arrayWithoutHoles (arr) {
      if (Array.isArray(arr)) return _arrayLikeToArray(arr)
    }
    function _arrayLikeToArray (arr, len) {
      ;(null == len || len > arr.length) && (len = arr.length)
      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]
      return arr2
    }
    function _typeof (obj) {
      return (
        (_typeof =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function (obj) {
                return typeof obj
              }
            : function (obj) {
                return obj &&
                  'function' == typeof Symbol &&
                  obj.constructor === Symbol &&
                  obj !== Symbol.prototype
                  ? 'symbol'
                  : typeof obj
              }),
        _typeof(obj)
      )
    }
    var errorPrologRegExp =
        /^(?:(?:uncaught\s+(?:exception:\s+)?)?\w*(?:error|exception|_err):\s+)+/i,
      Alert = (function () {
        function mesg (where, error, isFatal, isUncaught) {
          var mesg = 'Error',
            nice = 'A'.concat(isFatal ? ' fatal' : 'n', ' error has occurred.')
          nice += isFatal
            ? ' Aborting.'
            : ' You may be able to continue, but some parts may not work properly.'
          var isObject = null !== error && 'object' === _typeof(error),
            what =
              (isObject && 'message' in error
                ? String(error.message).replace(errorPrologRegExp, '')
                : String(error)
              ).trim() || 'unknown error'
          null != where && (mesg += ' ['.concat(where, ']')),
            (mesg += ': '.concat(what, '.')),
            isObject &&
              'stack' in error &&
              (mesg += '\n\nStack Trace:\n'.concat(error.stack)),
            mesg && (nice += '\n\n'.concat(mesg)),
            isUncaught || console[isFatal ? 'error' : 'warn'](mesg),
            window.alert(nice)
        }
        var origOnError
        return (
          (origOnError = window.onerror),
          (window.onerror = function (what, source, lineNum, colNum, error) {
            'complete' === document.readyState
              ? mesg(null, null != error ? error : what, !1, !0)
              : (mesg(null, null != error ? error : what, !0, !0),
                (window.onerror = origOnError),
                'function' == typeof window.onerror &&
                  window.onerror.apply(this, arguments))
          }),
          Object.freeze(
            Object.defineProperties(
              {},
              {
                error: {
                  value: function (where, error) {
                    mesg(where, error)
                  }
                },
                fatal: {
                  value: function (where, error) {
                    mesg(where, error, !0)
                  }
                }
              }
            )
          )
        )
      })(),
      Patterns =
        ((wsMap = new Map([
          [' ', '\\u0020'],
          ['\f', '\\f'],
          ['\n', '\\n'],
          ['\r', '\\r'],
          ['\t', '\\t'],
          ['\v', '\\v'],
          [' ', '\\u00a0'],
          [' ', '\\u1680'],
          ['᠎', '\\u180e'],
          [' ', '\\u2000'],
          [' ', '\\u2001'],
          [' ', '\\u2002'],
          [' ', '\\u2003'],
          [' ', '\\u2004'],
          [' ', '\\u2005'],
          [' ', '\\u2006'],
          [' ', '\\u2007'],
          [' ', '\\u2008'],
          [' ', '\\u2009'],
          [' ', '\\u200a'],
          ['\u2028', '\\u2028'],
          ['\u2029', '\\u2029'],
          [' ', '\\u202f'],
          [' ', '\\u205f'],
          ['　', '\\u3000'],
          ['\ufeff', '\\ufeff']
        ])),
        (wsRe = /^\s$/),
        (missing = ''),
        wsMap.forEach(function (pat, char) {
          wsRe.test(char) || (missing += pat)
        }),
        (space = missing ? '[\\s'.concat(missing, ']') : '\\s'),
        (spaceNoTerminator =
          '[\\u0020\\f\\t\\v\\u00a0\\u1680\\u180e\\u2000-\\u200a\\u202f\\u205f\\u3000\\ufeff]'),
        (notSpace = '\\s' === space ? '\\S' : space.replace(/^\[/, '[^')),
        (anyChar = '(?:.|'.concat('[\\n\\r\\u2028\\u2029]', ')')),
        (anyLetter =
          '[0-9A-Z_a-z\\-\\u00c0-\\u00d6\\u00d8-\\u00f6\\u00f8-\\u00ff\\u0150\\u0170\\u0151\\u0171]'),
        (anyLetterStrict = anyLetter.replace('\\-', '')),
        (identifier = ''.concat('[$A-Z_a-z]').concat('[$0-9A-Z_a-z]', '*')),
        (variable = '[$_]' + identifier),
        (htmlTagName = '[A-Za-z](?:'
          .concat(
            (cENChar =
              '(?:[\\x2D.0-9A-Z_a-z\\xB7\\xC0-\\xD6\\xD8-\\xF6\\xF8-\\u037D\\u037F-\\u1FFF\\u200C\\u200D\\u203F\\u2040\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD]|[\\uD800-\\uDB7F][\\uDC00-\\uDFFF])'),
            '*-'
          )
          .concat(cENChar, '*|[0-9A-Za-z]*)')),
        (twStyle = '('.concat(anyLetter, '+)\\(([^\\)\\|\\n]+)\\):')),
        (cssStyle = ''
          .concat(spaceNoTerminator, '*(')
          .concat(anyLetter, '+)')
          .concat(spaceNoTerminator, '*:([^;\\|\\n]+);')),
        (idOrClass = ''
          .concat(spaceNoTerminator, '*((?:')
          .concat('[#.]')
          .concat(anyLetter, '+')
          .concat(spaceNoTerminator, '*)+);')),
        (inlineCss = ''
          .concat(twStyle, '|')
          .concat(cssStyle, '|')
          .concat(idOrClass)),
        Object.freeze({
          space: space,
          spaceNoTerminator: spaceNoTerminator,
          lineTerminator: '[\\n\\r\\u2028\\u2029]',
          notSpace: notSpace,
          anyChar: anyChar,
          anyLetter: anyLetter,
          anyLetterStrict: anyLetterStrict,
          identifierFirstChar: '[$A-Z_a-z]',
          identifierNextChar: '[$0-9A-Z_a-z]',
          identifier: identifier,
          variableSigil: '[$_]',
          variable: variable,
          macroName: '[A-Za-z][\\w-]*|[=-]',
          templateName: '[A-Za-z][\\w-]*',
          htmlTagName: htmlTagName,
          cssIdOrClassSigil: '[#.]',
          cssImage: '\\[[<>]?[Ii][Mm][Gg]\\[(?:\\s|\\S)*?\\]\\]+',
          inlineCss: inlineCss,
          url: '(?:file|https?|mailto|ftp|javascript|irc|news|data):[^\\s\'"]+'
        })),
      wsMap,
      wsRe,
      missing,
      cENChar,
      twStyle,
      cssStyle,
      idOrClass,
      space,
      spaceNoTerminator,
      notSpace,
      anyChar,
      anyLetter,
      anyLetterStrict,
      identifier,
      variable,
      htmlTagName,
      inlineCss
    !(function () {
      var startWSRe,
        endWSRe,
        _trimString =
          ((startWSRe = new RegExp(
            '^'.concat(Patterns.space).concat(Patterns.space, '*')
          )),
          (endWSRe = new RegExp(
            ''.concat(Patterns.space).concat(Patterns.space, '*$')
          )),
          function (str, where) {
            var val = String(str)
            if (!val) return val
            switch (where) {
              case 'start':
                return startWSRe.test(val) ? val.replace(startWSRe, '') : val
              case 'end':
                return endWSRe.test(val) ? val.replace(endWSRe, '') : val
              default:
                throw new Error(
                  '_trimString called with incorrect where parameter value: "'.concat(
                    where,
                    '"'
                  )
                )
            }
          })
      function _createPadString (length, padding) {
        var targetLength = Number.parseInt(length, 10) || 0
        if (targetLength < 1) return ''
        var padString = void 0 === padding ? '' : String(padding)
        for (
          '' === padString && (padString = ' ');
          padString.length < targetLength;

        ) {
          var curPadLength = padString.length,
            remainingLength = targetLength - curPadLength
          padString +=
            curPadLength > remainingLength
              ? padString.slice(0, remainingLength)
              : padString
        }
        return (
          padString.length > targetLength &&
            (padString = padString.slice(0, targetLength)),
          padString
        )
      }
      Array.prototype.flat ||
        Object.defineProperty(Array.prototype, 'flat', {
          configurable: !0,
          writable: !0,
          value: function flat () {
            if (null == this)
              throw new TypeError(
                'Array.prototype.flat called on null or undefined'
              )
            var depth = 0 === arguments.length ? 1 : Number(arguments[0]) || 0
            return depth < 1
              ? Array.prototype.slice.call(this)
              : Array.prototype.reduce.call(
                  this,
                  function (acc, cur) {
                    return (
                      cur instanceof Array
                        ? acc.push.apply(
                            acc,
                            _toConsumableArray(flat.call(cur, depth - 1))
                          )
                        : acc.push(cur),
                      acc
                    )
                  },
                  []
                )
          }
        }),
        Array.prototype.flatMap ||
          Object.defineProperty(Array.prototype, 'flatMap', {
            configurable: !0,
            writable: !0,
            value: function () {
              if (null == this)
                throw new TypeError(
                  'Array.prototype.flatMap called on null or undefined'
                )
              return Array.prototype.map.apply(this, arguments).flat()
            }
          }),
        Array.prototype.includes ||
          Object.defineProperty(Array.prototype, 'includes', {
            configurable: !0,
            writable: !0,
            value: function () {
              if (null == this)
                throw new TypeError(
                  'Array.prototype.includes called on null or undefined'
                )
              if (0 === arguments.length) return !1
              var length = this.length >>> 0
              if (0 === length) return !1
              var needle = arguments[0],
                i = Number(arguments[1]) || 0
              for (i < 0 && (i = Math.max(0, length + i)); i < length; ++i) {
                var value = this[i]
                if (value === needle || (value != value && needle != needle))
                  return !0
              }
              return !1
            }
          }),
        Object.entries ||
          Object.defineProperty(Object, 'entries', {
            configurable: !0,
            writable: !0,
            value: function (obj) {
              if ('object' !== _typeof(obj) || null === obj)
                throw new TypeError(
                  'Object.entries object parameter must be an object'
                )
              return Object.keys(obj).map(function (key) {
                return [key, obj[key]]
              })
            }
          }),
        Object.fromEntries ||
          Object.defineProperty(Object, 'fromEntries', {
            configurable: !0,
            writable: !0,
            value: function (iter) {
              return Array.from(iter).reduce(function (acc, pair) {
                if (Object(pair) !== pair)
                  throw new TypeError(
                    'Object.fromEntries iterable parameter must yield objects'
                  )
                return (
                  pair[0] in acc
                    ? Object.defineProperty(acc, pair[0], {
                        configurable: !0,
                        enumerable: !0,
                        writable: !0,
                        value: pair[1]
                      })
                    : (acc[pair[0]] = pair[1]),
                  acc
                )
              }, {})
            }
          }),
        Object.getOwnPropertyDescriptors ||
          Object.defineProperty(Object, 'getOwnPropertyDescriptors', {
            configurable: !0,
            writable: !0,
            value: function (obj) {
              if (null == obj)
                throw new TypeError(
                  'Object.getOwnPropertyDescriptors object parameter is null or undefined'
                )
              var O = Object(obj)
              return Reflect.ownKeys(O).reduce(function (acc, key) {
                var desc = Object.getOwnPropertyDescriptor(O, key)
                return (
                  void 0 !== desc &&
                    (key in acc
                      ? Object.defineProperty(acc, key, {
                          configurable: !0,
                          enumerable: !0,
                          writable: !0,
                          value: desc
                        })
                      : (acc[key] = desc)),
                  acc
                )
              }, {})
            }
          }),
        Object.values ||
          Object.defineProperty(Object, 'values', {
            configurable: !0,
            writable: !0,
            value: function (obj) {
              if ('object' !== _typeof(obj) || null === obj)
                throw new TypeError(
                  'Object.values object parameter must be an object'
                )
              return Object.keys(obj).map(function (key) {
                return obj[key]
              })
            }
          }),
        String.prototype.padStart ||
          Object.defineProperty(String.prototype, 'padStart', {
            configurable: !0,
            writable: !0,
            value: function (length, padding) {
              if (null == this)
                throw new TypeError(
                  'String.prototype.padStart called on null or undefined'
                )
              var baseString = String(this),
                baseLength = baseString.length,
                targetLength = Number.parseInt(length, 10)
              return targetLength <= baseLength
                ? baseString
                : _createPadString(targetLength - baseLength, padding) +
                    baseString
            }
          }),
        String.prototype.padEnd ||
          Object.defineProperty(String.prototype, 'padEnd', {
            configurable: !0,
            writable: !0,
            value: function (length, padding) {
              if (null == this)
                throw new TypeError(
                  'String.prototype.padEnd called on null or undefined'
                )
              var baseString = String(this),
                baseLength = baseString.length,
                targetLength = Number.parseInt(length, 10)
              return targetLength <= baseLength
                ? baseString
                : baseString +
                    _createPadString(targetLength - baseLength, padding)
            }
          }),
        String.prototype.trimStart ||
          Object.defineProperty(String.prototype, 'trimStart', {
            configurable: !0,
            writable: !0,
            value: function () {
              if (null == this)
                throw new TypeError(
                  'String.prototype.trimStart called on null or undefined'
                )
              return _trimString(this, 'start')
            }
          }),
        String.prototype.trimLeft ||
          Object.defineProperty(String.prototype, 'trimLeft', {
            configurable: !0,
            writable: !0,
            value: function () {
              if (null == this)
                throw new TypeError(
                  'String.prototype.trimLeft called on null or undefined'
                )
              return _trimString(this, 'start')
            }
          }),
        String.prototype.trimEnd ||
          Object.defineProperty(String.prototype, 'trimEnd', {
            configurable: !0,
            writable: !0,
            value: function () {
              if (null == this)
                throw new TypeError(
                  'String.prototype.trimEnd called on null or undefined'
                )
              return _trimString(this, 'end')
            }
          }),
        String.prototype.trimRight ||
          Object.defineProperty(String.prototype, 'trimRight', {
            configurable: !0,
            writable: !0,
            value: function () {
              if (null == this)
                throw new TypeError(
                  'String.prototype.trimRight called on null or undefined'
                )
              return _trimString(this, 'end')
            }
          })
    })(),
      (function () {
        var _nativeMathRandom = Math.random,
          _regExpMetaCharsRe,
          _hasRegExpMetaCharsRe,
          _formatRegExp,
          _hasFormatRegExp
        function _random () {
          var min, max
          switch (arguments.length) {
            case 0:
              throw new Error('_random called with insufficient parameters')
            case 1:
              ;(min = 0), (max = arguments[0])
              break
            default:
              ;(min = arguments[0]), (max = arguments[1])
          }
          if (min > max) {
            var _ref = [max, min]
            ;(min = _ref[0]), (max = _ref[1])
          }
          return Math.floor(_nativeMathRandom() * (max - min + 1)) + min
        }
        function _randomIndex (length, boundsArgs) {
          var min, max
          switch (boundsArgs.length) {
            case 1:
              ;(min = 0), (max = length - 1)
              break
            case 2:
              ;(min = 0), (max = Math.trunc(boundsArgs[1]))
              break
            default:
              ;(min = Math.trunc(boundsArgs[1])),
                (max = Math.trunc(boundsArgs[2]))
          }
          return (
            Number.isNaN(min)
              ? (min = 0)
              : !Number.isFinite(min) || min >= length
              ? (min = length - 1)
              : min < 0 && (min = length + min) < 0 && (min = 0),
            Number.isNaN(max)
              ? (max = 0)
              : (!Number.isFinite(max) ||
                  max >= length ||
                  (max < 0 && (max = length + max) < 0)) &&
                (max = length - 1),
            _random(min, max)
          )
        }
        function _getCodePointStartAndEnd (str, pos) {
          var code = str.charCodeAt(pos)
          if (Number.isNaN(code)) return { char: '', start: -1, end: -1 }
          if (code < 55296 || code > 57343)
            return { char: str.charAt(pos), start: pos, end: pos }
          if (code >= 55296 && code <= 56319) {
            var nextPos = pos + 1
            if (nextPos >= str.length)
              throw new Error('high surrogate without trailing low surrogate')
            var nextCode = str.charCodeAt(nextPos)
            if (nextCode < 56320 || nextCode > 57343)
              throw new Error('high surrogate without trailing low surrogate')
            return {
              char: str.charAt(pos) + str.charAt(nextPos),
              start: pos,
              end: nextPos
            }
          }
          if (0 === pos)
            throw new Error('low surrogate without leading high surrogate')
          var prevPos = pos - 1,
            prevCode = str.charCodeAt(prevPos)
          if (prevCode < 55296 || prevCode > 56319)
            throw new Error('low surrogate without leading high surrogate')
          return {
            char: str.charAt(prevPos) + str.charAt(pos),
            start: prevPos,
            end: pos
          }
        }
        Object.defineProperty(Array, 'random', {
          configurable: !0,
          writable: !0,
          value: function (array) {
            if (
              'object' !== _typeof(array) ||
              null === array ||
              !Object.prototype.hasOwnProperty.call(array, 'length')
            )
              throw new TypeError(
                'Array.random array parameter must be an array or array-lke object'
              )
            var length = array.length >>> 0
            if (0 !== length) {
              var index =
                0 === arguments.length
                  ? _random(0, length - 1)
                  : _randomIndex(
                      length,
                      Array.prototype.slice.call(arguments, 1)
                    )
              return array[index]
            }
          }
        }),
          Object.defineProperty(Array.prototype, 'concatUnique', {
            configurable: !0,
            writable: !0,
            value: function () {
              if (null == this)
                throw new TypeError(
                  'Array.prototype.concatUnique called on null or undefined'
                )
              var result = Array.from(this)
              if (0 === arguments.length) return result
              var items = Array.prototype.reduce.call(
                  arguments,
                  function (prev, cur) {
                    return prev.concat(cur)
                  },
                  []
                ),
                addSize = items.length
              if (0 === addSize) return result
              for (
                var indexOf = Array.prototype.indexOf,
                  push = Array.prototype.push,
                  i = 0;
                i < addSize;
                ++i
              ) {
                var value = items[i]
                ;-1 === indexOf.call(result, value) && push.call(result, value)
              }
              return result
            }
          }),
          Object.defineProperty(Array.prototype, 'count', {
            configurable: !0,
            writable: !0,
            value: function () {
              if (null == this)
                throw new TypeError(
                  'Array.prototype.count called on null or undefined'
                )
              for (
                var indexOf = Array.prototype.indexOf,
                  needle = arguments[0],
                  pos = Number(arguments[1]) || 0,
                  count = 0;
                -1 !== (pos = indexOf.call(this, needle, pos));

              )
                ++count, ++pos
              return count
            }
          }),
          Object.defineProperty(Array.prototype, 'countWith', {
            configurable: !0,
            writable: !0,
            value: function (predicate, thisArg) {
              if (null == this)
                throw new TypeError(
                  'Array.prototype.countWith called on null or undefined'
                )
              if ('function' != typeof predicate)
                throw new Error(
                  'Array.prototype.countWith predicate parameter must be a function'
                )
              var length = this.length >>> 0
              if (0 === length) return 0
              for (var count = 0, i = 0; i < length; ++i)
                predicate.call(thisArg, this[i], i, this) && ++count
              return count
            }
          }),
          Object.defineProperty(Array.prototype, 'delete', {
            configurable: !0,
            writable: !0,
            value: function () {
              if (null == this)
                throw new TypeError(
                  'Array.prototype.delete called on null or undefined'
                )
              if (0 === arguments.length) return []
              var length = this.length >>> 0
              if (0 === length) return []
              for (
                var needles = Array.prototype.concat.apply([], arguments),
                  needlesLength = needles.length,
                  indices = [],
                  i = 0;
                i < length;
                ++i
              )
                for (var value = this[i], j = 0; j < needlesLength; ++j) {
                  var needle = needles[j]
                  if (
                    value === needle ||
                    (value != value && needle != needle)
                  ) {
                    indices.push(i)
                    break
                  }
                }
              for (
                var result = [], _i = 0, iend = indices.length;
                _i < iend;
                ++_i
              )
                result[_i] = this[indices[_i]]
              for (
                var splice = Array.prototype.splice, _i2 = indices.length - 1;
                _i2 >= 0;
                --_i2
              )
                splice.call(this, indices[_i2], 1)
              return result
            }
          }),
          Object.defineProperty(Array.prototype, 'deleteAt', {
            configurable: !0,
            writable: !0,
            value: function () {
              if (null == this)
                throw new TypeError(
                  'Array.prototype.deleteAt called on null or undefined'
                )
              if (0 === arguments.length) return []
              var length = this.length >>> 0
              if (0 === length) return []
              for (
                var splice = Array.prototype.splice,
                  cpyIndices = _toConsumableArray(
                    new Set(
                      Array.prototype.concat
                        .apply([], arguments)
                        .map(function (x) {
                          return x < 0 ? Math.max(0, length + x) : x
                        })
                    ).values()
                  ),
                  delIndices = _toConsumableArray(cpyIndices).sort(function (
                    a,
                    b
                  ) {
                    return b - a
                  }),
                  result = [],
                  i = 0,
                  iend = cpyIndices.length;
                i < iend;
                ++i
              )
                result[i] = this[cpyIndices[i]]
              for (var _i3 = 0, _iend = delIndices.length; _i3 < _iend; ++_i3)
                splice.call(this, delIndices[_i3], 1)
              return result
            }
          }),
          Object.defineProperty(Array.prototype, 'deleteWith', {
            configurable: !0,
            writable: !0,
            value: function (predicate, thisArg) {
              if (null == this)
                throw new TypeError(
                  'Array.prototype.deleteWith called on null or undefined'
                )
              if ('function' != typeof predicate)
                throw new Error(
                  'Array.prototype.deleteWith predicate parameter must be a function'
                )
              var length = this.length >>> 0
              if (0 === length) return []
              for (
                var splice = Array.prototype.splice,
                  indices = [],
                  result = [],
                  i = 0;
                i < length;
                ++i
              )
                predicate.call(thisArg, this[i], i, this) &&
                  (result.push(this[i]), indices.push(i))
              for (var _i4 = indices.length - 1; _i4 >= 0; --_i4)
                splice.call(this, indices[_i4], 1)
              return result
            }
          }),
          Object.defineProperty(Array.prototype, 'first', {
            configurable: !0,
            writable: !0,
            value: function () {
              if (null == this)
                throw new TypeError(
                  'Array.prototype.first called on null or undefined'
                )
              if (0 !== this.length >>> 0) return this[0]
            }
          }),
          Object.defineProperty(Array.prototype, 'includesAll', {
            configurable: !0,
            writable: !0,
            value: function () {
              if (null == this)
                throw new TypeError(
                  'Array.prototype.includesAll called on null or undefined'
                )
              if (1 === arguments.length)
                return Array.isArray(arguments[0])
                  ? Array.prototype.includesAll.apply(this, arguments[0])
                  : Array.prototype.includes.apply(this, arguments)
              for (var i = 0, iend = arguments.length; i < iend; ++i)
                if (
                  !Array.prototype.some.call(
                    this,
                    function (val) {
                      return (
                        val === this.val || (val != val && this.val != this.val)
                      )
                    },
                    { val: arguments[i] }
                  )
                )
                  return !1
              return !0
            }
          }),
          Object.defineProperty(Array.prototype, 'includesAny', {
            configurable: !0,
            writable: !0,
            value: function () {
              if (null == this)
                throw new TypeError(
                  'Array.prototype.includesAny called on null or undefined'
                )
              if (1 === arguments.length)
                return Array.isArray(arguments[0])
                  ? Array.prototype.includesAny.apply(this, arguments[0])
                  : Array.prototype.includes.apply(this, arguments)
              for (var i = 0, iend = arguments.length; i < iend; ++i)
                if (
                  Array.prototype.some.call(
                    this,
                    function (val) {
                      return (
                        val === this.val || (val != val && this.val != this.val)
                      )
                    },
                    { val: arguments[i] }
                  )
                )
                  return !0
              return !1
            }
          }),
          Object.defineProperty(Array.prototype, 'last', {
            configurable: !0,
            writable: !0,
            value: function () {
              if (null == this)
                throw new TypeError(
                  'Array.prototype.last called on null or undefined'
                )
              var length = this.length >>> 0
              if (0 !== length) return this[length - 1]
            }
          }),
          Object.defineProperty(Array.prototype, 'pluck', {
            configurable: !0,
            writable: !0,
            value: function () {
              if (null == this)
                throw new TypeError(
                  'Array.prototype.pluck called on null or undefined'
                )
              var length = this.length >>> 0
              if (0 !== length) {
                var index =
                  0 === arguments.length
                    ? _random(0, length - 1)
                    : _randomIndex(
                        length,
                        Array.prototype.slice.call(arguments)
                      )
                return Array.prototype.splice.call(this, index, 1)[0]
              }
            }
          }),
          Object.defineProperty(Array.prototype, 'pluckMany', {
            configurable: !0,
            writable: !0,
            value: function (wantSize) {
              if (null == this)
                throw new TypeError(
                  'Array.prototype.pluckMany called on null or undefined'
                )
              var length = this.length >>> 0
              if (0 === length) return []
              var want = Math.trunc(wantSize)
              if (!Number.isInteger(want))
                throw new Error(
                  'Array.prototype.pluckMany want parameter must be an integer'
                )
              if (want < 1) return []
              want > length && (want = length)
              var splice = Array.prototype.splice,
                result = [],
                max = length - 1
              do {
                result.push(splice.call(this, _random(0, max--), 1)[0])
              } while (result.length < want)
              return result
            }
          }),
          Object.defineProperty(Array.prototype, 'pushUnique', {
            configurable: !0,
            writable: !0,
            value: function () {
              if (null == this)
                throw new TypeError(
                  'Array.prototype.pushUnique called on null or undefined'
                )
              var addSize = arguments.length
              if (0 === addSize) return this.length >>> 0
              for (
                var indexOf = Array.prototype.indexOf,
                  push = Array.prototype.push,
                  i = 0;
                i < addSize;
                ++i
              ) {
                var value = arguments[i]
                ;-1 === indexOf.call(this, value) && push.call(this, value)
              }
              return this.length >>> 0
            }
          }),
          Object.defineProperty(Array.prototype, 'random', {
            configurable: !0,
            writable: !0,
            value: function () {
              if (null == this)
                throw new TypeError(
                  'Array.prototype.random called on null or undefined'
                )
              var length = this.length >>> 0
              if (0 !== length) {
                var index =
                  0 === arguments.length
                    ? _random(0, length - 1)
                    : _randomIndex(
                        length,
                        Array.prototype.slice.call(arguments)
                      )
                return this[index]
              }
            }
          }),
          Object.defineProperty(Array.prototype, 'randomMany', {
            configurable: !0,
            writable: !0,
            value: function (wantSize) {
              if (null == this)
                throw new TypeError(
                  'Array.prototype.randomMany called on null or undefined'
                )
              var length = this.length >>> 0
              if (0 === length) return []
              var want = Math.trunc(wantSize)
              if (!Number.isInteger(want))
                throw new Error(
                  'Array.prototype.randomMany want parameter must be an integer'
                )
              if (want < 1) return []
              want > length && (want = length)
              var picked = new Map(),
                result = [],
                max = length - 1
              do {
                var i = void 0
                do {
                  i = _random(0, max)
                } while (picked.has(i))
                picked.set(i, !0), result.push(this[i])
              } while (result.length < want)
              return result
            }
          }),
          Object.defineProperty(Array.prototype, 'shuffle', {
            configurable: !0,
            writable: !0,
            value: function () {
              if (null == this)
                throw new TypeError(
                  'Array.prototype.shuffle called on null or undefined'
                )
              var length = this.length >>> 0
              if (0 === length) return this
              for (var i = length - 1; i > 0; --i) {
                var j = Math.floor(_nativeMathRandom() * (i + 1))
                if (i !== j) {
                  var swap = this[i]
                  ;(this[i] = this[j]), (this[j] = swap)
                }
              }
              return this
            }
          }),
          Object.defineProperty(Array.prototype, 'unshiftUnique', {
            configurable: !0,
            writable: !0,
            value: function () {
              if (null == this)
                throw new TypeError(
                  'Array.prototype.unshiftUnique called on null or undefined'
                )
              var addSize = arguments.length
              if (0 === addSize) return this.length >>> 0
              for (
                var indexOf = Array.prototype.indexOf,
                  unshift = Array.prototype.unshift,
                  i = 0;
                i < addSize;
                ++i
              ) {
                var value = arguments[i]
                ;-1 === indexOf.call(this, value) && unshift.call(this, value)
              }
              return this.length >>> 0
            }
          }),
          Object.defineProperty(Function.prototype, 'partial', {
            configurable: !0,
            writable: !0,
            value: function () {
              if (null == this)
                throw new TypeError(
                  'Function.prototype.partial called on null or undefined'
                )
              var slice = Array.prototype.slice,
                fn = this,
                bound = slice.call(arguments, 0)
              return function () {
                for (var applied = [], argc = 0, i = 0; i < bound.length; ++i)
                  applied.push(
                    bound[i] === undefined ? arguments[argc++] : bound[i]
                  )
                return fn.apply(
                  this,
                  applied.concat(slice.call(arguments, argc))
                )
              }
            }
          }),
          Object.defineProperty(Math, 'clamp', {
            configurable: !0,
            writable: !0,
            value: function (num, min, max) {
              var value = Number(num)
              return Number.isNaN(value) ? NaN : value.clamp(min, max)
            }
          }),
          Object.defineProperty(Math, 'easeInOut', {
            configurable: !0,
            writable: !0,
            value: function (num) {
              return 1 - (Math.cos(Number(num) * Math.PI) + 1) / 2
            }
          }),
          Object.defineProperty(Number.prototype, 'clamp', {
            configurable: !0,
            writable: !0,
            value: function () {
              if (null == this)
                throw new TypeError(
                  'Number.prototype.clamp called on null or undefined'
                )
              if (2 !== arguments.length)
                throw new Error(
                  'Number.prototype.clamp called with an incorrect number of parameters'
                )
              var min = Number(arguments[0]),
                max = Number(arguments[1])
              if (min > max) {
                var _ref2 = [max, min]
                ;(min = _ref2[0]), (max = _ref2[1])
              }
              return Math.min(Math.max(this, min), max)
            }
          }),
          RegExp.escape ||
            ((_regExpMetaCharsRe = /[\\^$*+?.()|[\]{}]/g),
            (_hasRegExpMetaCharsRe = new RegExp(_regExpMetaCharsRe.source)),
            Object.defineProperty(RegExp, 'escape', {
              configurable: !0,
              writable: !0,
              value: function (str) {
                var val = String(str)
                return val && _hasRegExpMetaCharsRe.test(val)
                  ? val.replace(_regExpMetaCharsRe, '\\$&')
                  : val
              }
            })),
          (_formatRegExp = /{(\d+)(?:,([+-]?\d+))?}/g),
          (_hasFormatRegExp = new RegExp(_formatRegExp.source)),
          Object.defineProperty(String, 'format', {
            configurable: !0,
            writable: !0,
            value: function (format) {
              function padString (str, align, pad) {
                if (!align) return str
                var plen = Math.abs(align) - str.length
                if (plen < 1) return str
                var padding = String(pad).repeat(plen)
                return align < 0 ? str + padding : padding + str
              }
              if (arguments.length < 2)
                return 0 === arguments.length ? '' : format
              var args =
                2 === arguments.length && Array.isArray(arguments[1])
                  ? _toConsumableArray(arguments[1])
                  : Array.prototype.slice.call(arguments, 1)
              return 0 === args.length
                ? format
                : _hasFormatRegExp.test(format)
                ? ((_formatRegExp.lastIndex = 0),
                  format.replace(_formatRegExp, function (match, index, align) {
                    var retval = args[index]
                    if (null == retval) return ''
                    for (; 'function' == typeof retval; ) retval = retval()
                    switch (_typeof(retval)) {
                      case 'string':
                        break
                      case 'object':
                        retval = JSON.stringify(retval)
                        break
                      default:
                        retval = String(retval)
                    }
                    return padString(
                      retval,
                      align ? Number.parseInt(align, 10) : 0,
                      ' '
                    )
                  }))
                : format
            }
          }),
          Object.defineProperty(String.prototype, 'contains', {
            configurable: !0,
            writable: !0,
            value: function () {
              if (null == this)
                throw new TypeError(
                  'String.prototype.contains called on null or undefined'
                )
              return -1 !== String.prototype.indexOf.apply(this, arguments)
            }
          }),
          Object.defineProperty(String.prototype, 'count', {
            configurable: !0,
            writable: !0,
            value: function () {
              if (null == this)
                throw new TypeError(
                  'String.prototype.count called on null or undefined'
                )
              var needle = String(arguments[0] || '')
              if ('' === needle) return 0
              for (
                var indexOf = String.prototype.indexOf,
                  step = needle.length,
                  pos = Number(arguments[1]) || 0,
                  count = 0;
                -1 !== (pos = indexOf.call(this, needle, pos));

              )
                ++count, (pos += step)
              return count
            }
          }),
          Object.defineProperty(String.prototype, 'first', {
            configurable: !0,
            writable: !0,
            value: function () {
              if (null == this)
                throw new TypeError(
                  'String.prototype.first called on null or undefined'
                )
              return _getCodePointStartAndEnd(String(this), 0).char
            }
          }),
          Object.defineProperty(String.prototype, 'last', {
            configurable: !0,
            writable: !0,
            value: function () {
              if (null == this)
                throw new TypeError(
                  'String.prototype.last called on null or undefined'
                )
              var str = String(this)
              return _getCodePointStartAndEnd(str, str.length - 1).char
            }
          }),
          Object.defineProperty(String.prototype, 'splice', {
            configurable: !0,
            writable: !0,
            value: function (startAt, delCount, replacement) {
              if (null == this)
                throw new TypeError(
                  'String.prototype.splice called on null or undefined'
                )
              var length = this.length >>> 0
              if (0 === length) return ''
              var start = Number(startAt)
              Number.isSafeInteger(start)
                ? start < 0 && (start += length) < 0 && (start = 0)
                : (start = 0),
                start > length && (start = length)
              var count = Number(delCount)
              ;(!Number.isSafeInteger(count) || count < 0) && (count = 0)
              var res = this.slice(0, start)
              return (
                void 0 !== replacement && (res += replacement),
                start + count < length && (res += this.slice(start + count)),
                res
              )
            }
          }),
          Object.defineProperty(String.prototype, 'splitOrEmpty', {
            configurable: !0,
            writable: !0,
            value: function () {
              if (null == this)
                throw new TypeError(
                  'String.prototype.splitOrEmpty called on null or undefined'
                )
              return '' === String(this)
                ? []
                : String.prototype.split.apply(this, arguments)
            }
          }),
          Object.defineProperty(String.prototype, 'toLocaleUpperFirst', {
            configurable: !0,
            writable: !0,
            value: function () {
              if (null == this)
                throw new TypeError(
                  'String.prototype.toLocaleUpperFirst called on null or undefined'
                )
              var str = String(this),
                _getCodePointStartAnd3 = _getCodePointStartAndEnd(str, 0),
                char = _getCodePointStartAnd3.char,
                end = _getCodePointStartAnd3.end
              return -1 === end
                ? ''
                : char.toLocaleUpperCase() + str.slice(end + 1)
            }
          }),
          Object.defineProperty(String.prototype, 'toUpperFirst', {
            configurable: !0,
            writable: !0,
            value: function () {
              if (null == this)
                throw new TypeError(
                  'String.prototype.toUpperFirst called on null or undefined'
                )
              var str = String(this),
                _getCodePointStartAnd4 = _getCodePointStartAndEnd(str, 0),
                char = _getCodePointStartAnd4.char,
                end = _getCodePointStartAnd4.end
              return -1 === end ? '' : char.toUpperCase() + str.slice(end + 1)
            }
          }),
          Object.defineProperty(Date.prototype, 'toJSON', {
            configurable: !0,
            writable: !0,
            value: function () {
              return ['(revive:date)', this.toISOString()]
            }
          }),
          Object.defineProperty(Function.prototype, 'toJSON', {
            configurable: !0,
            writable: !0,
            value: function () {
              return ['(revive:eval)', '('.concat(this.toString(), ')')]
            }
          }),
          Object.defineProperty(Map.prototype, 'toJSON', {
            configurable: !0,
            writable: !0,
            value: function () {
              return ['(revive:map)', _toConsumableArray(this)]
            }
          }),
          Object.defineProperty(RegExp.prototype, 'toJSON', {
            configurable: !0,
            writable: !0,
            value: function () {
              return ['(revive:eval)', this.toString()]
            }
          }),
          Object.defineProperty(Set.prototype, 'toJSON', {
            configurable: !0,
            writable: !0,
            value: function () {
              return ['(revive:set)', _toConsumableArray(this)]
            }
          }),
          Object.defineProperty(JSON, 'reviveWrapper', {
            configurable: !0,
            writable: !0,
            value: function (code, data) {
              if ('string' != typeof code)
                throw new TypeError(
                  'JSON.reviveWrapper code parameter must be a string'
                )
              return ['(revive:eval)', [code, data]]
            }
          }),
          Object.defineProperty(JSON, '_real_stringify', {
            value: JSON.stringify
          }),
          Object.defineProperty(JSON, 'stringify', {
            configurable: !0,
            writable: !0,
            value: function (_value, replacer, space) {
              return JSON._real_stringify(
                _value,
                function (key, val) {
                  var value = val
                  if ('function' == typeof replacer)
                    try {
                      value = replacer(key, value)
                    } catch (ex) {}
                  return (
                    void 0 === value &&
                      (value = ['(revive:eval)', 'undefined']),
                    value
                  )
                },
                space
              )
            }
          }),
          Object.defineProperty(JSON, '_real_parse', { value: JSON.parse }),
          Object.defineProperty(JSON, 'parse', {
            configurable: !0,
            writable: !0,
            value: function value (text, reviver) {
              return JSON._real_parse(text, function (key, val) {
                var value = val
                if (Array.isArray(value) && 2 === value.length)
                  switch (value[0]) {
                    case '(revive:set)':
                      value = new Set(value[1])
                      break
                    case '(revive:map)':
                      value = new Map(value[1])
                      break
                    case '(revive:date)':
                      value = new Date(value[1])
                      break
                    case '(revive:eval)':
                      try {
                        if (Array.isArray(value[1])) {
                          var $ReviveData$ = value[1][1]
                          value = eval(value[1][0])
                        } else value = eval(value[1])
                      } catch (ex) {}
                  }
                else if (
                  'string' == typeof value &&
                  '@@revive@@' === value.slice(0, 10)
                )
                  try {
                    value = eval(value.slice(10))
                  } catch (ex) {}
                if ('function' == typeof reviver)
                  try {
                    value = reviver(key, value)
                  } catch (ex) {}
                return value
              })
            }
          }),
          Object.defineProperty(Array.prototype, 'contains', {
            configurable: !0,
            writable: !0,
            value: function () {
              if (null == this)
                throw new TypeError(
                  'Array.prototype.contains called on null or undefined'
                )
              return Array.prototype.includes.apply(this, arguments)
            }
          }),
          Object.defineProperty(Array.prototype, 'containsAll', {
            configurable: !0,
            writable: !0,
            value: function () {
              if (null == this)
                throw new TypeError(
                  'Array.prototype.containsAll called on null or undefined'
                )
              return Array.prototype.includesAll.apply(this, arguments)
            }
          }),
          Object.defineProperty(Array.prototype, 'containsAny', {
            configurable: !0,
            writable: !0,
            value: function () {
              if (null == this)
                throw new TypeError(
                  'Array.prototype.containsAny called on null or undefined'
                )
              return Array.prototype.includesAny.apply(this, arguments)
            }
          }),
          Object.defineProperty(Array.prototype, 'flatten', {
            configurable: !0,
            writable: !0,
            value: function () {
              if (null == this)
                throw new TypeError(
                  'Array.prototype.flatten called on null or undefined'
                )
              return Array.prototype.flat.call(this, 1 / 0)
            }
          }),
          Object.defineProperty(String.prototype, 'readBracketedList', {
            configurable: !0,
            writable: !0,
            value: function () {
              if (null == this)
                throw new TypeError(
                  'String.prototype.readBracketedList called on null or undefined'
                )
              for (
                var match,
                  re = new RegExp(
                    '(?:\\[\\[((?:\\s|\\S)*?)\\]\\])|([^"\'\\s]\\S*)',
                    'gm'
                  ),
                  names = [];
                null !== (match = re.exec(this));

              )
                match[1]
                  ? names.push(match[1])
                  : match[2] && names.push(match[2])
              return names
            }
          })
      })()
    var Browser =
        ((userAgent = navigator.userAgent.toLowerCase()),
        (winPhone = userAgent.includes('windows phone')),
        (isMobile = Object.freeze({
          Android: !winPhone && userAgent.includes('android'),
          BlackBerry: /blackberry|bb10/.test(userAgent),
          iOS: !winPhone && /ip(?:hone|ad|od)/.test(userAgent),
          Opera:
            !winPhone &&
            ('object' === _typeof(window.operamini) ||
              userAgent.includes('opera mini')),
          Windows: winPhone || /iemobile|wpdesktop/.test(userAgent),
          any: function () {
            return (
              isMobile.Android ||
              isMobile.BlackBerry ||
              isMobile.iOS ||
              isMobile.Opera ||
              isMobile.Windows
            )
          }
        })),
        (isGecko =
          !isMobile.Windows &&
          !/khtml|trident|edge/.test(userAgent) &&
          userAgent.includes('gecko')),
        (isIE = !userAgent.includes('opera') && /msie|trident/.test(userAgent)),
        (ieVersion = isIE
          ? (ver = /(?:msie\s+|rv:)(\d+\.\d)/.exec(userAgent))
            ? Number(ver[1])
            : 0
          : null),
        (isOpera = userAgent.includes('opera') || userAgent.includes(' opr/')),
        (operaVersion = isOpera
          ? (function () {
              var ver = new RegExp(
                ''.concat(
                  /khtml|chrome/.test(userAgent) ? 'opr' : 'version',
                  '\\/(\\d+\\.\\d+)'
                )
              ).exec(userAgent)
              return ver ? Number(ver[1]) : 0
            })()
          : null),
        (isVivaldi = userAgent.includes('vivaldi')),
        Object.freeze({
          userAgent: userAgent,
          isMobile: isMobile,
          isGecko: isGecko,
          isIE: isIE,
          ieVersion: ieVersion,
          isOpera: isOpera,
          operaVersion: operaVersion,
          isVivaldi: isVivaldi
        })),
      ver,
      userAgent,
      winPhone,
      isMobile,
      isGecko,
      isIE,
      ieVersion,
      isOpera,
      operaVersion,
      isVivaldi,
      Has =
        ((hasAudioElement = (function () {
          try {
            return (
              'function' == typeof document.createElement('audio').canPlayType
            )
          } catch (ex) {}
          return !1
        })()),
        (hasFile = (function () {
          try {
            return (
              'Blob' in window &&
              'File' in window &&
              'FileList' in window &&
              'FileReader' in window &&
              (!Browser.isOpera || Browser.operaVersion >= 15)
            )
          } catch (ex) {}
          return !1
        })()),
        (hasGeolocation = (function () {
          try {
            return (
              'geolocation' in navigator &&
              'function' == typeof navigator.geolocation.getCurrentPosition &&
              'function' == typeof navigator.geolocation.watchPosition
            )
          } catch (ex) {}
          return !1
        })()),
        (hasMutationObserver = (function () {
          try {
            return (
              'MutationObserver' in window &&
              'function' == typeof window.MutationObserver
            )
          } catch (ex) {}
          return !1
        })()),
        (hasPerformance = (function () {
          try {
            return (
              'performance' in window &&
              'function' == typeof window.performance.now
            )
          } catch (ex) {}
          return !1
        })()),
        (hasTouch = (function () {
          try {
            return (
              'ontouchstart' in window ||
              (!!window.DocumentTouch &&
                document instanceof window.DocumentTouch) ||
              !!navigator.maxTouchPoints ||
              !!navigator.msMaxTouchPoints
            )
          } catch (ex) {}
          return !1
        })()),
        (hasTransitionEndEvent = (function () {
          try {
            for (
              var teMap = new Map([
                  ['transition', 'transitionend'],
                  ['MSTransition', 'msTransitionEnd'],
                  ['WebkitTransition', 'webkitTransitionEnd'],
                  ['MozTransition', 'transitionend']
                ]),
                teKeys = _toConsumableArray(teMap.keys()),
                el = document.createElement('div'),
                i = 0;
              i < teKeys.length;
              ++i
            )
              if (el.style[teKeys[i]] !== undefined) return teMap.get(teKeys[i])
          } catch (ex) {}
          return !1
        })()),
        Object.freeze({
          audio: hasAudioElement,
          fileAPI: hasFile,
          geolocation: hasGeolocation,
          mutationObserver: hasMutationObserver,
          performance: hasPerformance,
          touch: hasTouch,
          transitionEndEvent: hasTransitionEndEvent
        })),
      hasAudioElement,
      hasFile,
      hasGeolocation,
      hasMutationObserver,
      hasPerformance,
      hasTouch,
      hasTransitionEndEvent,
      Visibility =
        ((vendor = (function () {
          try {
            return Object.freeze(
              [
                {
                  hiddenProperty: 'hidden',
                  stateProperty: 'visibilityState',
                  changeEvent: 'visibilitychange'
                },
                {
                  hiddenProperty: 'webkitHidden',
                  stateProperty: 'webkitVisibilityState',
                  changeEvent: 'webkitvisibilitychange'
                },
                {
                  hiddenProperty: 'mozHidden',
                  stateProperty: 'mozVisibilityState',
                  changeEvent: 'mozvisibilitychange'
                },
                {
                  hiddenProperty: 'msHidden',
                  stateProperty: 'msVisibilityState',
                  changeEvent: 'msvisibilitychange'
                }
              ].find(function (vnd) {
                return vnd.hiddenProperty in document
              })
            )
          } catch (ex) {}
          return undefined
        })()),
        Object.freeze(
          Object.defineProperties(
            {},
            {
              vendor: {
                get: function () {
                  return vendor
                }
              },
              state: {
                get: function () {
                  return (vendor && document[vendor.stateProperty]) || 'visible'
                }
              },
              isEnabled: {
                value: function () {
                  return Boolean(vendor)
                }
              },
              isHidden: {
                value: function () {
                  return Boolean(vendor && document[vendor.hiddenProperty])
                }
              },
              hiddenProperty: { value: vendor && vendor.hiddenProperty },
              stateProperty: { value: vendor && vendor.stateProperty },
              changeEvent: { value: vendor && vendor.changeEvent }
            }
          )
        )),
      vendor,
      Fullscreen = (function () {
        var _hasPromise,
          vendor = (function () {
            try {
              return Object.freeze(
                [
                  {
                    isEnabled: 'fullscreenEnabled',
                    element: 'fullscreenElement',
                    requestFn: 'requestFullscreen',
                    exitFn: 'exitFullscreen',
                    changeEvent: 'fullscreenchange',
                    errorEvent: 'fullscreenerror'
                  },
                  {
                    isEnabled: 'webkitFullscreenEnabled',
                    element: 'webkitFullscreenElement',
                    requestFn: 'webkitRequestFullscreen',
                    exitFn: 'webkitExitFullscreen',
                    changeEvent: 'webkitfullscreenchange',
                    errorEvent: 'webkitfullscreenerror'
                  },
                  {
                    isEnabled: 'mozFullScreenEnabled',
                    element: 'mozFullScreenElement',
                    requestFn: 'mozRequestFullScreen',
                    exitFn: 'mozCancelFullScreen',
                    changeEvent: 'mozfullscreenchange',
                    errorEvent: 'mozfullscreenerror'
                  },
                  {
                    isEnabled: 'msFullscreenEnabled',
                    element: 'msFullscreenElement',
                    requestFn: 'msRequestFullscreen',
                    exitFn: 'msExitFullscreen',
                    changeEvent: 'MSFullscreenChange',
                    errorEvent: 'MSFullscreenError'
                  }
                ].find(function (vnd) {
                  return vnd.isEnabled in document
                })
              )
            } catch (ex) {}
            return undefined
          })(),
          _returnsPromise =
            ((_hasPromise = null),
            function () {
              if (null !== _hasPromise) return _hasPromise
              if (((_hasPromise = !1), vendor))
                try {
                  var value = document.exitFullscreen()
                  value.catch(function () {}),
                    (_hasPromise = value instanceof Promise)
                } catch (ex) {}
              return _hasPromise
            })
        function _selectElement (requestedEl) {
          var selectedEl = requestedEl || document.documentElement
          return (
            selectedEl === document.documentElement &&
              ('msRequestFullscreen' === vendor.requestFn ||
                (Browser.isOpera && Browser.operaVersion < 15)) &&
              (selectedEl = document.body),
            selectedEl
          )
        }
        function isFullscreen () {
          return Boolean(vendor && document[vendor.element])
        }
        function requestFullscreen (options, requestedEl) {
          var _this = this
          if (!vendor)
            return Promise.reject(new Error('fullscreen not supported'))
          var element = _selectElement(requestedEl)
          if ('function' != typeof element[vendor.requestFn])
            return Promise.reject(new Error('fullscreen not supported'))
          if (isFullscreen()) return Promise.resolve()
          if (_returnsPromise()) return element[vendor.requestFn](options)
          var namespace = '.Fullscreen_requestFullscreen'
          return new Promise(function (resolve, reject) {
            jQuery(element)
              .off(namespace)
              .one(
                ''
                  .concat(vendor.errorEvent)
                  .concat(namespace, ' ')
                  .concat(vendor.changeEvent)
                  .concat(namespace),
                function (ev) {
                  jQuery(_this).off(namespace),
                    ev.type === vendor.errorEvent
                      ? reject(new Error('unknown fullscreen request error'))
                      : resolve()
                }
              ),
              element[vendor.requestFn](options)
          })
        }
        function exitFullscreen () {
          var _this2 = this
          if (!vendor || 'function' != typeof document[vendor.exitFn])
            return Promise.reject(new TypeError('fullscreen not supported'))
          if (!isFullscreen())
            return Promise.reject(new TypeError('fullscreen mode not active'))
          if (_returnsPromise()) return document[vendor.exitFn]()
          var namespace = '.Fullscreen_exitFullscreen'
          return new Promise(function (resolve, reject) {
            jQuery(document)
              .off(namespace)
              .one(
                ''
                  .concat(vendor.errorEvent)
                  .concat(namespace, ' ')
                  .concat(vendor.changeEvent)
                  .concat(namespace),
                function (ev) {
                  jQuery(_this2).off(namespace),
                    ev.type === vendor.errorEvent
                      ? reject(new Error('unknown fullscreen exit error'))
                      : resolve()
                }
              ),
              document[vendor.exitFn]()
          })
        }
        return Object.freeze(
          Object.defineProperties(
            {},
            {
              vendor: {
                get: function () {
                  return vendor
                }
              },
              element: {
                get: function () {
                  return vendor ? document[vendor.element] : null
                }
              },
              isEnabled: {
                value: function () {
                  return Boolean(vendor && document[vendor.isEnabled])
                }
              },
              isFullscreen: { value: isFullscreen },
              request: { value: requestFullscreen },
              exit: { value: exitFullscreen },
              toggle: {
                value: function (options, requestedEl) {
                  return isFullscreen()
                    ? exitFullscreen()
                    : requestFullscreen(options, requestedEl)
                }
              },
              onChange: {
                value: function (handlerFn, requestedEl) {
                  if (vendor) {
                    var element = _selectElement(requestedEl)
                    $(element).on(vendor.changeEvent, handlerFn)
                  }
                }
              },
              offChange: {
                value: function (handlerFn, requestedEl) {
                  if (vendor) {
                    var element = _selectElement(requestedEl)
                    handlerFn
                      ? $(element).off(vendor.changeEvent, handlerFn)
                      : $(element).off(vendor.changeEvent)
                  }
                }
              },
              onError: {
                value: function (handlerFn, requestedEl) {
                  if (vendor) {
                    var element = _selectElement(requestedEl)
                    $(element).on(vendor.errorEvent, handlerFn)
                  }
                }
              },
              offError: {
                value: function (handlerFn, requestedEl) {
                  if (vendor) {
                    var element = _selectElement(requestedEl)
                    handlerFn
                      ? $(element).off(vendor.errorEvent, handlerFn)
                      : $(element).off(vendor.errorEvent)
                  }
                }
              }
            }
          )
        )
      })(),
      _ref3 = Object.freeze(
        Object.defineProperties(
          {},
          {
            clone: {
              value: function clone (orig) {
                return 'object' !== _typeof(orig) || null === orig
                  ? orig
                  : orig instanceof String
                  ? String(orig)
                  : orig instanceof Number
                  ? Number(orig)
                  : orig instanceof Boolean
                  ? Boolean(orig)
                  : 'function' == typeof orig.clone
                  ? orig.clone(!0)
                  : orig.nodeType && 'function' == typeof orig.cloneNode
                  ? orig.cloneNode(!0)
                  : (orig instanceof Array
                      ? (copy = new Array(orig.length))
                      : orig instanceof Date
                      ? (copy = new Date(orig.getTime()))
                      : orig instanceof Map
                      ? ((copy = new Map()),
                        orig.forEach(function (val, key) {
                          return copy.set(key, clone(val))
                        }))
                      : orig instanceof RegExp
                      ? (copy = new RegExp(orig))
                      : orig instanceof Set
                      ? ((copy = new Set()),
                        orig.forEach(function (val) {
                          return copy.add(clone(val))
                        }))
                      : (copy = Object.create(Object.getPrototypeOf(orig))),
                    Object.keys(orig).forEach(function (name) {
                      return (copy[name] = clone(orig[name]))
                    }),
                    copy)
                var copy
              }
            },
            convertBreaks: {
              value: function (source) {
                for (
                  var node,
                    output = document.createDocumentFragment(),
                    para = document.createElement('p');
                  null !== (node = source.firstChild);

                ) {
                  if (node.nodeType === Node.ELEMENT_NODE)
                    switch (node.nodeName.toUpperCase()) {
                      case 'BR':
                        if (
                          null !== node.nextSibling &&
                          node.nextSibling.nodeType === Node.ELEMENT_NODE &&
                          'BR' === node.nextSibling.nodeName.toUpperCase()
                        ) {
                          source.removeChild(node.nextSibling),
                            source.removeChild(node),
                            output.appendChild(para),
                            (para = document.createElement('p'))
                          continue
                        }
                        if (!para.hasChildNodes()) {
                          source.removeChild(node)
                          continue
                        }
                        break
                      case 'ADDRESS':
                      case 'ARTICLE':
                      case 'ASIDE':
                      case 'BLOCKQUOTE':
                      case 'CENTER':
                      case 'DIV':
                      case 'DL':
                      case 'FIGURE':
                      case 'FOOTER':
                      case 'FORM':
                      case 'H1':
                      case 'H2':
                      case 'H3':
                      case 'H4':
                      case 'H5':
                      case 'H6':
                      case 'HEADER':
                      case 'HR':
                      case 'MAIN':
                      case 'NAV':
                      case 'OL':
                      case 'P':
                      case 'PRE':
                      case 'SECTION':
                      case 'TABLE':
                      case 'UL':
                        para.hasChildNodes() &&
                          (output.appendChild(para),
                          (para = document.createElement('p'))),
                          output.appendChild(node)
                        continue
                    }
                  para.appendChild(node)
                }
                para.hasChildNodes() && output.appendChild(para),
                  source.appendChild(output)
              }
            },
            safeActiveElement: {
              value: function () {
                try {
                  return document.activeElement || null
                } catch (ex) {
                  return null
                }
              }
            },
            setDisplayTitle: {
              value: function (title) {
                if ('string' != typeof title)
                  throw new TypeError(
                    'story display title must be a string (received: '.concat(
                      Util.getType(title),
                      ')'
                    )
                  )
                var render = document.createDocumentFragment()
                new Wikifier(render, title)
                var text = (function (source) {
                  for (
                    var node,
                      copy = source.cloneNode(!0),
                      frag = document.createDocumentFragment();
                    null !== (node = copy.firstChild);

                  ) {
                    if (node.nodeType === Node.ELEMENT_NODE)
                      switch (node.nodeName.toUpperCase()) {
                        case 'BR':
                        case 'DIV':
                        case 'P':
                          frag.appendChild(document.createTextNode(' '))
                      }
                    frag.appendChild(node)
                  }
                  return frag.textContent
                })(render).trim()
                document.title =
                  Config.passages.displayTitles &&
                  '' !== State.passage &&
                  State.passage !== Config.passages.start
                    ? ''.concat(State.passage, ' | ').concat(text)
                    : text
                var storyTitle = document.getElementById('story-title')
                null !== storyTitle && jQuery(storyTitle).empty().append(render)
              }
            },
            setPageElement: {
              value: function (idOrElement, titles, defaultText) {
                var el =
                  'object' === _typeof(idOrElement)
                    ? idOrElement
                    : document.getElementById(idOrElement)
                if (null == el) return null
                var ids = Array.isArray(titles) ? titles : [titles]
                jQuery(el).empty()
                for (var i = 0, iend = ids.length; i < iend; ++i)
                  if (Story.has(ids[i]))
                    return (
                      new Wikifier(el, Story.get(ids[i]).processText().trim()),
                      el
                    )
                if (null != defaultText) {
                  var text = String(defaultText).trim()
                  '' !== text && new Wikifier(el, text)
                }
                return el
              }
            },
            throwError: {
              value: function (place, message, source) {
                var $wrapper = jQuery(document.createElement('div')),
                  $toggle = jQuery(document.createElement('button')),
                  $source = jQuery(document.createElement('pre')),
                  mesg = ''
                    .concat(L10n.get('errorTitle'), ': ')
                    .concat(message || 'unknown error')
                return (
                  $toggle
                    .addClass('error-toggle')
                    .ariaClick({ label: L10n.get('errorToggle') }, function () {
                      $toggle.hasClass('enabled')
                        ? ($toggle.removeClass('enabled'),
                          $source.attr({ 'aria-hidden': !0, hidden: 'hidden' }))
                        : ($toggle.addClass('enabled'),
                          $source.removeAttr('aria-hidden hidden'))
                    })
                    .appendTo($wrapper),
                  jQuery(document.createElement('span'))
                    .addClass('error')
                    .text(mesg)
                    .appendTo($wrapper),
                  jQuery(document.createElement('code'))
                    .text(source)
                    .appendTo($source),
                  $source
                    .addClass('error-source')
                    .attr({ 'aria-hidden': !0, hidden: 'hidden' })
                    .appendTo($wrapper),
                  $wrapper.addClass('error-view').appendTo(place),
                  console.warn(
                    ''
                      .concat(mesg, '\n\t')
                      .concat(source.replace(/\n/g, '\n\t'))
                  ),
                  !1
                )
              }
            },
            stringFrom: {
              value: function stringFrom (value) {
                switch (_typeof(value)) {
                  case 'function':
                    return '[function]'
                  case 'number':
                    if (Number.isNaN(value)) return '[number NaN]'
                    break
                  case 'object':
                    if (null === value) return '[null]'
                    if (value instanceof Array)
                      return value
                        .map(function (val) {
                          return stringFrom(val)
                        })
                        .join(', ')
                    if (value instanceof Set)
                      return Array.from(value)
                        .map(function (val) {
                          return stringFrom(val)
                        })
                        .join(', ')
                    if (value instanceof Map) {
                      var result = Array.from(value).map(function (_ref4) {
                        var _ref5 = _slicedToArray(_ref4, 2),
                          key = _ref5[0],
                          val = _ref5[1]
                        return ''
                          .concat(stringFrom(key), ' → ')
                          .concat(stringFrom(val))
                      })
                      return '{ '.concat(result.join(', '), ' }')
                    }
                    if (value instanceof Date) return value.toLocaleString()
                    if (value instanceof Element) {
                      if (
                        value === document.documentElement ||
                        value === document.head ||
                        value === document.body
                      )
                        throw new Error(
                          'illegal operation; attempting to convert the <html>, <head>, or <body> tags to string is not allowed'
                        )
                      return value.outerHTML
                    }
                    return value instanceof Node
                      ? value.textContent
                      : 'function' == typeof value.toString
                      ? value.toString()
                      : Object.prototype.toString.call(value)
                  case 'symbol':
                    var desc =
                      void 0 !== value.description
                        ? ' "'.concat(value.description, '"')
                        : ''
                    return '[symbol'.concat(desc, ']')
                  case 'undefined':
                    return '[undefined]'
                }
                return String(value)
              }
            }
          }
        )
      ),
      clone = _ref3.clone,
      convertBreaks = _ref3.convertBreaks,
      safeActiveElement = _ref3.safeActiveElement,
      setDisplayTitle = _ref3.setDisplayTitle,
      setPageElement = _ref3.setPageElement,
      throwError = _ref3.throwError,
      stringFrom = _ref3.stringFrom
    !(function () {
      function onKeypressFn (ev) {
        ;(13 !== ev.which && 32 !== ev.which) ||
          (ev.preventDefault(),
          jQuery(safeActiveElement() || this).trigger('click'))
      }
      function onClickFnWrapper (fn) {
        return function () {
          var $this = jQuery(this)
          $this.ariaIsDisabled() ||
            ($this.is('[aria-pressed]') &&
              $this.attr(
                'aria-pressed',
                'true' === $this.attr('aria-pressed') ? 'false' : 'true'
              ),
            fn.apply(this, arguments))
        }
      }
      function oneClickFnWrapper (fn) {
        return onClickFnWrapper(function () {
          jQuery(this)
            .off('.aria-clickable')
            .removeAttr('role tabindex aria-controls aria-pressed')
            .filter('button')
            .prop('disabled', !0),
            fn.apply(this, arguments)
        })
      }
      jQuery.fn.extend({
        ariaClick: function (options, handler) {
          if (0 === this.length || 0 === arguments.length) return this
          var opts = options,
            fn = handler
          return (
            null == fn && ((fn = opts), (opts = undefined)),
            'string' !=
            typeof (opts = jQuery.extend(
              {
                namespace: undefined,
                one: !1,
                selector: undefined,
                data: undefined,
                role: undefined,
                controls: undefined,
                pressed: undefined,
                label: undefined
              },
              opts
            )).namespace
              ? (opts.namespace = '')
              : '.' !== opts.namespace[0] &&
                (opts.namespace = '.'.concat(opts.namespace)),
            'boolean' == typeof opts.pressed &&
              (opts.pressed = opts.pressed ? 'true' : 'false'),
            this.filter('button').prop('type', 'button'),
            null != opts.role
              ? this.attr('role', opts.role)
              : this.not('[role]')
                  .filter('a,[data-passage]')
                  .attr('role', 'link')
                  .end()
                  .not('a')
                  .not('[data-passage]')
                  .attr('role', 'button')
                  .end()
                  .end()
                  .end(),
            this.attr('tabindex', 0),
            null != opts.controls && this.attr('aria-controls', opts.controls),
            null != opts.pressed && this.attr('aria-pressed', opts.pressed),
            null != opts.label &&
              this.attr({ 'aria-label': opts.label, title: opts.label }),
            this.not('button').on(
              'keypress.aria-clickable'.concat(opts.namespace),
              opts.selector,
              onKeypressFn
            ),
            this.on(
              'click.aria-clickable'.concat(opts.namespace),
              opts.selector,
              opts.data,
              opts.one ? oneClickFnWrapper(fn) : onClickFnWrapper(fn)
            ),
            this
          )
        },
        ariaDisabled: function (disable) {
          if (0 === this.length || 0 === arguments.length) return this
          var $nonDisableable = this.not(
              'button,fieldset,input,menuitem,optgroup,option,select,textarea'
            ),
            $disableable = this.filter(
              'button,fieldset,input,menuitem,optgroup,option,select,textarea'
            )
          return (
            disable
              ? ($nonDisableable.each(function () {
                  this.setAttribute('disabled', ''),
                    this.setAttribute('aria-disabled', 'true')
                }),
                $disableable.each(function () {
                  ;(this.disabled = !0),
                    this.setAttribute('aria-disabled', 'true')
                }))
              : ($nonDisableable.each(function () {
                  this.removeAttribute('disabled'),
                    this.removeAttribute('aria-disabled')
                }),
                $disableable.each(function () {
                  ;(this.disabled = !1), this.removeAttribute('aria-disabled')
                })),
            this
          )
        },
        ariaIsDisabled: function () {
          return this.is('[disabled]')
        }
      })
    })(),
      jQuery.extend({
        wikiWithOptions: function (options) {
          for (
            var _len = arguments.length,
              sources = new Array(_len > 1 ? _len - 1 : 0),
              _key = 1;
            _key < _len;
            _key++
          )
            sources[_key - 1] = arguments[_key]
          if (0 !== sources.length) {
            var frag = document.createDocumentFragment()
            sources.forEach(function (content) {
              return new Wikifier(frag, content, options)
            })
            var errors = _toConsumableArray(
              frag.querySelectorAll('.error')
            ).map(function (errEl) {
              return errEl.textContent.replace(errorPrologRegExp, '')
            })
            if (errors.length > 0) throw new Error(errors.join('; '))
          }
        },
        wiki: function () {
          for (
            var _len2 = arguments.length, sources = new Array(_len2), _key2 = 0;
            _key2 < _len2;
            _key2++
          )
            sources[_key2] = arguments[_key2]
          this.wikiWithOptions.apply(this, [undefined].concat(sources))
        }
      }),
      jQuery.fn.extend({
        wikiWithOptions: function (options) {
          for (
            var _len3 = arguments.length,
              sources = new Array(_len3 > 1 ? _len3 - 1 : 0),
              _key3 = 1;
            _key3 < _len3;
            _key3++
          )
            sources[_key3 - 1] = arguments[_key3]
          if (0 === this.length || 0 === sources.length) return this
          var frag = document.createDocumentFragment()
          return (
            sources.forEach(function (content) {
              return new Wikifier(frag, content, options)
            }),
            this.append(frag),
            this
          )
        },
        wiki: function () {
          for (
            var _len4 = arguments.length, sources = new Array(_len4), _key4 = 0;
            _key4 < _len4;
            _key4++
          )
            sources[_key4] = arguments[_key4]
          return this.wikiWithOptions.apply(this, [undefined].concat(sources))
        }
      })
    var Util = (function () {
        var toString,
          utilGetType =
            '[object Object]' ===
            (toString = Object.prototype.toString).call(new Map())
              ? function (O) {
                  if (null === O) return 'null'
                  if (O instanceof Map) return 'Map'
                  if (O instanceof Set) return 'Set'
                  var baseType = _typeof(O)
                  return 'object' === baseType
                    ? toString.call(O).slice(8, -1)
                    : baseType
                }
              : function (O) {
                  if (null === O) return 'null'
                  var baseType = _typeof(O)
                  return 'object' === baseType
                    ? toString.call(O).slice(8, -1)
                    : baseType
                }
        function utilToEnum (obj) {
          var pEnum = Object.create(null)
          if (obj instanceof Array)
            obj.forEach(function (val, i) {
              return (pEnum[String(val)] = i)
            })
          else if (obj instanceof Set)
            Array.from(obj).forEach(function (val, i) {
              return (pEnum[String(val)] = i)
            })
          else if (obj instanceof Map)
            obj.forEach(function (val, key) {
              return (pEnum[String(key)] = val)
            })
          else {
            if (
              'object' !== _typeof(obj) ||
              null === obj ||
              Object.getPrototypeOf(obj) !== Object.prototype
            )
              throw new TypeError(
                'Util.toEnum obj parameter must be an Array, Map, Set, or generic object'
              )
            Object.assign(pEnum, obj)
          }
          return Object.freeze(pEnum)
        }
        function utilToStringTag (obj) {
          return Object.prototype.toString.call(obj).slice(8, -1)
        }
        var _illegalSlugCharsRe = /[\x00-\x20!-/:-@[-^`{-\x9f]+/g,
          _isInvalidSlugRe = /^-*$/
        var _illegalFilenameCharsRE =
          /[\x00-\x1f"#$%&'*+,/:;<=>?\\^`|\x7f-\x9f]+/g
        var _markupCharsRe = /[!"#$&'*\-/<=>?@[\\\]^_`{|}~]/g,
          _hasMarkupCharsRe = new RegExp(_markupCharsRe.source),
          _markupCharsMap = utilToEnum({
            '!': '&#33;',
            '"': '&quot;',
            '#': '&#35;',
            $: '&#36;',
            '&': '&amp;',
            "'": '&#39;',
            '*': '&#42;',
            '-': '&#45;',
            '/': '&#47;',
            '<': '&lt;',
            '=': '&#61;',
            '>': '&gt;',
            '?': '&#63;',
            '@': '&#64;',
            '[': '&#91;',
            '\\': '&#92;',
            ']': '&#93;',
            '^': '&#94;',
            _: '&#95;',
            '`': '&#96;',
            '{': '&#123;',
            '|': '&#124;',
            '}': '&#125;',
            '~': '&#126;'
          })
        var _htmlCharsRe = /[&<>"'`]/g,
          _hasHtmlCharsRe = new RegExp(_htmlCharsRe.source),
          _htmlCharsMap = utilToEnum({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '`': '&#96;'
          })
        function utilEscape (str) {
          if (null == str) return ''
          var val = String(str)
          return val && _hasHtmlCharsRe.test(val)
            ? val.replace(_htmlCharsRe, function (ch) {
                return _htmlCharsMap[ch]
              })
            : val
        }
        var _escapedHtmlRe =
            /&(?:amp|#38|#x26|lt|#60|#x3c|gt|#62|#x3e|quot|#34|#x22|apos|#39|#x27|#96|#x60);/gi,
          _hasEscapedHtmlRe = new RegExp(_escapedHtmlRe.source, 'i'),
          _escapedHtmlMap = utilToEnum({
            '&amp;': '&',
            '&#38;': '&',
            '&#x26;': '&',
            '&lt;': '<',
            '&#60;': '<',
            '&#x3c;': '<',
            '&gt;': '>',
            '&#62;': '>',
            '&#x3e;': '>',
            '&quot;': '"',
            '&#34;': '"',
            '&#x22;': '"',
            '&apos;': "'",
            '&#39;': "'",
            '&#x27;': "'",
            '&#96;': '`',
            '&#x60;': '`'
          })
        function utilUnescape (str) {
          if (null == str) return ''
          var val = String(str)
          return val && _hasEscapedHtmlRe.test(val)
            ? val.replace(_escapedHtmlRe, function (entity) {
                return _escapedHtmlMap[entity.toLowerCase()]
              })
            : val
        }
        var _nowSource = Has.performance ? performance : Date
        var _cssTimeRe = /^([+-]?(?:\d*\.)?\d+)([Mm]?[Ss])$/
        var utilScrubEventKey = (function () {
            var separatorKey, decimalKey
            if (
              'undefined' != typeof Intl &&
              'function' == typeof Intl.NumberFormat
            ) {
              var match = new Intl.NumberFormat()
                .format(111111.5)
                .match(/(\D*)\d+(\D*)/)
              match && ((separatorKey = match[1]), (decimalKey = match[2]))
            }
            return (
              separatorKey ||
                decimalKey ||
                ((separatorKey = ','), (decimalKey = '.')),
              function (key) {
                switch (key) {
                  case 'Scroll':
                    return 'ScrollLock'
                  case 'Spacebar':
                    return ' '
                  case 'Left':
                    return 'ArrowLeft'
                  case 'Right':
                    return 'ArrowRight'
                  case 'Up':
                    return 'ArrowUp'
                  case 'Down':
                    return 'ArrowDown'
                  case 'Del':
                    return 'Delete'
                  case 'Crsel':
                    return 'CrSel'
                  case 'Exsel':
                    return 'ExSel'
                  case 'Esc':
                    return 'Escape'
                  case 'Apps':
                    return 'ContextMenu'
                  case 'Nonconvert':
                    return 'NonConvert'
                  case 'MediaNextTrack':
                    return 'MediaTrackNext'
                  case 'MediaPreviousTrack':
                    return 'MediaTrackPrevious'
                  case 'VolumeUp':
                    return 'AudioVolumeUp'
                  case 'VolumeDown':
                    return 'AudioVolumeDown'
                  case 'VolumeMute':
                    return 'AudioVolumeMute'
                  case 'Zoom':
                    return 'ZoomToggle'
                  case 'SelectMedia':
                  case 'MediaSelect':
                    return 'LaunchMediaPlayer'
                  case 'Add':
                    return '+'
                  case 'Divide':
                    return '/'
                  case 'Multiply':
                    return '*'
                  case 'Subtract':
                    return '-'
                  case 'Decimal':
                    return decimalKey
                  case 'Separator':
                    return separatorKey
                }
                return key
              }
            )
          })(),
          utilHasMediaQuery =
            'function' != typeof window.matchMedia
              ? function () {
                  return !1
                }
              : function (mediaQuery) {
                  return window.matchMedia(mediaQuery).matches
                }
        return Object.freeze(
          Object.defineProperties(
            {},
            {
              getType: { value: utilGetType },
              isBoolean: {
                value: function (obj) {
                  return (
                    'boolean' == typeof obj ||
                    ('string' == typeof obj &&
                      ('true' === obj || 'false' === obj))
                  )
                }
              },
              isIterable: {
                value: function (obj) {
                  return (
                    null != obj && 'function' == typeof obj[Symbol.iterator]
                  )
                }
              },
              isNumeric: {
                value: function (obj) {
                  var num
                  switch (_typeof(obj)) {
                    case 'number':
                      num = obj
                      break
                    case 'string':
                      num = Number(obj)
                      break
                    default:
                      return !1
                  }
                  return !Number.isNaN(num) && Number.isFinite(num)
                }
              },
              sameValueZero: {
                value: function (a, b) {
                  return a === b || (a != a && b != b)
                }
              },
              toEnum: { value: utilToEnum },
              toStringTag: { value: utilToStringTag },
              slugify: {
                value: function (str) {
                  var base = String(str).trim(),
                    _legacy = base
                      .replace(/[^\w\s\u2013\u2014-]+/g, '')
                      .replace(/[_\s\u2013\u2014-]+/g, '-')
                      .toLocaleLowerCase()
                  return _isInvalidSlugRe.test(_legacy)
                    ? base
                        .replace(_illegalSlugCharsRe, '')
                        .replace(/[_\s\u2013\u2014-]+/g, '-')
                    : _legacy
                }
              },
              sanitizeFilename: {
                value: function (str) {
                  return String(str).trim().replace(_illegalFilenameCharsRE, '')
                }
              },
              escapeMarkup: {
                value: function (str) {
                  if (null == str) return ''
                  var val = String(str)
                  return val && _hasMarkupCharsRe.test(val)
                    ? val.replace(_markupCharsRe, function (ch) {
                        return _markupCharsMap[ch]
                      })
                    : val
                }
              },
              escape: { value: utilEscape },
              unescape: { value: utilUnescape },
              charAndPosAt: {
                value: function (text, position) {
                  var str = String(text),
                    pos = Math.trunc(position),
                    code = str.charCodeAt(pos)
                  if (Number.isNaN(code))
                    return { char: '', start: -1, end: -1 }
                  var retval = { char: str.charAt(pos), start: pos, end: pos }
                  if (code < 55296 || code > 57343) return retval
                  if (code >= 55296 && code <= 56319) {
                    var nextPos = pos + 1
                    if (nextPos >= str.length) return retval
                    var nextCode = str.charCodeAt(nextPos)
                    return (
                      nextCode < 56320 ||
                        nextCode > 57343 ||
                        ((retval.char = retval.char + str.charAt(nextPos)),
                        (retval.end = nextPos)),
                      retval
                    )
                  }
                  if (0 === pos) return retval
                  var prevPos = pos - 1,
                    prevCode = str.charCodeAt(prevPos)
                  return (
                    prevCode < 55296 ||
                      prevCode > 56319 ||
                      ((retval.char = str.charAt(prevPos) + retval.char),
                      (retval.start = prevPos)),
                    retval
                  )
                }
              },
              now: {
                value: function () {
                  return _nowSource.now()
                }
              },
              fromCssTime: {
                value: function (cssTime) {
                  var match = _cssTimeRe.exec(String(cssTime))
                  if (null === match)
                    throw new SyntaxError(
                      'invalid time value syntax: "'.concat(cssTime, '"')
                    )
                  var msec = Number(match[1])
                  if (
                    (1 === match[2].length && (msec *= 1e3),
                    Number.isNaN(msec) || !Number.isFinite(msec))
                  )
                    throw new RangeError(
                      'invalid time value: "'.concat(cssTime, '"')
                    )
                  return msec
                }
              },
              toCssTime: {
                value: function (msec) {
                  if (
                    'number' != typeof msec ||
                    Number.isNaN(msec) ||
                    !Number.isFinite(msec)
                  ) {
                    var what
                    switch (_typeof(msec)) {
                      case 'string':
                        what = '"'.concat(msec, '"')
                        break
                      case 'number':
                        what = String(msec)
                        break
                      default:
                        what = utilToStringTag(msec)
                    }
                    throw new Error('invalid milliseconds: '.concat(what))
                  }
                  return ''.concat(msec, 'ms')
                }
              },
              fromCssProperty: {
                value: function (cssName) {
                  if (!cssName.includes('-'))
                    switch (cssName) {
                      case 'bgcolor':
                        return 'backgroundColor'
                      case 'float':
                        return 'cssFloat'
                      default:
                        return cssName
                    }
                  return (
                    '-ms-' === cssName.slice(0, 4) ? cssName.slice(1) : cssName
                  )
                    .split('-')
                    .map(function (part, i) {
                      return 0 === i ? part : part.toUpperFirst()
                    })
                    .join('')
                }
              },
              parseUrl: {
                value: function (url) {
                  var el = document.createElement('a'),
                    queryObj = Object.create(null)
                  ;(el.href = url),
                    el.search &&
                      el.search
                        .replace(/^\?/, '')
                        .splitOrEmpty(/(?:&(?:amp;)?|;)/)
                        .forEach(function (query) {
                          var _query$split2 = _slicedToArray(
                              query.split('='),
                              2
                            ),
                            key = _query$split2[0],
                            value = _query$split2[1]
                          queryObj[key] = value
                        })
                  var pathname =
                    el.host && '/' !== el.pathname[0]
                      ? '/'.concat(el.pathname)
                      : el.pathname
                  return {
                    href: el.href,
                    protocol: el.protocol,
                    host: el.host,
                    hostname: el.hostname,
                    port: el.port,
                    path: ''.concat(pathname).concat(el.search),
                    pathname: pathname,
                    query: el.search,
                    search: el.search,
                    queries: queryObj,
                    searches: queryObj,
                    hash: el.hash
                  }
                }
              },
              newExceptionFrom: {
                value: function (original, exceptionType, override) {
                  if ('object' !== _typeof(original) || null === original)
                    throw new Error(
                      'Util.newExceptionFrom original parameter must be an object'
                    )
                  if ('function' != typeof exceptionType)
                    throw new Error(
                      'Util.newExceptionFrom exceptionType parameter must be an error type constructor'
                    )
                  var ex = new exceptionType(original.message)
                  void 0 !== original.name && (ex.name = original.name),
                    void 0 !== original.code && (ex.code = original.code),
                    void 0 !== original.columnNumber &&
                      (ex.columnNumber = original.columnNumber),
                    void 0 !== original.description &&
                      (ex.description = original.description),
                    void 0 !== original.fileName &&
                      (ex.fileName = original.fileName),
                    void 0 !== original.lineNumber &&
                      (ex.lineNumber = original.lineNumber),
                    void 0 !== original.number && (ex.number = original.number),
                    void 0 !== original.stack && (ex.stack = original.stack)
                  var overrideType = _typeof(override)
                  if ('undefined' !== overrideType)
                    if ('object' === overrideType && null !== override)
                      Object.assign(ex, override)
                    else {
                      if ('string' !== overrideType)
                        throw new Error(
                          'Util.newExceptionFrom override parameter must be an object or string'
                        )
                      ex.message = override
                    }
                  return ex
                }
              },
              scrubEventKey: { value: utilScrubEventKey },
              hasMediaQuery: { value: utilHasMediaQuery },
              random: { value: Math.random },
              entityEncode: { value: utilEscape },
              entityDecode: { value: utilUnescape },
              evalExpression: {
                value: function () {
                  return Scripting.evalJavaScript.apply(Scripting, arguments)
                }
              },
              evalStatements: {
                value: function () {
                  return Scripting.evalJavaScript.apply(Scripting, arguments)
                }
              }
            }
          )
        )
      })(),
      SimpleStore =
        ((_adapters = []),
        (_initialized = null),
        Object.freeze(
          Object.defineProperties(
            {},
            {
              adapters: { value: _adapters },
              create: {
                value: function (storageId, persistent) {
                  if (_initialized)
                    return _initialized.create(storageId, persistent)
                  for (var i = 0; i < _adapters.length; ++i)
                    if (_adapters[i].init(storageId, persistent))
                      return (_initialized = _adapters[i]).create(
                        storageId,
                        persistent
                      )
                  throw new Error('no valid storage adapters found')
                }
              }
            }
          )
        )),
      _adapters,
      _initialized,
      _ok,
      _WebStorageAdapter
    SimpleStore.adapters.push(
      ((_ok = !1),
      (_WebStorageAdapter = (function () {
        function _WebStorageAdapter (storageId, persistent) {
          _classCallCheck(this, _WebStorageAdapter)
          var prefix = ''.concat(storageId, '.'),
            engine = null,
            name = null
          persistent
            ? ((engine = window.localStorage), (name = 'localStorage'))
            : ((engine = window.sessionStorage), (name = 'sessionStorage')),
            Object.defineProperties(this, {
              _engine: { value: engine },
              _prefix: { value: prefix },
              _prefixRe: {
                value: new RegExp('^'.concat(RegExp.escape(prefix)))
              },
              name: { value: name },
              id: { value: storageId },
              persistent: { value: !!persistent }
            })
        }
        return (
          _createClass(
            _WebStorageAdapter,
            [
              {
                key: 'length',
                get: function () {
                  return this.keys().length
                }
              },
              {
                key: 'size',
                value: function () {
                  return this.keys().length
                }
              },
              {
                key: 'keys',
                value: function () {
                  for (var keys = [], i = 0; i < this._engine.length; ++i) {
                    var key = this._engine.key(i)
                    this._prefixRe.test(key) &&
                      keys.push(key.replace(this._prefixRe, ''))
                  }
                  return keys
                }
              },
              {
                key: 'has',
                value: function (key) {
                  return (
                    !('string' != typeof key || !key) &&
                    this._engine.hasOwnProperty(this._prefix + key)
                  )
                }
              },
              {
                key: 'get',
                value: function (key) {
                  if ('string' != typeof key || !key) return null
                  var value = this._engine.getItem(this._prefix + key)
                  return null == value
                    ? null
                    : _WebStorageAdapter._deserialize(value)
                }
              },
              {
                key: 'set',
                value: function (key, value) {
                  if ('string' != typeof key || !key) return !1
                  try {
                    this._engine.setItem(
                      this._prefix + key,
                      _WebStorageAdapter._serialize(value)
                    )
                  } catch (ex) {
                    if (
                      /quota.?(?:exceeded|reached)/i.test(ex.name + ex.message)
                    )
                      throw Util.newExceptionFrom(
                        ex,
                        Error,
                        ''.concat(this.name, ' quota exceeded')
                      )
                    throw ex
                  }
                  return !0
                }
              },
              {
                key: 'delete',
                value: function (key) {
                  return !(
                    'string' != typeof key ||
                    !key ||
                    (this._engine.removeItem(this._prefix + key), 0)
                  )
                }
              },
              {
                key: 'clear',
                value: function () {
                  for (
                    var keys = this.keys(), i = 0, iend = keys.length;
                    i < iend;
                    ++i
                  )
                    this.delete(keys[i])
                  return !0
                }
              }
            ],
            [
              {
                key: '_serialize',
                value: function (obj) {
                  return LZString.compressToUTF16(JSON.stringify(obj))
                }
              },
              {
                key: '_deserialize',
                value: function (str) {
                  return JSON.parse(LZString.decompressFromUTF16(str))
                }
              }
            ]
          ),
          _WebStorageAdapter
        )
      })()),
      Object.freeze(
        Object.defineProperties(
          {},
          {
            init: {
              value: function () {
                function hasWebStorage (storeId) {
                  try {
                    var store = window[storeId],
                      tid = '_sc_'.concat(String(Date.now()))
                    store.setItem(tid, tid)
                    var result = store.getItem(tid) === tid
                    return store.removeItem(tid), result
                  } catch (ex) {}
                  return !1
                }
                return (_ok =
                  hasWebStorage('localStorage') &&
                  hasWebStorage('sessionStorage'))
              }
            },
            create: {
              value: function (storageId, persistent) {
                if (!_ok) throw new Error('adapter not initialized')
                return new _WebStorageAdapter(storageId, persistent)
              }
            }
          }
        )
      ))
    ),
      SimpleStore.adapters.push(
        (function () {
          var _MAX_EXPIRY = 'Tue, 19 Jan 2038 03:14:07 GMT',
            _MIN_EXPIRY = 'Thu, 01 Jan 1970 00:00:00 GMT',
            _ok = !1,
            _CookieAdapter = (function () {
              function _CookieAdapter (storageId, persistent) {
                _classCallCheck(this, _CookieAdapter)
                var prefix = ''
                  .concat(storageId)
                  .concat(persistent ? '!' : '*', '.')
                Object.defineProperties(this, {
                  _prefix: { value: prefix },
                  _prefixRe: {
                    value: new RegExp('^'.concat(RegExp.escape(prefix)))
                  },
                  name: { value: 'cookie' },
                  id: { value: storageId },
                  persistent: { value: !!persistent }
                })
              }
              return (
                _createClass(
                  _CookieAdapter,
                  [
                    {
                      key: 'length',
                      get: function () {
                        return this.keys().length
                      }
                    },
                    {
                      key: 'size',
                      value: function () {
                        return this.keys().length
                      }
                    },
                    {
                      key: 'keys',
                      value: function () {
                        if ('' === document.cookie) return []
                        for (
                          var cookies = document.cookie.split(/;\s*/),
                            keys = [],
                            i = 0;
                          i < cookies.length;
                          ++i
                        ) {
                          var kvPair = cookies[i].split('='),
                            key = decodeURIComponent(kvPair[0])
                          if (this._prefixRe.test(key))
                            '' !== decodeURIComponent(kvPair[1]) &&
                              keys.push(key.replace(this._prefixRe, ''))
                        }
                        return keys
                      }
                    },
                    {
                      key: 'has',
                      value: function (key) {
                        return (
                          !('string' != typeof key || !key) &&
                          null !== _CookieAdapter._getCookie(this._prefix + key)
                        )
                      }
                    },
                    {
                      key: 'get',
                      value: function (key) {
                        if ('string' != typeof key || !key) return null
                        var value = _CookieAdapter._getCookie(
                          this._prefix + key
                        )
                        return null === value
                          ? null
                          : _CookieAdapter._deserialize(value)
                      }
                    },
                    {
                      key: 'set',
                      value: function (key, value) {
                        if ('string' != typeof key || !key) return !1
                        try {
                          if (
                            (_CookieAdapter._setCookie(
                              this._prefix + key,
                              _CookieAdapter._serialize(value),
                              this.persistent
                                ? 'Tue, 19 Jan 2038 03:14:07 GMT'
                                : undefined
                            ),
                            !this.has(key))
                          )
                            throw new Error(
                              'unknown validation error during set'
                            )
                        } catch (ex) {
                          throw Util.newExceptionFrom(
                            ex,
                            Error,
                            'cookie error: '.concat(ex.message)
                          )
                        }
                        return !0
                      }
                    },
                    {
                      key: 'delete',
                      value: function (key) {
                        if ('string' != typeof key || !key || !this.has(key))
                          return !1
                        try {
                          if (
                            (_CookieAdapter._setCookie(
                              this._prefix + key,
                              undefined,
                              _MIN_EXPIRY
                            ),
                            this.has(key))
                          )
                            throw new Error(
                              'unknown validation error during delete'
                            )
                        } catch (ex) {
                          throw Util.newExceptionFrom(
                            ex,
                            Error,
                            'cookie error: '.concat(ex.message)
                          )
                        }
                        return !0
                      }
                    },
                    {
                      key: 'clear',
                      value: function () {
                        for (
                          var keys = this.keys(), i = 0, iend = keys.length;
                          i < iend;
                          ++i
                        )
                          this.delete(keys[i])
                        return !0
                      }
                    }
                  ],
                  [
                    {
                      key: '_getCookie',
                      value: function (prefixedKey) {
                        if (!prefixedKey || '' === document.cookie) return null
                        for (
                          var cookies = document.cookie.split(/;\s*/), i = 0;
                          i < cookies.length;
                          ++i
                        ) {
                          var kvPair = cookies[i].split('=')
                          if (prefixedKey === decodeURIComponent(kvPair[0]))
                            return decodeURIComponent(kvPair[1]) || null
                        }
                        return null
                      }
                    },
                    {
                      key: '_setCookie',
                      value: function (prefixedKey, value, expiry) {
                        if (prefixedKey) {
                          var payload = ''.concat(
                            encodeURIComponent(prefixedKey),
                            '='
                          )
                          null != value &&
                            (payload += encodeURIComponent(value)),
                            null != expiry &&
                              (payload += '; expires='.concat(expiry)),
                            (payload += '; path=/'),
                            (document.cookie = payload)
                        }
                      }
                    },
                    {
                      key: '_serialize',
                      value: function (obj) {
                        return LZString.compressToBase64(JSON.stringify(obj))
                      }
                    },
                    {
                      key: '_deserialize',
                      value: function (str) {
                        return JSON.parse(LZString.decompressFromBase64(str))
                      }
                    }
                  ]
                ),
                _CookieAdapter
              )
            })()
          return Object.freeze(
            Object.defineProperties(
              {},
              {
                init: {
                  value: function (storageId) {
                    try {
                      var tid = '_sc_'.concat(String(Date.now()))
                      _CookieAdapter._setCookie(
                        tid,
                        _CookieAdapter._serialize(tid),
                        undefined
                      ),
                        (_ok =
                          _CookieAdapter._deserialize(
                            _CookieAdapter._getCookie(tid)
                          ) === tid),
                        _CookieAdapter._setCookie(tid, undefined, _MIN_EXPIRY)
                    } catch (ex) {
                      _ok = !1
                    }
                    return (
                      _ok &&
                        (function (storageId) {
                          if ('' === document.cookie) return
                          for (
                            var oldPrefix = ''.concat(storageId, '.'),
                              oldPrefixRe = new RegExp(
                                '^'.concat(RegExp.escape(oldPrefix))
                              ),
                              persistPrefix = ''.concat(storageId, '!.'),
                              sessionPrefix = ''.concat(storageId, '*.'),
                              sessionTestRe = /\.(?:state|rcWarn)$/,
                              cookies = document.cookie.split(/;\s*/),
                              i = 0;
                            i < cookies.length;
                            ++i
                          ) {
                            var kvPair = cookies[i].split('='),
                              key = decodeURIComponent(kvPair[0])
                            if (oldPrefixRe.test(key)) {
                              var value = decodeURIComponent(kvPair[1])
                              '' !== value &&
                                (function () {
                                  var persist = !sessionTestRe.test(key)
                                  _CookieAdapter._setCookie(
                                    key,
                                    undefined,
                                    _MIN_EXPIRY
                                  ),
                                    _CookieAdapter._setCookie(
                                      key.replace(oldPrefixRe, function () {
                                        return persist
                                          ? persistPrefix
                                          : sessionPrefix
                                      }),
                                      value,
                                      persist ? _MAX_EXPIRY : undefined
                                    )
                                })()
                            }
                          }
                        })(storageId),
                      _ok
                    )
                  }
                },
                create: {
                  value: function (storageId, persistent) {
                    if (!_ok) throw new Error('adapter not initialized')
                    return new _CookieAdapter(storageId, persistent)
                  }
                }
              }
            )
          )
        })()
      )
    var DebugView = (function () {
        function DebugView (parent, type, name, title) {
          _classCallCheck(this, DebugView),
            Object.defineProperties(this, {
              parent: { value: parent },
              view: { value: document.createElement('span') },
              break: { value: document.createElement('wbr') }
            }),
            jQuery(this.view)
              .attr({
                title: title,
                'aria-label': title,
                'data-type': null != type ? type : '',
                'data-name': null != name ? name : ''
              })
              .addClass('debug'),
            jQuery(this.break).addClass('debug hidden'),
            this.parent.appendChild(this.view),
            this.parent.appendChild(this.break)
        }
        return (
          _createClass(
            DebugView,
            [
              {
                key: 'output',
                get: function () {
                  return this.view
                }
              },
              {
                key: 'type',
                get: function () {
                  return this.view.getAttribute('data-type')
                },
                set: function (type) {
                  this.view.setAttribute('data-type', null != type ? type : '')
                }
              },
              {
                key: 'name',
                get: function () {
                  return this.view.getAttribute('data-name')
                },
                set: function (name) {
                  this.view.setAttribute('data-name', null != name ? name : '')
                }
              },
              {
                key: 'title',
                get: function () {
                  return this.view.title
                },
                set: function (title) {
                  this.view.title = title
                }
              },
              {
                key: 'append',
                value: function (el) {
                  return jQuery(this.view).append(el), this
                }
              },
              {
                key: 'modes',
                value: function (options) {
                  if (null == options) {
                    var current = {}
                    return (
                      this.view.className
                        .splitOrEmpty(/\s+/)
                        .forEach(function (name) {
                          'debug' !== name && (current[name] = !0)
                        }),
                      current
                    )
                  }
                  if ('object' === _typeof(options))
                    return (
                      Object.keys(options).forEach(function (name) {
                        this[options[name] ? 'addClass' : 'removeClass'](name)
                      }, jQuery(this.view)),
                      this
                    )
                  throw new Error(
                    'DebugView.prototype.modes options parameter must be an object or null/undefined'
                  )
                }
              },
              {
                key: 'remove',
                value: function () {
                  var $view = jQuery(this.view)
                  this.view.hasChildNodes() &&
                    $view.contents().appendTo(this.parent),
                    $view.remove(),
                    jQuery(this.break).remove()
                }
              }
            ],
            [
              {
                key: 'isEnabled',
                value: function () {
                  return (
                    'enabled' ===
                    jQuery(document.documentElement).attr('data-debug-view')
                  )
                }
              },
              {
                key: 'enable',
                value: function () {
                  jQuery(document.documentElement).attr(
                    'data-debug-view',
                    'enabled'
                  ),
                    jQuery.event.trigger(':debugviewupdate')
                }
              },
              {
                key: 'disable',
                value: function () {
                  jQuery(document.documentElement).removeAttr(
                    'data-debug-view'
                  ),
                    jQuery.event.trigger(':debugviewupdate')
                }
              },
              {
                key: 'toggle',
                value: function () {
                  'enabled' ===
                  jQuery(document.documentElement).attr('data-debug-view')
                    ? DebugView.disable()
                    : DebugView.enable()
                }
              }
            ]
          ),
          DebugView
        )
      })(),
      NodeTyper = (function () {
        var NodeTyper = (function () {
          function NodeTyper (config) {
            if (
              (_classCallCheck(this, NodeTyper),
              'object' !== _typeof(config) || null === config)
            )
              throw new Error(
                'config parameter must be an object (received: '.concat(
                  Util.getType(config),
                  ')'
                )
              )
            if (
              !(
                config.hasOwnProperty('targetNode') &&
                config.targetNode instanceof Node
              )
            )
              throw new Error(
                'config parameter object "targetNode" property must be a node'
              )
            Object.defineProperties(this, {
              node: { value: config.targetNode },
              childNodes: { value: [] },
              nodeValue: { writable: !0, value: '' },
              appendTo: { writable: !0, value: config.parentNode || null },
              classNames: { writable: !0, value: config.classNames || null },
              finished: { writable: !0, value: !1 }
            })
            var childNode,
              node = this.node
            for (
              node.nodeValue &&
              ((this.nodeValue = node.nodeValue), (node.nodeValue = ''));
              null !== (childNode = node.firstChild);

            )
              this.childNodes.push(
                new NodeTyper({
                  targetNode: childNode,
                  parentNode: node,
                  classNames: this.classNames
                })
              ),
                node.removeChild(childNode)
          }
          return (
            _createClass(NodeTyper, [
              {
                key: 'finish',
                value: function () {
                  for (; this.type(!0); );
                  return !1
                }
              },
              {
                key: 'type',
                value: function (flush) {
                  if (this.finished) return !1
                  if (this.appendTo) {
                    if (
                      (this.appendTo.appendChild(this.node),
                      (this.appendTo = null),
                      (this.node.nodeType !== Node.ELEMENT_NODE &&
                        this.node.nodeType !== Node.TEXT_NODE) ||
                        'none' === jQuery(this.node.parentNode).css('display'))
                    )
                      return this.finish()
                    this.node.parentNode &&
                      this.classNames &&
                      jQuery(this.node.parentNode).addClass(this.classNames)
                  }
                  if (this.nodeValue) {
                    if (flush)
                      (this.node.nodeValue += this.nodeValue),
                        (this.nodeValue = '')
                    else {
                      var _Util$charAndPosAt = Util.charAndPosAt(
                          this.nodeValue,
                          0
                        ),
                        char = _Util$charAndPosAt.char,
                        start = _Util$charAndPosAt.start,
                        end = _Util$charAndPosAt.end
                      ;(this.node.nodeValue += char),
                        (this.nodeValue = this.nodeValue.slice(1 + end - start))
                    }
                    return !0
                  }
                  this.classNames &&
                    (jQuery(this.node.parentNode).removeClass(this.classNames),
                    (this.classNames = null))
                  for (
                    var childNodes = this.childNodes;
                    childNodes.length > 0;

                  ) {
                    if (childNodes[0].type()) return !0
                    childNodes.shift()
                  }
                  return (this.finished = !0), !1
                }
              }
            ]),
            NodeTyper
          )
        })()
        return NodeTyper
      })(),
      PRNGWrapper = (function () {
        function PRNGWrapper (seed, useEntropy) {
          _classCallCheck(this, PRNGWrapper),
            Object.defineProperties(
              this,
              new Math.seedrandom(seed, useEntropy, function (prng, seed) {
                return {
                  _prng: { value: prng },
                  seed: { writable: !0, value: seed },
                  pull: { writable: !0, value: 0 },
                  random: {
                    value: function () {
                      return ++this.pull, this._prng()
                    }
                  }
                }
              })
            )
        }
        return (
          _createClass(PRNGWrapper, null, [
            {
              key: 'marshal',
              value: function (prng) {
                if (
                  !prng ||
                  !prng.hasOwnProperty('seed') ||
                  !prng.hasOwnProperty('pull')
                )
                  throw new Error('PRNG is missing required data')
                return { seed: prng.seed, pull: prng.pull }
              }
            },
            {
              key: 'unmarshal',
              value: function (prngObj) {
                if (
                  !prngObj ||
                  !prngObj.hasOwnProperty('seed') ||
                  !prngObj.hasOwnProperty('pull')
                )
                  throw new Error('PRNG object is missing required data')
                for (
                  var prng = new PRNGWrapper(prngObj.seed, !1),
                    i = prngObj.pull;
                  i > 0;
                  --i
                )
                  prng.random()
                return prng
              }
            }
          ]),
          PRNGWrapper
        )
      })(),
      StyleWrapper =
        ((_imageMarkupRe = new RegExp(Patterns.cssImage, 'g')),
        (_hasImageMarkupRe = new RegExp(Patterns.cssImage)),
        (function () {
          function StyleWrapper (style) {
            if ((_classCallCheck(this, StyleWrapper), null == style))
              throw new TypeError(
                'StyleWrapper style parameter must be an HTMLStyleElement object'
              )
            Object.defineProperties(this, { style: { value: style } })
          }
          return (
            _createClass(StyleWrapper, [
              {
                key: 'isEmpty',
                value: function () {
                  return 0 === this.style.cssRules.length
                }
              },
              {
                key: 'set',
                value: function (rawCss) {
                  this.clear(), this.add(rawCss)
                }
              },
              {
                key: 'add',
                value: function (rawCss) {
                  var css = rawCss
                  _hasImageMarkupRe.test(css) &&
                    ((_imageMarkupRe.lastIndex = 0),
                    (css = css.replace(_imageMarkupRe, function (wikiImage) {
                      var markup = Wikifier.helpers.parseSquareBracketedMarkup({
                        source: wikiImage,
                        matchStart: 0
                      })
                      if (
                        markup.hasOwnProperty('error') ||
                        markup.pos < wikiImage.length
                      )
                        return wikiImage
                      var source = markup.source
                      if ('data:' !== source.slice(0, 5) && Story.has(source)) {
                        var passage = Story.get(source)
                        passage.tags.includes('Twine.image') &&
                          (source = passage.text.trim())
                      }
                      return 'url("'.concat(source.replace(/"/g, '%22'), '")')
                    }))),
                    this.style.styleSheet
                      ? (this.style.styleSheet.cssText += css)
                      : this.style.appendChild(document.createTextNode(css))
                }
              },
              {
                key: 'clear',
                value: function () {
                  this.style.styleSheet
                    ? (this.style.styleSheet.cssText = '')
                    : jQuery(this.style).empty()
                }
              }
            ]),
            StyleWrapper
          )
        })()),
      _imageMarkupRe,
      _hasImageMarkupRe,
      Diff =
        ((Op = Util.toEnum({
          Delete: 0,
          SpliceArray: 1,
          Copy: 2,
          CopyDate: 3
        })),
        Object.freeze(
          Object.defineProperties(
            {},
            {
              Op: { value: Op },
              diff: {
                value: function diff (orig, dest) {
                  for (
                    var aOpRef,
                      objToString = Object.prototype.toString,
                      origIsArray = orig instanceof Array,
                      keys = []
                        .concat(Object.keys(orig), Object.keys(dest))
                        .sort()
                        .filter(function (val, i, arr) {
                          return 0 === i || arr[i - 1] !== val
                        }),
                      diffed = {},
                      keyIsAOpRef = function (key) {
                        return key === aOpRef
                      },
                      i = 0,
                      klen = keys.length;
                    i < klen;
                    ++i
                  ) {
                    var key = keys[i],
                      origP = orig[key],
                      destP = dest[key]
                    if (orig.hasOwnProperty(key))
                      if (dest.hasOwnProperty(key)) {
                        if (origP === destP) continue
                        if (_typeof(origP) === _typeof(destP))
                          if ('function' == typeof origP)
                            origP.toString() !== destP.toString() &&
                              (diffed[key] = [Op.Copy, destP])
                          else if (
                            'object' !== _typeof(origP) ||
                            null === origP
                          )
                            diffed[key] = [Op.Copy, destP]
                          else {
                            var origPType = objToString.call(origP)
                            if (origPType === objToString.call(destP))
                              if (origP instanceof Date)
                                Number(origP) !== Number(destP) &&
                                  (diffed[key] = [Op.Copy, clone(destP)])
                              else if (origP instanceof Map)
                                diffed[key] = [Op.Copy, clone(destP)]
                              else if (origP instanceof RegExp)
                                origP.toString() !== destP.toString() &&
                                  (diffed[key] = [Op.Copy, clone(destP)])
                              else if (origP instanceof Set)
                                diffed[key] = [Op.Copy, clone(destP)]
                              else if ('[object Object]' !== origPType)
                                diffed[key] = [Op.Copy, clone(destP)]
                              else {
                                var recurse = diff(origP, destP)
                                null !== recurse && (diffed[key] = recurse)
                              }
                            else diffed[key] = [Op.Copy, clone(destP)]
                          }
                        else
                          diffed[key] = [
                            Op.Copy,
                            'object' !== _typeof(destP) || null === destP
                              ? destP
                              : clone(destP)
                          ]
                      } else if (origIsArray && Util.isNumeric(key)) {
                        var nKey = Number(key)
                        if (!aOpRef) {
                          aOpRef = ''
                          do {
                            aOpRef += '~'
                          } while (keys.some(keyIsAOpRef))
                          diffed[aOpRef] = [Op.SpliceArray, nKey, nKey]
                        }
                        nKey < diffed[aOpRef][1] && (diffed[aOpRef][1] = nKey),
                          nKey > diffed[aOpRef][2] && (diffed[aOpRef][2] = nKey)
                      } else diffed[key] = Op.Delete
                    else
                      diffed[key] = [
                        Op.Copy,
                        'object' !== _typeof(destP) || null === destP
                          ? destP
                          : clone(destP)
                      ]
                  }
                  return Object.keys(diffed).length > 0 ? diffed : null
                }
              },
              patch: {
                value: function patch (orig, diffed) {
                  for (
                    var keys = Object.keys(diffed || {}),
                      patched = clone(orig),
                      i = 0,
                      klen = keys.length;
                    i < klen;
                    ++i
                  ) {
                    var key = keys[i],
                      diffedP = diffed[key]
                    if (diffedP === Op.Delete) delete patched[key]
                    else if (diffedP instanceof Array)
                      switch (diffedP[0]) {
                        case Op.SpliceArray:
                          patched.splice(
                            diffedP[1],
                            diffedP[2] - diffedP[1] + 1
                          )
                          break
                        case Op.Copy:
                          patched[key] = clone(diffedP[1])
                          break
                        case Op.CopyDate:
                          patched[key] = new Date(diffedP[1])
                      }
                    else patched[key] = patch(patched[key], diffedP)
                  }
                  return patched
                }
              }
            }
          )
        )),
      Op,
      L10n =
        ((_patternRe = /\{\w+\}/g),
        (_hasPatternRe = new RegExp(_patternRe.source)),
        Object.freeze(
          Object.defineProperties(
            {},
            {
              init: {
                value: function () {
                  strings &&
                    Object.keys(strings).length > 0 &&
                    Object.keys(l10nStrings).forEach(function (id) {
                      try {
                        var value
                        switch (id) {
                          case 'identity':
                            value = strings.identity
                            break
                          case 'aborting':
                            value = strings.aborting
                            break
                          case 'cancel':
                            value = strings.cancel
                            break
                          case 'close':
                            value = strings.close
                            break
                          case 'ok':
                            value = strings.ok
                            break
                          case 'errorTitle':
                            value = strings.errors.title
                            break
                          case 'errorNonexistentPassage':
                            value = strings.errors.nonexistentPassage
                            break
                          case 'errorSaveMissingData':
                            value = strings.errors.saveMissingData
                            break
                          case 'errorSaveIdMismatch':
                            value = strings.errors.saveIdMismatch
                            break
                          case 'warningDegraded':
                            value = strings.warnings.degraded
                            break
                          case 'debugViewTitle':
                            value = strings.debugView.title
                            break
                          case 'debugViewToggle':
                            value = strings.debugView.toggle
                            break
                          case 'uiBarToggle':
                            value = strings.uiBar.toggle
                            break
                          case 'uiBarBackward':
                            value = strings.uiBar.backward
                            break
                          case 'uiBarForward':
                            value = strings.uiBar.forward
                            break
                          case 'uiBarJumpto':
                            value = strings.uiBar.jumpto
                            break
                          case 'jumptoTitle':
                            value = strings.jumpto.title
                            break
                          case 'jumptoTurn':
                            value = strings.jumpto.turn
                            break
                          case 'jumptoUnavailable':
                            value = strings.jumpto.unavailable
                            break
                          case 'savesTitle':
                            value = strings.saves.title
                            break
                          case 'savesDisallowed':
                            value = strings.saves.disallowed
                            break
                          case 'savesIncapable':
                            value = strings.saves.incapable
                            break
                          case 'savesLabelAuto':
                            value = strings.saves.labelAuto
                            break
                          case 'savesLabelDelete':
                            value = strings.saves.labelDelete
                            break
                          case 'savesLabelExport':
                            value = strings.saves.labelExport
                            break
                          case 'savesLabelImport':
                            value = strings.saves.labelImport
                            break
                          case 'savesLabelLoad':
                            value = strings.saves.labelLoad
                            break
                          case 'savesLabelClear':
                            value = strings.saves.labelClear
                            break
                          case 'savesLabelSave':
                            value = strings.saves.labelSave
                            break
                          case 'savesLabelSlot':
                            value = strings.saves.labelSlot
                            break
                          case 'savesUnavailable':
                            value = strings.saves.unavailable
                            break
                          case 'savesUnknownDate':
                            value = strings.saves.unknownDate
                            break
                          case 'settingsTitle':
                            value = strings.settings.title
                            break
                          case 'settingsOff':
                            value = strings.settings.off
                            break
                          case 'settingsOn':
                            value = strings.settings.on
                            break
                          case 'settingsReset':
                            value = strings.settings.reset
                            break
                          case 'restartTitle':
                            value = strings.restart.title
                            break
                          case 'restartPrompt':
                            value = strings.restart.prompt
                            break
                          case 'shareTitle':
                            value = strings.share.title
                            break
                          case 'alertTitle':
                            break
                          case 'autoloadTitle':
                            value = strings.autoload.title
                            break
                          case 'autoloadCancel':
                            value = strings.autoload.cancel
                            break
                          case 'autoloadOk':
                            value = strings.autoload.ok
                            break
                          case 'autoloadPrompt':
                            value = strings.autoload.prompt
                            break
                          case 'macroBackText':
                            value = strings.macros.back.text
                            break
                          case 'macroReturnText':
                            value = strings.macros.return.text
                        }
                        value &&
                          (l10nStrings[id] = value.replace(
                            /%\w+%/g,
                            function (pat) {
                              return '{'.concat(pat.slice(1, -1), '}')
                            }
                          ))
                      } catch (ex) {}
                    })
                }
              },
              get: {
                value: function (ids, overrides) {
                  if (!ids) return ''
                  var selectedId,
                    id =
                      ((Array.isArray(ids) ? ids : [ids]).some(function (id) {
                        return (
                          !!l10nStrings.hasOwnProperty(id) &&
                          ((selectedId = id), !0)
                        )
                      }),
                      selectedId)
                  if (!id) return ''
                  for (
                    var processed = l10nStrings[id], iteration = 0;
                    _hasPatternRe.test(processed);

                  ) {
                    if (++iteration > 50)
                      throw new Error(
                        'L10n.get exceeded maximum replacement iterations, probable infinite loop'
                      )
                    ;(_patternRe.lastIndex = 0),
                      (processed = processed.replace(
                        _patternRe,
                        function (pat) {
                          var subId = pat.slice(1, -1)
                          return overrides && overrides.hasOwnProperty(subId)
                            ? overrides[subId]
                            : l10nStrings.hasOwnProperty(subId)
                            ? l10nStrings[subId]
                            : void 0
                        }
                      ))
                  }
                  return processed
                }
              }
            }
          )
        )),
      _patternRe,
      _hasPatternRe,
      strings = {
        errors: {},
        warnings: {},
        debugView: {},
        uiBar: {},
        jumpto: {},
        saves: {},
        settings: {},
        restart: {},
        share: {},
        autoload: {},
        macros: { back: {}, return: {} }
      },
      l10nStrings = {
        identity: 'game',
        aborting: 'Aborting',
        cancel: 'Cancel',
        close: 'Close',
        ok: 'OK',
        errorTitle: 'Error',
        errorToggle: 'Toggle the error view',
        errorNonexistentPassage: 'the passage "{passage}" does not exist',
        errorSaveDiskLoadFailed: 'failed to load save file from disk',
        errorSaveMissingData:
          'save is missing required data. Either the loaded file is not a save or the save has become corrupted',
        errorSaveIdMismatch: 'save is from the wrong {identity}',
        _warningIntroLacking: 'Your browser either lacks or has disabled',
        _warningOutroDegraded:
          ', so this {identity} is running in a degraded mode. You may be able to continue, however, some parts may not work properly.',
        warningNoWebStorage:
          '{_warningIntroLacking} the Web Storage API{_warningOutroDegraded}',
        warningDegraded:
          '{_warningIntroLacking} some of the capabilities required by this {identity}{_warningOutroDegraded}',
        debugBarToggle: 'Toggle the debug bar',
        debugBarNoWatches: '— no watches set —',
        debugBarAddWatch: 'Add watch',
        debugBarDeleteWatch: 'Delete watch',
        debugBarWatchAll: 'Watch all',
        debugBarWatchNone: 'Delete all',
        debugBarLabelAdd: 'Add',
        debugBarLabelWatch: 'Watch',
        debugBarLabelTurn: 'Turn',
        debugBarLabelViews: 'Views',
        debugBarViewsToggle: 'Toggle the debug views',
        debugBarWatchToggle: 'Toggle the watch panel',
        uiBarToggle: 'Toggle the UI bar',
        uiBarBackward: 'Go backward within the {identity} history',
        uiBarForward: 'Go forward within the {identity} history',
        uiBarJumpto: 'Jump to a specific point within the {identity} history',
        jumptoTitle: 'Jump To',
        jumptoTurn: 'Turn',
        jumptoUnavailable: 'No jump points currently available…',
        savesTitle: 'Saves',
        savesDisallowed: 'Saving has been disallowed on this passage.',
        savesIncapable:
          '{_warningIntroLacking} the capabilities required to support saves, so saves have been disabled for this session.',
        savesLabelAuto: 'Autosave',
        savesLabelDelete: 'Delete',
        savesLabelExport: 'Save to Disk…',
        savesLabelImport: 'Load from Disk…',
        savesLabelLoad: 'Load',
        savesLabelClear: 'Delete All',
        savesLabelSave: 'Save',
        savesLabelSlot: 'Slot',
        savesUnavailable: 'No save slots found…',
        savesUnknownDate: 'unknown',
        settingsTitle: 'Settings',
        settingsOff: 'Off',
        settingsOn: 'On',
        settingsReset: 'Reset to Defaults',
        restartTitle: 'Restart',
        restartPrompt:
          'Are you sure that you want to restart? Unsaved progress will be lost.',
        shareTitle: 'Share',
        alertTitle: 'Alert',
        autoloadTitle: 'Autoload',
        autoloadCancel: 'Go to start',
        autoloadOk: 'Load autosave',
        autoloadPrompt: 'An autosave exists. Load it now or go to the start?',
        macroBackText: 'Back',
        macroReturnText: 'Return'
      },
      Config =
        ((_debug = !1),
        (_addVisitedLinkClass = !1),
        (_cleanupWikifierOutput = !1),
        (_loadDelay = 0),
        (_audioPauseOnFadeToZero = !0),
        (_audioPreloadMetadata = !0),
        (_historyControls = !0),
        (_historyMaxStates = 40),
        (_macrosIfAssignmentError = !0),
        (_macrosMaxLoopIterations = 1e3),
        (_macrosTypeSkipKey = ' '),
        (_macrosTypeVisitedPassages = !0),
        (_passagesDisplayTitles = !1),
        (_passagesNobr = !1),
        (_savesId = 'untitled-story'),
        (_savesSlots = 8),
        (_savesTryDiskOnMobile = !0),
        (_uiStowBarInitially = 800),
        (_uiUpdateStoryElements = !0),
        (_errHistoryModeDeprecated =
          'Config.history.mode has been deprecated and is no longer used by SugarCube, please remove it from your code'),
        Object.freeze({
          get debug () {
            return _debug
          },
          set debug (value) {
            _debug = Boolean(value)
          },
          get addVisitedLinkClass () {
            return _addVisitedLinkClass
          },
          set addVisitedLinkClass (value) {
            _addVisitedLinkClass = Boolean(value)
          },
          get cleanupWikifierOutput () {
            return _cleanupWikifierOutput
          },
          set cleanupWikifierOutput (value) {
            _cleanupWikifierOutput = Boolean(value)
          },
          get loadDelay () {
            return _loadDelay
          },
          set loadDelay (value) {
            if (!Number.isSafeInteger(value) || value < 0)
              throw new RangeError(
                'Config.loadDelay must be a non-negative integer'
              )
            _loadDelay = value
          },
          audio: Object.freeze({
            get pauseOnFadeToZero () {
              return _audioPauseOnFadeToZero
            },
            set pauseOnFadeToZero (value) {
              _audioPauseOnFadeToZero = Boolean(value)
            },
            get preloadMetadata () {
              return _audioPreloadMetadata
            },
            set preloadMetadata (value) {
              _audioPreloadMetadata = Boolean(value)
            }
          }),
          history: Object.freeze({
            get controls () {
              return _historyControls
            },
            set controls (value) {
              var controls = Boolean(value)
              if (1 === _historyMaxStates && controls)
                throw new Error(
                  'Config.history.controls must be false when Config.history.maxStates is 1'
                )
              _historyControls = controls
            },
            get maxStates () {
              return _historyMaxStates
            },
            set maxStates (value) {
              if (!Number.isSafeInteger(value) || value < 1)
                throw new RangeError(
                  'Config.history.maxStates must be a positive integer'
                )
              ;(_historyMaxStates = value),
                _historyControls && 1 === value && (_historyControls = !1)
            },
            get mode () {
              throw new Error(_errHistoryModeDeprecated)
            },
            set mode (_) {
              throw new Error(_errHistoryModeDeprecated)
            },
            get tracking () {
              throw new Error(
                'Config.history.tracking has been deprecated, use Config.history.maxStates instead'
              )
            },
            set tracking (_) {
              throw new Error(
                'Config.history.tracking has been deprecated, use Config.history.maxStates instead'
              )
            }
          }),
          macros: Object.freeze({
            get ifAssignmentError () {
              return _macrosIfAssignmentError
            },
            set ifAssignmentError (value) {
              _macrosIfAssignmentError = Boolean(value)
            },
            get maxLoopIterations () {
              return _macrosMaxLoopIterations
            },
            set maxLoopIterations (value) {
              if (!Number.isSafeInteger(value) || value < 1)
                throw new RangeError(
                  'Config.macros.maxLoopIterations must be a positive integer'
                )
              _macrosMaxLoopIterations = value
            },
            get typeSkipKey () {
              return _macrosTypeSkipKey
            },
            set typeSkipKey (value) {
              _macrosTypeSkipKey = String(value)
            },
            get typeVisitedPassages () {
              return _macrosTypeVisitedPassages
            },
            set typeVisitedPassages (value) {
              _macrosTypeVisitedPassages = Boolean(value)
            }
          }),
          navigation: Object.freeze({
            get override () {
              return _navigationOverride
            },
            set override (value) {
              if (!(null == value || value instanceof Function))
                throw new TypeError(
                  'Config.navigation.override must be a function or null/undefined (received: '.concat(
                    Util.getType(value),
                    ')'
                  )
                )
              _navigationOverride = value
            }
          }),
          passages: Object.freeze({
            get descriptions () {
              return _passagesDescriptions
            },
            set descriptions (value) {
              if (null != value) {
                var valueType = Util.getType(value)
                if (
                  'boolean' !== valueType &&
                  'Object' !== valueType &&
                  'function' !== valueType
                )
                  throw new TypeError(
                    'Config.passages.descriptions must be a boolean, object, function, or null/undefined (received: '.concat(
                      valueType,
                      ')'
                    )
                  )
              }
              _passagesDescriptions = value
            },
            get displayTitles () {
              return _passagesDisplayTitles
            },
            set displayTitles (value) {
              _passagesDisplayTitles = Boolean(value)
            },
            get nobr () {
              return _passagesNobr
            },
            set nobr (value) {
              _passagesNobr = Boolean(value)
            },
            get onProcess () {
              return _passagesOnProcess
            },
            set onProcess (value) {
              if (null != value) {
                var valueType = Util.getType(value)
                if ('function' !== valueType)
                  throw new TypeError(
                    'Config.passages.onProcess must be a function or null/undefined (received: '.concat(
                      valueType,
                      ')'
                    )
                  )
              }
              _passagesOnProcess = value
            },
            get start () {
              return _passagesStart
            },
            set start (value) {
              if (null != value) {
                var valueType = Util.getType(value)
                if ('string' !== valueType)
                  throw new TypeError(
                    'Config.passages.start must be a string or null/undefined (received: '.concat(
                      valueType,
                      ')'
                    )
                  )
              }
              _passagesStart = value
            },
            get transitionOut () {
              return _passagesTransitionOut
            },
            set transitionOut (value) {
              if (null != value) {
                var valueType = Util.getType(value)
                if (
                  'string' !== valueType &&
                  ('number' !== valueType ||
                    !Number.isSafeInteger(value) ||
                    value < 0)
                )
                  throw new TypeError(
                    'Config.passages.transitionOut must be a string, non-negative integer, or null/undefined (received: '.concat(
                      valueType,
                      ')'
                    )
                  )
              }
              _passagesTransitionOut = value
            }
          }),
          saves: Object.freeze({
            get autoload () {
              return _savesAutoload
            },
            set autoload (value) {
              if (null != value) {
                var valueType = Util.getType(value)
                if (
                  'boolean' !== valueType &&
                  'string' !== valueType &&
                  'function' !== valueType
                )
                  throw new TypeError(
                    'Config.saves.autoload must be a boolean, string, function, or null/undefined (received: '.concat(
                      valueType,
                      ')'
                    )
                  )
              }
              _savesAutoload = value
            },
            get autosave () {
              return _savesAutosave
            },
            set autosave (value) {
              if (null != value) {
                var valueType = Util.getType(value)
                if ('string' === valueType)
                  return void (_savesAutosave = [value])
                if (
                  'boolean' !== valueType &&
                  ('Array' !== valueType ||
                    !value.every(function (item) {
                      return 'string' == typeof item
                    })) &&
                  'function' !== valueType
                )
                  throw new TypeError(
                    'Config.saves.autosave must be a boolean, Array<string>, function, or null/undefined (received: '
                      .concat(valueType)
                      .concat('Array' === valueType ? '<any>' : '', ')')
                  )
              }
              _savesAutosave = value
            },
            get id () {
              return _savesId
            },
            set id (value) {
              if ('string' != typeof value || '' === value)
                throw new TypeError(
                  'Config.saves.id must be a non-empty string (received: '.concat(
                    Util.getType(value),
                    ')'
                  )
                )
              _savesId = value
            },
            get isAllowed () {
              return _savesIsAllowed
            },
            set isAllowed (value) {
              if (!(null == value || value instanceof Function))
                throw new TypeError(
                  'Config.saves.isAllowed must be a function or null/undefined (received: '.concat(
                    Util.getType(value),
                    ')'
                  )
                )
              _savesIsAllowed = value
            },
            get slots () {
              return _savesSlots
            },
            set slots (value) {
              if (!Number.isSafeInteger(value) || value < 0)
                throw new TypeError(
                  'Config.saves.slots must be a non-negative integer (received: '.concat(
                    Util.getType(value),
                    ')'
                  )
                )
              _savesSlots = value
            },
            get tryDiskOnMobile () {
              return _savesTryDiskOnMobile
            },
            set tryDiskOnMobile (value) {
              _savesTryDiskOnMobile = Boolean(value)
            },
            get version () {
              return _savesVersion
            },
            set version (value) {
              _savesVersion = value
            },
            get onLoad () {
              throw new Error(
                'Config.saves.onLoad has been deprecated, use the Save.onLoad API instead'
              )
            },
            set onLoad (value) {
              console.warn(
                'Config.saves.onLoad has been deprecated, use the Save.onLoad API instead'
              ),
                Save.onLoad.add(value)
            },
            get onSave () {
              throw new Error(
                'Config.saves.onSave has been deprecated, use the Save.onSave API instead'
              )
            },
            set onSave (value) {
              console.warn(
                'Config.saves.onSave has been deprecated, use the Save.onSave API instead'
              ),
                Save.onSave.add(value)
            }
          }),
          ui: Object.freeze({
            get stowBarInitially () {
              return _uiStowBarInitially
            },
            set stowBarInitially (value) {
              var valueType = Util.getType(value)
              if (
                'boolean' !== valueType &&
                ('number' !== valueType ||
                  !Number.isSafeInteger(value) ||
                  value < 0)
              )
                throw new TypeError(
                  'Config.ui.stowBarInitially must be a boolean or non-negative integer (received: '.concat(
                    valueType,
                    ')'
                  )
                )
              _uiStowBarInitially = value
            },
            get updateStoryElements () {
              return _uiUpdateStoryElements
            },
            set updateStoryElements (value) {
              _uiUpdateStoryElements = Boolean(value)
            }
          })
        })),
      _navigationOverride,
      _passagesDescriptions,
      _passagesStart,
      _passagesOnProcess,
      _passagesTransitionOut,
      _savesAutoload,
      _savesAutosave,
      _savesIsAllowed,
      _savesVersion,
      _debug,
      _addVisitedLinkClass,
      _cleanupWikifierOutput,
      _loadDelay,
      _audioPauseOnFadeToZero,
      _audioPreloadMetadata,
      _historyControls,
      _historyMaxStates,
      _macrosIfAssignmentError,
      _macrosMaxLoopIterations,
      _macrosTypeSkipKey,
      _macrosTypeVisitedPassages,
      _passagesDisplayTitles,
      _passagesNobr,
      _savesId,
      _savesSlots,
      _savesTryDiskOnMobile,
      _uiStowBarInitially,
      _uiUpdateStoryElements,
      _errHistoryModeDeprecated,
      SimpleAudio = (function () {
        var _hasPromise,
          _gestureEventNames = Object.freeze([
            'click',
            'contextmenu',
            'dblclick',
            'keyup',
            'mouseup',
            'pointerup',
            'touchend'
          ]),
          _specialIds = Object.freeze([
            ':not',
            ':all',
            ':looped',
            ':muted',
            ':paused',
            ':playing'
          ]),
          _formatSpecRe = /^([\w-]+)\s*\|\s*(\S.*)$/,
          _badIdRe = /[:\s]/,
          _tracks = new Map(),
          _groups = new Map(),
          _lists = new Map(),
          _subscribers = new Map(),
          _masterRate = 1,
          _masterVolume = 1,
          _masterMute = !1,
          _masterMuteOnHidden = !1,
          _playReturnsPromise =
            ((_hasPromise = null),
            function () {
              if (null !== _hasPromise) return _hasPromise
              if (((_hasPromise = !1), Has.audio))
                try {
                  var audio = document.createElement('audio')
                  audio.muted = !0
                  var value = audio.play()
                  value.catch(function () {}),
                    (_hasPromise = value instanceof Promise)
                } catch (ex) {}
              return _hasPromise
            }),
          AudioTrack = (function () {
            function AudioTrack (obj) {
              if ((_classCallCheck(this, AudioTrack), obj instanceof Array))
                this._create(obj)
              else {
                if (!(obj instanceof AudioTrack))
                  throw new Error(
                    'sources parameter must be either an array, of URIs or source objects, or an AudioTrack instance'
                  )
                this._copy(obj)
              }
            }
            return (
              _createClass(AudioTrack, [
                {
                  key: '_create',
                  value: function (sourceList) {
                    var dataUriRe = /^data:\s*audio\/(?:x-)?([^;,]+)\s*[;,]/i,
                      extRe = /\.([^./\\]+)$/,
                      formats = AudioTrack.formats,
                      usedSources = [],
                      audio = document.createElement('audio')
                    ;(audio.preload = 'none'),
                      sourceList.forEach(function (src) {
                        var srcUri = null
                        switch (_typeof(src)) {
                          case 'string':
                            var match
                            if ('data:' === src.slice(0, 5)) {
                              if (null === (match = dataUriRe.exec(src)))
                                throw new Error(
                                  'source data URI missing media type'
                                )
                            } else if (null === (match = extRe.exec(Util.parseUrl(src).pathname))) throw new Error('source URL missing file extension')
                            formats[match[1]] && (srcUri = src)
                            break
                          case 'object':
                            if (null === src)
                              throw new Error('source object cannot be null')
                            if (!src.hasOwnProperty('src'))
                              throw new Error(
                                'source object missing required "src" property'
                              )
                            if (!src.hasOwnProperty('format'))
                              throw new Error(
                                'source object missing required "format" property'
                              )
                            formats[src.format] && (srcUri = src.src)
                            break
                          default:
                            throw new Error(
                              'invalid source value (type: '.concat(
                                _typeof(src),
                                ')'
                              )
                            )
                        }
                        if (null !== srcUri) {
                          var source = document.createElement('source')
                          ;(source.src = srcUri),
                            audio.appendChild(source),
                            usedSources.push(srcUri)
                        }
                      }),
                      audio.hasChildNodes() &&
                        Config.audio.preloadMetadata &&
                        (audio.preload = 'metadata'),
                      this._finalize(audio, usedSources, clone(sourceList))
                  }
                },
                {
                  key: '_copy',
                  value: function (obj) {
                    this._finalize(
                      obj.audio.cloneNode(!0),
                      clone(obj.sources),
                      clone(obj.originals)
                    )
                  }
                },
                {
                  key: '_finalize',
                  value: function (audio, sources, originals) {
                    var _this3 = this
                    Object.defineProperties(this, {
                      audio: { configurable: !0, value: audio },
                      sources: { value: Object.freeze(sources) },
                      originals: { value: Object.freeze(originals) },
                      _error: { writable: !0, value: !1 },
                      _faderId: { writable: !0, value: null },
                      _mute: { writable: !0, value: !1 },
                      _rate: { writable: !0, value: 1 },
                      _volume: { writable: !0, value: 1 }
                    }),
                      jQuery(this.audio)
                        .on('loadstart.AudioTrack', function () {
                          return (_this3._error = !1)
                        })
                        .on('error.AudioTrack', function () {
                          return (_this3._error = !0)
                        })
                        .find('source:last-of-type')
                        .on('error.AudioTrack', function () {
                          return _this3._trigger('error')
                        }),
                      (function (id, callback) {
                        if ('function' != typeof callback)
                          throw new Error(
                            'callback parameter must be a function'
                          )
                        _subscribers.set(id, callback)
                      })(this, function (mesg) {
                        if (_this3.audio)
                          switch (mesg) {
                            case 'loadwithscreen':
                              if (_this3.hasSource()) {
                                var lockId = LoadScreen.lock()
                                _this3
                                  .one(
                                    'canplaythrough.AudioTrack_loadwithscreen error.AudioTrack_loadwithscreen',
                                    function () {
                                      jQuery(this).off(
                                        '.AudioTrack_loadwithscreen'
                                      ),
                                        LoadScreen.unlock(lockId)
                                    }
                                  )
                                  .load()
                              }
                              break
                            case 'load':
                              _this3.load()
                              break
                            case 'mute':
                              _this3._updateAudioMute()
                              break
                            case 'rate':
                              _this3._updateAudioRate()
                              break
                            case 'stop':
                              _this3.stop()
                              break
                            case 'volume':
                              _this3._updateAudioVolume()
                              break
                            case 'unload':
                              _this3.unload()
                          }
                        else unsubscribe(_this3)
                      }),
                      this._updateAudioMute(),
                      this._updateAudioRate(),
                      this._updateAudioVolume()
                  }
                },
                {
                  key: '_trigger',
                  value: function (eventName) {
                    jQuery(this.audio).triggerHandler(eventName)
                  }
                },
                {
                  key: '_destroy',
                  value: function () {
                    unsubscribe(this),
                      this.audio &&
                        (jQuery(this.audio).off(),
                        this.unload(),
                        (this._error = !0),
                        delete this.audio)
                  }
                },
                {
                  key: 'clone',
                  value: function () {
                    return new AudioTrack(this)
                  }
                },
                {
                  key: 'load',
                  value: function () {
                    var _this4 = this
                    if (
                      (this.fadeStop(),
                      this.audio.pause(),
                      !this.audio.hasChildNodes())
                    ) {
                      if (0 === this.sources.length) return
                      this.sources.forEach(function (srcUri) {
                        var source = document.createElement('source')
                        ;(source.src = srcUri), _this4.audio.appendChild(source)
                      })
                    }
                    'auto' !== this.audio.preload &&
                      (this.audio.preload = 'auto'),
                      this.isLoading() || this.audio.load()
                  }
                },
                {
                  key: 'unload',
                  value: function () {
                    this.fadeStop(), this.stop()
                    var audio = this.audio
                    for (audio.preload = 'none'; audio.hasChildNodes(); )
                      audio.removeChild(audio.firstChild)
                    audio.load()
                  }
                },
                {
                  key: 'play',
                  value: function () {
                    var _this5 = this
                    if (!this.hasSource())
                      return Promise.reject(
                        new Error(
                          'none of the candidate sources were acceptable'
                        )
                      )
                    if (this.isUnloaded())
                      return Promise.reject(new Error('no sources are loaded'))
                    if (this.isFailed())
                      return Promise.reject(
                        new Error('failed to load any of the sources')
                      )
                    'auto' !== this.audio.preload &&
                      (this.audio.preload = 'auto')
                    var namespace = '.AudioTrack_play'
                    return _playReturnsPromise()
                      ? this.audio.play()
                      : new Promise(function (resolve, reject) {
                          _this5.isPlaying()
                            ? resolve()
                            : (jQuery(_this5.audio)
                                .off(namespace)
                                .one(
                                  'error'
                                    .concat(namespace, ' playing')
                                    .concat(namespace, ' timeupdate')
                                    .concat(namespace),
                                  function (ev) {
                                    jQuery(_this5).off(namespace),
                                      'error' === ev.type
                                        ? reject(
                                            new Error(
                                              'unknown audio play error'
                                            )
                                          )
                                        : resolve()
                                  }
                                ),
                              _this5.audio.play())
                        })
                  }
                },
                {
                  key: 'playWhenAllowed',
                  value: function () {
                    var _this6 = this
                    this.play().catch(function () {
                      var gestures = _gestureEventNames
                        .map(function (name) {
                          return ''.concat(name, '.AudioTrack_playWhenAllowed')
                        })
                        .join(' ')
                      jQuery(document).one(gestures, function () {
                        jQuery(document).off('.AudioTrack_playWhenAllowed'),
                          _this6.audio.play()
                      })
                    })
                  }
                },
                {
                  key: 'pause',
                  value: function () {
                    this.audio.pause()
                  }
                },
                {
                  key: 'stop',
                  value: function () {
                    this.audio.pause(), this.time(0), this._trigger(':stopped')
                  }
                },
                {
                  key: 'fade',
                  value: function (duration, toVol, fromVol) {
                    var _this7 = this
                    if ('number' != typeof duration)
                      throw new TypeError('duration parameter must be a number')
                    if ('number' != typeof toVol)
                      throw new TypeError('toVolume parameter must be a number')
                    if (null != fromVol && 'number' != typeof fromVol)
                      throw new TypeError(
                        'fromVolume parameter must be a number'
                      )
                    if (!this.hasSource())
                      return Promise.reject(
                        new Error(
                          'none of the candidate sources were acceptable'
                        )
                      )
                    if (this.isUnloaded())
                      return Promise.reject(new Error('no sources are loaded'))
                    if (this.isFailed())
                      return Promise.reject(
                        new Error('failed to load any of the sources')
                      )
                    this.fadeStop()
                    var from = Math.clamp(
                        null == fromVol ? this.volume() : fromVol,
                        0,
                        1
                      ),
                      to = Math.clamp(toVol, 0, 1)
                    return from !== to
                      ? (this.volume(from),
                        jQuery(this.audio)
                          .off('timeupdate.AudioTrack_fade')
                          .one('timeupdate.AudioTrack_fade', function () {
                            var min, max
                            from < to
                              ? ((min = from), (max = to))
                              : ((min = to), (max = from))
                            var time = Math.max(duration, 1),
                              delta = (to - from) / (time / 0.025)
                            _this7._trigger(':fading'),
                              (_this7._faderId = setInterval(function () {
                                _this7.isPlaying()
                                  ? (_this7.volume(
                                      Math.clamp(
                                        _this7.volume() + delta,
                                        min,
                                        max
                                      )
                                    ),
                                    Config.audio.pauseOnFadeToZero &&
                                      0 === _this7.volume() &&
                                      _this7.pause(),
                                    _this7.volume() === to &&
                                      (_this7.fadeStop(),
                                      _this7._trigger(':faded')))
                                  : _this7.fadeStop()
                              }, 25))
                          }),
                        this.play())
                      : void 0
                  }
                },
                {
                  key: 'fadeIn',
                  value: function (duration, fromVol) {
                    return this.fade(duration, 1, fromVol)
                  }
                },
                {
                  key: 'fadeOut',
                  value: function (duration, fromVol) {
                    return this.fade(duration, 0, fromVol)
                  }
                },
                {
                  key: 'fadeStop',
                  value: function () {
                    null !== this._faderId &&
                      (clearInterval(this._faderId), (this._faderId = null))
                  }
                },
                {
                  key: 'loop',
                  value: function (_loop) {
                    return null == _loop
                      ? this.audio.loop
                      : ((this.audio.loop = !!_loop), this)
                  }
                },
                {
                  key: 'mute',
                  value: function (_mute) {
                    return null == _mute
                      ? this._mute
                      : ((this._mute = !!_mute), this._updateAudioMute(), this)
                  }
                },
                {
                  key: '_updateAudioMute',
                  value: function () {
                    this.audio.muted = this._mute || _masterMute
                  }
                },
                {
                  key: 'rate',
                  value: function (_rate) {
                    if (null == _rate) return this._rate
                    if ('number' != typeof _rate)
                      throw new TypeError('rate parameter must be a number')
                    return (
                      (this._rate = Math.clamp(_rate, 0.2, 5)),
                      this._updateAudioRate(),
                      this
                    )
                  }
                },
                {
                  key: '_updateAudioRate',
                  value: function () {
                    this.audio.playbackRate = Math.clamp(
                      this._rate * _masterRate,
                      0.2,
                      5
                    )
                  }
                },
                {
                  key: 'time',
                  value: function (_time) {
                    var _this8 = this
                    if (null == _time) return this.audio.currentTime
                    if ('number' != typeof _time)
                      throw new TypeError('time parameter must be a number')
                    return (
                      this.hasMetadata()
                        ? (this.audio.currentTime = _time)
                        : jQuery(this.audio)
                            .off('loadedmetadata.AudioTrack_time')
                            .one('loadedmetadata.AudioTrack_time', function () {
                              return (_this8.audio.currentTime = _time)
                            }),
                      this
                    )
                  }
                },
                {
                  key: 'volume',
                  value: function (_volume) {
                    if (null == _volume) return this._volume
                    if ('number' != typeof _volume)
                      throw new TypeError('volume parameter must be a number')
                    return (
                      (this._volume = Math.clamp(_volume, 0, 1)),
                      this._updateAudioVolume(),
                      this
                    )
                  }
                },
                {
                  key: '_updateAudioVolume',
                  value: function () {
                    this.audio.volume = Math.clamp(
                      this._volume * _masterVolume,
                      0,
                      1
                    )
                  }
                },
                {
                  key: 'duration',
                  value: function () {
                    return this.audio.duration
                  }
                },
                {
                  key: 'remaining',
                  value: function () {
                    return this.audio.duration - this.audio.currentTime
                  }
                },
                {
                  key: 'isFailed',
                  value: function () {
                    return this._error
                  }
                },
                {
                  key: 'isLoading',
                  value: function () {
                    return (
                      this.audio.networkState ===
                      HTMLMediaElement.NETWORK_LOADING
                    )
                  }
                },
                {
                  key: 'isUnloaded',
                  value: function () {
                    return !this.audio.hasChildNodes()
                  }
                },
                {
                  key: 'isUnavailable',
                  value: function () {
                    return (
                      !this.hasSource() || this.isUnloaded() || this.isFailed()
                    )
                  }
                },
                {
                  key: 'isPlaying',
                  value: function () {
                    return !this.audio.paused && this.hasSomeData()
                  }
                },
                {
                  key: 'isPaused',
                  value: function () {
                    return (
                      this.audio.paused &&
                      (this.audio.duration === 1 / 0 ||
                        this.audio.currentTime > 0) &&
                      !this.audio.ended
                    )
                  }
                },
                {
                  key: 'isStopped',
                  value: function () {
                    return this.audio.paused && 0 === this.audio.currentTime
                  }
                },
                {
                  key: 'isEnded',
                  value: function () {
                    return this.audio.ended
                  }
                },
                {
                  key: 'isFading',
                  value: function () {
                    return null !== this._faderId
                  }
                },
                {
                  key: 'isSeeking',
                  value: function () {
                    return this.audio.seeking
                  }
                },
                {
                  key: 'hasSource',
                  value: function () {
                    return this.sources.length > 0
                  }
                },
                {
                  key: 'hasNoData',
                  value: function () {
                    return (
                      this.audio.readyState === HTMLMediaElement.HAVE_NOTHING
                    )
                  }
                },
                {
                  key: 'hasMetadata',
                  value: function () {
                    return (
                      this.audio.readyState >= HTMLMediaElement.HAVE_METADATA
                    )
                  }
                },
                {
                  key: 'hasSomeData',
                  value: function () {
                    return (
                      this.audio.readyState >=
                      HTMLMediaElement.HAVE_CURRENT_DATA
                    )
                  }
                },
                {
                  key: 'hasData',
                  value: function () {
                    return (
                      this.audio.readyState ===
                      HTMLMediaElement.HAVE_ENOUGH_DATA
                    )
                  }
                },
                {
                  key: 'on',
                  value: function () {
                    for (
                      var _len5 = arguments.length,
                        args = new Array(_len5),
                        _key5 = 0;
                      _key5 < _len5;
                      _key5++
                    )
                      args[_key5] = arguments[_key5]
                    return jQuery.fn.on.apply(jQuery(this.audio), args), this
                  }
                },
                {
                  key: 'one',
                  value: function () {
                    for (
                      var _len6 = arguments.length,
                        args = new Array(_len6),
                        _key6 = 0;
                      _key6 < _len6;
                      _key6++
                    )
                      args[_key6] = arguments[_key6]
                    return jQuery.fn.one.apply(jQuery(this.audio), args), this
                  }
                },
                {
                  key: 'off',
                  value: function () {
                    for (
                      var _len7 = arguments.length,
                        args = new Array(_len7),
                        _key7 = 0;
                      _key7 < _len7;
                      _key7++
                    )
                      args[_key7] = arguments[_key7]
                    return jQuery.fn.off.apply(jQuery(this.audio), args), this
                  }
                }
              ]),
              AudioTrack
            )
          })()
        Object.defineProperties(AudioTrack, {
          formats: {
            value: (function () {
              var audio = document.createElement('audio'),
                types = new Map()
              function canPlay (mimeType) {
                return (
                  types.has(mimeType) ||
                    types.set(
                      mimeType,
                      '' !== audio.canPlayType(mimeType).replace(/^no$/i, '')
                    ),
                  types.get(mimeType)
                )
              }
              return Object.assign(Object.create(null), {
                aac: canPlay('audio/aac'),
                caf: canPlay('audio/x-caf') || canPlay('audio/caf'),
                flac: canPlay('audio/x-flac') || canPlay('audio/flac'),
                mp3:
                  canPlay('audio/mpeg; codecs="mp3"') ||
                  canPlay('audio/mpeg') ||
                  canPlay('audio/mp3') ||
                  canPlay('audio/mpa'),
                mpeg: canPlay('audio/mpeg'),
                m4a:
                  canPlay('audio/x-m4a') ||
                  canPlay('audio/m4a') ||
                  canPlay('audio/aac'),
                mp4:
                  canPlay('audio/x-mp4') ||
                  canPlay('audio/mp4') ||
                  canPlay('audio/aac'),
                ogg: canPlay('audio/ogg'),
                oga: canPlay('audio/ogg'),
                opus:
                  canPlay('audio/ogg; codecs="opus"') || canPlay('audio/opus'),
                wav:
                  canPlay('audio/wave; codecs="1"') ||
                  canPlay('audio/wav; codecs="1"') ||
                  canPlay('audio/wave') ||
                  canPlay('audio/wav'),
                wave:
                  canPlay('audio/wave; codecs="1"') ||
                  canPlay('audio/wav; codecs="1"') ||
                  canPlay('audio/wave') ||
                  canPlay('audio/wav'),
                weba: canPlay('audio/webm'),
                webm: canPlay('audio/webm')
              })
            })()
          }
        })
        var AudioList = (function () {
            function AudioList (obj) {
              if ((_classCallCheck(this, AudioList), obj instanceof Array))
                this._create(obj)
              else {
                if (!(obj instanceof AudioList))
                  throw new Error(
                    'tracks parameter must be either an array, of track objects, or an AudioTrack instance'
                  )
                this._copy(obj)
              }
            }
            return (
              _createClass(AudioList, [
                {
                  key: '_create',
                  value: function (trackList) {
                    var _this9 = this
                    this._finalize(
                      trackList.map(function (trackObj) {
                        if ('object' !== _typeof(trackObj))
                          throw new Error(
                            'tracks parameter array members must be objects'
                          )
                        var own, rate, track, volume
                        if (trackObj instanceof AudioTrack)
                          (own = !0),
                            (rate = trackObj.rate()),
                            (track = trackObj.clone()),
                            (volume = trackObj.volume())
                        else {
                          if (!trackObj.hasOwnProperty('track'))
                            throw new Error(
                              'track object missing required "track" property'
                            )
                          if (!(trackObj.track instanceof AudioTrack))
                            throw new Error(
                              'track object\'s "track" property must be an AudioTrack object'
                            )
                          ;(own =
                            trackObj.hasOwnProperty('own') && trackObj.own),
                            (rate = trackObj.hasOwnProperty('rate')
                              ? trackObj.rate
                              : trackObj.track.rate()),
                            (track = trackObj.track),
                            (volume = trackObj.hasOwnProperty('volume')
                              ? trackObj.volume
                              : trackObj.track.volume())
                        }
                        return (
                          track.stop(),
                          track.loop(!1),
                          track.mute(!1),
                          track.rate(rate),
                          track.volume(volume),
                          track.on('ended.AudioList', function () {
                            return _this9._onEnd()
                          }),
                          { own: own, track: track, volume: volume, rate: rate }
                        )
                      })
                    )
                  }
                },
                {
                  key: '_copy',
                  value: function (obj) {
                    this._finalize(clone(obj.tracks))
                  }
                },
                {
                  key: '_finalize',
                  value: function (tracks) {
                    Object.defineProperties(this, {
                      tracks: {
                        configurable: !0,
                        value: Object.freeze(tracks)
                      },
                      queue: { configurable: !0, value: [] },
                      current: { writable: !0, value: null },
                      _rate: { writable: !0, value: 1 },
                      _volume: { writable: !0, value: 1 },
                      _mute: { writable: !0, value: !1 },
                      _loop: { writable: !0, value: !1 },
                      _shuffle: { writable: !0, value: !1 }
                    })
                  }
                },
                {
                  key: '_destroy',
                  value: function () {
                    this.stop(),
                      this.tracks
                        .filter(function (trackObj) {
                          return trackObj.own
                        })
                        .forEach(function (trackObj) {
                          return trackObj.track._destroy()
                        }),
                      delete this.tracks,
                      delete this.queue
                  }
                },
                {
                  key: 'load',
                  value: function () {
                    this.tracks.forEach(function (trackObj) {
                      return trackObj.track.load()
                    })
                  }
                },
                {
                  key: 'unload',
                  value: function () {
                    this.stop(),
                      this.tracks.forEach(function (trackObj) {
                        return trackObj.track.unload()
                      })
                  }
                },
                {
                  key: 'play',
                  value: function () {
                    return (null !== this.current &&
                      !this.current.track.isUnavailable() &&
                      !this.current.track.isEnded()) ||
                      (0 === this.queue.length && this._fillQueue(),
                      this._next())
                      ? this.current.track.play()
                      : Promise.reject(new Error('no tracks were available'))
                  }
                },
                {
                  key: 'playWhenAllowed',
                  value: function () {
                    var _this10 = this
                    this.play().catch(function () {
                      var gestures = _gestureEventNames
                        .map(function (name) {
                          return ''.concat(name, '.AudioList_playWhenAllowed')
                        })
                        .join(' ')
                      jQuery(document).one(gestures, function () {
                        jQuery(document).off('.AudioList_playWhenAllowed'),
                          _this10.play()
                      })
                    })
                  }
                },
                {
                  key: 'pause',
                  value: function () {
                    null !== this.current && this.current.track.pause()
                  }
                },
                {
                  key: 'stop',
                  value: function () {
                    null !== this.current &&
                      (this.current.track.stop(), (this.current = null)),
                      this._drainQueue()
                  }
                },
                {
                  key: 'skip',
                  value: function () {
                    this._next()
                      ? this.current.track.play()
                      : this._loop && this.play()
                  }
                },
                {
                  key: 'fade',
                  value: function (duration, toVol, fromVol) {
                    if ('number' != typeof duration)
                      throw new TypeError('duration parameter must be a number')
                    if ('number' != typeof toVol)
                      throw new TypeError('toVolume parameter must be a number')
                    if (null != fromVol && 'number' != typeof fromVol)
                      throw new TypeError(
                        'fromVolume parameter must be a number'
                      )
                    if (
                      (0 === this.queue.length && this._fillQueue(),
                      (null !== this.current &&
                        !this.current.track.isUnavailable() &&
                        !this.current.track.isEnded()) ||
                        this._next())
                    ) {
                      var adjFromVol,
                        adjToVol = Math.clamp(toVol, 0, 1) * this.current.volume
                      return (
                        null != fromVol &&
                          (adjFromVol =
                            Math.clamp(fromVol, 0, 1) * this.current.volume),
                        (this._volume = toVol),
                        this.current.track.fade(duration, adjToVol, adjFromVol)
                      )
                    }
                  }
                },
                {
                  key: 'fadeIn',
                  value: function (duration, fromVol) {
                    return this.fade(duration, 1, fromVol)
                  }
                },
                {
                  key: 'fadeOut',
                  value: function (duration, fromVol) {
                    return this.fade(duration, 0, fromVol)
                  }
                },
                {
                  key: 'fadeStop',
                  value: function () {
                    null !== this.current && this.current.track.fadeStop()
                  }
                },
                {
                  key: 'loop',
                  value: function (_loop2) {
                    return null == _loop2
                      ? this._loop
                      : ((this._loop = !!_loop2), this)
                  }
                },
                {
                  key: 'mute',
                  value: function (_mute2) {
                    return null == _mute2
                      ? this._mute
                      : ((this._mute = !!_mute2),
                        null !== this.current &&
                          this.current.track.mute(this._mute),
                        this)
                  }
                },
                {
                  key: 'rate',
                  value: function (_rate2) {
                    if (null == _rate2) return this._rate
                    if ('number' != typeof _rate2)
                      throw new TypeError('rate parameter must be a number')
                    return (
                      (this._rate = Math.clamp(_rate2, 0.2, 5)),
                      null !== this.current &&
                        this.current.track.rate(this._rate * this.current.rate),
                      this
                    )
                  }
                },
                {
                  key: 'shuffle',
                  value: function (_shuffle) {
                    var _this11 = this
                    if (null == _shuffle) return this._shuffle
                    if (
                      ((this._shuffle = !!_shuffle),
                      this.queue.length > 0 &&
                        (this._fillQueue(),
                        !this._shuffle &&
                          null !== this.current &&
                          this.queue.length > 1))
                    ) {
                      var _this$queue,
                        firstIdx = this.queue.findIndex(function (trackObj) {
                          return trackObj === _this11.current
                        })
                      if (-1 !== firstIdx)
                        (_this$queue = this.queue).push.apply(
                          _this$queue,
                          _toConsumableArray(this.queue.splice(0, firstIdx + 1))
                        )
                    }
                    return this
                  }
                },
                {
                  key: 'volume',
                  value: function (_volume2) {
                    if (null == _volume2) return this._volume
                    if ('number' != typeof _volume2)
                      throw new TypeError('volume parameter must be a number')
                    return (
                      (this._volume = Math.clamp(_volume2, 0, 1)),
                      null !== this.current &&
                        this.current.track.volume(
                          this._volume * this.current.volume
                        ),
                      this
                    )
                  }
                },
                {
                  key: 'duration',
                  value: function () {
                    if (arguments.length > 0)
                      throw new Error('duration takes no parameters')
                    return this.tracks
                      .map(function (trackObj) {
                        return trackObj.track.duration()
                      })
                      .reduce(function (prev, cur) {
                        return prev + cur
                      }, 0)
                  }
                },
                {
                  key: 'remaining',
                  value: function () {
                    if (arguments.length > 0)
                      throw new Error('remaining takes no parameters')
                    var remainingTime = this.queue
                      .map(function (trackObj) {
                        return trackObj.track.duration()
                      })
                      .reduce(function (prev, cur) {
                        return prev + cur
                      }, 0)
                    return (
                      null !== this.current &&
                        (remainingTime += this.current.track.remaining()),
                      remainingTime
                    )
                  }
                },
                {
                  key: 'time',
                  value: function () {
                    if (arguments.length > 0)
                      throw new Error('time takes no parameters')
                    return this.duration() - this.remaining()
                  }
                },
                {
                  key: 'isPlaying',
                  value: function () {
                    return (
                      null !== this.current && this.current.track.isPlaying()
                    )
                  }
                },
                {
                  key: 'isPaused',
                  value: function () {
                    return (
                      null === this.current || this.current.track.isPaused()
                    )
                  }
                },
                {
                  key: 'isStopped',
                  value: function () {
                    return 0 === this.queue.length && null === this.current
                  }
                },
                {
                  key: 'isEnded',
                  value: function () {
                    return (
                      0 === this.queue.length &&
                      (null === this.current || this.current.track.isEnded())
                    )
                  }
                },
                {
                  key: 'isFading',
                  value: function () {
                    return (
                      null !== this.current && this.current.track.isFading()
                    )
                  }
                },
                {
                  key: '_next',
                  value: function () {
                    var nextTrack
                    for (
                      null !== this.current &&
                      (this.current.track.stop(), (this.current = null));
                      (nextTrack = this.queue.shift());

                    )
                      if (!nextTrack.track.isUnavailable()) {
                        this.current = nextTrack
                        break
                      }
                    return (
                      null !== this.current &&
                      (this.current.track.mute(this._mute),
                      this.current.track.rate(this._rate * this.current.rate),
                      this.current.track.volume(
                        this._volume * this.current.volume
                      ),
                      this.current.track.loop(!1),
                      !0)
                    )
                  }
                },
                {
                  key: '_onEnd',
                  value: function () {
                    if (0 === this.queue.length) {
                      if (!this._loop) return
                      this._fillQueue()
                    }
                    this._next() && this.current.track.play()
                  }
                },
                {
                  key: '_drainQueue',
                  value: function () {
                    this.queue.splice(0)
                  }
                },
                {
                  key: '_fillQueue',
                  value: function () {
                    var _this$queue2
                    this._drainQueue(),
                      (_this$queue2 = this.queue).push.apply(
                        _this$queue2,
                        _toConsumableArray(
                          this.tracks.filter(function (trackObj) {
                            return !trackObj.track.isUnavailable()
                          })
                        )
                      ),
                      0 !== this.queue.length &&
                        this._shuffle &&
                        (this.queue.shuffle(),
                        this.queue.length > 1 &&
                          this.queue[0] === this.current &&
                          this.queue.push(this.queue.shift()))
                  }
                }
              ]),
              AudioList
            )
          })(),
          AudioRunner = (function () {
            function AudioRunner (list) {
              if (
                (_classCallCheck(this, AudioRunner),
                !(list instanceof Set || list instanceof AudioRunner))
              )
                throw new TypeError(
                  'list parameter must be a Set or a AudioRunner instance'
                )
              Object.defineProperties(this, {
                trackIds: {
                  value: new Set(
                    list instanceof AudioRunner ? list.trackIds : list
                  )
                }
              })
            }
            return (
              _createClass(
                AudioRunner,
                [
                  {
                    key: 'load',
                    value: function () {
                      AudioRunner._run(this.trackIds, AudioTrack.prototype.load)
                    }
                  },
                  {
                    key: 'unload',
                    value: function () {
                      AudioRunner._run(
                        this.trackIds,
                        AudioTrack.prototype.unload
                      )
                    }
                  },
                  {
                    key: 'play',
                    value: function () {
                      AudioRunner._run(this.trackIds, AudioTrack.prototype.play)
                    }
                  },
                  {
                    key: 'playWhenAllowed',
                    value: function () {
                      AudioRunner._run(
                        this.trackIds,
                        AudioTrack.prototype.playWhenAllowed
                      )
                    }
                  },
                  {
                    key: 'pause',
                    value: function () {
                      AudioRunner._run(
                        this.trackIds,
                        AudioTrack.prototype.pause
                      )
                    }
                  },
                  {
                    key: 'stop',
                    value: function () {
                      AudioRunner._run(this.trackIds, AudioTrack.prototype.stop)
                    }
                  },
                  {
                    key: 'fade',
                    value: function (duration, toVol, fromVol) {
                      if (null == duration || null == toVol)
                        throw new Error('fade requires parameters')
                      AudioRunner._run(
                        this.trackIds,
                        AudioTrack.prototype.fade,
                        duration,
                        toVol,
                        fromVol
                      )
                    }
                  },
                  {
                    key: 'fadeIn',
                    value: function (duration, fromVol) {
                      if (null == duration)
                        throw new Error('fadeIn requires a parameter')
                      AudioRunner._run(
                        this.trackIds,
                        AudioTrack.prototype.fadeIn,
                        duration,
                        fromVol
                      )
                    }
                  },
                  {
                    key: 'fadeOut',
                    value: function (duration, fromVol) {
                      if (null == duration)
                        throw new Error('fadeOut requires a parameter')
                      AudioRunner._run(
                        this.trackIds,
                        AudioTrack.prototype.fadeOut,
                        duration,
                        fromVol
                      )
                    }
                  },
                  {
                    key: 'fadeStop',
                    value: function () {
                      AudioRunner._run(
                        this.trackIds,
                        AudioTrack.prototype.fadeStop
                      )
                    }
                  },
                  {
                    key: 'loop',
                    value: function (_loop3) {
                      if (null == _loop3)
                        throw new Error('loop requires a parameter')
                      return (
                        AudioRunner._run(
                          this.trackIds,
                          AudioTrack.prototype.loop,
                          _loop3
                        ),
                        this
                      )
                    }
                  },
                  {
                    key: 'mute',
                    value: function (_mute3) {
                      if (null == _mute3)
                        throw new Error('mute requires a parameter')
                      return (
                        AudioRunner._run(
                          this.trackIds,
                          AudioTrack.prototype.mute,
                          _mute3
                        ),
                        this
                      )
                    }
                  },
                  {
                    key: 'rate',
                    value: function (_rate3) {
                      if (null == _rate3)
                        throw new Error('rate requires a parameter')
                      return (
                        AudioRunner._run(
                          this.trackIds,
                          AudioTrack.prototype.rate,
                          _rate3
                        ),
                        this
                      )
                    }
                  },
                  {
                    key: 'time',
                    value: function (_time2) {
                      if (null == _time2)
                        throw new Error('time requires a parameter')
                      return (
                        AudioRunner._run(
                          this.trackIds,
                          AudioTrack.prototype.time,
                          _time2
                        ),
                        this
                      )
                    }
                  },
                  {
                    key: 'volume',
                    value: function (_volume3) {
                      if (null == _volume3)
                        throw new Error('volume requires a parameter')
                      return (
                        AudioRunner._run(
                          this.trackIds,
                          AudioTrack.prototype.volume,
                          _volume3
                        ),
                        this
                      )
                    }
                  },
                  {
                    key: 'on',
                    value: function () {
                      for (
                        var _len8 = arguments.length,
                          args = new Array(_len8),
                          _key8 = 0;
                        _key8 < _len8;
                        _key8++
                      )
                        args[_key8] = arguments[_key8]
                      return (
                        AudioRunner._run.apply(
                          AudioRunner,
                          [this.trackIds, AudioTrack.prototype.on].concat(args)
                        ),
                        this
                      )
                    }
                  },
                  {
                    key: 'one',
                    value: function () {
                      for (
                        var _len9 = arguments.length,
                          args = new Array(_len9),
                          _key9 = 0;
                        _key9 < _len9;
                        _key9++
                      )
                        args[_key9] = arguments[_key9]
                      return (
                        AudioRunner._run.apply(
                          AudioRunner,
                          [this.trackIds, AudioTrack.prototype.one].concat(args)
                        ),
                        this
                      )
                    }
                  },
                  {
                    key: 'off',
                    value: function () {
                      for (
                        var _len10 = arguments.length,
                          args = new Array(_len10),
                          _key10 = 0;
                        _key10 < _len10;
                        _key10++
                      )
                        args[_key10] = arguments[_key10]
                      return (
                        AudioRunner._run.apply(
                          AudioRunner,
                          [this.trackIds, AudioTrack.prototype.off].concat(args)
                        ),
                        this
                      )
                    }
                  }
                ],
                [
                  {
                    key: '_run',
                    value: function (ids, fn) {
                      for (
                        var _len11 = arguments.length,
                          args = new Array(_len11 > 2 ? _len11 - 2 : 0),
                          _key11 = 2;
                        _key11 < _len11;
                        _key11++
                      )
                        args[_key11 - 2] = arguments[_key11]
                      ids.forEach(function (id) {
                        var track = _tracks.get(id)
                        track && fn.apply(track, args)
                      })
                    }
                  }
                ]
              ),
              AudioRunner
            )
          })()
        var _runnerParseSelector = (function () {
          var notWsRe = /\S/g,
            parenRe = /[()]/g
          function processNegation (str, startPos) {
            var match
            if (
              ((notWsRe.lastIndex = startPos),
              null === (match = notWsRe.exec(str)) || '(' !== match[0])
            )
              throw new Error('invalid ":not()" syntax: missing parentheticals')
            parenRe.lastIndex = notWsRe.lastIndex
            for (
              var start = notWsRe.lastIndex,
                result = { str: '', nextMatch: -1 },
                depth = 1;
              null !== (match = parenRe.exec(str));

            )
              if (('(' === match[0] ? ++depth : --depth, depth < 1)) {
                ;(result.nextMatch = parenRe.lastIndex),
                  (result.str = str.slice(start, result.nextMatch - 1))
                break
              }
            return result
          }
          return function parseSelector (idArg) {
            for (
              var match, ids = [], idRe = /:?[^\s:()]+/g;
              null !== (match = idRe.exec(idArg));

            ) {
              var id = match[0]
              if (':not' === id) {
                if (0 === ids.length)
                  throw new Error(
                    'invalid negation: no group ID preceded ":not()"'
                  )
                var parent = ids[ids.length - 1]
                if (':' !== parent.id[0])
                  throw new Error(
                    'invalid negation of track "'.concat(
                      parent.id,
                      '": only groups may be negated with ":not()"'
                    )
                  )
                var negation = processNegation(idArg, idRe.lastIndex)
                if (-1 === negation.nextMatch)
                  throw new Error('unknown error parsing ":not()"')
                ;(idRe.lastIndex = negation.nextMatch),
                  (parent.not = parseSelector(negation.str))
              } else ids.push({ id: id })
            }
            return ids
          }
        })()
        function masterMute (mute) {
          if (null == mute) return _masterMute
          publish('mute', (_masterMute = !!mute))
        }
        function unsubscribe (id) {
          _subscribers.delete(id)
        }
        function publish (mesg, data) {
          _subscribers.forEach(function (fn) {
            return fn(mesg, data)
          })
        }
        function _newTrack (sources) {
          return new AudioTrack(
            sources.map(function (source) {
              if ('data:' !== source.slice(0, 5) && Story.has(source)) {
                var passage = Story.get(source)
                if (passage.tags.includes('Twine.audio'))
                  return passage.text.trim()
              }
              var match = _formatSpecRe.exec(source)
              return null === match
                ? source
                : { format: match[1], src: match[2] }
            })
          )
        }
        return Object.freeze(
          Object.defineProperties(
            {},
            {
              tracks: {
                value: Object.freeze(
                  Object.defineProperties(
                    {},
                    {
                      add: {
                        value: function () {
                          if (arguments.length < 2) {
                            var errors = []
                            throw (
                              (arguments.length < 1 && errors.push('track ID'),
                              arguments.length < 2 && errors.push('sources'),
                              new Error(
                                'no '.concat(errors.join(' or '), ' specified')
                              ))
                            )
                          }
                          var id = String(arguments[0]).trim(),
                            what = 'track ID "'.concat(id, '"')
                          if (_badIdRe.test(id))
                            throw new Error(
                              'invalid '.concat(
                                what,
                                ': track IDs must not contain colons or whitespace'
                              )
                            )
                          var track,
                            sources = Array.isArray(arguments[1])
                              ? Array.from(arguments[1])
                              : Array.from(arguments).slice(1)
                          try {
                            track = _newTrack(sources)
                          } catch (ex) {
                            throw new Error(
                              ''
                                .concat(
                                  what,
                                  ': error during track initialization: '
                                )
                                .concat(ex.message)
                            )
                          }
                          if (Config.debug && !track.hasSource())
                            throw new Error(
                              ''.concat(
                                what,
                                ': no supported audio sources found'
                              )
                            )
                          _tracks.has(id) && _tracks.get(id)._destroy(),
                            _tracks.set(id, track)
                        }
                      },
                      delete: {
                        value: function (id) {
                          return (
                            _tracks.has(id) && _tracks.get(id)._destroy(),
                            _tracks.delete(id)
                          )
                        }
                      },
                      clear: {
                        value: function () {
                          _tracks.forEach(function (track) {
                            return track._destroy()
                          }),
                            _tracks.clear()
                        }
                      },
                      has: {
                        value: function (id) {
                          return _tracks.has(id)
                        }
                      },
                      get: {
                        value: function (id) {
                          return _tracks.get(id) || null
                        }
                      }
                    }
                  )
                )
              },
              groups: {
                value: Object.freeze(
                  Object.defineProperties(
                    {},
                    {
                      add: {
                        value: function () {
                          if (arguments.length < 2) {
                            var errors = []
                            throw (
                              (arguments.length < 1 && errors.push('group ID'),
                              arguments.length < 2 && errors.push('track IDs'),
                              new Error(
                                'no '.concat(errors.join(' or '), ' specified')
                              ))
                            )
                          }
                          var id = String(arguments[0]).trim(),
                            what = 'group ID "'.concat(id, '"')
                          if (':' !== id[0] || _badIdRe.test(id.slice(1)))
                            throw new Error(
                              'invalid '.concat(
                                what,
                                ': group IDs must start with a colon and must not contain colons or whitespace'
                              )
                            )
                          if (_specialIds.includes(id))
                            throw new Error(
                              'cannot clobber special '.concat(what)
                            )
                          var group,
                            trackIds = Array.isArray(arguments[1])
                              ? Array.from(arguments[1])
                              : Array.from(arguments).slice(1)
                          try {
                            group = new Set(
                              trackIds.map(function (trackId) {
                                if (!_tracks.has(trackId))
                                  throw new Error(
                                    'track "'.concat(
                                      trackId,
                                      '" does not exist'
                                    )
                                  )
                                return trackId
                              })
                            )
                          } catch (ex) {
                            throw new Error(
                              ''
                                .concat(
                                  what,
                                  ': error during group initialization: '
                                )
                                .concat(ex.message)
                            )
                          }
                          _groups.set(id, Object.freeze(Array.from(group)))
                        }
                      },
                      delete: {
                        value: function (id) {
                          return _groups.delete(id)
                        }
                      },
                      clear: {
                        value: function () {
                          _groups.clear()
                        }
                      },
                      has: {
                        value: function (id) {
                          return _groups.has(id)
                        }
                      },
                      get: {
                        value: function (id) {
                          return _groups.get(id) || null
                        }
                      }
                    }
                  )
                )
              },
              lists: {
                value: Object.freeze(
                  Object.defineProperties(
                    {},
                    {
                      add: {
                        value: function () {
                          if (arguments.length < 2) {
                            var errors = []
                            throw (
                              (arguments.length < 1 && errors.push('list ID'),
                              arguments.length < 2 && errors.push('track IDs'),
                              new Error(
                                'no '.concat(errors.join(' or '), ' specified')
                              ))
                            )
                          }
                          var id = String(arguments[0]).trim(),
                            what = 'list ID "'.concat(id, '"')
                          if (_badIdRe.test(id))
                            return this.error(
                              'invalid '.concat(
                                what,
                                ': list IDs must not contain colons or whitespace'
                              )
                            )
                          var list,
                            descriptors = Array.isArray(arguments[1])
                              ? Array.from(arguments[1])
                              : Array.from(arguments).slice(1)
                          try {
                            list = new AudioList(
                              descriptors.map(function (desc) {
                                if (null === desc)
                                  throw new Error(
                                    'track descriptor must be a string or object (type: null)'
                                  )
                                switch (_typeof(desc)) {
                                  case 'string':
                                    desc = { id: desc }
                                    break
                                  case 'object':
                                    if (
                                      !desc.hasOwnProperty('id') &&
                                      !desc.hasOwnProperty('sources')
                                    )
                                      throw new Error(
                                        'track descriptor must contain one of either an "id" or a "sources" property'
                                      )
                                    if (
                                      desc.hasOwnProperty('id') &&
                                      desc.hasOwnProperty('sources')
                                    )
                                      throw new Error(
                                        'track descriptor must contain either an "id" or a "sources" property, not both'
                                      )
                                    break
                                  default:
                                    throw new Error(
                                      'track descriptor must be a string or object (type: '.concat(
                                        _typeof(desc),
                                        ')'
                                      )
                                    )
                                }
                                var own, track, volume
                                if (desc.hasOwnProperty('id')) {
                                  if ('string' != typeof desc.id)
                                    throw new Error(
                                      '"id" property must be a string'
                                    )
                                  if (!_tracks.has(desc.id))
                                    throw new Error(
                                      'track "'.concat(
                                        desc.id,
                                        '" does not exist'
                                      )
                                    )
                                  track = _tracks.get(desc.id)
                                } else if (desc.hasOwnProperty('sources')) {
                                  if (
                                    !Array.isArray(desc.sources) ||
                                    0 === desc.sources.length
                                  )
                                    throw new Error(
                                      '"sources" property must be a non-empty array'
                                    )
                                  if (desc.hasOwnProperty('own'))
                                    throw new Error(
                                      '"own" property is not allowed with the "sources" property'
                                    )
                                  try {
                                    ;(track = _newTrack(desc.sources)),
                                      (own = !0)
                                  } catch (ex) {
                                    throw new Error(
                                      'error during track initialization: '.concat(
                                        ex.message
                                      )
                                    )
                                  }
                                  if (Config.debug && !track.hasSource())
                                    throw new Error(
                                      'no supported audio sources found'
                                    )
                                }
                                if (desc.hasOwnProperty('own')) {
                                  if ('boolean' != typeof desc.own)
                                    throw new Error(
                                      '"own" property must be a boolean'
                                    )
                                  ;(own = desc.own) && (track = track.clone())
                                }
                                if (desc.hasOwnProperty('volume')) {
                                  if (
                                    'number' != typeof desc.volume ||
                                    Number.isNaN(desc.volume) ||
                                    !Number.isFinite(desc.volume) ||
                                    desc.volume < 0
                                  )
                                    throw new Error(
                                      '"volume" property must be a non-negative finite number'
                                    )
                                  volume = desc.volume
                                }
                                return {
                                  own: null != own && own,
                                  track: track,
                                  volume:
                                    null != volume ? volume : track.volume()
                                }
                              })
                            )
                          } catch (ex) {
                            throw new Error(
                              ''
                                .concat(
                                  what,
                                  ': error during playlist initialization: '
                                )
                                .concat(ex.message)
                            )
                          }
                          _lists.has(id) && _lists.get(id)._destroy(),
                            _lists.set(id, list)
                        }
                      },
                      delete: {
                        value: function (id) {
                          return (
                            _lists.has(id) && _lists.get(id)._destroy(),
                            _lists.delete(id)
                          )
                        }
                      },
                      clear: {
                        value: function () {
                          _lists.forEach(function (list) {
                            return list._destroy()
                          }),
                            _lists.clear()
                        }
                      },
                      has: {
                        value: function (id) {
                          return _lists.has(id)
                        }
                      },
                      get: {
                        value: function (id) {
                          return _lists.get(id) || null
                        }
                      }
                    }
                  )
                )
              },
              select: {
                value: function () {
                  if (0 === arguments.length)
                    throw new Error('no track selector specified')
                  var selector = String(arguments[0]).trim(),
                    trackIds = new Set()
                  try {
                    var renderIds = function renderIds (idObj) {
                        var ids,
                          id = idObj.id
                        switch (id) {
                          case ':all':
                            ids = allIds
                            break
                          case ':looped':
                            ids = allIds.filter(function (id) {
                              return _tracks.get(id).loop()
                            })
                            break
                          case ':muted':
                            ids = allIds.filter(function (id) {
                              return _tracks.get(id).mute()
                            })
                            break
                          case ':paused':
                            ids = allIds.filter(function (id) {
                              return _tracks.get(id).isPaused()
                            })
                            break
                          case ':playing':
                            ids = allIds.filter(function (id) {
                              return _tracks.get(id).isPlaying()
                            })
                            break
                          default:
                            ids = ':' === id[0] ? _groups.get(id) : [id]
                        }
                        if (idObj.hasOwnProperty('not')) {
                          var negated = idObj.not
                            .map(function (idObj) {
                              return renderIds(idObj)
                            })
                            .flat(1 / 0)
                          ids = ids.filter(function (id) {
                            return !negated.includes(id)
                          })
                        }
                        return ids
                      },
                      allIds = Array.from(_tracks.keys())
                    _runnerParseSelector(selector).forEach(function (idObj) {
                      return renderIds(idObj).forEach(function (id) {
                        if (!_tracks.has(id))
                          throw new Error(
                            'track "'.concat(id, '" does not exist')
                          )
                        trackIds.add(id)
                      })
                    })
                  } catch (ex) {
                    throw new Error(
                      'error during runner initialization: '.concat(ex.message)
                    )
                  }
                  return new AudioRunner(trackIds)
                }
              },
              load: {
                value: function () {
                  publish('load')
                }
              },
              loadWithScreen: {
                value: function () {
                  publish('loadwithscreen')
                }
              },
              mute: { value: masterMute },
              muteOnHidden: {
                value: function (mute) {
                  if (!Visibility.isEnabled()) return !1
                  if (null == mute) return _masterMuteOnHidden
                  var namespace = '.SimpleAudio_masterMuteOnHidden'
                  if ((_masterMuteOnHidden = !!mute)) {
                    var visibilityChange = ''
                      .concat(Visibility.changeEvent)
                      .concat(namespace)
                    jQuery(document)
                      .off(namespace)
                      .on(visibilityChange, function () {
                        return masterMute(Visibility.isHidden())
                      }),
                      Visibility.isHidden() && masterMute(!0)
                  } else jQuery(document).off(namespace)
                }
              },
              rate: {
                value: function (rate) {
                  if (null == rate) return _masterRate
                  if (
                    'number' != typeof rate ||
                    Number.isNaN(rate) ||
                    !Number.isFinite(rate)
                  )
                    throw new Error('rate must be a finite number')
                  publish('rate', (_masterRate = Math.clamp(rate, 0.2, 5)))
                }
              },
              stop: {
                value: function () {
                  publish('stop')
                }
              },
              unload: {
                value: function () {
                  publish('unload')
                }
              },
              volume: {
                value: function (volume) {
                  if (null == volume) return _masterVolume
                  if (
                    'number' != typeof volume ||
                    Number.isNaN(volume) ||
                    !Number.isFinite(volume)
                  )
                    throw new Error('volume must be a finite number')
                  publish('volume', (_masterVolume = Math.clamp(volume, 0, 1)))
                }
              }
            }
          )
        )
      })(),
      State = (function () {
        var _history = [],
          _active = momentCreate(),
          _activeIndex = -1,
          _expired = [],
          _prng = null,
          _tempVariables = {}
        function stateMarshal (noDelta) {
          var stateObj = { index: _activeIndex }
          return (
            noDelta
              ? (stateObj.history = clone(_history))
              : (stateObj.delta = historyDeltaEncode(_history)),
            _expired.length > 0 &&
              (stateObj.expired = _toConsumableArray(_expired)),
            null !== _prng && (stateObj.seed = _prng.seed),
            stateObj
          )
        }
        function stateUnmarshal (stateObj, noDelta) {
          if (null == stateObj)
            throw new Error('state object is null or undefined')
          if (
            !stateObj.hasOwnProperty(noDelta ? 'history' : 'delta') ||
            0 === stateObj[noDelta ? 'history' : 'delta'].length
          )
            throw new Error('state object has no history or history is empty')
          if (!stateObj.hasOwnProperty('index'))
            throw new Error('state object has no index')
          if (null !== _prng && !stateObj.hasOwnProperty('seed'))
            throw new Error('state object has no seed, but PRNG is enabled')
          if (null === _prng && stateObj.hasOwnProperty('seed'))
            throw new Error('state object has seed, but PRNG is disabled')
          ;(_history = noDelta
            ? clone(stateObj.history)
            : historyDeltaDecode(stateObj.delta)),
            (_activeIndex = stateObj.index),
            (_expired = stateObj.hasOwnProperty('expired')
              ? _toConsumableArray(stateObj.expired)
              : []),
            stateObj.hasOwnProperty('seed') && (_prng.seed = stateObj.seed),
            momentActivate(_activeIndex)
        }
        function momentCreate (title, variables) {
          return {
            title: null == title ? '' : String(title),
            variables: null == variables ? {} : clone(variables)
          }
        }
        function momentActivate (moment) {
          if (null == moment)
            throw new Error(
              'moment activation attempted with null or undefined'
            )
          switch (_typeof(moment)) {
            case 'object':
              _active = clone(moment)
              break
            case 'number':
              if (historyIsEmpty())
                throw new Error(
                  'moment activation attempted with index on empty history'
                )
              if (moment < 0 || moment >= historySize())
                throw new RangeError(
                  'moment activation attempted with out-of-bounds index; need [0, '
                    .concat(historySize() - 1, '], got ')
                    .concat(moment)
                )
              _active = clone(_history[moment])
              break
            default:
              throw new TypeError(
                'moment activation attempted with a "'.concat(
                  _typeof(moment),
                  '"; must be an object or valid history stack index'
                )
              )
          }
          return (
            null !== _prng &&
              (_prng = PRNGWrapper.unmarshal({
                seed: _prng.seed,
                pull: _active.pull
              })),
            session.set('state', stateMarshal()),
            jQuery.event.trigger(':historyupdate'),
            _active
          )
        }
        function historyLength () {
          return _activeIndex + 1
        }
        function historySize () {
          return _history.length
        }
        function historyIsEmpty () {
          return 0 === _history.length
        }
        function historyTop () {
          return _history.length > 0 ? _history[_history.length - 1] : null
        }
        function historyGoTo (index) {
          return (
            !(
              null == index ||
              index < 0 ||
              index >= historySize() ||
              index === _activeIndex
            ) && (momentActivate((_activeIndex = index)), !0)
          )
        }
        function historyDeltaEncode (historyArr) {
          if (!Array.isArray(historyArr)) return null
          if (0 === historyArr.length) return []
          for (
            var delta = [historyArr[0]], i = 1, iend = historyArr.length;
            i < iend;
            ++i
          )
            delta.push(Diff.diff(historyArr[i - 1], historyArr[i]))
          return delta
        }
        function historyDeltaDecode (delta) {
          if (!Array.isArray(delta)) return null
          if (0 === delta.length) return []
          for (
            var historyArr = [clone(delta[0])], i = 1, iend = delta.length;
            i < iend;
            ++i
          )
            historyArr.push(Diff.patch(historyArr[i - 1], delta[i]))
          return historyArr
        }
        function prngInit (seed, useEntropy) {
          var scriptSection
          if (!historyIsEmpty())
            throw (
              ((scriptSection = 'the Story JavaScript'),
              new Error(
                'State.prng.init must be called during initialization, within either '.concat(
                  scriptSection,
                  ' or the StoryInit special passage'
                )
              ))
            )
          ;(_prng = new PRNGWrapper(seed, useEntropy)),
            (_active.pull = _prng.pull)
        }
        function metadataDelete (key) {
          if ('string' != typeof key)
            throw new TypeError(
              'State.metadata.delete key parameter must be a string (received: '.concat(
                _typeof(key),
                ')'
              )
            )
          var store = storage.get('metadata')
          store &&
            store.hasOwnProperty(key) &&
            (1 === Object.keys(store).length
              ? storage.delete('metadata')
              : (delete store[key], storage.set('metadata', store)))
        }
        return Object.freeze(
          Object.defineProperties(
            {},
            {
              reset: {
                value: function () {
                  session.delete('state'),
                    (_history = []),
                    (_active = momentCreate()),
                    (_activeIndex = -1),
                    (_expired = []),
                    (_prng =
                      null === _prng ? null : new PRNGWrapper(_prng.seed, !1))
                }
              },
              restore: {
                value: function () {
                  if (session.has('state')) {
                    var stateObj = session.get('state')
                    return null != stateObj && (stateUnmarshal(stateObj), !0)
                  }
                  return !1
                }
              },
              marshalForSave: {
                value: function () {
                  return stateMarshal(!0)
                }
              },
              unmarshalForSave: {
                value: function (stateObj) {
                  return stateUnmarshal(stateObj, !0)
                }
              },
              expired: {
                get: function () {
                  return _expired
                }
              },
              turns: {
                get: function () {
                  return _expired.length + historyLength()
                }
              },
              passages: {
                get: function () {
                  return _expired.concat(
                    _history.slice(0, historyLength()).map(function (moment) {
                      return moment.title
                    })
                  )
                }
              },
              hasPlayed: {
                value: function (title) {
                  return (
                    null != title &&
                    '' !== title &&
                    (!!_expired.includes(title) ||
                      !!_history
                        .slice(0, historyLength())
                        .some(function (moment) {
                          return moment.title === title
                        }))
                  )
                }
              },
              active: {
                get: function () {
                  return _active
                }
              },
              activeIndex: {
                get: function () {
                  return _activeIndex
                }
              },
              passage: {
                get: function () {
                  return _active.title
                }
              },
              variables: {
                get: function () {
                  return _active.variables
                }
              },
              history: {
                get: function () {
                  return _history
                }
              },
              length: { get: historyLength },
              size: { get: historySize },
              isEmpty: { value: historyIsEmpty },
              current: {
                get: function () {
                  return _history.length > 0 ? _history[_activeIndex] : null
                }
              },
              top: { get: historyTop },
              bottom: {
                get: function () {
                  return _history.length > 0 ? _history[0] : null
                }
              },
              index: {
                value: function (index) {
                  return historyIsEmpty() || index < 0 || index > _activeIndex
                    ? null
                    : _history[index]
                }
              },
              peek: {
                value: function (offset) {
                  if (historyIsEmpty()) return null
                  var lengthOffset = 1 + (offset ? Math.abs(offset) : 0)
                  return lengthOffset > historyLength()
                    ? null
                    : _history[historyLength() - lengthOffset]
                }
              },
              has: {
                value: function (title) {
                  if (historyIsEmpty() || null == title || '' === title)
                    return !1
                  for (var i = _activeIndex; i >= 0; --i)
                    if (_history[i].title === title) return !0
                  return !1
                }
              },
              create: {
                value: function (title) {
                  for (
                    0,
                      historyLength() < historySize() &&
                        _history.splice(
                          historyLength(),
                          historySize() - historyLength()
                        ),
                      _history.push(momentCreate(title, _active.variables)),
                      _prng && (historyTop().pull = _prng.pull);
                    historySize() > Config.history.maxStates;

                  )
                    _expired.push(_history.shift().title)
                  return (
                    momentActivate((_activeIndex = historySize() - 1)),
                    historyLength()
                  )
                }
              },
              goTo: { value: historyGoTo },
              go: {
                value: function (offset) {
                  return (
                    null != offset &&
                    0 !== offset &&
                    historyGoTo(_activeIndex + offset)
                  )
                }
              },
              deltaEncode: { value: historyDeltaEncode },
              deltaDecode: { value: historyDeltaDecode },
              prng: {
                value: Object.freeze(
                  Object.defineProperties(
                    {},
                    {
                      init: { value: prngInit },
                      isEnabled: {
                        value: function () {
                          return null !== _prng
                        }
                      },
                      pull: {
                        get: function () {
                          return _prng ? _prng.pull : NaN
                        }
                      },
                      seed: {
                        get: function () {
                          return _prng ? _prng.seed : null
                        }
                      }
                    }
                  )
                )
              },
              random: {
                value: function () {
                  return _prng ? _prng.random() : Math.random()
                }
              },
              clearTemporary: {
                value: function () {
                  TempVariables = _tempVariables = {}
                }
              },
              temporary: {
                get: function () {
                  return _tempVariables
                }
              },
              getVar: {
                value: function (varExpression) {
                  try {
                    return Scripting.evalTwineScript(varExpression)
                  } catch (ex) {}
                }
              },
              setVar: {
                value: function (varExpression, value) {
                  try {
                    return (
                      Scripting.evalTwineScript(
                        ''.concat(varExpression, ' = evalTwineScript$Data$'),
                        null,
                        value
                      ),
                      !0
                    )
                  } catch (ex) {}
                  return !1
                }
              },
              metadata: {
                value: Object.freeze(
                  Object.defineProperties(
                    {},
                    {
                      clear: {
                        value: function () {
                          storage.delete('metadata')
                        }
                      },
                      delete: { value: metadataDelete },
                      entries: {
                        value: function () {
                          var store = storage.get('metadata')
                          return store && Object.entries(store)
                        }
                      },
                      get: {
                        value: function (key) {
                          if ('string' != typeof key)
                            throw new TypeError(
                              'State.metadata.get key parameter must be a string (received: '.concat(
                                _typeof(key),
                                ')'
                              )
                            )
                          var store = storage.get('metadata')
                          return store && store.hasOwnProperty(key)
                            ? store[key]
                            : undefined
                        }
                      },
                      has: {
                        value: function (key) {
                          if ('string' != typeof key)
                            throw new TypeError(
                              'State.metadata.has key parameter must be a string (received: '.concat(
                                _typeof(key),
                                ')'
                              )
                            )
                          var store = storage.get('metadata')
                          return store && store.hasOwnProperty(key)
                        }
                      },
                      keys: {
                        value: function () {
                          var store = storage.get('metadata')
                          return store && Object.keys(store)
                        }
                      },
                      set: {
                        value: function (key, value) {
                          if ('string' != typeof key)
                            throw new TypeError(
                              'State.metadata.set key parameter must be a string (received: '.concat(
                                _typeof(key),
                                ')'
                              )
                            )
                          if (void 0 === value) metadataDelete(key)
                          else {
                            var store = storage.get('metadata') || {}
                            ;(store[key] = value),
                              storage.set('metadata', store)
                          }
                        }
                      },
                      size: {
                        get: function () {
                          var store = storage.get('metadata')
                          return store ? Object.keys(store).length : 0
                        }
                      }
                    }
                  )
                )
              },
              initPRNG: { value: prngInit },
              restart: {
                value: function () {
                  return Engine.restart()
                }
              },
              backward: {
                value: function () {
                  return Engine.backward()
                }
              },
              forward: {
                value: function () {
                  return Engine.forward()
                }
              },
              display: {
                value: function () {
                  return Engine.display.apply(Engine, arguments)
                }
              },
              show: {
                value: function () {
                  return Engine.show.apply(Engine, arguments)
                }
              },
              play: {
                value: function () {
                  return Engine.play.apply(Engine, arguments)
                }
              }
            }
          )
        )
      })(),
      Scripting = (function () {
        function addAccessibleClickHandler (
          targets,
          selector,
          handler,
          one,
          namespace
        ) {
          if (arguments.length < 2)
            throw new Error(
              'addAccessibleClickHandler insufficient number of parameters'
            )
          var fn, opts
          if (
            ('function' == typeof selector
              ? ((fn = selector), (opts = { namespace: one, one: !!handler }))
              : ((fn = handler),
                (opts = {
                  namespace: namespace,
                  one: !!one,
                  selector: selector
                })),
            'function' != typeof fn)
          )
            throw new TypeError(
              'addAccessibleClickHandler handler parameter must be a function'
            )
          return jQuery(targets).ariaClick(opts, fn)
        }
        function insertElement (place, type, id, classNames, text, title) {
          var $el = jQuery(document.createElement(type))
          return (
            id && $el.attr('id', id),
            classNames && $el.addClass(classNames),
            title && $el.attr('title', title),
            text && $el.text(text),
            place && $el.appendTo(place),
            $el[0]
          )
        }
        function insertText (place, text) {
          jQuery(place).append(document.createTextNode(text))
        }
        function removeChildren (node) {
          jQuery(node).empty()
        }
        function removeElement (node) {
          jQuery(node).remove()
        }
        function fade (el, options) {
          var current,
            intervalId,
            direction = 'in' === options.fade ? 1 : -1,
            proxy = el.cloneNode(!0)
          function setOpacity (el, opacity) {
            ;(el.style.zoom = 1),
              (el.style.filter = 'alpha(opacity='.concat(
                Math.floor(100 * opacity),
                ')'
              )),
              (el.style.opacity = opacity)
          }
          el.parentNode.replaceChild(proxy, el),
            'in' === options.fade
              ? ((current = 0), (proxy.style.visibility = 'visible'))
              : (current = 1),
            setOpacity(proxy, current),
            (intervalId = window.setInterval(function () {
              ;(current += 0.05 * direction),
                setOpacity(proxy, Math.easeInOut(current)),
                ((1 === direction && current >= 1) ||
                  (-1 === direction && current <= 0)) &&
                  ((el.style.visibility =
                    'in' === options.fade ? 'visible' : 'hidden'),
                  proxy.parentNode.replaceChild(el, proxy),
                  (proxy = null),
                  window.clearInterval(intervalId),
                  options.onComplete && options.onComplete())
            }, 25))
        }
        function scrollWindowTo (el, incrementBy) {
          var increment = null != incrementBy ? Number(incrementBy) : 0.1
          Number.isNaN(increment) ||
          !Number.isFinite(increment) ||
          increment < 0
            ? (increment = 0.1)
            : increment > 1 && (increment = 1)
          var intervalId,
            start = window.scrollY ? window.scrollY : document.body.scrollTop,
            end = (function (el) {
              var posTop = (function (el) {
                  var curtop = 0
                  for (; el.offsetParent; )
                    (curtop += el.offsetTop), (el = el.offsetParent)
                  return curtop
                })(el),
                posBottom = posTop + el.offsetHeight,
                winTop = window.scrollY
                  ? window.scrollY
                  : document.body.scrollTop,
                winHeight = window.innerHeight
                  ? window.innerHeight
                  : document.body.clientHeight,
                winBottom = winTop + winHeight
              return posTop >= winTop &&
                posBottom > winBottom &&
                el.offsetHeight < winHeight
                ? posTop - (winHeight - el.offsetHeight) + 20
                : posTop
            })(el),
            distance = Math.abs(start - end),
            direction = start > end ? -1 : 1,
            progress = 0
          intervalId = window.setInterval(function () {
            ;(progress += increment),
              window.scroll(
                0,
                start + direction * (distance * Math.easeInOut(progress))
              ),
              progress >= 1 && window.clearInterval(intervalId)
          }, 25)
        }
        function toStringOrDefault (value) {
          return stringFrom(value)
        }
        function either () {
          if (0 !== arguments.length)
            return Array.prototype.concat.apply([], arguments).random()
        }
        function forget (key) {
          if ('string' != typeof key)
            throw new TypeError(
              'forget key parameter must be a string (received: '.concat(
                Util.getType(key),
                ')'
              )
            )
          State.metadata.delete(key)
        }
        function hasVisited () {
          if (0 === arguments.length)
            throw new Error('hasVisited called with insufficient parameters')
          if (State.isEmpty()) return !1
          for (
            var needles = Array.prototype.concat.apply([], arguments),
              played = State.passages,
              i = 0,
              iend = needles.length;
            i < iend;
            ++i
          )
            if (!played.includes(needles[i])) return !1
          return !0
        }
        function lastVisited () {
          if (0 === arguments.length)
            throw new Error('lastVisited called with insufficient parameters')
          if (State.isEmpty()) return -1
          for (
            var needles = Array.prototype.concat.apply([], arguments),
              played = State.passages,
              uBound = played.length - 1,
              turns = State.turns,
              i = 0,
              iend = needles.length;
            i < iend && turns > -1;
            ++i
          ) {
            var lastIndex = played.lastIndexOf(needles[i])
            turns = Math.min(turns, -1 === lastIndex ? -1 : uBound - lastIndex)
          }
          return turns
        }
        function memorize (key, value) {
          if ('string' != typeof key)
            throw new TypeError(
              'memorize key parameter must be a string (received: '.concat(
                Util.getType(key),
                ')'
              )
            )
          State.metadata.set(key, value)
        }
        function passage () {
          return State.passage
        }
        function previous () {
          var passages = State.passages
          if (arguments.length > 0) {
            var offset = Number(arguments[0])
            if (!Number.isSafeInteger(offset) || offset < 1)
              throw new RangeError(
                'previous offset parameter must be a positive integer greater than zero'
              )
            return passages.length > offset
              ? passages[passages.length - 1 - offset]
              : ''
          }
          for (var i = passages.length - 2; i >= 0; --i)
            if (passages[i] !== State.passage) return passages[i]
          return ''
        }
        function random () {
          var min, max
          switch (arguments.length) {
            case 0:
              throw new Error('random called with insufficient parameters')
            case 1:
              ;(min = 0), (max = Math.trunc(arguments[0]))
              break
            default:
              ;(min = Math.trunc(arguments[0])),
                (max = Math.trunc(arguments[1]))
          }
          if (!Number.isInteger(min))
            throw new Error('random min parameter must be an integer')
          if (!Number.isInteger(max))
            throw new Error('random max parameter must be an integer')
          if (min > max) {
            var _ref6 = [max, min]
            ;(min = _ref6[0]), (max = _ref6[1])
          }
          return Math.floor(State.random() * (max - min + 1)) + min
        }
        function randomFloat () {
          var min, max
          switch (arguments.length) {
            case 0:
              throw new Error('randomFloat called with insufficient parameters')
            case 1:
              ;(min = 0), (max = Number(arguments[0]))
              break
            default:
              ;(min = Number(arguments[0])), (max = Number(arguments[1]))
          }
          if (Number.isNaN(min) || !Number.isFinite(min))
            throw new Error('randomFloat min parameter must be a number')
          if (Number.isNaN(max) || !Number.isFinite(max))
            throw new Error('randomFloat max parameter must be a number')
          if (min > max) {
            var _ref7 = [max, min]
            ;(min = _ref7[0]), (max = _ref7[1])
          }
          return State.random() * (max - min) + min
        }
        function recall (key, defaultValue) {
          if ('string' != typeof key)
            throw new TypeError(
              'recall key parameter must be a string (received: '.concat(
                Util.getType(key),
                ')'
              )
            )
          return State.metadata.has(key)
            ? State.metadata.get(key)
            : defaultValue
        }
        function tags () {
          if (0 === arguments.length)
            return Story.get(State.passage).tags.slice(0)
          for (
            var passages = Array.prototype.concat.apply([], arguments),
              tags = [],
              i = 0,
              iend = passages.length;
            i < iend;
            ++i
          )
            tags = tags.concat(Story.get(passages[i]).tags)
          return tags
        }
        function temporary () {
          return State.temporary
        }
        function time () {
          return null === Engine.lastPlay ? 0 : Util.now() - Engine.lastPlay
        }
        function turns () {
          return State.turns
        }
        function variables () {
          return State.variables
        }
        function visited () {
          if (State.isEmpty()) return 0
          for (
            var needles = Array.prototype.concat.apply(
                [],
                0 === arguments.length ? [State.passage] : arguments
              ),
              played = State.passages,
              count = State.turns,
              i = 0,
              iend = needles.length;
            i < iend && count > 0;
            ++i
          )
            count = Math.min(count, played.count(needles[i]))
          return count
        }
        function visitedTags () {
          if (0 === arguments.length)
            throw new Error('visitedTags called with insufficient parameters')
          if (State.isEmpty()) return 0
          for (
            var needles = Array.prototype.concat.apply([], arguments),
              nLength = needles.length,
              played = State.passages,
              seen = new Map(),
              count = 0,
              i = 0,
              iend = played.length;
            i < iend;
            ++i
          ) {
            var title = played[i]
            if (seen.has(title)) seen.get(title) && ++count
            else {
              var _tags2 = Story.get(title).tags
              if (_tags2.length > 0) {
                for (var found = 0, j = 0; j < nLength; ++j)
                  _tags2.includes(needles[j]) && ++found
                found === nLength
                  ? (++count, seen.set(title, !0))
                  : seen.set(title, !1)
              }
            }
          }
          return count
        }
        var _ref8 = (function () {
            function slugifyUrl (url) {
              return Util.parseUrl(url)
                .path.replace(/^[^\w]+|[^\w]+$/g, '')
                .replace(/[^\w]+/g, '-')
                .toLocaleLowerCase()
            }
            function addScript (url) {
              return new Promise(function (resolve, reject) {
                jQuery(document.createElement('script'))
                  .one('load abort error', function (ev) {
                    jQuery(ev.target).off(),
                      'load' === ev.type
                        ? resolve(ev.target)
                        : reject(
                            new Error(
                              'importScripts failed to load the script "'.concat(
                                url,
                                '".'
                              )
                            )
                          )
                  })
                  .appendTo(document.head)
                  .attr({
                    id: 'script-imported-'.concat(slugifyUrl(url)),
                    type: 'text/javascript',
                    src: url
                  })
              })
            }
            function addStyle (url) {
              return new Promise(function (resolve, reject) {
                jQuery(document.createElement('link'))
                  .one('load abort error', function (ev) {
                    jQuery(ev.target).off(),
                      'load' === ev.type
                        ? resolve(ev.target)
                        : reject(
                            new Error(
                              'importStyles failed to load the stylesheet "'.concat(
                                url,
                                '".'
                              )
                            )
                          )
                  })
                  .appendTo(document.head)
                  .attr({
                    id: 'style-imported-'.concat(slugifyUrl(url)),
                    rel: 'stylesheet',
                    href: url
                  })
              })
            }
            function sequence (callbacks) {
              return callbacks.reduce(function (seq, fn) {
                return seq.then(fn)
              }, Promise.resolve())
            }
            return {
              importScripts: function () {
                for (
                  var _len12 = arguments.length,
                    urls = new Array(_len12),
                    _key12 = 0;
                  _key12 < _len12;
                  _key12++
                )
                  urls[_key12] = arguments[_key12]
                return Promise.all(
                  urls.map(function (oneOrSeries) {
                    return Array.isArray(oneOrSeries)
                      ? sequence(
                          oneOrSeries.map(function (url) {
                            return function () {
                              return addScript(url)
                            }
                          })
                        )
                      : addScript(oneOrSeries)
                  })
                )
              },
              importStyles: function () {
                for (
                  var _len13 = arguments.length,
                    urls = new Array(_len13),
                    _key13 = 0;
                  _key13 < _len13;
                  _key13++
                )
                  urls[_key13] = arguments[_key13]
                return Promise.all(
                  urls.map(function (oneOrSeries) {
                    return Array.isArray(oneOrSeries)
                      ? sequence(
                          oneOrSeries.map(function (url) {
                            return function () {
                              return addStyle(url)
                            }
                          })
                        )
                      : addStyle(oneOrSeries)
                  })
                )
              }
            }
          })(),
          importScripts = _ref8.importScripts,
          importStyles = _ref8.importStyles,
          parse = (function () {
            var tokenTable = Util.toEnum({
                $: 'State.variables.',
                _: 'State.temporary.',
                to: '=',
                eq: '==',
                neq: '!=',
                is: '===',
                isnot: '!==',
                gt: '>',
                gte: '>=',
                lt: '<',
                lte: '<=',
                and: '&&',
                or: '||',
                not: '!',
                def: '"undefined" !== typeof',
                ndef: '"undefined" === typeof'
              }),
              parseRe = new RegExp(
                [
                  '(?:""|\'\'|``)',
                  '(?:"(?:\\\\.|[^"\\\\])+")',
                  "(?:'(?:\\\\.|[^'\\\\])+')",
                  '(`(?:\\\\.|[^`\\\\])+`)',
                  '(?:[=+\\-*\\/%<>&\\|\\^~!?:,;\\(\\)\\[\\]{}]+)',
                  '([^"\'=+\\-*\\/%<>&\\|\\^~!?:,;\\(\\)\\[\\]{}\\s]+)'
                ].join('|'),
                'g'
              ),
              notSpaceRe = /\S/,
              varTest = new RegExp('^'.concat(Patterns.variable)),
              withColonTestRe = /^\s*:/,
              withNotTestRe = /^\s+not\b/
            function parse (rawCodeString) {
              if (0 !== parseRe.lastIndex)
                throw new RangeError(
                  'Scripting.parse last index is non-zero at start'
                )
              for (
                var match, code = rawCodeString;
                null !== (match = parseRe.exec(code));

              )
                if (match[1]) {
                  var rawTemplate = match[1],
                    parsedTemplate = parseTemplate(rawTemplate)
                  parsedTemplate !== rawTemplate &&
                    ((code = code.splice(
                      match.index,
                      rawTemplate.length,
                      parsedTemplate
                    )),
                    (parseRe.lastIndex +=
                      parsedTemplate.length - rawTemplate.length))
                } else if (match[2]) {
                  var token = match[2]
                  if ('$' === token || '_' === token) continue
                  if (varTest.test(token)) token = token[0]
                  else if ('is' === token) {
                    var start = parseRe.lastIndex,
                      ahead = code.slice(start)
                    withNotTestRe.test(ahead) &&
                      ((code = code.splice(start, ahead.search(notSpaceRe))),
                      (token = 'isnot'))
                  } else {
                    var _ahead = code.slice(parseRe.lastIndex)
                    if (withColonTestRe.test(_ahead)) continue
                  }
                  tokenTable[token] &&
                    ((code = code.splice(
                      match.index,
                      token.length,
                      tokenTable[token]
                    )),
                    (parseRe.lastIndex +=
                      tokenTable[token].length - token.length))
                }
              return code
            }
            var templateGroupStartRe = /\$\{/g,
              templateGroupParseRe = new RegExp(
                [
                  '(?:""|\'\')',
                  '(?:"(?:\\\\.|[^"\\\\])+")',
                  "(?:'(?:\\\\.|[^'\\\\])+')",
                  '(\\{)',
                  '(\\})'
                ].join('|'),
                'g'
              )
            function parseTemplate (rawTemplateLiteral) {
              if (0 !== templateGroupStartRe.lastIndex)
                throw new RangeError(
                  'Scripting.parse last index is non-zero at start of template literal'
                )
              for (
                var startMatch, template = rawTemplateLiteral;
                null !== (startMatch = templateGroupStartRe.exec(template));

              ) {
                var startIdx = startMatch.index + 2,
                  endIdx = startIdx,
                  depth = 1,
                  endMatch = void 0
                for (
                  templateGroupParseRe.lastIndex = startIdx;
                  null !== (endMatch = templateGroupParseRe.exec(template));

                )
                  if (
                    (endMatch[1] ? ++depth : endMatch[2] && --depth,
                    0 === depth)
                  ) {
                    endIdx = endMatch.index
                    break
                  }
                if (endIdx > startIdx) {
                  var parseIndex = parseRe.lastIndex,
                    rawGroup = template.slice(startIdx, endIdx)
                  parseRe.lastIndex = 0
                  var parsedGroup = parse(rawGroup)
                  ;(parseRe.lastIndex = parseIndex),
                    (template = template.splice(
                      startIdx,
                      rawGroup.length,
                      parsedGroup
                    )),
                    (templateGroupStartRe.lastIndex +=
                      parsedGroup.length - rawGroup.length)
                }
              }
              return template
            }
            return parse
          })()
        function evalJavaScript (code, output, data) {
          return function (code, output, evalJavaScript$Data$) {
            return eval(code)
          }.call(output ? { output: output } : null, String(code), output, data)
        }
        function evalTwineScript (code, output, data) {
          return function (code, output, evalTwineScript$Data$) {
            return eval(code)
          }.call(
            output ? { output: output } : null,
            parse(String(code)),
            output,
            data
          )
        }
        return Object.freeze(
          Object.defineProperties(
            {},
            {
              parse: { value: parse },
              evalJavaScript: { value: evalJavaScript },
              evalTwineScript: { value: evalTwineScript }
            }
          )
        )
      })(),
      _ref9 = (function () {
        var Lexer = (function () {
          function Lexer (source, initialState) {
            if ((_classCallCheck(this, Lexer), arguments.length < 2))
              throw new Error(
                'Lexer constructor called with too few parameters (source:string , initialState:function)'
              )
            Object.defineProperties(this, {
              source: { value: source },
              initial: { value: initialState },
              state: { writable: !0, value: initialState },
              start: { writable: !0, value: 0 },
              pos: { writable: !0, value: 0 },
              depth: { writable: !0, value: 0 },
              items: { writable: !0, value: [] },
              data: { writable: !0, value: {} }
            })
          }
          return (
            _createClass(
              Lexer,
              [
                {
                  key: 'reset',
                  value: function () {
                    ;(this.state = this.initial),
                      (this.start = 0),
                      (this.pos = 0),
                      (this.depth = 0),
                      (this.items = []),
                      (this.data = {})
                  }
                },
                {
                  key: 'run',
                  value: function () {
                    for (; null !== this.state; ) this.state = this.state(this)
                    return this.items
                  }
                },
                {
                  key: 'nextItem',
                  value: function () {
                    for (; 0 === this.items.length && null !== this.state; )
                      this.state = this.state(this)
                    return this.items.shift()
                  }
                },
                {
                  key: 'next',
                  value: function () {
                    return this.pos >= this.source.length
                      ? -1
                      : this.source[this.pos++]
                  }
                },
                {
                  key: 'peek',
                  value: function () {
                    return this.pos >= this.source.length
                      ? -1
                      : this.source[this.pos]
                  }
                },
                {
                  key: 'backup',
                  value: function (num) {
                    this.pos -= num || 1
                  }
                },
                {
                  key: 'forward',
                  value: function (num) {
                    this.pos += num || 1
                  }
                },
                {
                  key: 'ignore',
                  value: function () {
                    this.start = this.pos
                  }
                },
                {
                  key: 'accept',
                  value: function (valid) {
                    var ch = this.next()
                    return (
                      -1 !== ch && (!!valid.includes(ch) || (this.backup(), !1))
                    )
                  }
                },
                {
                  key: 'acceptRe',
                  value: function (validRe) {
                    var ch = this.next()
                    return (
                      -1 !== ch && (!!validRe.test(ch) || (this.backup(), !1))
                    )
                  }
                },
                {
                  key: 'acceptRun',
                  value: function (valid) {
                    for (;;) {
                      var ch = this.next()
                      if (-1 === ch) return
                      if (!valid.includes(ch)) break
                    }
                    this.backup()
                  }
                },
                {
                  key: 'acceptRunRe',
                  value: function (validRe) {
                    for (;;) {
                      var ch = this.next()
                      if (-1 === ch) return
                      if (!validRe.test(ch)) break
                    }
                    this.backup()
                  }
                },
                {
                  key: 'emit',
                  value: function (type) {
                    this.items.push({
                      type: type,
                      text: this.source.slice(this.start, this.pos),
                      start: this.start,
                      pos: this.pos
                    }),
                      (this.start = this.pos)
                  }
                },
                {
                  key: 'error',
                  value: function (type, message) {
                    if (arguments.length < 2)
                      throw new Error(
                        'Lexer.prototype.error called with too few parameters (type:number , message:string)'
                      )
                    return (
                      this.items.push({
                        type: type,
                        message: message,
                        text: this.source.slice(this.start, this.pos),
                        start: this.start,
                        pos: this.pos
                      }),
                      null
                    )
                  }
                }
              ],
              [
                {
                  key: 'enumFromNames',
                  value: function (names) {
                    var obj = names.reduce(function (obj, name, i) {
                      return (obj[name] = i), obj
                    }, {})
                    return Object.freeze(
                      Object.assign(Object.create(null), obj)
                    )
                  }
                }
              ]
            ),
            Lexer
          )
        })()
        return { EOF: -1, Lexer: Lexer }
      })(),
      EOF = _ref9.EOF,
      Lexer = _ref9.Lexer,
      Wikifier = (function () {
        var _optionsStack,
          lookaheadRe,
          idOrClassRe,
          _callDepth = 0,
          Wikifier = (function () {
            function Wikifier (destination, source, options) {
              _classCallCheck(this, Wikifier),
                Wikifier.Parser.Profile.isEmpty() &&
                  Wikifier.Parser.Profile.compile(),
                Object.defineProperties(this, {
                  source: { value: String(source) },
                  options: {
                    writable: !0,
                    value: Object.assign({ profile: 'all' }, options)
                  },
                  nextMatch: { writable: !0, value: 0 },
                  output: { writable: !0, value: null },
                  _rawArgs: { writable: !0, value: '' }
                }),
                null == destination
                  ? (this.output = document.createDocumentFragment())
                  : destination.jquery
                  ? (this.output = destination[0])
                  : (this.output = destination)
              try {
                ++_callDepth,
                  this.subWikify(this.output),
                  1 === _callDepth &&
                    Config.cleanupWikifierOutput &&
                    convertBreaks(this.output)
              } finally {
                --_callDepth
              }
            }
            return (
              _createClass(
                Wikifier,
                [
                  {
                    key: 'subWikify',
                    value: function (output, terminator, options) {
                      var newOptions,
                        oldOptions,
                        oldOutput = this.output
                      ;(this.output = output),
                        Wikifier.Option.length > 0 &&
                          (newOptions = Object.assign(
                            newOptions || {},
                            Wikifier.Option.options
                          )),
                        null !== options &&
                          'object' === _typeof(options) &&
                          (newOptions = Object.assign(
                            newOptions || {},
                            options
                          )),
                        newOptions &&
                          ((oldOptions = this.options),
                          (this.options = Object.assign(
                            {},
                            this.options,
                            newOptions
                          )))
                      var terminatorMatch,
                        parserMatch,
                        parsersProfile = Wikifier.Parser.Profile.get(
                          this.options.profile
                        ),
                        terminatorRegExp = terminator
                          ? new RegExp(
                              '(?:'.concat(terminator, ')'),
                              this.options.ignoreTerminatorCase ? 'gim' : 'gm'
                            )
                          : null
                      do {
                        if (
                          ((parsersProfile.parserRegExp.lastIndex =
                            this.nextMatch),
                          terminatorRegExp &&
                            (terminatorRegExp.lastIndex = this.nextMatch),
                          (parserMatch = parsersProfile.parserRegExp.exec(
                            this.source
                          )),
                          (terminatorMatch = terminatorRegExp
                            ? terminatorRegExp.exec(this.source)
                            : null) &&
                            (!parserMatch ||
                              terminatorMatch.index <= parserMatch.index))
                        )
                          return (
                            terminatorMatch.index > this.nextMatch &&
                              this.outputText(
                                this.output,
                                this.nextMatch,
                                terminatorMatch.index
                              ),
                            (this.matchStart = terminatorMatch.index),
                            (this.matchLength = terminatorMatch[0].length),
                            (this.matchText = terminatorMatch[0]),
                            (this.nextMatch = terminatorRegExp.lastIndex),
                            (this.output = oldOutput),
                            void (oldOptions && (this.options = oldOptions))
                          )
                        if (parserMatch) {
                          parserMatch.index > this.nextMatch &&
                            this.outputText(
                              this.output,
                              this.nextMatch,
                              parserMatch.index
                            ),
                            (this.matchStart = parserMatch.index),
                            (this.matchLength = parserMatch[0].length),
                            (this.matchText = parserMatch[0]),
                            (this.nextMatch =
                              parsersProfile.parserRegExp.lastIndex)
                          for (
                            var matchingParser = void 0,
                              i = 1,
                              iend = parserMatch.length;
                            i < iend;
                            ++i
                          )
                            if (parserMatch[i]) {
                              matchingParser = i - 1
                              break
                            }
                          if (
                            (parsersProfile.parsers[matchingParser].handler(
                              this
                            ),
                            null != TempState.break)
                          )
                            break
                        }
                      } while (terminatorMatch || parserMatch)
                      null == TempState.break
                        ? this.nextMatch < this.source.length &&
                          (this.outputText(
                            this.output,
                            this.nextMatch,
                            this.source.length
                          ),
                          (this.nextMatch = this.source.length))
                        : this.output.lastChild &&
                          this.output.lastChild.nodeType ===
                            Node.ELEMENT_NODE &&
                          'BR' ===
                            this.output.lastChild.nodeName.toUpperCase() &&
                          jQuery(this.output.lastChild).remove(),
                        (this.output = oldOutput),
                        oldOptions && (this.options = oldOptions)
                    }
                  },
                  {
                    key: 'outputText',
                    value: function (destination, startPos, endPos) {
                      jQuery(destination).append(
                        document.createTextNode(
                          this.source.substring(startPos, endPos)
                        )
                      )
                    }
                  },
                  {
                    key: 'rawArgs',
                    value: function () {
                      return this._rawArgs
                    }
                  },
                  {
                    key: 'fullArgs',
                    value: function () {
                      return Scripting.parse(this._rawArgs)
                    }
                  }
                ],
                [
                  {
                    key: 'wikifyEval',
                    value: function (text) {
                      var output = document.createDocumentFragment()
                      new Wikifier(output, text)
                      var errors = output.querySelector('.error')
                      if (null !== errors)
                        throw new Error(
                          errors.textContent.replace(errorPrologRegExp, '')
                        )
                      return output
                    }
                  },
                  {
                    key: 'createInternalLink',
                    value: function (destination, passage, text, callback) {
                      var $link = jQuery(document.createElement('a'))
                      return (
                        null != passage &&
                          ($link.attr('data-passage', passage),
                          Story.has(passage)
                            ? ($link.addClass('link-internal'),
                              Config.addVisitedLinkClass &&
                                State.hasPlayed(passage) &&
                                $link.addClass('link-visited'))
                            : $link.addClass('link-broken'),
                          $link.ariaClick({ one: !0 }, function () {
                            'function' == typeof callback && callback(),
                              Engine.play(passage)
                          })),
                        text && $link.append(document.createTextNode(text)),
                        destination && $link.appendTo(destination),
                        $link[0]
                      )
                    }
                  },
                  {
                    key: 'createExternalLink',
                    value: function (destination, url, text) {
                      var $link = jQuery(document.createElement('a'))
                        .attr('target', '_blank')
                        .addClass('link-external')
                        .text(text)
                        .appendTo(destination)
                      return (
                        null != url && $link.attr({ href: url, tabindex: 0 }),
                        $link[0]
                      )
                    }
                  },
                  {
                    key: 'isExternalLink',
                    value: function (link) {
                      return (
                        !Story.has(link) &&
                        (new RegExp('^'.concat(Patterns.url), 'gim').test(
                          link
                        ) ||
                          /[/.?#]/.test(link))
                      )
                    }
                  }
                ]
              ),
              Wikifier
            )
          })()
        return (
          Object.defineProperty(Wikifier, 'Option', {
            value:
              ((_optionsStack = []),
              Object.freeze(
                Object.defineProperties(
                  {},
                  {
                    length: {
                      get: function () {
                        return _optionsStack.length
                      }
                    },
                    options: {
                      get: function () {
                        return Object.assign.apply(
                          Object,
                          [{}].concat(_toConsumableArray(_optionsStack))
                        )
                      }
                    },
                    clear: {
                      value: function () {
                        _optionsStack = []
                      }
                    },
                    get: {
                      value: function (idx) {
                        return _optionsStack[idx]
                      }
                    },
                    pop: {
                      value: function () {
                        return _optionsStack.pop()
                      }
                    },
                    push: {
                      value: function (options) {
                        if ('object' !== _typeof(options) || null === options)
                          throw new TypeError(
                            'Wikifier.Option.push options parameter must be an object (received: '.concat(
                              Util.getType(options),
                              ')'
                            )
                          )
                        return _optionsStack.push(options)
                      }
                    }
                  }
                )
              ))
          }),
          Object.defineProperty(Wikifier, 'Parser', {
            value: (function () {
              var _profiles,
                _parsers = []
              function parsersHas (name) {
                return !!_parsers.find(function (parser) {
                  return parser.name === name
                })
              }
              return Object.freeze(
                Object.defineProperties(
                  {},
                  {
                    parsers: {
                      get: function () {
                        return _parsers
                      }
                    },
                    add: {
                      value: function (parser) {
                        if ('object' !== _typeof(parser))
                          throw new Error(
                            'Wikifier.Parser.add parser parameter must be an object'
                          )
                        if (!parser.hasOwnProperty('name'))
                          throw new Error(
                            'parser object missing required "name" property'
                          )
                        if ('string' != typeof parser.name)
                          throw new Error(
                            'parser object "name" property must be a string'
                          )
                        if (!parser.hasOwnProperty('match'))
                          throw new Error(
                            'parser object missing required "match" property'
                          )
                        if ('string' != typeof parser.match)
                          throw new Error(
                            'parser object "match" property must be a string'
                          )
                        if (!parser.hasOwnProperty('handler'))
                          throw new Error(
                            'parser object missing required "handler" property'
                          )
                        if ('function' != typeof parser.handler)
                          throw new Error(
                            'parser object "handler" property must be a function'
                          )
                        if (
                          parser.hasOwnProperty('profiles') &&
                          !Array.isArray(parser.profiles)
                        )
                          throw new Error(
                            'parser object "profiles" property must be an array'
                          )
                        if (parsersHas(parser.name))
                          throw new Error(
                            'cannot clobber existing parser "'.concat(
                              parser.name,
                              '"'
                            )
                          )
                        _parsers.push(parser)
                      }
                    },
                    delete: {
                      value: function (name) {
                        var parser = _parsers.find(function (parser) {
                          return parser.name === name
                        })
                        parser && _parsers.delete(parser)
                      }
                    },
                    isEmpty: {
                      value: function () {
                        return 0 === _parsers.length
                      }
                    },
                    has: { value: parsersHas },
                    get: {
                      value: function (name) {
                        return (
                          _parsers.find(function (parser) {
                            return parser.name === name
                          }) || null
                        )
                      }
                    },
                    Profile: {
                      value: Object.freeze(
                        Object.defineProperties(
                          {},
                          {
                            profiles: {
                              get: function () {
                                return _profiles
                              }
                            },
                            compile: {
                              value: function () {
                                var all = _parsers,
                                  core = all.filter(function (parser) {
                                    return (
                                      !Array.isArray(parser.profiles) ||
                                      parser.profiles.includes('core')
                                    )
                                  })
                                return (_profiles = Object.freeze({
                                  all: {
                                    parsers: all,
                                    parserRegExp: new RegExp(
                                      all
                                        .map(function (parser) {
                                          return '('.concat(parser.match, ')')
                                        })
                                        .join('|'),
                                      'gm'
                                    )
                                  },
                                  core: {
                                    parsers: core,
                                    parserRegExp: new RegExp(
                                      core
                                        .map(function (parser) {
                                          return '('.concat(parser.match, ')')
                                        })
                                        .join('|'),
                                      'gm'
                                    )
                                  }
                                }))
                              }
                            },
                            isEmpty: {
                              value: function () {
                                return (
                                  'object' !== _typeof(_profiles) ||
                                  0 === Object.keys(_profiles).length
                                )
                              }
                            },
                            has: {
                              value: function (profile) {
                                return (
                                  'object' === _typeof(_profiles) &&
                                  _profiles.hasOwnProperty(profile)
                                )
                              }
                            },
                            get: {
                              value: function (profile) {
                                if (
                                  'object' !== _typeof(_profiles) ||
                                  !_profiles.hasOwnProperty(profile)
                                )
                                  throw new Error(
                                    'nonexistent parser profile "'.concat(
                                      profile,
                                      '"'
                                    )
                                  )
                                return _profiles[profile]
                              }
                            }
                          }
                        )
                      )
                    }
                  }
                )
              )
            })()
          }),
          Object.defineProperties(Wikifier, {
            helpers: { value: {} },
            getValue: { value: State.getVar },
            setValue: { value: State.setVar },
            parse: { value: Scripting.parse },
            evalExpression: { value: Scripting.evalTwineScript },
            evalStatements: { value: Scripting.evalTwineScript },
            textPrimitives: { value: Patterns }
          }),
          Object.defineProperties(Wikifier.helpers, {
            inlineCss: {
              value:
                ((lookaheadRe = new RegExp(Patterns.inlineCss, 'gm')),
                (idOrClassRe = new RegExp(
                  '('
                    .concat(Patterns.cssIdOrClassSigil, ')(')
                    .concat(Patterns.anyLetter, '+)'),
                  'g'
                )),
                function (w) {
                  var matched,
                    css = { classes: [], id: '', styles: {} }
                  do {
                    lookaheadRe.lastIndex = w.nextMatch
                    var match = lookaheadRe.exec(w.source)
                    if ((matched = match && match.index === w.nextMatch)) {
                      if (match[1])
                        css.styles[Util.fromCssProperty(match[1])] =
                          match[2].trim()
                      else if (match[3])
                        css.styles[Util.fromCssProperty(match[3])] =
                          match[4].trim()
                      else if (match[5]) {
                        var subMatch = void 0
                        for (
                          idOrClassRe.lastIndex = 0;
                          null !== (subMatch = idOrClassRe.exec(match[5]));

                        )
                          '.' === subMatch[1]
                            ? css.classes.push(subMatch[2])
                            : (css.id = subMatch[2])
                      }
                      w.nextMatch = lookaheadRe.lastIndex
                    }
                  } while (matched)
                  return css
                })
            },
            evalText: {
              value: function (text) {
                var result
                try {
                  switch (_typeof((result = Scripting.evalTwineScript(text)))) {
                    case 'string':
                      '' === result.trim() && (result = text)
                      break
                    case 'number':
                      result = String(result)
                      break
                    default:
                      result = text
                  }
                } catch (ex) {
                  result = text
                }
                return result
              }
            },
            evalPassageId: {
              value: function (passage) {
                return null == passage || Story.has(passage)
                  ? passage
                  : Wikifier.helpers.evalText(passage)
              }
            },
            hasBlockContext: {
              value: function (nodes) {
                for (
                  var hasGCS = 'function' == typeof window.getComputedStyle,
                    i = nodes.length - 1;
                  i >= 0;
                  --i
                ) {
                  var node = nodes[i]
                  switch (node.nodeType) {
                    case Node.ELEMENT_NODE:
                      var tagName = node.nodeName.toUpperCase()
                      if ('BR' === tagName) return !0
                      var styles = hasGCS
                        ? window.getComputedStyle(node, null)
                        : node.currentStyle
                      if (styles && styles.display) {
                        if ('none' === styles.display) continue
                        return 'block' === styles.display
                      }
                      switch (tagName) {
                        case 'ADDRESS':
                        case 'ARTICLE':
                        case 'ASIDE':
                        case 'BLOCKQUOTE':
                        case 'CENTER':
                        case 'DIV':
                        case 'DL':
                        case 'FIGURE':
                        case 'FOOTER':
                        case 'FORM':
                        case 'H1':
                        case 'H2':
                        case 'H3':
                        case 'H4':
                        case 'H5':
                        case 'H6':
                        case 'HEADER':
                        case 'HR':
                        case 'MAIN':
                        case 'NAV':
                        case 'OL':
                        case 'P':
                        case 'PRE':
                        case 'SECTION':
                        case 'TABLE':
                        case 'UL':
                          return !0
                      }
                      return !1
                    case Node.COMMENT_NODE:
                      continue
                    default:
                      return !1
                  }
                }
                return !0
              }
            },
            createShadowSetterCallback: {
              value: (function () {
                var macroParser = null
                function getMacroContextShadowView () {
                  for (
                    var macro =
                        macroParser ||
                        (function () {
                          if (
                            !macroParser &&
                            !(macroParser = Wikifier.Parser.get('macro'))
                          )
                            throw new Error('cannot find "macro" parser')
                          return macroParser
                        })(),
                      view = new Set(),
                      context = macro.context;
                    null !== context;
                    context = context.parent
                  )
                    context._shadows &&
                      context._shadows.forEach(function (name) {
                        return view.add(name)
                      })
                  return _toConsumableArray(view)
                }
                return function (code) {
                  var shadowStore = {}
                  return (
                    getMacroContextShadowView().forEach(function (varName) {
                      var varKey = varName.slice(1),
                        store =
                          '$' === varName[0] ? State.variables : State.temporary
                      shadowStore[varName] = store[varKey]
                    }),
                    function () {
                      var shadowNames = Object.keys(shadowStore),
                        valueCache = shadowNames.length > 0 ? {} : null
                      try {
                        return (
                          shadowNames.forEach(function (varName) {
                            var varKey = varName.slice(1),
                              store =
                                '$' === varName[0]
                                  ? State.variables
                                  : State.temporary
                            store.hasOwnProperty(varKey) &&
                              (valueCache[varKey] = store[varKey]),
                              (store[varKey] = shadowStore[varName])
                          }),
                          Scripting.evalJavaScript(code)
                        )
                      } finally {
                        shadowNames.forEach(function (varName) {
                          var varKey = varName.slice(1),
                            store =
                              '$' === varName[0]
                                ? State.variables
                                : State.temporary
                          ;(shadowStore[varName] = store[varKey]),
                            valueCache.hasOwnProperty(varKey)
                              ? (store[varKey] = valueCache[varKey])
                              : delete store[varKey]
                        })
                      }
                    }
                  )
                }
              })()
            },
            parseSquareBracketedMarkup: {
              value: (function () {
                var Item = Lexer.enumFromNames([
                    'Error',
                    'DelimLTR',
                    'DelimRTL',
                    'InnerMeta',
                    'ImageMeta',
                    'LinkMeta',
                    'Link',
                    'RightMeta',
                    'Setter',
                    'Source',
                    'Text'
                  ]),
                  Delim = Lexer.enumFromNames(['None', 'LTR', 'RTL'])
                function slurpQuote (lexer, endQuote) {
                  loop: for (;;)
                    switch (lexer.next()) {
                      case '\\':
                        var ch = lexer.next()
                        if (ch !== EOF && '\n' !== ch) break
                      case EOF:
                      case '\n':
                        return EOF
                      case endQuote:
                        break loop
                    }
                  return lexer.pos
                }
                function lexLeftMeta (lexer) {
                  if (!lexer.accept('['))
                    return lexer.error(
                      Item.Error,
                      'malformed square-bracketed markup'
                    )
                  if (lexer.accept('['))
                    (lexer.data.isLink = !0), lexer.emit(Item.LinkMeta)
                  else {
                    if (
                      (lexer.accept('<>'),
                      !(
                        lexer.accept('Ii') &&
                        lexer.accept('Mm') &&
                        lexer.accept('Gg') &&
                        lexer.accept('[')
                      ))
                    )
                      return lexer.error(
                        Item.Error,
                        'malformed square-bracketed markup'
                      )
                    ;(lexer.data.isLink = !1), lexer.emit(Item.ImageMeta)
                  }
                  return (lexer.depth = 2), lexCoreComponents
                }
                function lexCoreComponents (lexer) {
                  for (
                    var what = lexer.data.isLink ? 'link' : 'image',
                      delim = Delim.None;
                    ;

                  )
                    switch (lexer.next()) {
                      case EOF:
                      case '\n':
                        return lexer.error(
                          Item.Error,
                          'unterminated '.concat(what, ' markup')
                        )
                      case '"':
                        if (slurpQuote(lexer, '"') === EOF)
                          return lexer.error(
                            Item.Error,
                            'unterminated double quoted string in '.concat(
                              what,
                              ' markup'
                            )
                          )
                        break
                      case '|':
                        delim === Delim.None &&
                          ((delim = Delim.LTR),
                          lexer.backup(),
                          lexer.emit(Item.Text),
                          lexer.forward(),
                          lexer.emit(Item.DelimLTR))
                        break
                      case '-':
                        delim === Delim.None &&
                          '>' === lexer.peek() &&
                          ((delim = Delim.LTR),
                          lexer.backup(),
                          lexer.emit(Item.Text),
                          lexer.forward(2),
                          lexer.emit(Item.DelimLTR))
                        break
                      case '<':
                        delim === Delim.None &&
                          '-' === lexer.peek() &&
                          ((delim = Delim.RTL),
                          lexer.backup(),
                          lexer.emit(
                            lexer.data.isLink ? Item.Link : Item.Source
                          ),
                          lexer.forward(2),
                          lexer.emit(Item.DelimRTL))
                        break
                      case '[':
                        ++lexer.depth
                        break
                      case ']':
                        if ((--lexer.depth, 1 === lexer.depth))
                          switch (lexer.peek()) {
                            case '[':
                              return (
                                ++lexer.depth,
                                lexer.backup(),
                                delim === Delim.RTL
                                  ? lexer.emit(Item.Text)
                                  : lexer.emit(
                                      lexer.data.isLink
                                        ? Item.Link
                                        : Item.Source
                                    ),
                                lexer.forward(2),
                                lexer.emit(Item.InnerMeta),
                                lexer.data.isLink ? lexSetter : lexImageLink
                              )
                            case ']':
                              return (
                                --lexer.depth,
                                lexer.backup(),
                                delim === Delim.RTL
                                  ? lexer.emit(Item.Text)
                                  : lexer.emit(
                                      lexer.data.isLink
                                        ? Item.Link
                                        : Item.Source
                                    ),
                                lexer.forward(2),
                                lexer.emit(Item.RightMeta),
                                null
                              )
                            default:
                              return lexer.error(
                                Item.Error,
                                'malformed '.concat(what, ' markup')
                              )
                          }
                    }
                }
                function lexImageLink (lexer) {
                  for (var what = lexer.data.isLink ? 'link' : 'image'; ; )
                    switch (lexer.next()) {
                      case EOF:
                      case '\n':
                        return lexer.error(
                          Item.Error,
                          'unterminated '.concat(what, ' markup')
                        )
                      case '"':
                        if (slurpQuote(lexer, '"') === EOF)
                          return lexer.error(
                            Item.Error,
                            'unterminated double quoted string in '.concat(
                              what,
                              ' markup link component'
                            )
                          )
                        break
                      case '[':
                        ++lexer.depth
                        break
                      case ']':
                        if ((--lexer.depth, 1 === lexer.depth))
                          switch (lexer.peek()) {
                            case '[':
                              return (
                                ++lexer.depth,
                                lexer.backup(),
                                lexer.emit(Item.Link),
                                lexer.forward(2),
                                lexer.emit(Item.InnerMeta),
                                lexSetter
                              )
                            case ']':
                              return (
                                --lexer.depth,
                                lexer.backup(),
                                lexer.emit(Item.Link),
                                lexer.forward(2),
                                lexer.emit(Item.RightMeta),
                                null
                              )
                            default:
                              return lexer.error(
                                Item.Error,
                                'malformed '.concat(what, ' markup')
                              )
                          }
                    }
                }
                function lexSetter (lexer) {
                  for (var what = lexer.data.isLink ? 'link' : 'image'; ; )
                    switch (lexer.next()) {
                      case EOF:
                      case '\n':
                        return lexer.error(
                          Item.Error,
                          'unterminated '.concat(what, ' markup')
                        )
                      case '"':
                        if (slurpQuote(lexer, '"') === EOF)
                          return lexer.error(
                            Item.Error,
                            'unterminated double quoted string in '.concat(
                              what,
                              ' markup setter component'
                            )
                          )
                        break
                      case "'":
                        if (slurpQuote(lexer, "'") === EOF)
                          return lexer.error(
                            Item.Error,
                            'unterminated single quoted string in '.concat(
                              what,
                              ' markup setter component'
                            )
                          )
                        break
                      case '[':
                        ++lexer.depth
                        break
                      case ']':
                        if ((--lexer.depth, 1 === lexer.depth))
                          return ']' !== lexer.peek()
                            ? lexer.error(
                                Item.Error,
                                'malformed '.concat(what, ' markup')
                              )
                            : (--lexer.depth,
                              lexer.backup(),
                              lexer.emit(Item.Setter),
                              lexer.forward(2),
                              lexer.emit(Item.RightMeta),
                              null)
                    }
                }
                return function (w) {
                  var lexer = new Lexer(w.source, lexLeftMeta)
                  lexer.start = lexer.pos = w.matchStart
                  var markup = {},
                    items = lexer.run(),
                    last = items.last()
                  return (
                    last && last.type === Item.Error
                      ? (markup.error = last.message)
                      : items.forEach(function (item) {
                          var text = item.text.trim()
                          switch (item.type) {
                            case Item.ImageMeta:
                              ;(markup.isImage = !0),
                                '<' === text[1]
                                  ? (markup.align = 'left')
                                  : '>' === text[1] && (markup.align = 'right')
                              break
                            case Item.LinkMeta:
                              markup.isLink = !0
                              break
                            case Item.Link:
                              '~' === text[0]
                                ? ((markup.forceInternal = !0),
                                  (markup.link = text.slice(1)))
                                : (markup.link = text)
                              break
                            case Item.Setter:
                              markup.setter = text
                              break
                            case Item.Source:
                              markup.source = text
                              break
                            case Item.Text:
                              markup.text = text
                          }
                        }),
                    (markup.pos = lexer.pos),
                    markup
                  )
                }
              })()
            }
          }),
          Wikifier
        )
      })()
    !(function () {
      function _verbatimTagHandler (w) {
        this.lookahead.lastIndex = w.matchStart
        var match = this.lookahead.exec(w.source)
        match &&
          match.index === w.matchStart &&
          ((w.nextMatch = this.lookahead.lastIndex),
          jQuery(document.createDocumentFragment())
            .append(match[1])
            .appendTo(w.output))
      }
      Wikifier.Parser.add({
        name: 'quoteByBlock',
        profiles: ['block'],
        match: '^<<<\\n',
        terminator: '^<<<\\n',
        handler: function (w) {
          Wikifier.helpers.hasBlockContext(w.output.childNodes)
            ? w.subWikify(
                jQuery(document.createElement('blockquote'))
                  .appendTo(w.output)
                  .get(0),
                this.terminator
              )
            : jQuery(w.output).append(document.createTextNode(w.matchText))
        }
      }),
        Wikifier.Parser.add({
          name: 'quoteByLine',
          profiles: ['block'],
          match: '^>+',
          lookahead: /^>+/gm,
          terminator: '\\n',
          handler: function (w) {
            if (Wikifier.helpers.hasBlockContext(w.output.childNodes)) {
              var matched,
                i,
                destStack = [w.output],
                curLevel = 0,
                newLevel = w.matchLength
              do {
                if (newLevel > curLevel)
                  for (i = curLevel; i < newLevel; ++i)
                    destStack.push(
                      jQuery(document.createElement('blockquote'))
                        .appendTo(destStack[destStack.length - 1])
                        .get(0)
                    )
                else if (newLevel < curLevel)
                  for (i = curLevel; i > newLevel; --i) destStack.pop()
                ;(curLevel = newLevel),
                  w.subWikify(destStack[destStack.length - 1], this.terminator),
                  jQuery(document.createElement('br')).appendTo(
                    destStack[destStack.length - 1]
                  ),
                  (this.lookahead.lastIndex = w.nextMatch)
                var match = this.lookahead.exec(w.source)
                ;(matched = match && match.index === w.nextMatch) &&
                  ((newLevel = match[0].length),
                  (w.nextMatch += match[0].length))
              } while (matched)
            } else jQuery(w.output).append(document.createTextNode(w.matchText))
          }
        }),
        Wikifier.Parser.add({
          name: 'macro',
          profiles: ['core'],
          match: '<<',
          lookahead: new RegExp(
            '<<(/?'.concat(
              Patterns.macroName,
              ')(?:\\s*)((?:(?:/\\*[^*]*\\*+(?:[^/*][^*]*\\*+)*/)|(?://.*\\n)|(?:`(?:\\\\.|[^`\\\\])*`)|(?:"(?:\\\\.|[^"\\\\])*")|(?:\'(?:\\\\.|[^\'\\\\])*\')|(?:\\[(?:[<>]?[Ii][Mm][Gg])?\\[[^\\r\\n]*?\\]\\]+)|[^>]|(?:>(?!>)))*)>>'
            ),
            'gm'
          ),
          working: { source: '', name: '', arguments: '', index: 0 },
          context: null,
          handler: function (w) {
            var matchStart = (this.lookahead.lastIndex = w.matchStart)
            if (this.parseTag(w)) {
              var macro,
                nextMatch = w.nextMatch,
                name = this.working.name,
                rawArgs = this.working.arguments
              try {
                if (!(macro = Macro.get(name))) {
                  if (Macro.tags.has(name)) {
                    var tags = Macro.tags.get(name)
                    return throwError(
                      w.output,
                      'child tag <<'
                        .concat(
                          name,
                          '>> was found outside of a call to its parent macro'
                        )
                        .concat(1 === tags.length ? '' : 's', ' <<')
                        .concat(tags.join('>>, <<'), '>>'),
                      w.source.slice(matchStart, w.nextMatch)
                    )
                  }
                  return throwError(
                    w.output,
                    'macro <<'.concat(name, '>> does not exist'),
                    w.source.slice(matchStart, w.nextMatch)
                  )
                }
                var payload = null
                if (
                  void 0 !== macro.tags &&
                  !(payload = this.parseBody(w, macro))
                )
                  return (
                    (w.nextMatch = nextMatch),
                    throwError(
                      w.output,
                      'cannot find a closing tag for macro <<'.concat(
                        name,
                        '>>'
                      ),
                      ''.concat(w.source.slice(matchStart, w.nextMatch), '…')
                    )
                  )
                if ('function' != typeof macro.handler)
                  return throwError(
                    w.output,
                    'macro <<'
                      .concat(name, '>> handler function ')
                      .concat(
                        void 0 === macro.handler
                          ? 'does not exist'
                          : 'is not a function'
                      ),
                    w.source.slice(matchStart, w.nextMatch)
                  )
                var args = payload
                  ? payload[0].args
                  : this.createArgs(rawArgs, this.skipArgs(macro, macro.name))
                if (void 0 !== macro._MACRO_API) {
                  this.context = new MacroContext({
                    macro: macro,
                    name: name,
                    args: args,
                    payload: payload,
                    source: w.source.slice(matchStart, w.nextMatch),
                    parent: this.context,
                    parser: w
                  })
                  try {
                    macro.handler.call(this.context)
                  } finally {
                    this.context = this.context.parent
                  }
                } else {
                  var prevRawArgs = w._rawArgs
                  w._rawArgs = rawArgs
                  try {
                    macro.handler(w.output, name, args, w, payload)
                  } finally {
                    w._rawArgs = prevRawArgs
                  }
                }
              } catch (ex) {
                return throwError(
                  w.output,
                  'cannot execute '
                    .concat(macro && macro.isWidget ? 'widget' : 'macro', ' <<')
                    .concat(name, '>>: ')
                    .concat(ex.message),
                  w.source.slice(matchStart, w.nextMatch)
                )
              } finally {
                ;(this.working.source = ''),
                  (this.working.name = ''),
                  (this.working.arguments = ''),
                  (this.working.index = 0)
              }
            } else w.outputText(w.output, w.matchStart, w.nextMatch)
          },
          parseTag: function (w) {
            var match = this.lookahead.exec(w.source)
            return (
              !(!match || match.index !== w.matchStart || !match[1]) &&
              ((w.nextMatch = this.lookahead.lastIndex),
              (this.working.source = w.source.slice(
                match.index,
                this.lookahead.lastIndex
              )),
              (this.working.name = match[1]),
              (this.working.arguments = match[2]),
              (this.working.index = match.index),
              !0)
            )
          },
          parseBody: function (w, macro) {
            for (
              var openTag = this.working.name,
                closeTag = '/'.concat(openTag),
                closeAlt = 'end'.concat(openTag),
                bodyTags = !!Array.isArray(macro.tags) && macro.tags,
                payload = [],
                end = -1,
                opened = 1,
                curSource = this.working.source,
                curTag = this.working.name,
                curArgument = this.working.arguments,
                contentStart = w.nextMatch;
              -1 !== (w.matchStart = w.source.indexOf(this.match, w.nextMatch));

            )
              if (this.parseTag(w)) {
                var tagSource = this.working.source,
                  tagName = this.working.name,
                  tagArgs = this.working.arguments,
                  tagBegin = this.working.index,
                  tagEnd = w.nextMatch,
                  hasArgs = '' !== tagArgs.trim()
                switch (tagName) {
                  case openTag:
                    ++opened
                    break
                  case closeAlt:
                  case closeTag:
                    if (hasArgs)
                      throw (
                        ((w.nextMatch = tagBegin + 2 + tagName.length),
                        new Error(
                          'malformed closing tag: "'.concat(tagSource, '"')
                        ))
                      )
                    --opened
                    break
                  default:
                    if (
                      hasArgs &&
                      (tagName.startsWith('/') || tagName.startsWith('end'))
                    ) {
                      this.lookahead.lastIndex = w.nextMatch =
                        tagBegin + 2 + tagName.length
                      continue
                    }
                    if (1 === opened && bodyTags)
                      for (var i = 0, iend = bodyTags.length; i < iend; ++i)
                        tagName === bodyTags[i] &&
                          (payload.push({
                            source: curSource,
                            name: curTag,
                            arguments: curArgument,
                            args: this.createArgs(
                              curArgument,
                              this.skipArgs(macro, curTag)
                            ),
                            contents: w.source.slice(contentStart, tagBegin)
                          }),
                          (curSource = tagSource),
                          (curTag = tagName),
                          (curArgument = tagArgs),
                          (contentStart = tagEnd))
                }
                if (0 === opened) {
                  payload.push({
                    source: curSource,
                    name: curTag,
                    arguments: curArgument,
                    args: this.createArgs(
                      curArgument,
                      this.skipArgs(macro, curTag)
                    ),
                    contents: w.source.slice(contentStart, tagBegin)
                  }),
                    (end = tagEnd)
                  break
                }
              } else
                this.lookahead.lastIndex = w.nextMatch =
                  w.matchStart + this.match.length
            return -1 !== end ? ((w.nextMatch = end), payload) : null
          },
          createArgs: function (rawArgsString, skipArgs) {
            var args = skipArgs ? [] : this.parseArgs(rawArgsString)
            return (
              Object.defineProperties(args, {
                raw: { value: rawArgsString },
                full: { value: Scripting.parse(rawArgsString) }
              }),
              args
            )
          },
          skipArgs: function (macro, tagName) {
            if (void 0 !== macro.skipArgs) {
              var sa = macro.skipArgs
              return (
                ('boolean' == typeof sa && sa) ||
                (Array.isArray(sa) && sa.includes(tagName))
              )
            }
            return (
              void 0 !== macro.skipArg0 &&
              macro.skipArg0 &&
              macro.name === tagName
            )
          },
          parseArgs: (function () {
            var Item = Lexer.enumFromNames([
                'Error',
                'Bareword',
                'Expression',
                'String',
                'SquareBracket'
              ]),
              spaceRe = new RegExp(Patterns.space),
              notSpaceRe = new RegExp(Patterns.notSpace),
              varTest = new RegExp('^'.concat(Patterns.variable))
            function slurpQuote (lexer, endQuote) {
              loop: for (;;)
                switch (lexer.next()) {
                  case '\\':
                    var ch = lexer.next()
                    if (ch !== EOF && '\n' !== ch) break
                  case EOF:
                  case '\n':
                    return EOF
                  case endQuote:
                    break loop
                }
              return lexer.pos
            }
            function lexSpace (lexer) {
              var offset = lexer.source.slice(lexer.pos).search(notSpaceRe)
              if (offset === EOF) return null
              switch (
                (0 !== offset && ((lexer.pos += offset), lexer.ignore()),
                lexer.next())
              ) {
                case '`':
                  return lexExpression
                case '"':
                  return lexDoubleQuote
                case "'":
                  return lexSingleQuote
                case '[':
                  return lexSquareBracket
                default:
                  return lexBareword
              }
            }
            function lexExpression (lexer) {
              return slurpQuote(lexer, '`') === EOF
                ? lexer.error(Item.Error, 'unterminated backquote expression')
                : (lexer.emit(Item.Expression), lexSpace)
            }
            function lexDoubleQuote (lexer) {
              return slurpQuote(lexer, '"') === EOF
                ? lexer.error(Item.Error, 'unterminated double quoted string')
                : (lexer.emit(Item.String), lexSpace)
            }
            function lexSingleQuote (lexer) {
              return slurpQuote(lexer, "'") === EOF
                ? lexer.error(Item.Error, 'unterminated single quoted string')
                : (lexer.emit(Item.String), lexSpace)
            }
            function lexSquareBracket (lexer) {
              var what
              if (
                (lexer.accept('<>IiMmGg')
                  ? ((what = 'image'), lexer.acceptRun('<>IiMmGg'))
                  : (what = 'link'),
                !lexer.accept('['))
              )
                return lexer.error(
                  Item.Error,
                  'malformed '.concat(what, ' markup')
                )
              lexer.depth = 2
              loop: for (;;)
                switch (lexer.next()) {
                  case '\\':
                    var ch = lexer.next()
                    if (ch !== EOF && '\n' !== ch) break
                  case EOF:
                  case '\n':
                    return lexer.error(
                      Item.Error,
                      'unterminated '.concat(what, ' markup')
                    )
                  case '[':
                    ++lexer.depth
                    break
                  case ']':
                    if ((--lexer.depth, lexer.depth < 0))
                      return lexer.error(
                        Item.Error,
                        "unexpected right square bracket ']'"
                      )
                    if (1 === lexer.depth) {
                      if (']' === lexer.next()) {
                        --lexer.depth
                        break loop
                      }
                      lexer.backup()
                    }
                }
              return lexer.emit(Item.SquareBracket), lexSpace
            }
            function lexBareword (lexer) {
              var offset = lexer.source.slice(lexer.pos).search(spaceRe)
              return (
                (lexer.pos =
                  offset === EOF ? lexer.source.length : lexer.pos + offset),
                lexer.emit(Item.Bareword),
                offset === EOF ? null : lexSpace
              )
            }
            return function (rawArgsString) {
              var lexer = new Lexer(rawArgsString, lexSpace),
                args = []
              return (
                lexer.run().forEach(function (item) {
                  var arg = item.text
                  switch (item.type) {
                    case Item.Error:
                      throw new Error(
                        'unable to parse macro argument "'
                          .concat(arg, '": ')
                          .concat(item.message)
                      )
                    case Item.Bareword:
                      if (varTest.test(arg)) arg = State.getVar(arg)
                      else if (/^(?:settings|setup)[.[]/.test(arg))
                        try {
                          arg = Scripting.evalTwineScript(arg)
                        } catch (ex) {
                          throw new Error(
                            'unable to parse macro argument "'
                              .concat(arg, '": ')
                              .concat(ex.message)
                          )
                        }
                      else if ('null' === arg) arg = null
                      else if ('undefined' === arg) arg = undefined
                      else if ('true' === arg) arg = !0
                      else if ('false' === arg) arg = !1
                      else if ('NaN' === arg) arg = NaN
                      else {
                        var argAsNum = Number(arg)
                        Number.isNaN(argAsNum) || (arg = argAsNum)
                      }
                      break
                    case Item.Expression:
                      if ('' === (arg = arg.slice(1, -1).trim()))
                        arg = undefined
                      else
                        try {
                          arg = Scripting.evalTwineScript('('.concat(arg, ')'))
                        } catch (ex) {
                          throw new Error(
                            'unable to parse macro argument expression "'
                              .concat(arg, '": ')
                              .concat(ex.message)
                          )
                        }
                      break
                    case Item.String:
                      try {
                        arg = Scripting.evalJavaScript(arg)
                      } catch (ex) {
                        throw new Error(
                          'unable to parse macro argument string "'
                            .concat(arg, '": ')
                            .concat(ex.message)
                        )
                      }
                      break
                    case Item.SquareBracket:
                      var markup = Wikifier.helpers.parseSquareBracketedMarkup({
                        source: arg,
                        matchStart: 0
                      })
                      if (markup.hasOwnProperty('error'))
                        throw new Error(
                          'unable to parse macro argument "'
                            .concat(arg, '": ')
                            .concat(markup.error)
                        )
                      if (markup.pos < arg.length)
                        throw new Error(
                          'unable to parse macro argument "'
                            .concat(arg, '": unexpected character(s) "')
                            .concat(arg.slice(markup.pos), '" (pos: ')
                            .concat(markup.pos, ')')
                        )
                      markup.isLink
                        ? (((arg = { isLink: !0 }).count =
                            markup.hasOwnProperty('text') ? 2 : 1),
                          (arg.link = Wikifier.helpers.evalPassageId(
                            markup.link
                          )),
                          (arg.text = markup.hasOwnProperty('text')
                            ? Wikifier.helpers.evalText(markup.text)
                            : arg.link),
                          (arg.external =
                            !markup.forceInternal &&
                            Wikifier.isExternalLink(arg.link)),
                          (arg.setFn = markup.hasOwnProperty('setter')
                            ? Wikifier.helpers.createShadowSetterCallback(
                                Scripting.parse(markup.setter)
                              )
                            : null))
                        : markup.isImage &&
                          ((arg = (function (source) {
                            var imgObj = { source: source, isImage: !0 }
                            if (
                              'data:' !== source.slice(0, 5) &&
                              Story.has(source)
                            ) {
                              var passage = Story.get(source)
                              passage.tags.includes('Twine.image') &&
                                ((imgObj.source = passage.text),
                                (imgObj.passage = passage.title))
                            }
                            return imgObj
                          })(Wikifier.helpers.evalPassageId(markup.source))),
                          markup.hasOwnProperty('align') &&
                            (arg.align = markup.align),
                          markup.hasOwnProperty('text') &&
                            (arg.title = Wikifier.helpers.evalText(
                              markup.text
                            )),
                          markup.hasOwnProperty('link') &&
                            ((arg.link = Wikifier.helpers.evalPassageId(
                              markup.link
                            )),
                            (arg.external =
                              !markup.forceInternal &&
                              Wikifier.isExternalLink(arg.link))),
                          (arg.setFn = markup.hasOwnProperty('setter')
                            ? Wikifier.helpers.createShadowSetterCallback(
                                Scripting.parse(markup.setter)
                              )
                            : null))
                  }
                  args.push(arg)
                }),
                args
              )
            }
          })()
        }),
        Wikifier.Parser.add({
          name: 'link',
          profiles: ['core'],
          match: '\\[\\[[^[]',
          handler: function (w) {
            var markup = Wikifier.helpers.parseSquareBracketedMarkup(w)
            if (markup.hasOwnProperty('error'))
              w.outputText(w.output, w.matchStart, w.nextMatch)
            else {
              w.nextMatch = markup.pos
              var link = Wikifier.helpers.evalPassageId(markup.link),
                text = markup.hasOwnProperty('text')
                  ? Wikifier.helpers.evalText(markup.text)
                  : link,
                setFn = markup.hasOwnProperty('setter')
                  ? Wikifier.helpers.createShadowSetterCallback(
                      Scripting.parse(markup.setter)
                    )
                  : null,
                output = (
                  Config.debug
                    ? new DebugView(
                        w.output,
                        'link-markup',
                        '[[link]]',
                        w.source.slice(w.matchStart, w.nextMatch)
                      )
                    : w
                ).output
              markup.forceInternal || !Wikifier.isExternalLink(link)
                ? Wikifier.createInternalLink(output, link, text, setFn)
                : Wikifier.createExternalLink(output, link, text)
            }
          }
        }),
        Wikifier.Parser.add({
          name: 'urlLink',
          profiles: ['core'],
          match: Patterns.url,
          handler: function (w) {
            w.outputText(
              Wikifier.createExternalLink(w.output, w.matchText),
              w.matchStart,
              w.nextMatch
            )
          }
        }),
        Wikifier.Parser.add({
          name: 'image',
          profiles: ['core'],
          match: '\\[[<>]?[Ii][Mm][Gg]\\[',
          handler: function (w) {
            var markup = Wikifier.helpers.parseSquareBracketedMarkup(w)
            if (markup.hasOwnProperty('error'))
              w.outputText(w.output, w.matchStart, w.nextMatch)
            else {
              var debugView
              ;(w.nextMatch = markup.pos),
                Config.debug &&
                  (debugView = new DebugView(
                    w.output,
                    'image-markup',
                    markup.hasOwnProperty('link') ? '[img[][link]]' : '[img[]]',
                    w.source.slice(w.matchStart, w.nextMatch)
                  )).modes({ block: !0 })
              var source,
                setFn = markup.hasOwnProperty('setter')
                  ? Wikifier.helpers.createShadowSetterCallback(
                      Scripting.parse(markup.setter)
                    )
                  : null,
                el = (Config.debug ? debugView : w).output
              if (markup.hasOwnProperty('link')) {
                var link = Wikifier.helpers.evalPassageId(markup.link)
                ;(el =
                  markup.forceInternal || !Wikifier.isExternalLink(link)
                    ? Wikifier.createInternalLink(el, link, null, setFn)
                    : Wikifier.createExternalLink(el, link)).classList.add(
                  'link-image'
                )
              }
              if (
                ((el = jQuery(document.createElement('img'))
                  .appendTo(el)
                  .get(0)),
                'data:' !==
                  (source = Wikifier.helpers.evalPassageId(
                    markup.source
                  )).slice(0, 5) && Story.has(source))
              ) {
                var passage = Story.get(source)
                passage.tags.includes('Twine.image') &&
                  (el.setAttribute('data-passage', passage.title),
                  (source = passage.text.trim()))
              }
              ;(el.src = source),
                markup.hasOwnProperty('text') &&
                  (el.title = Wikifier.helpers.evalText(markup.text)),
                markup.hasOwnProperty('align') && (el.align = markup.align)
            }
          }
        }),
        Wikifier.Parser.add({
          name: 'monospacedByBlock',
          profiles: ['block'],
          match: '^\\{\\{\\{\\n',
          lookahead: /^\{\{\{\n((?:^[^\n]*\n)+?)(^\}\}\}$\n?)/gm,
          handler: function (w) {
            this.lookahead.lastIndex = w.matchStart
            var match = this.lookahead.exec(w.source)
            if (match && match.index === w.matchStart) {
              var pre = jQuery(document.createElement('pre'))
              jQuery(document.createElement('code'))
                .text(match[1])
                .appendTo(pre),
                pre.appendTo(w.output),
                (w.nextMatch = this.lookahead.lastIndex)
            }
          }
        }),
        Wikifier.Parser.add({
          name: 'formatByChar',
          profiles: ['core'],
          match: "''|//|__|\\^\\^|~~|==|\\{\\{\\{",
          handler: function (w) {
            switch (w.matchText) {
              case "''":
                w.subWikify(
                  jQuery(document.createElement('strong'))
                    .appendTo(w.output)
                    .get(0),
                  "''"
                )
                break
              case '//':
                w.subWikify(
                  jQuery(document.createElement('em'))
                    .appendTo(w.output)
                    .get(0),
                  '//'
                )
                break
              case '__':
                w.subWikify(
                  jQuery(document.createElement('u')).appendTo(w.output).get(0),
                  '__'
                )
                break
              case '^^':
                w.subWikify(
                  jQuery(document.createElement('sup'))
                    .appendTo(w.output)
                    .get(0),
                  '\\^\\^'
                )
                break
              case '~~':
                w.subWikify(
                  jQuery(document.createElement('sub'))
                    .appendTo(w.output)
                    .get(0),
                  '~~'
                )
                break
              case '==':
                w.subWikify(
                  jQuery(document.createElement('s')).appendTo(w.output).get(0),
                  '=='
                )
                break
              case '{{{':
                var lookahead = /\{\{\{((?:.|\n)*?)\}\}\}/gm
                lookahead.lastIndex = w.matchStart
                var match = lookahead.exec(w.source)
                match &&
                  match.index === w.matchStart &&
                  (jQuery(document.createElement('code'))
                    .text(match[1])
                    .appendTo(w.output),
                  (w.nextMatch = lookahead.lastIndex))
            }
          }
        }),
        Wikifier.Parser.add({
          name: 'customStyle',
          profiles: ['core'],
          match: '@@',
          terminator: '@@',
          blockRe: /\s*\n/gm,
          handler: function (w) {
            var css = Wikifier.helpers.inlineCss(w)
            this.blockRe.lastIndex = w.nextMatch
            var blockMatch = this.blockRe.exec(w.source),
              blockLevel = blockMatch && blockMatch.index === w.nextMatch,
              $el = jQuery(
                document.createElement(blockLevel ? 'div' : 'span')
              ).appendTo(w.output)
            0 === css.classes.length &&
            '' === css.id &&
            0 === Object.keys(css.styles).length
              ? $el.addClass('marked')
              : (css.classes.forEach(function (className) {
                  return $el.addClass(className)
                }),
                '' !== css.id && $el.attr('id', css.id),
                $el.css(css.styles)),
              blockLevel
                ? ((w.nextMatch += blockMatch[0].length),
                  w.subWikify($el[0], '\\n?'.concat(this.terminator)))
                : w.subWikify($el[0], this.terminator)
          }
        }),
        Wikifier.Parser.add({
          name: 'verbatimText',
          profiles: ['core'],
          match: '"{3}|<[Nn][Oo][Ww][Ii][Kk][Ii]>',
          lookahead:
            /(?:"{3}((?:.|\n)*?)"{3})|(?:<[Nn][Oo][Ww][Ii][Kk][Ii]>((?:.|\n)*?)<\/[Nn][Oo][Ww][Ii][Kk][Ii]>)/gm,
          handler: function (w) {
            this.lookahead.lastIndex = w.matchStart
            var match = this.lookahead.exec(w.source)
            match &&
              match.index === w.matchStart &&
              ((w.nextMatch = this.lookahead.lastIndex),
              jQuery(document.createElement('span'))
                .addClass('verbatim')
                .text(match[1] || match[2])
                .appendTo(w.output))
          }
        }),
        Wikifier.Parser.add({
          name: 'horizontalRule',
          profiles: ['core'],
          match: '^----+$\\n?|<[Hh][Rr]\\s*/?>\\n?',
          handler: function (w) {
            jQuery(document.createElement('hr')).appendTo(w.output)
          }
        }),
        Wikifier.Parser.add({
          name: 'emdash',
          profiles: ['core'],
          match: '--',
          handler: function (w) {
            jQuery(document.createTextNode('—')).appendTo(w.output)
          }
        }),
        Wikifier.Parser.add({
          name: 'doubleDollarSign',
          profiles: ['core'],
          match: '\\${2}',
          handler: function (w) {
            jQuery(document.createTextNode('$')).appendTo(w.output)
          }
        }),
        Wikifier.Parser.add({
          name: 'nakedVariable',
          profiles: ['core'],
          match: ''
            .concat(Patterns.variable, '(?:(?:\\.')
            .concat(
              Patterns.identifier,
              ')|(?:\\[\\d+\\])|(?:\\["(?:\\\\.|[^"\\\\])+"\\])|(?:\\[\'(?:\\\\.|[^\'\\\\])+\'\\])|(?:\\['
            )
            .concat(Patterns.variable, '\\]))*'),
          handler: function (w) {
            var result = State.getVar(w.matchText)
            null == result
              ? jQuery(document.createTextNode(w.matchText)).appendTo(w.output)
              : new Wikifier(
                  (Config.debug
                    ? new DebugView(
                        w.output,
                        'variable',
                        w.matchText,
                        w.matchText
                      )
                    : w
                  ).output,
                  stringFrom(result)
                )
          }
        }),
        Wikifier.Parser.add({
          name: 'template',
          profiles: ['core'],
          match: '\\?'.concat(Patterns.templateName),
          handler: function (w) {
            var name = w.matchText.slice(1),
              template = Template.get(name),
              result = null
            switch (
              (template instanceof Array && (template = template.random()),
              _typeof(template))
            ) {
              case 'function':
                try {
                  result = stringFrom(template.call({ name: name }))
                } catch (ex) {
                  return throwError(
                    w.output,
                    'cannot execute function template ?'
                      .concat(name, ': ')
                      .concat(ex.message),
                    w.source.slice(w.matchStart, w.nextMatch)
                  )
                }
                break
              case 'string':
                result = template
            }
            null === result
              ? jQuery(document.createTextNode(w.matchText)).appendTo(w.output)
              : new Wikifier(
                  (Config.debug
                    ? new DebugView(
                        w.output,
                        'template',
                        w.matchText,
                        w.matchText
                      )
                    : w
                  ).output,
                  result
                )
          }
        }),
        Wikifier.Parser.add({
          name: 'heading',
          profiles: ['block'],
          match: '^!{1,6}',
          terminator: '\\n',
          handler: function (w) {
            Wikifier.helpers.hasBlockContext(w.output.childNodes)
              ? w.subWikify(
                  jQuery(document.createElement('h'.concat(w.matchLength)))
                    .appendTo(w.output)
                    .get(0),
                  this.terminator
                )
              : jQuery(w.output).append(document.createTextNode(w.matchText))
          }
        }),
        Wikifier.Parser.add({
          name: 'table',
          profiles: ['block'],
          match: '^\\|(?:[^\\n]*)\\|(?:[fhck]?)$',
          lookahead: /^\|([^\n]*)\|([fhck]?)$/gm,
          rowTerminator: '\\|(?:[cfhk]?)$\\n?',
          cellPattern: '(?:\\|([^\\n\\|]*)\\|)|(\\|[cfhk]?$\\n?)',
          cellTerminator: '(?:\\u0020*)\\|',
          rowTypes: { c: 'caption', f: 'tfoot', h: 'thead', '': 'tbody' },
          handler: function (w) {
            if (Wikifier.helpers.hasBlockContext(w.output.childNodes)) {
              var matched,
                table = jQuery(document.createElement('table'))
                  .appendTo(w.output)
                  .get(0),
                prevColumns = [],
                curRowType = null,
                $rowContainer = null,
                rowCount = 0
              w.nextMatch = w.matchStart
              do {
                this.lookahead.lastIndex = w.nextMatch
                var match = this.lookahead.exec(w.source)
                if ((matched = match && match.index === w.nextMatch)) {
                  var nextRowType = match[2]
                  'k' === nextRowType
                    ? ((table.className = match[1]),
                      (w.nextMatch += match[0].length + 1))
                    : (nextRowType !== curRowType &&
                        ((curRowType = nextRowType),
                        ($rowContainer = jQuery(
                          document.createElement(this.rowTypes[nextRowType])
                        ).appendTo(table))),
                      'c' === curRowType
                        ? ($rowContainer.css(
                            'caption-side',
                            0 === rowCount ? 'top' : 'bottom'
                          ),
                          (w.nextMatch += 1),
                          w.subWikify($rowContainer[0], this.rowTerminator))
                        : this.rowHandler(
                            w,
                            jQuery(document.createElement('tr'))
                              .appendTo($rowContainer)
                              .get(0),
                            prevColumns
                          ),
                      ++rowCount)
                }
              } while (matched)
            } else jQuery(w.output).append(document.createTextNode(w.matchText))
          },
          rowHandler: function (w, rowEl, prevColumns) {
            var matched,
              _this12 = this,
              cellRe = new RegExp(this.cellPattern, 'gm'),
              col = 0,
              curColCount = 1
            do {
              cellRe.lastIndex = w.nextMatch
              var cellMatch = cellRe.exec(w.source)
              if ((matched = cellMatch && cellMatch.index === w.nextMatch)) {
                if ('~' === cellMatch[1]) {
                  var last = prevColumns[col]
                  last &&
                    (++last.rowCount,
                    last.$element
                      .attr('rowspan', last.rowCount)
                      .css('vertical-align', 'middle')),
                    (w.nextMatch = cellMatch.index + cellMatch[0].length - 1)
                } else if ('>' === cellMatch[1])
                  ++curColCount,
                    (w.nextMatch = cellMatch.index + cellMatch[0].length - 1)
                else {
                  if (cellMatch[2]) {
                    w.nextMatch = cellMatch.index + cellMatch[0].length
                    break
                  }
                  !(function () {
                    ++w.nextMatch
                    for (
                      var css = Wikifier.helpers.inlineCss(w),
                        spaceLeft = !1,
                        spaceRight = !1,
                        $cell = void 0;
                      ' ' === w.source.substr(w.nextMatch, 1);

                    )
                      (spaceLeft = !0), ++w.nextMatch
                    '!' === w.source.substr(w.nextMatch, 1)
                      ? (($cell = jQuery(document.createElement('th')).appendTo(
                          rowEl
                        )),
                        ++w.nextMatch)
                      : ($cell = jQuery(document.createElement('td')).appendTo(
                          rowEl
                        )),
                      (prevColumns[col] = { rowCount: 1, $element: $cell }),
                      curColCount > 1 &&
                        ($cell.attr('colspan', curColCount), (curColCount = 1)),
                      w.subWikify($cell[0], _this12.cellTerminator),
                      ' ' === w.matchText.substr(w.matchText.length - 2, 1) &&
                        (spaceRight = !0),
                      css.classes.forEach(function (className) {
                        return $cell.addClass(className)
                      }),
                      '' !== css.id && $cell.attr('id', css.id),
                      spaceLeft && spaceRight
                        ? (css.styles['text-align'] = 'center')
                        : spaceLeft
                        ? (css.styles['text-align'] = 'right')
                        : spaceRight && (css.styles['text-align'] = 'left'),
                      $cell.css(css.styles),
                      (w.nextMatch = w.nextMatch - 1)
                  })()
                }
                ++col
              }
            } while (matched)
          }
        }),
        Wikifier.Parser.add({
          name: 'list',
          profiles: ['block'],
          match: '^(?:(?:\\*+)|(?:#+))',
          lookahead: /^(?:(\*+)|(#+))/gm,
          terminator: '\\n',
          handler: function (w) {
            if (Wikifier.helpers.hasBlockContext(w.output.childNodes)) {
              w.nextMatch = w.matchStart
              var matched,
                i,
                destStack = [w.output],
                curType = null,
                curLevel = 0
              do {
                this.lookahead.lastIndex = w.nextMatch
                var match = this.lookahead.exec(w.source)
                if ((matched = match && match.index === w.nextMatch)) {
                  var newType = match[2] ? 'ol' : 'ul',
                    newLevel = match[0].length
                  if (((w.nextMatch += match[0].length), newLevel > curLevel))
                    for (i = curLevel; i < newLevel; ++i)
                      destStack.push(
                        jQuery(document.createElement(newType))
                          .appendTo(destStack[destStack.length - 1])
                          .get(0)
                      )
                  else if (newLevel < curLevel)
                    for (i = curLevel; i > newLevel; --i) destStack.pop()
                  else
                    newLevel === curLevel &&
                      newType !== curType &&
                      (destStack.pop(),
                      destStack.push(
                        jQuery(document.createElement(newType))
                          .appendTo(destStack[destStack.length - 1])
                          .get(0)
                      ))
                  ;(curLevel = newLevel),
                    (curType = newType),
                    w.subWikify(
                      jQuery(document.createElement('li'))
                        .appendTo(destStack[destStack.length - 1])
                        .get(0),
                      this.terminator
                    )
                }
              } while (matched)
            } else jQuery(w.output).append(document.createTextNode(w.matchText))
          }
        }),
        Wikifier.Parser.add({
          name: 'commentByBlock',
          profiles: ['core'],
          match: '(?:/(?:%|\\*))|(?:\x3c!--)',
          lookahead:
            /(?:\/(%|\*)(?:(?:.|\n)*?)\1\/)|(?:<!--(?:(?:.|\n)*?)-->)/gm,
          handler: function (w) {
            this.lookahead.lastIndex = w.matchStart
            var match = this.lookahead.exec(w.source)
            match &&
              match.index === w.matchStart &&
              (w.nextMatch = this.lookahead.lastIndex)
          }
        }),
        Wikifier.Parser.add({
          name: 'lineContinuation',
          profiles: ['core'],
          match: '\\\\'
            .concat(Patterns.spaceNoTerminator, '*\\n|\\n')
            .concat(Patterns.spaceNoTerminator, '*\\\\|\\n?\\\\')
            .concat(Patterns.spaceNoTerminator, '*$|^')
            .concat(Patterns.spaceNoTerminator, '*\\\\\\n?'),
          handler: function (w) {
            w.nextMatch = w.matchStart + w.matchLength
          }
        }),
        Wikifier.Parser.add({
          name: 'lineBreak',
          profiles: ['core'],
          match: '\\n|<[Bb][Rr]\\s*/?>',
          handler: function (w) {
            w.options.nobr ||
              jQuery(document.createElement('br')).appendTo(w.output)
          }
        }),
        Wikifier.Parser.add({
          name: 'htmlCharacterReference',
          profiles: ['core'],
          match:
            '(?:(?:&#?[0-9A-Za-z]{2,8};|.)(?:&#?(?:x0*(?:3[0-6][0-9A-Fa-f]|1D[C-Fc-f][0-9A-Fa-f]|20[D-Fd-f][0-9A-Fa-f]|FE2[0-9A-Fa-f])|0*(?:76[89]|7[7-9][0-9]|8[0-7][0-9]|761[6-9]|76[2-7][0-9]|84[0-3][0-9]|844[0-7]|6505[6-9]|6506[0-9]|6507[0-1]));)+|&#?[0-9A-Za-z]{2,8};)',
          handler: function (w) {
            jQuery(document.createDocumentFragment())
              .append(w.matchText)
              .appendTo(w.output)
          }
        }),
        Wikifier.Parser.add({
          name: 'xmlProlog',
          profiles: ['core'],
          match: '<\\?[Xx][Mm][Ll][^>]*\\?>',
          handler: function (w) {
            w.nextMatch = w.matchStart + w.matchLength
          }
        }),
        Wikifier.Parser.add({
          name: 'verbatimHtml',
          profiles: ['core'],
          match: '<[Hh][Tt][Mm][Ll]>',
          lookahead: /<[Hh][Tt][Mm][Ll]>((?:.|\n)*?)<\/[Hh][Tt][Mm][Ll]>/gm,
          handler: _verbatimTagHandler
        }),
        Wikifier.Parser.add({
          name: 'verbatimScriptTag',
          profiles: ['core'],
          match: '<[Ss][Cc][Rr][Ii][Pp][Tt][^>]*>',
          lookahead:
            /(<[Ss][Cc][Rr][Ii][Pp][Tt]*>(?:.|\n)*?<\/[Ss][Cc][Rr][Ii][Pp][Tt]>)/gm,
          handler: _verbatimTagHandler
        }),
        Wikifier.Parser.add({
          name: 'styleTag',
          profiles: ['core'],
          match: '<[Ss][Tt][Yy][Ll][Ee][^>]*>',
          lookahead:
            /(<[Ss][Tt][Yy][Ll][Ee]*>)((?:.|\n)*?)(<\/[Ss][Tt][Yy][Ll][Ee]>)/gm,
          imageMarkup: new RegExp(Patterns.cssImage, 'g'),
          hasImageMarkup: new RegExp(Patterns.cssImage),
          handler: function (w) {
            this.lookahead.lastIndex = w.matchStart
            var match = this.lookahead.exec(w.source)
            if (match && match.index === w.matchStart) {
              w.nextMatch = this.lookahead.lastIndex
              var css = match[2]
              this.hasImageMarkup.test(css) &&
                ((this.imageMarkup.lastIndex = 0),
                (css = css.replace(this.imageMarkup, function (wikiImage) {
                  var markup = Wikifier.helpers.parseSquareBracketedMarkup({
                    source: wikiImage,
                    matchStart: 0
                  })
                  if (
                    markup.hasOwnProperty('error') ||
                    markup.pos < wikiImage.length
                  )
                    return wikiImage
                  var source = markup.source
                  if ('data:' !== source.slice(0, 5) && Story.has(source)) {
                    var passage = Story.get(source)
                    passage.tags.includes('Twine.image') &&
                      (source = passage.text)
                  }
                  return 'url("'.concat(source.replace(/"/g, '%22'), '")')
                }))),
                jQuery(document.createDocumentFragment())
                  .append(match[1] + css + match[3])
                  .appendTo(w.output)
            }
          }
        }),
        Wikifier.Parser.add({
          name: 'svgTag',
          profiles: ['core'],
          match: '<[Ss][Vv][Gg][^>]*>',
          lookahead: /<(\/?)[Ss][Vv][Gg][^>]*>/gm,
          namespace: 'http://www.w3.org/2000/svg',
          handler: function (w) {
            var _this13 = this
            this.lookahead.lastIndex = w.nextMatch
            for (
              var match, depth = 1;
              depth > 0 && null !== (match = this.lookahead.exec(w.source));

            )
              depth += '/' === match[1] ? -1 : 1
            if (0 === depth) {
              w.nextMatch = this.lookahead.lastIndex
              var svgTag = w.source.slice(
                  w.matchStart,
                  this.lookahead.lastIndex
                ),
                $frag = jQuery(document.createDocumentFragment()).append(svgTag)
              $frag
                .find('a[data-passage],image[data-passage]')
                .each(function (_, el) {
                  var tagName = el.tagName.toLowerCase()
                  try {
                    _this13.processAttributeDirectives(el)
                  } catch (ex) {
                    return throwError(
                      w.output,
                      'svg|<'.concat(tagName, '>: ').concat(ex.message),
                      ''.concat(w.matchText, '…')
                    )
                  }
                  el.hasAttribute('data-passage') &&
                    _this13.processDataAttributes(el, tagName)
                }),
                $frag.appendTo(w.output)
            }
          },
          processAttributeDirectives: function (el) {
            _toConsumableArray(el.attributes).forEach(function (_ref10) {
              var name = _ref10.name,
                value = _ref10.value,
                evalShorthand = '@' === name[0]
              if (evalShorthand || name.startsWith('sc-eval:')) {
                var result,
                  newName = name.slice(evalShorthand ? 1 : 8)
                if ('data-setter' === newName)
                  throw new Error(
                    'evaluation directive is not allowed on the data-setter attribute: "'.concat(
                      name,
                      '"'
                    )
                  )
                try {
                  result = Scripting.evalTwineScript(value)
                } catch (ex) {
                  throw new Error(
                    'bad evaluation from attribute directive "'
                      .concat(name, '": ')
                      .concat(ex.message)
                  )
                }
                try {
                  el.setAttribute(newName, result), el.removeAttribute(name)
                } catch (ex) {
                  throw new Error(
                    'cannot transform attribute directive "'
                      .concat(name, '" into attribute "')
                      .concat(newName, '"')
                  )
                }
              }
            })
          },
          processDataAttributes: function (el, tagName) {
            var passage = el.getAttribute('data-passage')
            if (null != passage) {
              var evaluated = Wikifier.helpers.evalPassageId(passage)
              if (
                (evaluated !== passage &&
                  ((passage = evaluated),
                  el.setAttribute('data-passage', evaluated)),
                '' !== passage)
              )
                if ('image' === tagName)
                  'data:' !== passage.slice(0, 5) &&
                    Story.has(passage) &&
                    (passage = Story.get(passage)).tags.includes(
                      'Twine.image'
                    ) &&
                    el.setAttribute('href', passage.text.trim())
                else {
                  var setFn,
                    setter = el.getAttribute('data-setter')
                  null != setter &&
                    '' !== (setter = String(setter).trim()) &&
                    (setFn = Wikifier.helpers.createShadowSetterCallback(
                      Scripting.parse(setter)
                    )),
                    Story.has(passage)
                      ? (el.classList.add('link-internal'),
                        Config.addVisitedLinkClass &&
                          State.hasPlayed(passage) &&
                          el.classList.add('link-visited'))
                      : el.classList.add('link-broken'),
                    jQuery(el).ariaClick({ one: !0 }, function () {
                      'function' == typeof setFn && setFn.call(this),
                        Engine.play(passage)
                    })
                }
            }
          }
        }),
        Wikifier.Parser.add({
          name: 'htmlTag',
          profiles: ['core'],
          match: '<'.concat(
            Patterns.htmlTagName,
            '(?:\\s+[^\\u0000-\\u001F\\u007F-\\u009F\\s"\'>\\/=]+(?:\\s*=\\s*(?:"[^"]*?"|\'[^\']*?\'|[^\\s"\'=<>`]+))?)*\\s*\\/?>'
          ),
          tagRe: new RegExp('^<('.concat(Patterns.htmlTagName, ')')),
          mediaTags: ['audio', 'img', 'source', 'track', 'video'],
          nobrTags: [
            'audio',
            'colgroup',
            'datalist',
            'dl',
            'figure',
            'meter',
            'ol',
            'optgroup',
            'picture',
            'progress',
            'ruby',
            'select',
            'table',
            'tbody',
            'tfoot',
            'thead',
            'tr',
            'ul',
            'video'
          ],
          voidTags: [
            'area',
            'base',
            'br',
            'col',
            'embed',
            'hr',
            'img',
            'input',
            'keygen',
            'link',
            'menuitem',
            'meta',
            'param',
            'source',
            'track',
            'wbr'
          ],
          handler: function (w) {
            var tagMatch = this.tagRe.exec(w.matchText),
              tag = tagMatch && tagMatch[1],
              tagName = tag && tag.toLowerCase()
            if (tagName) {
              var terminator,
                terminatorMatch,
                isVoid =
                  this.voidTags.includes(tagName) || w.matchText.endsWith('/>'),
                isNobr = this.nobrTags.includes(tagName)
              if (!isVoid) {
                terminator = '<\\/'.concat(tagName, '\\s*>')
                var terminatorRe = new RegExp(terminator, 'gim')
                ;(terminatorRe.lastIndex = w.matchStart),
                  (terminatorMatch = terminatorRe.exec(w.source))
              }
              if (!isVoid && !terminatorMatch)
                return throwError(
                  w.output,
                  'cannot find a closing tag for HTML <'.concat(tag, '>'),
                  ''.concat(w.matchText, '…')
                )
              var debugView,
                output = w.output,
                el = document.createElement(w.output.tagName)
              for (el.innerHTML = w.matchText; el.firstChild; )
                el = el.firstChild
              try {
                this.processAttributeDirectives(el)
              } catch (ex) {
                return throwError(
                  w.output,
                  '<'.concat(tagName, '>: ').concat(ex.message),
                  ''.concat(w.matchText, '…')
                )
              }
              if (
                (el.hasAttribute('data-passage') &&
                  (this.processDataAttributes(el, tagName),
                  Config.debug &&
                    ((debugView = new DebugView(
                      w.output,
                      'html-'.concat(tagName),
                      tagName,
                      w.matchText
                    )).modes({
                      block: 'img' === tagName,
                      nonvoid: terminatorMatch
                    }),
                    (output = debugView.output))),
                terminatorMatch)
              ) {
                try {
                  Wikifier.Option.push({ nobr: isNobr }),
                    w.subWikify(el, terminator, { ignoreTerminatorCase: !0 })
                } finally {
                  Wikifier.Option.pop()
                }
                debugView &&
                  jQuery(el).find('.debug.block').length > 0 &&
                  debugView.modes({ block: !0 })
              }
              output.appendChild('track' === tagName ? el.cloneNode(!0) : el)
            }
          },
          processAttributeDirectives: function (el) {
            _toConsumableArray(el.attributes).forEach(function (_ref11) {
              var name = _ref11.name,
                value = _ref11.value,
                evalShorthand = '@' === name[0]
              if (evalShorthand || name.startsWith('sc-eval:')) {
                var result,
                  newName = name.slice(evalShorthand ? 1 : 8)
                if ('data-setter' === newName)
                  throw new Error(
                    'evaluation directive is not allowed on the data-setter attribute: "'.concat(
                      name,
                      '"'
                    )
                  )
                try {
                  result = Scripting.evalTwineScript(value)
                } catch (ex) {
                  throw new Error(
                    'bad evaluation from attribute directive "'
                      .concat(name, '": ')
                      .concat(ex.message)
                  )
                }
                try {
                  el.setAttribute(newName, result), el.removeAttribute(name)
                } catch (ex) {
                  throw new Error(
                    'cannot transform attribute directive "'
                      .concat(name, '" into attribute "')
                      .concat(newName, '"')
                  )
                }
              }
            })
          },
          processDataAttributes: function (el, tagName) {
            var passage = el.getAttribute('data-passage')
            if (null != passage) {
              var evaluated = Wikifier.helpers.evalPassageId(passage)
              if (
                (evaluated !== passage &&
                  ((passage = evaluated),
                  el.setAttribute('data-passage', evaluated)),
                '' !== passage)
              )
                if (this.mediaTags.includes(tagName)) {
                  if ('data:' !== passage.slice(0, 5) && Story.has(passage)) {
                    var parentName, twineTag
                    switch (((passage = Story.get(passage)), tagName)) {
                      case 'audio':
                      case 'video':
                        twineTag = 'Twine.'.concat(tagName)
                        break
                      case 'img':
                        twineTag = 'Twine.image'
                        break
                      case 'track':
                        twineTag = 'Twine.vtt'
                        break
                      case 'source':
                        var $parent = $(el).closest('audio,picture,video')
                        $parent.length &&
                          ((parentName = $parent.get(0).tagName.toLowerCase()),
                          (twineTag = 'Twine.'.concat(
                            'picture' === parentName ? 'image' : parentName
                          )))
                    }
                    passage.tags.includes(twineTag) &&
                      (el['picture' === parentName ? 'srcset' : 'src'] =
                        passage.text.trim())
                  }
                } else {
                  var setFn,
                    setter = el.getAttribute('data-setter')
                  null != setter &&
                    '' !== (setter = String(setter).trim()) &&
                    (setFn = Wikifier.helpers.createShadowSetterCallback(
                      Scripting.parse(setter)
                    )),
                    Story.has(passage)
                      ? (el.classList.add('link-internal'),
                        Config.addVisitedLinkClass &&
                          State.hasPlayed(passage) &&
                          el.classList.add('link-visited'))
                      : el.classList.add('link-broken'),
                    jQuery(el).ariaClick({ one: !0 }, function () {
                      'function' == typeof setFn && setFn.call(this),
                        Engine.play(passage)
                    })
                }
            }
          }
        })
    })()
    var Template =
        ((_templates = new Map()),
        (_validNameRe = new RegExp('^(?:'.concat(Patterns.templateName, ')$'))),
        (_validType = function (template) {
          var templateType = _typeof(template)
          return 'function' === templateType || 'string' === templateType
        }),
        Object.freeze(
          Object.defineProperties(
            {},
            {
              add: {
                value: function (name, template) {
                  if (
                    !(
                      _validType(template) ||
                      (template instanceof Array &&
                        template.length > 0 &&
                        template.every(_validType))
                    )
                  )
                    throw new TypeError(
                      'invalid template type ('.concat(
                        name,
                        '); templates must be: functions, strings, or an array of either'
                      )
                    )
                  ;(name instanceof Array ? name : [name]).forEach(function (
                    name
                  ) {
                    if (!_validNameRe.test(name))
                      throw new Error(
                        'invalid template name "'.concat(name, '"')
                      )
                    if (_templates.has(name))
                      throw new Error(
                        'cannot clobber existing template ?'.concat(name)
                      )
                    _templates.set(name, template)
                  })
                }
              },
              delete: {
                value: function (name) {
                  ;(name instanceof Array ? name : [name]).forEach(function (
                    name
                  ) {
                    return _templates.delete(name)
                  })
                }
              },
              get: {
                value: function (name) {
                  return _templates.has(name) ? _templates.get(name) : null
                }
              },
              has: {
                value: function (name) {
                  return _templates.has(name)
                }
              },
              size: {
                get: function () {
                  return _templates.size
                }
              }
            }
          )
        )),
      _templates,
      _validNameRe,
      _validType,
      Macro = (function () {
        var _macros = {},
          _tags = {},
          _validNameRe = new RegExp('^(?:'.concat(Patterns.macroName, ')$'))
        function macrosHas (name) {
          return _macros.hasOwnProperty(name)
        }
        function tagsRegister (parent, bodyTags) {
          if (!parent) throw new Error('no parent specified')
          for (
            var endTags = ['/'.concat(parent), 'end'.concat(parent)],
              allTags = [].concat(
                endTags,
                Array.isArray(bodyTags) ? bodyTags : []
              ),
              i = 0;
            i < allTags.length;
            ++i
          ) {
            var tag = allTags[i]
            if (macrosHas(tag))
              throw new Error('cannot register tag for an existing macro')
            tagsHas(tag)
              ? _tags[tag].includes(parent) ||
                (_tags[tag].push(parent), _tags[tag].sort())
              : (_tags[tag] = [parent])
          }
        }
        function tagsUnregister (parent) {
          if (!parent) throw new Error('no parent specified')
          Object.keys(_tags).forEach(function (tag) {
            var i = _tags[tag].indexOf(parent)
            ;-1 !== i &&
              (1 === _tags[tag].length
                ? delete _tags[tag]
                : _tags[tag].splice(i, 1))
          })
        }
        function tagsHas (name) {
          return _tags.hasOwnProperty(name)
        }
        return Object.freeze(
          Object.defineProperties(
            {},
            {
              add: {
                value: function macrosAdd (name, def) {
                  if (Array.isArray(name))
                    name.forEach(function (name) {
                      return macrosAdd(name, def)
                    })
                  else {
                    if (!_validNameRe.test(name))
                      throw new Error('invalid macro name "'.concat(name, '"'))
                    if (macrosHas(name))
                      throw new Error(
                        'cannot clobber existing macro <<'.concat(name, '>>')
                      )
                    if (tagsHas(name))
                      throw new Error(
                        'cannot clobber child tag <<'
                          .concat(name, '>> of parent macro')
                          .concat(1 === _tags[name].length ? '' : 's', ' <<')
                          .concat(_tags[name].join('>>, <<'), '>>')
                      )
                    try {
                      if ('object' === _typeof(def))
                        _macros[name] = Object.assign(
                          Object.create(null),
                          def,
                          { _MACRO_API: !0 }
                        )
                      else {
                        if (!macrosHas(def))
                          throw new Error(
                            'cannot create alias of nonexistent macro <<'.concat(
                              def,
                              '>>'
                            )
                          )
                        _macros[name] = Object.create(_macros[def], {
                          _ALIAS_OF: { enumerable: !0, value: def }
                        })
                      }
                      Object.defineProperty(_macros, name, { writable: !1 })
                    } catch (ex) {
                      throw 'TypeError' === ex.name
                        ? new Error(
                            'cannot clobber protected macro <<'.concat(
                              name,
                              '>>'
                            )
                          )
                        : new Error(
                            'unknown error when attempting to add macro <<'
                              .concat(name, '>>: [')
                              .concat(ex.name, '] ')
                              .concat(ex.message)
                          )
                    }
                    if (void 0 !== _macros[name].tags)
                      if (null == _macros[name].tags) tagsRegister(name)
                      else {
                        if (!Array.isArray(_macros[name].tags))
                          throw new Error(
                            'bad value for "tags" property of macro <<'.concat(
                              name,
                              '>>'
                            )
                          )
                        tagsRegister(name, _macros[name].tags)
                      }
                  }
                }
              },
              delete: {
                value: function macrosDelete (name) {
                  if (Array.isArray(name))
                    name.forEach(function (name) {
                      return macrosDelete(name)
                    })
                  else if (macrosHas(name)) {
                    void 0 !== _macros[name].tags && tagsUnregister(name)
                    try {
                      Object.defineProperty(_macros, name, { writable: !0 }),
                        delete _macros[name]
                    } catch (ex) {
                      throw new Error(
                        'unknown error removing macro <<'
                          .concat(name, '>>: ')
                          .concat(ex.message)
                      )
                    }
                  } else if (tagsHas(name))
                    throw new Error(
                      'cannot remove child tag <<'
                        .concat(name, '>> of parent macro <<')
                        .concat(_tags[name], '>>')
                    )
                }
              },
              isEmpty: {
                value: function () {
                  return 0 === Object.keys(_macros).length
                }
              },
              has: { value: macrosHas },
              get: {
                value: function (name) {
                  var macro = null
                  return (
                    macrosHas(name) &&
                    'function' == typeof _macros[name].handler
                      ? (macro = _macros[name])
                      : macros.hasOwnProperty(name) &&
                        'function' == typeof macros[name].handler &&
                        (macro = macros[name]),
                    macro
                  )
                }
              },
              init: {
                value: function () {
                  var handler =
                    arguments.length > 0 && arguments[0] !== undefined
                      ? arguments[0]
                      : 'init'
                  Object.keys(_macros).forEach(function (name) {
                    'function' == typeof _macros[name][handler] &&
                      _macros[name][handler](name)
                  }),
                    Object.keys(macros).forEach(function (name) {
                      'function' == typeof macros[name][handler] &&
                        macros[name][handler](name)
                    })
                }
              },
              tags: {
                value: Object.freeze(
                  Object.defineProperties(
                    {},
                    {
                      register: { value: tagsRegister },
                      unregister: { value: tagsUnregister },
                      has: { value: tagsHas },
                      get: {
                        value: function (name) {
                          return tagsHas(name) ? _tags[name] : null
                        }
                      }
                    }
                  )
                )
              },
              evalStatements: {
                value: function () {
                  return Scripting.evalJavaScript.apply(Scripting, arguments)
                }
              }
            }
          )
        )
      })(),
      MacroContext = (function () {
        var MacroContext = (function () {
          function MacroContext (contextData) {
            _classCallCheck(this, MacroContext)
            var context = Object.assign(
              {
                parent: null,
                macro: null,
                name: '',
                displayName: '',
                args: null,
                payload: null,
                parser: null,
                source: ''
              },
              contextData
            )
            if (
              null === context.macro ||
              '' === context.name ||
              null === context.parser
            )
              throw new TypeError('context object missing required properties')
            Object.defineProperties(this, {
              self: { value: context.macro },
              name: {
                value:
                  void 0 === context.macro._ALIAS_OF
                    ? context.name
                    : context.macro._ALIAS_OF
              },
              displayName: { value: context.name },
              args: { value: context.args },
              payload: { value: context.payload },
              source: { value: context.source },
              parent: { value: context.parent },
              parser: { value: context.parser },
              _output: { value: context.parser.output },
              _shadows: { writable: !0, value: null },
              _debugView: { writable: !0, value: null },
              _debugViewEnabled: { writable: !0, value: Config.debug }
            })
          }
          return (
            _createClass(MacroContext, [
              {
                key: 'output',
                get: function () {
                  return this._debugViewEnabled
                    ? this.debugView.output
                    : this._output
                }
              },
              {
                key: 'shadows',
                get: function () {
                  return _toConsumableArray(this._shadows)
                }
              },
              {
                key: 'shadowView',
                get: function () {
                  var view = new Set()
                  return (
                    this.contextSelectAll(function (ctx) {
                      return ctx._shadows
                    }).forEach(function (ctx) {
                      return ctx._shadows.forEach(function (name) {
                        return view.add(name)
                      })
                    }),
                    _toConsumableArray(view)
                  )
                }
              },
              {
                key: 'debugView',
                get: function () {
                  return this._debugViewEnabled
                    ? null !== this._debugView
                      ? this._debugView
                      : this.createDebugView()
                    : null
                }
              },
              {
                key: 'contextHas',
                value: function (filter) {
                  for (
                    var context = this;
                    null !== (context = context.parent);

                  )
                    if (filter(context)) return !0
                  return !1
                }
              },
              {
                key: 'contextSelect',
                value: function (filter) {
                  for (
                    var context = this;
                    null !== (context = context.parent);

                  )
                    if (filter(context)) return context
                  return null
                }
              },
              {
                key: 'contextSelectAll',
                value: function (filter) {
                  for (
                    var result = [], context = this;
                    null !== (context = context.parent);

                  )
                    filter(context) && result.push(context)
                  return result
                }
              },
              {
                key: 'addShadow',
                value: function () {
                  var _this14 = this
                  this._shadows || (this._shadows = new Set())
                  for (
                    var varRe = new RegExp('^'.concat(Patterns.variable, '$')),
                      _len14 = arguments.length,
                      names = new Array(_len14),
                      _key14 = 0;
                    _key14 < _len14;
                    _key14++
                  )
                    names[_key14] = arguments[_key14]
                  names.flat(1 / 0).forEach(function (name) {
                    if ('string' != typeof name)
                      throw new TypeError(
                        'variable name must be a string; type: '.concat(
                          _typeof(name)
                        )
                      )
                    if (!varRe.test(name))
                      throw new Error(
                        'invalid variable name "'.concat(name, '"')
                      )
                    _this14._shadows.add(name)
                  })
                }
              },
              {
                key: 'createShadowWrapper',
                value: function (callback, doneCallback, startCallback) {
                  var shadowStore,
                    shadowContext = this
                  return (
                    'function' == typeof callback &&
                      ((shadowStore = {}),
                      this.shadowView.forEach(function (varName) {
                        var varKey = varName.slice(1),
                          store =
                            '$' === varName[0]
                              ? State.variables
                              : State.temporary
                        shadowStore[varName] = store[varKey]
                      })),
                    function () {
                      for (
                        var _len15 = arguments.length,
                          args = new Array(_len15),
                          _key15 = 0;
                        _key15 < _len15;
                        _key15++
                      )
                        args[_key15] = arguments[_key15]
                      if (
                        ('function' == typeof startCallback &&
                          startCallback.apply(this, args),
                        'function' == typeof callback)
                      ) {
                        var contextCache,
                          shadowNames = Object.keys(shadowStore),
                          valueCache = shadowNames.length > 0 ? {} : null,
                          macroParser = Wikifier.Parser.get('macro')
                        try {
                          shadowNames.forEach(function (varName) {
                            var varKey = varName.slice(1),
                              store =
                                '$' === varName[0]
                                  ? State.variables
                                  : State.temporary
                            store.hasOwnProperty(varKey) &&
                              (valueCache[varKey] = store[varKey]),
                              (store[varKey] = shadowStore[varName])
                          }),
                            (contextCache = macroParser.context),
                            (macroParser.context = shadowContext),
                            callback.apply(this, args)
                        } finally {
                          contextCache !== undefined &&
                            (macroParser.context = contextCache),
                            shadowNames.forEach(function (varName) {
                              var varKey = varName.slice(1),
                                store =
                                  '$' === varName[0]
                                    ? State.variables
                                    : State.temporary
                              ;(shadowStore[varName] = store[varKey]),
                                valueCache.hasOwnProperty(varKey)
                                  ? (store[varKey] = valueCache[varKey])
                                  : delete store[varKey]
                            })
                        }
                      }
                      'function' == typeof doneCallback &&
                        doneCallback.apply(this, args)
                    }
                  )
                }
              },
              {
                key: 'createDebugView',
                value: function (name, title) {
                  return (
                    (this._debugView = new DebugView(
                      this._output,
                      'macro',
                      name || this.displayName,
                      title || this.source
                    )),
                    null !== this.payload &&
                      this.payload.length > 0 &&
                      this._debugView.modes({ nonvoid: !0 }),
                    (this._debugViewEnabled = !0),
                    this._debugView
                  )
                }
              },
              {
                key: 'removeDebugView',
                value: function () {
                  null !== this._debugView &&
                    (this._debugView.remove(), (this._debugView = null)),
                    (this._debugViewEnabled = !1)
                }
              },
              {
                key: 'error',
                value: function (message, source) {
                  return throwError(
                    this._output,
                    '<<'.concat(this.displayName, '>>: ').concat(message),
                    source || this.source
                  )
                }
              }
            ]),
            MacroContext
          )
        })()
        return MacroContext
      })()
    !(function () {
      if (
        (Macro.add('capture', {
          skipArgs: !0,
          tags: null,
          tsVarRe: new RegExp('('.concat(Patterns.variable, ')'), 'g'),
          handler: function () {
            if (0 === this.args.raw.length)
              return this.error('no story/temporary variable list specified')
            var valueCache = {}
            try {
              for (
                var match, tsVarRe = this.self.tsVarRe;
                null !== (match = tsVarRe.exec(this.args.raw));

              ) {
                var varName = match[1],
                  varKey = varName.slice(1),
                  store = '$' === varName[0] ? State.variables : State.temporary
                store.hasOwnProperty(varKey) &&
                  (valueCache[varKey] = store[varKey]),
                  this.addShadow(varName)
              }
              new Wikifier(this.output, this.payload[0].contents)
            } finally {
              this.shadows.forEach(function (varName) {
                var varKey = varName.slice(1),
                  store = '$' === varName[0] ? State.variables : State.temporary
                valueCache.hasOwnProperty(varKey)
                  ? (store[varKey] = valueCache[varKey])
                  : delete store[varKey]
              })
            }
          }
        }),
        Macro.add('set', {
          skipArgs: !0,
          handler: function () {
            if (0 === this.args.full.length)
              return this.error('no expression specified')
            try {
              Scripting.evalJavaScript(this.args.full)
            } catch (ex) {
              return this.error(
                'bad evaluation: '.concat(
                  'object' === _typeof(ex) ? ex.message : ex
                )
              )
            }
            Config.debug && this.debugView.modes({ hidden: !0 })
          }
        }),
        Macro.add('unset', {
          skipArgs: !0,
          jsVarRe: new RegExp(
            'State\\.(variables|temporary)\\.('.concat(
              Patterns.identifier,
              ')'
            ),
            'g'
          ),
          handler: function () {
            if (0 === this.args.full.length)
              return this.error('no story/temporary variable list specified')
            for (
              var match, jsVarRe = this.self.jsVarRe;
              null !== (match = jsVarRe.exec(this.args.full));

            ) {
              var store = State[match[1]],
                name = match[2]
              store.hasOwnProperty(name) && delete store[name]
            }
            Config.debug && this.debugView.modes({ hidden: !0 })
          }
        }),
        Macro.add('remember', {
          skipArgs: !0,
          jsVarRe: new RegExp(
            'State\\.variables\\.('.concat(Patterns.identifier, ')'),
            'g'
          ),
          handler: function () {
            if (0 === this.args.full.length)
              return this.error('no expression specified')
            try {
              Scripting.evalJavaScript(this.args.full)
            } catch (ex) {
              return this.error(
                'bad evaluation: '.concat(
                  'object' === _typeof(ex) ? ex.message : ex
                )
              )
            }
            for (
              var match,
                remember = storage.get('remember') || {},
                jsVarRe = this.self.jsVarRe;
              null !== (match = jsVarRe.exec(this.args.full));

            ) {
              var name = match[1]
              remember[name] = State.variables[name]
            }
            if (!storage.set('remember', remember))
              return this.error(
                'unknown error, cannot remember: '.concat(this.args.raw)
              )
            Config.debug && this.debugView.modes({ hidden: !0 })
          },
          init: function () {
            var remember = storage.get('remember')
            remember &&
              Object.keys(remember).forEach(function (name) {
                return (State.variables[name] = remember[name])
              })
          }
        }),
        Macro.add('forget', {
          skipArgs: !0,
          jsVarRe: new RegExp(
            'State\\.variables\\.('.concat(Patterns.identifier, ')'),
            'g'
          ),
          handler: function () {
            if (0 === this.args.full.length)
              return this.error('no story variable list specified')
            for (
              var match,
                remember = storage.get('remember'),
                jsVarRe = this.self.jsVarRe,
                needStore = !1;
              null !== (match = jsVarRe.exec(this.args.full));

            ) {
              var name = match[1]
              State.variables.hasOwnProperty(name) &&
                delete State.variables[name],
                remember &&
                  remember.hasOwnProperty(name) &&
                  ((needStore = !0), delete remember[name])
            }
            if (needStore)
              if (0 === Object.keys(remember).length) {
                if (!storage.delete('remember'))
                  return this.error(
                    'unknown error, cannot update remember store'
                  )
              } else if (!storage.set('remember', remember))
                return this.error('unknown error, cannot update remember store')
            Config.debug && this.debugView.modes({ hidden: !0 })
          }
        }),
        Macro.add('run', 'set'),
        Macro.add('script', {
          skipArgs: !0,
          tags: null,
          handler: function () {
            var output = document.createDocumentFragment()
            try {
              Scripting.evalJavaScript(this.payload[0].contents, output)
            } catch (ex) {
              return this.error(
                'bad evaluation: '.concat(
                  'object' === _typeof(ex) ? ex.message : ex
                )
              )
            }
            Config.debug && this.createDebugView(),
              output.hasChildNodes() && this.output.appendChild(output)
          }
        }),
        Macro.add('include', {
          handler: function () {
            return 0 === this.args.length
              ? this.error('no passage specified')
              : ((passage =
                  'object' === _typeof(this.args[0])
                    ? this.args[0].link
                    : this.args[0]),
                Story.has(passage)
                  ? (Config.debug && this.debugView.modes({ block: !0 }),
                    (passage = Story.get(passage)),
                    void (
                      this.args[1]
                        ? jQuery(document.createElement(this.args[1]))
                            .addClass(
                              ''
                                .concat(passage.domId, ' macro-')
                                .concat(this.name)
                            )
                            .attr('data-passage', passage.title)
                            .appendTo(this.output)
                        : jQuery(this.output)
                    ).wiki(passage.processText()))
                  : this.error('passage "'.concat(passage, '" does not exist')))
            var passage
          }
        }),
        Macro.add('nobr', {
          skipArgs: !0,
          tags: null,
          handler: function () {
            new Wikifier(
              this.output,
              this.payload[0].contents
                .replace(/^\n+|\n+$/g, '')
                .replace(/\n+/g, ' ')
            )
          }
        }),
        Macro.add(['print', '=', '-'], {
          skipArgs: !0,
          handler: function () {
            if (0 === this.args.full.length)
              return this.error('no expression specified')
            try {
              var result = stringFrom(Scripting.evalJavaScript(this.args.full))
              null !== result &&
                new Wikifier(
                  this.output,
                  '-' === this.name ? Util.escape(result) : result
                )
            } catch (ex) {
              return this.error(
                'bad evaluation: '.concat(
                  'object' === _typeof(ex) ? ex.message : ex
                )
              )
            }
          }
        }),
        Macro.add('silently', {
          skipArgs: !0,
          tags: null,
          handler: function () {
            var frag = document.createDocumentFragment()
            if (
              (new Wikifier(frag, this.payload[0].contents.trim()),
              Config.debug)
            )
              this.debugView.modes({ block: !0, hidden: !0 }),
                this.output.appendChild(frag)
            else {
              var errList = _toConsumableArray(
                frag.querySelectorAll('.error')
              ).map(function (errEl) {
                return errEl.textContent
              })
              if (errList.length > 0)
                return this.error(
                  'error'
                    .concat(
                      1 === errList.length ? '' : 's',
                      ' within contents ('
                    )
                    .concat(errList.join('; '), ')')
                )
            }
          }
        }),
        Macro.add('type', {
          isAsync: !0,
          tags: null,
          typeId: 0,
          handler: function () {
            if (0 === this.args.length) return this.error('no speed specified')
            var cursor,
              speed = Util.fromCssTime(this.args[0])
            if (speed < 0)
              return this.error(
                'speed time value must be non-negative (received: '.concat(
                  this.args[0],
                  ')'
                )
              )
            for (
              var elClass = '',
                elId = '',
                elTag = 'div',
                skipKey = Config.macros.typeSkipKey,
                start = 400,
                options = this.args.slice(1);
              options.length > 0;

            ) {
              var option = options.shift()
              switch (option) {
                case 'class':
                  if (0 === options.length)
                    return this.error(
                      'class option missing required class name(s)'
                    )
                  if ('' === (elClass = options.shift()))
                    throw new Error(
                      'class option class name(s) must be non-empty (received: "")'
                    )
                  break
                case 'element':
                  if (0 === options.length)
                    return this.error(
                      'element option missing required element tag name'
                    )
                  if ('' === (elTag = options.shift()))
                    throw new Error(
                      'element option tag name must be non-empty (received: "")'
                    )
                  break
                case 'id':
                  if (0 === options.length)
                    return this.error('id option missing required ID')
                  if ('' === (elId = options.shift()))
                    throw new Error(
                      'id option ID must be non-empty (received: "")'
                    )
                  break
                case 'keep':
                  cursor = 'keep'
                  break
                case 'none':
                  cursor = 'none'
                  break
                case 'skipkey':
                  if (0 === options.length)
                    return this.error(
                      'skipkey option missing required key value'
                    )
                  if ('' === (skipKey = options.shift()))
                    throw new Error(
                      'skipkey option key value must be non-empty (received: "")'
                    )
                  break
                case 'start':
                  if (0 === options.length)
                    return this.error(
                      'start option missing required time value'
                    )
                  var value = options.shift()
                  if ((start = Util.fromCssTime(value)) < 0)
                    throw new Error(
                      'start option time value must be non-negative (received: '.concat(
                        value,
                        ')'
                      )
                    )
                  break
                default:
                  return this.error('unknown option: '.concat(option))
              }
            }
            var contents = this.payload[0].contents
            if ('' !== contents.trim()) {
              Config.debug && this.debugView.modes({ block: !0 })
              var className = 'macro-'.concat(this.name),
                namespace = '.'.concat(className),
                $target = jQuery(document.createElement(elTag))
                  .addClass(
                    ''.concat(className, ' ').concat(className, '-target')
                  )
                  .appendTo(this.output)
              TempState.macroTypeQueue ||
                ((TempState.macroTypeQueue = []),
                $(document)
                  .off(namespace)
                  .one(':passageinit'.concat(namespace), function () {
                    return $(document).off(namespace)
                  }))
              var startTyping = 0 === TempState.macroTypeQueue.length,
                selfId = ++this.self.typeId
              TempState.macroTypeQueue.push({
                id: selfId,
                handler: function () {
                  var $wrapper = jQuery(document.createElement(elTag)).addClass(
                    className
                  )
                  elId && $wrapper.attr('id', elId),
                    elClass && $wrapper.addClass(elClass),
                    new Wikifier($wrapper, contents)
                  var passage = State.passage,
                    turn = State.turns
                  if (
                    (!Config.macros.typeVisitedPassages &&
                      State.passages.slice(0, -1).some(function (title) {
                        return title === passage
                      })) ||
                    $wrapper.find('.error').length > 0
                  )
                    return (
                      $target.replaceWith($wrapper),
                      TempState.macroTypeQueue.shift(),
                      void (
                        TempState.macroTypeQueue.length > 0 &&
                        TempState.macroTypeQueue.first().handler()
                      )
                    )
                  var typer = new NodeTyper({
                    targetNode: $wrapper.get(0),
                    classNames:
                      'none' === cursor ? null : ''.concat(className, '-cursor')
                  })
                  $target.replaceWith($wrapper)
                  var keydownAndNS = 'keydown'.concat(namespace),
                    typingStopAndNS = ''.concat(':typingstop').concat(namespace)
                  $(document)
                    .off(keydownAndNS)
                    .on(keydownAndNS, function (ev) {
                      Util.scrubEventKey(ev.key) !== skipKey ||
                        (ev.target !== document.body &&
                          ev.target !== document.documentElement) ||
                        (ev.preventDefault(),
                        $(document).off(keydownAndNS),
                        typer.finish())
                    })
                    .one(typingStopAndNS, function () {
                      TempState.macroTypeQueue &&
                        (0 === TempState.macroTypeQueue.length
                          ? jQuery.event.trigger(':typingcomplete')
                          : TempState.macroTypeQueue.first().handler())
                    })
                  var typeNode = function () {
                    var typeNodeMember = function (typeIntervalId) {
                      ;(State.passage === passage &&
                        State.turns === turn &&
                        typer.type()) ||
                        (typeIntervalId && clearInterval(typeIntervalId),
                        TempState.macroTypeQueue &&
                          TempState.macroTypeQueue.length > 0 &&
                          TempState.macroTypeQueue.first().id === selfId &&
                          TempState.macroTypeQueue.shift(),
                        $wrapper.trigger(':typingstop'),
                        $wrapper.addClass(''.concat(className, '-done')),
                        'keep' === cursor &&
                          $wrapper.addClass(''.concat(className, '-cursor')))
                    }
                    $wrapper.trigger(':typingstart'), typeNodeMember()
                    var typeNodeMemberId = setInterval(function () {
                      return typeNodeMember(typeNodeMemberId)
                    }, speed)
                  }
                  start ? setTimeout(typeNode, start) : typeNode()
                }
              }),
                startTyping &&
                  (Engine.isPlaying()
                    ? $(document).one(
                        ':passageend'.concat(namespace),
                        function () {
                          return TempState.macroTypeQueue.first().handler()
                        }
                      )
                    : TempState.macroTypeQueue.first().handler())
            }
          }
        }),
        Macro.add('display', 'include'),
        Macro.add('if', {
          skipArgs: !0,
          tags: ['elseif', 'else'],
          elseifWsRe: /^\s*if\b/i,
          ifAssignRe: /[^!=&^|<>*/%+-]=[^=>]/,
          handler: function () {
            var i
            try {
              var len = this.payload.length,
                elseifWsRe = this.self.elseifWsRe,
                ifAssignRe = this.self.ifAssignRe
              for (i = 0; i < len; ++i)
                if ('else' === this.payload[i].name) {
                  if (this.payload[i].args.raw.length > 0)
                    return elseifWsRe.test(this.payload[i].args.raw)
                      ? this.error(
                          'whitespace is not allowed between the "else" and "if" in <<elseif>> clause'.concat(
                            i > 0 ? ' (#' + i + ')' : ''
                          )
                        )
                      : this.error(
                          '<<else>> does not accept a conditional expression (perhaps you meant to use <<elseif>>), invalid: '.concat(
                            this.payload[i].args.raw
                          )
                        )
                  if (i + 1 !== len)
                    return this.error('<<else>> must be the final clause')
                } else {
                  if (0 === this.payload[i].args.full.length)
                    return this.error(
                      'no conditional expression specified for <<'
                        .concat(this.payload[i].name, '>> clause')
                        .concat(i > 0 ? ' (#' + i + ')' : '')
                    )
                  if (
                    Config.macros.ifAssignmentError &&
                    ifAssignRe.test(this.payload[i].args.full)
                  )
                    return this.error(
                      'assignment operator found within <<'
                        .concat(this.payload[i].name, '>> clause')
                        .concat(
                          i > 0 ? ' (#' + i + ')' : '',
                          ' (perhaps you meant to use an equality operator: ==, ===, eq, is), invalid: '
                        )
                        .concat(this.payload[i].args.raw)
                    )
                }
              var evalJavaScript = Scripting.evalJavaScript,
                success = !1
              for (i = 0; i < len; ++i) {
                if (
                  (Config.debug &&
                    this.createDebugView(
                      this.payload[i].name,
                      this.payload[i].source
                    ).modes({ nonvoid: !1 }),
                  'else' === this.payload[i].name ||
                    evalJavaScript(this.payload[i].args.full))
                ) {
                  ;(success = !0),
                    new Wikifier(this.output, this.payload[i].contents)
                  break
                }
                Config.debug &&
                  this.debugView.modes({ hidden: !0, invalid: !0 })
              }
              if (Config.debug) {
                for (++i; i < len; ++i)
                  this.createDebugView(
                    this.payload[i].name,
                    this.payload[i].source
                  ).modes({ nonvoid: !1, hidden: !0, invalid: !0 })
                this.createDebugView(
                  '/'.concat(this.name),
                  '<</'.concat(this.name, '>>')
                ).modes({ nonvoid: !1, hidden: !success, invalid: !success })
              }
            } catch (ex) {
              return this.error(
                'bad conditional expression in <<'
                  .concat(0 === i ? 'if' : 'elseif', '>> clause')
                  .concat(i > 0 ? ' (#' + i + ')' : '', ': ')
                  .concat('object' === _typeof(ex) ? ex.message : ex)
              )
            }
          }
        }),
        Macro.add('switch', {
          skipArgs: ['switch'],
          tags: ['case', 'default'],
          handler: function () {
            if (0 === this.args.full.length)
              return this.error('no expression specified')
            var i,
              result,
              len = this.payload.length
            if (1 === len) return this.error('no cases specified')
            for (i = 1; i < len; ++i)
              if ('default' === this.payload[i].name) {
                if (this.payload[i].args.length > 0)
                  return this.error(
                    '<<default>> does not accept values, invalid: '.concat(
                      this.payload[i].args.raw
                    )
                  )
                if (i + 1 !== len)
                  return this.error('<<default>> must be the final case')
              } else if (0 === this.payload[i].args.length)
                return this.error(
                  'no value(s) specified for <<'
                    .concat(this.payload[i].name, '>> (#')
                    .concat(i, ')')
                )
            try {
              result = Scripting.evalJavaScript(this.args.full)
            } catch (ex) {
              return this.error(
                'bad evaluation: '.concat(
                  'object' === _typeof(ex) ? ex.message : ex
                )
              )
            }
            var debugView = this.debugView,
              success = !1
            for (
              Config.debug && debugView.modes({ nonvoid: !1, hidden: !0 }),
                i = 1;
              i < len;
              ++i
            ) {
              if (
                (Config.debug &&
                  this.createDebugView(
                    this.payload[i].name,
                    this.payload[i].source
                  ).modes({ nonvoid: !1 }),
                'default' === this.payload[i].name ||
                  this.payload[i].args.some(function (val) {
                    return val === result
                  }))
              ) {
                ;(success = !0),
                  new Wikifier(this.output, this.payload[i].contents)
                break
              }
              Config.debug && this.debugView.modes({ hidden: !0, invalid: !0 })
            }
            if (Config.debug) {
              for (++i; i < len; ++i)
                this.createDebugView(
                  this.payload[i].name,
                  this.payload[i].source
                ).modes({ nonvoid: !1, hidden: !0, invalid: !0 })
              debugView.modes({ nonvoid: !1, hidden: !0, invalid: !success }),
                this.createDebugView(
                  '/'.concat(this.name),
                  '<</'.concat(this.name, '>>')
                ).modes({ nonvoid: !1, hidden: !0, invalid: !success })
            }
          }
        }),
        Macro.add('for', {
          skipArgs: !0,
          tags: null,
          hasRangeRe: new RegExp(
            '^\\S'
              .concat(Patterns.anyChar, '*?\\s+range\\s+\\S')
              .concat(Patterns.anyChar, '*?$')
          ),
          rangeRe: new RegExp(
            '^(?:State\\.(variables|temporary)\\.('
              .concat(
                Patterns.identifier,
                ')\\s*,\\s*)?State\\.(variables|temporary)\\.('
              )
              .concat(Patterns.identifier, ')\\s+range\\s+(\\S')
              .concat(Patterns.anyChar, '*?)$')
          ),
          threePartRe: /^([^;]*?)\s*;\s*([^;]*?)\s*;\s*([^;]*?)$/,
          forInRe: /^\S+\s+in\s+\S+/i,
          forOfRe: /^\S+\s+of\s+\S+/i,
          handler: function () {
            var argsStr = this.args.full.trim(),
              payload = this.payload[0].contents.replace(/\n$/, '')
            if (0 === argsStr.length)
              this.self.handleFor.call(this, payload, null, !0, null)
            else if (this.self.hasRangeRe.test(argsStr)) {
              var parts = argsStr.match(this.self.rangeRe)
              if (null === parts)
                return this.error(
                  'invalid range form syntax, format: [index ,] value range collection'
                )
              this.self.handleForRange.call(
                this,
                payload,
                { type: parts[1], name: parts[2] },
                { type: parts[3], name: parts[4] },
                parts[5]
              )
            } else {
              var init, condition, post
              if (-1 === argsStr.indexOf(';')) {
                if (this.self.forInRe.test(argsStr))
                  return this.error(
                    'invalid syntax, for…in is not supported; see: for…range'
                  )
                if (this.self.forOfRe.test(argsStr))
                  return this.error(
                    'invalid syntax, for…of is not supported; see: for…range'
                  )
                condition = argsStr
              } else {
                var _parts = argsStr.match(this.self.threePartRe)
                if (null === _parts)
                  return this.error(
                    'invalid 3-part conditional form syntax, format: [init] ; [condition] ; [post]'
                  )
                ;(init = _parts[1]),
                  (condition = _parts[2].trim()),
                  (post = _parts[3]),
                  0 === condition.length && (condition = !0)
              }
              this.self.handleFor.call(this, payload, init, condition, post)
            }
          },
          handleFor: function (payload, init, condition, post) {
            var evalJavaScript = Scripting.evalJavaScript,
              first = !0,
              safety = Config.macros.maxLoopIterations
            Config.debug && this.debugView.modes({ block: !0 })
            try {
              if (((TempState.break = null), init))
                try {
                  evalJavaScript(init)
                } catch (ex) {
                  return this.error(
                    'bad init expression: '.concat(
                      'object' === _typeof(ex) ? ex.message : ex
                    )
                  )
                }
              for (; evalJavaScript(condition); ) {
                if (--safety < 0)
                  return this.error(
                    'exceeded configured maximum loop iterations ('.concat(
                      Config.macros.maxLoopIterations,
                      ')'
                    )
                  )
                if (
                  (new Wikifier(
                    this.output,
                    first ? payload.replace(/^\n/, '') : payload
                  ),
                  first && (first = !1),
                  null != TempState.break)
                )
                  if (1 === TempState.break) TempState.break = null
                  else if (2 === TempState.break) {
                    TempState.break = null
                    break
                  }
                if (post)
                  try {
                    evalJavaScript(post)
                  } catch (ex) {
                    return this.error(
                      'bad post expression: '.concat(
                        'object' === _typeof(ex) ? ex.message : ex
                      )
                    )
                  }
              }
            } catch (ex) {
              return this.error(
                'bad conditional expression: '.concat(
                  'object' === _typeof(ex) ? ex.message : ex
                )
              )
            } finally {
              TempState.break = null
            }
          },
          handleForRange: function (payload, indexVar, valueVar, rangeExp) {
            var rangeList,
              first = !0
            try {
              rangeList = this.self.toRangeList(rangeExp)
            } catch (ex) {
              return this.error(ex.message)
            }
            Config.debug && this.debugView.modes({ block: !0 })
            try {
              TempState.break = null
              for (var i = 0; i < rangeList.length; ++i)
                if (
                  (indexVar.name &&
                    (State[indexVar.type][indexVar.name] = rangeList[i][0]),
                  (State[valueVar.type][valueVar.name] = rangeList[i][1]),
                  new Wikifier(
                    this.output,
                    first ? payload.replace(/^\n/, '') : payload
                  ),
                  first && (first = !1),
                  null != TempState.break)
                )
                  if (1 === TempState.break) TempState.break = null
                  else if (2 === TempState.break) {
                    TempState.break = null
                    break
                  }
            } catch (ex) {
              return this.error('object' === _typeof(ex) ? ex.message : ex)
            } finally {
              TempState.break = null
            }
          },
          toRangeList: function (rangeExp) {
            var value,
              list,
              evalJavaScript = Scripting.evalJavaScript
            try {
              value = evalJavaScript(
                '{' === rangeExp[0] ? '('.concat(rangeExp, ')') : rangeExp
              )
            } catch (ex) {
              if ('object' !== _typeof(ex))
                throw new Error('bad range expression: '.concat(ex))
              throw (
                ((ex.message = 'bad range expression: '.concat(ex.message)), ex)
              )
            }
            switch (_typeof(value)) {
              case 'string':
                list = []
                for (var i = 0; i < value.length; ) {
                  var obj = Util.charAndPosAt(value, i)
                  list.push([i, obj.char]), (i = 1 + obj.end)
                }
                break
              case 'object':
                if (Array.isArray(value))
                  list = value.map(function (val, i) {
                    return [i, val]
                  })
                else if (value instanceof Set)
                  list = _toConsumableArray(value).map(function (val, i) {
                    return [i, val]
                  })
                else if (value instanceof Map)
                  list = _toConsumableArray(value.entries())
                else {
                  if ('Object' !== Util.toStringTag(value))
                    throw new Error(
                      'unsupported range expression type: '.concat(
                        Util.toStringTag(value)
                      )
                    )
                  list = Object.keys(value).map(function (key) {
                    return [key, value[key]]
                  })
                }
                break
              default:
                throw new Error(
                  'unsupported range expression type: '.concat(_typeof(value))
                )
            }
            return list
          }
        }),
        Macro.add(['break', 'continue'], {
          skipArgs: !0,
          handler: function () {
            if (
              !this.contextHas(function (ctx) {
                return 'for' === ctx.name
              })
            )
              return this.error(
                'must only be used in conjunction with its parent macro <<for>>'
              )
            ;(TempState.break = 'continue' === this.name ? 1 : 2),
              Config.debug && this.debugView.modes({ hidden: !0 })
          }
        }),
        Macro.add(['button', 'link'], {
          isAsync: !0,
          tags: null,
          handler: function () {
            var _this15 = this
            if (0 === this.args.length)
              return this.error(
                'no '.concat(
                  'button' === this.name ? 'button' : 'link',
                  ' text specified'
                )
              )
            var passage,
              $link = jQuery(
                document.createElement('button' === this.name ? 'button' : 'a')
              )
            if ('object' === _typeof(this.args[0]))
              if (this.args[0].isImage) {
                var $image = jQuery(document.createElement('img'))
                  .attr('src', this.args[0].source)
                  .appendTo($link)
                $link.addClass('link-image'),
                  this.args[0].hasOwnProperty('passage') &&
                    $image.attr('data-passage', this.args[0].passage),
                  this.args[0].hasOwnProperty('title') &&
                    $image.attr('title', this.args[0].title),
                  this.args[0].hasOwnProperty('align') &&
                    $image.attr('align', this.args[0].align),
                  (passage = this.args[0].link)
              } else
                $link.append(document.createTextNode(this.args[0].text)),
                  (passage = this.args[0].link)
            else
              $link.wikiWithOptions({ profile: 'core' }, this.args[0]),
                (passage = this.args.length > 1 ? this.args[1] : undefined)
            null != passage
              ? ($link.attr('data-passage', passage),
                Story.has(passage)
                  ? ($link.addClass('link-internal'),
                    Config.addVisitedLinkClass &&
                      State.hasPlayed(passage) &&
                      $link.addClass('link-visited'))
                  : $link.addClass('link-broken'))
              : $link.addClass('link-internal'),
              $link
                .addClass('macro-'.concat(this.name))
                .ariaClick(
                  {
                    namespace: '.macros',
                    role: null != passage ? 'link' : 'button',
                    one: null != passage
                  },
                  this.createShadowWrapper(
                    '' !== this.payload[0].contents
                      ? function () {
                          return Wikifier.wikifyEval(
                            _this15.payload[0].contents.trim()
                          )
                        }
                      : null,
                    null != passage
                      ? function () {
                          return Engine.play(passage)
                        }
                      : null
                  )
                )
                .appendTo(this.output)
          }
        }),
        Macro.add('checkbox', {
          isAsync: !0,
          handler: function () {
            if (this.args.length < 3) {
              var errors = []
              return (
                this.args.length < 1 && errors.push('variable name'),
                this.args.length < 2 && errors.push('unchecked value'),
                this.args.length < 3 && errors.push('checked value'),
                this.error('no '.concat(errors.join(' or '), ' specified'))
              )
            }
            if ('string' != typeof this.args[0])
              return this.error('variable name argument is not a string')
            var varName = this.args[0].trim()
            if ('$' !== varName[0] && '_' !== varName[0])
              return this.error(
                'variable name "'.concat(
                  this.args[0],
                  '" is missing its sigil ($ or _)'
                )
              )
            var varId = Util.slugify(varName),
              uncheckValue = this.args[1],
              checkValue = this.args[2],
              el = document.createElement('input')
            switch (
              (jQuery(el)
                .attr({
                  id: ''.concat(this.name, '-').concat(varId),
                  name: ''.concat(this.name, '-').concat(varId),
                  type: 'checkbox',
                  tabindex: 0
                })
                .addClass('macro-'.concat(this.name))
                .on(
                  'change.macros',
                  this.createShadowWrapper(function () {
                    State.setVar(
                      varName,
                      this.checked ? checkValue : uncheckValue
                    )
                  })
                )
                .appendTo(this.output),
              this.args[3])
            ) {
              case 'autocheck':
                State.getVar(varName) === checkValue
                  ? (el.checked = !0)
                  : State.setVar(varName, uncheckValue)
                break
              case 'checked':
                ;(el.checked = !0), State.setVar(varName, checkValue)
                break
              default:
                State.setVar(varName, uncheckValue)
            }
          }
        }),
        Macro.add(['cycle', 'listbox'], {
          isAsync: !0,
          skipArgs: ['optionsfrom'],
          tags: ['option', 'optionsfrom'],
          handler: function () {
            var _this16 = this
            if (0 === this.args.length)
              return this.error('no variable name specified')
            if ('string' != typeof this.args[0])
              return this.error('variable name argument is not a string')
            var varName = this.args[0].trim()
            if ('$' !== varName[0] && '_' !== varName[0])
              return this.error(
                'variable name "'.concat(
                  this.args[0],
                  '" is missing its sigil ($ or _)'
                )
              )
            var varId = Util.slugify(varName),
              len = this.payload.length
            if (1 === len) return this.error('no options specified')
            for (
              var config = { autoselect: !1, once: !1 }, i = 1;
              i < this.args.length;
              ++i
            ) {
              var arg = this.args[i]
              switch (arg) {
                case 'once':
                  config.once = !0
                  break
                case 'autoselect':
                  config.autoselect = !0
                  break
                default:
                  return this.error('unknown argument: '.concat(arg))
              }
            }
            for (
              var options = [],
                tagCount = { option: 0, optionsfrom: 0 },
                selectedIdx = -1,
                _i5 = 1;
              _i5 < len;
              ++_i5
            ) {
              var payload = this.payload[_i5]
              if ('option' === payload.name) {
                if ((++tagCount.option, 0 === payload.args.length))
                  return this.error(
                    'no arguments specified for <<'
                      .concat(payload.name, '>> (#')
                      .concat(tagCount.option, ')')
                  )
                var option = { label: String(payload.args[0]) },
                  isSelected = !1
                switch (payload.args.length) {
                  case 1:
                    option.value = payload.args[0]
                    break
                  case 2:
                    'selected' === payload.args[1]
                      ? ((option.value = payload.args[0]), (isSelected = !0))
                      : (option.value = payload.args[1])
                    break
                  default:
                    ;(option.value = payload.args[1]),
                      'selected' === payload.args[2] && (isSelected = !0)
                }
                if ((options.push(option), isSelected)) {
                  if (config.autoselect)
                    return this.error(
                      'cannot specify both the autoselect and selected keywords'
                    )
                  if (-1 !== selectedIdx)
                    return this.error(
                      'multiple selected keywords specified for <<'
                        .concat(payload.name, '>> (#')
                        .concat(selectedIdx + 1, ' & #')
                        .concat(tagCount.option, ')')
                    )
                  selectedIdx = options.length - 1
                }
              } else {
                var _ret = (function () {
                  if ((++tagCount.optionsfrom, 0 === payload.args.full.length))
                    return {
                      v: _this16.error(
                        'no expression specified for <<'
                          .concat(payload.name, '>> (#')
                          .concat(tagCount.optionsfrom, ')')
                      )
                    }
                  var result = void 0
                  try {
                    var exp = payload.args.full
                    result = Scripting.evalJavaScript(
                      '{' === exp[0] ? '('.concat(exp, ')') : exp
                    )
                  } catch (ex) {
                    return {
                      v: _this16.error(
                        'bad evaluation: '.concat(
                          'object' === _typeof(ex) ? ex.message : ex
                        )
                      )
                    }
                  }
                  if ('object' !== _typeof(result) || null === result)
                    return {
                      v: _this16.error(
                        'expression must yield a supported collection or generic object (type: '.concat(
                          null === result ? 'null' : _typeof(result),
                          ')'
                        )
                      )
                    }
                  if (result instanceof Array || result instanceof Set)
                    result.forEach(function (val) {
                      return options.push({ label: String(val), value: val })
                    })
                  else if (result instanceof Map)
                    result.forEach(function (val, key) {
                      return options.push({ label: String(key), value: val })
                    })
                  else {
                    var oType = Util.toStringTag(result)
                    if ('Object' !== oType)
                      return {
                        v: _this16.error(
                          'expression must yield a supported collection or generic object (object type: '.concat(
                            oType,
                            ')'
                          )
                        )
                      }
                    Object.keys(result).forEach(function (key) {
                      return options.push({ label: key, value: result[key] })
                    })
                  }
                })()
                if ('object' === _typeof(_ret)) return _ret.v
              }
            }
            if (-1 === selectedIdx)
              if (config.autoselect) {
                var sameValueZero = Util.sameValueZero,
                  curValue = State.getVar(varName),
                  curValueIdx = options.findIndex(function (opt) {
                    return sameValueZero(opt.value, curValue)
                  })
                selectedIdx = -1 === curValueIdx ? 0 : curValueIdx
              } else selectedIdx = 0
            if ('cycle' === this.name) {
              var lastIdx = options.length - 1
              if (config.once && selectedIdx === lastIdx)
                jQuery(this.output).wikiWithOptions(
                  { profile: 'core' },
                  options[selectedIdx].label
                )
              else {
                var cycleIdx = selectedIdx
                jQuery(document.createElement('a'))
                  .wikiWithOptions(
                    { profile: 'core' },
                    options[selectedIdx].label
                  )
                  .attr('id', ''.concat(this.name, '-').concat(varId))
                  .addClass('macro-'.concat(this.name))
                  .ariaClick(
                    { namespace: '.macros', role: 'button' },
                    this.createShadowWrapper(function () {
                      var $this = $(this)
                      ;(cycleIdx = (cycleIdx + 1) % options.length),
                        State.setVar(varName, options[cycleIdx].value),
                        $this
                          .empty()
                          .wikiWithOptions(
                            { profile: 'core' },
                            options[cycleIdx].label
                          ),
                        config.once &&
                          cycleIdx === lastIdx &&
                          $this.off().contents().unwrap()
                    })
                  )
                  .appendTo(this.output)
              }
            } else {
              var $select = jQuery(document.createElement('select'))
              options.forEach(function (opt, i) {
                jQuery(document.createElement('option'))
                  .val(i)
                  .text(opt.label)
                  .appendTo($select)
              }),
                $select
                  .attr({
                    id: ''.concat(this.name, '-').concat(varId),
                    name: ''.concat(this.name, '-').concat(varId),
                    tabindex: 0
                  })
                  .addClass('macro-'.concat(this.name))
                  .val(selectedIdx)
                  .on(
                    'change.macros',
                    this.createShadowWrapper(function () {
                      State.setVar(varName, options[Number(this.value)].value)
                    })
                  )
                  .appendTo(this.output)
            }
            State.setVar(varName, options[selectedIdx].value)
          }
        }),
        Macro.add(['linkappend', 'linkprepend', 'linkreplace'], {
          isAsync: !0,
          tags: null,
          t8nRe: /^(?:transition|t8n)$/,
          handler: function () {
            var _this17 = this
            if (0 === this.args.length)
              return this.error('no link text specified')
            var $link = jQuery(document.createElement('a')),
              $insert = jQuery(document.createElement('span')),
              transition =
                this.args.length > 1 && this.self.t8nRe.test(this.args[1])
            $link
              .wikiWithOptions({ profile: 'core' }, this.args[0])
              .addClass('link-internal macro-'.concat(this.name))
              .ariaClick(
                { namespace: '.macros', one: !0 },
                this.createShadowWrapper(function () {
                  if (
                    ('linkreplace' === _this17.name
                      ? $link.remove()
                      : $link
                          .wrap(
                            '<span class="macro-'.concat(
                              _this17.name,
                              '"></span>'
                            )
                          )
                          .replaceWith(function () {
                            return $link.html()
                          }),
                    '' !== _this17.payload[0].contents)
                  ) {
                    var frag = document.createDocumentFragment()
                    new Wikifier(frag, _this17.payload[0].contents),
                      $insert.append(frag)
                  }
                  transition &&
                    setTimeout(function () {
                      return $insert.removeClass(
                        'macro-'.concat(_this17.name, '-in')
                      )
                    }, Engine.minDomActionDelay)
                })
              )
              .appendTo(this.output),
              $insert.addClass('macro-'.concat(this.name, '-insert')),
              transition && $insert.addClass('macro-'.concat(this.name, '-in')),
              'linkprepend' === this.name
                ? $insert.insertBefore($link)
                : $insert.insertAfter($link)
          }
        }),
        Macro.add(['numberbox', 'textbox'], {
          isAsync: !0,
          handler: function () {
            if (this.args.length < 2) {
              var errors = []
              return (
                this.args.length < 1 && errors.push('variable name'),
                this.args.length < 2 && errors.push('default value'),
                this.error('no '.concat(errors.join(' or '), ' specified'))
              )
            }
            if ('string' != typeof this.args[0])
              return this.error('variable name argument is not a string')
            var varName = this.args[0].trim()
            if ('$' !== varName[0] && '_' !== varName[0])
              return this.error(
                'variable name "'.concat(
                  this.args[0],
                  '" is missing its sigil ($ or _)'
                )
              )
            Config.debug && this.debugView.modes({ block: !0 })
            var asNumber = 'numberbox' === this.name,
              defaultValue = asNumber ? Number(this.args[1]) : this.args[1]
            if (asNumber && Number.isNaN(defaultValue))
              return this.error(
                'default value "'.concat(
                  this.args[1],
                  '" is neither a number nor can it be parsed into a number'
                )
              )
            var passage,
              varId = Util.slugify(varName),
              el = document.createElement('input'),
              autofocus = !1
            this.args.length > 3
              ? ((passage = this.args[2]),
                (autofocus = 'autofocus' === this.args[3]))
              : this.args.length > 2 &&
                ('autofocus' === this.args[2]
                  ? (autofocus = !0)
                  : (passage = this.args[2])),
              'object' === _typeof(passage) && (passage = passage.link),
              jQuery(el)
                .attr({
                  id: ''.concat(this.name, '-').concat(varId),
                  name: ''.concat(this.name, '-').concat(varId),
                  type: asNumber ? 'number' : 'text',
                  inputmode: asNumber ? 'decimal' : 'text',
                  tabindex: 0
                })
                .addClass('macro-'.concat(this.name))
                .on(
                  'change.macros',
                  this.createShadowWrapper(function () {
                    State.setVar(
                      varName,
                      asNumber ? Number(this.value) : this.value
                    )
                  })
                )
                .on(
                  'keypress.macros',
                  this.createShadowWrapper(function (ev) {
                    13 === ev.which &&
                      (ev.preventDefault(),
                      State.setVar(
                        varName,
                        asNumber ? Number(this.value) : this.value
                      ),
                      null != passage && Engine.play(passage))
                  })
                )
                .appendTo(this.output),
              asNumber && (el.step = 'any'),
              State.setVar(varName, defaultValue),
              (el.value = defaultValue),
              autofocus &&
                (el.setAttribute('autofocus', 'autofocus'),
                (postdisplay['#autofocus:'.concat(el.id)] = function (task) {
                  delete postdisplay[task],
                    setTimeout(function () {
                      return el.focus()
                    }, Engine.minDomActionDelay)
                }))
          }
        }),
        Macro.add('radiobutton', {
          isAsync: !0,
          handler: function () {
            if (this.args.length < 2) {
              var errors = []
              return (
                this.args.length < 1 && errors.push('variable name'),
                this.args.length < 2 && errors.push('checked value'),
                this.error('no '.concat(errors.join(' or '), ' specified'))
              )
            }
            if ('string' != typeof this.args[0])
              return this.error('variable name argument is not a string')
            var varName = this.args[0].trim()
            if ('$' !== varName[0] && '_' !== varName[0])
              return this.error(
                'variable name "'.concat(
                  this.args[0],
                  '" is missing its sigil ($ or _)'
                )
              )
            var varId = Util.slugify(varName),
              checkValue = this.args[1],
              el = document.createElement('input')
            switch (
              (TempState.hasOwnProperty(this.name) ||
                (TempState[this.name] = {}),
              TempState[this.name].hasOwnProperty(varId) ||
                (TempState[this.name][varId] = 0),
              jQuery(el)
                .attr({
                  id: ''
                    .concat(this.name, '-')
                    .concat(varId, '-')
                    .concat(TempState[this.name][varId]++),
                  name: ''.concat(this.name, '-').concat(varId),
                  type: 'radio',
                  tabindex: 0
                })
                .addClass('macro-'.concat(this.name))
                .on(
                  'change.macros',
                  this.createShadowWrapper(function () {
                    this.checked && State.setVar(varName, checkValue)
                  })
                )
                .appendTo(this.output),
              this.args[2])
            ) {
              case 'autocheck':
                State.getVar(varName) === checkValue && (el.checked = !0)
                break
              case 'checked':
                ;(el.checked = !0), State.setVar(varName, checkValue)
            }
          }
        }),
        Macro.add('textarea', {
          isAsync: !0,
          handler: function () {
            if (this.args.length < 2) {
              var errors = []
              return (
                this.args.length < 1 && errors.push('variable name'),
                this.args.length < 2 && errors.push('default value'),
                this.error('no '.concat(errors.join(' or '), ' specified'))
              )
            }
            if ('string' != typeof this.args[0])
              return this.error('variable name argument is not a string')
            var varName = this.args[0].trim()
            if ('$' !== varName[0] && '_' !== varName[0])
              return this.error(
                'variable name "'.concat(
                  this.args[0],
                  '" is missing its sigil ($ or _)'
                )
              )
            Config.debug && this.debugView.modes({ block: !0 })
            var varId = Util.slugify(varName),
              defaultValue = this.args[1],
              autofocus = 'autofocus' === this.args[2],
              el = document.createElement('textarea')
            jQuery(el)
              .attr({
                id: ''.concat(this.name, '-').concat(varId),
                name: ''.concat(this.name, '-').concat(varId),
                rows: 4,
                tabindex: 0
              })
              .addClass('macro-'.concat(this.name))
              .on(
                'change.macros',
                this.createShadowWrapper(function () {
                  State.setVar(varName, this.value)
                })
              )
              .appendTo(this.output),
              State.setVar(varName, defaultValue),
              (el.textContent = defaultValue),
              autofocus &&
                (el.setAttribute('autofocus', 'autofocus'),
                (postdisplay['#autofocus:'.concat(el.id)] = function (task) {
                  delete postdisplay[task],
                    setTimeout(function () {
                      return el.focus()
                    }, Engine.minDomActionDelay)
                }))
          }
        }),
        Macro.add('click', 'link'),
        Macro.add('actions', {
          handler: function () {
            for (
              var $list = jQuery(document.createElement('ul'))
                  .addClass(this.name)
                  .appendTo(this.output),
                i = 0;
              i < this.args.length;
              ++i
            ) {
              var passage = void 0,
                text = void 0,
                $image = void 0,
                setFn = void 0
              if (
                ('object' === _typeof(this.args[i])
                  ? this.args[i].isImage
                    ? (($image = jQuery(document.createElement('img')).attr(
                        'src',
                        this.args[i].source
                      )),
                      this.args[i].hasOwnProperty('passage') &&
                        $image.attr('data-passage', this.args[i].passage),
                      this.args[i].hasOwnProperty('title') &&
                        $image.attr('title', this.args[i].title),
                      this.args[i].hasOwnProperty('align') &&
                        $image.attr('align', this.args[i].align),
                      (passage = this.args[i].link),
                      (setFn = this.args[i].setFn))
                    : ((text = this.args[i].text),
                      (passage = this.args[i].link),
                      (setFn = this.args[i].setFn))
                  : (text = passage = this.args[i]),
                !(
                  State.variables.hasOwnProperty('#actions') &&
                  State.variables['#actions'].hasOwnProperty(passage) &&
                  State.variables['#actions'][passage]
                ))
              ) {
                var $link = jQuery(
                  Wikifier.createInternalLink(
                    jQuery(document.createElement('li')).appendTo($list),
                    passage,
                    null,
                    (function (passage, fn) {
                      return function () {
                        State.variables.hasOwnProperty('#actions') ||
                          (State.variables['#actions'] = {}),
                          (State.variables['#actions'][passage] = !0),
                          'function' == typeof fn && fn()
                      }
                    })(passage, setFn)
                  )
                )
                  .addClass('macro-'.concat(this.name))
                  .append($image || document.createTextNode(text))
                $image && $link.addClass('link-image')
              }
            }
          }
        }),
        Macro.add(['back', 'return'], {
          handler: function () {
            if (this.args.length > 1)
              return this.error(
                'too many arguments specified, check the documentation for details'
              )
            var passage,
              text,
              $image,
              $link,
              momentIndex = -1
            if (
              (1 === this.args.length &&
                ('object' === _typeof(this.args[0])
                  ? this.args[0].isImage
                    ? (($image = jQuery(document.createElement('img')).attr(
                        'src',
                        this.args[0].source
                      )),
                      this.args[0].hasOwnProperty('passage') &&
                        $image.attr('data-passage', this.args[0].passage),
                      this.args[0].hasOwnProperty('title') &&
                        $image.attr('title', this.args[0].title),
                      this.args[0].hasOwnProperty('align') &&
                        $image.attr('align', this.args[0].align),
                      this.args[0].hasOwnProperty('link') &&
                        (passage = this.args[0].link))
                    : (1 === this.args[0].count || (text = this.args[0].text),
                      (passage = this.args[0].link))
                  : 1 === this.args.length && (text = this.args[0])),
              null == passage)
            ) {
              for (var i = State.length - 2; i >= 0; --i)
                if (State.history[i].title !== State.passage) {
                  ;(momentIndex = i), (passage = State.history[i].title)
                  break
                }
              if (null == passage && 'return' === this.name)
                for (var _i6 = State.expired.length - 1; _i6 >= 0; --_i6)
                  if (State.expired[_i6] !== State.passage) {
                    passage = State.expired[_i6]
                    break
                  }
            } else {
              if (!Story.has(passage))
                return this.error(
                  'passage "'.concat(passage, '" does not exist')
                )
              if ('back' === this.name) {
                for (var _i7 = State.length - 2; _i7 >= 0; --_i7)
                  if (State.history[_i7].title === passage) {
                    momentIndex = _i7
                    break
                  }
                if (-1 === momentIndex)
                  return this.error(
                    'cannot find passage "'.concat(
                      passage,
                      '" in the current story history'
                    )
                  )
              }
            }
            if (null == passage) return this.error('cannot find passage')
            'back' !== this.name || -1 !== momentIndex
              ? (($link = jQuery(document.createElement('a'))
                  .addClass('link-internal')
                  .ariaClick(
                    { one: !0 },
                    'return' === this.name
                      ? function () {
                          return Engine.play(passage)
                        }
                      : function () {
                          return Engine.goTo(momentIndex)
                        }
                  )),
                $image && $link.addClass('link-image'))
              : ($link = jQuery(document.createElement('span')).addClass(
                  'link-disabled'
                )),
              $link
                .addClass('macro-'.concat(this.name))
                .append(
                  $image ||
                    document.createTextNode(
                      text ||
                        L10n.get(
                          'macro'.concat(this.name.toUpperFirst(), 'Text')
                        )
                    )
                )
                .appendTo(this.output)
          }
        }),
        Macro.add('choice', {
          handler: function () {
            if (0 === this.args.length)
              return this.error('no passage specified')
            var passage,
              text,
              $image,
              setFn,
              $link,
              choiceId = State.passage
            if (
              (1 === this.args.length
                ? 'object' === _typeof(this.args[0])
                  ? this.args[0].isImage
                    ? (($image = jQuery(document.createElement('img')).attr(
                        'src',
                        this.args[0].source
                      )),
                      this.args[0].hasOwnProperty('passage') &&
                        $image.attr('data-passage', this.args[0].passage),
                      this.args[0].hasOwnProperty('title') &&
                        $image.attr('title', this.args[0].title),
                      this.args[0].hasOwnProperty('align') &&
                        $image.attr('align', this.args[0].align),
                      (passage = this.args[0].link),
                      (setFn = this.args[0].setFn))
                    : ((text = this.args[0].text),
                      (passage = this.args[0].link),
                      (setFn = this.args[0].setFn))
                  : (text = passage = this.args[0])
                : ((passage = this.args[0]), (text = this.args[1])),
              State.variables.hasOwnProperty('#choice') &&
                State.variables['#choice'].hasOwnProperty(choiceId) &&
                State.variables['#choice'][choiceId])
            )
              return (
                ($link = jQuery(document.createElement('span'))
                  .addClass('link-disabled macro-'.concat(this.name))
                  .attr('tabindex', -1)
                  .append($image || document.createTextNode(text))
                  .appendTo(this.output)),
                void ($image && $link.addClass('link-image'))
              )
            ;($link = jQuery(
              Wikifier.createInternalLink(
                this.output,
                passage,
                null,
                function () {
                  State.variables.hasOwnProperty('#choice') ||
                    (State.variables['#choice'] = {}),
                    (State.variables['#choice'][choiceId] = !0),
                    'function' == typeof setFn && setFn()
                }
              )
            )
              .addClass('macro-'.concat(this.name))
              .append($image || document.createTextNode(text))),
              $image && $link.addClass('link-image')
          }
        }),
        Macro.add(['addclass', 'toggleclass'], {
          handler: function () {
            if (this.args.length < 2) {
              var errors = []
              return (
                this.args.length < 1 && errors.push('selector'),
                this.args.length < 2 && errors.push('class names'),
                this.error('no '.concat(errors.join(' or '), ' specified'))
              )
            }
            var $targets = jQuery(this.args[0])
            if (0 === $targets.length)
              return this.error(
                'no elements matched the selector "'.concat(this.args[0], '"')
              )
            switch (this.name) {
              case 'addclass':
                $targets.addClass(this.args[1].trim())
                break
              case 'toggleclass':
                $targets.toggleClass(this.args[1].trim())
            }
            Config.debug && this.debugView.modes({ hidden: !0 })
          }
        }),
        Macro.add('removeclass', {
          handler: function () {
            if (0 === this.args.length)
              return this.error('no selector specified')
            var $targets = jQuery(this.args[0])
            if (0 === $targets.length)
              return this.error(
                'no elements matched the selector "'.concat(this.args[0], '"')
              )
            this.args.length > 1
              ? $targets.removeClass(this.args[1].trim())
              : $targets.removeClass(),
              Config.debug && this.debugView.modes({ hidden: !0 })
          }
        }),
        Macro.add('copy', {
          handler: function () {
            if (0 === this.args.length)
              return this.error('no selector specified')
            var $targets = jQuery(this.args[0])
            if (0 === $targets.length)
              return this.error(
                'no elements matched the selector "'.concat(this.args[0], '"')
              )
            jQuery(this.output).append($targets.html()),
              Config.debug && this.debugView.modes({ hidden: !0 })
          }
        }),
        Macro.add(['append', 'prepend', 'replace'], {
          tags: null,
          t8nRe: /^(?:transition|t8n)$/,
          handler: function () {
            var _this18 = this
            if (0 === this.args.length)
              return this.error('no selector specified')
            var $insert,
              $targets = jQuery(this.args[0])
            if (0 === $targets.length)
              return this.error(
                'no elements matched the selector "'.concat(this.args[0], '"')
              )
            if ('' !== this.payload[0].contents)
              switch (
                (this.args.length > 1 && this.self.t8nRe.test(this.args[1])
                  ? (($insert = jQuery(
                      document.createElement('span')
                    )).addClass(
                      'macro-'
                        .concat(this.name, '-insert macro-')
                        .concat(this.name, '-in')
                    ),
                    setTimeout(function () {
                      return $insert.removeClass(
                        'macro-'.concat(_this18.name, '-in')
                      )
                    }, Engine.minDomActionDelay))
                  : ($insert = jQuery(document.createDocumentFragment())),
                $insert.wiki(this.payload[0].contents),
                this.name)
              ) {
                case 'replace':
                  $targets.empty()
                case 'append':
                  $targets.append($insert)
                  break
                case 'prepend':
                  $targets.prepend($insert)
              }
            else 'replace' === this.name && $targets.empty()
            Config.debug && this.debugView.modes({ hidden: !0 })
          }
        }),
        Macro.add('remove', {
          handler: function () {
            if (0 === this.args.length)
              return this.error('no selector specified')
            var $targets = jQuery(this.args[0])
            if (0 === $targets.length)
              return this.error(
                'no elements matched the selector "'.concat(this.args[0], '"')
              )
            $targets.remove(),
              Config.debug && this.debugView.modes({ hidden: !0 })
          }
        }),
        Has.audio)
      ) {
        var errorOnePlaybackAction = function (cur, prev) {
          return 'only one playback action allowed per invocation, "'
            .concat(cur, '" cannot be combined with "')
            .concat(prev, '"')
        }
        Macro.add('audio', {
          handler: function () {
            if (this.args.length < 2) {
              var errors = []
              return (
                this.args.length < 1 && errors.push('track and/or group IDs'),
                this.args.length < 2 && errors.push('actions'),
                this.error('no '.concat(errors.join(' or '), ' specified'))
              )
            }
            var selected
            try {
              selected = SimpleAudio.select(this.args[0])
            } catch (ex) {
              return this.error(ex.message)
            }
            for (
              var action,
                fadeTo,
                loop,
                mute,
                passage,
                time,
                volume,
                args = this.args.slice(1),
                fadeOver = 5;
              args.length > 0;

            ) {
              var arg = args.shift(),
                raw = void 0
              switch (arg) {
                case 'load':
                case 'pause':
                case 'play':
                case 'stop':
                case 'unload':
                  if (action)
                    return this.error(errorOnePlaybackAction(arg, action))
                  action = arg
                  break
                case 'fadein':
                  if (action)
                    return this.error(errorOnePlaybackAction(arg, action))
                  ;(action = 'fade'), (fadeTo = 1)
                  break
                case 'fadeout':
                  if (action)
                    return this.error(errorOnePlaybackAction(arg, action))
                  ;(action = 'fade'), (fadeTo = 0)
                  break
                case 'fadeto':
                  if (action)
                    return this.error(errorOnePlaybackAction(arg, action))
                  if (0 === args.length)
                    return this.error('fadeto missing required level value')
                  if (
                    ((action = 'fade'),
                    (raw = args.shift()),
                    (fadeTo = Number.parseFloat(raw)),
                    Number.isNaN(fadeTo) || !Number.isFinite(fadeTo))
                  )
                    return this.error('cannot parse fadeto: '.concat(raw))
                  break
                case 'fadeoverto':
                  if (action)
                    return this.error(errorOnePlaybackAction(arg, action))
                  if (args.length < 2) {
                    var _errors = []
                    return (
                      args.length < 1 && _errors.push('seconds'),
                      args.length < 2 && _errors.push('level'),
                      this.error(
                        'fadeoverto missing required '
                          .concat(_errors.join(' and '), ' value')
                          .concat(_errors.length > 1 ? 's' : '')
                      )
                    )
                  }
                  if (
                    ((action = 'fade'),
                    (raw = args.shift()),
                    (fadeOver = Number.parseFloat(raw)),
                    Number.isNaN(fadeOver) || !Number.isFinite(fadeOver))
                  )
                    return this.error('cannot parse fadeoverto: '.concat(raw))
                  if (
                    ((raw = args.shift()),
                    (fadeTo = Number.parseFloat(raw)),
                    Number.isNaN(fadeTo) || !Number.isFinite(fadeTo))
                  )
                    return this.error('cannot parse fadeoverto: '.concat(raw))
                  break
                case 'volume':
                  if (0 === args.length)
                    return this.error('volume missing required level value')
                  if (
                    ((raw = args.shift()),
                    (volume = Number.parseFloat(raw)),
                    Number.isNaN(volume) || !Number.isFinite(volume))
                  )
                    return this.error('cannot parse volume: '.concat(raw))
                  break
                case 'mute':
                case 'unmute':
                  mute = 'mute' === arg
                  break
                case 'time':
                  if (0 === args.length)
                    return this.error('time missing required seconds value')
                  if (
                    ((raw = args.shift()),
                    (time = Number.parseFloat(raw)),
                    Number.isNaN(time) || !Number.isFinite(time))
                  )
                    return this.error('cannot parse time: '.concat(raw))
                  break
                case 'loop':
                case 'unloop':
                  loop = 'loop' === arg
                  break
                case 'goto':
                  if (0 === args.length)
                    return this.error('goto missing required passage title')
                  if (
                    ((raw = args.shift()),
                    (passage = 'object' === _typeof(raw) ? raw.link : raw),
                    !Story.has(passage))
                  )
                    return this.error(
                      'passage "'.concat(passage, '" does not exist')
                    )
                  break
                default:
                  return this.error('unknown action: '.concat(arg))
              }
            }
            try {
              if (
                (null != volume && selected.volume(volume),
                null != time && selected.time(time),
                null != mute && selected.mute(mute),
                null != loop && selected.loop(loop),
                null != passage)
              ) {
                var nsEnded = 'ended.macros.macro-'.concat(this.name, '_goto')
                selected.off(nsEnded).one(nsEnded, function () {
                  selected.off(nsEnded), Engine.play(passage)
                })
              }
              switch (action) {
                case 'fade':
                  selected.fade(fadeOver, fadeTo)
                  break
                case 'load':
                  selected.load()
                  break
                case 'pause':
                  selected.pause()
                  break
                case 'play':
                  selected.playWhenAllowed()
                  break
                case 'stop':
                  selected.stop()
                  break
                case 'unload':
                  selected.unload()
              }
              Config.debug && this.debugView.modes({ hidden: !0 })
            } catch (ex) {
              return this.error('error executing action: '.concat(ex.message))
            }
          }
        }),
          Macro.add('cacheaudio', {
            handler: function () {
              var _this19 = this
              if (this.args.length < 2) {
                var errors = []
                return (
                  this.args.length < 1 && errors.push('track ID'),
                  this.args.length < 2 && errors.push('sources'),
                  this.error('no '.concat(errors.join(' or '), ' specified'))
                )
              }
              var id = String(this.args[0]).trim(),
                oldFmtRe = /^format:\s*([\w-]+)\s*;\s*/i
              try {
                SimpleAudio.tracks.add(
                  id,
                  this.args.slice(1).map(function (source) {
                    if (oldFmtRe.test(source)) {
                      if (Config.debug)
                        return _this19.error(
                          'track ID "'.concat(
                            id,
                            '": format specifier migration required, "format:formatId;" → "formatId|"'
                          )
                        )
                      source = source.replace(oldFmtRe, '$1|')
                    }
                    return source
                  })
                )
              } catch (ex) {
                return this.error(ex.message)
              }
              if (Config.debug && !SimpleAudio.tracks.get(id).hasSource())
                return this.error(
                  'track ID "'.concat(id, '": no supported audio sources found')
                )
              Config.debug && this.debugView.modes({ hidden: !0 })
            }
          }),
          Macro.add('createaudiogroup', {
            tags: ['track'],
            handler: function () {
              if (0 === this.args.length)
                return this.error('no group ID specified')
              if (1 === this.payload.length)
                return this.error('no tracks defined via <<track>>')
              Config.debug && this.debugView.modes({ nonvoid: !1, hidden: !0 })
              for (
                var groupId = String(this.args[0]).trim(),
                  trackIds = [],
                  i = 1,
                  len = this.payload.length;
                i < len;
                ++i
              ) {
                if (this.payload[i].args.length < 1)
                  return this.error('no track ID specified')
                trackIds.push(String(this.payload[i].args[0]).trim()),
                  Config.debug &&
                    this.createDebugView(
                      this.payload[i].name,
                      this.payload[i].source
                    ).modes({ nonvoid: !1, hidden: !0 })
              }
              try {
                SimpleAudio.groups.add(groupId, trackIds)
              } catch (ex) {
                return this.error(ex.message)
              }
              Config.debug &&
                this.createDebugView(
                  '/'.concat(this.name),
                  '<</'.concat(this.name, '>>')
                ).modes({ nonvoid: !1, hidden: !0 })
            }
          }),
          Macro.add('createplaylist', {
            tags: ['track'],
            handler: function () {
              if (0 === this.args.length)
                return this.error('no list ID specified')
              if (1 === this.payload.length)
                return this.error('no tracks defined via <<track>>')
              var playlist = Macro.get('playlist')
              if (null !== playlist.from && 'createplaylist' !== playlist.from)
                return this.error(
                  'a playlist has already been defined with <<setplaylist>>'
                )
              Config.debug && this.debugView.modes({ nonvoid: !1, hidden: !0 })
              for (
                var listId = String(this.args[0]).trim(),
                  trackObjs = [],
                  i = 1,
                  len = this.payload.length;
                i < len;
                ++i
              ) {
                if (0 === this.payload[i].args.length)
                  return this.error('no track ID specified')
                for (
                  var trackObj = { id: String(this.payload[i].args[0]).trim() },
                    args = this.payload[i].args.slice(1);
                  args.length > 0;

                ) {
                  var arg = args.shift(),
                    raw = void 0,
                    parsed = void 0
                  switch (arg) {
                    case 'copy':
                    case 'own':
                      trackObj.own = !0
                      break
                    case 'rate':
                      args.length > 0 && args.shift()
                      break
                    case 'volume':
                      if (0 === args.length)
                        return this.error('volume missing required level value')
                      if (
                        ((raw = args.shift()),
                        (parsed = Number.parseFloat(raw)),
                        Number.isNaN(parsed) || !Number.isFinite(parsed))
                      )
                        return this.error('cannot parse volume: '.concat(raw))
                      trackObj.volume = parsed
                      break
                    default:
                      return this.error('unknown action: '.concat(arg))
                  }
                }
                trackObjs.push(trackObj),
                  Config.debug &&
                    this.createDebugView(
                      this.payload[i].name,
                      this.payload[i].source
                    ).modes({ nonvoid: !1, hidden: !0 })
              }
              try {
                SimpleAudio.lists.add(listId, trackObjs)
              } catch (ex) {
                return this.error(ex.message)
              }
              null === playlist.from && (playlist.from = 'createplaylist'),
                Config.debug &&
                  this.createDebugView(
                    '/'.concat(this.name),
                    '<</'.concat(this.name, '>>')
                  ).modes({ nonvoid: !1, hidden: !0 })
            }
          }),
          Macro.add('masteraudio', {
            handler: function () {
              if (0 === this.args.length)
                return this.error('no actions specified')
              for (
                var action, mute, muteOnHide, volume, args = this.args.slice(0);
                args.length > 0;

              ) {
                var arg = args.shift(),
                  raw = void 0
                switch (arg) {
                  case 'load':
                  case 'stop':
                  case 'unload':
                    if (action)
                      return this.error(errorOnePlaybackAction(arg, action))
                    action = arg
                    break
                  case 'mute':
                  case 'unmute':
                    mute = 'mute' === arg
                    break
                  case 'muteonhide':
                  case 'nomuteonhide':
                    muteOnHide = 'muteonhide' === arg
                    break
                  case 'volume':
                    if (0 === args.length)
                      return this.error('volume missing required level value')
                    if (
                      ((raw = args.shift()),
                      (volume = Number.parseFloat(raw)),
                      Number.isNaN(volume) || !Number.isFinite(volume))
                    )
                      return this.error('cannot parse volume: '.concat(raw))
                    break
                  default:
                    return this.error('unknown action: '.concat(arg))
                }
              }
              try {
                switch (
                  (null != mute && SimpleAudio.mute(mute),
                  null != muteOnHide && SimpleAudio.muteOnHidden(muteOnHide),
                  null != volume && SimpleAudio.volume(volume),
                  action)
                ) {
                  case 'load':
                    SimpleAudio.load()
                    break
                  case 'stop':
                    SimpleAudio.stop()
                    break
                  case 'unload':
                    SimpleAudio.unload()
                }
                Config.debug && this.debugView.modes({ hidden: !0 })
              } catch (ex) {
                return this.error('error executing action: '.concat(ex.message))
              }
            }
          }),
          Macro.add('playlist', {
            from: null,
            handler: function () {
              var list,
                args,
                action,
                from = this.self.from
              if (null === from)
                return this.error('no playlists have been created')
              if ('createplaylist' === from) {
                if (this.args.length < 2) {
                  var errors = []
                  return (
                    this.args.length < 1 && errors.push('list ID'),
                    this.args.length < 2 && errors.push('actions'),
                    this.error('no '.concat(errors.join(' or '), ' specified'))
                  )
                }
                var id = String(this.args[0]).trim()
                if (!SimpleAudio.lists.has(id))
                  return this.error('playlist "'.concat(id, '" does not exist'))
                ;(list = SimpleAudio.lists.get(id)), (args = this.args.slice(1))
              } else {
                if (0 === this.args.length)
                  return this.error('no actions specified')
                ;(list = SimpleAudio.lists.get('setplaylist')),
                  (args = this.args.slice(0))
              }
              for (
                var fadeTo, loop, mute, shuffle, volume, fadeOver = 5;
                args.length > 0;

              ) {
                var arg = args.shift(),
                  raw = void 0
                switch (arg) {
                  case 'load':
                  case 'pause':
                  case 'play':
                  case 'skip':
                  case 'stop':
                  case 'unload':
                    if (action)
                      return this.error(errorOnePlaybackAction(arg, action))
                    action = arg
                    break
                  case 'fadein':
                    if (action)
                      return this.error(errorOnePlaybackAction(arg, action))
                    ;(action = 'fade'), (fadeTo = 1)
                    break
                  case 'fadeout':
                    if (action)
                      return this.error(errorOnePlaybackAction(arg, action))
                    ;(action = 'fade'), (fadeTo = 0)
                    break
                  case 'fadeto':
                    if (action)
                      return this.error(errorOnePlaybackAction(arg, action))
                    if (0 === args.length)
                      return this.error('fadeto missing required level value')
                    if (
                      ((action = 'fade'),
                      (raw = args.shift()),
                      (fadeTo = Number.parseFloat(raw)),
                      Number.isNaN(fadeTo) || !Number.isFinite(fadeTo))
                    )
                      return this.error('cannot parse fadeto: '.concat(raw))
                    break
                  case 'fadeoverto':
                    if (action)
                      return this.error(errorOnePlaybackAction(arg, action))
                    if (args.length < 2) {
                      var _errors2 = []
                      return (
                        args.length < 1 && _errors2.push('seconds'),
                        args.length < 2 && _errors2.push('level'),
                        this.error(
                          'fadeoverto missing required '
                            .concat(_errors2.join(' and '), ' value')
                            .concat(_errors2.length > 1 ? 's' : '')
                        )
                      )
                    }
                    if (
                      ((action = 'fade'),
                      (raw = args.shift()),
                      (fadeOver = Number.parseFloat(raw)),
                      Number.isNaN(fadeOver) || !Number.isFinite(fadeOver))
                    )
                      return this.error('cannot parse fadeoverto: '.concat(raw))
                    if (
                      ((raw = args.shift()),
                      (fadeTo = Number.parseFloat(raw)),
                      Number.isNaN(fadeTo) || !Number.isFinite(fadeTo))
                    )
                      return this.error('cannot parse fadeoverto: '.concat(raw))
                    break
                  case 'volume':
                    if (0 === args.length)
                      return this.error('volume missing required level value')
                    if (
                      ((raw = args.shift()),
                      (volume = Number.parseFloat(raw)),
                      Number.isNaN(volume) || !Number.isFinite(volume))
                    )
                      return this.error('cannot parse volume: '.concat(raw))
                    break
                  case 'mute':
                  case 'unmute':
                    mute = 'mute' === arg
                    break
                  case 'loop':
                  case 'unloop':
                    loop = 'loop' === arg
                    break
                  case 'shuffle':
                  case 'unshuffle':
                    shuffle = 'shuffle' === arg
                    break
                  default:
                    return this.error('unknown action: '.concat(arg))
                }
              }
              try {
                switch (
                  (null != volume && list.volume(volume),
                  null != mute && list.mute(mute),
                  null != loop && list.loop(loop),
                  null != shuffle && list.shuffle(shuffle),
                  action)
                ) {
                  case 'fade':
                    list.fade(fadeOver, fadeTo)
                    break
                  case 'load':
                    list.load()
                    break
                  case 'pause':
                    list.pause()
                    break
                  case 'play':
                    list.playWhenAllowed()
                    break
                  case 'skip':
                    list.skip()
                    break
                  case 'stop':
                    list.stop()
                    break
                  case 'unload':
                    list.unload()
                }
                Config.debug && this.debugView.modes({ hidden: !0 })
              } catch (ex) {
                return this.error('error executing action: '.concat(ex.message))
              }
            }
          }),
          Macro.add('removeaudiogroup', {
            handler: function () {
              if (0 === this.args.length)
                return this.error('no group ID specified')
              var id = String(this.args[0]).trim()
              if (!SimpleAudio.groups.has(id))
                return this.error('group "'.concat(id, '" does not exist'))
              SimpleAudio.groups.delete(id),
                Config.debug && this.debugView.modes({ hidden: !0 })
            }
          }),
          Macro.add('removeplaylist', {
            handler: function () {
              if (0 === this.args.length)
                return this.error('no list ID specified')
              var id = String(this.args[0]).trim()
              if (!SimpleAudio.lists.has(id))
                return this.error('playlist "'.concat(id, '" does not exist'))
              SimpleAudio.lists.delete(id),
                Config.debug && this.debugView.modes({ hidden: !0 })
            }
          }),
          Macro.add('waitforaudio', {
            skipArgs: !0,
            handler: function () {
              SimpleAudio.loadWithScreen()
            }
          }),
          Macro.add('setplaylist', {
            handler: function () {
              if (0 === this.args.length)
                return this.error('no track ID(s) specified')
              var playlist = Macro.get('playlist')
              if (null !== playlist.from && 'setplaylist' !== playlist.from)
                return this.error(
                  'playlists have already been defined with <<createplaylist>>'
                )
              try {
                SimpleAudio.lists.add('setplaylist', this.args.slice(0))
              } catch (ex) {
                return this.error(ex.message)
              }
              null === playlist.from && (playlist.from = 'setplaylist'),
                Config.debug && this.debugView.modes({ hidden: !0 })
            }
          }),
          Macro.add('stopallaudio', {
            skipArgs: !0,
            handler: function () {
              SimpleAudio.select(':all').stop(),
                Config.debug && this.debugView.modes({ hidden: !0 })
            }
          })
      } else
        Macro.add(
          [
            'audio',
            'cacheaudio',
            'createaudiogroup',
            'createplaylist',
            'masteraudio',
            'playlist',
            'removeaudiogroup',
            'removeplaylist',
            'waitforaudio',
            'setplaylist',
            'stopallaudio'
          ],
          {
            skipArgs: !0,
            handler: function () {
              Config.debug && this.debugView.modes({ hidden: !0 })
            }
          }
        )
      Macro.add('done', {
        skipArgs: !0,
        tags: null,
        handler: function () {
          var contents = this.payload[0].contents.trim()
          '' !== contents &&
            setTimeout(
              this.createShadowWrapper(function () {
                return $.wiki(contents)
              }),
              Engine.minDomActionDelay
            )
        }
      }),
        Macro.add('goto', {
          handler: function () {
            return 0 === this.args.length
              ? this.error('no passage specified')
              : ((passage =
                  'object' === _typeof(this.args[0])
                    ? this.args[0].link
                    : this.args[0]),
                Story.has(passage)
                  ? void setTimeout(function () {
                      return Engine.play(passage)
                    }, Engine.minDomActionDelay)
                  : this.error('passage "'.concat(passage, '" does not exist')))
            var passage
          }
        }),
        Macro.add('repeat', {
          isAsync: !0,
          tags: null,
          timers: new Set(),
          t8nRe: /^(?:transition|t8n)$/,
          handler: function () {
            var delay,
              _this20 = this
            if (0 === this.args.length)
              return this.error('no time value specified')
            try {
              delay = Math.max(
                Engine.minDomActionDelay,
                Util.fromCssTime(this.args[0])
              )
            } catch (ex) {
              return this.error(ex.message)
            }
            Config.debug && this.debugView.modes({ block: !0 })
            var transition =
                this.args.length > 1 && this.self.t8nRe.test(this.args[1]),
              $wrapper = jQuery(document.createElement('span'))
                .addClass('macro-'.concat(this.name))
                .appendTo(this.output)
            this.self.registerInterval(
              this.createShadowWrapper(function () {
                var frag = document.createDocumentFragment()
                new Wikifier(frag, _this20.payload[0].contents)
                var $output = $wrapper
                transition &&
                  ($output = jQuery(document.createElement('span'))
                    .addClass('macro-repeat-insert macro-repeat-in')
                    .appendTo($output)),
                  $output.append(frag),
                  transition &&
                    setTimeout(function () {
                      return $output.removeClass('macro-repeat-in')
                    }, Engine.minDomActionDelay)
              }),
              delay
            )
          },
          registerInterval: function (callback, delay) {
            var _this21 = this
            if ('function' != typeof callback)
              throw new TypeError('callback parameter must be a function')
            var passage = State.passage,
              turn = State.turns,
              timers = this.timers,
              timerId = null
            ;(timerId = setInterval(function () {
              if (State.passage !== passage || State.turns !== turn)
                return clearInterval(timerId), void timers.delete(timerId)
              var timerIdCache
              try {
                ;(TempState.break = null),
                  TempState.hasOwnProperty('repeatTimerId') &&
                    (timerIdCache = TempState.repeatTimerId),
                  (TempState.repeatTimerId = timerId),
                  callback.call(_this21)
              } finally {
                void 0 !== timerIdCache
                  ? (TempState.repeatTimerId = timerIdCache)
                  : delete TempState.repeatTimerId,
                  (TempState.break = null)
              }
            }, delay)),
              timers.add(timerId),
              prehistory.hasOwnProperty('#repeat-timers-cleanup') ||
                (prehistory['#repeat-timers-cleanup'] = function (task) {
                  delete prehistory[task],
                    timers.forEach(function (timerId) {
                      return clearInterval(timerId)
                    }),
                    timers.clear()
                })
          }
        }),
        Macro.add('stop', {
          skipArgs: !0,
          handler: function () {
            if (!TempState.hasOwnProperty('repeatTimerId'))
              return this.error(
                'must only be used in conjunction with its parent macro <<repeat>>'
              )
            var timers = Macro.get('repeat').timers,
              timerId = TempState.repeatTimerId
            clearInterval(timerId),
              timers.delete(timerId),
              (TempState.break = 2),
              Config.debug && this.debugView.modes({ hidden: !0 })
          }
        }),
        Macro.add('timed', {
          isAsync: !0,
          tags: ['next'],
          timers: new Set(),
          t8nRe: /^(?:transition|t8n)$/,
          handler: function () {
            if (0 === this.args.length)
              return this.error('no time value specified in <<timed>>')
            var i,
              items = []
            try {
              items.push({
                name: this.name,
                source: this.source,
                delay: Math.max(
                  Engine.minDomActionDelay,
                  Util.fromCssTime(this.args[0])
                ),
                content: this.payload[0].contents
              })
            } catch (ex) {
              return this.error(''.concat(ex.message, ' in <<timed>>'))
            }
            if (this.payload.length > 1)
              try {
                var len
                for (i = 1, len = this.payload.length; i < len; ++i)
                  items.push({
                    name: this.payload[i].name,
                    source: this.payload[i].source,
                    delay:
                      0 === this.payload[i].args.length
                        ? items[items.length - 1].delay
                        : Math.max(
                            Engine.minDomActionDelay,
                            Util.fromCssTime(this.payload[i].args[0])
                          ),
                    content: this.payload[i].contents
                  })
              } catch (ex) {
                return this.error(
                  ''.concat(ex.message, ' in <<next>> (#').concat(i, ')')
                )
              }
            Config.debug && this.debugView.modes({ block: !0 })
            var transition =
                this.args.length > 1 && this.self.t8nRe.test(this.args[1]),
              $wrapper = jQuery(document.createElement('span'))
                .addClass('macro-'.concat(this.name))
                .appendTo(this.output)
            this.self.registerTimeout(
              this.createShadowWrapper(function (item) {
                var frag = document.createDocumentFragment()
                new Wikifier(frag, item.content)
                var $output = $wrapper
                Config.debug &&
                  'next' === item.name &&
                  ($output = jQuery(
                    new DebugView($output[0], 'macro', item.name, item.source)
                      .output
                  )),
                  transition &&
                    ($output = jQuery(document.createElement('span'))
                      .addClass('macro-timed-insert macro-timed-in')
                      .appendTo($output)),
                  $output.append(frag),
                  transition &&
                    setTimeout(function () {
                      return $output.removeClass('macro-timed-in')
                    }, Engine.minDomActionDelay)
              }),
              items
            )
          },
          registerTimeout: function (callback, items) {
            if ('function' != typeof callback)
              throw new TypeError('callback parameter must be a function')
            var passage = State.passage,
              turn = State.turns,
              timers = this.timers,
              timerId = null,
              nextItem = items.shift()
            ;(timerId = setTimeout(function worker () {
              if (
                (timers.delete(timerId),
                State.passage === passage && State.turns === turn)
              ) {
                var curItem = nextItem
                null != (nextItem = items.shift()) &&
                  ((timerId = setTimeout(worker, nextItem.delay)),
                  timers.add(timerId)),
                  callback.call(this, curItem)
              }
            }, nextItem.delay)),
              timers.add(timerId),
              prehistory.hasOwnProperty('#timed-timers-cleanup') ||
                (prehistory['#timed-timers-cleanup'] = function (task) {
                  delete prehistory[task],
                    timers.forEach(function (timerId) {
                      return clearTimeout(timerId)
                    }),
                    timers.clear()
                })
          }
        }),
        Macro.add('widget', {
          tags: null,
          handler: function () {
            if (0 === this.args.length)
              return this.error('no widget name specified')
            var widgetCode,
              widgetName = this.args[0],
              isNonVoid = this.args.length > 1 && 'container' === this.args[1]
            if (Macro.has(widgetName)) {
              if (!Macro.get(widgetName).isWidget)
                return this.error(
                  'cannot clobber existing macro "'.concat(widgetName, '"')
                )
              Macro.delete(widgetName)
            }
            try {
              var widgetDef = {
                isWidget: !0,
                handler:
                  ((widgetCode = this.payload[0].contents),
                  function () {
                    var shadowStore = {}
                    State.temporary.hasOwnProperty('args') &&
                      (shadowStore._args = State.temporary.args),
                      (State.temporary.args = _toConsumableArray(this.args)),
                      (State.temporary.args.raw = this.args.raw),
                      (State.temporary.args.full = this.args.full),
                      this.addShadow('_args'),
                      isNonVoid &&
                        (State.temporary.hasOwnProperty('contents') &&
                          (shadowStore._contents = State.temporary.contents),
                        (State.temporary.contents = this.payload[0].contents),
                        this.addShadow('_contents')),
                      State.variables.hasOwnProperty('args') &&
                        (shadowStore.$args = State.variables.args),
                      (State.variables.args = State.temporary.args),
                      this.addShadow('$args')
                    try {
                      var resFrag = document.createDocumentFragment(),
                        errList = []
                      if (
                        (new Wikifier(resFrag, widgetCode),
                        Array.from(resFrag.querySelectorAll('.error')).forEach(
                          function (errEl) {
                            errList.push(errEl.textContent)
                          }
                        ),
                        0 !== errList.length)
                      )
                        return this.error(
                          'error'
                            .concat(
                              errList.length > 1 ? 's' : '',
                              ' within widget code ('
                            )
                            .concat(errList.join('; '), ')')
                        )
                      this.output.appendChild(resFrag)
                    } catch (ex) {
                      return this.error(
                        'cannot execute widget: '.concat(ex.message)
                      )
                    } finally {
                      shadowStore.hasOwnProperty('_args')
                        ? (State.temporary.args = shadowStore._args)
                        : delete State.temporary.args,
                        isNonVoid &&
                          (shadowStore.hasOwnProperty('_contents')
                            ? (State.temporary.contents = shadowStore._contents)
                            : delete State.temporary.contents),
                        shadowStore.hasOwnProperty('$args')
                          ? (State.variables.args = shadowStore.$args)
                          : delete State.variables.args
                    }
                  })
              }
              isNonVoid && (widgetDef.tags = []),
                Macro.add(widgetName, widgetDef),
                Config.debug && this.debugView.modes({ hidden: !0 })
            } catch (ex) {
              return this.error(
                'cannot create widget macro "'
                  .concat(widgetName, '": ')
                  .concat(ex.message)
              )
            }
          }
        })
    })()
    var Dialog = (function () {
        var _$overlay = null,
          _$dialog = null,
          _$dialogTitle = null,
          _$dialogBody = null,
          _lastActive = null,
          _scrollbarWidth = 0,
          _dialogObserver = null
        function dialogClose (ev) {
          return (
            _$dialogBody.trigger(':dialogclosing'),
            jQuery(document).off('.dialog-close'),
            _dialogObserver
              ? (_dialogObserver.disconnect(), (_dialogObserver = null))
              : _$dialogBody.off('.dialog-resize'),
            jQuery(window).off('.dialog-resize'),
            _$dialog
              .removeClass('open')
              .css({ left: '', right: '', top: '', bottom: '' }),
            jQuery('#ui-bar,#story')
              .find('[tabindex=-2]')
              .removeAttr('aria-hidden')
              .attr('tabindex', 0),
            jQuery('body>[tabindex=-3]')
              .removeAttr('aria-hidden')
              .removeAttr('tabindex'),
            _$overlay.removeClass('open'),
            jQuery(document.documentElement).removeAttr('data-dialog'),
            _$dialogTitle.empty(),
            _$dialogBody.empty().removeClass(),
            null !== _lastActive &&
              (jQuery(_lastActive).focus(), (_lastActive = null)),
            ev &&
              ev.data &&
              'function' == typeof ev.data.closeFn &&
              ev.data.closeFn(ev),
            _$dialogBody.trigger(':dialogclose'),
            _$dialogBody.trigger(':dialogclosed'),
            Dialog
          )
        }
        function dialogIsOpen (classNames) {
          return (
            _$dialog.hasClass('open') &&
            (!classNames ||
              classNames.splitOrEmpty(/\s+/).every(function (cn) {
                return _$dialogBody.hasClass(cn)
              }))
          )
        }
        function dialogOpen (options, closeFn) {
          _$dialogBody.trigger(':dialogopening')
          var top = jQuery.extend({ top: 50 }, options).top
          return (
            dialogIsOpen() || (_lastActive = safeActiveElement()),
            jQuery(document.documentElement).attr('data-dialog', 'open'),
            _$overlay.addClass('open'),
            null !== _$dialogBody[0].querySelector('img') &&
              _$dialogBody.imagesLoaded().always(function () {
                return _resizeHandler({ data: { top: top } })
              }),
            jQuery(
              'body>:not(script,#store-area,tw-storydata,#ui-bar,#ui-overlay,#ui-dialog)'
            )
              .attr('tabindex', -3)
              .attr('aria-hidden', !0),
            jQuery('#ui-bar,#story')
              .find('[tabindex]:not([tabindex^=-])')
              .attr('tabindex', -2)
              .attr('aria-hidden', !0),
            _$dialog.css(_calcPosition(top)).addClass('open').focus(),
            jQuery(window).on(
              'resize.dialog-resize',
              null,
              { top: top },
              jQuery.throttle(40, _resizeHandler)
            ),
            Has.mutationObserver
              ? (_dialogObserver = new MutationObserver(function (mutations) {
                  for (var i = 0; i < mutations.length; ++i)
                    if ('childList' === mutations[i].type) {
                      _resizeHandler({ data: { top: top } })
                      break
                    }
                })).observe(_$dialogBody[0], { childList: !0, subtree: !0 })
              : _$dialogBody.on(
                  'DOMNodeInserted.dialog-resize DOMNodeRemoved.dialog-resize',
                  null,
                  { top: top },
                  jQuery.throttle(40, _resizeHandler)
                ),
            jQuery(document)
              .one(
                'click.dialog-close',
                '.ui-close',
                { closeFn: closeFn },
                function (ev) {
                  dialogClose(ev)
                }
              )
              .one('keypress.dialog-close', '.ui-close', function (ev) {
                ;(13 !== ev.which && 32 !== ev.which) ||
                  jQuery(this).trigger('click')
              }),
            _$dialogBody.trigger(':dialogopen'),
            _$dialogBody.trigger(':dialogopened'),
            Dialog
          )
        }
        function _calcPosition (topPos) {
          var top = null != topPos ? topPos : 50,
            $parent = jQuery(window),
            dialogPos = { left: '', right: '', top: '', bottom: '' }
          _$dialog.css(dialogPos)
          var horzSpace = $parent.width() - _$dialog.outerWidth(!0) - 1,
            vertSpace = $parent.height() - _$dialog.outerHeight(!0) - 1
          return (
            horzSpace <= 32 + _scrollbarWidth && (vertSpace -= _scrollbarWidth),
            vertSpace <= 32 + _scrollbarWidth && (horzSpace -= _scrollbarWidth),
            (dialogPos.left = dialogPos.right =
              horzSpace <= 32 ? 16 : (horzSpace / 2) >> 0),
            (dialogPos.top =
              vertSpace <= 32
                ? (dialogPos.bottom = 16)
                : vertSpace / 2 > top
                ? top
                : (dialogPos.bottom = (vertSpace / 2) >> 0)),
            Object.keys(dialogPos).forEach(function (key) {
              '' !== dialogPos[key] && (dialogPos[key] += 'px')
            }),
            dialogPos
          )
        }
        function _resizeHandler (ev) {
          var top = ev && ev.data && void 0 !== ev.data.top ? ev.data.top : 50
          'block' === _$dialog.css('display') &&
            (_$dialog.css({ display: 'none' }),
            _$dialog.css(jQuery.extend({ display: '' }, _calcPosition(top))))
        }
        return Object.freeze(
          Object.defineProperties(
            {},
            {
              append: {
                value: function () {
                  var _$dialogBody2
                  return (
                    (_$dialogBody2 = _$dialogBody).append.apply(
                      _$dialogBody2,
                      arguments
                    ),
                    Dialog
                  )
                }
              },
              body: {
                value: function () {
                  return _$dialogBody.get(0)
                }
              },
              close: { value: dialogClose },
              init: {
                value: function () {
                  if (!document.getElementById('ui-dialog')) {
                    _scrollbarWidth = (function () {
                      var scrollbarWidth
                      try {
                        var inner = document.createElement('p'),
                          outer = document.createElement('div')
                        ;(inner.style.width = '100%'),
                          (inner.style.height = '200px'),
                          (outer.style.position = 'absolute'),
                          (outer.style.left = '0px'),
                          (outer.style.top = '0px'),
                          (outer.style.width = '100px'),
                          (outer.style.height = '100px'),
                          (outer.style.visibility = 'hidden'),
                          (outer.style.overflow = 'hidden'),
                          outer.appendChild(inner),
                          document.body.appendChild(outer)
                        var w1 = inner.offsetWidth
                        outer.style.overflow = 'auto'
                        var w2 = inner.offsetWidth
                        w1 === w2 && (w2 = outer.clientWidth),
                          document.body.removeChild(outer),
                          (scrollbarWidth = w1 - w2)
                      } catch (ex) {}
                      return scrollbarWidth || 17
                    })()
                    var $elems = jQuery(
                      document.createDocumentFragment()
                    ).append(
                      '<div id="ui-overlay" class="ui-close"></div><div id="ui-dialog" tabindex="0" role="dialog" aria-labelledby="ui-dialog-title"><div id="ui-dialog-titlebar"><h1 id="ui-dialog-title"></h1>' +
                        '<button id="ui-dialog-close" class="ui-close" tabindex="0" aria-label="'.concat(
                          L10n.get('close'),
                          '"></button>'
                        ) +
                        '</div><div id="ui-dialog-body"></div></div>'
                    )
                    ;(_$overlay = jQuery($elems.find('#ui-overlay').get(0))),
                      (_$dialog = jQuery($elems.find('#ui-dialog').get(0))),
                      (_$dialogTitle = jQuery(
                        $elems.find('#ui-dialog-title').get(0)
                      )),
                      (_$dialogBody = jQuery(
                        $elems.find('#ui-dialog-body').get(0)
                      )),
                      $elems.insertBefore('body>script#script-sugarcube')
                  }
                }
              },
              isOpen: { value: dialogIsOpen },
              open: { value: dialogOpen },
              resize: {
                value: function (data) {
                  return _resizeHandler(
                    'object' === _typeof(data) ? { data: data } : undefined
                  )
                }
              },
              setup: {
                value: function (title, classNames) {
                  return (
                    _$dialogBody.empty().removeClass(),
                    null != classNames && _$dialogBody.addClass(classNames),
                    _$dialogTitle
                      .empty()
                      .append((null != title ? String(title) : '') || ' '),
                    _$dialogBody.get(0)
                  )
                }
              },
              wiki: {
                value: function () {
                  var _$dialogBody3
                  return (
                    (_$dialogBody3 = _$dialogBody).wiki.apply(
                      _$dialogBody3,
                      arguments
                    ),
                    Dialog
                  )
                }
              },
              addClickHandler: {
                value: function (targets, options, startFn, doneFn, closeFn) {
                  return jQuery(targets).ariaClick(function (ev) {
                    ev.preventDefault(),
                      'function' == typeof startFn && startFn(ev),
                      dialogOpen(options, closeFn),
                      'function' == typeof doneFn && doneFn(ev)
                  })
                }
              }
            }
          )
        )
      })(),
      Engine = (function () {
        var States = Util.toEnum({
            Idle: 'idle',
            Playing: 'playing',
            Rendering: 'rendering'
          }),
          _initDebugViews = [],
          _state = States.Idle,
          _lastPlay = null,
          _outlinePatch = null,
          _updating = null
        function engineGo (offset) {
          var succeded = State.go(offset)
          return succeded && engineShow(), succeded
        }
        function engineShow () {
          return enginePlay(State.passage, !0)
        }
        function enginePlay (title, noHistory) {
          var passageReadyOutput,
            passageDoneOutput,
            passageTitle = title
          if (
            ((_state = States.Playing),
            (TempState = {}),
            State.clearTemporary(),
            'function' == typeof Config.navigation.override)
          )
            try {
              var overrideTitle = Config.navigation.override(passageTitle)
              overrideTitle && (passageTitle = overrideTitle)
            } catch (ex) {}
          var passage = Story.get(passageTitle)
          if (
            (jQuery.event.trigger({ type: ':passageinit', passage: passage }),
            Object.keys(prehistory).forEach(function (task) {
              'function' == typeof prehistory[task] &&
                prehistory[task].call(passage, task)
            }),
            noHistory || State.create(passage.title),
            document.body.className && (document.body.className = ''),
            (_lastPlay = Util.now()),
            Object.keys(predisplay).forEach(function (task) {
              'function' == typeof predisplay[task] &&
                predisplay[task].call(passage, task)
            }),
            Story.has('PassageReady'))
          )
            try {
              passageReadyOutput = Wikifier.wikifyEval(
                Story.get('PassageReady').text
              )
            } catch (ex) {
              console.error(ex), Alert.error('PassageReady', ex.message)
            }
          _state = States.Rendering
          var dataTags =
              passage.tags.length > 0 ? passage.tags.join(' ') : null,
            passageEl = document.createElement('div')
          jQuery(passageEl)
            .attr({
              id: passage.domId,
              'data-passage': passage.title,
              'data-tags': dataTags
            })
            .addClass('passage '.concat(passage.className)),
            jQuery(document.body)
              .attr('data-tags', dataTags)
              .addClass(passage.className),
            jQuery(document.documentElement).attr('data-tags', dataTags),
            jQuery.event.trigger({
              type: ':passagestart',
              content: passageEl,
              passage: passage
            }),
            Object.keys(prerender).forEach(function (task) {
              'function' == typeof prerender[task] &&
                prerender[task].call(passage, passageEl, task)
            }),
            Story.has('PassageHeader') &&
              new Wikifier(passageEl, Story.get('PassageHeader').processText()),
            passageEl.appendChild(passage.render()),
            Story.has('PassageFooter') &&
              new Wikifier(passageEl, Story.get('PassageFooter').processText()),
            jQuery.event.trigger({
              type: ':passagerender',
              content: passageEl,
              passage: passage
            }),
            Object.keys(postrender).forEach(function (task) {
              'function' == typeof postrender[task] &&
                postrender[task].call(passage, passageEl, task)
            })
          var debugView,
            containerEl = document.getElementById('passages')
          if (
            (containerEl.hasChildNodes() &&
              ('number' == typeof Config.passages.transitionOut ||
              ('string' == typeof Config.passages.transitionOut &&
                '' !== Config.passages.transitionOut &&
                Has.transitionEndEvent)
                ? _toConsumableArray(containerEl.childNodes).forEach(function (
                    outgoing
                  ) {
                    var $outgoing = jQuery(outgoing)
                    if (
                      outgoing.nodeType === Node.ELEMENT_NODE &&
                      $outgoing.hasClass('passage')
                    ) {
                      if ($outgoing.hasClass('passage-out')) return
                      $outgoing
                        .attr({
                          id: 'out-'.concat($outgoing.attr('id')),
                          'aria-live': 'off'
                        })
                        .addClass('passage-out'),
                        'string' == typeof Config.passages.transitionOut
                          ? $outgoing.on(Has.transitionEndEvent, function (ev) {
                              ev.propertyName ===
                                Config.passages.transitionOut &&
                                $outgoing.remove()
                            })
                          : setTimeout(function () {
                              return $outgoing.remove()
                            }, Math.max(40, Config.passages.transitionOut))
                    } else $outgoing.remove()
                  })
                : jQuery(containerEl).empty()),
            jQuery(passageEl).addClass('passage-in').appendTo(containerEl),
            setTimeout(function () {
              return jQuery(passageEl).removeClass('passage-in')
            }, 40),
            Story.has('StoryDisplayTitle')
              ? (null === _updating && Config.ui.updateStoryElements) ||
                setDisplayTitle(Story.get('StoryDisplayTitle').processText())
              : Config.passages.displayTitles &&
                passage.title !== Config.passages.start &&
                (document.title = ''
                  .concat(passage.title, ' | ')
                  .concat(Story.title)),
            window.scroll(0, 0),
            (_state = States.Playing),
            Story.has('PassageDone'))
          )
            try {
              passageDoneOutput = Wikifier.wikifyEval(
                Story.get('PassageDone').text
              )
            } catch (ex) {
              console.error(ex), Alert.error('PassageDone', ex.message)
            }
          ;(jQuery.event.trigger({
            type: ':passagedisplay',
            content: passageEl,
            passage: passage
          }),
          Object.keys(postdisplay).forEach(function (task) {
            'function' == typeof postdisplay[task] &&
              postdisplay[task].call(passage, task)
          }),
          null !== _updating
            ? _updating.forEach(function (pair) {
                jQuery(pair.element).empty(),
                  new Wikifier(
                    pair.element,
                    Story.get(pair.passage).processText().trim()
                  )
              })
            : Config.ui.updateStoryElements && UIBar.update(),
          Config.debug) &&
            (null != passageReadyOutput &&
              ((debugView = new DebugView(
                document.createDocumentFragment(),
                'special',
                'PassageReady',
                'PassageReady'
              )).modes({ hidden: !0 }),
              debugView.append(passageReadyOutput),
              jQuery(passageEl).prepend(debugView.output)),
            null != passageDoneOutput &&
              ((debugView = new DebugView(
                document.createDocumentFragment(),
                'special',
                'PassageDone',
                'PassageDone'
              )).modes({ hidden: !0 }),
              debugView.append(passageDoneOutput),
              jQuery(passageEl).append(debugView.output)),
            1 === State.turns &&
              _initDebugViews.length > 0 &&
              jQuery(passageEl).prepend(_initDebugViews))
          switch (
            (jQuery('#story')
              .find('a[href]:not(.link-external)')
              .addClass('link-external')
              .end()
              .find('a,link,button,input,select,textarea')
              .not('[tabindex]')
              .attr('tabindex', 0),
            _typeof(Config.saves.autosave))
          ) {
            case 'boolean':
              Config.saves.autosave && Save.autosave.save()
              break
            case 'object':
              passage.tags.some(function (tag) {
                return Config.saves.autosave.includes(tag)
              }) && Save.autosave.save()
              break
            case 'function':
              Config.saves.autosave() && Save.autosave.save()
          }
          return (
            jQuery.event.trigger({
              type: ':passageend',
              content: passageEl,
              passage: passage
            }),
            (_state = States.Idle),
            (_lastPlay = Util.now()),
            passageEl
          )
        }
        function _hideOutlines () {
          _outlinePatch.set('*:focus{outline:none;}')
        }
        return Object.freeze(
          Object.defineProperties(
            {},
            {
              States: { value: States },
              minDomActionDelay: { value: 40 },
              init: {
                value: function () {
                  var _lastOutlineEvent
                  jQuery('#init-no-js,#init-lacking').remove(),
                    (function () {
                      var $elems = jQuery(document.createDocumentFragment()),
                        markup =
                          Story.has('StoryInterface') &&
                          Story.get('StoryInterface').text.trim()
                      if (markup) {
                        UIBar.destroy(),
                          jQuery(document.head)
                            .find('#style-core-display')
                            .remove(),
                          $elems.append(markup)
                        var $passages = $elems.find('#passages')
                        if (0 === $passages.length)
                          throw new Error(
                            'no element with ID "passages" found within "StoryInterface" special passage'
                          )
                        $passages
                          .empty()
                          .not('[aria-live]')
                          .attr('aria-live', 'polite')
                          .end(),
                          $elems
                            .find('[data-init-passage]')
                            .each(function (i, el) {
                              if ('passages' === el.id)
                                throw new Error(
                                  '"StoryInterface" element <'.concat(
                                    el.nodeName.toLowerCase(),
                                    ' id="passages"> must not contain a "data-init-passage" content attribute'
                                  )
                                )
                              var passage = el
                                .getAttribute('data-init-passage')
                                .trim()
                              if (el.hasAttribute('data-passage'))
                                throw new Error(
                                  '"StoryInterface" element <'
                                    .concat(
                                      el.nodeName.toLowerCase(),
                                      ' data-init-passage="'
                                    )
                                    .concat(
                                      passage,
                                      '"> must not contain a "data-passage" content attribute'
                                    )
                                )
                              if (null !== el.firstElementChild)
                                throw new Error(
                                  '"StoryInterface" element <'
                                    .concat(
                                      el.nodeName.toLowerCase(),
                                      ' data-init-passage="'
                                    )
                                    .concat(
                                      passage,
                                      '"> contains child elements'
                                    )
                                )
                              Story.has(passage) &&
                                jQuery(el)
                                  .empty()
                                  .wiki(Story.get(passage).processText().trim())
                            })
                        var updating = []
                        $elems.find('[data-passage]').each(function (i, el) {
                          if ('passages' === el.id)
                            throw new Error(
                              '"StoryInterface" element <'.concat(
                                el.nodeName.toLowerCase(),
                                ' id="passages"> must not contain a "data-passage" content attribute'
                              )
                            )
                          var passage = el.getAttribute('data-passage').trim()
                          if (null !== el.firstElementChild)
                            throw new Error(
                              '"StoryInterface" element <'
                                .concat(
                                  el.nodeName.toLowerCase(),
                                  ' data-passage="'
                                )
                                .concat(passage, '"> contains child elements')
                            )
                          Story.has(passage) &&
                            updating.push({ passage: passage, element: el })
                        }),
                          updating.length > 0 && (_updating = updating),
                          (Config.ui.updateStoryElements = !1)
                      } else
                        $elems.append(
                          '<div id="story" role="main"><div id="passages" aria-live="polite"></div></div>'
                        )
                      $elems.insertBefore('body>script#script-sugarcube')
                    })(),
                    (_outlinePatch = new StyleWrapper(
                      jQuery(document.createElement('style'))
                        .attr({ id: 'style-aria-outlines', type: 'text/css' })
                        .appendTo(document.head)
                        .get(0)
                    )),
                    _hideOutlines(),
                    jQuery(document).on(
                      'mousedown.aria-outlines keydown.aria-outlines',
                      function (ev) {
                        ev.type !== _lastOutlineEvent &&
                          ((_lastOutlineEvent = ev.type),
                          'keydown' === ev.type
                            ? _outlinePatch.clear()
                            : _hideOutlines())
                      }
                    )
                }
              },
              start: {
                value: function () {
                  if (
                    (Story.getAllInit().forEach(function (passage) {
                      try {
                        var debugBuffer = Wikifier.wikifyEval(passage.text)
                        if (Config.debug) {
                          var debugView = new DebugView(
                            document.createDocumentFragment(),
                            'special',
                            ''.concat(passage.title, ' [init-tagged]'),
                            ''.concat(passage.title, ' [init-tagged]')
                          )
                          debugView.modes({ hidden: !0 }),
                            debugView.append(debugBuffer),
                            _initDebugViews.push(debugView.output)
                        }
                      } catch (ex) {
                        console.error(ex),
                          Alert.error(
                            ''.concat(passage.title, ' [init-tagged]'),
                            'object' === _typeof(ex) ? ex.message : ex
                          )
                      }
                    }),
                    Story.has('StoryInit'))
                  )
                    try {
                      var debugBuffer = Wikifier.wikifyEval(
                        Story.get('StoryInit').text
                      )
                      if (Config.debug) {
                        var debugView = new DebugView(
                          document.createDocumentFragment(),
                          'special',
                          'StoryInit',
                          'StoryInit'
                        )
                        debugView.modes({ hidden: !0 }),
                          debugView.append(debugBuffer),
                          _initDebugViews.push(debugView.output)
                      }
                    } catch (ex) {
                      console.error(ex),
                        Alert.error(
                          'StoryInit',
                          'object' === _typeof(ex) ? ex.message : ex
                        )
                    }
                  if (null == Config.passages.start)
                    throw new Error('starting passage not selected')
                  if (!Story.has(Config.passages.start))
                    throw new Error(
                      'starting passage ("'.concat(
                        Config.passages.start,
                        '") not found'
                      )
                    )
                  if (
                    (jQuery(document.documentElement).focus(), State.restore())
                  )
                    engineShow()
                  else {
                    var loadStart = !0
                    switch (_typeof(Config.saves.autoload)) {
                      case 'boolean':
                        Config.saves.autoload &&
                          Save.autosave.ok() &&
                          Save.autosave.has() &&
                          (loadStart = !Save.autosave.load())
                        break
                      case 'string':
                        'prompt' === Config.saves.autoload &&
                          Save.autosave.ok() &&
                          Save.autosave.has() &&
                          ((loadStart = !1), UI.buildAutoload(), Dialog.open())
                        break
                      case 'function':
                        Save.autosave.ok() &&
                          Save.autosave.has() &&
                          Config.saves.autoload() &&
                          (loadStart = !Save.autosave.load())
                    }
                    loadStart && enginePlay(Config.passages.start)
                  }
                }
              },
              restart: {
                value: function () {
                  LoadScreen.show(),
                    window.scroll(0, 0),
                    State.reset(),
                    jQuery.event.trigger(':enginerestart'),
                    window.location.reload()
                }
              },
              state: {
                get: function () {
                  return _state
                }
              },
              isIdle: {
                value: function () {
                  return _state === States.Idle
                }
              },
              isPlaying: {
                value: function () {
                  return _state !== States.Idle
                }
              },
              isRendering: {
                value: function () {
                  return _state === States.Rendering
                }
              },
              lastPlay: {
                get: function () {
                  return _lastPlay
                }
              },
              goTo: {
                value: function (idx) {
                  var succeded = State.goTo(idx)
                  return succeded && engineShow(), succeded
                }
              },
              go: { value: engineGo },
              backward: {
                value: function () {
                  return engineGo(-1)
                }
              },
              forward: {
                value: function () {
                  return engineGo(1)
                }
              },
              show: { value: engineShow },
              play: { value: enginePlay },
              display: {
                value: function (title, link, option) {
                  var noHistory = !1
                  switch (option) {
                    case undefined:
                      break
                    case 'replace':
                    case 'back':
                      noHistory = !0
                      break
                    default:
                      throw new Error(
                        'Engine.display option parameter called with obsolete value "'.concat(
                          option,
                          '"; please notify the developer'
                        )
                      )
                  }
                  enginePlay(title, noHistory)
                }
              }
            }
          )
        )
      })(),
      Passage =
        ((_tagsToSkip = /^(?:debug|nobr|passage|widget|twine\..*)$/i),
        (function () {
          function Passage (title, el) {
            var _this22 = this
            _classCallCheck(this, Passage),
              Object.defineProperties(this, {
                title: { value: Util.unescape(title) },
                element: { value: el || null },
                tags: {
                  value: Object.freeze(
                    el && el.hasAttribute('tags')
                      ? Array.from(
                          new Set(
                            el.getAttribute('tags').trim().splitOrEmpty(/\s+/)
                          )
                        )
                      : []
                  )
                },
                _excerpt: { writable: !0, value: null }
              }),
              Object.defineProperties(this, {
                domId: { value: 'passage-'.concat(Util.slugify(this.title)) },
                classes: {
                  value: Object.freeze(
                    0 === this.tags.length
                      ? []
                      : _this22.tags
                          .filter(function (tag) {
                            return !_tagsToSkip.test(tag)
                          })
                          .map(function (tag) {
                            return Util.slugify(tag)
                          })
                  )
                }
              })
          }
          return (
            _createClass(
              Passage,
              [
                {
                  key: 'className',
                  get: function () {
                    return this.classes.join(' ')
                  }
                },
                {
                  key: 'text',
                  get: function () {
                    if (null == this.element) {
                      var passage = Util.escapeMarkup(this.title),
                        mesg = ''
                          .concat(L10n.get('errorTitle'), ': ')
                          .concat(
                            L10n.get('errorNonexistentPassage', {
                              passage: passage
                            })
                          )
                      return '<div class="error-view"><span class="error">'.concat(
                        mesg,
                        '</span></div>'
                      )
                    }
                    return this.element.textContent.replace(/\r/g, '')
                  }
                },
                {
                  key: 'description',
                  value: function () {
                    var descriptions = Config.passages.descriptions
                    switch (_typeof(descriptions)) {
                      case 'boolean':
                        if (descriptions) return this.title
                        break
                      case 'object':
                        if (descriptions.hasOwnProperty(this.title))
                          return descriptions[this.title]
                        break
                      case 'function':
                        var result = descriptions.call(this)
                        if (result) return result
                    }
                    return (
                      null === this._excerpt &&
                        (this._excerpt = Passage.getExcerptFromText(this.text)),
                      this._excerpt
                    )
                  }
                },
                {
                  key: 'processText',
                  value: function () {
                    if (null == this.element) return this.text
                    if (this.tags.includes('Twine.image'))
                      return '[img['.concat(this.text, ']]')
                    var processed = this.text
                    return (
                      Config.passages.onProcess &&
                        (processed = Config.passages.onProcess.call(null, {
                          title: this.title,
                          tags: this.tags,
                          text: processed
                        })),
                      (Config.passages.nobr || this.tags.includes('nobr')) &&
                        (processed = processed
                          .replace(/^\n+|\n+$/g, '')
                          .replace(/\n+/g, ' ')),
                      processed
                    )
                  }
                },
                {
                  key: 'render',
                  value: function (options) {
                    var frag = document.createDocumentFragment()
                    return (
                      new Wikifier(frag, this.processText(), options),
                      (this._excerpt = Passage.getExcerptFromNode(frag)),
                      frag
                    )
                  }
                }
              ],
              [
                {
                  key: 'getExcerptFromNode',
                  value: function (node, count) {
                    if (!node.hasChildNodes()) return ''
                    var excerpt = node.textContent.trim()
                    if ('' !== excerpt) {
                      var excerptRe = new RegExp(
                        '(\\S+(?:\\s+\\S+){0,'.concat(
                          count > 0 ? count - 1 : 7,
                          '})'
                        )
                      )
                      excerpt = excerpt.replace(/\s+/g, ' ').match(excerptRe)
                    }
                    return excerpt ? ''.concat(excerpt[1], '…') : '…'
                  }
                },
                {
                  key: 'getExcerptFromText',
                  value: function (text, count) {
                    if ('' === text) return ''
                    var excerptRe = new RegExp(
                        '(\\S+(?:\\s+\\S+){0,'.concat(
                          count > 0 ? count - 1 : 7,
                          '})'
                        )
                      ),
                      excerpt = text
                        .replace(/<<.*?>>/g, ' ')
                        .replace(/<.*?>/g, ' ')
                        .trim()
                        .replace(/^\s*\|.*\|.*?$/gm, '')
                        .replace(/\[[<>]?img\[[^\]]*\]\]/g, '')
                        .replace(
                          /\[\[([^|\]]*?)(?:(?:\||->|<-)[^\]]*)?\]\]/g,
                          '$1'
                        )
                        .replace(/^\s*!+(.*?)$/gm, '$1')
                        .replace(/'{2}|\/{2}|_{2}|@{2}/g, '')
                        .trim()
                        .replace(/\s+/g, ' ')
                        .match(excerptRe)
                    return excerpt ? ''.concat(excerpt[1], '…') : '…'
                  }
                }
              ]
            ),
            Passage
          )
        })()),
      _tagsToSkip,
      Save = (function () {
        var Type = Util.toEnum({
            Autosave: 'autosave',
            Disk: 'disk',
            Serialize: 'serialize',
            Slot: 'slot'
          }),
          _slotsUBound = -1,
          _onLoadHandlers = new Set(),
          _onSaveHandlers = new Set()
        function savesObjGet () {
          var saves = storage.get('saves')
          return null === saves
            ? { autosave: null, slots: _appendSlots([], Config.saves.slots) }
            : saves
        }
        function savesObjClear () {
          return storage.delete('saves'), !0
        }
        function autosaveOk () {
          return 'cookie' !== storage.name && void 0 !== Config.saves.autosave
        }
        function slotsOk () {
          return 'cookie' !== storage.name && -1 !== _slotsUBound
        }
        function slotsCount () {
          if (!slotsOk()) return 0
          for (
            var saves = savesObjGet(),
              count = 0,
              i = 0,
              iend = saves.slots.length;
            i < iend;
            ++i
          )
            null !== saves.slots[i] && ++count
          return count
        }
        function _appendSlots (array, num) {
          for (var i = 0; i < num; ++i) array.push(null)
          return array
        }
        function _savesObjIsEmpty (saves) {
          for (
            var slots = saves.slots,
              isSlotsEmpty = !0,
              i = 0,
              iend = slots.length;
            i < iend;
            ++i
          )
            if (null !== slots[i]) {
              isSlotsEmpty = !1
              break
            }
          return null === saves.autosave && isSlotsEmpty
        }
        function _savesObjSave (saves) {
          return _savesObjIsEmpty(saves)
            ? (storage.delete('saves'), !0)
            : storage.set('saves', saves)
        }
        function _savesObjUpdate (saveObj) {
          if (null == saveObj || 'object' !== _typeof(saveObj)) return !1
          var updated = !1
          return (
            (saveObj.hasOwnProperty('state') &&
              saveObj.state.hasOwnProperty('delta') &&
              saveObj.state.hasOwnProperty('index')) ||
              (saveObj.hasOwnProperty('data')
                ? (delete saveObj.mode,
                  (saveObj.state = { delta: State.deltaEncode(saveObj.data) }),
                  delete saveObj.data)
                : saveObj.state.hasOwnProperty('delta')
                ? saveObj.state.hasOwnProperty('index') ||
                  delete saveObj.state.mode
                : (delete saveObj.state.mode,
                  (saveObj.state.delta = State.deltaEncode(
                    saveObj.state.history
                  )),
                  delete saveObj.state.history),
              (saveObj.state.index = saveObj.state.delta.length - 1),
              (updated = !0)),
            saveObj.state.hasOwnProperty('rseed') &&
              ((saveObj.state.seed = saveObj.state.rseed),
              delete saveObj.state.rseed,
              saveObj.state.delta.forEach(function (_, i, delta) {
                delta[i].hasOwnProperty('rcount') &&
                  ((delta[i].pull = delta[i].rcount), delete delta[i].rcount)
              }),
              (updated = !0)),
            ((saveObj.state.hasOwnProperty('expired') &&
              'number' == typeof saveObj.state.expired) ||
              saveObj.state.hasOwnProperty('unique') ||
              saveObj.state.hasOwnProperty('last')) &&
              (saveObj.state.hasOwnProperty('expired') &&
                'number' == typeof saveObj.state.expired &&
                delete saveObj.state.expired,
              (saveObj.state.hasOwnProperty('unique') ||
                saveObj.state.hasOwnProperty('last')) &&
                ((saveObj.state.expired = []),
                saveObj.state.hasOwnProperty('unique') &&
                  (saveObj.state.expired.push(saveObj.state.unique),
                  delete saveObj.state.unique),
                saveObj.state.hasOwnProperty('last') &&
                  (saveObj.state.expired.push(saveObj.state.last),
                  delete saveObj.state.last)),
              (updated = !0)),
            updated
          )
        }
        function _marshal (supplemental, details) {
          if (null != supplemental && 'object' !== _typeof(supplemental))
            throw new Error('supplemental parameter must be an object')
          var saveObj = Object.assign({}, supplemental, {
            id: Config.saves.id,
            state: State.marshalForSave()
          })
          return (
            Config.saves.version && (saveObj.version = Config.saves.version),
            _onSaveHandlers.forEach(function (fn) {
              return fn(saveObj, details)
            }),
            (saveObj.state.delta = State.deltaEncode(saveObj.state.history)),
            delete saveObj.state.history,
            saveObj
          )
        }
        function _unmarshal (saveObj) {
          try {
            if (
              (_savesObjUpdate(saveObj),
              !saveObj ||
                !saveObj.hasOwnProperty('id') ||
                !saveObj.hasOwnProperty('state'))
            )
              throw new Error(L10n.get('errorSaveMissingData'))
            if (
              ((saveObj.state.history = State.deltaDecode(saveObj.state.delta)),
              delete saveObj.state.delta,
              _onLoadHandlers.forEach(function (fn) {
                return fn(saveObj)
              }),
              saveObj.id !== Config.saves.id)
            )
              throw new Error(L10n.get('errorSaveIdMismatch'))
            State.unmarshalForSave(saveObj.state), Engine.show()
          } catch (ex) {
            return (
              UI.alert(
                ''
                  .concat(ex.message.toUpperFirst(), '.</p><p>')
                  .concat(L10n.get('aborting'), '.')
              ),
              !1
            )
          }
          return !0
        }
        return Object.freeze(
          Object.defineProperties(
            {},
            {
              init: {
                value: function () {
                  if ('cookie' === storage.name)
                    return (
                      savesObjClear(),
                      (Config.saves.autoload = undefined),
                      (Config.saves.autosave = undefined),
                      (Config.saves.slots = 0),
                      !1
                    )
                  var saves = savesObjGet(),
                    updated = !1
                  Array.isArray(saves) &&
                    ((saves = { autosave: null, slots: saves }),
                    (updated = !0)),
                    Config.saves.slots !== saves.slots.length &&
                      (Config.saves.slots < saves.slots.length
                        ? (saves.slots.reverse(),
                          (saves.slots = saves.slots.filter(
                            function (val) {
                              return (
                                !(null === val && this.count > 0) ||
                                (--this.count, !1)
                              )
                            },
                            { count: saves.slots.length - Config.saves.slots }
                          )),
                          saves.slots.reverse())
                        : Config.saves.slots > saves.slots.length &&
                          _appendSlots(
                            saves.slots,
                            Config.saves.slots - saves.slots.length
                          ),
                      (updated = !0)),
                    _savesObjUpdate(saves.autosave) && (updated = !0)
                  for (var i = 0; i < saves.slots.length; ++i)
                    _savesObjUpdate(saves.slots[i]) && (updated = !0)
                  return (
                    _savesObjIsEmpty(saves) &&
                      (storage.delete('saves'), (updated = !1)),
                    updated && _savesObjSave(saves),
                    (_slotsUBound = saves.slots.length - 1),
                    !0
                  )
                }
              },
              get: { value: savesObjGet },
              clear: { value: savesObjClear },
              ok: {
                value: function () {
                  return autosaveOk() || slotsOk()
                }
              },
              autosave: {
                value: Object.freeze(
                  Object.defineProperties(
                    {},
                    {
                      ok: { value: autosaveOk },
                      has: {
                        value: function () {
                          return null !== savesObjGet().autosave
                        }
                      },
                      get: {
                        value: function () {
                          return savesObjGet().autosave
                        }
                      },
                      load: {
                        value: function () {
                          var saves = savesObjGet()
                          return (
                            null !== saves.autosave &&
                            _unmarshal(saves.autosave)
                          )
                        }
                      },
                      save: {
                        value: function (title, metadata) {
                          if (
                            'function' == typeof Config.saves.isAllowed &&
                            !Config.saves.isAllowed()
                          )
                            return !1
                          var saves = savesObjGet(),
                            supplemental = {
                              title:
                                title || Story.get(State.passage).description(),
                              date: Date.now()
                            }
                          return (
                            null != metadata &&
                              (supplemental.metadata = metadata),
                            (saves.autosave = _marshal(supplemental, {
                              type: Type.Autosave
                            })),
                            _savesObjSave(saves)
                          )
                        }
                      },
                      delete: {
                        value: function () {
                          var saves = savesObjGet()
                          return (saves.autosave = null), _savesObjSave(saves)
                        }
                      }
                    }
                  )
                )
              },
              slots: {
                value: Object.freeze(
                  Object.defineProperties(
                    {},
                    {
                      ok: { value: slotsOk },
                      length: {
                        get: function () {
                          return _slotsUBound + 1
                        }
                      },
                      isEmpty: {
                        value: function () {
                          return 0 === slotsCount()
                        }
                      },
                      count: { value: slotsCount },
                      has: {
                        value: function (slot) {
                          if (slot < 0 || slot > _slotsUBound) return !1
                          var saves = savesObjGet()
                          return !(
                            slot >= saves.slots.length ||
                            null === saves.slots[slot]
                          )
                        }
                      },
                      get: {
                        value: function (slot) {
                          if (slot < 0 || slot > _slotsUBound) return null
                          var saves = savesObjGet()
                          return slot >= saves.slots.length
                            ? null
                            : saves.slots[slot]
                        }
                      },
                      load: {
                        value: function (slot) {
                          if (slot < 0 || slot > _slotsUBound) return !1
                          var saves = savesObjGet()
                          return (
                            !(
                              slot >= saves.slots.length ||
                              null === saves.slots[slot]
                            ) && _unmarshal(saves.slots[slot])
                          )
                        }
                      },
                      save: {
                        value: function (slot, title, metadata) {
                          if (
                            'function' == typeof Config.saves.isAllowed &&
                            !Config.saves.isAllowed()
                          )
                            return (
                              Dialog.isOpen()
                                ? $(document).one(':dialogclosed', function () {
                                    return UI.alert(L10n.get('savesDisallowed'))
                                  })
                                : UI.alert(L10n.get('savesDisallowed')),
                              !1
                            )
                          if (slot < 0 || slot > _slotsUBound) return !1
                          var saves = savesObjGet()
                          if (slot >= saves.slots.length) return !1
                          var supplemental = {
                            title:
                              title || Story.get(State.passage).description(),
                            date: Date.now()
                          }
                          return (
                            null != metadata &&
                              (supplemental.metadata = metadata),
                            (saves.slots[slot] = _marshal(supplemental, {
                              type: Type.Slot
                            })),
                            _savesObjSave(saves)
                          )
                        }
                      },
                      delete: {
                        value: function (slot) {
                          if (slot < 0 || slot > _slotsUBound) return !1
                          var saves = savesObjGet()
                          return (
                            !(slot >= saves.slots.length) &&
                            ((saves.slots[slot] = null), _savesObjSave(saves))
                          )
                        }
                      }
                    }
                  )
                )
              },
              export: {
                value: function (filename, metadata) {
                  if (
                    'function' != typeof Config.saves.isAllowed ||
                    Config.saves.isAllowed()
                  ) {
                    var str,
                      now,
                      MM,
                      DD,
                      hh,
                      mm,
                      ss,
                      baseName =
                        null == filename
                          ? Story.domId
                          : ((str = filename),
                            Util.sanitizeFilename(str).replace(
                              /[_\s\u2013\u2014-]+/g,
                              '-'
                            )),
                      saveName = ''
                        .concat(baseName, '-')
                        .concat(
                          ((now = new Date()),
                          (MM = now.getMonth() + 1),
                          (DD = now.getDate()),
                          (hh = now.getHours()),
                          (mm = now.getMinutes()),
                          (ss = now.getSeconds()),
                          MM < 10 && (MM = '0'.concat(MM)),
                          DD < 10 && (DD = '0'.concat(DD)),
                          hh < 10 && (hh = '0'.concat(hh)),
                          mm < 10 && (mm = '0'.concat(mm)),
                          ss < 10 && (ss = '0'.concat(ss)),
                          ''
                            .concat(now.getFullYear())
                            .concat(MM)
                            .concat(DD, '-')
                            .concat(hh)
                            .concat(mm)
                            .concat(ss)),
                          '.save'
                        ),
                      supplemental =
                        null == metadata ? {} : { metadata: metadata },
                      saveObj = LZString.compressToBase64(
                        JSON.stringify(
                          _marshal(supplemental, { type: Type.Disk })
                        )
                      )
                    saveAs(
                      new Blob([saveObj], { type: 'text/plain;charset=UTF-8' }),
                      saveName
                    )
                  } else
                    Dialog.isOpen()
                      ? $(document).one(':dialogclosed', function () {
                          return UI.alert(L10n.get('savesDisallowed'))
                        })
                      : UI.alert(L10n.get('savesDisallowed'))
                }
              },
              import: {
                value: function (event) {
                  var file = event.target.files[0],
                    reader = new FileReader()
                  jQuery(reader).one('loadend', function () {
                    if (reader.error) {
                      var ex = reader.error
                      UI.alert(
                        ''
                          .concat(
                            L10n.get('errorSaveDiskLoadFailed').toUpperFirst(),
                            ' ('
                          )
                          .concat(ex.name, ': ')
                          .concat(ex.message, ').</p><p>')
                          .concat(L10n.get('aborting'), '.')
                      )
                    } else {
                      var saveObj
                      try {
                        saveObj = JSON.parse(
                          /\.json$/i.test(file.name) ||
                            /^\{/.test(reader.result)
                            ? reader.result
                            : LZString.decompressFromBase64(reader.result)
                        )
                      } catch (ex) {}
                      _unmarshal(saveObj)
                    }
                  }),
                    reader.readAsText(file)
                }
              },
              serialize: {
                value: function (metadata) {
                  if (
                    'function' == typeof Config.saves.isAllowed &&
                    !Config.saves.isAllowed()
                  )
                    return (
                      Dialog.isOpen()
                        ? $(document).one(':dialogclosed', function () {
                            return UI.alert(L10n.get('savesDisallowed'))
                          })
                        : UI.alert(L10n.get('savesDisallowed')),
                      null
                    )
                  var supplemental =
                    null == metadata ? {} : { metadata: metadata }
                  return LZString.compressToBase64(
                    JSON.stringify(
                      _marshal(supplemental, { type: Type.Serialize })
                    )
                  )
                }
              },
              deserialize: {
                value: function (base64Str) {
                  var saveObj
                  try {
                    saveObj = JSON.parse(
                      LZString.decompressFromBase64(base64Str)
                    )
                  } catch (ex) {}
                  return _unmarshal(saveObj) ? saveObj.metadata : null
                }
              },
              onLoad: {
                value: Object.freeze(
                  Object.defineProperties(
                    {},
                    {
                      add: {
                        value: function (handler) {
                          var valueType = Util.getType(handler)
                          if ('function' !== valueType)
                            throw new TypeError(
                              'Save.onLoad.add handler parameter must be a function (received: '.concat(
                                valueType,
                                ')'
                              )
                            )
                          _onLoadHandlers.add(handler)
                        }
                      },
                      clear: {
                        value: function () {
                          _onLoadHandlers.clear()
                        }
                      },
                      delete: {
                        value: function (handler) {
                          return _onLoadHandlers.delete(handler)
                        }
                      },
                      size: {
                        get: function () {
                          return _onLoadHandlers.size
                        }
                      }
                    }
                  )
                )
              },
              onSave: {
                value: Object.freeze(
                  Object.defineProperties(
                    {},
                    {
                      add: {
                        value: function (handler) {
                          var valueType = Util.getType(handler)
                          if ('function' !== valueType)
                            throw new TypeError(
                              'Save.onSave.add handler parameter must be a function (received: '.concat(
                                valueType,
                                ')'
                              )
                            )
                          _onSaveHandlers.add(handler)
                        }
                      },
                      clear: {
                        value: function () {
                          _onSaveHandlers.clear()
                        }
                      },
                      delete: {
                        value: function (handler) {
                          return _onSaveHandlers.delete(handler)
                        }
                      },
                      size: {
                        get: function () {
                          return _onSaveHandlers.size
                        }
                      }
                    }
                  )
                )
              }
            }
          )
        )
      })(),
      Setting = (function () {
        var Types = Util.toEnum({ Header: 0, Toggle: 1, List: 2, Range: 3 }),
          _definitions = []
        function settingsCreate () {
          return Object.create(null)
        }
        function settingsSave () {
          var savedSettings = settingsCreate()
          return (
            Object.keys(settings).length > 0 &&
              _definitions
                .filter(function (def) {
                  return (
                    def.type !== Types.Header &&
                    settings[def.name] !== def.default
                  )
                })
                .forEach(function (def) {
                  return (savedSettings[def.name] = settings[def.name])
                }),
            0 === Object.keys(savedSettings).length
              ? (storage.delete('settings'), !0)
              : storage.set('settings', savedSettings)
          )
        }
        function settingsLoad () {
          var defaultSettings = settingsCreate(),
            loadedSettings = storage.get('settings') || settingsCreate()
          _definitions
            .filter(function (def) {
              return def.type !== Types.Header
            })
            .forEach(function (def) {
              return (defaultSettings[def.name] = def.default)
            }),
            (window.SugarCube.settings = settings =
              Object.assign(defaultSettings, loadedSettings))
        }
        function settingsClear () {
          return (
            (window.SugarCube.settings = settings = settingsCreate()),
            storage.delete('settings'),
            !0
          )
        }
        function definitionsAdd (type, name, def) {
          if (arguments.length < 3) {
            var errors = []
            throw (
              (arguments.length < 1 && errors.push('type'),
              arguments.length < 2 && errors.push('name'),
              arguments.length < 3 && errors.push('definition'),
              new Error(
                'missing parameters, no '.concat(
                  errors.join(' or '),
                  ' specified'
                )
              ))
            )
          }
          if ('object' !== _typeof(def))
            throw new TypeError('definition parameter must be an object')
          if (definitionsHas(name))
            throw new Error(
              'cannot clobber existing setting "'.concat(name, '"')
            )
          var str,
            pos,
            definition = {
              type: type,
              name: name,
              label: 'string' == typeof def.label ? def.label.trim() : ''
            }
          if ('string' == typeof def.desc) {
            var desc = def.desc.trim()
            '' !== desc && (definition.desc = desc)
          }
          switch (type) {
            case Types.Header:
              break
            case Types.Toggle:
              definition.default = !!def.default
              break
            case Types.List:
              if (!def.hasOwnProperty('list'))
                throw new Error('no list specified')
              if (!Array.isArray(def.list))
                throw new TypeError('list must be an array')
              if (0 === def.list.length)
                throw new Error('list must not be empty')
              if (
                ((definition.list = Object.freeze(def.list)),
                null == def.default)
              )
                definition.default = def.list[0]
              else {
                var defaultIndex = def.list.indexOf(def.default)
                if (-1 === defaultIndex)
                  throw new Error('list does not contain default')
                definition.default = def.list[defaultIndex]
              }
              break
            case Types.Range:
              if (!def.hasOwnProperty('min'))
                throw new Error('no min specified')
              if (
                'number' != typeof def.min ||
                Number.isNaN(def.min) ||
                !Number.isFinite(def.min)
              )
                throw new TypeError('min must be a finite number')
              if (!def.hasOwnProperty('max'))
                throw new Error('no max specified')
              if (
                'number' != typeof def.max ||
                Number.isNaN(def.max) ||
                !Number.isFinite(def.max)
              )
                throw new TypeError('max must be a finite number')
              if (!def.hasOwnProperty('step'))
                throw new Error('no step specified')
              if (
                'number' != typeof def.step ||
                Number.isNaN(def.step) ||
                !Number.isFinite(def.step) ||
                def.step <= 0
              )
                throw new TypeError(
                  'step must be a finite number greater than zero'
                )
              var stepValidate = function (value) {
                  if (fracDigits > 0) {
                    var ma = Number(''.concat(def.min, 'e').concat(fracDigits)),
                      sa = Number(''.concat(def.step, 'e').concat(fracDigits)),
                      _va =
                        Number(''.concat(value, 'e').concat(fracDigits)) - ma
                    return Number(
                      ''.concat(_va - (_va % sa) + ma, 'e-').concat(fracDigits)
                    )
                  }
                  var va = value - def.min
                  return va - (va % def.step) + def.min
                },
                fracDigits =
                  ((str = String(def.step)),
                  -1 === (pos = str.lastIndexOf('.'))
                    ? 0
                    : str.length - pos - 1)
              if (stepValidate(def.max) !== def.max)
                throw new RangeError(
                  'max ('
                    .concat(def.max, ') is not a multiple of the step (')
                    .concat(def.step, ') plus the min (')
                    .concat(def.min, ')')
                )
              if (
                ((definition.max = def.max),
                (definition.min = def.min),
                (definition.step = def.step),
                null == def.default)
              )
                definition.default = def.max
              else {
                if (
                  'number' != typeof def.default ||
                  Number.isNaN(def.default) ||
                  !Number.isFinite(def.default)
                )
                  throw new TypeError('default must be a finite number')
                if (def.default < def.min)
                  throw new RangeError(
                    'default ('
                      .concat(def.default, ') is less than min (')
                      .concat(def.min, ')')
                  )
                if (def.default > def.max)
                  throw new RangeError(
                    'default ('
                      .concat(def.default, ') is greater than max (')
                      .concat(def.max, ')')
                  )
                definition.default = def.default
              }
              break
            default:
              throw new Error('unknown Setting type: '.concat(type))
          }
          'function' == typeof def.onInit &&
            (definition.onInit = Object.freeze(def.onInit)),
            'function' == typeof def.onChange &&
              (definition.onChange = Object.freeze(def.onChange)),
            _definitions.push(Object.freeze(definition))
        }
        function definitionsHas (name) {
          return _definitions.some(function (definition) {
            return definition.name === name
          })
        }
        function definitionsGet (name) {
          return _definitions.find(function (definition) {
            return definition.name === name
          })
        }
        return Object.freeze(
          Object.defineProperties(
            {},
            {
              Types: { value: Types },
              init: {
                value: function () {
                  if (storage.has('options')) {
                    var old = storage.get('options')
                    null !== old &&
                      (window.SugarCube.settings = settings =
                        Object.assign(settingsCreate(), old)),
                      settingsSave(),
                      storage.delete('options')
                  }
                  settingsLoad(),
                    _definitions.forEach(function (def) {
                      if (def.hasOwnProperty('onInit')) {
                        var thisArg = {
                          name: def.name,
                          value: settings[def.name],
                          default: def.default
                        }
                        def.hasOwnProperty('list') && (thisArg.list = def.list),
                          def.onInit.call(thisArg)
                      }
                    })
                }
              },
              create: { value: settingsCreate },
              save: { value: settingsSave },
              load: { value: settingsLoad },
              clear: { value: settingsClear },
              reset: {
                value: function (name) {
                  if (0 === arguments.length) settingsClear(), settingsLoad()
                  else {
                    if (null == name || !definitionsHas(name))
                      throw new Error('nonexistent setting "'.concat(name, '"'))
                    var def = definitionsGet(name)
                    def.type !== Types.Header && (settings[name] = def.default)
                  }
                  return settingsSave()
                }
              },
              forEach: {
                value: function (callback, thisArg) {
                  _definitions.forEach(callback, thisArg)
                }
              },
              add: { value: definitionsAdd },
              addHeader: {
                value: function (name, desc) {
                  definitionsAdd(Types.Header, name, { desc: desc })
                }
              },
              addToggle: {
                value: function () {
                  for (
                    var _len16 = arguments.length,
                      args = new Array(_len16),
                      _key16 = 0;
                    _key16 < _len16;
                    _key16++
                  )
                    args[_key16] = arguments[_key16]
                  definitionsAdd.apply(void 0, [Types.Toggle].concat(args))
                }
              },
              addList: {
                value: function () {
                  for (
                    var _len17 = arguments.length,
                      args = new Array(_len17),
                      _key17 = 0;
                    _key17 < _len17;
                    _key17++
                  )
                    args[_key17] = arguments[_key17]
                  definitionsAdd.apply(void 0, [Types.List].concat(args))
                }
              },
              addRange: {
                value: function () {
                  for (
                    var _len18 = arguments.length,
                      args = new Array(_len18),
                      _key18 = 0;
                    _key18 < _len18;
                    _key18++
                  )
                    args[_key18] = arguments[_key18]
                  definitionsAdd.apply(void 0, [Types.Range].concat(args))
                }
              },
              isEmpty: {
                value: function () {
                  return 0 === _definitions.length
                }
              },
              has: { value: definitionsHas },
              get: { value: definitionsGet },
              delete: {
                value: function definitionsDelete (name) {
                  definitionsHas(name) && delete settings[name]
                  for (var i = 0; i < _definitions.length; ++i)
                    if (_definitions[i].name === name) {
                      _definitions.splice(i, 1), definitionsDelete(name)
                      break
                    }
                }
              }
            }
          )
        )
      })(),
      Story = (function () {
        var _passages = {},
          _inits = [],
          _scripts = [],
          _styles = [],
          _widgets = [],
          _title = '',
          _ifId = '',
          _domId = ''
        function _storySetTitle (rawTitle) {
          if (null == rawTitle)
            throw new Error('story title must not be null or undefined')
          var title = Util.unescape(String(rawTitle)).trim()
          if ('' === title)
            throw new Error(
              'story title must not be empty or consist solely of whitespace'
            )
          if (
            ((document.title = _title = title),
            '' === (_domId = Util.slugify(_title)))
          )
            if ('' !== _ifId) _domId = _ifId
            else
              for (var i = 0, len = _title.length; i < len; ++i) {
                var _Util$charAndPosAt2 = Util.charAndPosAt(_title, i),
                  char = _Util$charAndPosAt2.char,
                  start = _Util$charAndPosAt2.start,
                  end = _Util$charAndPosAt2.end
                ;(_domId += char.codePointAt(0).toString(16)),
                  (i += end - start)
              }
        }
        return Object.freeze(
          Object.defineProperties(
            {},
            {
              load: {
                value: function () {
                  var validationCodeTags = ['init', 'widget'],
                    validationNoCodeTagPassages = [
                      'PassageDone',
                      'PassageFooter',
                      'PassageHeader',
                      'PassageReady',
                      'StoryAuthor',
                      'StoryBanner',
                      'StoryCaption',
                      'StoryInit',
                      'StoryMenu',
                      'StoryShare',
                      'StorySubtitle'
                    ]
                  function validateStartingPassage (passage) {
                    if (passage.tags.includesAny(validationCodeTags))
                      throw new Error(
                        'starting passage "'
                          .concat(
                            passage.title,
                            '" contains special tags; invalid: "'
                          )
                          .concat(
                            passage.tags
                              .filter(function (tag) {
                                return validationCodeTags.includes(tag)
                              })
                              .sort()
                              .join('", "'),
                            '"'
                          )
                      )
                  }
                  function validateSpecialPassages (passage) {
                    if (validationNoCodeTagPassages.includes(passage.title)) {
                      for (
                        var _len19 = arguments.length,
                          tags = new Array(_len19 > 1 ? _len19 - 1 : 0),
                          _key19 = 1;
                        _key19 < _len19;
                        _key19++
                      )
                        tags[_key19 - 1] = arguments[_key19]
                      throw new Error(
                        'special passage "'
                          .concat(
                            passage.title,
                            '" contains special tags; invalid: "'
                          )
                          .concat(tags.sort().join('", "'), '"')
                      )
                    }
                    var codeTags = [].concat(validationCodeTags),
                      foundTags = []
                    if (
                      (passage.tags.forEach(function (tag) {
                        codeTags.includes(tag) &&
                          foundTags.push.apply(
                            foundTags,
                            _toConsumableArray(codeTags.delete(tag))
                          )
                      }),
                      foundTags.length > 1)
                    )
                      throw new Error(
                        'passage "'
                          .concat(
                            passage.title,
                            '" contains multiple special tags; invalid: "'
                          )
                          .concat(foundTags.sort().join('", "'), '"')
                      )
                  }
                  var $storydata = jQuery('tw-storydata'),
                    startNode = $storydata.attr('startnode') || ''
                  ;(Config.passages.start = null),
                    (Config.debug = /\bdebug\b/.test(
                      $storydata.attr('options')
                    )),
                    $storydata.children('style').each(function (i) {
                      _styles.push(
                        new Passage('tw-user-style-'.concat(i), this)
                      )
                    }),
                    $storydata.children('script').each(function (i) {
                      _scripts.push(
                        new Passage('tw-user-script-'.concat(i), this)
                      )
                    }),
                    $storydata
                      .children(
                        'tw-passagedata:not([tags~="Twine.private"],[tags~="annotation"])'
                      )
                      .each(function () {
                        var $this = jQuery(this),
                          pid = $this.attr('pid') || '',
                          passage = new Passage($this.attr('name'), this)
                        pid === startNode && '' !== startNode
                          ? ((Config.passages.start = passage.title),
                            validateStartingPassage(passage),
                            (_passages[passage.title] = passage))
                          : passage.tags.includes('init')
                          ? (validateSpecialPassages(passage, 'init'),
                            _inits.push(passage))
                          : passage.tags.includes('widget')
                          ? (validateSpecialPassages(passage, 'widget'),
                            _widgets.push(passage))
                          : (_passages[passage.title] = passage)
                      }),
                    (_ifId = $storydata.attr('ifid')),
                    _storySetTitle('Abyss Diver'),
                    (Config.saves.id = Story.domId)
                }
              },
              init: {
                value: function () {
                  var storyStyle
                  ;(storyStyle = document.createElement('style')),
                    new StyleWrapper(storyStyle).add(
                      _styles
                        .map(function (style) {
                          return style.text.trim()
                        })
                        .join('\n')
                    ),
                    jQuery(storyStyle)
                      .appendTo(document.head)
                      .attr({ id: 'style-story', type: 'text/css' })
                  for (var i = 0; i < _scripts.length; ++i)
                    try {
                      Scripting.evalJavaScript(_scripts[i].text)
                    } catch (ex) {
                      console.error(ex),
                        Alert.error(
                          _scripts[i].title,
                          'object' === _typeof(ex) ? ex.message : ex
                        )
                    }
                  for (var _i8 = 0; _i8 < _widgets.length; ++_i8)
                    try {
                      Wikifier.wikifyEval(_widgets[_i8].processText())
                    } catch (ex) {
                      console.error(ex),
                        Alert.error(
                          _widgets[_i8].title,
                          'object' === _typeof(ex) ? ex.message : ex
                        )
                    }
                }
              },
              title: {
                get: function () {
                  return _title
                }
              },
              domId: {
                get: function () {
                  return _domId
                }
              },
              ifId: {
                get: function () {
                  return _ifId
                }
              },
              add: {
                value: function (passage) {
                  if (!(passage instanceof Passage))
                    throw new TypeError(
                      'Story.add passage parameter must be an instance of Passage'
                    )
                  var title = passage.title
                  return (
                    !_passages.hasOwnProperty(title) &&
                    ((_passages[title] = passage), !0)
                  )
                }
              },
              has: {
                value: function (title) {
                  var type = _typeof(title)
                  switch (type) {
                    case 'number':
                    case 'string':
                      return _passages.hasOwnProperty(String(title))
                    case 'undefined':
                      break
                    case 'object':
                      type = null === title ? 'null' : 'an object'
                      break
                    default:
                      type = 'a '.concat(type)
                  }
                  throw new TypeError(
                    'Story.has title parameter cannot be '.concat(type)
                  )
                }
              },
              get: {
                value: function (title) {
                  var type = _typeof(title)
                  switch (type) {
                    case 'number':
                    case 'string':
                      var id = String(title)
                      return _passages.hasOwnProperty(id)
                        ? _passages[id]
                        : new Passage(id || '(unknown)')
                    case 'undefined':
                      break
                    case 'object':
                      type = null === title ? 'null' : 'an object'
                      break
                    default:
                      type = 'a '.concat(type)
                  }
                  throw new TypeError(
                    'Story.get title parameter cannot be '.concat(type)
                  )
                }
              },
              getAllInit: {
                value: function () {
                  return Object.freeze(Array.from(_inits))
                }
              },
              getAllRegular: {
                value: function () {
                  return Object.freeze(Object.assign({}, _passages))
                }
              },
              getAllScript: {
                value: function () {
                  return Object.freeze(Array.from(_scripts))
                }
              },
              getAllStylesheet: {
                value: function () {
                  return Object.freeze(Array.from(_styles))
                }
              },
              getAllWidget: {
                value: function () {
                  return Object.freeze(Array.from(_widgets))
                }
              },
              lookup: {
                value: function (key, value) {
                  var sortKey =
                      arguments.length > 2 && arguments[2] !== undefined
                        ? arguments[2]
                        : 'title',
                    results = []
                  return (
                    Object.keys(_passages).forEach(function (name) {
                      var passage = _passages[name]
                      'object' === _typeof(passage[key]) &&
                      null !== passage[key]
                        ? passage[key] instanceof Array &&
                          passage[key].some(function (m) {
                            return Util.sameValueZero(m, value)
                          }) &&
                          results.push(passage)
                        : Util.sameValueZero(passage[key], value) &&
                          results.push(passage)
                    }),
                    results.sort(function (a, b) {
                      return a[sortKey] == b[sortKey]
                        ? 0
                        : a[sortKey] < b[sortKey]
                        ? -1
                        : 1
                    }),
                    results
                  )
                }
              },
              lookupWith: {
                value: function (predicate) {
                  var sortKey =
                    arguments.length > 1 && arguments[1] !== undefined
                      ? arguments[1]
                      : 'title'
                  if ('function' != typeof predicate)
                    throw new TypeError(
                      'Story.lookupWith predicate parameter must be a function'
                    )
                  var results = []
                  return (
                    Object.keys(_passages).forEach(function (name) {
                      var passage = _passages[name]
                      predicate(passage) && results.push(passage)
                    }),
                    results.sort(function (a, b) {
                      return a[sortKey] == b[sortKey]
                        ? 0
                        : a[sortKey] < b[sortKey]
                        ? -1
                        : 1
                    }),
                    results
                  )
                }
              }
            }
          )
        )
      })(),
      UI = (function () {
        function uiAssembleLinkList (passage, listEl) {
          var list = listEl,
            debugState = Config.debug,
            cleanState = Config.cleanupWikifierOutput
          ;(Config.debug = !1), (Config.cleanupWikifierOutput = !1)
          try {
            null == list && (list = document.createElement('ul'))
            var frag = document.createDocumentFragment()
            new Wikifier(frag, Story.get(passage).processText().trim())
            var errors = _toConsumableArray(
              frag.querySelectorAll('.error')
            ).map(function (errEl) {
              return errEl.textContent.replace(errorPrologRegExp, '')
            })
            if (errors.length > 0) throw new Error(errors.join('; '))
            for (; frag.hasChildNodes(); ) {
              var node = frag.firstChild
              if (
                node.nodeType === Node.ELEMENT_NODE &&
                'A' === node.nodeName.toUpperCase()
              ) {
                var li = document.createElement('li')
                list.appendChild(li), li.appendChild(node)
              } else frag.removeChild(node)
            }
          } finally {
            ;(Config.cleanupWikifierOutput = cleanState),
              (Config.debug = debugState)
          }
          return list
        }
        function uiOpenAlert (message) {
          jQuery(Dialog.setup(L10n.get('alertTitle'), 'alert')).append(
            '<p>'.concat(message, '</p><ul class="buttons">') +
              '<li><button id="alert-ok" class="ui-close">'.concat(
                L10n.get(['alertOk', 'ok']),
                '</button></li>'
              ) +
              '</ul>'
          )
          for (
            var _len20 = arguments.length,
              args = new Array(_len20 > 1 ? _len20 - 1 : 0),
              _key20 = 1;
            _key20 < _len20;
            _key20++
          )
            args[_key20 - 1] = arguments[_key20]
          Dialog.open.apply(Dialog, args)
        }
        function uiBuildAutoload () {
          return (
            jQuery(Dialog.setup(L10n.get('autoloadTitle'), 'autoload')).append(
              '<p>'.concat(
                L10n.get('autoloadPrompt'),
                '</p><ul class="buttons">'
              ) +
                '<li><button id="autoload-ok" class="ui-close">'.concat(
                  L10n.get(['autoloadOk', 'ok']),
                  '</button></li>'
                ) +
                '<li><button id="autoload-cancel" class="ui-close">'.concat(
                  L10n.get(['autoloadCancel', 'cancel']),
                  '</button></li>'
                ) +
                '</ul>'
            ),
            jQuery(document).one('click.autoload', '.ui-close', function (ev) {
              var isAutoloadOk = 'autoload-ok' === ev.target.id
              jQuery(document).one(':dialogclosed', function () {
                ;(isAutoloadOk && Save.autosave.load()) ||
                  Engine.play(Config.passages.start)
              })
            }),
            !0
          )
        }
        function uiBuildJumpto () {
          var list = document.createElement('ul')
          jQuery(Dialog.setup(L10n.get('jumptoTitle'), 'jumpto list')).append(
            list
          )
          for (
            var expired = State.expired.length, i = State.size - 1;
            i >= 0;
            --i
          )
            if (i !== State.activeIndex) {
              var passage = Story.get(State.history[i].title)
              passage &&
                passage.tags.includes('bookmark') &&
                jQuery(document.createElement('li'))
                  .append(
                    jQuery(document.createElement('a'))
                      .ariaClick(
                        { one: !0 },
                        (function (idx) {
                          return function () {
                            return jQuery(document).one(
                              ':dialogclosed',
                              function () {
                                return Engine.goTo(idx)
                              }
                            )
                          }
                        })(i)
                      )
                      .addClass('ui-close')
                      .text(
                        ''
                          .concat(L10n.get('jumptoTurn'), ' ')
                          .concat(expired + i + 1, ': ')
                          .concat(passage.description())
                      )
                  )
                  .appendTo(list)
            }
          list.hasChildNodes() ||
            jQuery(list).append(
              '<li><a><em>'.concat(
                L10n.get('jumptoUnavailable'),
                '</em></a></li>'
              )
            )
        }
        function uiBuildRestart () {
          return (
            jQuery(Dialog.setup(L10n.get('restartTitle'), 'restart'))
              .append(
                '<p>'.concat(
                  L10n.get('restartPrompt'),
                  '</p><ul class="buttons">'
                ) +
                  '<li><button id="restart-ok">'.concat(
                    L10n.get(['restartOk', 'ok']),
                    '</button></li>'
                  ) +
                  '<li><button id="restart-cancel" class="ui-close">'.concat(
                    L10n.get(['restartCancel', 'cancel']),
                    '</button></li>'
                  ) +
                  '</ul>'
              )
              .find('#restart-ok')
              .ariaClick({ one: !0 }, function () {
                jQuery(document).one(':dialogclosed', function () {
                  return Engine.restart()
                }),
                  Dialog.close()
              }),
            !0
          )
        }
        function uiBuildSaves () {
          var savesAllowed =
            'function' != typeof Config.saves.isAllowed ||
            Config.saves.isAllowed()
          function createActionItem (bId, bClass, bText, bAction) {
            var $btn = jQuery(document.createElement('button'))
              .attr('id', 'saves-'.concat(bId))
              .html(bText)
            return (
              bClass && $btn.addClass(bClass),
              bAction ? $btn.ariaClick(bAction) : $btn.ariaDisabled(!0),
              jQuery(document.createElement('li')).append($btn)
            )
          }
          var $dialogBody = jQuery(
              Dialog.setup(L10n.get('savesTitle'), 'saves')
            ),
            savesOk = Save.ok(),
            fileOk =
              Has.fileAPI &&
              (Config.saves.tryDiskOnMobile || !Browser.isMobile.any())
          if (
            (savesOk &&
              $dialogBody.append(
                (function () {
                  function createButton (bId, bClass, bText, bSlot, bAction) {
                    var $btn = jQuery(document.createElement('button'))
                      .attr('id', 'saves-'.concat(bId, '-').concat(bSlot))
                      .addClass(bId)
                      .html(bText)
                    return (
                      bClass && $btn.addClass(bClass),
                      bAction
                        ? 'auto' === bSlot
                          ? $btn.ariaClick(
                              {
                                label: ''
                                  .concat(bText, ' ')
                                  .concat(L10n.get('savesLabelAuto'))
                              },
                              function () {
                                return bAction()
                              }
                            )
                          : $btn.ariaClick(
                              {
                                label: ''
                                  .concat(bText, ' ')
                                  .concat(L10n.get('savesLabelSlot'), ' ')
                                  .concat(bSlot + 1)
                              },
                              function () {
                                return bAction(bSlot)
                              }
                            )
                        : $btn.ariaDisabled(!0),
                      $btn
                    )
                  }
                  var saves = Save.get(),
                    $tbody = jQuery(document.createElement('tbody'))
                  if (Save.autosave.ok()) {
                    var $tdSlot = jQuery(document.createElement('td')),
                      $tdLoad = jQuery(document.createElement('td')),
                      $tdDesc = jQuery(document.createElement('td')),
                      $tdDele = jQuery(document.createElement('td'))
                    jQuery(document.createElement('b'))
                      .attr({
                        title: L10n.get('savesLabelAuto'),
                        'aria-label': L10n.get('savesLabelAuto')
                      })
                      .text('A')
                      .appendTo($tdSlot),
                      saves.autosave
                        ? ($tdLoad.append(
                            createButton(
                              'load',
                              'ui-close',
                              L10n.get('savesLabelLoad'),
                              'auto',
                              function () {
                                jQuery(document).one(
                                  ':dialogclosed',
                                  function () {
                                    return Save.autosave.load()
                                  }
                                )
                              }
                            )
                          ),
                          jQuery(document.createElement('div'))
                            .text(saves.autosave.title)
                            .appendTo($tdDesc),
                          jQuery(document.createElement('div'))
                            .addClass('datestamp')
                            .html(
                              saves.autosave.date
                                ? ''.concat(
                                    new Date(
                                      saves.autosave.date
                                    ).toLocaleString()
                                  )
                                : '<em>'.concat(
                                    L10n.get('savesUnknownDate'),
                                    '</em>'
                                  )
                            )
                            .appendTo($tdDesc),
                          $tdDele.append(
                            createButton(
                              'delete',
                              null,
                              L10n.get('savesLabelDelete'),
                              'auto',
                              function () {
                                Save.autosave.delete(), uiBuildSaves()
                              }
                            )
                          ))
                        : ($tdLoad.append(
                            createButton(
                              'load',
                              null,
                              L10n.get('savesLabelLoad'),
                              'auto'
                            )
                          ),
                          $tdDesc.addClass('empty').text('•  •  •'),
                          $tdDele.append(
                            createButton(
                              'delete',
                              null,
                              L10n.get('savesLabelDelete'),
                              'auto'
                            )
                          )),
                      jQuery(document.createElement('tr'))
                        .append($tdSlot)
                        .append($tdLoad)
                        .append($tdDesc)
                        .append($tdDele)
                        .appendTo($tbody)
                  }
                  for (var i = 0, iend = saves.slots.length; i < iend; ++i) {
                    var _$tdSlot = jQuery(document.createElement('td')),
                      _$tdLoad = jQuery(document.createElement('td')),
                      _$tdDesc = jQuery(document.createElement('td')),
                      _$tdDele = jQuery(document.createElement('td'))
                    _$tdSlot.append(document.createTextNode(i + 1)),
                      saves.slots[i]
                        ? (_$tdLoad.append(
                            createButton(
                              'load',
                              'ui-close',
                              L10n.get('savesLabelLoad'),
                              i,
                              function (slot) {
                                jQuery(document).one(
                                  ':dialogclosed',
                                  function () {
                                    return Save.slots.load(slot)
                                  }
                                )
                              }
                            )
                          ),
                          jQuery(document.createElement('div'))
                            .text(saves.slots[i].title)
                            .appendTo(_$tdDesc),
                          jQuery(document.createElement('div'))
                            .addClass('datestamp')
                            .html(
                              saves.slots[i].date
                                ? ''.concat(
                                    new Date(
                                      saves.slots[i].date
                                    ).toLocaleString()
                                  )
                                : '<em>'.concat(
                                    L10n.get('savesUnknownDate'),
                                    '</em>'
                                  )
                            )
                            .appendTo(_$tdDesc),
                          _$tdDele.append(
                            createButton(
                              'delete',
                              null,
                              L10n.get('savesLabelDelete'),
                              i,
                              function (slot) {
                                Save.slots.delete(slot), uiBuildSaves()
                              }
                            )
                          ))
                        : (_$tdLoad.append(
                            createButton(
                              'save',
                              'ui-close',
                              L10n.get('savesLabelSave'),
                              i,
                              savesAllowed ? Save.slots.save : null
                            )
                          ),
                          _$tdDesc.addClass('empty').text('•  •  •'),
                          _$tdDele.append(
                            createButton(
                              'delete',
                              null,
                              L10n.get('savesLabelDelete'),
                              i
                            )
                          )),
                      jQuery(document.createElement('tr'))
                        .append(_$tdSlot)
                        .append(_$tdLoad)
                        .append(_$tdDesc)
                        .append(_$tdDele)
                        .appendTo($tbody)
                  }
                  return jQuery(document.createElement('table'))
                    .attr('id', 'saves-list')
                    .append($tbody)
                })()
              ),
            savesOk || fileOk)
          ) {
            var $btnBar = jQuery(document.createElement('ul'))
              .addClass('buttons')
              .appendTo($dialogBody)
            return (
              fileOk &&
                ($btnBar.append(
                  createActionItem(
                    'export',
                    'ui-close',
                    L10n.get('savesLabelExport'),
                    savesAllowed
                      ? function () {
                          return Save.export()
                        }
                      : null
                  )
                ),
                $btnBar.append(
                  createActionItem(
                    'import',
                    null,
                    L10n.get('savesLabelImport'),
                    function () {
                      return $dialogBody
                        .find('#saves-import-file')
                        .trigger('click')
                    }
                  )
                ),
                jQuery(document.createElement('input'))
                  .css({
                    display: 'block',
                    visibility: 'hidden',
                    position: 'fixed',
                    left: '-9999px',
                    top: '-9999px',
                    width: '1px',
                    height: '1px'
                  })
                  .attr({
                    type: 'file',
                    id: 'saves-import-file',
                    tabindex: -1,
                    'aria-hidden': !0
                  })
                  .on('change', function (ev) {
                    jQuery(document).one(':dialogclosed', function () {
                      return Save.import(ev)
                    }),
                      Dialog.close()
                  })
                  .appendTo($dialogBody)),
              savesOk &&
                $btnBar.append(
                  createActionItem(
                    'clear',
                    null,
                    L10n.get('savesLabelClear'),
                    Save.autosave.has() || !Save.slots.isEmpty()
                      ? function () {
                          Save.clear(), uiBuildSaves()
                        }
                      : null
                  )
                ),
              !0
            )
          }
          return uiOpenAlert(L10n.get('savesIncapable')), !1
        }
        function uiBuildSettings () {
          var $dialogBody = jQuery(
            Dialog.setup(L10n.get('settingsTitle'), 'settings')
          )
          return (
            Setting.forEach(function (control) {
              if (control.type === Setting.Types.Header) {
                var _name = control.name,
                  _id = Util.slugify(_name),
                  $header = jQuery(document.createElement('div')),
                  $heading = jQuery(document.createElement('h2'))
                return (
                  $header
                    .attr('id', 'header-body-'.concat(_id))
                    .append($heading)
                    .appendTo($dialogBody),
                  $heading
                    .attr('id', 'header-heading-'.concat(_id))
                    .wiki(_name),
                  void (
                    control.desc &&
                    jQuery(document.createElement('p'))
                      .attr('id', 'header-desc-'.concat(_id))
                      .wiki(control.desc)
                      .appendTo($header)
                  )
                )
              }
              var $control,
                name = control.name,
                id = Util.slugify(name),
                $setting = jQuery(document.createElement('div')),
                $label = jQuery(document.createElement('label')),
                $controlBox = jQuery(document.createElement('div'))
              switch (
                (jQuery(document.createElement('div'))
                  .append($label)
                  .append($controlBox)
                  .appendTo($setting),
                control.desc &&
                  jQuery(document.createElement('p'))
                    .attr('id', 'setting-desc-'.concat(id))
                    .wiki(control.desc)
                    .appendTo($setting),
                $label
                  .attr({
                    id: 'setting-label-'.concat(id),
                    for: 'setting-control-'.concat(id)
                  })
                  .wiki(control.label),
                null == settings[name] && (settings[name] = control.default),
                control.type)
              ) {
                case Setting.Types.Toggle:
                  ;($control = jQuery(document.createElement('button'))),
                    settings[name]
                      ? $control
                          .addClass('enabled')
                          .text(L10n.get('settingsOn'))
                      : $control.text(L10n.get('settingsOff')),
                    $control.ariaClick(function () {
                      settings[name]
                        ? (jQuery(this)
                            .removeClass('enabled')
                            .text(L10n.get('settingsOff')),
                          (settings[name] = !1))
                        : (jQuery(this)
                            .addClass('enabled')
                            .text(L10n.get('settingsOn')),
                          (settings[name] = !0)),
                        Setting.save(),
                        control.hasOwnProperty('onChange') &&
                          control.onChange.call({
                            name: name,
                            value: settings[name],
                            default: control.default
                          })
                    })
                  break
                case Setting.Types.List:
                  $control = jQuery(document.createElement('select'))
                  for (var i = 0, iend = control.list.length; i < iend; ++i)
                    jQuery(document.createElement('option'))
                      .val(i)
                      .text(control.list[i])
                      .appendTo($control)
                  $control
                    .val(control.list.indexOf(settings[name]))
                    .attr('tabindex', 0)
                    .on('change', function () {
                      ;(settings[name] = control.list[Number(this.value)]),
                        Setting.save(),
                        control.hasOwnProperty('onChange') &&
                          control.onChange.call({
                            name: name,
                            value: settings[name],
                            default: control.default,
                            list: control.list
                          })
                    })
                  break
                case Setting.Types.Range:
                  ;($control = jQuery(document.createElement('input')))
                    .attr({
                      type: 'range',
                      min: control.min,
                      max: control.max,
                      step: control.step,
                      value: settings[name],
                      tabindex: 0
                    })
                    .on('change input', function () {
                      ;(settings[name] = Number(this.value)),
                        Setting.save(),
                        control.hasOwnProperty('onChange') &&
                          control.onChange.call({
                            name: name,
                            value: settings[name],
                            default: control.default,
                            min: control.min,
                            max: control.max,
                            step: control.step
                          })
                    })
                    .on('keypress', function (ev) {
                      13 === ev.which &&
                        (ev.preventDefault(), $control.trigger('change'))
                    })
              }
              $control
                .attr('id', 'setting-control-'.concat(id))
                .appendTo($controlBox),
                $setting
                  .attr('id', 'setting-body-'.concat(id))
                  .appendTo($dialogBody)
            }),
            $dialogBody
              .append(
                '<ul class="buttons">' +
                  '<li><button id="settings-ok" class="ui-close">'.concat(
                    L10n.get(['settingsOk', 'ok']),
                    '</button></li>'
                  ) +
                  '<li><button id="settings-reset">'.concat(
                    L10n.get('settingsReset'),
                    '</button></li>'
                  ) +
                  '</ul>'
              )
              .find('#settings-reset')
              .ariaClick({ one: !0 }, function () {
                jQuery(document).one(':dialogclosed', function () {
                  Setting.reset(), window.location.reload()
                }),
                  Dialog.close()
              }),
            !0
          )
        }
        function uiBuildShare () {
          try {
            jQuery(Dialog.setup(L10n.get('shareTitle'), 'share list')).append(
              uiAssembleLinkList('StoryShare')
            )
          } catch (ex) {
            return console.error(ex), Alert.error('StoryShare', ex.message), !1
          }
          return !0
        }
        return Object.freeze(
          Object.defineProperties(
            {},
            {
              assembleLinkList: { value: uiAssembleLinkList },
              alert: { value: uiOpenAlert },
              jumpto: {
                value: function () {
                  uiBuildJumpto(), Dialog.open.apply(Dialog, arguments)
                }
              },
              restart: {
                value: function () {
                  uiBuildRestart(), Dialog.open.apply(Dialog, arguments)
                }
              },
              saves: {
                value: function () {
                  uiBuildSaves(), Dialog.open.apply(Dialog, arguments)
                }
              },
              settings: {
                value: function () {
                  uiBuildSettings(), Dialog.open.apply(Dialog, arguments)
                }
              },
              share: {
                value: function () {
                  uiBuildShare(), Dialog.open.apply(Dialog, arguments)
                }
              },
              buildAutoload: { value: uiBuildAutoload },
              buildJumpto: { value: uiBuildJumpto },
              buildRestart: { value: uiBuildRestart },
              buildSaves: { value: uiBuildSaves },
              buildSettings: { value: uiBuildSettings },
              buildShare: { value: uiBuildShare },
              stow: {
                value: function () {
                  return UIBar.stow()
                }
              },
              unstow: {
                value: function () {
                  return UIBar.unstow()
                }
              },
              setStoryElements: {
                value: function () {
                  return UIBar.update()
                }
              },
              isOpen: {
                value: function () {
                  return Dialog.isOpen.apply(Dialog, arguments)
                }
              },
              body: {
                value: function () {
                  return Dialog.body()
                }
              },
              setup: {
                value: function () {
                  return Dialog.setup.apply(Dialog, arguments)
                }
              },
              addClickHandler: {
                value: function () {
                  return Dialog.addClickHandler.apply(Dialog, arguments)
                }
              },
              open: {
                value: function () {
                  return Dialog.open.apply(Dialog, arguments)
                }
              },
              close: {
                value: function () {
                  return Dialog.close.apply(Dialog, arguments)
                }
              },
              resize: {
                value: function () {
                  return Dialog.resize()
                }
              },
              buildDialogAutoload: { value: uiBuildAutoload },
              buildDialogJumpto: { value: uiBuildJumpto },
              buildDialogRestart: { value: uiBuildRestart },
              buildDialogSaves: { value: uiBuildSaves },
              buildDialogSettings: { value: uiBuildSettings },
              buildDialogShare: { value: uiBuildShare },
              buildLinkListFromPassage: { value: uiAssembleLinkList }
            }
          )
        )
      })(),
      UIBar = (function () {
        var _$uiBar = null
        function uiBarStow (noAnimation) {
          var $story
          _$uiBar &&
            !_$uiBar.hasClass('stowed') &&
            (noAnimation &&
              (($story = jQuery('#story')).addClass('no-transition'),
              _$uiBar.addClass('no-transition')),
            _$uiBar.addClass('stowed'),
            noAnimation &&
              setTimeout(function () {
                $story.removeClass('no-transition'),
                  _$uiBar.removeClass('no-transition')
              }, Engine.minDomActionDelay))
          return this
        }
        function uiBarUpdate () {
          if (
            (Story.has('StoryDisplayTitle') &&
              setDisplayTitle(Story.get('StoryDisplayTitle').processText()),
            _$uiBar)
          ) {
            setPageElement('story-banner', 'StoryBanner'),
              setPageElement('story-subtitle', 'StorySubtitle'),
              setPageElement('story-author', 'StoryAuthor'),
              setPageElement('story-caption', 'StoryCaption')
            var menuStory = document.getElementById('menu-story')
            if (
              null !== menuStory &&
              (jQuery(menuStory).empty(), Story.has('StoryMenu'))
            )
              try {
                UI.assembleLinkList('StoryMenu', menuStory)
              } catch (ex) {
                console.error(ex), Alert.error('StoryMenu', ex.message)
              }
          }
        }
        return Object.freeze(
          Object.defineProperties(
            {},
            {
              destroy: {
                value: function () {
                  _$uiBar &&
                    (_$uiBar.hide(),
                    jQuery(document).off('.ui-bar'),
                    jQuery(document.head).find('#style-ui-bar').remove(),
                    _$uiBar.remove(),
                    (_$uiBar = null))
                }
              },
              hide: {
                value: function () {
                  return _$uiBar && _$uiBar.hide(), this
                }
              },
              init: {
                value: function () {
                  if (!document.getElementById('ui-bar')) {
                    var toggleLabel,
                      backwardLabel,
                      jumptoLabel,
                      forwardLabel,
                      $backward,
                      $forward,
                      $elems =
                        ((toggleLabel = L10n.get('uiBarToggle')),
                        (backwardLabel = L10n.get('uiBarBackward')),
                        (jumptoLabel = L10n.get('uiBarJumpto')),
                        (forwardLabel = L10n.get('uiBarForward')),
                        jQuery(document.createDocumentFragment()).append(
                          '<div id="ui-bar" aria-live="polite"><div id="ui-bar-tray">' +
                            '<button id="ui-bar-toggle" tabindex="0" title="'
                              .concat(toggleLabel, '" aria-label="')
                              .concat(toggleLabel, '"></button>') +
                            '<div id="ui-bar-history">' +
                            '<button id="history-backward" tabindex="0" title="'
                              .concat(backwardLabel, '" aria-label="')
                              .concat(backwardLabel, '"></button>') +
                            '<button id="history-jumpto" tabindex="0" title="'
                              .concat(jumptoLabel, '" aria-label="')
                              .concat(jumptoLabel, '"></button>') +
                            '<button id="history-forward" tabindex="0" title="'
                              .concat(forwardLabel, '" aria-label="')
                              .concat(forwardLabel, '"></button>') +
                            '</div></div><div id="ui-bar-body"><header id="title" role="banner"><div id="story-banner"></div><h1 id="story-title"></h1><div id="story-subtitle"></div><div id="story-title-separator"></div><p id="story-author"></p></header><div id="story-caption"></div><nav id="menu" role="navigation"><ul id="menu-story"></ul><ul id="menu-core">' +
                            '<li id="menu-item-saves"><a tabindex="0">'.concat(
                              L10n.get('savesTitle'),
                              '</a></li>'
                            ) +
                            '<li id="menu-item-settings"><a tabindex="0">'.concat(
                              L10n.get('settingsTitle'),
                              '</a></li>'
                            ) +
                            '<li id="menu-item-restart"><a tabindex="0">'.concat(
                              L10n.get('restartTitle'),
                              '</a></li>'
                            ) +
                            '<li id="menu-item-share"><a tabindex="0">'.concat(
                              L10n.get('shareTitle'),
                              '</a></li>'
                            ) +
                            '</ul></nav></div></div>'
                        ))
                    ;(_$uiBar = jQuery($elems.find('#ui-bar').get(0))),
                      $elems.insertBefore('body>script#script-sugarcube'),
                      jQuery(document).on(
                        ':historyupdate.ui-bar',
                        (($backward = jQuery('#history-backward')),
                        ($forward = jQuery('#history-forward')),
                        function () {
                          $backward.ariaDisabled(State.length < 2),
                            $forward.ariaDisabled(State.length === State.size)
                        })
                      )
                  }
                }
              },
              isHidden: {
                value: function () {
                  return _$uiBar && 'none' === _$uiBar.css('display')
                }
              },
              isStowed: {
                value: function () {
                  return _$uiBar && _$uiBar.hasClass('stowed')
                }
              },
              show: {
                value: function () {
                  return _$uiBar && _$uiBar.show(), this
                }
              },
              start: {
                value: function () {
                  _$uiBar &&
                    (('boolean' == typeof Config.ui.stowBarInitially
                      ? Config.ui.stowBarInitially
                      : jQuery(window).width() <= Config.ui.stowBarInitially) &&
                      uiBarStow(!0),
                    jQuery('#ui-bar-toggle').ariaClick(
                      { label: L10n.get('uiBarToggle') },
                      function () {
                        return _$uiBar.toggleClass('stowed')
                      }
                    ),
                    Config.history.controls
                      ? (jQuery('#history-backward')
                          .ariaDisabled(State.length < 2)
                          .ariaClick(
                            { label: L10n.get('uiBarBackward') },
                            function () {
                              return Engine.backward()
                            }
                          ),
                        Story.lookup('tags', 'bookmark').length > 0
                          ? jQuery('#history-jumpto').ariaClick(
                              { label: L10n.get('uiBarJumpto') },
                              function () {
                                return UI.jumpto()
                              }
                            )
                          : jQuery('#history-jumpto').remove(),
                        jQuery('#history-forward')
                          .ariaDisabled(State.length === State.size)
                          .ariaClick(
                            { label: L10n.get('uiBarForward') },
                            function () {
                              return Engine.forward()
                            }
                          ))
                      : jQuery('#ui-bar-history').remove(),
                    Story.has('StoryDisplayTitle')
                      ? setDisplayTitle(
                          Story.get('StoryDisplayTitle').processText()
                        )
                      : jQuery('#story-title').text(Story.title),
                    Story.has('StoryCaption') ||
                      jQuery('#story-caption').remove(),
                    Story.has('StoryMenu') || jQuery('#menu-story').remove(),
                    Config.ui.updateStoryElements || uiBarUpdate(),
                    jQuery('#menu-item-saves a')
                      .ariaClick({ role: 'button' }, function (ev) {
                        ev.preventDefault(), UI.buildSaves(), Dialog.open()
                      })
                      .text(L10n.get('savesTitle')),
                    Setting.isEmpty()
                      ? jQuery('#menu-item-settings').remove()
                      : jQuery('#menu-item-settings a')
                          .ariaClick({ role: 'button' }, function (ev) {
                            ev.preventDefault(),
                              UI.buildSettings(),
                              Dialog.open()
                          })
                          .text(L10n.get('settingsTitle')),
                    jQuery('#menu-item-restart a')
                      .ariaClick({ role: 'button' }, function (ev) {
                        ev.preventDefault(), UI.buildRestart(), Dialog.open()
                      })
                      .text(L10n.get('restartTitle')),
                    Story.has('StoryShare')
                      ? jQuery('#menu-item-share a')
                          .ariaClick({ role: 'button' }, function (ev) {
                            ev.preventDefault(), UI.buildShare(), Dialog.open()
                          })
                          .text(L10n.get('shareTitle'))
                      : jQuery('#menu-item-share').remove())
                }
              },
              stow: { value: uiBarStow },
              unstow: {
                value: function (noAnimation) {
                  var $story
                  return (
                    _$uiBar &&
                      _$uiBar.hasClass('stowed') &&
                      (noAnimation &&
                        (($story = jQuery('#story')).addClass('no-transition'),
                        _$uiBar.addClass('no-transition')),
                      _$uiBar.removeClass('stowed'),
                      noAnimation &&
                        setTimeout(function () {
                          $story.removeClass('no-transition'),
                            _$uiBar.removeClass('no-transition')
                        }, Engine.minDomActionDelay)),
                    this
                  )
                }
              },
              update: { value: uiBarUpdate },
              setStoryElements: { value: uiBarUpdate }
            }
          )
        )
      })(),
      DebugBar = (function () {
        var _variableRe = new RegExp('^'.concat(Patterns.variable, '$')),
          _numericKeyRe = /^\d+$/,
          _watchList = [],
          _$debugBar = null,
          _$watchBody = null,
          _$watchList = null,
          _$turnSelect = null,
          _stowed = !0
        function debugBarStow () {
          _$debugBar.css('right', '-'.concat(_$debugBar.outerWidth(), 'px')),
            (_stowed = !0),
            _updateSession()
        }
        function debugBarUnstow () {
          _$debugBar.css('right', 0), (_stowed = !1), _updateSession()
        }
        function debugBarToggle () {
          _stowed ? debugBarUnstow() : debugBarStow()
        }
        function debugBarWatchAdd (varName) {
          _variableRe.test(varName) &&
            (_watchList.pushUnique(varName),
            _watchList.sort(),
            _updateWatchBody(),
            _updateWatchList(),
            _updateSession())
        }
        function debugBarWatchAddAll () {
          Object.keys(State.variables).map(function (name) {
            return _watchList.pushUnique('$'.concat(name))
          }),
            Object.keys(State.temporary).map(function (name) {
              return _watchList.pushUnique('_'.concat(name))
            }),
            _watchList.sort(),
            _updateWatchBody(),
            _updateWatchList(),
            _updateSession()
        }
        function debugBarWatchClear () {
          for (var i = _watchList.length - 1; i >= 0; --i) _watchList.pop()
          _updateWatchBody(), _updateWatchList(), _updateSession()
        }
        function debugBarWatchDelete (varName) {
          _watchList.delete(varName),
            _updateWatchBody(),
            _updateWatchList(),
            _updateSession()
        }
        function debugBarWatchDisable () {
          _debugBarWatchDisableNoUpdate(), _updateSession()
        }
        function debugBarWatchEnable () {
          _debugBarWatchEnableNoUpdate(), _updateSession()
        }
        function debugBarWatchIsEnabled () {
          return !_$watchBody.attr('hidden')
        }
        function debugBarWatchToggle () {
          _$watchBody.attr('hidden')
            ? debugBarWatchEnable()
            : debugBarWatchDisable()
        }
        function _debugBarWatchDisableNoUpdate () {
          _$watchBody.attr({ 'aria-hidden': !0, hidden: 'hidden' })
        }
        function _debugBarWatchEnableNoUpdate () {
          _$watchBody.removeAttr('aria-hidden hidden')
        }
        function _clearSession () {
          session.delete('debugState')
        }
        function _hasSession () {
          return session.has('debugState')
        }
        function _updateSession () {
          session.set('debugState', {
            stowed: _stowed,
            watchList: _watchList,
            watchEnabled: debugBarWatchIsEnabled(),
            viewsEnabled: DebugView.isEnabled()
          })
        }
        function _updateWatchBody () {
          if (0 !== _watchList.length) {
            for (
              var delLabel = L10n.get('debugBarDeleteWatch'),
                $table = jQuery(document.createElement('table')),
                $tbody = jQuery(document.createElement('tbody')),
                _loop4 = function (i, len) {
                  var varName = _watchList[i],
                    varKey = varName.slice(1),
                    store =
                      '$' === varName[0] ? State.variables : State.temporary,
                    $row = jQuery(document.createElement('tr')),
                    $delBtn = jQuery(document.createElement('button')),
                    $code = jQuery(document.createElement('code'))
                  $delBtn
                    .addClass('watch-delete')
                    .attr('data-name', varName)
                    .ariaClick({ one: !0, label: delLabel }, function () {
                      return debugBarWatchDelete(varName)
                    }),
                    $code.text(_toWatchString(store[varKey])),
                    jQuery(document.createElement('td'))
                      .append($delBtn)
                      .appendTo($row),
                    jQuery(document.createElement('td'))
                      .text(varName)
                      .appendTo($row),
                    jQuery(document.createElement('td'))
                      .append($code)
                      .appendTo($row),
                    $row.appendTo($tbody)
                },
                i = 0,
                len = _watchList.length;
              i < len;
              ++i
            )
              _loop4(i)
            $table.append($tbody), _$watchBody.empty().append($table)
          } else
            _$watchBody
              .empty()
              .append('<div>'.concat(L10n.get('debugBarNoWatches'), '</div>'))
        }
        function _updateWatchList () {
          var svn = Object.keys(State.variables),
            tvn = Object.keys(State.temporary)
          if (0 !== svn.length || 0 !== tvn.length) {
            var names = []
                .concat(
                  _toConsumableArray(
                    svn.map(function (name) {
                      return '$'.concat(name)
                    })
                  ),
                  _toConsumableArray(
                    tvn.map(function (name) {
                      return '_'.concat(name)
                    })
                  )
                )
                .sort(),
              options = document.createDocumentFragment()
            names.delete(_watchList)
            for (var i = 0, len = names.length; i < len; ++i)
              jQuery(document.createElement('option'))
                .val(names[i])
                .appendTo(options)
            _$watchList.empty().append(options)
          } else _$watchList.empty()
        }
        function _updateTurnSelect () {
          for (
            var histLen = State.size,
              expLen = State.expired.length,
              options = document.createDocumentFragment(),
              i = 0;
            i < histLen;
            ++i
          )
            jQuery(document.createElement('option'))
              .val(i)
              .text(
                ''
                  .concat(expLen + i + 1, '. ')
                  .concat(Util.escape(State.history[i].title))
              )
              .appendTo(options)
          _$turnSelect
            .empty()
            .ariaDisabled(histLen < 2)
            .append(options)
            .val(State.activeIndex)
        }
        function _toWatchString (value) {
          if (null === value) return 'null'
          switch (_typeof(value)) {
            case 'number':
              if (Number.isNaN(value)) return 'NaN'
              if (!Number.isFinite(value)) return 'Infinity'
            case 'boolean':
            case 'symbol':
            case 'undefined':
              return String(value)
            case 'string':
              return JSON.stringify(value)
            case 'function':
              return 'Function'
          }
          var objType = Util.toStringTag(value)
          if ('Date' === objType)
            return 'Date {'.concat(value.toLocaleString(), '}')
          if ('RegExp' === objType) return 'RegExp '.concat(value.toString())
          var result = []
          if (value instanceof Array || value instanceof Set) {
            for (
              var list = value instanceof Array ? value : Array.from(value),
                i = 0,
                len = list.length;
              i < len;
              ++i
            )
              result.push(
                list.hasOwnProperty(i) ? _toWatchString(list[i]) : '<empty>'
              )
            return (
              Object.keys(list)
                .filter(function (key) {
                  return !_numericKeyRe.test(key)
                })
                .forEach(function (key) {
                  return result.push(
                    ''
                      .concat(_toWatchString(key), ': ')
                      .concat(_toWatchString(list[key]))
                  )
                }),
              ''
                .concat(objType, '(')
                .concat(list.length, ') [')
                .concat(result.join(', '), ']')
            )
          }
          return value instanceof Map
            ? (value.forEach(function (val, key) {
                return result.push(
                  ''
                    .concat(_toWatchString(key), ' → ')
                    .concat(_toWatchString(val))
                )
              }),
              ''
                .concat(objType, '(')
                .concat(value.size, ') {')
                .concat(result.join(', '), '}'))
            : (Object.keys(value).forEach(function (key) {
                return result.push(
                  ''
                    .concat(_toWatchString(key), ': ')
                    .concat(_toWatchString(value[key]))
                )
              }),
              ''.concat(objType, ' {').concat(result.join(', '), '}'))
        }
        return Object.freeze(
          Object.defineProperties(
            {},
            {
              init: {
                value: function () {
                  var barToggleLabel = L10n.get('debugBarToggle'),
                    watchAddLabel = L10n.get('debugBarAddWatch'),
                    watchAllLabel = L10n.get('debugBarWatchAll'),
                    watchNoneLabel = L10n.get('debugBarWatchNone'),
                    watchToggleLabel = L10n.get('debugBarWatchToggle'),
                    viewsToggleLabel = L10n.get('debugBarViewsToggle')
                  jQuery(document.createDocumentFragment())
                    .append(
                      '<div id="debug-bar"><div id="debug-bar-watch">' +
                        '<div>'.concat(
                          L10n.get('debugBarNoWatches'),
                          '</div>>'
                        ) +
                        '</div><div>' +
                        '<button id="debug-bar-watch-toggle" tabindex="0" title="'
                          .concat(watchToggleLabel, '" aria-label="')
                          .concat(watchToggleLabel, '">')
                          .concat(L10n.get('debugBarLabelWatch'), '</button>') +
                        '<label id="debug-bar-watch-label" for="debug-bar-watch-input">'.concat(
                          L10n.get('debugBarLabelAdd'),
                          '</label>'
                        ) +
                        '<input id="debug-bar-watch-input" name="debug-bar-watch-input" type="text" list="debug-bar-watch-list" tabindex="0"><datalist id="debug-bar-watch-list" aria-hidden="true" hidden="hidden"></datalist>' +
                        '<button id="debug-bar-watch-add" tabindex="0" title="'
                          .concat(watchAddLabel, '" aria-label="')
                          .concat(watchAddLabel, '"></button>') +
                        '<button id="debug-bar-watch-all" tabindex="0" title="'
                          .concat(watchAllLabel, '" aria-label="')
                          .concat(watchAllLabel, '"></button>') +
                        '<button id="debug-bar-watch-none" tabindex="0" title="'
                          .concat(watchNoneLabel, '" aria-label="')
                          .concat(watchNoneLabel, '"></button>') +
                        '</div><div>' +
                        '<button id="debug-bar-views-toggle" tabindex="0" title="'
                          .concat(viewsToggleLabel, '" aria-label="')
                          .concat(viewsToggleLabel, '">')
                          .concat(L10n.get('debugBarLabelViews'), '</button>') +
                        '<label id="debug-bar-turn-label" for="debug-bar-turn-select">'.concat(
                          L10n.get('debugBarLabelTurn'),
                          '</label>'
                        ) +
                        '<select id="debug-bar-turn-select" tabindex="0"></select></div>' +
                        '<button id="debug-bar-toggle" tabindex="0" title="'
                          .concat(barToggleLabel, '" aria-label="')
                          .concat(barToggleLabel, '"></button>') +
                        '</div><div id="debug-bar-hint"></div>'
                    )
                    .appendTo('body'),
                    (_$debugBar = jQuery('#debug-bar')),
                    (_$watchBody = jQuery(
                      _$debugBar.find('#debug-bar-watch').get(0)
                    )),
                    (_$watchList = jQuery(
                      _$debugBar.find('#debug-bar-watch-list').get(0)
                    )),
                    (_$turnSelect = jQuery(
                      _$debugBar.find('#debug-bar-turn-select').get(0)
                    ))
                  var $barToggle = jQuery(
                      _$debugBar.find('#debug-bar-toggle').get(0)
                    ),
                    $watchToggle = jQuery(
                      _$debugBar.find('#debug-bar-watch-toggle').get(0)
                    ),
                    $watchInput = jQuery(
                      _$debugBar.find('#debug-bar-watch-input').get(0)
                    ),
                    $watchAdd = jQuery(
                      _$debugBar.find('#debug-bar-watch-add').get(0)
                    ),
                    $watchAll = jQuery(
                      _$debugBar.find('#debug-bar-watch-all').get(0)
                    ),
                    $watchNone = jQuery(
                      _$debugBar.find('#debug-bar-watch-none').get(0)
                    ),
                    $viewsToggle = jQuery(
                      _$debugBar.find('#debug-bar-views-toggle').get(0)
                    )
                  $barToggle.ariaClick(debugBarToggle),
                    $watchToggle.ariaClick(debugBarWatchToggle),
                    $watchInput
                      .on(':addwatch', function () {
                        debugBarWatchAdd(this.value.trim()), (this.value = '')
                      })
                      .on('keypress', function (ev) {
                        13 === ev.which &&
                          (ev.preventDefault(),
                          $watchInput.trigger(':addwatch'))
                      }),
                    $watchAdd.ariaClick(function () {
                      return $watchInput.trigger(':addwatch')
                    }),
                    $watchAll.ariaClick(debugBarWatchAddAll),
                    $watchNone.ariaClick(debugBarWatchClear),
                    _$turnSelect.on('change', function () {
                      Engine.goTo(Number(this.value))
                    }),
                    $viewsToggle.ariaClick(function () {
                      DebugView.toggle(), _updateSession()
                    }),
                    jQuery(document)
                      .on(':historyupdate.debug-bar', _updateTurnSelect)
                      .on(':passageend.debug-bar', function () {
                        _updateWatchBody(), _updateWatchList()
                      })
                      .on(':enginerestart.debug-bar', _clearSession),
                    _hasSession() || DebugView.enable()
                }
              },
              isStowed: {
                value: function () {
                  return _stowed
                }
              },
              start: {
                value: function () {
                  ;(function () {
                    if (!_hasSession()) return !1
                    var debugState = session.get('debugState')
                    ;(_stowed = debugState.stowed),
                      _watchList.push.apply(
                        _watchList,
                        _toConsumableArray(debugState.watchList)
                      ),
                      debugState.watchEnabled
                        ? _debugBarWatchEnableNoUpdate()
                        : _debugBarWatchDisableNoUpdate()
                    debugState.viewsEnabled
                      ? DebugView.enable()
                      : DebugView.disable()
                  })(),
                    _stowed ? debugBarStow() : debugBarUnstow(),
                    _updateTurnSelect(),
                    _updateWatchBody(),
                    _updateWatchList()
                }
              },
              stow: { value: debugBarStow },
              toggle: { value: debugBarToggle },
              unstow: { value: debugBarUnstow },
              watch: {
                value: Object.freeze(
                  Object.defineProperties(
                    {},
                    {
                      add: { value: debugBarWatchAdd },
                      all: { value: debugBarWatchAddAll },
                      clear: { value: debugBarWatchClear },
                      delete: { value: debugBarWatchDelete },
                      disable: { value: debugBarWatchDisable },
                      enable: { value: debugBarWatchEnable },
                      isEnabled: { value: debugBarWatchIsEnabled },
                      toggle: { value: debugBarWatchToggle }
                    }
                  )
                )
              }
            }
          )
        )
      })(),
      LoadScreen = (function () {
        var _locks = new Set(),
          _autoId = 0
        function loadScreenHide () {
          jQuery(document.documentElement).removeAttr('data-init')
        }
        function loadScreenShow () {
          jQuery(document.documentElement).attr('data-init', 'loading')
        }
        return Object.freeze(
          Object.defineProperties(
            {},
            {
              init: {
                value: function () {
                  jQuery(document).on(
                    'readystatechange.SugarCube',
                    function () {
                      _locks.size > 0 ||
                        ('complete' === document.readyState
                          ? 'loading' ===
                              jQuery(document.documentElement).attr(
                                'data-init'
                              ) &&
                            (Config.loadDelay > 0
                              ? setTimeout(function () {
                                  0 === _locks.size && loadScreenHide()
                                }, Math.max(
                                  Engine.minDomActionDelay,
                                  Config.loadDelay
                                ))
                              : loadScreenHide())
                          : loadScreenShow())
                    }
                  )
                }
              },
              clear: {
                value: function () {
                  jQuery(document).off('readystatechange.SugarCube'),
                    _locks.clear(),
                    loadScreenHide()
                }
              },
              hide: { value: loadScreenHide },
              show: { value: loadScreenShow },
              lock: {
                value: function () {
                  return (
                    ++_autoId, _locks.add(_autoId), loadScreenShow(), _autoId
                  )
                }
              },
              unlock: {
                value: function (id) {
                  if (null == id)
                    throw new Error(
                      'LoadScreen.unlock called with a null or undefined ID'
                    )
                  _locks.has(id) && _locks.delete(id),
                    0 === _locks.size &&
                      jQuery(document).trigger('readystatechange')
                }
              }
            }
          )
        )
      })(),
      version = Object.freeze({
        title: 'SugarCube',
        major: 2,
        minor: 36,
        patch: 1,
        prerelease: null,
        build: 9717,
        date: new Date('2021-12-22T05:37:33.467Z'),
        extensions: {},
        toString: function () {
          var prerelease = this.prerelease ? '-'.concat(this.prerelease) : ''
          return ''
            .concat(this.major, '.')
            .concat(this.minor, '.')
            .concat(this.patch)
            .concat(prerelease, '+')
            .concat(this.build)
        },
        short: function () {
          var prerelease = this.prerelease ? '-'.concat(this.prerelease) : ''
          return ''
            .concat(this.title, ' (v')
            .concat(this.major, '.')
            .concat(this.minor, '.')
            .concat(this.patch)
            .concat(prerelease, ')')
        },
        long: function () {
          return ''
            .concat(this.title, ' v')
            .concat(this.toString(), ' (')
            .concat(this.date.toUTCString(), ')')
        }
      }),
      TempState = {},
      macros = {},
      postdisplay = {},
      postrender = {},
      predisplay = {},
      prehistory = {},
      prerender = {},
      session = null,
      settings = {},
      setup = {},
      storage = null,
      browser = Browser,
      config = Config,
      has = Has,
      History = State,
      state = State,
      tale = Story,
      TempVariables = State.temporary
    ;(window.SugarCube = {}),
      jQuery(function () {
        try {
          var lockId = LoadScreen.lock()
          LoadScreen.init(),
            document.normalize && document.normalize(),
            Story.load(),
            (storage = SimpleStore.create(Story.domId, !0)),
            (session = SimpleStore.create(Story.domId, !1)),
            Dialog.init(),
            UIBar.init(),
            Engine.init(),
            Story.init(),
            L10n.init(),
            session.has('rcWarn') ||
              'cookie' !== storage.name ||
              (session.set('rcWarn', 1),
              window.alert(L10n.get('warningNoWebStorage'))),
            Save.init(),
            Setting.init(),
            Macro.init(),
            Engine.start(),
            Config.debug && DebugBar.init()
          var $window = $(window),
            vprCheckId = setInterval(function () {
              $window.width() &&
                (clearInterval(vprCheckId),
                UIBar.start(),
                Config.debug && DebugBar.start(),
                jQuery.event.trigger({ type: ':storyready' }),
                setTimeout(function () {
                  return LoadScreen.unlock(lockId)
                }, 2 * Engine.minDomActionDelay))
            }, Engine.minDomActionDelay)
          Object.defineProperty(window, 'SugarCube', {
            value: Object.seal(
              Object.assign(Object.create(null), {
                Browser: Browser,
                Config: Config,
                Dialog: Dialog,
                Engine: Engine,
                Fullscreen: Fullscreen,
                Has: Has,
                L10n: L10n,
                Macro: Macro,
                Passage: Passage,
                Save: Save,
                Scripting: Scripting,
                Setting: Setting,
                SimpleAudio: SimpleAudio,
                State: State,
                Story: Story,
                UI: UI,
                UIBar: UIBar,
                DebugBar: DebugBar,
                Util: Util,
                Visibility: Visibility,
                Wikifier: Wikifier,
                session: session,
                settings: settings,
                setup: setup,
                storage: storage,
                version: version
              })
            )
          })
        } catch (ex) {
          return (
            console.error(ex),
            LoadScreen.clear(),
            Alert.fatal(null, ex.message, ex)
          )
        }
      })
  })(window, window.document, jQuery)
}
