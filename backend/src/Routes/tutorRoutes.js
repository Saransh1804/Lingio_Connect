import express from "express"
import Tutor from "../models/tutor.js"
import multer from "multer"
import cloudinary from "cloudinary";
import Stripe from "stripe"
import {StreamChat} from "stream-chat"

const stripeKey = "sk_test_51P24TZSCGEvzC7HSiD39Aq7rEDsK6UAg1d5ER9dLNFY6QF0NnaB6ovPW7A0Ru1B0NWoLQVLqS5xr3MFBmPtCAqk000QWiADZNa" 

const stripe = new Stripe(stripeKey)

const apiKey = '9nrade67axhx';
const apiSecret = 'h8hj799ebzsrc5e2qm5d8fbgftfxm6buagjr5k8vgq8kzexqgryeeh7znru9dmv9';

const router = express.Router()

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 100 * 1024 * 1024,
    }
});

router.post("/", async(req, res)=>{
    try{
        
        // console.log(req)
        console.log(req.body)
        // console.log(req.file)
        const bookingArray= []
        const data = req.body
        // console.log(imageFile)
        const tutor = new Tutor(data)
        tutor.bookings = bookingArray
        await tutor.save()
        res.status(200).send(tutor)

    }
    catch(error){
        console.log(error)
        res.status(500).json("Something went wrong in adding tutor")
    }
  
})

router.get("/allTutors/:page", async(req, res)=>{
    try{
        const page = parseInt(req.params.page, 10) || 1; // Default to page 1 if not provided
        const limit = 5; // Number of tutors per page
        const skip = (page - 1) * limit;

        const tutors = await Tutor.find().skip(skip).limit(limit);
        const totalTutors = await Tutor.countDocuments();
        const totalPages = Math.ceil(totalTutors / limit);

        res.json({
            page,
            totalPages,
            totalTutors,
            tutors
        });
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Something went wrong in fetching tutors"})
    }
})

router.get("/tutorsBasedOnSearch", async(req, res)=>{
    // console.log(req.query)

    const query = constructSearchQuery(req.query);

    const pageSize = 5;
    const pageNumber = parseInt(req.query.page ?req.query.page.toString() : "1")

    const skip = (pageNumber - 1) *pageSize



    const tutors = await Tutor.find(query).skip(skip).limit(pageSize)
    const total = await Tutor.countDocuments(query)

    const response = {
        data : tutors, 
        pagination :{
            total, 
            page:pageNumber, 
            pages : Math.ceil(total/ pageSize)
        }
    }
    res.json(response)

})
