import React, { Component, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '@api';

//COMPONENTS
import { PostCard } from '@components/Posts';
import { CommentsContainer } from '@components/Posts/CommentsBox';
import { Header } from '@components/Header/Header';

const PostPreview = () => {
  const [confess, setConfess] = useState({});
  let { confessId } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let confession = await API.Confessions.get(confessId);

    setConfess(confession);
  };

  return (
    <div className="postPreviewView">
      <Header title="POST" goBack="/" />
      <PostCard data={confess} post_id={confessId} />
      <CommentsContainer post_id={confessId} />
    </div>
  );
};

export default PostPreview;
