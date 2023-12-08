import Image from "next/image";
import { BathroomImageType } from "@/types/UserImages";

const BathroomImage: React.FC<BathroomImageType> = ({
  src,
  height,
  width,
  onClickCallback,
}) => {
  return (
    <div>
      {src && src !== "" && (
        <Image
          src={src}
          alt="Image of bathroom picture"
          width={width}
          height={height}
          priority={true}
          onClick={onClickCallback}
        />
      )}
    </div>
  );
};

export default BathroomImage;
