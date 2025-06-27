import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ApiConnection from "../../ApiConnection";

function PostImage({id}) {

    const apiConnection = new ApiConnection();
    const [image,setImage] = useState(undefined);

    const showImage = async () => {
        if(id === undefined || id === null) {
            return;
        }
        let data = await apiConnection.getFile(`posts/image/${id}`);
        if(data !== undefined) {
            var blobURL = URL.createObjectURL(data);
            setImage(blobURL);
        }
    }

    useEffect(() => {
        showImage();
    },[])

    return (image &&
        <div>
            <img className="post-image" src={image}/>
        </div>
    )
}

PostImage.propTypes = {
    id: PropTypes.number.isRequired,
}

export default PostImage;