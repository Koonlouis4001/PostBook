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
import { Link } from "react-router-dom";

Post.propTypes = {
    post: PropTypes.object.isRequired,
    updatePost: PropTypes.func.isRequired,
    removePost: PropTypes.func.isRequired,
}

function Post({post,updatePost,removePost}) {
    const [showMenu,setShowMenu] = useState(false);
    const [updateMenu,setUpdateMenu] = useState(false);
    const [deleteMenu,setDeleteMenu] = useState(false);
    const [image,setImage] = useState();
    const buttonRef = useRef(null);
    const menuRef = useRef(null);
    const {profileId} = useContext(Context);

    const apiConnection = new ApiConnection();

    const showImage = async () => {
        if(post?.profile?.id === undefined || post?.profile?.id === null) {
            return;
        }
        let data = await apiConnection.getFile(`profile/image/${post?.profile?.id}`);
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
            {updateMenu && <UpdateButton post={post} setUpdateMenu={setUpdateMenu} updatePost={updatePost}/>}
            {deleteMenu && <DeleteButton post={post} setDeleteMenu={setDeleteMenu} removePost={removePost}/>}
            <div className="post-header">
                <div className="post-profile">
                    <Link to={`/profile/${post?.profile?.id}`}>
                        <div className="post-profile-image">
                            <img src={image === undefined ? defaultUser : `${image}`} alt="user"/>
                        </div>
                    </Link>
                    <div>
                        <Link to={`/profile/${post?.profile?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div>
                                {post?.profile?.profileName}
                            </div>
                        </Link>
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

export default Post;