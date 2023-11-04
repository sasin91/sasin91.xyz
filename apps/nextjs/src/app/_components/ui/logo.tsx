import type { PropsWithoutRef, ReactElement, ReactHTMLElement } from "react";
import {
  AdvancedImage,
  lazyload,
  placeholder,
  responsive,
} from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";

import { cloudinaryAppLogo } from "~/config";
import cld from "~/utils/cloudinary";

export default function Logo(props: {
  width?: number;
  height?: number;
  radius?: number;
  className?: string;
}) {
  const logo = cld.image(cloudinaryAppLogo);
  logo
    .resize(
      fill()
        .width(props.width ?? 64)
        .height(props.height ?? 64),
    )
    .roundCorners(byRadius(props.radius ?? 25));

  return (
    <AdvancedImage
      cldImg={logo}
      plugins={[responsive(), placeholder(), lazyload()]}
      {...props}
    />
  );
}
