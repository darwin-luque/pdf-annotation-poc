import { PDFSelector } from "@/components/pdf-selector";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

function App() {
  const [files, setFiles] = useState<File[]>([]);

  const onSelectFiles = (files: FileList) =>
    setFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);

  return (
    <div className="w-screen h-screen flex flex-col gap-4 px-6 py-4">
      <h1 className="font-semibold text-xl">PDF Annotation Proof of Concept</h1>
      <Separator />
      <div className="grid grid-cols-3 my-4 h-full">
        <div className="col-span-1 flex w-full h-full">
          <div className="flex-1">
            <PDFSelector onSelected={onSelectFiles} />
            <ul className="mt-4">
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
          <Separator orientation="vertical" />
        </div>
      </div>
    </div>
  );
}

export default App;
