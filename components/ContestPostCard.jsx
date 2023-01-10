import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import Image from "next/image";
import moment from "moment";
import { updateDoc, doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../components/db/Firebase";
import { useState } from "react";
import { useSession } from "next-auth/react";

const ContestPostCard = ({ post }) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  // Function to like or unlike the post
  const likePost = async (post) => {
    // If the user is not signed in then alert the user to sign in
    if (!session) {
      alert("Please sign in first to like this post");
      return;
    }
    const id = post.id;

    setLoading(true);

    // Increment the likes if the user has not liked the post else decrement the likes
    if (post.liked) {
      await updateDoc(doc(db, "photocontest", id), {
        likes: post.likes - 1,
      });
      await deleteDoc(
        doc(db, "photocontest-likes", id + "-" + session.user.email)
      );
    } else {
      await updateDoc(doc(db, "photocontest", id), {
        likes: post.likes + 1,
      });
      await setDoc(
        doc(db, "photocontest-likes", id + "-" + session.user.email),
        {
          postId: id,
          googleId: session.user.email,
        }
      );
    }

    // Update the post in posts
    post.liked = !post.liked;
    post.likes = post.liked ? post.likes + 1 : post.likes - 1;

    setLoading(false);
  };
  return (
    <div className="mt-8 flex flex-col items-center justify-center animate-slide-in-bck-center">
      <div className="shadow-lg border w-11/12 md:w-2/3 lg:w-1/3">
        <p className="py-4 bg-gray-100 px-4 font-semibold">
          {post.enroll} - {post.name}
        </p>
        <Image
          src={post.downloadUrl}
          alt="Contest"
          width={1920}
          height={1080}
        />
        <div className="flex flex-row justify-between items-center py-4 bg-gray-100 px-4">
          <div className="flex justify-center items-center gap-x-3">
            {loading && (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-5 h-5 items-center text-gray-200 animate-spin dark:text-gray-600 fill-red-600 mt-0"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
            <div
              className="cursor-pointer text-xl"
              onClick={(e) => {
                e.preventDefault();
                likePost(post);
              }}
            >
              {post.liked
                ? !loading && (
                    <p className="animate-scale-in-center">
                      <FcLike />
                    </p>
                  )
                : !loading && (
                    <p className="animate-scale-in-center">
                      <AiOutlineHeart />
                    </p>
                  )}
            </div>
            <p>{post.likes} likes</p>
          </div>
          <div className="text-sm font-light">
            {moment(post.timestamp).fromNow()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestPostCard;
