import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FC, useRef } from "react";

export type PDFSelectorProps = {
  onSelected: (files: FileList) => void;
};

export const PDFSelector: FC<PDFSelectorProps> = ({ onSelected }) => {
  const pdfSelectorRef = useRef<HTMLInputElement>(null);

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Select a PDF</Label>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          placeholder="Pdf Input"
          type="file"
          accept=".pdf"
          multiple
          ref={pdfSelectorRef}
        />
        <Button
          onClick={() => {
            const files = pdfSelectorRef.current?.files;
            if (files) {
              onSelected(files);
            }
          }}
          type="submit"
        >
          Select
        </Button>
      </div>
    </div>
  );
};
