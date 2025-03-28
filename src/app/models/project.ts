import mongoose, { Document, Schema } from "mongoose";

export interface IProject extends Document {
    name: string;
    description: string;
    status: string;
    team: mongoose.Types.ObjectId[];
}

const projectSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    team: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Worker',
        required: true
    }
}, {
    timestamps: true
});

const Project = mongoose.models.Project || mongoose.model<IProject>('Project', projectSchema);

export default Project; 