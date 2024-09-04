import { Application } from 'express';

import Log from './Log';

class Views {
	public static mount(_express: Application): Application {
		Log.info('Booting the \'Views\' middleware...');

		// _express.set("view options", {layout: false});
		_express.set('view engine', 'html');
		// _express.set('view options', { pretty: true });
		// _express.locals.pretty = true;

		return _express;
	}
}

export default Views;