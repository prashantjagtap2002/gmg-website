import BackgroundVideo from "@/components/ui/BackgroundVideo";
import { mosaicRows } from "@/content/gallery";
import type { VideoAsset } from "@/content/media";

function VideoTile({ video, className }: { video: VideoAsset; className: string }) {
  return (
    <div className={`group relative overflow-hidden ${className}`}>
      <BackgroundVideo video={video} lazy />
      <div className="bg-hover-navy absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-80" aria-hidden />
    </div>
  );
}

function TagTile({ className }: { className: string }) {
  return (
    <div className={`group flex items-center justify-center bg-white transition-colors duration-300 hover:bg-hover-navy ${className}`}>
      <span className="text-[40px] leading-none font-semibold text-black transition-colors duration-300 group-hover:text-white">#GMG</span>
    </div>
  );
}

/**
 * Desktop: each 80vh row is a 3×2 grid — a wide clip and a (clip + #GMG) pair
 * fill two columns, a tall clip fills the third. Phones stack the tiles in
 * source order, with the same per-tile heights as the original.
 */
export default function GalleryMosaic() {
  return (
    <div>
      {mosaicRows.map((row) =>
        row.tallSide === "right" ? (
          <div key={row.wide.src} className="flex flex-col md:grid md:h-[80vh] md:grid-cols-3 md:grid-rows-2">
            <VideoTile video={row.wide} className="h-[80vh] md:col-span-2 md:col-start-1 md:row-start-1 md:h-auto" />
            <VideoTile video={row.small} className="h-[40vh] md:col-start-1 md:row-start-2 md:h-auto" />
            <TagTile className="h-[40vh] md:col-start-2 md:row-start-2 md:h-auto" />
            <VideoTile video={row.tall} className="h-[80vh] md:col-start-3 md:row-span-2 md:row-start-1 md:h-auto" />
          </div>
        ) : (
          <div key={row.wide.src} className="flex flex-col md:grid md:h-[80vh] md:grid-cols-3 md:grid-rows-2">
            <VideoTile video={row.tall} className="h-[80vh] md:col-start-1 md:row-span-2 md:row-start-1 md:h-auto" />
            <VideoTile video={row.small} className="h-[33.333vh] md:col-start-2 md:row-start-1 md:h-auto" />
            <TagTile className="h-[6.667vh] md:col-start-3 md:row-start-1 md:h-auto" />
            <VideoTile video={row.wide} className="h-[40vh] md:col-span-2 md:col-start-2 md:row-start-2 md:h-auto" />
          </div>
        ),
      )}
    </div>
  );
}
