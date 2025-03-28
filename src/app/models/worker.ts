import mongoose, { Document, Schema } from "mongoose";

export interface IWorker extends Document {
    name: string;
    title?: string;
    email?: string;
    phone?: string;
    bio?: string;
    yearsOfExperience?: number;
    skills?: string[];
    education?: {
        degree: string;
        institution: string;
        graduationYear: number;
    }[];
    workExperience?: {
        company: string;
        position: string;
        startDate: Date;
        endDate?: Date;
        description: string;
    }[];
    socialLinks?: {
        linkedin?: string;
        github?: string;
        portfolio?: string;
        twitter?: string;
    };
    technicalSkills?: {
        languages?: string[];
        frameworks?: string[];
        databases?: string[];
        tools?: string[];
    };
    certifications?: {
        name: string;
        issuer: string;
        dateObtained: Date;
        expiryDate?: Date;
    }[];
    profilePicture?: string;
    resume?: string;
    availability?: {
        isAvailable?: boolean;
        availableFrom?: Date;
    };
}

const workerSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    phone: {
        type: String
    },
    bio: {
        type: String
    },
    yearsOfExperience: {
        type: Number
    },
    skills: [{
        type: String
    }],
    education: [{
        degree: { type: String },
        institution: { type: String },
        graduationYear: { type: Number }
    }],
    workExperience: [{
        company: { type: String },
        position: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        description: { type: String }
    }],
    socialLinks: {
        linkedin: String,
        github: String,
        portfolio: String,
        twitter: String
    },
    technicalSkills: {
        languages: [{ type: String }],
        frameworks: [{ type: String }],
        databases: [{ type: String }],
        tools: [{ type: String }]
    },
    certifications: [{
        name: { type: String },
        issuer: { type: String },
        dateObtained: { type: Date },
        expiryDate: Date
    }],
    profilePicture: {
        type: String
    },
    resume: {
        type: String
    },
    availability: {
        isAvailable: { type: Boolean },
        availableFrom: Date
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

const Worker = mongoose.models.Worker || mongoose.model<IWorker>('Worker', workerSchema);

export default Worker; 