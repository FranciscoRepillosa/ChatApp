const Company = require("../models/company.models");
const User = require("../../user/models/user.models");



exports.createCompany = async (req, res) => {
    try {


           const newCompany = await Company.create({name: req.body.companyName});

           const filter = {
            _id: req.user._id
          };

          console.log(newCompany)
   
            const update = {companyId: newCompany._id, companyName: newCompany.name, role:"admin" };

            const updatedUser = await User.findOneAndUpdate( filter, update, {new: true});



           res.status(201).json({
            newCompany,
            updatedUser,
            status: "success"
        })

        
        
    } catch (error) {
        res.send(error)
    }
}

exports.sendNewCompanyForm = async (req,res) => {
    console.log("pass");
    try {
        
        res.render("user/newCompany");
        
            
    } catch (error) {
        res.send(error)
    }
}