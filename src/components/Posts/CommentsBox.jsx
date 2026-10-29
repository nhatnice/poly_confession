import React, { useState, useEffect } from 'react';
import { BsChatDots, BsArrowUpShort } from 'react-icons/bs';

//FUNCTIONS
import { getSingleConfess } from '../../functions/Post_Func';
import { timeSince } from '../../functions/Lavenst_Func';

import API from '@api';
import Orios from '@orios';

const CommentBox = ({ comments }) => {
  return comments.map((data, i) => {
    return (
      <div className="commentBox">
        <span className="date">{timeSince(new Date(data.dateCreated))}</span>
        <p>{data.content}</p>
      </div>
    );
  });
};

const CommentsContainer = ({ post_id }) => {
  const [commentValue, setCommentValue] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let comments = await Orios.Comments.getPost(post_id);

    setComments(comments);
  };

  const sendComment = async () => {
    if (commentValue !== '') {
      setCommentValue('');
      setComments([
        ...comments,
        {
          content: commentValue,
          dateCreated: new Date(),
        },
      ]);

      //Send to server
      await Orios.Comments.add(commentValue, [], [], post_id);
    }
  };

  return (
    <div className="commentsContainer">
      <CommentBox comments={comments} />

      <div className="sendCommentContainer">
        <BsChatDots className="icon" />
        <input
          type="text"
          onChange={(e) => setCommentValue(e.currentTarget.value)}
          value={commentValue}
          placeholder="Gửi bình luận..."
        />
        <button type="button" onClick={sendComment} className="circle">
          <BsArrowUpShort className="icon" />
        </button>
      </div>
    </div>
  );
};

export { CommentsContainer };
