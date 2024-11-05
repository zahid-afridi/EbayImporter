


export const BlogFetchApi = (setMyblog) => {
    return async (dispatch) => {
      try {
        // load(true);
        const response = await fetch("/api/blog/getblog");
        const data = await response.json();
        if (response.status === 200) {
          console.log("Blogdata", data);
        //   dispatch(UpdateStoreDetail(data)); // Dispatching action to update store
       
        }
        setMyblog(data.Blogs)
        // load(false);
      } catch (error) {
        // load(false);
        console.error(error);
      }
    };
  };