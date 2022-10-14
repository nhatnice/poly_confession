import React from 'react';
import {timeSince} from '../../functions/Lavenst_Func';
import {SERVER_LINK} from '../../functions/Global';
import {ReactionBox} from './Reaction';
import { MusicPlayer } from '@components/MusicPlayer';
import { Link } from 'react-router-dom';

const daysInWeek = ["Chủ Nhật","Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];

export const PostCard = ({ data, onOpenPicture }) => {//HAS BACKGROUND POST
   //DEFAULT POST
   if(!data.moreData?.hasImage && data.banner) {
    var ngayTao = new Date(data.dateCreated);

    return(
      <div className="confess_container_parent">
        <div to={`/post/${data._id}`} key={`${data._id}`} className="confess_container hasBackground">
            <div className="confess_image" style={{background: `url(${data.banner}) no-repeat center center / cover`}}>
                <p className="hastag">
                  {data.moreData?.hashtag}
                </p>
                <p className="date" id="dateFirst" data-tooltip={`${daysInWeek[ngayTao.getDay()]}, ${ngayTao.getDate()} tháng ${ngayTao.getMonth() + 1}, ${ngayTao.getFullYear()} lúc ${ngayTao.getHours() <= 9 ? '0' + ngayTao.getHours() : ngayTao.getHours()}:${ngayTao.getMinutes() <= 9 ? '0' + ngayTao.getMinutes() : ngayTao.getMinutes()}`} data-tooltip-position="bottom">
                  {timeSince(ngayTao)}
                </p>
                <p className="confess">{data.content}</p>
                <Link to={`/post/${data._id}`} key={`${data._id}`} className="comments_count">{data.commentCount} bình luận</Link>
                <ReactionBox confessId={data._id} emotions={data.moreData?.emotions}/>
            </div>
            <div className="confess_image_shadow">
                <div className="confess_image_shadow_image" style={{background: `url(${data.banner}) no-repeat center center / cover`}}></div>
            </div>
        </div>
      </div>
    )
  }else if(data.moreData?.hasImage) { //HAS IMAGE
    var ngayTao = new Date(data.dateCreated);

    return(
      <div className="confess_container_parent">
        <div to={`/post/${data._id}`} key={`${data._id}`} className="confess_container hasImage">
            <div className="confess_image_filter">
                <p className="hastag">
                  {data.moreData?.hashtag}
                </p>
                <p className="date" id="dateFirst" data-tooltip={`${daysInWeek[ngayTao.getDay()]}, ${ngayTao.getDate()} tháng ${ngayTao.getMonth() + 1}, ${ngayTao.getFullYear()} lúc ${ngayTao.getHours() <= 9 ? '0' + ngayTao.getHours() : ngayTao.getHours()}:${ngayTao.getMinutes() <= 9 ? '0' + ngayTao.getMinutes() : ngayTao.getMinutes()}`} data-tooltip-position="bottom">
                  {timeSince(ngayTao)}
                </p>
                <p className="confess">{data.content}</p>
                <Link to={`/post/${data._id}`} key={`${data._id}`} className="comments_count">{data.commentCount} bình luận</Link>
                <ReactionBox confessId={data._id} emotions={data.moreData?.emotions}/>
            </div>
            <div className="confess_image" onClick={() => onOpenPicture(data.banner)} style={{background: `url(${data.banner}) no-repeat center center / cover`}}>
      
            </div>
            <div className="confess_image_shadow">
                <div className="confess_image_shadow_image" style={{background: `url(${data.banner}) no-repeat center center / cover`}}></div>
            </div>
        </div>
      </div>
    )
    //HAS BACKGROUND
  }else { //DEFAULT
    var ngayTao = new Date(data.dateCreated);

    return(
      <div className="confess_container_parent">
        <div to={`/post/${data._id}`} key={`${data._id}`} className={`confess_container`} style={{}}>
            <p className="hastag">
              {data.moreData?.hashtag}
            </p>
            <p className="confess">{data.content}</p> 
            <p className="date" id="dateFirst" data-tooltip={`${daysInWeek[ngayTao.getDay()]}, ${ngayTao.getDate()} tháng ${ngayTao.getMonth() + 1}, ${ngayTao.getFullYear()} lúc ${ngayTao.getHours() <= 9 ? '0' + ngayTao.getHours() : ngayTao.getHours()}:${ngayTao.getMinutes() <= 9 ? '0' + ngayTao.getMinutes() : ngayTao.getMinutes()}`} data-tooltip-position="bottom">
              {timeSince(ngayTao)}
            </p>
            <Link to={`/post/${data._id}`} key={`${data._id}`} className="comments_count">{data.commentCount} bình luận</Link>                
            <ReactionBox confessId={data._id} emotions={data.moreData?.emotions}/>
        </div>
      </div>
    )
  }
  // else if(data.audio[0] !== "") {//HAS AUDIO
  //   var ngayTao = new Date(data.ngayTao);

  //   return(
  //     <div className="confess_container_parent">
  //       {i % 5 === 0 ? null : null}
  //       <div to={`/post/${data._id}`} key={`${data._id}`} className={`confess_container hasAudio`} style={{}}>
  //           <p className="hastag">
  //             {data.hashtag != '' ? '# ' + data.hashtag : "CFS" + data.confess_id}
  //           </p>
  //           <MusicPlayer source={`${SERVER_LINK}/resources/media/${data.audio[0]}`}/>
  //           <p className="date" id="dateFirst" data-tooltip={`${daysInWeek[ngayTao.getDay()]}, ${ngayTao.getDate()} tháng ${ngayTao.getMonth() + 1}, ${ngayTao.getFullYear()} lúc ${ngayTao.getHours() <= 9 ? '0' + ngayTao.getHours() : ngayTao.getHours()}:${ngayTao.getMinutes() <= 9 ? '0' + ngayTao.getMinutes() : ngayTao.getMinutes()}`} data-tooltip-position="bottom">{timeSince(new Date(data.ngayTao))}</p>
  //           <Link to={`/post/${data._id}`} key={`${data._id}`} className="comments_count">{data.comments.length} bình luận</Link>                
  //           <ReactionBox id={data._id} client_ip={this.state.client_ip} emotions={data.emotions}/>
  //       </div>
  //     </div>
  //   )
  // }
}