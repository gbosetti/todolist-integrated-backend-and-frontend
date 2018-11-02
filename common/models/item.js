'use strict';

module.exports = function(Item) {
	Item.myCustomFunctionality = function(cb) {
	    cb(null, "This is a custom functionality executed on " + (new Date()).toDateString());
	}

	Item.remoteMethod( 'myCustomFunctionality', {
		http: {
			path: '/myCustomFunctionality',
			verb: 'get'
		},
		returns: {
			arg: 'myCustomFunctionality',
			type: 'string'
		}
	});
};
