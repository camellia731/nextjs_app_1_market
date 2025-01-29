import { useState } from "react";

const ImgInput = (props) => {
  const [imageFile, setImageFile] = useState("");

  const handleClick = async () => {
    try {
      const data = new FormData();
      data.append("file", imageFile);
      data.append("upload_preset", "next-market-uploader");
      data.append("cloud_name", "dhfgombha");
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dhfgombha/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const jsonData = await response.json();
      await props.setImage(jsonData.url);
      console.log(jsonData.url);
      alert("画像アップロード成功");
    } catch (error) {
      alert("画像アップロード失敗");
      console.error(error);
    }    
  };
  return (
    <div className="img-input">
      <input
        type="file"
        onChange={(e) => setImageFile(e.target.files[0])
        } accept="image/png, image/jpeg"
      />
      <button onClick={handleClick} disabled={!imageFile}>
        画像アップロード
      </button>
    </div>
  );
};

export default ImgInput;
