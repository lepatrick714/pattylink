/** Default AppController */

class AppController {
    /** Default index method */
    static index(_req, res) {
        res.json('Hello World');
    }
}

export default AppController;