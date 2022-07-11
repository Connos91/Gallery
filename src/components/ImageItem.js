/* eslint-disable jsx-a11y/alt-text */
import ImageListItem from "@mui/material/ImageListItem";

const ImageItem = ({ photo }) => {
  return (
    <ImageListItem key={photo.id}>
      <img
        src={`${photo.download_url}?w=248&fit=crop&auto=format`}
        srcSet={`${photo.download_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
        loading="lazy"
      />
    </ImageListItem>
  );
};
export default ImageItem;
