const moment = require('moment')

exports.getCurrDateTime = () => moment().format('MM/DD/YYYY h:mm:ssA')