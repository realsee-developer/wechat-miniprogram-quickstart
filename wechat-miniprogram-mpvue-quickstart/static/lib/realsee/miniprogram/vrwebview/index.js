/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

/**
 * queryString.parse
 * @param  { string } string
 * @returns { Object }
 * @example
 *
 * parse('id=1&id=2&name=jsl')
 * // => { id: ['1', '2'], name: 'jsl' }
 *
 * parse('id=1&code=p')
 * // => { id: '1', code: 'p' }
 */
function parse(string) {
    const object = {};
    if (string.length === 0)
        return {};
    for (const keyValue of string.split('&')) {
        const [key, value] = keyValue.split('=');
        object[key] = Object.prototype.hasOwnProperty.call(object, key)
            ? [].concat(object[key], decodeURIComponent(value))
            : decodeURIComponent(value);
    }
    return object;
}
/**
 * queryString.stringify
 * @param  { object } object
 * @return { string }
 * @example
 *
 * stringify({ id: '1', code: 'p' })
 * // => 'id=1&code=p'
 *
 * stringify({ id: ['1', '2'], name: 'jsl' })\
 * // => 'id=1&id=2&name=jsl'
 */
function stringify(object) {
    const result = [];
    for (const key in object) {
        const value = object[key];
        const query = Array.isArray(value)
            ? value.reduce((a, b) => `${key}=${encodeURIComponent(a)}` + `&${key}=${encodeURIComponent(b)}`)
            : `${key}=${encodeURIComponent(value)}`;
        result.push(query);
    }
    return result.join('&');
}

/**
 * 在链接Url添加Query参数。
 * @param { string } url 需要转换的 url
 * @param { string } query 参数，形式： aa=bb
 */
function appendSearch(url, obj) {
    const _obj = typeof obj === 'string' ? parse(obj) : obj;
    const [_url, hash = ''] = url.split('#');
    const [uri, search = ''] = _url.split('?');
    const _query = parse(search);
    const qs = stringify(Object.assign({}, _query, _obj));
    return `${uri}${qs.length ? `?${qs}` : ''}${hash ? `#${hash}` : ''}`;
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var md5Exports = {};
var md5 = {
  get exports(){ return md5Exports; },
  set exports(v){ md5Exports = v; },
};

var coreExports = {};
var core = {
  get exports(){ return coreExports; },
  set exports(v){ coreExports = v; },
};

var hasRequiredCore;

function requireCore () {
	if (hasRequiredCore) return coreExports;
	hasRequiredCore = 1;
	(function (module, exports) {
(function (root, factory) {
			{
				// CommonJS
				module.exports = factory();
			}
		}(commonjsGlobal, function () {

			/**
			 * CryptoJS core components.
			 */
			var CryptoJS = CryptoJS || (function (Math, undefined$1) {
			    /**
			     * CryptoJS namespace.
			     */
			    var C = {};

			    /**
			     * Library namespace.
			     */
			    var C_lib = C.lib = {};

			    /**
			     * Base object for prototypal inheritance.
			     */
			    var Base = C_lib.Base = (function () {
			        function F() {}

			        return {
			            /**
			             * Creates a new object that inherits from this object.
			             *
			             * @param {Object} overrides Properties to copy into the new object.
			             *
			             * @return {Object} The new object.
			             *
			             * @static
			             *
			             * @example
			             *
			             *     var MyType = CryptoJS.lib.Base.extend({
			             *         field: 'value',
			             *
			             *         method: function () {
			             *         }
			             *     });
			             */
			            extend: function (overrides) {
			                // Spawn
			                F.prototype = this;
			                var subtype = new F();

			                // Augment
			                if (overrides) {
			                    subtype.mixIn(overrides);
			                }

			                // Create default initializer
			                if (!subtype.hasOwnProperty('init')) {
			                    subtype.init = function () {
			                        subtype.$super.init.apply(this, arguments);
			                    };
			                }

			                // Initializer's prototype is the subtype object
			                subtype.init.prototype = subtype;

			                // Reference supertype
			                subtype.$super = this;

			                return subtype;
			            },

			            /**
			             * Extends this object and runs the init method.
			             * Arguments to create() will be passed to init().
			             *
			             * @return {Object} The new object.
			             *
			             * @static
			             *
			             * @example
			             *
			             *     var instance = MyType.create();
			             */
			            create: function () {
			                var instance = this.extend();
			                instance.init.apply(instance, arguments);

			                return instance;
			            },

			            /**
			             * Initializes a newly created object.
			             * Override this method to add some logic when your objects are created.
			             *
			             * @example
			             *
			             *     var MyType = CryptoJS.lib.Base.extend({
			             *         init: function () {
			             *             // ...
			             *         }
			             *     });
			             */
			            init: function () {
			            },

			            /**
			             * Copies properties into this object.
			             *
			             * @param {Object} properties The properties to mix in.
			             *
			             * @example
			             *
			             *     MyType.mixIn({
			             *         field: 'value'
			             *     });
			             */
			            mixIn: function (properties) {
			                for (var propertyName in properties) {
			                    if (properties.hasOwnProperty(propertyName)) {
			                        this[propertyName] = properties[propertyName];
			                    }
			                }

			                // IE won't copy toString using the loop above
			                if (properties.hasOwnProperty('toString')) {
			                    this.toString = properties.toString;
			                }
			            },

			            /**
			             * Creates a copy of this object.
			             *
			             * @return {Object} The clone.
			             *
			             * @example
			             *
			             *     var clone = instance.clone();
			             */
			            clone: function () {
			                return this.init.prototype.extend(this);
			            }
			        };
			    }());

			    /**
			     * An array of 32-bit words.
			     *
			     * @property {Array} words The array of 32-bit words.
			     * @property {number} sigBytes The number of significant bytes in this word array.
			     */
			    var WordArray = C_lib.WordArray = Base.extend({
			        /**
			         * Initializes a newly created word array.
			         *
			         * @param {Array} words (Optional) An array of 32-bit words.
			         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
			         *
			         * @example
			         *
			         *     var wordArray = CryptoJS.lib.WordArray.create();
			         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
			         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
			         */
			        init: function (words, sigBytes) {
			            words = this.words = words || [];

			            if (sigBytes != undefined$1) {
			                this.sigBytes = sigBytes;
			            } else {
			                this.sigBytes = words.length * 4;
			            }
			        },

			        /**
			         * Converts this word array to a string.
			         *
			         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
			         *
			         * @return {string} The stringified word array.
			         *
			         * @example
			         *
			         *     var string = wordArray + '';
			         *     var string = wordArray.toString();
			         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
			         */
			        toString: function (encoder) {
			            return (encoder || Hex).stringify(this);
			        },

			        /**
			         * Concatenates a word array to this word array.
			         *
			         * @param {WordArray} wordArray The word array to append.
			         *
			         * @return {WordArray} This word array.
			         *
			         * @example
			         *
			         *     wordArray1.concat(wordArray2);
			         */
			        concat: function (wordArray) {
			            // Shortcuts
			            var thisWords = this.words;
			            var thatWords = wordArray.words;
			            var thisSigBytes = this.sigBytes;
			            var thatSigBytes = wordArray.sigBytes;

			            // Clamp excess bits
			            this.clamp();

			            // Concat
			            if (thisSigBytes % 4) {
			                // Copy one byte at a time
			                for (var i = 0; i < thatSigBytes; i++) {
			                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
			                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
			                }
			            } else if (thatWords.length > 0xffff) {
			                // Copy one word at a time
			                for (var i = 0; i < thatSigBytes; i += 4) {
			                    thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
			                }
			            } else {
			                // Copy all words at once
			                thisWords.push.apply(thisWords, thatWords);
			            }
			            this.sigBytes += thatSigBytes;

			            // Chainable
			            return this;
			        },

			        /**
			         * Removes insignificant bits.
			         *
			         * @example
			         *
			         *     wordArray.clamp();
			         */
			        clamp: function () {
			            // Shortcuts
			            var words = this.words;
			            var sigBytes = this.sigBytes;

			            // Clamp
			            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
			            words.length = Math.ceil(sigBytes / 4);
			        },

			        /**
			         * Creates a copy of this word array.
			         *
			         * @return {WordArray} The clone.
			         *
			         * @example
			         *
			         *     var clone = wordArray.clone();
			         */
			        clone: function () {
			            var clone = Base.clone.call(this);
			            clone.words = this.words.slice(0);

			            return clone;
			        },

			        /**
			         * Creates a word array filled with random bytes.
			         *
			         * @param {number} nBytes The number of random bytes to generate.
			         *
			         * @return {WordArray} The random word array.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var wordArray = CryptoJS.lib.WordArray.random(16);
			         */
			        random: function (nBytes) {
			            var words = [];

			            var r = (function (m_w) {
			                var m_w = m_w;
			                var m_z = 0x3ade68b1;
			                var mask = 0xffffffff;

			                return function () {
			                    m_z = (0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10)) & mask;
			                    m_w = (0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10)) & mask;
			                    var result = ((m_z << 0x10) + m_w) & mask;
			                    result /= 0x100000000;
			                    result += 0.5;
			                    return result * (Math.random() > .5 ? 1 : -1);
			                }
			            });

			            for (var i = 0, rcache; i < nBytes; i += 4) {
			                var _r = r((rcache || Math.random()) * 0x100000000);

			                rcache = _r() * 0x3ade67b7;
			                words.push((_r() * 0x100000000) | 0);
			            }

			            return new WordArray.init(words, nBytes);
			        }
			    });

			    /**
			     * Encoder namespace.
			     */
			    var C_enc = C.enc = {};

			    /**
			     * Hex encoding strategy.
			     */
			    var Hex = C_enc.Hex = {
			        /**
			         * Converts a word array to a hex string.
			         *
			         * @param {WordArray} wordArray The word array.
			         *
			         * @return {string} The hex string.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
			         */
			        stringify: function (wordArray) {
			            // Shortcuts
			            var words = wordArray.words;
			            var sigBytes = wordArray.sigBytes;

			            // Convert
			            var hexChars = [];
			            for (var i = 0; i < sigBytes; i++) {
			                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
			                hexChars.push((bite >>> 4).toString(16));
			                hexChars.push((bite & 0x0f).toString(16));
			            }

			            return hexChars.join('');
			        },

			        /**
			         * Converts a hex string to a word array.
			         *
			         * @param {string} hexStr The hex string.
			         *
			         * @return {WordArray} The word array.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
			         */
			        parse: function (hexStr) {
			            // Shortcut
			            var hexStrLength = hexStr.length;

			            // Convert
			            var words = [];
			            for (var i = 0; i < hexStrLength; i += 2) {
			                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
			            }

			            return new WordArray.init(words, hexStrLength / 2);
			        }
			    };

			    /**
			     * Latin1 encoding strategy.
			     */
			    var Latin1 = C_enc.Latin1 = {
			        /**
			         * Converts a word array to a Latin1 string.
			         *
			         * @param {WordArray} wordArray The word array.
			         *
			         * @return {string} The Latin1 string.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
			         */
			        stringify: function (wordArray) {
			            // Shortcuts
			            var words = wordArray.words;
			            var sigBytes = wordArray.sigBytes;

			            // Convert
			            var latin1Chars = [];
			            for (var i = 0; i < sigBytes; i++) {
			                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
			                latin1Chars.push(String.fromCharCode(bite));
			            }

			            return latin1Chars.join('');
			        },

			        /**
			         * Converts a Latin1 string to a word array.
			         *
			         * @param {string} latin1Str The Latin1 string.
			         *
			         * @return {WordArray} The word array.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
			         */
			        parse: function (latin1Str) {
			            // Shortcut
			            var latin1StrLength = latin1Str.length;

			            // Convert
			            var words = [];
			            for (var i = 0; i < latin1StrLength; i++) {
			                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
			            }

			            return new WordArray.init(words, latin1StrLength);
			        }
			    };

			    /**
			     * UTF-8 encoding strategy.
			     */
			    var Utf8 = C_enc.Utf8 = {
			        /**
			         * Converts a word array to a UTF-8 string.
			         *
			         * @param {WordArray} wordArray The word array.
			         *
			         * @return {string} The UTF-8 string.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
			         */
			        stringify: function (wordArray) {
			            try {
			                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
			            } catch (e) {
			                throw new Error('Malformed UTF-8 data');
			            }
			        },

			        /**
			         * Converts a UTF-8 string to a word array.
			         *
			         * @param {string} utf8Str The UTF-8 string.
			         *
			         * @return {WordArray} The word array.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
			         */
			        parse: function (utf8Str) {
			            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
			        }
			    };

			    /**
			     * Abstract buffered block algorithm template.
			     *
			     * The property blockSize must be implemented in a concrete subtype.
			     *
			     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
			     */
			    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
			        /**
			         * Resets this block algorithm's data buffer to its initial state.
			         *
			         * @example
			         *
			         *     bufferedBlockAlgorithm.reset();
			         */
			        reset: function () {
			            // Initial values
			            this._data = new WordArray.init();
			            this._nDataBytes = 0;
			        },

			        /**
			         * Adds new data to this block algorithm's buffer.
			         *
			         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
			         *
			         * @example
			         *
			         *     bufferedBlockAlgorithm._append('data');
			         *     bufferedBlockAlgorithm._append(wordArray);
			         */
			        _append: function (data) {
			            // Convert string to WordArray, else assume WordArray already
			            if (typeof data == 'string') {
			                data = Utf8.parse(data);
			            }

			            // Append
			            this._data.concat(data);
			            this._nDataBytes += data.sigBytes;
			        },

			        /**
			         * Processes available data blocks.
			         *
			         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
			         *
			         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
			         *
			         * @return {WordArray} The processed data.
			         *
			         * @example
			         *
			         *     var processedData = bufferedBlockAlgorithm._process();
			         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
			         */
			        _process: function (doFlush) {
			            // Shortcuts
			            var data = this._data;
			            var dataWords = data.words;
			            var dataSigBytes = data.sigBytes;
			            var blockSize = this.blockSize;
			            var blockSizeBytes = blockSize * 4;

			            // Count blocks ready
			            var nBlocksReady = dataSigBytes / blockSizeBytes;
			            if (doFlush) {
			                // Round up to include partial blocks
			                nBlocksReady = Math.ceil(nBlocksReady);
			            } else {
			                // Round down to include only full blocks,
			                // less the number of blocks that must remain in the buffer
			                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
			            }

			            // Count words ready
			            var nWordsReady = nBlocksReady * blockSize;

			            // Count bytes ready
			            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

			            // Process blocks
			            if (nWordsReady) {
			                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
			                    // Perform concrete-algorithm logic
			                    this._doProcessBlock(dataWords, offset);
			                }

			                // Remove processed words
			                var processedWords = dataWords.splice(0, nWordsReady);
			                data.sigBytes -= nBytesReady;
			            }

			            // Return processed words
			            return new WordArray.init(processedWords, nBytesReady);
			        },

			        /**
			         * Creates a copy of this object.
			         *
			         * @return {Object} The clone.
			         *
			         * @example
			         *
			         *     var clone = bufferedBlockAlgorithm.clone();
			         */
			        clone: function () {
			            var clone = Base.clone.call(this);
			            clone._data = this._data.clone();

			            return clone;
			        },

			        _minBufferSize: 0
			    });

			    /**
			     * Abstract hasher template.
			     *
			     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
			     */
			    C_lib.Hasher = BufferedBlockAlgorithm.extend({
			        /**
			         * Configuration options.
			         */
			        cfg: Base.extend(),

			        /**
			         * Initializes a newly created hasher.
			         *
			         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
			         *
			         * @example
			         *
			         *     var hasher = CryptoJS.algo.SHA256.create();
			         */
			        init: function (cfg) {
			            // Apply config defaults
			            this.cfg = this.cfg.extend(cfg);

			            // Set initial values
			            this.reset();
			        },

			        /**
			         * Resets this hasher to its initial state.
			         *
			         * @example
			         *
			         *     hasher.reset();
			         */
			        reset: function () {
			            // Reset data buffer
			            BufferedBlockAlgorithm.reset.call(this);

			            // Perform concrete-hasher logic
			            this._doReset();
			        },

			        /**
			         * Updates this hasher with a message.
			         *
			         * @param {WordArray|string} messageUpdate The message to append.
			         *
			         * @return {Hasher} This hasher.
			         *
			         * @example
			         *
			         *     hasher.update('message');
			         *     hasher.update(wordArray);
			         */
			        update: function (messageUpdate) {
			            // Append
			            this._append(messageUpdate);

			            // Update the hash
			            this._process();

			            // Chainable
			            return this;
			        },

			        /**
			         * Finalizes the hash computation.
			         * Note that the finalize operation is effectively a destructive, read-once operation.
			         *
			         * @param {WordArray|string} messageUpdate (Optional) A final message update.
			         *
			         * @return {WordArray} The hash.
			         *
			         * @example
			         *
			         *     var hash = hasher.finalize();
			         *     var hash = hasher.finalize('message');
			         *     var hash = hasher.finalize(wordArray);
			         */
			        finalize: function (messageUpdate) {
			            // Final message update
			            if (messageUpdate) {
			                this._append(messageUpdate);
			            }

			            // Perform concrete-hasher logic
			            var hash = this._doFinalize();

			            return hash;
			        },

			        blockSize: 512/32,

			        /**
			         * Creates a shortcut function to a hasher's object interface.
			         *
			         * @param {Hasher} hasher The hasher to create a helper for.
			         *
			         * @return {Function} The shortcut function.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
			         */
			        _createHelper: function (hasher) {
			            return function (message, cfg) {
			                return new hasher.init(cfg).finalize(message);
			            };
			        },

			        /**
			         * Creates a shortcut function to the HMAC's object interface.
			         *
			         * @param {Hasher} hasher The hasher to use in this HMAC helper.
			         *
			         * @return {Function} The shortcut function.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
			         */
			        _createHmacHelper: function (hasher) {
			            return function (message, key) {
			                return new C_algo.HMAC.init(hasher, key).finalize(message);
			            };
			        }
			    });

			    /**
			     * Algorithm namespace.
			     */
			    var C_algo = C.algo = {};

			    return C;
			}(Math));


			return CryptoJS;

		}));
} (core));
	return coreExports;
}

(function (module, exports) {
(function (root, factory) {
		{
			// CommonJS
			module.exports = factory(requireCore());
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function (Math) {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var Hasher = C_lib.Hasher;
		    var C_algo = C.algo;

		    // Constants table
		    var T = [];

		    // Compute constants
		    (function () {
		        for (var i = 0; i < 64; i++) {
		            T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
		        }
		    }());

		    /**
		     * MD5 hash algorithm.
		     */
		    var MD5 = C_algo.MD5 = Hasher.extend({
		        _doReset: function () {
		            this._hash = new WordArray.init([
		                0x67452301, 0xefcdab89,
		                0x98badcfe, 0x10325476
		            ]);
		        },

		        _doProcessBlock: function (M, offset) {
		            // Swap endian
		            for (var i = 0; i < 16; i++) {
		                // Shortcuts
		                var offset_i = offset + i;
		                var M_offset_i = M[offset_i];

		                M[offset_i] = (
		                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
		                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
		                );
		            }

		            // Shortcuts
		            var H = this._hash.words;

		            var M_offset_0  = M[offset + 0];
		            var M_offset_1  = M[offset + 1];
		            var M_offset_2  = M[offset + 2];
		            var M_offset_3  = M[offset + 3];
		            var M_offset_4  = M[offset + 4];
		            var M_offset_5  = M[offset + 5];
		            var M_offset_6  = M[offset + 6];
		            var M_offset_7  = M[offset + 7];
		            var M_offset_8  = M[offset + 8];
		            var M_offset_9  = M[offset + 9];
		            var M_offset_10 = M[offset + 10];
		            var M_offset_11 = M[offset + 11];
		            var M_offset_12 = M[offset + 12];
		            var M_offset_13 = M[offset + 13];
		            var M_offset_14 = M[offset + 14];
		            var M_offset_15 = M[offset + 15];

		            // Working varialbes
		            var a = H[0];
		            var b = H[1];
		            var c = H[2];
		            var d = H[3];

		            // Computation
		            a = FF(a, b, c, d, M_offset_0,  7,  T[0]);
		            d = FF(d, a, b, c, M_offset_1,  12, T[1]);
		            c = FF(c, d, a, b, M_offset_2,  17, T[2]);
		            b = FF(b, c, d, a, M_offset_3,  22, T[3]);
		            a = FF(a, b, c, d, M_offset_4,  7,  T[4]);
		            d = FF(d, a, b, c, M_offset_5,  12, T[5]);
		            c = FF(c, d, a, b, M_offset_6,  17, T[6]);
		            b = FF(b, c, d, a, M_offset_7,  22, T[7]);
		            a = FF(a, b, c, d, M_offset_8,  7,  T[8]);
		            d = FF(d, a, b, c, M_offset_9,  12, T[9]);
		            c = FF(c, d, a, b, M_offset_10, 17, T[10]);
		            b = FF(b, c, d, a, M_offset_11, 22, T[11]);
		            a = FF(a, b, c, d, M_offset_12, 7,  T[12]);
		            d = FF(d, a, b, c, M_offset_13, 12, T[13]);
		            c = FF(c, d, a, b, M_offset_14, 17, T[14]);
		            b = FF(b, c, d, a, M_offset_15, 22, T[15]);

		            a = GG(a, b, c, d, M_offset_1,  5,  T[16]);
		            d = GG(d, a, b, c, M_offset_6,  9,  T[17]);
		            c = GG(c, d, a, b, M_offset_11, 14, T[18]);
		            b = GG(b, c, d, a, M_offset_0,  20, T[19]);
		            a = GG(a, b, c, d, M_offset_5,  5,  T[20]);
		            d = GG(d, a, b, c, M_offset_10, 9,  T[21]);
		            c = GG(c, d, a, b, M_offset_15, 14, T[22]);
		            b = GG(b, c, d, a, M_offset_4,  20, T[23]);
		            a = GG(a, b, c, d, M_offset_9,  5,  T[24]);
		            d = GG(d, a, b, c, M_offset_14, 9,  T[25]);
		            c = GG(c, d, a, b, M_offset_3,  14, T[26]);
		            b = GG(b, c, d, a, M_offset_8,  20, T[27]);
		            a = GG(a, b, c, d, M_offset_13, 5,  T[28]);
		            d = GG(d, a, b, c, M_offset_2,  9,  T[29]);
		            c = GG(c, d, a, b, M_offset_7,  14, T[30]);
		            b = GG(b, c, d, a, M_offset_12, 20, T[31]);

		            a = HH(a, b, c, d, M_offset_5,  4,  T[32]);
		            d = HH(d, a, b, c, M_offset_8,  11, T[33]);
		            c = HH(c, d, a, b, M_offset_11, 16, T[34]);
		            b = HH(b, c, d, a, M_offset_14, 23, T[35]);
		            a = HH(a, b, c, d, M_offset_1,  4,  T[36]);
		            d = HH(d, a, b, c, M_offset_4,  11, T[37]);
		            c = HH(c, d, a, b, M_offset_7,  16, T[38]);
		            b = HH(b, c, d, a, M_offset_10, 23, T[39]);
		            a = HH(a, b, c, d, M_offset_13, 4,  T[40]);
		            d = HH(d, a, b, c, M_offset_0,  11, T[41]);
		            c = HH(c, d, a, b, M_offset_3,  16, T[42]);
		            b = HH(b, c, d, a, M_offset_6,  23, T[43]);
		            a = HH(a, b, c, d, M_offset_9,  4,  T[44]);
		            d = HH(d, a, b, c, M_offset_12, 11, T[45]);
		            c = HH(c, d, a, b, M_offset_15, 16, T[46]);
		            b = HH(b, c, d, a, M_offset_2,  23, T[47]);

		            a = II(a, b, c, d, M_offset_0,  6,  T[48]);
		            d = II(d, a, b, c, M_offset_7,  10, T[49]);
		            c = II(c, d, a, b, M_offset_14, 15, T[50]);
		            b = II(b, c, d, a, M_offset_5,  21, T[51]);
		            a = II(a, b, c, d, M_offset_12, 6,  T[52]);
		            d = II(d, a, b, c, M_offset_3,  10, T[53]);
		            c = II(c, d, a, b, M_offset_10, 15, T[54]);
		            b = II(b, c, d, a, M_offset_1,  21, T[55]);
		            a = II(a, b, c, d, M_offset_8,  6,  T[56]);
		            d = II(d, a, b, c, M_offset_15, 10, T[57]);
		            c = II(c, d, a, b, M_offset_6,  15, T[58]);
		            b = II(b, c, d, a, M_offset_13, 21, T[59]);
		            a = II(a, b, c, d, M_offset_4,  6,  T[60]);
		            d = II(d, a, b, c, M_offset_11, 10, T[61]);
		            c = II(c, d, a, b, M_offset_2,  15, T[62]);
		            b = II(b, c, d, a, M_offset_9,  21, T[63]);

		            // Intermediate hash value
		            H[0] = (H[0] + a) | 0;
		            H[1] = (H[1] + b) | 0;
		            H[2] = (H[2] + c) | 0;
		            H[3] = (H[3] + d) | 0;
		        },

		        _doFinalize: function () {
		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;

		            var nBitsTotal = this._nDataBytes * 8;
		            var nBitsLeft = data.sigBytes * 8;

		            // Add padding
		            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);

		            var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
		            var nBitsTotalL = nBitsTotal;
		            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = (
		                (((nBitsTotalH << 8)  | (nBitsTotalH >>> 24)) & 0x00ff00ff) |
		                (((nBitsTotalH << 24) | (nBitsTotalH >>> 8))  & 0xff00ff00)
		            );
		            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
		                (((nBitsTotalL << 8)  | (nBitsTotalL >>> 24)) & 0x00ff00ff) |
		                (((nBitsTotalL << 24) | (nBitsTotalL >>> 8))  & 0xff00ff00)
		            );

		            data.sigBytes = (dataWords.length + 1) * 4;

		            // Hash final blocks
		            this._process();

		            // Shortcuts
		            var hash = this._hash;
		            var H = hash.words;

		            // Swap endian
		            for (var i = 0; i < 4; i++) {
		                // Shortcut
		                var H_i = H[i];

		                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
		                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
		            }

		            // Return final computed hash
		            return hash;
		        },

		        clone: function () {
		            var clone = Hasher.clone.call(this);
		            clone._hash = this._hash.clone();

		            return clone;
		        }
		    });

		    function FF(a, b, c, d, x, s, t) {
		        var n = a + ((b & c) | (~b & d)) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }

		    function GG(a, b, c, d, x, s, t) {
		        var n = a + ((b & d) | (c & ~d)) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }

		    function HH(a, b, c, d, x, s, t) {
		        var n = a + (b ^ c ^ d) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }

		    function II(a, b, c, d, x, s, t) {
		        var n = a + (c ^ (b | ~d)) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }

		    /**
		     * Shortcut function to the hasher's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     *
		     * @return {WordArray} The hash.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hash = CryptoJS.MD5('message');
		     *     var hash = CryptoJS.MD5(wordArray);
		     */
		    C.MD5 = Hasher._createHelper(MD5);

		    /**
		     * Shortcut function to the HMAC's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     * @param {WordArray|string} key The secret key.
		     *
		     * @return {WordArray} The HMAC.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hmac = CryptoJS.HmacMD5(message, key);
		     */
		    C.HmacMD5 = Hasher._createHmacHelper(MD5);
		}(Math));


		return CryptoJS.MD5;

	}));
} (md5));

var MD5 = md5Exports;

const generateUUID = () => 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
});
const generateSignature = ({ ts, ak, sk, uuid, member }) => MD5(`${ts}_${ak}_${sk}_${uuid}_${member}`).toString().toUpperCase();
const generateWssUrl = (tpl, params) => {
    const url = Object.keys(params).reduce((res, curr) => res.replace(`{{${curr}}}`, `${params[curr]}`), tpl);
    return encodeURI(url);
};
const generateWssQuery = (tpl, params) => {
    const query = Object.keys(params).reduce((res, curr) => res.replace(`{{${curr}}}`, `${params[curr]}`), tpl);
    return query;
};
function generateSocketParams(opts) {
    const { ak, sk, origin, members, endpoint, tpl, qs } = opts;
    const ts = `${Date.now()}`;
    const uuid = generateUUID();
    const signature4Weapp = generateSignature({ ts, ak, sk, uuid, member: members.weapp });
    const wssUrl4Weapp = generateWssUrl(tpl, {
        origin,
        endpoint,
        uuid,
        member: members.weapp,
        ak,
        ts,
        sign: signature4Weapp,
    });
    const signature4Webview = generateSignature({ ts, ak, sk, uuid, member: members.web });
    const wssQuery4Webview = generateWssQuery(qs, { uuid, ts, sign: signature4Webview });
    // const getWssUrl4WebView = ({ wssid, wstsp, wssig }: { wskey: string, wssid: string; wstsp: string; wssig: string }) =>
    //   generateWssUrl(tpl, { origin, endpoint, uuid: wssid, member: members.web, ak, ts: wstsp, sign: wssig })
    return {
        wssUrl4Weapp,
        wssQuery4Webview,
        // getWssUrl4WebView,
    };
}

function createSymbol(description) {
    // @ts-ignore
    return typeof Symbol === 'undefined' ? `$Symbol<${description}>$` : Symbol(description);
}

const EVENT_SYMBOL = createSymbol('$$REALSEE_MINIPROGRAM_LIBRARY_EVENT$$');
function __generateEventIfNotExisted(instance) {
    if (!instance[EVENT_SYMBOL]) {
        instance[EVENT_SYMBOL] = {};
    }
    return instance[EVENT_SYMBOL];
}
function __removeEventIfNotExisted(instance) {
    if (!instance[EVENT_SYMBOL]) {
        delete instance[EVENT_SYMBOL];
    }
}
/**
 * 监听者模式
 * @template T - 预设的监听回调类型
 * @example
 * ```
 * new Subscribe<{
 * "foo": [arg1: number, arg2: string],
 * "bar": [arg: boolean],
 * }>()
 * ```
 */
class Subscribe {
    /**
     * 判断是否注册了事件
     * @param name - 事件类型
     */
    hasListener(name) {
        const events = __generateEventIfNotExisted(this);
        return events && events[name] && events[name].length > 0;
    }
    /**
     * 注册事件
     * @param name - 事件类型
     * @param callback - 事件回调函数
     * @param once - 是否只执行一次
     * @returns 解除事件
     * @template K - 预设的监听事件名称
     * @template C - 回调函数函数上下文
     */
    on(name, callback, once) {
        const events = __generateEventIfNotExisted(this);
        if (!events[name])
            events[name] = [];
        events[name].push([callback, once || false]);
        return () => this.off(name, callback);
    }
    /**
     * 注册事件(是否只执行一次)
     * @param name - 事件类型
     * @param callback - 事件回调函数
     * @returns 解除事件
     * @template K - 预设的监听事件名称
     * @template C - 回调函数函数上下文
     */
    once(name, callback) {
        return this.on(name, callback, true);
    }
    /**
     * 解除事件
     *
     * 如果 name 不传的话解除对应所有事件
     * 如果 name, callback 不传的话解除所有name的所有事件
     * @param name - 事件类型
     * @param callback - 事件回调函数
     * @template K - 预设的监听事件名称
     */
    off(name, callback) {
        if (name === undefined) {
            __removeEventIfNotExisted(this);
            return;
        }
        const events = __generateEventIfNotExisted(this);
        if (!events[name])
            events[name] = [];
        if (callback === undefined) {
            events[name].length = 0;
            return;
        }
        let index = 0;
        for (; index < events[name].length; index++) {
            if (events[name][index][0] === callback)
                break;
        }
        if (index < events[name].length) {
            events[name].splice(index, 1);
        }
    }
    /**
     * 触发事件
     * @param name - 事件类型
     * @param data - 触发事件的数据
     * @returns canceled 是否被触发取消
     * @template K - 预设的监听事件名称
     */
    emit(name, ...data) {
        let canceled = false;
        const events = __generateEventIfNotExisted(this);
        const event = events[name] || [];
        for (const one of event.slice()) {
            const [callback, once = false] = one;
            const result = callback(...data);
            if (once)
                this.off(name, callback);
            if (result === false)
                canceled = true;
        }
        return canceled;
    }
}

// uuid
const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
/**
 * 随机生成一个uuid值
 */
const uuid = () => (S4() + S4() + '-' + S4() + '-4' + S4().substr(0, 3) + '-' + S4() + '-' + S4() + S4() + S4()).toLowerCase();

var EnhanceWechatMiniprogramWebSocketReadyState;
(function (EnhanceWechatMiniprogramWebSocketReadyState) {
    EnhanceWechatMiniprogramWebSocketReadyState[EnhanceWechatMiniprogramWebSocketReadyState["NOTINITIALIZED"] = -1] = "NOTINITIALIZED";
    EnhanceWechatMiniprogramWebSocketReadyState[EnhanceWechatMiniprogramWebSocketReadyState["OPEN"] = 1] = "OPEN";
    EnhanceWechatMiniprogramWebSocketReadyState[EnhanceWechatMiniprogramWebSocketReadyState["CONNECTING"] = 0] = "CONNECTING";
    EnhanceWechatMiniprogramWebSocketReadyState[EnhanceWechatMiniprogramWebSocketReadyState["CLOSING"] = 2] = "CLOSING";
    EnhanceWechatMiniprogramWebSocketReadyState[EnhanceWechatMiniprogramWebSocketReadyState["CLOSED"] = 3] = "CLOSED";
})(EnhanceWechatMiniprogramWebSocketReadyState || (EnhanceWechatMiniprogramWebSocketReadyState = {}));
const EnhanceWechatMiniprogramWebSocketReadyStateConstant = {
    NOTINITIALIZED: -1,
    OPEN: 1,
    CONNECTING: 0,
    CLOSING: 2,
    CLOSED: 3,
};
class EnhanceWechatMiniprogramWebSocket extends Subscribe {
    get readyState() {
        return this._readyState;
    }
    constructor(opts) {
        super();
        Object.defineProperty(this, "_readyState", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: EnhanceWechatMiniprogramWebSocketReadyState.NOTINITIALIZED
        });
        Object.defineProperty(this, "_socketTask", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const socketTask = wx.connectSocket(opts);
        this._socketTask = Object.assign(Object.assign({ id: uuid() }, EnhanceWechatMiniprogramWebSocketReadyStateConstant), socketTask);
        this._registarLifeEvent(this._socketTask);
        this._registarRawEvent(this._socketTask);
    }
    /**
     * 生命周期处理
     * @param socketTask
     */
    _registarLifeEvent(socketTask) {
        socketTask.onOpen(() => socketTask.id === this._socketTask.id
            ? (this._readyState = EnhanceWechatMiniprogramWebSocketReadyState.OPEN)
            : void 0);
        socketTask.onClose(() => socketTask.id === this._socketTask.id
            ? (this._readyState = EnhanceWechatMiniprogramWebSocketReadyState.CLOSED)
            : void 0);
        socketTask.onError(() => socketTask.id === this._socketTask.id
            ? (this._readyState = EnhanceWechatMiniprogramWebSocketReadyState.CLOSED)
            : void 0);
    }
    /**
     * - 向微信小程序的SocketTask对象注册事件
     * - 因为微信小程序的SocketTask没有解绑事件的回调，所以重连导致问题
     * @param socketTask
     */
    _registarRawEvent(socketTask) {
        const onOpen = (result) => socketTask.id === this._socketTask.id ? this.emit('open', result) : void 0;
        socketTask.onOpen(onOpen);
        const onClose = (result) => (socketTask.id === this._socketTask.id ? this.emit('close', result) : void 0);
        socketTask.onClose(onClose);
        const onMessage = (result) => (socketTask.id === this._socketTask.id ? this.emit('message', result) : void 0);
        socketTask.onMessage(onMessage);
        const onError = (result) => socketTask.id === this._socketTask.id ? this.emit('error', result) : void 0;
        socketTask.onError(onError);
    }
    close(code, reason) {
        this._readyState = EnhanceWechatMiniprogramWebSocketReadyState.CLOSING;
        this._socketTask.close({ code, reason });
    }
    send(data) {
        this._socketTask.send({ data });
    }
    addEventListener(name, callback, once) {
        if (once) {
            this.once(name, callback);
        }
        else {
            this.on(name, callback);
        }
    }
    removeEventListener(name, callback) {
        this.off(name, callback);
    }
}
Object.defineProperty(EnhanceWechatMiniprogramWebSocket, "NOTINITIALIZED", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -1
});
Object.defineProperty(EnhanceWechatMiniprogramWebSocket, "CONNECTING", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 0
});
Object.defineProperty(EnhanceWechatMiniprogramWebSocket, "OPEN", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 1
});
Object.defineProperty(EnhanceWechatMiniprogramWebSocket, "CLOSING", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 2
});
Object.defineProperty(EnhanceWechatMiniprogramWebSocket, "CLOSED", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 3
});

/**
 * 具有鲁棒性的WebSocket封装
 * 1、自动重连
 * 2、可根据网络情况进行重连
 */
class RobustWebSocket extends Subscribe {
    get attempts() {
        return this._attempts;
    }
    constructor(options) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        super();
        Object.defineProperty(this, "_realWebSocket", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_url", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_protocols", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_readyState", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: EnhanceWechatMiniprogramWebSocketReadyState.NOTINITIALIZED
        });
        Object.defineProperty(this, "_options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                timeout: 30000,
                shouldReconnect: (event, ws) => {
                    if (event.code === 1008 || event.code === 1011)
                        return;
                    return [0, 3000, 10000][ws.attempts];
                },
                should1000Reconnect: false,
                ignoreConnectivityEvents: false,
                automaticOpen: false,
            }
        });
        Object.defineProperty(this, "_connectTimeout", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_attempts", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "_reconnects", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: -1
        });
        Object.defineProperty(this, "_reconnectWhenOnlineAgain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "_explicitlyClosed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "_pendingReconnect", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_connectivityEventsAttached", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "_heathCheckTimer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * 做一个健康检查
         */
        Object.defineProperty(this, "_healthCheck", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => __awaiter(this, void 0, void 0, function* () {
                if (this._realWebSocket && this._realWebSocket.readyState !== this._readyState) {
                    this._readyState = this._realWebSocket.readyState;
                    // 太惨了，断网的时候，ws不会直接closed，而是处于closing的状态
                    if (this._readyState === EnhanceWechatMiniprogramWebSocketReadyState.CLOSING) {
                        this.emit('closing');
                    }
                }
                this._heathCheckTimer = setTimeout(() => this._healthCheck(), 2000);
            })
        });
        /**
         * 清理健康检查
         */
        Object.defineProperty(this, "_clearHeathCheckIfNeed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                if (this._heathCheckTimer) {
                    clearTimeout(this._heathCheckTimer);
                    this._heathCheckTimer = undefined;
                }
            }
        });
        /**
         * 开启健康检查
         */
        Object.defineProperty(this, "_startHealthCheck", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this._clearHeathCheckIfNeed();
                this._heathCheckTimer = setTimeout(() => this._healthCheck());
            }
        });
        /**
         * 停止健康检查
         */
        Object.defineProperty(this, "_stopHealthCheck", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this._clearHeathCheckIfNeed();
            }
        });
        /**
         * 清理连接中的请求
         */
        Object.defineProperty(this, "_clearPendingReconnectIfNeeded", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                if (this._pendingReconnect) {
                    clearTimeout(this._pendingReconnect);
                    this._pendingReconnect = undefined;
                }
            }
        });
        /**
         * 当网页连接上网络进行重连
         * @param event
         */
        Object.defineProperty(this, "_online", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (event) => {
                if (this._reconnectWhenOnlineAgain) {
                    this._clearPendingReconnectIfNeeded();
                    this._reconnect(event);
                }
            }
        });
        /**
         * 当网页断开网络进行关闭
         */
        Object.defineProperty(this, "_offline", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                var _a;
                this._reconnectWhenOnlineAgain = true;
                (_a = this._realWebSocket) === null || _a === void 0 ? void 0 : _a.close(1000, 'offline');
            }
        });
        /**
         * 网络变化回调
         * @param result
         */
        Object.defineProperty(this, "_networkChangeHandler", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (result) => {
                if (result.isConnected) {
                    // online
                    this._online({ code: 1000, reason: 'online' });
                }
                else {
                    this._offline();
                }
            }
        });
        /**
         * 解除网络监听事件
         */
        Object.defineProperty(this, "_detachConnectivityEvents", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                if (this._connectivityEventsAttached) {
                    wx.offNetworkStatusChange(this._networkChangeHandler);
                    this._connectivityEventsAttached = false;
                }
            }
        });
        /**
         * 注册网络监听事件
         */
        Object.defineProperty(this, "_attachConnectivityEvents", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                if (!this._connectivityEventsAttached) {
                    wx.onNetworkStatusChange(this._networkChangeHandler);
                    this._connectivityEventsAttached = true;
                }
            }
        });
        /**
         * 发送消息
         * @param data
         * @returns
         */
        Object.defineProperty(this, "send", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (data) => {
                var _a, _b;
                if (((_a = this._realWebSocket) === null || _a === void 0 ? void 0 : _a.readyState) === EnhanceWechatMiniprogramWebSocket.OPEN) {
                    (_b = this._realWebSocket) === null || _b === void 0 ? void 0 : _b.send(data);
                }
            }
        });
        /**
         * 关闭连接
         * @param code 代码
         * @param reason 原因
         * @returns
         */
        Object.defineProperty(this, "close", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (code, reason) => {
                var _a;
                if (typeof code !== 'number') {
                    reason = code;
                    code = 1000;
                }
                this._clearPendingReconnectIfNeeded();
                this._reconnectWhenOnlineAgain = false;
                this._explicitlyClosed = true;
                this._detachConnectivityEvents();
                return (_a = this._realWebSocket) === null || _a === void 0 ? void 0 : _a.close(code, reason);
            }
        });
        /**
         * 进行ws连接
         */
        Object.defineProperty(this, "open", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (url) => {
                var _a, _b;
                if (url) {
                    this._url = url;
                }
                if (((_a = this._realWebSocket) === null || _a === void 0 ? void 0 : _a.readyState) !== EnhanceWechatMiniprogramWebSocket.OPEN &&
                    ((_b = this._realWebSocket) === null || _b === void 0 ? void 0 : _b.readyState) !== EnhanceWechatMiniprogramWebSocket.CONNECTING) {
                    this._clearPendingReconnectIfNeeded();
                    this._reconnectWhenOnlineAgain = false;
                    this._explicitlyClosed = false;
                    this._createWebSocket();
                }
            }
        });
        /**
         * 创建ws连接
         */
        Object.defineProperty(this, "_createWebSocket", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                var _a, _b, _c;
                const newUrl = typeof this._url === 'string' ? this._url : (_a = this._url) === null || _a === void 0 ? void 0 : _a.call(this, this);
                if (!newUrl)
                    return;
                this._pendingReconnect = undefined;
                this._removeWebSocketEvent();
                const opts = {
                    url: newUrl,
                    protocols: this._protocols || undefined,
                    timeout: this._options.timeout,
                };
                this._realWebSocket = new EnhanceWechatMiniprogramWebSocket(opts);
                this._attempts = this._attempts + 1;
                this.emit('connecting', {
                    detail: { attempts: this._attempts, reconnects: this._reconnects },
                });
                const timeoutCallback = () => {
                    this._connectTimeout = undefined;
                    this._detachConnectivityEvents();
                    this.emit('timeout', {
                        detail: {
                            attempts: this._attempts,
                            reconnects: this._reconnects,
                        },
                    });
                };
                this._connectTimeout = setTimeout(timeoutCallback, (_b = this._options) === null || _b === void 0 ? void 0 : _b.timeout);
                this._dispatchWebSocketEvent();
                if (!((_c = this._options) === null || _c === void 0 ? void 0 : _c.ignoreConnectivityEvents)) {
                    this._attachConnectivityEvents();
                }
            }
        });
        /**
         * 断开ws事件
         */
        Object.defineProperty(this, "_removeWebSocketEvent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                var _a, _b, _c, _d;
                (_a = this._realWebSocket) === null || _a === void 0 ? void 0 : _a.removeEventListener('open', this._webSocketOpenHandler);
                (_b = this._realWebSocket) === null || _b === void 0 ? void 0 : _b.removeEventListener('close', this._webSocketCloseHandler);
                (_c = this._realWebSocket) === null || _c === void 0 ? void 0 : _c.removeEventListener('error', this._webSocketErrorHandler);
                (_d = this._realWebSocket) === null || _d === void 0 ? void 0 : _d.removeEventListener('message', this._webSocketMessageHandler);
            }
        });
        /**
         * 分发ws事件
         */
        Object.defineProperty(this, "_dispatchWebSocketEvent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                var _a, _b, _c, _d;
                (_a = this._realWebSocket) === null || _a === void 0 ? void 0 : _a.addEventListener('open', this._webSocketOpenHandler);
                (_b = this._realWebSocket) === null || _b === void 0 ? void 0 : _b.addEventListener('close', this._webSocketCloseHandler);
                (_c = this._realWebSocket) === null || _c === void 0 ? void 0 : _c.addEventListener('error', this._webSocketErrorHandler);
                (_d = this._realWebSocket) === null || _d === void 0 ? void 0 : _d.addEventListener('message', this._webSocketMessageHandler);
            }
        });
        /**
         * ws连接事件
         * @returns
         */
        Object.defineProperty(this, "_webSocketOpenHandler", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (ev) => {
                if (this._connectTimeout) {
                    clearTimeout(this._connectTimeout);
                    this._connectTimeout = undefined;
                }
                const reconnects = ++this._reconnects;
                const attempts = this._attempts;
                this._attempts = 0;
                this._reconnectWhenOnlineAgain = false;
                this._startHealthCheck();
                return this.emit('open', Object.assign(ev, { detail: { reconnects, attempts } }));
            }
        });
        /**
         * ws 关闭事件
         * @param event
         * @returns
         */
        Object.defineProperty(this, "_webSocketCloseHandler", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (event) => {
                this._reconnect(event);
                this._stopHealthCheck();
                return this.emit('close', event);
            }
        });
        /**
         * ws 异常
         * @param event
         * @returns
         */
        Object.defineProperty(this, "_webSocketErrorHandler", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (event) => {
                return this.emit('error', { detail: { error: event.errMsg } });
            }
        });
        /**
         * ws消息
         * @param event
         * @returns
         */
        Object.defineProperty(this, "_webSocketMessageHandler", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (event) => {
                return this.emit('message', { detail: { data: event.data } });
            }
        });
        if (options) {
            this.setOptions(options);
        }
        this._startHealthCheck();
    }
    setOptions(options) {
        if (!options)
            return;
        this._url = options.url;
        this._protocols = options.protocols;
        const opts = Object.assign(this._options, options.robustOptions || {});
        if (typeof (opts === null || opts === void 0 ? void 0 : opts.timeout) !== 'number') {
            throw new Error('timeout must be the number of milliseconds to timeout a connection attempt');
        }
        if (typeof (opts === null || opts === void 0 ? void 0 : opts.shouldReconnect) !== 'function') {
            throw new Error('shouldReconnect must be a function that returns the number of milliseconds to wait for a reconnect attempt, or null or undefined to not reconnect.');
        }
        this._options = opts;
        if (this._options.automaticOpen) {
            this._createWebSocket();
        }
    }
    /**
     * 进行重连
     * @param event
     * @returns
     */
    _reconnect(event) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            if ((!((_a = this._options) === null || _a === void 0 ? void 0 : _a.should1000Reconnect) && event.code === 1000) || this._explicitlyClosed) {
                this._attempts = 0;
                return;
            }
            const onLine = yield new Promise((resolve) => wx.getNetworkType({
                complete: (res) => (res.networkType !== 'none' ? resolve(true) : resolve(false)),
            }));
            if (!onLine) {
                this._reconnectWhenOnlineAgain = true;
                return;
            }
            const delay = (_c = (_b = this._options) === null || _b === void 0 ? void 0 : _b.shouldReconnect) === null || _c === void 0 ? void 0 : _c.call(_b, event, this);
            if (typeof delay === 'number') {
                this._pendingReconnect = setTimeout(this._createWebSocket, delay);
            }
        });
    }
}

var crc32Exports = {};
var crc32 = {
  get exports(){ return crc32Exports; },
  set exports(v){ crc32Exports = v; },
};

(function () {

	var table = [],
		poly = 0xEDB88320; // reverse polynomial

	// build the table
	function makeTable() {
		var c, n, k;

		for (n = 0; n < 256; n += 1) {
			c = n;
			for (k = 0; k < 8; k += 1) {
				if (c & 1) {
					c = poly ^ (c >>> 1);
				} else {
					c = c >>> 1;
				}
			}
			table[n] = c >>> 0;
		}
	}

	function strToArr(str) {
		// sweet hack to turn string into a 'byte' array
		return Array.prototype.map.call(str, function (c) {
			return c.charCodeAt(0);
		});
	}

	/*
	 * Compute CRC of array directly.
	 *
	 * This is slower for repeated calls, so append mode is not supported.
	 */
	function crcDirect(arr) {
		var crc = -1, // initial contents of LFBSR
			i, j, l, temp;

		for (i = 0, l = arr.length; i < l; i += 1) {
			temp = (crc ^ arr[i]) & 0xff;

			// read 8 bits one at a time
			for (j = 0; j < 8; j += 1) {
				if ((temp & 1) === 1) {
					temp = (temp >>> 1) ^ poly;
				} else {
					temp = (temp >>> 1);
				}
			}
			crc = (crc >>> 8) ^ temp;
		}

		// flip bits
		return crc ^ -1;
	}

	/*
	 * Compute CRC with the help of a pre-calculated table.
	 *
	 * This supports append mode, if the second parameter is set.
	 */
	function crcTable(arr, append) {
		var crc, i, l;

		// if we're in append mode, don't reset crc
		// if arr is null or undefined, reset table and return
		if (typeof crcTable.crc === 'undefined' || !append || !arr) {
			crcTable.crc = 0 ^ -1;

			if (!arr) {
				return;
			}
		}

		// store in temp variable for minor speed gain
		crc = crcTable.crc;

		for (i = 0, l = arr.length; i < l; i += 1) {
			crc = (crc >>> 8) ^ table[(crc ^ arr[i]) & 0xff];
		}

		crcTable.crc = crc;

		return crc ^ -1;
	}

	// build the table
	// this isn't that costly, and most uses will be for table assisted mode
	makeTable();

	crc32.exports = function (val, direct) {
		var val = (typeof val === 'string') ? strToArr(val) : val,
			ret = direct ? crcDirect(val) : crcTable(val);

		// convert to 2's complement hex
		return (ret >>> 0).toString(16);
	};
	crc32Exports.direct = crcDirect;
	crc32Exports.table = crcTable;
}());

var hmacSha256Exports = {};
var hmacSha256 = {
  get exports(){ return hmacSha256Exports; },
  set exports(v){ hmacSha256Exports = v; },
};

var sha256Exports = {};
var sha256 = {
  get exports(){ return sha256Exports; },
  set exports(v){ sha256Exports = v; },
};

var hasRequiredSha256;

function requireSha256 () {
	if (hasRequiredSha256) return sha256Exports;
	hasRequiredSha256 = 1;
	(function (module, exports) {
(function (root, factory) {
			{
				// CommonJS
				module.exports = factory(requireCore());
			}
		}(commonjsGlobal, function (CryptoJS) {

			(function (Math) {
			    // Shortcuts
			    var C = CryptoJS;
			    var C_lib = C.lib;
			    var WordArray = C_lib.WordArray;
			    var Hasher = C_lib.Hasher;
			    var C_algo = C.algo;

			    // Initialization and round constants tables
			    var H = [];
			    var K = [];

			    // Compute constants
			    (function () {
			        function isPrime(n) {
			            var sqrtN = Math.sqrt(n);
			            for (var factor = 2; factor <= sqrtN; factor++) {
			                if (!(n % factor)) {
			                    return false;
			                }
			            }

			            return true;
			        }

			        function getFractionalBits(n) {
			            return ((n - (n | 0)) * 0x100000000) | 0;
			        }

			        var n = 2;
			        var nPrime = 0;
			        while (nPrime < 64) {
			            if (isPrime(n)) {
			                if (nPrime < 8) {
			                    H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
			                }
			                K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));

			                nPrime++;
			            }

			            n++;
			        }
			    }());

			    // Reusable object
			    var W = [];

			    /**
			     * SHA-256 hash algorithm.
			     */
			    var SHA256 = C_algo.SHA256 = Hasher.extend({
			        _doReset: function () {
			            this._hash = new WordArray.init(H.slice(0));
			        },

			        _doProcessBlock: function (M, offset) {
			            // Shortcut
			            var H = this._hash.words;

			            // Working variables
			            var a = H[0];
			            var b = H[1];
			            var c = H[2];
			            var d = H[3];
			            var e = H[4];
			            var f = H[5];
			            var g = H[6];
			            var h = H[7];

			            // Computation
			            for (var i = 0; i < 64; i++) {
			                if (i < 16) {
			                    W[i] = M[offset + i] | 0;
			                } else {
			                    var gamma0x = W[i - 15];
			                    var gamma0  = ((gamma0x << 25) | (gamma0x >>> 7))  ^
			                                  ((gamma0x << 14) | (gamma0x >>> 18)) ^
			                                   (gamma0x >>> 3);

			                    var gamma1x = W[i - 2];
			                    var gamma1  = ((gamma1x << 15) | (gamma1x >>> 17)) ^
			                                  ((gamma1x << 13) | (gamma1x >>> 19)) ^
			                                   (gamma1x >>> 10);

			                    W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
			                }

			                var ch  = (e & f) ^ (~e & g);
			                var maj = (a & b) ^ (a & c) ^ (b & c);

			                var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
			                var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7)  | (e >>> 25));

			                var t1 = h + sigma1 + ch + K[i] + W[i];
			                var t2 = sigma0 + maj;

			                h = g;
			                g = f;
			                f = e;
			                e = (d + t1) | 0;
			                d = c;
			                c = b;
			                b = a;
			                a = (t1 + t2) | 0;
			            }

			            // Intermediate hash value
			            H[0] = (H[0] + a) | 0;
			            H[1] = (H[1] + b) | 0;
			            H[2] = (H[2] + c) | 0;
			            H[3] = (H[3] + d) | 0;
			            H[4] = (H[4] + e) | 0;
			            H[5] = (H[5] + f) | 0;
			            H[6] = (H[6] + g) | 0;
			            H[7] = (H[7] + h) | 0;
			        },

			        _doFinalize: function () {
			            // Shortcuts
			            var data = this._data;
			            var dataWords = data.words;

			            var nBitsTotal = this._nDataBytes * 8;
			            var nBitsLeft = data.sigBytes * 8;

			            // Add padding
			            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
			            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
			            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
			            data.sigBytes = dataWords.length * 4;

			            // Hash final blocks
			            this._process();

			            // Return final computed hash
			            return this._hash;
			        },

			        clone: function () {
			            var clone = Hasher.clone.call(this);
			            clone._hash = this._hash.clone();

			            return clone;
			        }
			    });

			    /**
			     * Shortcut function to the hasher's object interface.
			     *
			     * @param {WordArray|string} message The message to hash.
			     *
			     * @return {WordArray} The hash.
			     *
			     * @static
			     *
			     * @example
			     *
			     *     var hash = CryptoJS.SHA256('message');
			     *     var hash = CryptoJS.SHA256(wordArray);
			     */
			    C.SHA256 = Hasher._createHelper(SHA256);

			    /**
			     * Shortcut function to the HMAC's object interface.
			     *
			     * @param {WordArray|string} message The message to hash.
			     * @param {WordArray|string} key The secret key.
			     *
			     * @return {WordArray} The HMAC.
			     *
			     * @static
			     *
			     * @example
			     *
			     *     var hmac = CryptoJS.HmacSHA256(message, key);
			     */
			    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
			}(Math));


			return CryptoJS.SHA256;

		}));
} (sha256));
	return sha256Exports;
}

var hmacExports = {};
var hmac = {
  get exports(){ return hmacExports; },
  set exports(v){ hmacExports = v; },
};

var hasRequiredHmac;

function requireHmac () {
	if (hasRequiredHmac) return hmacExports;
	hasRequiredHmac = 1;
	(function (module, exports) {
(function (root, factory) {
			{
				// CommonJS
				module.exports = factory(requireCore());
			}
		}(commonjsGlobal, function (CryptoJS) {

			(function () {
			    // Shortcuts
			    var C = CryptoJS;
			    var C_lib = C.lib;
			    var Base = C_lib.Base;
			    var C_enc = C.enc;
			    var Utf8 = C_enc.Utf8;
			    var C_algo = C.algo;

			    /**
			     * HMAC algorithm.
			     */
			    C_algo.HMAC = Base.extend({
			        /**
			         * Initializes a newly created HMAC.
			         *
			         * @param {Hasher} hasher The hash algorithm to use.
			         * @param {WordArray|string} key The secret key.
			         *
			         * @example
			         *
			         *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
			         */
			        init: function (hasher, key) {
			            // Init hasher
			            hasher = this._hasher = new hasher.init();

			            // Convert string to WordArray, else assume WordArray already
			            if (typeof key == 'string') {
			                key = Utf8.parse(key);
			            }

			            // Shortcuts
			            var hasherBlockSize = hasher.blockSize;
			            var hasherBlockSizeBytes = hasherBlockSize * 4;

			            // Allow arbitrary length keys
			            if (key.sigBytes > hasherBlockSizeBytes) {
			                key = hasher.finalize(key);
			            }

			            // Clamp excess bits
			            key.clamp();

			            // Clone key for inner and outer pads
			            var oKey = this._oKey = key.clone();
			            var iKey = this._iKey = key.clone();

			            // Shortcuts
			            var oKeyWords = oKey.words;
			            var iKeyWords = iKey.words;

			            // XOR keys with pad constants
			            for (var i = 0; i < hasherBlockSize; i++) {
			                oKeyWords[i] ^= 0x5c5c5c5c;
			                iKeyWords[i] ^= 0x36363636;
			            }
			            oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;

			            // Set initial values
			            this.reset();
			        },

			        /**
			         * Resets this HMAC to its initial state.
			         *
			         * @example
			         *
			         *     hmacHasher.reset();
			         */
			        reset: function () {
			            // Shortcut
			            var hasher = this._hasher;

			            // Reset
			            hasher.reset();
			            hasher.update(this._iKey);
			        },

			        /**
			         * Updates this HMAC with a message.
			         *
			         * @param {WordArray|string} messageUpdate The message to append.
			         *
			         * @return {HMAC} This HMAC instance.
			         *
			         * @example
			         *
			         *     hmacHasher.update('message');
			         *     hmacHasher.update(wordArray);
			         */
			        update: function (messageUpdate) {
			            this._hasher.update(messageUpdate);

			            // Chainable
			            return this;
			        },

			        /**
			         * Finalizes the HMAC computation.
			         * Note that the finalize operation is effectively a destructive, read-once operation.
			         *
			         * @param {WordArray|string} messageUpdate (Optional) A final message update.
			         *
			         * @return {WordArray} The HMAC.
			         *
			         * @example
			         *
			         *     var hmac = hmacHasher.finalize();
			         *     var hmac = hmacHasher.finalize('message');
			         *     var hmac = hmacHasher.finalize(wordArray);
			         */
			        finalize: function (messageUpdate) {
			            // Shortcut
			            var hasher = this._hasher;

			            // Compute HMAC
			            var innerHash = hasher.finalize(messageUpdate);
			            hasher.reset();
			            var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));

			            return hmac;
			        }
			    });
			}());


		}));
} (hmac));
	return hmacExports;
}

(function (module, exports) {
(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = factory(requireCore(), requireSha256(), requireHmac());
		}
	}(commonjsGlobal, function (CryptoJS) {

		return CryptoJS.HmacSHA256;

	}));
} (hmacSha256));

var HmacSHA256 = hmacSha256Exports;

var encBase64Exports = {};
var encBase64 = {
  get exports(){ return encBase64Exports; },
  set exports(v){ encBase64Exports = v; },
};

(function (module, exports) {
(function (root, factory) {
		{
			// CommonJS
			module.exports = factory(requireCore());
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var C_enc = C.enc;

		    /**
		     * Base64 encoding strategy.
		     */
		    C_enc.Base64 = {
		        /**
		         * Converts a word array to a Base64 string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The Base64 string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            // Shortcuts
		            var words = wordArray.words;
		            var sigBytes = wordArray.sigBytes;
		            var map = this._map;

		            // Clamp excess bits
		            wordArray.clamp();

		            // Convert
		            var base64Chars = [];
		            for (var i = 0; i < sigBytes; i += 3) {
		                var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;
		                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
		                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

		                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;

		                for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
		                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
		                }
		            }

		            // Add padding
		            var paddingChar = map.charAt(64);
		            if (paddingChar) {
		                while (base64Chars.length % 4) {
		                    base64Chars.push(paddingChar);
		                }
		            }

		            return base64Chars.join('');
		        },

		        /**
		         * Converts a Base64 string to a word array.
		         *
		         * @param {string} base64Str The Base64 string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
		         */
		        parse: function (base64Str) {
		            // Shortcuts
		            var base64StrLength = base64Str.length;
		            var map = this._map;

		            // Ignore padding
		            var paddingChar = map.charAt(64);
		            if (paddingChar) {
		                var paddingIndex = base64Str.indexOf(paddingChar);
		                if (paddingIndex != -1) {
		                    base64StrLength = paddingIndex;
		                }
		            }

		            // Convert
		            var words = [];
		            var nBytes = 0;
		            for (var i = 0; i < base64StrLength; i++) {
		                if (i % 4) {
		                    var bits1 = map.indexOf(base64Str.charAt(i - 1)) << ((i % 4) * 2);
		                    var bits2 = map.indexOf(base64Str.charAt(i)) >>> (6 - (i % 4) * 2);
		                    words[nBytes >>> 2] |= (bits1 | bits2) << (24 - (nBytes % 4) * 8);
		                    nBytes++;
		                }
		            }

		            return WordArray.create(words, nBytes);
		        },

		        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
		    };
		}());


		return CryptoJS.enc.Base64;

	}));
} (encBase64));

var Base64 = encBase64Exports;

var encUtf8Exports = {};
var encUtf8 = {
  get exports(){ return encUtf8Exports; },
  set exports(v){ encUtf8Exports = v; },
};

(function (module, exports) {
(function (root, factory) {
		{
			// CommonJS
			module.exports = factory(requireCore());
		}
	}(commonjsGlobal, function (CryptoJS) {

		return CryptoJS.enc.Utf8;

	}));
} (encUtf8));

var Utf8 = encUtf8Exports;

function calculateSignature(options) {
    const { timestamp, uri, method, data, appKey, appSecret } = options;
    const params = {
        method: method.toUpperCase(),
        url: uri,
        body_crc32: 0,
    };
    if (data) {
        const query = Object.keys(data)
            .sort()
            .map((key) => `${key}=${encodeURIComponent(typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key])}`)
            .join('&');
        params['body_crc32'] = Number('0x' + crc32Exports(query));
    }
    const stringToEncode = Object.keys(params)
        .sort()
        .map((key) => `${key}=${params[key]}`)
        .join('');
    const salt = MD5(`${appKey}${appSecret}${timestamp}`).toString().toUpperCase();
    const sign = HmacSHA256(stringToEncode, salt).toString().toUpperCase();
    return sign;
}
function generateAuthorization(params) {
    const { timestamp, appKey, appSecret, uri, method, data } = params;
    const sign = calculateSignature({
        timestamp,
        appKey,
        appSecret,
        uri,
        method,
        data,
    });
    const base64EncodeStr = `${appKey}:${sign}:${timestamp}`;
    const auth = Base64.stringify(Utf8.parse(base64EncodeStr));
    return auth;
}

class RTC extends Subscribe {
    constructor(options, rtcConfig) {
        super();
        Object.defineProperty(this, "_trtc", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_app", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_trtcOptions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "ready", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        /**
         * 兼容老的逻辑
         * @deprecated
         * @param options
         * @returns
         */
        Object.defineProperty(this, "oldInitialize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (options, rtcConfig = {}) => __awaiter(this, void 0, void 0, function* () {
                this._trtcOptions = {
                    sdkAppID: Number(options.config.app_id),
                    userID: options.user_id,
                    userSig: options.user_sig,
                    roomID: Number(options.voiceId),
                };
                return this._trtc.createPusher(rtcConfig).pusherAttributes;
            })
        });
        /**
         *
         * @param options
         * @param rtcConfig
         * @returns
         */
        Object.defineProperty(this, "initializeV2", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (options, rtcConfig = {}) => __awaiter(this, void 0, void 0, function* () {
                this._trtcOptions = {
                    sdkAppID: Number(options.sdkAppID),
                    userID: options.userID,
                    userSig: options.userSig,
                    roomID: options.roomID,
                };
                return this._trtc.createPusher(rtcConfig).pusherAttributes;
            })
        });
        this._app = options;
        this._trtc = rtcConfig.trtc;
        this._registerRtcEventHandler();
    }
    /**
     * 进行rtc的初始化
     * @param opts
     * @returns
     */
    initialize(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const { roomID, userID, rtcConfig = {} } = opts;
            const data = {
                voice_id: roomID,
                user_id: userID,
            };
            const auth = generateAuthorization({
                timestamp: Number((Date.now() / 1000).toFixed(0)),
                appKey: this._app.key,
                appSecret: this._app.secret,
                uri: this._app.sign,
                method: 'GET',
                data,
            });
            const options = yield this._initOptions(data, auth);
            this._trtcOptions = {
                sdkAppID: Number(options.config.app_id),
                userID: options.user_id,
                userSig: options.user_sig,
                roomID,
            };
            return this._trtc.createPusher(rtcConfig).pusherAttributes || {};
        });
    }
    /**
     * 去网关取签名配置
     * @param data
     * @param auth
     * @returns
     */
    _initOptions(data, auth) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!this._app.sign)
                    throw new Error('app配置项`sign`不得为空');
                wx.request({
                    url: `${this._app.gateway}${this._app.sign}`,
                    data,
                    header: {
                        'x-request-appid': this._app.key,
                        Authorization: auth,
                    },
                    success: (res) => __awaiter(this, void 0, void 0, function* () {
                        if (!res.data) {
                            return reject('');
                        }
                        try {
                            const resData = res.data;
                            const rtcOptions = resData.data;
                            resolve(rtcOptions);
                        }
                        catch (e) {
                            reject(e);
                        }
                    }),
                    fail: (err) => reject(err),
                });
            });
        });
    }
    /**
     * 开始推流
     */
    start() {
        var _a, _b;
        (_b = (_a = this._trtc.getPusherInstance()) === null || _a === void 0 ? void 0 : _a.start) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
    /**
     * 结束推流
     */
    stop() {
        var _a, _b;
        (_b = (_a = this._trtc.getPusherInstance()) === null || _a === void 0 ? void 0 : _a.stop) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
    /**
     * 进入房间
     * @returns
     */
    enterRoom() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._trtc.enterRoom(this._trtcOptions);
        });
    }
    /**
     * 退出房间
     * @returns
     */
    exitRoom() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._trtc.getPusherInstance())
                return { pusher: {}, playerList: [] };
            return this._trtc.exitRoom();
        });
    }
    /**
     * 切换麦克风
     * @param state 麦克风状态
     * @returns
     */
    toggleMicrophone(state) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return (_a = this._trtc) === null || _a === void 0 ? void 0 : _a.setPusherAttributes({ enableMic: state });
        });
    }
    /**
     * 获取播放列表
     * @returns
     */
    getPlayerList() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._trtc.getPlayerList();
        });
    }
    /**
     * 注册rtc事件
     */
    _registerRtcEventHandler() {
        Object.keys(this._trtc.EVENT).forEach((eventName) => this._trtc.on(eventName, (ev) => this.emit(eventName, ev)));
    }
    /**
     * 推流状态变化回调
     * @param event
     */
    pusherStateChangeHandler(event) {
        var _a;
        (_a = this._trtc) === null || _a === void 0 ? void 0 : _a.pusherEventHandler(event);
    }
    /**
     * 推流网络状态变化回调
     * @param event
     */
    pusherNetStatusHandler(event) {
        var _a;
        (_a = this._trtc) === null || _a === void 0 ? void 0 : _a.pusherNetStatusHandler(event);
    }
    /**
     * 推流失败回调
     * @param event
     */
    pusherErrorHandler(event) {
        var _a;
        (_a = this._trtc) === null || _a === void 0 ? void 0 : _a.pusherErrorHandler(event);
    }
    /**
     * 推流播放背景音回调
     * @param event
     */
    pusherBGMStartHandler(event) {
        var _a;
        (_a = this._trtc) === null || _a === void 0 ? void 0 : _a.pusherBGMStartHandler(event);
    }
    /**
     * 推流背景音进度变化回调
     * @param event
     */
    pusherBGMProgressHandler(event) {
        var _a;
        (_a = this._trtc) === null || _a === void 0 ? void 0 : _a.pusherBGMProgressHandler(event);
    }
    /**
     * 推流背景页播放完成回调
     * @param event
     */
    pusherBGMCompleteHandler(event) {
        var _a;
        (_a = this._trtc) === null || _a === void 0 ? void 0 : _a.pusherBGMCompleteHandler(event);
    }
    /**
     * 推流音量变化提醒回调
     * @param event
     */
    pusherAudioVolumeNotify(event) {
        var _a;
        (_a = this._trtc) === null || _a === void 0 ? void 0 : _a.pusherAudioVolumeNotify(event);
    }
    /**
     * 播放流状态变化回调
     * @param event
     */
    playerStateChange(event) {
        var _a;
        (_a = this._trtc) === null || _a === void 0 ? void 0 : _a.playerEventHandler(event);
    }
    /**
     * 播放流全屏变化回调
     * @param event
     */
    playerFullscreenChange(event) {
        var _a;
        (_a = this._trtc) === null || _a === void 0 ? void 0 : _a.playerFullscreenChange(event);
    }
    /**
     * 播放流网络变化回调
     * @param event
     */
    playerNetStatus(event) {
        var _a;
        (_a = this._trtc) === null || _a === void 0 ? void 0 : _a.playerNetStatus(event);
    }
    /**
     * 播放流音量调整回调
     * @param event
     */
    playerAudioVolumeNotify(event) {
        var _a;
        (_a = this._trtc) === null || _a === void 0 ? void 0 : _a.playerAudioVolumeNotify(event);
    }
}

const defaultAppConfig = {
    key: '',
    secret: '',
    gateway: 'https://app-gateway.realsee.com',
    startup: '/sdk/open/startup/cold.json',
    sign: '/sdk/open/live/voice/sign.json',
};
const defaultJSBridgeConfig = {
    ak: 'vr_live_miniapp',
    endpoint: 'proxy',
    members: { weapp: 'miniprogram', web: 'webview' },
    origin: 'wss://ws.realsee.com',
    qs: 'wssid={{uuid}}&wstsp={{ts}}&wssig={{sign}}',
    sk: '153B7156CFEC0E2F805994DC6C9D70F4',
    tpl: '{{origin}}/{{endpoint}}/{{uuid}}/{{member}}/{{ak}}/{{ts}}/{{sign}}',
};
class JSBridge {
    constructor(props, opts = {}) {
        Object.defineProperty(this, "_rtc", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_robustWebSocket", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_appConfig", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_config", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_socketParams", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_props", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "init", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (props) => __awaiter(this, void 0, void 0, function* () {
                const { options } = props;
                const { app, rtc } = options;
                this._appConfig = this._getAppConfig(app);
                // this._config = await this._getStartUpConfig(this._appConfig)
                this._socketParams = generateSocketParams(this._config);
                this._robustWebSocket.open(this._socketParams.wssUrl4Weapp);
                this._initRtc(rtc.trtc);
            })
        });
        Object.defineProperty(this, "_initRtc", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (trtc) => {
                this._rtc = new RTC(this._appConfig, { trtc });
            }
        });
        Object.defineProperty(this, "dispose", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this._removeWebSocketEvent();
                this._robustWebSocket.close(1000, '退出关闭');
            }
        });
        Object.defineProperty(this, "_onConnecting", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (event) => {
                console.info('realsee jsbridge is connecting', event);
            }
        });
        Object.defineProperty(this, "_onOpen", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (event) => {
                var _a;
                console.info('realsee jsbridge is open', event);
                (_a = this._props) === null || _a === void 0 ? void 0 : _a.onReady();
            }
        });
        Object.defineProperty(this, "_onTimeout", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (event) => {
                var _a;
                console.info('realsee jsbridge connect timeout', event);
                (_a = this._props) === null || _a === void 0 ? void 0 : _a.onError(new Error('timeout'));
            }
        });
        Object.defineProperty(this, "_onMessage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (event) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d, _e;
                const message = event.detail.data;
                if (typeof message === 'string') {
                    const msg = this._parseStandardMessage(message);
                    switch (true) {
                        case msg.type === StandardMessageType.message && msg.isBuildInMessage: {
                            // 内置消息处理
                            this._handleBuildInMessage(msg.rawMessage);
                            break;
                        }
                        case msg.type === StandardMessageType.message: {
                            // 外置消息
                            const { id, data } = msg.rawMessage;
                            (_a = this._props) === null || _a === void 0 ? void 0 : _a.onMessage({ id, data });
                            break;
                        }
                        case msg.type === StandardMessageType.request: {
                            // request & oldRequest
                            const { id, method, args } = msg.rawMessage;
                            let error = null;
                            let result = null;
                            try {
                                result = yield ((_b = this._props) === null || _b === void 0 ? void 0 : _b.onRequest(method, args));
                            }
                            catch (e) {
                                error = e.message || e;
                            }
                            this._postMessage({ id, method, error, result, command: 'response' });
                            break;
                        }
                        case msg.type === StandardMessageType.scheme: {
                            // request & oldRequest
                            const { id, actionUrl, type } = msg.rawMessage;
                            const callback = (data) => {
                                // 处理方法
                                let errmsg = data instanceof Error ? data.message : null;
                                let result = data instanceof Error ? null : data;
                                this._postMessage({
                                    id,
                                    command: 'rsSchemeResponse',
                                    result,
                                    errmsg,
                                });
                            };
                            (_c = this._props) === null || _c === void 0 ? void 0 : _c.onScheme({ actionUrl, type, callback });
                            break;
                        }
                        default: {
                            (_d = this._props) === null || _d === void 0 ? void 0 : _d.onError(new Error(`unknown message=(${JSON.stringify(msg)})`));
                        }
                    }
                    // this._props?.onMessage(message)
                }
                else {
                    (_e = this._props) === null || _e === void 0 ? void 0 : _e.onError(new Error('Unsupported message type'));
                }
            })
        });
        Object.defineProperty(this, "_onClosing", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                console.info('realsee jsbridge is closing');
            }
        });
        Object.defineProperty(this, "_onClose", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (event) => {
                var _a;
                (_a = this._props) === null || _a === void 0 ? void 0 : _a.onClose(event);
            }
        });
        Object.defineProperty(this, "_onError", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (event) => { var _a; return (_a = this._props) === null || _a === void 0 ? void 0 : _a.onError(new Error(event.detail.error)); }
        });
        /**
         * 获取启动配置
         * @param opts
         * @deprecated
         * @returns
         */
        // private async _getStartUpConfig(opts: Required<RealseeVRWebviewAppOptions>) {
        //   return new Promise<StartUpConfig>((resolve, reject) => {
        //     const auth = generateAuthorization({
        //       timestamp: Number((Date.now() / 1000).toFixed(0)),
        //       appKey: opts.key,
        //       appSecret: opts.secret,
        //       uri: opts.startup,
        //       method: 'GET',
        //       data: null,
        //     })
        //     wx.request({
        //       url: `${opts.gateway}${opts.startup}`,
        //       header: {
        //         'x-request-appid': opts.key,
        //         Authorization: auth,
        //       },
        //       success: async (res) => {
        //         if (!res.data) {
        //           return reject('')
        //         }
        //         try {
        //           const rsWeappOptions = (res.data as WechatMiniprogram.IAnyObject).data?.rsWeappBridge
        //           if (rsWeappOptions) {
        //             resolve(rsWeappOptions)
        //           } else {
        //             reject(new Error('getRealseeSDKStartUpConfig failed!'))
        //           }
        //         } catch (e) {
        //           reject(e)
        //         }
        //       },
        //       fail: (err) => reject(err),
        //     })
        //   })
        // }
        /**
         * - 解析消息
         * - 所有h5来的消息进行转换标准结构
         * - 尽量兼容各种历史版本
         * @param message
         */
        Object.defineProperty(this, "_parseStandardMessage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (message) => {
                try {
                    const msg = JSON.parse(message);
                    switch (true) {
                        case msg.command === 'request': {
                            // WeappBridgeRequest
                            return { type: StandardMessageType.request, isOldRequest: false, isBuildInMessage: false, rawMessage: msg };
                        }
                        case msg.command === 'rsSchemeRequest': {
                            // SchemeRequest
                            return { type: StandardMessageType.scheme, isOldRequest: false, isBuildInMessage: false, rawMessage: msg };
                        }
                        case msg.command === 'message': {
                            // MessageRequest
                            return {
                                type: StandardMessageType.message,
                                isOldRequest: false,
                                isBuildInMessage: typeof msg.data === 'string' && BuilInMessageArray.includes(msg.data),
                                rawMessage: msg,
                            };
                        }
                        default: {
                            // WeappBridgeOldRequest
                            return {
                                type: StandardMessageType.request,
                                isOldRequest: true,
                                isBuildInMessage: false,
                                rawMessage: msg,
                            };
                        }
                    }
                }
                catch (e) {
                    const msg = message;
                    return {
                        type: StandardMessageType.message,
                        isOldRequest: true,
                        isBuildInMessage: BuilInMessageArray.includes(msg),
                        rawMessage: msg,
                    };
                }
            }
        });
        /**
         * 处理内置的消息
         * @param message
         */
        Object.defineProperty(this, "_handleBuildInMessage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (message) => {
                switch (message) {
                    case BuilInMessage.isReady: {
                        return this._postMessage(BuilInMessage.ready);
                    }
                    case BuilInMessage.ping: {
                        return this._postMessage(BuilInMessage.pong);
                    }
                    case BuilInMessage.alive: {
                        return this._postMessage(BuilInMessage.alive);
                    }
                    case BuilInMessage.pong: {
                        return setTimeout(() => this._postMessage(BuilInMessage.ping), 10000);
                    }
                    case BuilInMessage.ready: {
                        return this._postMessage(BuilInMessage.ready);
                    }
                    default: {
                        return this._postMessage("I don't know what you mean");
                    }
                }
            }
        });
        Object.defineProperty(this, "_postMessage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (data) => {
                this._robustWebSocket.send(JSON.stringify(data));
            }
        });
        this._props = props;
        this._config = Object.assign(defaultJSBridgeConfig, opts);
        this._robustWebSocket = new RobustWebSocket();
        this._addWebSocketEvent();
    }
    get rtc() {
        return this._rtc;
    }
    get wssQuery4Webview() {
        var _a;
        return (_a = this._socketParams) === null || _a === void 0 ? void 0 : _a.wssQuery4Webview;
    }
    /**
     * 注册ws的事件
     */
    _addWebSocketEvent() {
        this._robustWebSocket.on('connecting', this._onConnecting);
        this._robustWebSocket.on('open', this._onOpen);
        this._robustWebSocket.on('timeout', this._onTimeout);
        this._robustWebSocket.on('message', this._onMessage);
        this._robustWebSocket.on('closing', this._onClosing);
        this._robustWebSocket.on('close', this._onClose);
        this._robustWebSocket.on('error', this._onError);
    }
    _removeWebSocketEvent() {
        this._robustWebSocket.off('connecting', this._onConnecting);
        this._robustWebSocket.off('open', this._onOpen);
        this._robustWebSocket.off('timeout', this._onTimeout);
        this._robustWebSocket.off('message', this._onMessage);
        this._robustWebSocket.off('closing', this._onClosing);
        this._robustWebSocket.off('close', this._onClose);
        this._robustWebSocket.off('error', this._onError);
    }
    /**
     * 网关请求参数
     * @param opts
     * @returns
     */
    _getAppConfig(opts) {
        const config = Object.assign({}, defaultAppConfig, opts);
        if (!config.key)
            throw new Error('unavailable appKey');
        if (!config.secret)
            throw new Error('unavailable appKey');
        return config;
    }
}
var BuilInMessage;
(function (BuilInMessage) {
    BuilInMessage["isReady"] = "Are You OK?";
    BuilInMessage["ready"] = "I`m OK!";
    BuilInMessage["ping"] = "ping";
    BuilInMessage["pong"] = "pong";
    BuilInMessage["alive"] = "I`m alive!";
})(BuilInMessage || (BuilInMessage = {}));
const BuilInMessageArray = [
    BuilInMessage.alive,
    BuilInMessage.isReady,
    BuilInMessage.ping,
    BuilInMessage.pong,
    BuilInMessage.ready,
];
var StandardMessageType;
(function (StandardMessageType) {
    StandardMessageType["request"] = "request";
    StandardMessageType["scheme"] = "scheme";
    StandardMessageType["message"] = "message";
    StandardMessageType["unknown"] = "unknown";
})(StandardMessageType || (StandardMessageType = {}));

const app = getApp({ allowDefault: true });
const getRsVrWebviewProps = (keys) => {
    const _keys = Array.isArray(keys) ? keys : [keys];
    const props = {};
    _keys.forEach((key) => {
        props[key] = app.__RsVrWebviewPropsMap__.get(key);
    });
    if (!Array.isArray(keys)) {
        return props[keys];
    }
    return props;
};

var trtcWxExports = {};
var trtcWx = {
  get exports(){ return trtcWxExports; },
  set exports(v){ trtcWxExports = v; },
};

(function (module, exports) {
	!function(e,t){module.exports=t();}(commonjsGlobal,(function(){function e(t){return (e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(t)}function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){for(var r=0;r<t.length;r++){var s=t[r];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s);}}function s(e,t,s){return t&&r(e.prototype,t),s&&r(e,s),e}function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,s);}return r}function n(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t]);})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t));}));}return e}function o(){var e=(new Date).getTime(),t=new Date(e),r=t.getHours(),s=t.getMinutes(),a=t.getSeconds(),i=t.getMilliseconds();return r=r<10?"0".concat(r):r,s=s<10?"0".concat(s):s,a=a<10?"0".concat(a):a,"".concat(r,":").concat(s,":").concat(a,".").concat(i)}var u="TRTC-WX",l=0,c=1,p=2,m=3,h=new(function(){function e(){t(this,e),this.logLevel=0;}return s(e,[{key:"setLogLevel",value:function(e){this.logLevel=e;}},{key:"log",value:function(){var e;this.logLevel===l&&(e=console).log.apply(e,[u,o()].concat(Array.prototype.slice.call(arguments)));}},{key:"info",value:function(){var e;this.logLevel<=c&&(e=console).info.apply(e,[u,o()].concat(Array.prototype.slice.call(arguments)));}},{key:"warn",value:function(){var e;this.logLevel<=p&&(e=console).warn.apply(e,[u,o()].concat(Array.prototype.slice.call(arguments)));}},{key:"error",value:function(){var e;this.logLevel<=m&&(e=console).error.apply(e,[u,o()].concat(Array.prototype.slice.call(arguments)));}}]),e}());var y=function(e){var t=/[\u4e00-\u9fa5]/;return e.sdkAppID?void 0===e.roomID&&void 0===e.strRoomID?(h.error("未设置 roomID"),!1):!e.strRoomID&&(e.roomID<1||e.roomID>4294967296)?(h.error("roomID 超出取值范围 1 ~ 4294967295"),!1):e.strRoomID&&t.test(e.strRoomID)?(h.error("strRoomID 请勿使用中文字符"),!1):e.userID?e.userID&&t.test(e.userID)?(h.error("userID 请勿使用中文字符"),!1):!!e.userSig||(h.error("未设置 userSig"),!1):(h.error("未设置 userID"),!1):(h.error("未设置 sdkAppID"),!1)},v={LOCAL_JOIN:"LOCAL_JOIN",LOCAL_LEAVE:"LOCAL_LEAVE",KICKED_OUT:"KICKED_OUT",REMOTE_USER_JOIN:"REMOTE_USER_JOIN",REMOTE_USER_LEAVE:"REMOTE_USER_LEAVE",REMOTE_VIDEO_ADD:"REMOTE_VIDEO_ADD",REMOTE_VIDEO_REMOVE:"REMOTE_VIDEO_REMOVE",REMOTE_AUDIO_ADD:"REMOTE_AUDIO_ADD",REMOTE_AUDIO_REMOVE:"REMOTE_AUDIO_REMOVE",REMOTE_STATE_UPDATE:"REMOTE_STATE_UPDATE",LOCAL_NET_STATE_UPDATE:"LOCAL_NET_STATE_UPDATE",REMOTE_NET_STATE_UPDATE:"REMOTE_NET_STATE_UPDATE",LOCAL_AUDIO_VOLUME_UPDATE:"LOCAL_AUDIO_VOLUME_UPDATE",REMOTE_AUDIO_VOLUME_UPDATE:"REMOTE_AUDIO_VOLUME_UPDATE",VIDEO_FULLSCREEN_UPDATE:"VIDEO_FULLSCREEN_UPDATE",BGM_PLAY_START:"BGM_PLAY_START",BGM_PLAY_FAIL:"BGM_PLAY_FAIL",BGM_PLAY_PROGRESS:"BGM_PLAY_PROGRESS",BGM_PLAY_COMPLETE:"BGM_PLAY_COMPLETE",ERROR:"ERROR",IM_READY:"IM_READY",IM_MESSAGE_RECEIVED:"IM_MESSAGE_RECEIVED",IM_NOT_READY:"IM_NOT_READY",IM_KICKED_OUT:"IM_KICKED_OUT",IM_ERROR:"IM_ERROR"},g={url:"",mode:"RTC",autopush:!1,enableCamera:!1,enableMic:!1,enableAgc:!1,enableAns:!1,enableEarMonitor:!1,enableAutoFocus:!0,enableZoom:!1,minBitrate:600,maxBitrate:900,videoWidth:360,videoHeight:640,beautyLevel:0,whitenessLevel:0,videoOrientation:"vertical",videoAspect:"9:16",frontCamera:"front",enableRemoteMirror:!1,localMirror:"auto",enableBackgroundMute:!1,audioQuality:"high",audioVolumeType:"voicecall",audioReverbType:0,waitingImage:"",waitingImageHash:"",beautyStyle:"smooth",filter:"",netStatus:{}},f={src:"",mode:"RTC",autoplay:!0,muteAudio:!0,muteVideo:!0,orientation:"vertical",objectFit:"fillCrop",enableBackgroundMute:!1,minCache:1,maxCache:2,soundMode:"speaker",enableRecvMessage:!1,autoPauseIfNavigate:!0,autoPauseIfOpenNative:!0,isVisible:!0,_definitionType:"main",netStatus:{}};(new Date).getTime();function d(){var e=new Date;return e.setTime((new Date).getTime()+0),e.toLocaleString()}var E=function(e){var t=[];if(e&&e.TUIScene&&t.push(e.TUIScene),e&&"test"===e.env)return "default";if(wx&&wx.TUIScene&&t.push(wx.TUIScene),wx&&"function"==typeof getApp){var r=getApp().globalData;r&&r.TUIScene&&t.push(r.TUIScene);}return wx&&wx.getStorage({key:"TUIScene",success:function(e){t.push(e.data);}}),t[0]||"default"},A=new(function(){function e(){t(this,e),this.sdkAppId="",this.userId="",this.version="",this.common={};}return s(e,[{key:"setConfig",value:function(e){this.sdkAppId="".concat(e.sdkAppId),this.userId="".concat(e.userId),this.version="".concat(e.version),this.common.TUIScene=E(e);}},{key:"log",value:function(e){wx.request({url:"https://yun.tim.qq.com/v5/AVQualityReportSvc/C2S?sdkappid=1&cmdtype=jssdk_log",method:"POST",header:{"content-type":"application/json"},data:{timestamp:d(),sdkAppId:this.sdkAppId,userId:this.userId,version:this.version,log:JSON.stringify(n(n({},e),this.common))}});}}]),e}()),I="enterRoom",_="exitRoom",L="setPusherAttributes",b="setPlayerAttributes",T="init",D="error",O="connectServer",k="startPusher",S="openCamera",P="screenCap",R="pusherResolution",M="pusherCodeRate",U="collectionFirstFrame",C="encoderStart",x="enterRoomSuccess",w="exitRoomSuccess",V="kicked_out",B="renderFirstFrame",G="miniAppHang",j="closeSuspension",N="other",F="update",H="addUser",K="remove_user",Y="update_user_video",q="update_user_audio",J="pusherStart",W="pusherStop",Q="pusherPause",X="pusherResume",Z=function(){function r(e,s){t(this,r),this.context=wx.createLivePusherContext(s),this.pusherAttributes={},Object.assign(this.pusherAttributes,g,e);}return s(r,[{key:"setPusherAttributes",value:function(e){return Object.assign(this.pusherAttributes,e),this.pusherAttributes}},{key:"start",value:function(e){h.log("[apiLog][pusherStart]"),A.log({name:J,options:e}),this.context.start(e);}},{key:"stop",value:function(e){h.log("[apiLog][pusherStop]"),A.log({name:W,options:e}),this.context.stop(e);}},{key:"pause",value:function(e){h.log("[apiLog] pusherPause()"),A.log({name:Q,options:e}),this.context.pause(e);}},{key:"resume",value:function(e){h.log("[apiLog][pusherResume]"),A.log({name:X,options:e}),this.context.resume(e);}},{key:"switchCamera",value:function(e){return h.log("[apiLog][switchCamera]"),this.pusherAttributes.frontCamera="front"===this.pusherAttributes.frontCamera?"back":"front",this.context.switchCamera(e),this.pusherAttributes}},{key:"sendMessage",value:function(e){h.log("[apiLog][sendMessage]",e.msg),this.context.sendMessage(e);}},{key:"snapshot",value:function(){var e=this;return h.log("[apiLog][pusherSnapshot]"),new Promise((function(t,r){e.context.snapshot({quality:"raw",complete:function(e){e.tempImagePath?(wx.saveImageToPhotosAlbum({filePath:e.tempImagePath,success:function(r){t(e);},fail:function(e){h.error("[error] pusher截图失败: ",e),r(new Error("截图失败"));}}),t(e)):(h.error("[error] snapShot 回调失败",e),r(new Error("截图失败")));}});}))}},{key:"toggleTorch",value:function(e){this.context.toggleTorch(e);}},{key:"startDumpAudio",value:function(e){this.context.startDumpAudio(e);}},{key:"stopDumpAudio",value:function(e){this.context.startDumpAudio(e);}},{key:"playBGM",value:function(e){h.log("[apiLog] playBGM() url: ",e.url),this.context.playBGM(e);}},{key:"pauseBGM",value:function(e){h.log("[apiLog] pauseBGM()"),this.context.pauseBGM(e);}},{key:"resumeBGM",value:function(e){h.log("[apiLog] resumeBGM()"),this.context.resumeBGM(e);}},{key:"stopBGM",value:function(e){h.log("[apiLog] stopBGM()"),this.context.stopBGM(e);}},{key:"setBGMVolume",value:function(t){h.log("[apiLog] setBGMVolume() volume:",t),t&&t.volume&&"object"===e(t.volume)&&t.volume.volume?this.context.setBGMVolume(t.volume):this.context.setBGMVolume(t);}},{key:"setMICVolume",value:function(t){h.log("[apiLog] setMICVolume() volume:",t),t&&t.volume&&"object"===e(t.volume)&&t.volume.volume?this.context.setMICVolume(t.volume):this.context.setMICVolume(t);}},{key:"startPreview",value:function(e){h.log("[apiLog] startPreview()"),this.context.startPreview(e);}},{key:"stopPreview",value:function(e){h.log("[apiLog] stopPreview()"),this.context.stopPreview(e);}},{key:"reset",value:function(){return console.log("Pusher reset",this.context),this.pusherConfig={},this.context&&(this.stop({success:function(){console.log("Pusher context.stop()");}}),this.context=null),this.pusherAttributes}}]),r}(),z=function e(r){t(this,e),Object.assign(this,{userID:"",streams:{}},r);},$=function(){function e(r,s){t(this,e),this.ctx=s,this.playerAttributes=this.getInitPlayerAttributes(r);}return s(e,[{key:"play",value:function(e){this.getPlayerContext().play(e);}},{key:"stop",value:function(e){this.getPlayerContext().stop(e);}},{key:"mute",value:function(e){this.getPlayerContext().mute(e);}},{key:"pause",value:function(e){this.getPlayerContext().pause(e);}},{key:"resume",value:function(e){this.getPlayerContext().resume(e);}},{key:"requestFullScreen",value:function(e){var t=this;return new Promise((function(r,s){t.getPlayerContext().requestFullScreen({direction:e.direction,success:function(e){r(e);},fail:function(e){s(e);}});}))}},{key:"requestExitFullScreen",value:function(){var e=this;return new Promise((function(t,r){e.getPlayerContext().exitFullScreen({success:function(e){t(e);},fail:function(e){r(e);}});}))}},{key:"snapshot",value:function(e){var t=this;return h.log("[playerSnapshot]",e),new Promise((function(e,r){t.getPlayerContext().snapshot({quality:"raw",complete:function(t){t.tempImagePath?(wx.saveImageToPhotosAlbum({filePath:t.tempImagePath,success:function(r){h.log("save photo is success",r),e(t);},fail:function(e){h.error("save photo is fail",e),r(e);}}),e(t)):(h.error("snapShot 回调失败",t),r(new Error("截图失败")));}});}))}},{key:"setPlayerAttributes",value:function(e){this.playerAttributes=Object.assign({},this.playerAttributes,e);}},{key:"getPlayerContext",value:function(){return this.playerContext||(this.playerContext=wx.createLivePlayerContext(this.playerAttributes.id,this.ctx)),this.playerContext}},{key:"reset",value:function(){this.playerContext&&(this.playerContext.stop(),this.playerContext=void 0),this.playerAttributes=this.getInitPlayerAttributes();}},{key:"getInitPlayerAttributes",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object.assign({},f,{userID:"",streamType:"",streamID:"",id:"",hasVideo:!1,hasAudio:!1,volume:0,playerContext:void 0},e)}}]),e}(),ee="UserController",te=function(){function e(r,s){t(this,e),this.ctx=s,this.userMap=new Map,this.userList=[],this.streamList=[],this.emitter=r;}return s(e,[{key:"userEventHandler",value:function(e){var t=e.detail.code,r=e.detail.message,s={name:N,code:t,message:r,data:""};switch(t){case 0:h.log(r,t);break;case 1001:h.log("已经连接推流服务器",t),s.name=O;break;case 1002:h.log("已经与服务器握手完毕,开始推流",t),s.name=k;break;case 1003:h.log("打开摄像头成功",t),s.name=S;break;case 1004:h.log("录屏启动成功",t),s.name=P;break;case 1005:h.log("推流动态调整分辨率",t),s.name=R;break;case 1006:h.log("推流动态调整码率",t),s.name=M;break;case 1007:h.log("首帧画面采集完成",t),s.name=U;break;case 1008:h.log("编码器启动",t),s.name=C;break;case 1018:h.log("进房成功",t),s.name=x,s.data="event enterRoom success",this.emitter.emit(v.LOCAL_JOIN);break;case 1019:h.log("退出房间",t),r.indexOf("reason[0]")>-1?(s.name=w,s.data="event exitRoom success"):(s.name=V,s.data="event abnormal exitRoom",this.emitter.emit(v.KICKED_OUT));break;case 2003:h.log("渲染首帧视频",t),s.name=B;break;case-1301:h.error("打开摄像头失败: ",t),s.name=D,s.data="event start camera failed",this.emitter.emit(v.ERROR,{code:t,message:r});break;case-1302:s.name=D,s.data="event start microphone failed",h.error("打开麦克风失败: ",t),this.emitter.emit(v.ERROR,{code:t,message:r});break;case-1303:h.error("视频编码失败: ",t),s.name=D,s.data="event video encode failed",this.emitter.emit(v.ERROR,{code:t,message:r});break;case-1304:h.error("音频编码失败: ",t),s.name=D,s.data="event audio encode failed",this.emitter.emit(v.ERROR,{code:t,message:r});break;case-1307:h.error("推流连接断开: ",t),s.name=D,s.data="event pusher stream failed",this.emitter.emit(v.ERROR,{code:t,message:r});break;case-100018:h.error("进房失败: userSig 校验失败，请检查 userSig 是否填写正确",t,r),s.name=D,s.data="event userSig is error",this.emitter.emit(v.ERROR,{code:t,message:r});break;case 5e3:h.log("小程序被挂起: ",t),s.name=G,s.data="miniApp is hang";break;case 5001:h.log("小程序悬浮窗被关闭: ",t),s.name=j;break;case 1021:h.log("网络类型发生变化，需要重新进房",t);break;case 2007:h.log("本地视频播放loading: ",t);break;case 2004:h.log("本地视频播放开始: ",t);break;case 1031:case 1032:case 1033:case 1034:this._handleUserEvent(e);}A.log(s);}},{key:"_handleUserEvent",value:function(e){var t,r=e.detail.code,s=e.detail.message;if(!e.detail.message||"string"!=typeof s)return h.warn(ee,"userEventHandler 数据格式错误"),!1;try{t=JSON.parse(e.detail.message);}catch(e){return h.warn(ee,"userEventHandler 数据格式错误",e),!1}switch(this.emitter.emit(v.LOCAL_STATE_UPDATE,e),A.log({name:F,code:r,message:s,data:t}),r){case 1031:this.addUser(t);break;case 1032:this.removeUser(t);break;case 1033:this.updateUserVideo(t);break;case 1034:this.updateUserAudio(t);}}},{key:"addUser",value:function(e){var t=this;h.log("addUser",e);var r=e.userlist;Array.isArray(r)&&r.length>0&&r.forEach((function(e){var r=e.userid,s=t.getUser(r);s||(s=new z({userID:r}),t.userList.push({userID:r})),t.userMap.set(r,s),t.emitter.emit(v.REMOTE_USER_JOIN,{userID:r,userList:t.userList,playerList:t.getPlayerList()}),A.log({name:H,userID:r,userList:t.userList,playerList:t.getPlayerList()});}));}},{key:"removeUser",value:function(e){var t=this,r=e.userlist;Array.isArray(r)&&r.length>0&&r.forEach((function(e){var r=e.userid,s=t.getUser(r);s&&s.streams&&(t._removeUserAndStream(r),s.streams.main&&s.streams.main.reset(),s.streams.aux&&s.streams.aux.reset(),t.emitter.emit(v.REMOTE_USER_LEAVE,{userID:r,userList:t.userList,playerList:t.getPlayerList()}),A.log({name:K,userID:r,userList:t.userList,playerList:t.getPlayerList()}),s=void 0,t.userMap.delete(r));}));}},{key:"updateUserVideo",value:function(e){var t=this;h.log(ee,"updateUserVideo",e);var r=e.userlist;Array.isArray(r)&&r.length>0&&r.forEach((function(e){var r=e.userid,s=e.streamtype,a="".concat(r,"_").concat(s),i=a,n=e.hasvideo,o=e.playurl,u=t.getUser(r);if(u){var l=u.streams[s];h.log(ee,"updateUserVideo start",u,s,l),l?(l.setPlayerAttributes({hasVideo:n}),n||l.playerAttributes.hasAudio||t._removeStream(l)):(l=new $({userID:r,streamID:a,hasVideo:n,src:o,streamType:s,id:i},t.ctx),u.streams[s]=l,t._addStream(l)),"aux"===s&&(n?(l.setPlayerAttributes({objectFit:"contain",muteAudio:!1}),t._addStream(l)):t._removeStream(l)),t.userList.find((function(e){if(e.userID===r)return e["has".concat(s.replace(/^\S/,(function(e){return e.toUpperCase()})),"Video")]=n,!0})),h.log(ee,"updateUserVideo end",u,s,l);var c=n?v.REMOTE_VIDEO_ADD:v.REMOTE_VIDEO_REMOVE;t.emitter.emit(c,{player:l.playerAttributes,userList:t.userList,playerList:t.getPlayerList()}),A.log({name:Y,player:l.playerAttributes,userList:t.userList,playerList:t.getPlayerList()});}}));}},{key:"updateUserAudio",value:function(e){var t=this,r=e.userlist;Array.isArray(r)&&r.length>0&&r.forEach((function(e){var r=e.userid,s="main",a="".concat(r,"_").concat(s),i=a,n=e.hasaudio,o=e.playurl,u=t.getUser(r);if(u){var l=u.streams.main;l?(l.setPlayerAttributes({hasAudio:n}),n||l.playerAttributes.hasVideo||t._removeStream(l)):(l=new $({userID:r,streamID:a,hasAudio:n,src:o,streamType:s,id:i},t.ctx),u.streams.main=l,t._addStream(l)),t.userList.find((function(e){if(e.userID===r)return e["has".concat(s.replace(/^\S/,(function(e){return e.toUpperCase()})),"Audio")]=n,!0}));var c=n?v.REMOTE_AUDIO_ADD:v.REMOTE_AUDIO_REMOVE;t.emitter.emit(c,{player:l.playerAttributes,userList:t.userList,playerList:t.getPlayerList()}),A.log({name:q,player:l.playerAttributes,userList:t.userList,playerList:t.getPlayerList()});}}));}},{key:"getUser",value:function(e){return this.userMap.get(e)}},{key:"getStream",value:function(e){var t=e.userID,r=e.streamType,s=this.userMap.get(t);if(s)return s.streams[r]}},{key:"getUserList",value:function(){return this.userList}},{key:"getStreamList",value:function(){return this.streamList}},{key:"getPlayerList",value:function(){return this.getStreamList().map((function(e){return Object.assign({},e.playerAttributes)}))}},{key:"reset",value:function(){return this.streamList.forEach((function(e){e.reset();})),this.streamList=[],this.userList=[],this.userMap.clear(),{userList:this.userList,streamList:this.streamList}}},{key:"_removeUserAndStream",value:function(e){this.streamList=this.streamList.filter((function(t){return t.playerAttributes.userID!==e&&""!==t.playerAttributes.userID})),this.userList=this.userList.filter((function(t){return t.userID!==e}));}},{key:"_addStream",value:function(e){-1===this.streamList.findIndex((function(t){return t.playerAttributes.userID===e.playerAttributes.userID&&t.playerAttributes.streamType===e.playerAttributes.streamType}))&&this.streamList.push(e);}},{key:"_removeStream",value:function(e){this.streamList=this.streamList.filter((function(t){return t.playerAttributes.userID!==e.playerAttributes.userID||t.playerAttributes.streamType!==e.playerAttributes.streamType})),this.getUser(e.playerAttributes.userID).streams[e.playerAttributes.streamType]=void 0;}}]),e}(),re=function(){function e(){t(this,e);}return s(e,[{key:"on",value:function(e,t,r){"function"==typeof t?(this._stores=this._stores||{},(this._stores[e]=this._stores[e]||[]).push({cb:t,ctx:r})):console.error("listener must be a function");}},{key:"emit",value:function(e){this._stores=this._stores||{};var t,r=this._stores[e];if(r){r=r.slice(0),(t=[].slice.call(arguments,1))[0]={eventCode:e,data:t[0]};for(var s=0,a=r.length;s<a;s++)r[s].cb.apply(r[s].ctx,t);}}},{key:"off",value:function(e,t){if(this._stores=this._stores||{},arguments.length){var r=this._stores[e];if(r)if(1!==arguments.length){for(var s=0,a=r.length;s<a;s++)if(r[s].cb===t){r.splice(s,1);break}}else delete this._stores[e];}else this._stores={};}}]),e}();return function(){function e(r,s){var a=this;t(this,e),this.env="prod",this.ctx=r,this.eventEmitter=new re,this.pusherInstance=null,this.userController=new te(this.eventEmitter,this.ctx),this.EVENT=v,this.TUIScene=null==s?void 0:s.TUIScene,"test"!==(null==s?void 0:s.env)?wx.getSystemInfo({success:function(e){return a.systemInfo=e}}):(this.env="test",A.log=function(){},h.log=function(){},h.warn=function(){});}return s(e,[{key:"initLog",value:function(e){A.setConfig({sdkAppId:e.sdkAppID,userId:e.userID,version:"wechat-mini",TUIScene:this.TUIScene,env:this.env});}},{key:"setLogLevel",value:function(e){h.setLogLevel(e);}},{key:"on",value:function(e,t,r){h.log("[on] 事件订阅: ".concat(e)),this.eventEmitter.on(e,t,r);}},{key:"off",value:function(e,t){h.log("[off] 取消订阅: ".concat(e)),this.eventEmitter.off(e,t);}},{key:"createPusher",value:function(e){return this.pusherInstance=new Z(e,this.ctx),h.log("pusherInstance",this.pusherInstance),this.pusherInstance}},{key:"getPusherInstance",value:function(){return this.pusherInstance}},{key:"enterRoom",value:function(e){h.log("[apiLog] [enterRoom]",e);var t=function(e){if(!y(e))return null;e.scene=e.scene&&"rtc"!==e.scene?e.scene:"videocall",e.enableBlackStream=e.enableBlackStream||"",e.encsmall=e.encsmall||0,e.cloudenv=e.cloudenv||"PRO",e.streamID=e.streamID||"",e.userDefineRecordID=e.userDefineRecordID||"",e.privateMapKey=e.privateMapKey||"",e.pureAudioMode=e.pureAudioMode||"",e.recvMode=e.recvMode||1;var t="";return t=e.strRoomID?"&strroomid=".concat(e.strRoomID):"&roomid=".concat(e.roomID),"room://cloud.tencent.com/rtc?sdkappid=".concat(e.sdkAppID).concat(t,"&userid=").concat(e.userID,"&usersig=").concat(e.userSig,"&appscene=").concat(e.scene,"&encsmall=").concat(e.encsmall,"&cloudenv=").concat(e.cloudenv,"&enableBlackStream=").concat(e.enableBlackStream,"&streamid=").concat(e.streamID,"&userdefinerecordid=").concat(e.userDefineRecordID,"&privatemapkey=").concat(e.privateMapKey,"&pureaudiomode=").concat(e.pureAudioMode,"&recvmode=").concat(e.recvMode,"&component=").concat(function(){var e="";try{e=wx&&wx.TUIScene?wx.TUIScene:wx&&wx.getStorageSync&&wx.getStorageSync("TUIScene")?wx.getStorageSync("TUIScene"):getApp&&getApp()&&getApp().globalData&&getApp().globalData.TUIScene?getApp().globalData.TUIScene:"";}catch(t){e="",console.error(t);}switch(e){case"sampleDemo":return 2;case"TUICalling":return 3;case"TUIRoom":return 5;case"TUIVoiceRoom":return 6;case"TIMCalling":return 10;case"TUICallKit":return 14;case"TIMCallKit":return 15;default:return 1}}())}(e);return this.initLog(n(n({},e),{},{env:this.env})),A.log({name:T}),t||(this.eventEmitter.emit(v.ERROR,{message:"进房参数错误"}),A.log({name:D,message:"进房参数错误",data:e})),this.pusherInstance.setPusherAttributes(n(n({},e),{},{url:t})),h.warn("[statusLog] [enterRoom]",this.pusherInstance.pusherAttributes),A.log({name:I,pusherConfig:this.pusherInstance.pusherAttributes}),this.getPusherAttributes()}},{key:"exitRoom",value:function(){this.userController.reset();var e=Object.assign({pusher:this.pusherInstance.reset()},{playerList:this.userController.getPlayerList()});return this.eventEmitter.emit(v.LOCAL_LEAVE),A.log({name:_,data:e}),e}},{key:"getPlayerList",value:function(){var e=this.userController.getPlayerList();return h.log("[apiLog][getStreamList]",e),e}},{key:"setPusherAttributes",value:function(e){return h.log("[apiLog] [setPusherAttributes], ",e),this.pusherInstance.setPusherAttributes(e),h.warn("[statusLog] [setPusherAttributes]",this.pusherInstance.pusherAttributes),A.log({name:L,options:e,pusherConfig:this.pusherInstance.pusherAttributes}),this.pusherInstance.pusherAttributes}},{key:"getPusherAttributes",value:function(){return h.log("[apiLog] [getPusherConfig]"),this.pusherInstance.pusherAttributes}},{key:"setPlayerAttributes",value:function(e,t){h.log("[apiLog] [setPlayerAttributes] id",e,"options: ",t);var r=this._transformStreamID(e),s=r.userID,a=r.streamType,i=this.userController.getStream({userID:s,streamType:a});return i?(i.setPlayerAttributes(t),A.log({name:b,id:e,options:t,playerList:this.getPlayerList()}),this.getPlayerList()):this.getPlayerList()}},{key:"getPlayerInstance",value:function(e){var t=this._transformStreamID(e),r=t.userID,s=t.streamType;return h.log("[api][getPlayerInstance] id:",e),this.userController.getStream({userID:r,streamType:s})}},{key:"switchStreamType",value:function(e){h.log("[apiLog] [switchStreamType] id: ",e);var t=this._transformStreamID(e),r=t.userID,s=t.streamType,a=this.userController.getStream({userID:r,streamType:s});return "main"===a._definitionType?(a.src=a.src.replace("main","small"),a._definitionType="small"):(a.src=a.src.replace("small","main"),a._definitionType="main"),this.getPlayerList()}},{key:"pusherEventHandler",value:function(e){this.userController.userEventHandler(e);}},{key:"pusherNetStatusHandler",value:function(e){var t=e.detail.info;this.pusherInstance.setPusherAttributes(t),this.eventEmitter.emit(v.LOCAL_NET_STATE_UPDATE,{pusher:this.pusherInstance.pusherAttributes});}},{key:"pusherErrorHandler",value:function(e){try{var t=e.detail.errCode,r=e.detail.errMsg;this.eventEmitter.emit(v.ERROR,{code:t,message:r}),A.log({name:D,code:t,message:r});}catch(t){h.error("pusher error data parser exception",e,t);}}},{key:"pusherBGMStartHandler",value:function(e){this.eventEmitter.emit(v.BGM_PLAY_START);}},{key:"pusherBGMProgressHandler",value:function(e){var t,r,s,a;this.eventEmitter.emit(v.BGM_PLAY_PROGRESS,{progress:null===(t=e.data)||void 0===t||null===(r=t.detail)||void 0===r?void 0:r.progress,duration:null===(s=e.data)||void 0===s||null===(a=s.detail)||void 0===a?void 0:a.duration});}},{key:"pusherBGMCompleteHandler",value:function(e){this.eventEmitter.emit(v.BGM_PLAY_COMPLETE);}},{key:"pusherAudioVolumeNotify",value:function(e){this.pusherInstance.pusherAttributes.volume=e.detail.volume,this.eventEmitter.emit(v.LOCAL_AUDIO_VOLUME_UPDATE,{pusher:this.pusherInstance.pusherAttributes});}},{key:"playerEventHandler",value:function(e){h.log("[statusLog][playerStateChange]",e),this.eventEmitter.emit(v.REMOTE_STATE_UPDATE,e);}},{key:"playerFullscreenChange",value:function(e){this.eventEmitter.emit(v.VIDEO_FULLSCREEN_UPDATE);}},{key:"playerNetStatus",value:function(e){var t=this._transformStreamID(e.currentTarget.dataset.streamid),r=t.userID,s=t.streamType,a=this.userController.getStream({userID:r,streamType:s});!a||a.videoWidth===e.detail.info.videoWidth&&a.videoHeight===e.detail.info.videoHeight||(a.setPlayerAttributes({netStatus:e.detail.info}),this.eventEmitter.emit(v.REMOTE_NET_STATE_UPDATE,{playerList:this.userController.getPlayerList()}));}},{key:"playerAudioVolumeNotify",value:function(e){var t=this._transformStreamID(e.currentTarget.dataset.streamid),r=t.userID,s=t.streamType,a=this.userController.getStream({userID:r,streamType:s}),i=e.detail.volume;a.setPlayerAttributes({volume:i}),this.eventEmitter.emit(v.REMOTE_AUDIO_VOLUME_UPDATE,{playerList:this.userController.getPlayerList()});}},{key:"_transformStreamID",value:function(e){var t=e.lastIndexOf("_");return {userID:e.slice(0,t),streamType:e.slice(t+1)}}}]),e}()}));
	
} (trtcWx));

const defaultRtcConfig = {
    /**
     * 是否开麦
     */
    enableMic: true,
    /**
     * 是否开启摄像头
     */
    enableCamera: false,
    /**
     * 是否开启增益
     */
    enableAgc: true,
    /**
     * 是否开启降噪
     */
    enableAns: true,
    /**
     * 是否开启远程镜像
     */
    enableRemoteMirror: false,
    /**
     * 是否开启手势缩放
     */
    enableZoom: false,
};
class Controller extends Subscribe {
    constructor(component) {
        super();
        Object.defineProperty(this, "_props", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_jsBridge", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_component", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_webviewState", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                active: false,
                orientation: 'Portrait',
                minimized: 0,
            }
        });
        Object.defineProperty(this, "init", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (props) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d;
                this._props = typeof props === 'string' ? getRsVrWebviewProps(props) : props;
                try {
                    this._checkProps(this._props);
                    if (!((_a = this._props.options.rtc) === null || _a === void 0 ? void 0 : _a.trtc)) {
                        this._props.options.rtc = Object.assign(this._props.options.rtc || {}, { trtc: new trtcWxExports(this._component) });
                    }
                    yield this._jsBridge.init(this._props);
                    const wssQuery4Webview = this._jsBridge.wssQuery4Webview || '';
                    let url = appendSearch(this._props.url, wssQuery4Webview);
                    // 加open_app_id
                    try {
                        const open_app_id = yield ((_b = this._props.options.app) === null || _b === void 0 ? void 0 : _b.key);
                        if (open_app_id) {
                            url = appendSearch(url, `open_app_id=${open_app_id}`);
                        }
                    }
                    catch (e) { }
                    // 加wx_token
                    try {
                        const token = yield ((_d = (_c = this._props.behaviors) === null || _c === void 0 ? void 0 : _c.getToken) === null || _d === void 0 ? void 0 : _d.call(_c));
                        if (token) {
                            url = appendSearch(url, `wx_token=${token}`);
                        }
                    }
                    catch (e) { }
                    // 加埋点的rstpsid
                    try {
                        const rstpsid = yield wx.getStorageSync('__Realsee_Telemetry_Session_Storage__');
                        if (typeof rstpsid === 'string' && rstpsid !== '') {
                            url = appendSearch(url, `rstpsid=${rstpsid}`);
                        }
                    }
                    catch (e) { }
                    yield this._setDataAsync({ url });
                }
                catch (e) {
                    this._onError(e);
                }
            })
        });
        Object.defineProperty(this, "dispose", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                try {
                    this._rtcQuit();
                }
                catch (e) { }
                this._jsBridge.dispose();
                this._disposers.forEach((disposer) => disposer());
                this._disposers = [];
            }
        });
        Object.defineProperty(this, "_disposers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "_addInnerEventLister", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                // 监听webview变化
                const _onAppShow = () => {
                    this._webviewState.active = true;
                    this.emit('webviewStateChange', this._webviewState);
                };
                const _onAppHide = () => {
                    this._webviewState.active = false;
                    this.emit('webviewStateChange', this._webviewState);
                };
                wx.onAppShow(_onAppShow);
                wx.onAppHide(_onAppHide);
                this._disposers.push(() => wx.offAppShow(_onAppShow), () => wx.offAppHide(_onAppHide));
            }
        });
        /**
         * 检查props的合法性
         * @param props
         */
        Object.defineProperty(this, "_checkProps", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (props) => {
                // 1、检查props
                if (!props)
                    throw new Error('unavailable props, please check!');
                let { url, options } = props;
                // 2、检查url
                if (!url)
                    throw new Error('unavailable url, please check!');
                // 3、检查options
                if (!options)
                    throw new Error('unavailable options, please check!');
                const { app } = options;
                if (!(app === null || app === void 0 ? void 0 : app.key) || !(app === null || app === void 0 ? void 0 : app.secret))
                    throw new Error('unavailable app options, please check!');
            }
        });
        Object.defineProperty(this, "_setData", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (data, callback) => {
                this._component.setData(data, callback);
            }
        });
        Object.defineProperty(this, "_setDataAsync", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (data) => __awaiter(this, void 0, void 0, function* () {
                return new Promise((success) => this._setData(data, () => success()));
            })
        });
        /**
         * 全局报错透传
         * @param error
         */
        Object.defineProperty(this, "_onError", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (error) => {
                var _a, _b;
                if (typeof ((_a = this._props.behaviors) === null || _a === void 0 ? void 0 : _a.onError) === 'function') {
                    (_b = this._props.behaviors) === null || _b === void 0 ? void 0 : _b.onError(error);
                }
                else {
                    throw error;
                }
            }
        });
        Object.defineProperty(this, "_onMessage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (message) => {
                console.log(message);
            }
        });
        Object.defineProperty(this, "_onReady", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => { }
        });
        Object.defineProperty(this, "_onClose", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => { }
        });
        Object.defineProperty(this, "_onRequest", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (method, args) => __awaiter(this, void 0, void 0, function* () {
                // 先走 behaviors
                const { behaviors = {} } = this._props;
                if (typeof behaviors[method] === 'function') {
                    return yield behaviors[method](args);
                }
                // 再走wx的方法
                if (wx.canIUse(method)) {
                    return new Promise((success, fail) => wx[method](Object.assign(Object.assign({}, args), { success, fail: (err) => fail(err.errMsg) })));
                }
                // 最后报错
                return Promise.reject(`behavior=${method} not implemented`);
            })
        });
        Object.defineProperty(this, "_innerSchemes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                'common/staticData': (opts) => __awaiter(this, void 0, void 0, function* () { return yield this._innerSchemeCall(opts, this._getStaticData); }),
                'common/loadProgress': ({ callback }) => callback(true),
                'common/closeLoading': ({ callback }) => callback(true),
                'common/minimize': ({ callback }) => callback(new Error('小程序不支持该方法')),
                'common/setOrientation': ({ callback }) => callback(new Error('小程序不支持该方法')),
                'common/keepScreenLight': ({ callback, params }) => wx.setKeepScreenOn({
                    keepScreenOn: Number(params.enable) === 1,
                    success: ({ errMsg }) => callback(errMsg),
                    fail: ({ errMsg }) => callback(new Error(errMsg)),
                }),
                'common/closeWebView': (opts) => __awaiter(this, void 0, void 0, function* () { var _e; return yield this._innerSchemeCall(opts, (_e = this._props.behaviors) === null || _e === void 0 ? void 0 : _e._onExitVr); }),
                'common/saveImage2Album': ({ callback, params }) => wx.saveImageToPhotosAlbum({
                    filePath: params.base64,
                    success: ({ errMsg }) => callback(errMsg),
                    fail: ({ errMsg }) => callback(new Error(errMsg)),
                }),
                'common/preload': ({ callback, params }) => {
                    const urls = JSON.parse(params.urls);
                    const promises = urls.map((url) => new Promise((resolve) => wx.request({ url, success: ({ errMsg }) => resolve(errMsg), fail: ({ errMsg }) => resolve(errMsg) })));
                    Promise.all(promises).then((res) => callback(res));
                },
                'common/shock': ({ callback }) => wx.vibrateLong({
                    success: ({ errMsg }) => callback(errMsg),
                    fail: ({ errMsg }) => callback(new Error(errMsg)),
                }),
                'common/getBangsHeight': ({ callback }) => callback(0),
                'common/getDeviceInfo': (opts) => __awaiter(this, void 0, void 0, function* () { return yield this._innerSchemeCall(opts, this._getStaticData); }),
                'common/getUserInfo': (opts) => __awaiter(this, void 0, void 0, function* () { var _f, _g; return yield this._innerSchemeCall(opts, (_g = (_f = this._props) === null || _f === void 0 ? void 0 : _f.behaviors) === null || _g === void 0 ? void 0 : _g.getUserInfo); }),
                'common/login': (opts) => __awaiter(this, void 0, void 0, function* () { var _h, _j; return yield this._innerSchemeCall(opts, (_j = (_h = this._props) === null || _h === void 0 ? void 0 : _h.behaviors) === null || _j === void 0 ? void 0 : _j.requestLogin); }),
                'common/getWebViewState': ({ callback }) => callback(this._webviewState),
                'common/detectMicro': (opts) => __awaiter(this, void 0, void 0, function* () { return yield this._innerSchemeCall(opts, this._rtcDetectMicro); }),
                'common/webViewState': ({ callback, type }) => {
                    if (type === 'callAndBackfeed') {
                        callback(this._webviewState);
                    }
                    else {
                        const handler = (webviewState) => callback(webviewState);
                        this.on('webviewStateChange', handler);
                        this._disposers.push(() => this.off('webviewStateChange', handler));
                    }
                },
                'common/webViewError': ({ callback }) => {
                    const handler = (err) => callback(err.message);
                    this.on('error', handler);
                    this._disposers.push(() => this.off('error', handler));
                },
                'common/actionShare': (opts) => __awaiter(this, void 0, void 0, function* () { var _k; return yield this._innerSchemeCall(opts, (_k = this._props.behaviors) === null || _k === void 0 ? void 0 : _k.actionShare); }),
                'live/join': (opts) => __awaiter(this, void 0, void 0, function* () { return yield this._innerSchemeCall(opts, this._rtcJoin); }),
                'live/toggleMicro': (opts) => __awaiter(this, void 0, void 0, function* () { return yield this._innerSchemeCall(opts, this._rtcToggleMicro); }),
                'live/quit': (opts) => __awaiter(this, void 0, void 0, function* () { return yield this._innerSchemeCall(opts, this._rtcQuit); }),
                'live/weakNetwork': ({ callback }) => {
                    const handler = (isWeakNetwork) => callback(isWeakNetwork);
                    this.on('weakNetwork', handler);
                    this._disposers.push(() => this.off('weakNetwork', handler));
                },
                'live/userVolumes': ({ callback }) => {
                    const handler = (userVolumes) => callback(userVolumes);
                    this.on('userVolumes', handler);
                    this._disposers.push(() => this.off('userVolumes', handler));
                },
            }
        });
        Object.defineProperty(this, "_onScheme", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ({ actionUrl, type = 'callAndBackfeed', callback }) => {
                var _a, _b;
                const baseScheme = ((_b = (_a = this._props.options) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.scheme) || '';
                const url = actionUrl.replace(baseScheme + '://', '');
                const [scheme, query = ''] = url.split('?');
                const params = parse(query);
                const { schemes = {} } = this._props;
                // 用户定义的 scheme
                if (typeof schemes[scheme] === 'function') {
                    return schemes[scheme](callback, type, params);
                }
                // 内置的schemes
                if (typeof this._innerSchemes[scheme] === 'function') {
                    return this._innerSchemes[scheme].call(this, { callback, type, params });
                }
                return callback(new Error(`scheme=(${scheme}) not implemented`));
            }
        });
        /**
         * webview发生了错误
         * @param err
         */
        Object.defineProperty(this, "onWebViewError", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (err) => {
                var _a, _b;
                (_b = (_a = this._props.behaviors) === null || _a === void 0 ? void 0 : _a.onWebViewError) === null || _b === void 0 ? void 0 : _b.call(_a, err);
                this.emit('error', err);
            }
        });
        Object.defineProperty(this, "_getStaticData", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => __awaiter(this, void 0, void 0, function* () {
                const staticData = {};
                let info = this._props.options.info || {};
                try {
                    const systemInfo = yield wx.getSystemInfo();
                    staticData.sysModel = systemInfo.model;
                    staticData.sysVersion = systemInfo.system;
                }
                catch (e) {
                    this._onError(e);
                }
                try {
                    const { networkType } = yield wx.getNetworkType();
                    staticData.network = networkType;
                }
                catch (e) {
                    this._onError(e);
                }
                return Object.assign(Object.assign({}, info), staticData);
            })
        });
        Object.defineProperty(this, "_innerSchemeCall", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ({ callback, type, params }, schemeMethod) => __awaiter(this, void 0, void 0, function* () {
                if (type === 'callAndBackfeed') {
                    try {
                        const result = yield (schemeMethod === null || schemeMethod === void 0 ? void 0 : schemeMethod(params));
                        callback(result);
                    }
                    catch (e) {
                        callback(e);
                    }
                }
                else {
                    callback(new Error(`unavailable scheme type=(${type})`));
                }
            })
        });
        /**
         * 以下是小程序trtc相关的方法
         */
        /**
         * 检查麦克风权限
         * @returns
         */
        Object.defineProperty(this, "_rtcDetectMicro", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => __awaiter(this, void 0, void 0, function* () {
                let result = false;
                const setting = yield wx.getSetting();
                if (setting.authSetting['scope.record'])
                    return true;
                result = yield new Promise((res) => wx.authorize({ scope: 'scope.record', success: () => res(true), fail: () => res(false) }));
                if (result)
                    return result;
                result = yield new Promise((res) => wx.showModal({
                    content: '您尚未授权麦克风',
                    confirmText: '去设置',
                    success: (resp) => {
                        if (resp.cancel) {
                            res(false);
                        }
                        if (resp.confirm) {
                            wx.openSetting({
                                success: (re) => res(re.authSetting['scope.record'] || false),
                                fail: () => res(false),
                            });
                        }
                    },
                    fail: () => res(false),
                }));
                return result;
            })
        });
        /**
         * 进入带看
         * @param params
         * @returns
         */
        Object.defineProperty(this, "_rtcJoin", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (params) => __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        if (params.sdkAppID && params.userID && params.userSig && params.roomID) {
                            yield this._jsBridge.rtc.initializeV2(params, defaultRtcConfig);
                        }
                        else if (params.config) {
                            yield this._jsBridge.rtc.oldInitialize(Object.assign(Object.assign({}, params), { rtcConfig: defaultRtcConfig }));
                        }
                        else if (params.roomID && params.userID) {
                            yield this._jsBridge.rtc.initialize(Object.assign(Object.assign({}, params), { rtcConfig: defaultRtcConfig }));
                        }
                        const pusher = yield this._jsBridge.rtc.enterRoom();
                        yield this._setDataAsync({
                            liveMode: true,
                            pusher,
                        });
                        this._jsBridge.rtc.start();
                        resolve(true);
                    }
                    catch (e) {
                        this._onError(e);
                        reject(e);
                    }
                }));
            })
        });
        /**
         * 退出带看
         * @returns
         */
        Object.defineProperty(this, "_rtcQuit", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        yield this._jsBridge.rtc.stop();
                        const { pusher = {}, playerList = [] } = yield this._jsBridge.rtc.exitRoom();
                        yield this._setDataAsync({
                            liveMode: false,
                            pusher,
                            playerList,
                        });
                        resolve(true);
                    }
                    catch (e) {
                        this._onError(e);
                        reject(e);
                    }
                }));
            })
        });
        /**
         * 控制麦克风
         * @param params
         * @returns
         */
        Object.defineProperty(this, "_rtcToggleMicro", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (params) => __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    const state = Number(params.flag) === 1 || params.flag === true;
                    try {
                        const pusher = yield this._jsBridge.rtc.toggleMicrophone(state);
                        yield this._setDataAsync({ pusher });
                        resolve(true);
                    }
                    catch (e) {
                        this._onError(e);
                        reject(e);
                    }
                }));
            })
        });
        this._component = component;
        this._jsBridge = new JSBridge({
            onReady: this._onReady,
            onClose: this._onClose,
            onMessage: this._onMessage,
            onError: this._onError,
            onRequest: this._onRequest,
            onScheme: this._onScheme,
        });
        this._addInnerEventLister();
    }
    get data() {
        return this._component.data;
    }
}

var options = {
    properties: {
        props: String,
    },
    lifetimes: {
        created() {
            this.controller = new Controller(this);
        },
        attached() {
            this.controller.init(this.data.props);
        },
        detached() {
            this.controller.dispose();
        },
    },
    methods: {
        _handleWebViewError(err) {
            this.controller.onWebViewError(err);
        },
        _handleWebViewLoad(ev) {
            console.info(`realsee vr-webview loaded url=(${ev.detail.src})`);
        },
    },
};

Component(options);
// export {}
//# sourceMappingURL=index.js.map
