import { Analytics, Face, Gif, Image } from '@mui/icons-material'
import React from 'react'
import "./Share.css"

export default function Share() {
  return (
    <div className='share'>
      <div className="shareWrapper">
        <div className="shareTop">
          <img src="/assets/person/1.jpeg" alt="" className="shareProfileImg" />
          <input
            type="text"
            className="shareInput"
            placeholder="今何してるの？"
          />
        </div>
        <hr className="shareHr" />
        <div className="shareButtons">
          <div className="shareOptions">
            <div className="shareOptin">
              <Image className="shareIcon" htmlColor="blue" />
              <span className="shareOptionText">写真</span>
            </div>
            <div className="shareOptin">
              <Gif className="shareIcon" htmlColor="hotPink" />
              <span className="shareOptionText">GIF</span>
            </div>
            <div className="shareOptin">
              <Face className="shareIcon" htmlColor="green" />
              <span className="shareOptionText">気持ち</span>
            </div>
            <div className="shareOptin">
              <Analytics className="shareIcon" htmlColor="red" />
              <span className="shareOptionText">投票</span>
            </div>
          </div>
          <button className="shareButton">投稿</button>
        </div>
      </div>
    </div>
  )
}
