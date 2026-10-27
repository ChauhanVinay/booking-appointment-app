const User = require('../models/User');

//POST /user - Add User
exports.createUser = async (req, res) => {
    try {
       const {name, email, phone} = req.body;
       if(!name || !email || !phone) {
        return res.status(400).json({error: 'Name, email, and phone are required'});
       }

    const newUser = await User.create({name, email, phone});
    res.status(201).json({ user: newUser });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

//GET /users - Retrieve all users
exports.getAllUser = async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json({users});
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};

//DELETE /users/:id - Delete a user
exports.deleteUser = async (req, res) => {
    try {
      const {id} = req.params;
      const user = await User.findByPk(id);

      if(!user){
        return res.status(400).json({ error: `User with ID ${id} not found` });
      }

      await user.destroy();
      res.status(200).json({ message: 'User deleted successfullt' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
