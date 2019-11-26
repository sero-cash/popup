module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "$": true,
        "process": true,
        "__dirname": true
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module",
        "ecmaVersion": 7
    },
    "plugins": [
        "react"
    ],
    "rules": {
        'node/no-deprecated-api': 0
    },
    "settings": {
        "import/ignore": [
            "node_modules"
        ]
    }
};