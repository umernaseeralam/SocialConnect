import React, { useState, useEffect } from 'react';
import { auth, database, ref, push, onValue, update } from '../src/FireBase';
import { onAuthStateChanged } from 'firebase/auth';
import Logo from '../src/assets/SocialConnect.svg';
import SideBarLogo from '../src/assets/SocialConnect.svg';
import '../Css/Feed.css';

export function Feed() {
  const [showPopup, setShowPopup] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    const postsRef = ref(database, 'posts');
    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const postsArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value
        }));
        setPosts(postsArray.reverse()); // Reverse to show newest posts first
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAddPost = () => {
    setShowPopup(true);
  };

  const handleSubmitPost = () => {
    if (user) {
      const postsRef = ref(database, 'posts');
      push(postsRef, {
        title,
        content,
        timestamp: Date.now(),
        author: user.email,
        image,
        likes: 0 // Initialize likes count as a number
      });
    }
    setShowPopup(false);
    setTitle('');
    setContent('');
    setImage(null);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLikePost = (postId, currentLikes) => {
    const postRef = ref(database, `posts/${postId}`);
    const newLikes = (currentLikes || 0) + 1; // Ensure currentLikes is a number
    update(postRef, {
      likes: newLikes
    }).catch(error => {
      console.error("Update failed: ", error);
    });
  };

  return (
    <div>
      <div className="FeedTopHeaderHolder">
        <div>
          <img className="FeedLogo" src={Logo} alt="Logo" />
          <div className="FeedSearchHolder">
            <input placeholder="Search" className="FeedSearchInput" type="text" />
            <button className="FeedSearchBtn">Search</button>
          </div>
        </div>
      </div>

      <div className="FeedSideBar">
        <h2 className="FeedMenuText">Menu</h2>
        <button className="FeedAddPostBtnSidebar" onClick={handleAddPost}>Add Post</button>
        <div className="FeedBtnHolder">
          <button className="FeedProfileBtn FeedBtnStyle">Profile</button>
        </div>
        <div className="FeedFeedHolder">
          <button className="FeedFeedBtn FeedBtnStyle">Feed</button>
        </div>
        <div className="FeedSettingsHolder">
          <button className="FeedSettingsBtn FeedBtnStyle">Settings</button>
        </div>
        <div className="FeedSideBarLogoHolder">
          <img className="FeedSideBarLogo" src={SideBarLogo} alt="Logo" />
        </div>
      </div>

      <div className="FeedContent">
        {posts.map((post) => (
          <div key={post.id} className="FeedPostContainer">
            <div className="FeedPostHeader">
              <img
                src="https://via.placeholder.com/40"
                alt="Profile Picture"
                className="FeedProfilePic"
              />
              <div className="FeedUserInfo">
                <div className="FeedUsername">{post.author}</div>
                <div className="FeedTime">{new Date(post.timestamp).toLocaleString()}</div>
              </div>
            </div>
            <div className="FeedPostContent">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              {post.image && <img src={post.image} alt="Post" className="FeedPostImage" />}
            </div>
            <div className="FeedPostFooter">
              <div className="FeedLikeComment">
                <span onClick={() => handleLikePost(post.id, post.likes)}>Like ({post.likes || 0})</span>
                <span>Comment</span>
              </div>
              <div className="FeedShare">
                <span>Share</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="FeedPopup">
          <div className="FeedPopupContent">
            <h2>Add New Post</h2>
            <input
              className='FeedTitleInput'
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className='FeedTextArea'
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <input
              className='FeedFileInput'
              type="file"
              onChange={handleImageUpload}
            />
            {image && <img src={image} alt="Preview" className="FeedPostImage" />}
            <button onClick={handleSubmitPost}>Submit</button>
            <button onClick={() => setShowPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Feed;
