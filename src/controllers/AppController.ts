/** Default AppController */

class AppController {
  /** Default index method */
  static index(_req, res) {
    res.json({ message: "Hello World", success: true });
  }
}

export default AppController;
