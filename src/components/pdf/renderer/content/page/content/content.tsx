import { FC, useMemo } from "react";
import { Layer, Rect, Stage } from "react-konva";
import { usePageContext } from "react-pdf";

export type Rect = {
  width: number;
  height: number;
  x: number;
  y: number;
  stroke: string;
  strokeWidth: number;
};

export type PDFReaderPageContentProps = {
  rects?: Rect[][];
};

export const PDFReaderPageContent: FC<PDFReaderPageContentProps> = ({
  rects = [],
}) => {
  const pageContext = usePageContext();
  const page = useMemo(
    () => (pageContext?.page ? pageContext.page : null),
    [pageContext],
  );
  const [width, height] = useMemo<[number, number]>(() => {
    if (page) {
      const view = page.getViewport();
      return [view.viewBox[2], view.viewBox[3]];
    }
    return [0, 0];
  }, [page]);
  const pageRects = useMemo(
    () =>
      typeof pageContext?.pageIndex !== "undefined"
        ? (rects[pageContext.pageIndex] ?? [])
        : [],
    [rects, pageContext?.pageIndex],
  );

  return (
    <Stage width={width} height={height} className="absolute top-0 left-0">
      <Layer>
        {pageRects.map((rect) => (
          <Rect
            key={`${rect.x}-${rect.y}`}
            fill="transparent"
            cornerRadius={10}
            {...rect}
          />
        ))}
      </Layer>
    </Stage>
  );
};
