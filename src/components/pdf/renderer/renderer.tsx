import type { DocumentInitParameters } from "pdfjs-dist/types/src/display/api";
import { useState, type FC } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

const options = {
  standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts`,
} satisfies Partial<Omit<DocumentInitParameters, "data" | "range" | "url">>;

export type PDFRendererProps = {
  file: File;
};

export const PDFRenderer: FC<PDFRendererProps> = ({ file }) => {
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Document
      file={file}
      options={options}
      onLoadSuccess={(props) => {
        setNumPages(props.numPages);
        setCurrentPage(1);
      }}
    >
      <Page pageNumber={currentPage} />
    </Document>
  );
};
