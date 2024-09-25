import { Loader2 } from "lucide-react";
import type { DocumentInitParameters } from "pdfjs-dist/types/src/display/api";
import { type FC } from "react";
import { Document, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { PDFReaderContent } from "./content";
import { Rect } from "./content/page/content";

const options = {
  standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts`,
} satisfies Partial<Omit<DocumentInitParameters, "data" | "range" | "url">>;

export type PDFRendererProps = {
  file: File;
  rects?: Rect[][];
};

export const PDFRenderer: FC<PDFRendererProps> = ({ file, rects }) => {
  return (
    <div className="flex-1 flex flex-col gap-1">
      <Document
        file={file}
        options={options}
        loading={<Loader2 className="w-10 h-10 animate-spin" />}
      >
        <PDFReaderContent rects={rects} />
      </Document>
    </div>
  );
};
