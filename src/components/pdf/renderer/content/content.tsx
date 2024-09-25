import { FC, useMemo, useState } from "react";
import { Page, useDocumentContext } from "react-pdf";
import { PDFRendererToolbar } from "../toolbar";
import { PDFReaderPageContent, Rect } from "./page/content";

export type PDFReaderContentProps = {
  rects?: Rect[][];
};

export const PDFReaderContent: FC<PDFReaderContentProps> = ({ rects }) => {
  const documentContext = useDocumentContext();
  const [currentPage, setCurrentPage] = useState(1);
  const pdfDoc = useMemo(
    () => (documentContext?.pdf ? documentContext.pdf : null),
    [documentContext?.pdf],
  );

  const canNextPage = useMemo(
    () => currentPage < (pdfDoc?.numPages ?? 0),
    [currentPage, pdfDoc?.numPages],
  );
  const canPrevPage = useMemo(() => currentPage > 1, [currentPage]);

  const onChangePage = (isNext: boolean) => {
    setCurrentPage((prev) => prev + (isNext ? 1 : -1));
  };
  return (
    <>
      <PDFRendererToolbar
        curPage={currentPage}
        canNextPage={canNextPage}
        canPrevPage={canPrevPage}
        onNextPage={() => onChangePage(true)}
        onPrevPage={() => onChangePage(false)}
        onLastPage={() => setCurrentPage(pdfDoc?.numPages ?? 0)}
        onFirstPage={() => setCurrentPage(1)}
      />
      <Page pageNumber={currentPage} className="relative">
        <PDFReaderPageContent rects={rects} />
      </Page>
    </>
  );
};
