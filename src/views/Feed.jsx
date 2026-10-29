import React, { useEffect, useState } from 'react';
import API from '@api';

// COMPONENTS
import ConfessForm from '@components/Forms/Confess_Form';
import LixiForm from '@components/Forms/Lixi_Form';
import { getConfessFrom } from '../functions/API';
import { PictureModal } from '@components/Posts/Modal';
import { PostCard } from '@components/Posts';
import { View } from '@components';

import AdsImage from '../styles/resources/2011.png';

const AdsHeader = () => (
  <div className="ads_container_parent">
    <a href="https://lavenes.com/" target="_blank" rel="noopener noreferrer">
      <div
        className="ads_image"
        style={{ background: `url(${AdsImage}) no-repeat center center / cover` }}
      />
      <div className="ads_image_shadow">
        <div
          className="ads_image_shadow_image"
          style={{ background: `url(${AdsImage}) no-repeat center center / cover` }}
        />
      </div>
    </a>
  </div>
);

const Feed = (props) => {
  // LOAD ALL CONFESS FROM SERVER
  const [confessions, setConfessions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [range, setRange] = useState(0);
  const [isGettingConfess, setIsGettingConfess] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let result = await API.Confessions.getAll();
    if (result) {
      setConfessions(result);
    }
  };

  // LOAD MORE WHEN USER SCROLL TO BOTTOM
  const trackScrolling = (event) => {
    const target = event.target;

    if (!isGettingConfess) {
      if ((target.scrollHeight - target.scrollTop) / 2 <= target.clientHeight) {
        const nextRange = range + 1;
        setRange(nextRange);
        setIsGettingConfess(true);

        const schoolId = props.school_id || '';
        getConfessFrom(nextRange, schoolId, (data) => {
          setIsGettingConfess(false);
          if (data && Array.isArray(data)) {
            setConfessions((prev) => prev.concat(data));
          }
        });
      }
    }
  };

  // OPEN PICTURE MODAL
  const handleOpenPictureModal = (img) => {
    setModalVisible(true);
    setModalImg(img);
  };

  // CLOSE MODAL
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View onScroll={trackScrolling}>
      <PictureModal is_open={modalVisible} img={modalImg} onClosePictureModal={handleCloseModal} />
      <h1 className="view_header">Poly Confession</h1>
      <AdsHeader />
      <LixiForm />
      <ConfessForm />
      <div className="section confess aos-animate">
        {confessions.map((data, i) => (
          <PostCard key={data._id || i} data={data} onOpenPicture={handleOpenPictureModal} />
        ))}
      </div>
    </View>
  );
};

export default Feed;
