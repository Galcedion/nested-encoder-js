# nested-encoder-js

This is a JavaScript encoder to encode plain strings. It supports nested encoding.

## Usage

To use nested-encoder-js call its master function in your own JavaScript code.
```javascript
nestedEncoder();
```

### Parameters

Parameters for nested-encoder-js
```
plainString - The unencoded string that is to be encoded. Default: false
pattern     - A comma separated string list of encodings to use. The encoding process will go through the list step by step. Default: false
```

If either the pattern parameter or the plainString parameter is not given, nested-encoder-js will return a JSON containing the required parameters as well as all available encodings.

### Output

The master function will return a JSON containing following keys
```
result     - The decoded string. Will contain the value 'false' when encodedString was not provided.
parameters - A list of parameters that can be provided when using nested-encoder-js. Only set when plainString or pattern was not provided.
encodings  - A dict of available encodings. Only set when plainString or pattern was not provided.
```

## License

[The Unlicense](https://unlicense.org/)