import { PDFRenderer } from "@/components/pdf/renderer";
import { PDFSelector } from "@/components/pdf/selector";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

function App() {
  const [files, setFiles] = useState<File[]>([]);
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  const onSelectFiles = (files: FileList) =>
    setFiles((prevFiles) => [
      ...prevFiles,
      ...Array.from(files).filter((file) => !prevFiles.includes(file)),
    ]);

  return (
    <div className="w-screen h-screen flex flex-col gap-4 px-6 py-4">
      <h1 className="font-bold text-3xl">PDF Annotation Proof of Concept</h1>
      <Separator />
      <div className="grid grid-cols-3 my-4 h-full">
        <div className="col-span-1 flex w-full h-full">
          <div className="flex-1">
            <PDFSelector onSelected={onSelectFiles} />
            <ul className="mt-4 space-y-2">
              {files.map((file, index) => (
                <li key={index}>
                  <Button
                    variant={file === currentFile ? "secondary" : "ghost"}
                    onClick={() => setCurrentFile(file)}
                  >
                    {file.name}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          <Separator orientation="vertical" />
        </div>
        <div className="col-span-2 flex justify-center items-center">
          {!!currentFile ? (
            <PDFRenderer file={currentFile} />
          ) : (
            <p className="text-lg text-center">
              <strong className="font-semibold">No file selected</strong>
              <span className="flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" /> Select a file from the
                left
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
