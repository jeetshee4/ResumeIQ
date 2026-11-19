const mongoose = require("mongoose");


const resumeSchema = new mongoose.Schema(

    {

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        originalName: {
            type: String,
            required: true
        },

        cloudinaryPublicId: {
            type: String,
            required: true
        },
        format: {
            type: String
        },
        size: {
            type: Number
        },
        extractedText: {
            type: String,
            required: true
        },

        analysis: {
            type: mongoose.Schema.Types.Mixed,
            default: null
        },

        status: {
            type: String,
            enum: ["uploaded", "analyzed", "failed"],
            default: "uploaded"
        }



    },

    {
        timestamps: true
    }



);

const Resume = mongoose.model("Resume",resumeSchema);

module.exports = Resume