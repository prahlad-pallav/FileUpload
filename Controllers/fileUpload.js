
const File = require("../Models/File");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async(req, res) => {
    try{

        const file = req.files.file;
        console.log("Files ->" , file);

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
        console.log("Path ->" , path);

        file.mv(path, error => {
            console.log(error)
        });

        res.status(200).json({
            success:true,
            message:"Local Files Uploaded Successfully"
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in uploading Local Files"
        })
    }
}

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
    const options = {folder};
    console.log("temp file path", file.tempFilePath);

    if(quality) {
        options.quality = quality;
    }

    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}


exports.imageUpload = async (req, res) => {
    try{
 
        const { name, tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);


        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:", fileType);

        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        const response = await uploadFileToCloudinary(file, "FileUploadApp");
        console.log(response);

      
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image Successfully Uploaded',
        })
    }
    catch(error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Error in Uploading Image Files',
        });

    }
}


exports.videoUpload = async (req,res) => {
    try{

        const { name, tags, email} = req.body;
        console.log(name,tags,email);
        
        const file = req.files.videoFile;


         const supportedTypes = ["mp4", "mov"];
         const fileType = file.name.split('.')[1].toLowerCase();
         console.log("File Type:", fileType);
 
   
         if(!isFileTypeSupported(fileType, supportedTypes)) {
             return res.status(400).json({
                 success:false,
                 message:'File format not supported',
             })
         }


        const response = await uploadFileToCloudinary(file, "FileUploadApp");
        console.log(response);

  
        const fileData = await File.create({
            name,
            tags,
            email,
            videoUrl:response.secure_url,
        });

        res.json({
            success:true,
            videoUrl:response.secure_url,
            message:'Video Successfully Uploaded',
        })

    }
    catch(error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Error in Uploading Video Files',
        })
    }
}


exports.imageSizeReduce = async (req,res) => {
    try{

        const { name, tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);


        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:", fileType);


        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }


        const response = await uploadFileToCloudinary(file, "FileUploadApp", 90);
        console.log(response);

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image Successfully Uploaded',
        })
    }
    catch(error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        })
    }
}