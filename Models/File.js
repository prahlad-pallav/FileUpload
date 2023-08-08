
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    videoUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String
    }

});


fileSchema.post("save", async function(doc){
    try{
        console.log("Doc => " + doc);

        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASSWORD,
            },
        })

        let info = await transporter.sendMail({
            from : `ppiitd147@gmail.com`,
            to : doc.email,
            subject : "File Uploaded",
            html : `<h2>Congratulations,</h2> <p>New File uploaded on Cloudinary</p> Visit Here : <a href= "${doc.imageUrl}">${doc.imageUrl}</a>`
        })

        console.log("Info", info);

    }
    catch(error){
        console.log(error);
    }
});


const File = mongoose.model("File", fileSchema);
module.exports = File;