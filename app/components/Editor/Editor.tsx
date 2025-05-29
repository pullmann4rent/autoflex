// app/components/texteditor.tsx
import { useEffect, useState } from "react";
import { ClientOnly } from "remix-utils/client-only";
import "react-quill/dist/quill.snow.css";

type Props = {
  onChange: (...args: any[]) => any;
  value?: string;
  theme?: string;
  placeholder?: string;
};

const toolBarOptions = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
};

export function TextEditor(props: Props) {
  const [Quill, setQuill] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("react-quill")
        .then((QuillModule) => {
          if (QuillModule && QuillModule.default) {
            setQuill(() => QuillModule.default);
          } else {
            console.error("React Quill module or default export not found");
          }
        })
        .catch((error) => console.error("Failed to load react-quill", error));
    }
  }, []);

  return (
    <ClientOnly fallback={<p>Fallback</p>}>
      {() =>
        Quill ? (
          <Quill {...props} modules={toolBarOptions} />
        ) : (
          <div>Loading editor...</div>
        )
      }
    </ClientOnly>
  );
}