function nestedEncoder(plainString = false, pattern = false) {
	if(!plainString || typeof plainString === 'undefined' || !pattern || typeof pattern === 'undefined') {
		return nestedEncoderOptions();
	} else {
		pattern = pattern.toLowerCase();
		if(typeof pattern !== 'object') {
			pattern = pattern.split(',');
		}
		return nestedEncoderEncode(plainString, pattern);
	}
}

function nestedEncoderOptions() {
	var options = {};
	options['parameters'] = ['plainString', 'pattern'];
	options['encodings'] = {
		'ascii': 'ASCII encoding',
		'base<x>': 'different numbering systems where x is the base of the numbering system; x can be one of: 1, 2, 3, 4, 5, 6, 7, 8, 12, 16, 20, 64',
		'abase<x>': 'building onto base (see base<x>) the string is ASCII encoded (see ascii) before the base encoding',
		'binary': 'see base2',
		'duodec': 'see base12',
		'hex': 'see base16',
		'html': 'HTML based encoding',
		'oct': 'see base8',
		'pental': 'see base5',
		'quaternary': 'see base4',
		'rot<x>': 'rotate the characters by x (can be negative); only rotates the base latin letters in the ASCII table',
		'rot<x>a': 'building onto rot (see rot<x>) the string is rotated regardless of the position on the ASCII / Unicode table',
		'senary': 'see base6',
		'septenary': 'see base7',
		'trinary': 'see base3',
		'unary': 'see base1',
		'unicode': 'Unicode based encoding',
		'vigesimal': 'see base20',
	};
	return options;
}

function nestedEncoderEncode(plainString, pattern) {
	var alias = {'binary': 'base2', 'duodec': 'base12', 'hex': 'base16', 'oct': 'base8', 'pental': 'base5', 'quaternary': 'base4', 'senary': 'base6', 'septenary': 'base7', 'trinary': 'base3', 'unary': 'base1', 'vigesimal': 'base20'};
	var encodedString = plainString;
	for(let i = 0; i < pattern.length; i++) {
		if(Object.keys(alias).indexOf(pattern[i]) != -1)
			pattern[i] = (alias[pattern[i]]);
		if(pattern[i].startsWith('abase') || pattern[i].startsWith('base')) {
			let base = 0;
			if(pattern[i][0] == 'a') {
				encodedString = nestedEncoderEncodeAscii(encodedString);
				base = pattern[i].substring(5);
			} else {
				base = pattern[i].substring(4);
			}
			if(base == 1)
				encodedString = nestedEncoderEncodeUnary(encodedString);
			else if(base == 64)
				encodedString = nestedEncoderEncodeBase64(encodedString);
			else
				encodedString = nestedEncoderEncodeMultiBase(encodedString, base);
			continue;
		}
		else if(pattern[i].startsWith('rot')) {
			let move = 0;
			let fullCharset = false;
			if(pattern[i].slice(-1) == 'a') {
				move = pattern[i].substring(3, pattern[i].length - 1);
				fullCharset = true;
			} else {
				move = pattern[i].substring(3);
			}
			move = parseInt(move);
			encodedString = nestedEncoderEncodeRot(encodedString, move, fullCharset);
		}
		switch(pattern[i]) {
			case 'ascii':
				encodedString = nestedEncoderEncodeAscii(encodedString);
				break
			case 'html':
				encodedString = nestedEncoderEncodeHTML(encodedString);
				break;
			case 'unicode':
				encodedString = nestedEncoderEncodeUnicode(encodedString);
				break;
		}
	}
	return {'result': encodedString};
}

function nestedEncoderEncodeAscii(plainString) {
	var encodedString = '';
	for(let i = 0; i < plainString.length; i++) {
		encodedString += plainString.charCodeAt(i) + ' ';
	}
	return encodedString.trim();
}

function nestedEncoderEncodeBase64(plainString) {
	return btoa(plainString);
}

function nestedEncoderEncodeHTML(plainString) {
	var encodedString = '';
	for(let i = 0; i < plainString.length; i++) {
		encodedString += '&#x' + nestedEncoderEncodeMultiBase(nestedEncoderEncodeAscii(plainString[i]), 16) + ';';
	}
	return encodedString;
}

function nestedEncoderEncodeMultiBase(plainString, base) {
	var encodedString = '';
	plainString = plainString.split(' ');
	for(let i = 0; i < plainString.length; i++) {
		encodedString += parseInt(plainString[i]).toString(base) + ' ';
	}
	return encodedString.trim();
}

function nestedEncoderEncodeRot(plainString, move, fullCharset) {
	if(!fullCharset)
		move = move % 26;
	if(move == 0)
		return plainString;
	move = parseInt(move);
	var encodedString = '';
	for(let i = 0; i < plainString.length; i++) {
		let charCode = parseInt(plainString.charCodeAt(i));
		if(!fullCharset) {
			if(charCode < 65 || charCode > 122 || (charCode > 90 && charCode < 97))
				null;
			else if(charCode < 91 && charCode + move >= 91)
				charCode += move - 26;
			else if(charCode > 96 && charCode + move <= 96)
				charCode += move + 26;
			else if(charCode + move < 65)
				charCode += move + 26;
			else if(charCode + move > 122)
				charCode += move - 26;
			else
				charCode += move;
		} else {
			charCode += move;
		}
		encodedString += String.fromCharCode.apply(null, [charCode]);
	}
	return encodedString;
}

function nestedEncoderEncodeUnary(plainString) {
	var encodedString = '';
	plainString = plainString.split(' ');
	for(let i = 0; i < plainString.length; i++) {
		encodedString += '1'.repeat(plainString[i]) + ' ';
	}
	return encodedString.trim();
}

function nestedEncoderEncodeUnicode(plainString) {
	var encodedString = '';
	for(let i = 0; i < plainString.length; i++) {
		encodedString += '\\u' + nestedEncoderEncodeMultiBase(nestedEncoderEncodeAscii(plainString[i]), 16).padStart(4, 0);
	}
	return encodedString;
}