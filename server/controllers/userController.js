const User = require('../models/userModel')

exports.getStats = async(req,res)=>{
    try {

        const total= await User.countDocuments();
        const active= await User.countDocuments({status:"Active"});
        const Inactive= await User.countDocuments({status:"Inactive"});
        res.json({total,active,Inactive});
        

         
        
    } catch (error) {
        res.status(500).json({message:"fetch error", error: error.message})
        
    }
};



exports.searchUsers = async (req, res) => {
  try {
    const query = req.params.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const searchQuery = {
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { phone: { $regex: query, $options: "i" } },
        { status: { $regex: query, $options: "i" } },
      ],
    };

    const users = await User.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments(searchQuery);

    res.status(200).json({
      users,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalUsers: total,
    });

  } catch (error) {
    res.status(500).json({
      message: "searching error",
      error: error.message,
    });
  }
};


   exports.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments();

    res.status(200).json({
      users,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalUsers: total,
    });

  } catch (error) {
    res.status(500).json({
      message: "get user error",
      error: error.message,
    });
  }
}


exports.getUserById= async(req,res)=>{
    try {

        const user = await User.findById(req.params.id)
        if(!user) return res.status(404)
.json({message:"user not found"});
        res.json(user);
        
    } catch (error) {
             res.status(500).json({message:"get user error", error: error.message})
   
    }
}


exports.createUser = async(req,res)=>{
    try {
        const{name , email,phone,status}= req.body;
        if(!name || !email || !phone)
            return res.status(400).json({
        message:"Name email  and phone are required"});


        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message:"already exist"});

        const user =  new User ({
            name,
            email,
            phone,
            status : status || "Active"

        })

        await user.save();
        res.status(201).json({user, message:"record created"} );

                                                                 
        
    } catch (error) {
                     res.status(500).json({message:"create user error", error: error.message})

        
    }
}
