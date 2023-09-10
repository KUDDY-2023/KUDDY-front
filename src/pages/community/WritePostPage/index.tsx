import "./write-post-page.scss";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import BackNavBar from "@components/_common/BackNavBar";
import DropDown from "@components/_common/DropDown";
import ItineraryBlock from "@components/WritePostPage/ItineraryBlock";
import TalkingBlock from "@components/WritePostPage/TalkingBlock";
import photoBtn from "@assets/community/photo_btn.svg";
import { joinUsPostState, othersPostState } from "@services/store/community";
import { useGetPresignedUrl, usePostImage } from "@services/hooks/image";
import { subjectData } from "./subjectData";

const WritePostPage = () => {
  const [joinUsPost, setJoinUsPost] = useRecoilState(joinUsPostState);
  const [othersPost, setOthersPost] = useRecoilState(othersPostState);
  const [postType, setPostType] = useState("itinerary");
  const [subject, setSubject] = useState("Choose the subject");

  const onGetUrl = useGetPresignedUrl();
  const onPostImage = usePostImage();

  const handleSelectSubject = (id: number, type: string, selected: string) => {
    setSubject(selected);
  };

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
          console.log("이미지 업로드 성공", res);
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
            Itinerary
          </div>
          <div
            className={
              postType === "talking"
                ? "post-type-btn selected"
                : "post-type-btn"
            }
            onClick={() => setPostType("talking")}
          >
            Talking
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
          <div className="post-btn">Post</div>
        </div>
      </div>
    </div>
  );
};

export default WritePostPage;
