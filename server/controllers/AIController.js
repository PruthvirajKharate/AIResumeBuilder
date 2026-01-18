// Controller for enhacing a ai summary
// post: api/ai/enhance-pro-summ
import openai from "../configs/ai.js"
import Resume from "../models/Resume.js";

export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const {userContent} = req.body;
        if(!userContent){
            return res.status(400).json({message:"Missing required fields"});
        }
        const response = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content: `You are a expert in resume writing. Your task is to enhance the professional summary
                    of a resume. The summary should be 1-2 sentences also highlighting key skills, experiences and 
                    career objectives. Make it compelling and ATS friendly , and only return text no options or anything else.`
                },
                {
                    role: "user",
                    content:userContent
                }
            ]
        })
        const enhanceContent = response.choices[0].message.content;
        return res.status(200).json({enhanceContent});
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}


// Controller for enhancing resumes experience
//post: api/ai/enhance-job-desc
export const enhanceJobDescription = async (req, res) => {
    try {
        const {userContent} = req.body;
        if(!userContent){
            return res.status(400).json({message:"Missing required fields"});
        }
        const response = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content: `You are an expert in resume writing. Your task is to enhance the job description
                    of a resume. The job description should be only 1-2 sentences also highlighting key responsibilities
                    and achievements. Use actions , verbs and quantifiable results where possible. Make it ATS frienly
                    and only return text, no options or anything else.`
                },
                {
                    role: "user",
                    content:userContent
                }
            ]
        })
        const enhanceContent = response.choices[0].message.content;
        return res.status(200).json({enhanceContent});
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

//Controller for uploading resume to the database
//post : ai/upload/resume

export const uploadResume = async (req, res) => {
    try {
       const {resumeText, title} = req.body;
       const userId = req.userId;
       if(!resumeText) {
        return res.status(400).json({message:"Missing required Fields"});
       }
       const system_prompt = `You are an expert AI agent to extract data from resume.`
       const user_prompt = `extract data from this resume: ${resumeText}  
       Provide the data in following json format without any additional text before or after:
       {
        professional_summary: {type:String, default: ""},
            skills:[{type:String}],
            personal_info: {
                image: {type:String, default:""},
                full_name: {type:String, default:""},
                profession: {type:String, default:""},
                email: {type:String, default:""},
                phone: {type:String, default:""},
                location: {type:String, default:""},
                linkedin: {type:String, default:""},
                website: {type:String, default:""},
            },
            experience: [{
                company: {type:String},
                position: {type:String},
                start_date: {type:String},
                end_date: {type:String},
                description: {type:String},
                is_current: {type:Boolean , default:false}
            }],
            projects: [
                {
                    name: {type:String},
                    type: {type:String},
                    description: {type:String}
                }
            ],
            education: [
                {
                    institution: {type:String},
                    degree: {type:String},
                    field: {type:String},
                    graduation_date:{type:String},
                    gpa:{type:String},
                }
            ]
        }`
        const response = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content: system_prompt
                },
                {
                    role: "user",
                    content: user_prompt
                }
            ],
            response_format: {type: 'json_object'}
        })
        const extractedData = response.choices[0].message.content;
        const parsedData = JSON.parse(extractedData);
        const newResume = await Resume.create({userId, title, ...parsedData})
        return res.status(200).json({resumeId: newResume._id});
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}