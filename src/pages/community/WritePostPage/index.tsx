import "./write-post-page.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import BackNavBar from "@components/_common/BackNavBar";
import DropDown from "@components/_common/DropDown";
import ItineraryBlock from "@components/WritePostPage/ItineraryBlock";
import TalkingBlock from "@components/WritePostPage/TalkingBlock";
import photoBtn from "@assets/community/photo_btn.svg";
import {
  itineraryPostState,
  joinUsPostState,
  othersPostState,
} from "@services/store/community";
import { useGetPresignedUrl, usePostImage } from "@services/hooks/image";
import { usePostPost } from "@services/hooks/community";
import { subjectData } from "./subjectData";

const WritePostPage = () => {
  const nav = useNavigate();
  const [itineraryPost, setItineraryPost] = useRecoilState(itineraryPostState);
  const [joinUsPost, setJoinUsPost] = useRecoilState(joinUsPostState);
  const [othersPost, setOthersPost] = useRecoilState(othersPostState);
  const [postType, setPostType] = useState("itinerary");
  const [subject, setSubject] = useState("Choose the subject");

  const onGetUrl = useGetPresignedUrl(); // 이미지 url 발급
  const onPostImage = usePostImage(); // 이미지 업로드
  const onPostPost = usePostPost(); // 게시물 작성

  // subject 변경 시 (talking board 게시물)
  const handleSelectSubject = (id: number, type: string, selected: string) => {
    setSubject(selected);
  };

  // 이미지 선택 시 (talking board 게시물)
  const onChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    let fileName: string[] = [];
    for (let i = 0; i < e.target.files.length; i++) {
      fileName.push(e.target.files[i].name);
    }

    const presignedUrlList = await onGetUrl(fileName);
    const images = []; // 선택한 사진 저장

    if (presignedUrlList) {
      try {
        for (let i = 0; i < presignedUrlList.length; i++) {
          const res = await onPostImage(presignedUrlList[i], e.target.files[i]);
        }

        for (let i = 0; i < presignedUrlList.length; i++) {
          images.push(presignedUrlList[i].split("?")[0]);
        }

        if (subject === "join us") {
          setJoinUsPost({
            ...joinUsPost,
            images: [...images],
          });
        } else {
          setOthersPost({
            ...othersPost,
            images: [...images],
          });
        }
      } catch (err) {
        alert(err);
      }
    }
  };

  const handleClickPostBtn = async () => {
    if (postType === "itinerary") {
      // 코스 피드백 게시물
      if (itineraryPost.title === "" || itineraryPost.content === "") {
        alert("Please write the title and content.");
        return;
      }
      if (itineraryPost.spots.length === 0) {
        alert("Please add a Route.");
        return;
      }
      const res = await onPostPost("itinerary", itineraryPost);
    } else if (postType === "talking" && subject === "join us") {
      // talking board - join us 게시물
      if (joinUsPost.title === "" || joinUsPost.content === "") {
        alert("Please write the title and content.");
        return;
      }
      if (joinUsPost.date === "" || joinUsPost.district === "") {
        alert("Please select a date and region");
        return;
      }
      const res = await onPostPost("talkingboard", joinUsPost);
    } else {
      // 그 외의 talking board 게시물
      if (othersPost.subject === "") {
        alert("Please select a subject");
        return;
      }
      if (othersPost.title === "" || othersPost.content === "") {
        alert("Please write the title and content.");
        return;
      }
      const res = await onPostPost("talkingboard", othersPost);
    }
    nav("/community/list");
  };

  useEffect(() => {
    setSubject("Choose the subject");
  }, [postType]);

  useEffect(() => {
    if (postType === "talking" && subject !== "join us") {
      setOthersPost({
        ...othersPost,
        subject: subject,
      });
    }
  }, [subject]);

  return (
    <div className="write-post-page-container">
      <BackNavBar middleTitle="" isShare={false} />

      <div className="write-post-header">
        <div className="post-type-container">
          <div className="post-header-title">Community</div>
          <div
            className={
              postType === "itinerary"
                ? "post-type-btn selected"
                : "post-type-btn"
            }
            onClick={() => setPostType("itinerary")}
          >
            Route
          </div>
          <div
            className={
              postType === "talking"
                ? "post-type-btn selected"
                : "post-type-btn"
            }
            onClick={() => setPostType("talking")}
          >
            Forum
          </div>
        </div>
        {postType === "talking" && (
          <div className="post-subject-container">
            <div className="post-header-title">Subject</div>
            <DropDown
              items={subjectData.map(data => data.subject)}
              type="subject"
              placeholder="Choose the subject"
              id={1}
              state={subject}
              onSelect={handleSelectSubject}
            />
          </div>
        )}
      </div>

      {postType === "itinerary" ? (
        <ItineraryBlock />
      ) : (
        <TalkingBlock subject={subject} />
      )}

      <div className="write-post-footer">
        <div className="post-btn-container">
          <label htmlFor="post-image-input">
            <img
              className={
                postType === "talking" ? "photo-btn" : "phto-btn invisible"
              }
              src={photoBtn}
            />
          </label>
          <input
            type="file"
            id="post-image-input"
            accept="image/*"
            multiple
            hidden
            onChange={onChangeImage}
          />
          <div className="post-btn" onClick={handleClickPostBtn}>
            Post
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritePostPage;
