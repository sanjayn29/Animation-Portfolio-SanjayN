import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
}

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [video, setVideo] = useState("");

  const linkStyle = {
    backgroundColor: "var(--background)",
    color: "var(--text)",
  };

  const imageStyle = {
    border: "1px solid rgba(209, 213, 219, 0.35)",
    backgroundColor: "var(--background)",
  };

  const videoStyle = {
    backgroundColor: "var(--background)",
  };

  const handleMouseEnter = async () => {
    if (props.video) {
      setIsVideo(true);
      const response = await fetch(`src/assets/${props.video}`);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      setVideo(blobUrl);
    }
  };

  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={props.link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVideo(false)}
        target="_blank"
        data-cursor={"disable"}
        style={linkStyle}
      >
        {props.link && (
          <div className="work-link">
            <MdArrowOutward />
          </div>
        )}
        <img src={props.image} alt={props.alt} style={imageStyle} />
        {isVideo && (
          <video src={video} autoPlay muted playsInline loop style={videoStyle}></video>
        )}
      </a>
    </div>
  );
};

export default WorkImage;