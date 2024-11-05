import mongoose from 'mongoose';

const BlogSoldSchema = new mongoose.Schema(
  {
    BlogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'blog', 
    },
    StoreId: {
      type:String
     
    },
    isSold: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Blog_Sold = mongoose.model('Blog_Sold', BlogSoldSchema);

export default Blog_Sold;
