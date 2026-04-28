import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import type { Ref } from "react";

type ScrollAreaProps = React.ComponentProps<typeof ScrollAreaPrimitive.Root> & {
  viewportRef?: Ref<HTMLDivElement>;
};

export function ScrollArea({
  className,
  children,
  viewportRef,
  ...props
}: ScrollAreaProps) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={`relative ${className ?? ""}`}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        ref={viewportRef}
        className="size-full rounded-[inherit] outline-none focus-visible:ring-1 focus-visible:ring-ink/40"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

type ScrollBarProps = React.ComponentProps<
  typeof ScrollAreaPrimitive.ScrollAreaScrollbar
> & {
  orientation?: "horizontal" | "vertical";
};

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: ScrollBarProps) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={[
        "hidden touch-none select-none p-px transition-colors sm:flex",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2",
        "data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:flex-col",
        className ?? "",
      ].join(" ")}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="relative flex-1 rounded-full bg-ink/30 transition-colors hover:bg-ink/50"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
}
