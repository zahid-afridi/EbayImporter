import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    desc: {
        type: String,
    },
    image: {
        type: String,
    }
}, {
    timestamps: true
});

const BlogModel = mongoose.model('blog', BlogSchema);

export default BlogModel;
