"use strict";
/**
 * Primary file for your Clustered API Server
 *
 * @author Faiz A. Farooqui <faiz@geekyants.com>
 */
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const dotenv = require("dotenv");
const Express_1 = require("./Express");
// import Log from '../middlewares/Log';
const Log = console;
class App {
    // // Clear the console
    // public clearConsole (): void {
    // 	process.stdout.write('\x1B[2J\x1B[0f');
    // 	Queue.dispatch('checkout', {foo: 'bar', fizz: 'buzz'}, function (data) {
    // 		console.log('>> here is the data', data);
    // 	});
    // }
    // Loads your dotenv file
    loadConfiguration() {
        Log.info('Configuration :: Booting @ Master...');
        dotenv.config({ path: path.join(__dirname, '../../.env') });
    }
    // Loads your Server
    loadServer() {
        Log.info('Server :: Booting @ Master...');
        Express_1.default.init();
    }
    // // Loads the Database Pool
    // public loadDatabase (): void {
    // 	Log.info('Database :: Booting @ Master...');
    // 	Database.init();
    // }
    // Loads the Worker Cluster
    loadWorker() {
        Log.info('Worker :: Booting @ Master...');
    }
}
;
exports.default = new App();
//# sourceMappingURL=App.js.map