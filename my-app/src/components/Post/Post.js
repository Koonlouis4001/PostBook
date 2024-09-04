import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import defaultUser from "../../image/defaultUser.png"
import PostImage from "./PostImage";
import ApiConnection from "../../ApiConnection";
import Notification from "../Notification/Notification";
import DeleteButton from "./Button/DeleteButton";
import UpdateButton from "./Button/UpdateButton";

function Post({post,refreshPosts}) {
    const [showMenu,setShowMenu] = useState(false);
    const [updateMenu,setUpdateMenu] = useState(false);
    const [deleteMenu,setDeleteMenu] = useState(false);
    const [image,setImage] = useState();
    const buttonRef = useRef(null);
    const menuRef = useRef(null);

    const apiConnection = new ApiConnection();

    const showImage = async () => {
        let data = await apiConnection.getFile(`http://localhost:3000/profile/image/${post?.profile?.id}`);
        if(data !== undefined) {
            var blobURL = URL.createObjectURL(data);
            setImage(blobURL);
        }
    }

    const handleOutsideClick = (event) => {
        if(menuRef.current && !menuRef.current.contains(event.target) && event.target !== buttonRef.current) {
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
        <div className="Post">
            {updateMenu && <UpdateButton post={post} setUpdateMenu={setUpdateMenu} refreshPosts={refreshPosts}/>}
            {deleteMenu && <DeleteButton post={post} setDeleteMenu={setDeleteMenu} refreshPosts={refreshPosts}/>}
            <div className="Post__header">
                <div className="Post__profile">
                    <div className="Post__profile__image">
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
                <div>
                    <button ref={buttonRef} onClick={() => setShowMenu(!showMenu)}>...</button>
                    <div className="p-relative">
                        {showMenu && 
                        <div className="d-flex flex-col gap-4 Post__menu">
                            <button onClick={() => {setUpdateMenu(true); setShowMenu(false);}}>Edit Post</button>
                            <button onClick={() => {setDeleteMenu(true); setShowMenu(false);}}>Delete Post</button>
                        </div>}
                    </div>
                </div>
            </div>
            <div className="Post__title">{post?.title}</div>
            {/*<div className="Post__title">Likes: {post?.likes}</div>
            <div className="Post__title">Created: {moment(post?.created).format("DD-MM-YYYY HH:mm:ss.SSS")}</div>
            <div className="Post__title">Last Modified: {moment(post?.modified).format("DD-MM-YYYY HH:mm:ss.SSS")}</div>*/}
            {/*<img className="Post__image" src={`https://picsum.photos/id/${post?.id}/1920/1080`}/>*/}
            <PostImage id={post?.id}/>
        </div>
    )
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    refreshPosts: PropTypes.func.isRequired,
}

export default Post;