import React, { useRef, useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import defaultUser from "../../image/defaultUser.png"
import PostImage from "./PostImage";
import ApiConnection from "../../ApiConnection";
import Notification from "../Notification/Notification";
import DeleteButton from "./Button/DeleteButton";
import UpdateButton from "./Button/UpdateButton";
import { Context } from "../../Context";

function Post({post,refreshPosts}) {
    const [showMenu,setShowMenu] = useState(false);
    const [updateMenu,setUpdateMenu] = useState(false);
    const [deleteMenu,setDeleteMenu] = useState(false);
    const [image,setImage] = useState();
    const buttonRef = useRef(null);
    const menuRef = useRef(null);
    const {profileId} = useContext(Context);

    const apiConnection = new ApiConnection();

    const showImage = async () => {
        let data = await apiConnection.getFile(`http://localhost:3000/profile/image/${post?.profile?.id}`);
        if(data !== undefined) {
            var blobURL = URL.createObjectURL(data);
            setImage(blobURL);
        }
    }

    const handleOutsideClick = (event) => {
        if(menuRef.current && !(menuRef.current.contains(event.target)) && event.target !== buttonRef.current) {
            setShowMenu(false);
        }
    }

    useEffect(()=>{
        showImage();
        document.addEventListener('mousedown',handleOutsideClick);
        return() => {
            document.removeEventListener('mousedown',handleOutsideClick);
        };
    },[])

    return (
        <div className="post">
            {updateMenu && <UpdateButton post={post} setUpdateMenu={setUpdateMenu} refreshPosts={refreshPosts}/>}
            {deleteMenu && <DeleteButton post={post} setDeleteMenu={setDeleteMenu} refreshPosts={refreshPosts}/>}
            <div className="post-header">
                <div className="post-profile">
                    <div className="post-profile-image">
                        <img src={image === undefined ? defaultUser : `${image}`} alt="user"/>
                    </div>
                    <div>
                        <div>
                            {post?.profile?.profileName}
                        </div>
                        <div>
                            {moment(post?.created).format("DD-MM-YYYY HH:mm:ss.SSS")}
                        </div>
                    </div>
                </div>
                {profileId === post?.profile?.id &&
                    <div>
                        <button ref={buttonRef} onClick={() => setShowMenu(!showMenu)}>...</button>
                        <div ref={menuRef} className="p-relative">
                            {showMenu && 
                            <div className="d-flex flex-col gap-4 post-menu">
                                <button onClick={() => {setUpdateMenu(true); setShowMenu(false);}}>Edit Post</button>
                                <button onClick={() => {setDeleteMenu(true); setShowMenu(false);}}>Delete Post</button>
                            </div>}
                        </div>
                    </div>
                }
            </div>
            <div className="post-title">{post?.title}</div>
            <PostImage id={post?.id}/>
        </div>
    )
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    refreshPosts: PropTypes.func.isRequired,
}

export default Post;