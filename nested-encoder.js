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
				encodedString = nestedEncoderEncodeBinary(encodedString);
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

function nestedEncoderEncodeBinary(plainString) {
	var encodedString = '';
	plainString = plainString.split(' ');
	for(let i = 0; i < plainString.length; i++) {
		encodedString += parseInt(plainString[i]).toString(2) + ' ';
	}
	return encodedString.trim();
}