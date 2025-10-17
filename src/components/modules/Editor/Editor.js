"use client";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function RichTextEditor({ setBody,body }) {
  return (
    <div style={{ direction: "rtl" }}>
      <CKEditor
        editor={ClassicEditor}
        data={body}
        config={{
          language: "fa",
          toolbar: [
            "undo",
            "redo",
            "|",
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "|",
            "blockQuote",
            "alignment:left",
            "alignment:center",
            "alignment:right",
            "|",
            "removeFormat",
          ],
          // 🧹 تمیز کردن محتوای کپی‌شده
          htmlSupport: {
            allow: [
              {
                name: /.*/,
                attributes: true,
                classes: true,
                styles: true,
              },
            ],
          },
          htmlEmbed: {
            showPreviews: true,
          },
          // 👇 مهم‌ترین قسمت
          pasteFromOffice: {
            keepZeroWidthSpace: false,
            removeStyles: true,
          },
        }}
        onChange={(event, editor) => {
          setBody(editor.getData());
        }}
      />
    </div>
  );
}
