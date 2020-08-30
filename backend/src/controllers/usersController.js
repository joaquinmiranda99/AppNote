const usersController = {};

const User = require("../models/User");

usersController.getUsers = async (req, res)=>{
    const users = await User.find();
    res.json(users);
};
usersController.createUser = async (req, res)=> {
    const {username} = req.body;
    const newUser = new User({username});
    await newUser.save();
    res.json('User Created');
}
usersController.updateUser = ((req, res)=> res.json({message: 'User updated'}));
usersController.deleteUser = async (req, res)=> {
    await User.findByIdAndDelete(req.params.id);
    res.json('User deleted')
};


module.exports = usersController;