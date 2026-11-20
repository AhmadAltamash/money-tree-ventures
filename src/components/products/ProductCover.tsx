import { FilePdf, Leaf, MonitorPlay, PhoneCall, PlayCircle, Stack } from "@phosphor-icons/react/dist/ssr";
import type { ProductFormat } from "@/lib/product-options";
import { joinClasses } from "@/lib/utils";

export const formatIcons = {
  pdf: FilePdf,
  video: PlayCircle,
  video_and_files: MonitorPlay,
  bundle: Stack,
  consultation: PhoneCall,
};

type ProductCoverProps = {
  format: ProductFormat;
  leafNumber: number;
  className?: string;
};

// Simple cover shown until real product images are uploaded from the admin panel.
export function ProductCover({ format, leafNumber, className }: ProductCoverProps) {
  const FormatIcon = formatIcons[format];
  const isBundle = format === "bundle";

  return (
    <div
      aria-hidden="true"
      className={joinClasses(
        "flex aspect-4/3 flex-col justify-between rounded-lg p-4",
        isBundle ? "bg-brand text-brand-foreground" : "bg-surface-raised text-foreground",
        className,
      )}
    >
      <p className="caption-1 flex items-center gap-1">
        <Leaf size={16} />
        Leaf {String(leafNumber).padStart(2, "0")}
      </p>
      <FormatIcon size={48} className={isBundle ? undefined : "text-brand"} />
    </div>
  );
}
