import {
    AdvancedImage,
    lazyload,
    placeholder,
    responsive,
} from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";

import { cloudinaryAppLogo } from "@/config";
import cld from "@/utils/cloudinary";
import { Link } from "@inertiajs/react";

export default function Logo({
    width,
    height,
    radius,
    className,
    href = '/',
    ...rest
}: {
    width?: number;
    height?: number;
    radius?: number;
    className?: string;
    href?: string;
}) {
    const logo = cld.image(cloudinaryAppLogo);
    logo.resize(
        fill()
            .width(width ?? 64)
            .height(height ?? 64)
    ).roundCorners(byRadius(radius ?? 25));

    return (
        <Link href={href}>
            <AdvancedImage
                cldImg={logo}
                plugins={[responsive(), placeholder(), lazyload()]}
                {...rest}
            />
        </Link>
    );
}
