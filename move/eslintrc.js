const options = require('./kolder.config');

module.exports = {
  "env": {
    "es6": true,
    "node": true,
    "browser": true
  },
  <%_ if (type === 'vue') { -%>
  "extends": "vue",  
  "plugins": ["vue"],
  <%_ } else if (type === 'react') { -%>
  "extends": "airbnb",
  "plugins": ["react"],
  <%_ } else if (type === 'web' || 'plain') { -%>
  "extends": "airbnb",
  <%_ } -%>
  "rules": options.eslint
}