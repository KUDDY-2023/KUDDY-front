import "./talking-block.scss";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import ImageView from "@components/_common/ImageView";
import { joinUsPostState, othersPostState } from "@services/store/community";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";
import useModal from "@utils/hooks/useModal";
import { regionData } from "@pages/community/WritePostPage/subjectData";

type Props = {
  subject: string;
};

const TalkingBlock = ({ subject }: Props) => {
  const contentRef = useRef<any>();
  // subject가 join us이면 joinUsPost 작성
  const [joinUsPost, setJoinUsPost] = useRecoilState(joinUsPostState);
  const [othersPost, setOthersPost] = useRecoilState(othersPostState);
  const [imageViewOpen, setImageViewOpen] = useState(false); // 사진 뷰 띄움 여부
  let today = new Date();
  const [isOpened, setIsOpened] = useState<boolean>(false); // region 드롭다운
  const { buttonRef, modalRef } = useModal(isOpened, setIsOpened);

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

  const formatDate = (inputDateString: string) => {
    let dateParts = String(inputDateString).split(" ");
    let extractedDate = dateParts.slice(1, 4).join(" ");

    let parsedDate = new Date(extractedDate); // 추출한 부분을 Date 객체로 파싱

    // 날짜를 "2021-11-05" 형식으로 포맷팅
    let formattedDate =
      parsedDate.getFullYear() +
      "-" +
      ("0" + (parsedDate.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + parsedDate.getDate()).slice(-2);

    return formattedDate;
  };

  const handleChangeDate = (date: any) => {
    setJoinUsPost({ ...joinUsPost, date: date });
  };

  const handleChangeDistrict = (item: string) => {
    setJoinUsPost({ ...joinUsPost, district: item });
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
            <input type="number" onChange={handleChangePeople} />
          </div>
          <div className="join-us-item">
            <div className="join-us-title">Date</div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                format="YYYY-MM-DD"
                onChange={(value: any) => {
                  handleChangeDate(formatDate(value.$d));
                }}
              />
            </LocalizationProvider>
          </div>
          <div className="join-us-item">
            <div className="join-us-title">Region</div>
            <div
              className="join-us-region-container"
              ref={buttonRef}
              onClick={() => setIsOpened(!isOpened)}
            >
              {!!joinUsPost?.district ? <p>{joinUsPost?.district}</p> : null}
              {isOpened && (
                <div className="region-dropdown" ref={modalRef}>
                  {regionData.map(item => {
                    return (
                      <div
                        className="region-click-area"
                        onClick={() => handleChangeDistrict(item.name)}
                      >
                        {item.name}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
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
