import { Application } from 'express';

import Log from './Log';

class Views {
	public static mount(_express: Application): Application {
		Log.info('Booting the \'Views\' middleware...');

		// Add any view related stepup here. 

		// Pattylink is just a json only response. 

		return _express;
	}
}

export default Views;