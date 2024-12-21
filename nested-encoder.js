function nestedEncoder(plainString = false, pattern = false) {
	if(!plainString || typeof plainString === 'undefined' || !pattern || typeof pattern === 'undefined') {
		return nestedEncoderOptions();
	} else {
		if(typeof pattern !== 'object') {
			pattern = pattern.split(',');
		}
		return nestedEncoderEncode(plainString, pattern);
	}
}

function nestedEncoderOptions() {
	// TODO: JSON listing params and supported encodings
	return 'nestedEncoderOptions';
}

function nestedEncoderEncode(plainString, pattern) {
	var encodedString = plainString;
	for(let i = 0; i < pattern.length; i++) {
		switch(pattern[i]) {
			case 'ascii':
				encodedString = nestedEncoderEncodeAscii(encodedString);
				break
			case 'base64':
				encodedString = nestedEncoderEncodeBase64(encodedString);
				break;
			case 'binary':
			case 'base2':
				encodedString = nestedEncoderEncodeMultiBase(encodedString, 2);
				break;
			case 'duodec':
			case 'base12':
				encodedString = nestedEncoderEncodeMultiBase(encodedString, 12);
				break;
			case 'hex':
			case 'base16':
				encodedString = nestedEncoderEncodeMultiBase(encodedString, 16);
				break;
			case 'oct':
			case 'base8':
				encodedString = nestedEncoderEncodeMultiBase(encodedString, 8);
				break;
			case 'pental':
			case 'base5':
				encodedString = nestedEncoderEncodeMultiBase(encodedString, 5);
				break;
			case 'quaternary':
			case 'base4':
				encodedString = nestedEncoderEncodeMultiBase(encodedString, 4);
				break;
			case 'senary':
			case 'base6':
				encodedString = nestedEncoderEncodeMultiBase(encodedString, 6);
				break;
			case 'septenary':
			case 'base7':
				encodedString = nestedEncoderEncodeMultiBase(encodedString, 7);
				break;
			case 'trinary':
			case 'base3':
				encodedString = nestedEncoderEncodeMultiBase(encodedString, 3);
				break;
			case 'unary':
			case 'base1':
				encodedString = nestedEncoderEncodeUnary(encodedString);
				break;
			case 'vigesimal':
			case 'base20':
				encodedString = nestedEncoderEncodeMultiBase(encodedString, 20);
				break;
		}
	}
	return encodedString;
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

function nestedEncoderEncodeMultiBase(plainString, base) {
	var encodedString = '';
	plainString = plainString.split(' ');
	for(let i = 0; i < plainString.length; i++) {
		encodedString += parseInt(plainString[i]).toString(base) + ' ';
	}
	return encodedString.trim();
}

function nestedEncoderEncodeUnary(plainString) {
	var encodedString = '';
	plainString = plainString.split(' ');
	for(let i = 0; i < plainString.length; i++) {
		encodedString += '1'.repeat(plainString[i]) + ' ';
	}
	return encodedString.trim();
}