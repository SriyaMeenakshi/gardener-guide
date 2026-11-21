import { useEffect, useState } from "react";
import { Sprout } from "lucide-react";

/**
 * A plant photo that never shows a broken-image icon. If the file doesn't exist yet (new plants start without a
 * photo), a soft leaf placeholder is drawn instead. When a photo with the expected file name is later added to
 * client/public/plants/, it appears by itself: no data change is needed.
 *
 * `className` goes on whichever element is drawn, so sizing and rounding stay the same either way.
 * `dark` gives the placeholder a deep-green background for use behind white text (the plant page banner).
 */
export default function PlantImage({ src, alt, className = "", dark = false, iconSize = 44, ...rest }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);

  if (!src || failed) {
    const tone = dark ? "bg-gradient-to-br from-leaf-700 to-leaf-900 text-leaf-400/70" : "bg-gradient-to-br from-leaf-100 to-leaf-200 text-leaf-400";
    return (
      <div role="img" aria-label={alt} className={`grid place-items-center ${tone} ${className}`}>
        <Sprout size={iconSize} strokeWidth={1.5} aria-hidden="true" />
      </div>
    );
  }
  return <img src={src} alt={alt} onError={() => setFailed(true)} className={className} {...rest} />;
}
