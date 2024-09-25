import { Button, buttonVariants } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { FC } from "react";

export type PDFRendererToolbar = {
  onFirstPage: () => void;
  onNextPage: () => void;
  onPrevPage: () => void;
  onLastPage: () => void;
  canNextPage: boolean;
  canPrevPage: boolean;
  curPage: number;
};

export const PDFRendererToolbar: FC<PDFRendererToolbar> = ({
  onFirstPage,
  canNextPage,
  canPrevPage,
  onLastPage,
  onNextPage,
  onPrevPage,
  curPage,
}) => {
  return (
    <div className="flex items-center justify-end space-x-2 py-2 bg-secondary px-4 rounded-md">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onFirstPage()}
        disabled={!canPrevPage}
      >
        <ChevronsLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPrevPage()}
        disabled={!canPrevPage}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className={buttonVariants({ size: "icon", variant: "outline" })}>
        {curPage}
      </span>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onNextPage()}
        disabled={!canNextPage}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onLastPage()}
        disabled={!canNextPage}
      >
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
