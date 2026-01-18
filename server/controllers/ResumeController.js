// Controller for creating a new Resume
// api : /api/resume/create

import imageKit from "../configs/imagekit.js";
import Resume from "../models/Resume.js";
import fs from 'fs';

export const createResume = async(req, res) => {
    try {
        const userId = req.userId;
        const title = req.body;
        //create new resume
        const newResume = await Resume.create({userId, title});
        //return success message
        return res.status(201).json({message:"Resume created successfully", resume:newResume})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

// Controller for deleting a resume
// Delete: /api/resume/delete

export const deleteResume = async(req, res) => {
    try{
        const userId = userId;
        const {resumeId} = req.params;

        await Resume.findOneAndDelete({userId, _id:resumeId})
        //return success message
        return res.status(201).json({message:"Resume Deleted Successfully"});
    }catch(error){
        return res.status(400).json({message:error})
    }
}

// get user resume by id
//get: /api/resume/get


export const getResumeById = async(req, res) => {
    try{
        const userId = userId;
        const {resumeId} = req.params;

        const resume = await Resume.findOne({userId, _id:resumeId})
        if(!resume){
            return res.status(404).json({message:"Resume not found"});
        }
        resume.__v = undefined;
        resume.createdAt = undefined;
        resume.updatedAt = undefined;
        //return success message
        return res.status(201).json({resume});
    }catch(error){
        return res.status(400).json({message:error})
    }
}

// get resume by id public
// get: /api/resume/pulbic

export const getPublicResumeById = async(req, res) => {
    try{
        const {resumeId} = req.params;

        const resume = await Resume.findOne({public:true, _id:resumeId})
        if(!resume){
            return res.status(404).json({message:"Resume not found"});
        }
        resume.__v = undefined;
        resume.createdAt = undefined;
        resume.updatedAt = undefined;
        //return success message
        return res.status(201).json({resume});
    }catch(error){
        return res.status(400).json({message:error})
    }
}

// controller for updating resuem
// put: /api/resume/update

export const updateResume = async(req, res) => {
    try {
        const userId = req.userId;
        const {resumeId , resumeData, removeBackground} = req.body;
        const image = req.file; 

        let resumeDataCopy = JSON.parse(resumeData);
        if(image){
            const image_buffer_data = fs.createReadStream(image.path)
            const response = await imageKit.files.upload({
                file: image_buffer_data,
                fileName: 'resume.png',
                folder: 'user-resumes',
                transformation : {
                    pre: 'w-300, h-300, fo-face, z-0.75' + (removeBackground ? ", e-bgremove" : "" ) 
                }
            });

            resumeDataCopy.personal_info.image = response.url

        }

        
        const resume = await Resume.findByIdAndUpdate({userId, _id:resumeId}, resumeDataCopy, {new:true})
        return res.status(200).json({message:"Saved successfully", resume})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}