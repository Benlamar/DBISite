import React, { useState } from "react";

const PreviewImage = ({ file }) => {
  const [preview, setPreview] = useState(null);

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    setPreview(reader.result);
  };

  return (
    <div>
      <img style={{width:'320px'}} id="photo" src={preview} alt="Profile Avatar" />
    </div>
  );
};

export default PreviewImage;
