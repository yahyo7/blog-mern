import { Alert, Button, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Comment from "./Comment";

const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null)
  const [comments, setComments] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: comment,
          postId: postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment("");
        setCommentError(null)
        setComments([data, ...comments]);
      }
    } catch (error) {
        setCommentError(error.message)
    }
  };
  
  useEffect(( ) => {
        const getComments = async () => {
            try {
                const res  = await fetch(`/api/comment/get-comments/${postId}`) ;
                if (res.ok) {
                    const data = await res.json()
                    setComments(data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getComments()
  }, [postId])

  const handleLike = async (commentId) => {
    try {
        if (!currentUser) {
            navigate("/sign-in")
            return;
        }
        const res = await fetch(`/api/comment/like-comment/${commentId}`, {
            method: "PUT",
        })
        if (res.ok) {
            const data = await res.json()
            setComments(comments.map((comment) => comment._id === commentId ? {
                ...comment, numberOfLikes: data.numberOfLikes, likes: data.likes
            } : comment))
        }
    } catch (error) {
        console.log(error)
    }
  }

  const handleEditComment = async (comment, editedComment) => {
    setComments(comments.map((c) => (
        c._id === comment._id ? { ...c, content: editedComment } : c
    )));
  }

  return (
    <div className="max-w-2xl mx-auto w-full p-3 ">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed in as:</p>
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={currentUser.profilePicture}
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-xs text-cyan-600 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="flex gap-1 text-sm text-teal-500 my-5">
          You must be signed in to comment.
          <Link className="text-blue-500 hover:underline" to="/sign-in">
            Sign In
          </Link>
        </div>
      )}

      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-teal-500 rounded-md p-3"
        >
          <Textarea
            placeholder="Add a comment..."
            rows="3"
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-500 text-xs">
              {200 - comment.length} characters remaining.
            </p>
            <Button type="submit" outline gradientDuoTone="purpleToBlue">
              Comment
            </Button>
          </div>
          {commentError && (<Alert color="failure" className="mt-5">{commentError}</Alert>)}
        </form>
        )}

        {comments.length === 0 ? (
                <p className="text-sm my-5">
                    No comments yet!
                </p>
        ) : (
                <>
                <div className="text-sm my-5 flex items-center gap-1">
                    <p>Comments</p>
                    <div className="border border-gray-400 py-1 px-2 rounded-sm">
                        <p>{comments.length}</p>
                    </div>
                </div>

                {
                    comments.map((comment ) => (
                        <Comment key={comment._id} comment={comment} onLike={handleLike} onEdit={handleEditComment}/>
                    ))
                }
                </>
        )}

    </div>
  );
};

export default CommentSection;
