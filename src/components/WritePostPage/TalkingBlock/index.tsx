import "./talking-block.scss";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import ImageView from "@components/_common/ImageView";
import { joinUsPostState, othersPostState } from "@services/store/community";

type Props = {
  subject: string;
};

const TalkingBlock = ({ subject }: Props) => {
  const contentRef = useRef<any>();
  // subject가 join us이면 joinUsPost 작성
  const [joinUsPost, setJoinUsPost] = useRecoilState(joinUsPostState);
  const [othersPost, setOthersPost] = useRecoilState(othersPostState);
  const [imageViewOpen, setImageViewOpen] = useState(false); // 사진 뷰 띄움 여부

  // textarea 자동 높이 조절
  const handleResizeHeight = useCallback(() => {
    contentRef.current.style.height = contentRef.current.scrollHeight + "px";
  }, []);

  const handleChangeTitle = (event: any) => {
    if (subject === "join us") {
      setJoinUsPost({ ...joinUsPost, title: event.target.value });
    } else {
      setOthersPost({ ...othersPost, title: event.target.value });
    }
  };

  const handleChangeContent = (event: any) => {
    if (subject === "join us") {
      setJoinUsPost({ ...joinUsPost, content: event.target.value });
    } else {
      setOthersPost({ ...othersPost, content: event.target.value });
    }
  };

  // 숫자만 입력받도록 바꾸기
  const handleChangePeople = (event: any) => {
    setJoinUsPost({ ...joinUsPost, people: event.target.value });
  };

  const handleChangeDate = (event: any) => {
    setJoinUsPost({ ...joinUsPost, date: event.target.value });
  };

  const handleChangeDistrict = (event: any) => {
    setJoinUsPost({ ...joinUsPost, district: event.target.value });
  };

  const resetJoinUsPost = useResetRecoilState(joinUsPostState); // join us 게시물 초기화
  const resetOthersPost = useResetRecoilState(othersPostState); // others 게시물 초기화

  useEffect(() => {
    resetJoinUsPost();
    resetOthersPost();
  }, [subject]);

  useEffect(() => {
    return () => {
      resetJoinUsPost();
      resetOthersPost();
    };
  }, []);

  return (
    <div className="talking-block-container">
      <div className="content-block-container">
        <input type="text" placeholder="Title" onChange={handleChangeTitle} />
        <div className="boundary-line"></div>
        <textarea
          ref={contentRef}
          placeholder="Write down what you're curious about."
          onInput={handleResizeHeight}
          onChange={handleChangeContent}
        />
      </div>

      {/* Join us일 경우 띄우기*/}
      {subject === "join us" && (
        <div className="join-us-content-container">
          <div className="join-us-item">
            <div className="join-us-title">People</div>
            <input type="text" onChange={handleChangePeople} />
          </div>
          <div className="join-us-item">
            <div className="join-us-title">Date</div>
            <input type="date" onChange={handleChangeDate} />
          </div>
          <div className="join-us-item">
            <div className="join-us-title">District</div>
            <input type="text" onChange={handleChangeDistrict} />
          </div>
        </div>
      )}

      {subject === "join us" && joinUsPost.images.length > 0 && (
        <div
          className="post-image-preview"
          onClick={() => {
            setImageViewOpen(true);
          }}
        >
          <img src={joinUsPost?.images[0]} />
          <div className="post-image-count-container">
            {joinUsPost?.images.length}
          </div>
        </div>
      )}
      {subject !== "join us" && othersPost.images.length > 0 && (
        <div
          className="post-image-preview"
          onClick={() => {
            setImageViewOpen(true);
          }}
        >
          <img src={othersPost?.images[0]} />
          <div className="post-image-count-container">
            {othersPost?.images.length}
          </div>
        </div>
      )}

      {imageViewOpen && (
        <ImageView
          photoInfo={
            subject === "join us" ? joinUsPost?.images : othersPost?.images
          }
          clickedIndex={0}
          onClose={() => setImageViewOpen(false)}
          hasTrashBtn={true}
          isJoinUs={subject === "join us" ? true : false}
        />
      )}
    </div>
  );
};

export default TalkingBlock;
