import mongoose from "mongoose"

export const ConnectDB = async () => {
    await mongoose.connect("mongodb+srv://lalitmaxpro:5Nw9GYuvUnnhoin4@cluster0.ij94f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error('Could not connect to MongoDB', err));

}