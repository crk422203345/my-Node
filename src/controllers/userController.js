class UserController {
  static getUserInfo(req, res) {
    res.json({
      code: 200,
      message: 'User info retrieved successfully',
      data: {
        id: 1,
        name: 'John Doe',
        role: 'admin'
      }
    });
  }
}

module.exports = UserController;
