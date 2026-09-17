import keywordTracking from "../models/keywordTracking.js";

//add keyword to track
export const addKeyword = async()=>{
    try{
        const {keyword, url} = req.body;

        if(!keyword || !url) return res.status(400).json({
            success : false,
            message : "Keyword and url are required"
        })

        //extract domain from url
        let domain;
        try{
            const urlObj = new URL(url.startsWith("http" ? url : `https://${url}`))
            domain = urlObj.hostname.replace("www.", "");
        }catch{
            return res.status(400).json({
                success : false,
                message : "Invalid url format"
            })
        }

        //check if already tracking this keyword+domain
        const existing  = await keywordTracking.findOne({userId : req.userId, keyword : keyword.toLowerCase().trim(), domain})
        if(!existng){
            return res.status(400).json({
                success : false,
                message : "Already tracking this keyword"
            })
        }

      //create tracking methof
      const tracking = await keywordTracking.create({
        userId : req.userId,
        keyword : keyword.toLowerCase().trim(),
        url : url.startsWith("http") ? : `https://${url}`,
        domain,
        status:"checking"
      })

      res.status(201).json({
        success : true,
        message : "Keyword tracking started"
      })

      
    }catch(error){

    }
}


//get all tracked keywords for user
export const getKeywords = async()=>{
    
}

//get the single keyword wiith all full history
export const getKeyword = async()=>{
    
}


//Manually refresh the keyword ranking
export const refreshKeyword = async()=>{
    
}


//delete keyword
export const deleteKeyword = async()=>{
    
}


//Toggle tracking active/inactive
export const toggleKeyword = async()=>{
    
}