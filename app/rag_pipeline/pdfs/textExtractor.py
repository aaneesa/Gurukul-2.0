from multilingual_pdf2text.pdf2text import PDF2Text
from multilingual_pdf2text.models.document_model.document import Document
import logging
import os

logging.basicConfig(level=logging.INFO)

def main():
    pdf_document = Document(
        document_path='./pdfs/Class-X-NCERT-Books-History.pdf',
        language='hin'
    )
    pdf2text = PDF2Text(document=pdf_document)
    content = pdf2text.extract()   # list of dicts, each has "page_number" and "text"

    # define chapters as (start_page, end_page)
    chapters = [
        (1, 10),   # Example: Chapter 1 is pages 1–10
        (11, 20),  # Chapter 2
        (21, 35),  # Chapter 3
        # add the rest...
    ]

    output_folder = "./outputs"
    os.makedirs(output_folder, exist_ok=True)

    for idx, (start, end) in enumerate(chapters, start=1):
        # collect text of given chapter
        texts = [
            page["text"] 
            for page in content 
            if start <= page["page_number"] <= end
        ]
        full_text = "\n".join(texts)

        # save chapter text to file
        output_file = os.path.join(output_folder, f"chapter{idx}.txt")
        with open(output_file, "w", encoding="utf-8") as f:
            f.write(full_text)

        print(f"Chapter {idx} saved to {output_file}")


if __name__ == "__main__":
    main()

# from multilingual_pdf2text.pdf2text import PDF2Text
# from multilingual_pdf2text.models.document_model.document import Document
# import logging
# import os

# logging.basicConfig(level=logging.INFO)

# def main():
#     pdf_document = Document(
#         document_path='./pdfs/Class-X-NCERT-Books-History.pdf',
#         language='hin'
#     )
#     pdf2text = PDF2Text(document=pdf_document)
#     content = pdf2text.extract()   # list of dicts
#     print(content)
#     #list of all chapter page numbers
#     chapters = [
#         (),
#         (),
#         (),
#         (),
#         (),
#         (),
#     ]
#     for chapter in range (len(chapters)):
#         texts = ""
#         for pagenum in range (chapter[0]-1, chapter[1]):
#             if content["page_number"] == pagenum:
#             texts += content["page_number"] 

#     # texts = [page["text"] for page in content if "text" in page]

#     # # Join into one string (separated by newlines)
#     # full_text = "".join(texts)

#     # # Create output folder if not exists
#     # output_folder = "./outputs"
#     # os.makedirs(output_folder, exist_ok=True)

#     # # Save text to file
#     # output_file = os.path.join(output_folder, "Class-X-NCERT-Books-History.txt")
#     # with open(output_file, "w", encoding="utf-8") as f:
#     #     f.write(full_text)

#     # print(f"Text successfully saved to {output_file}")

# if __name__ == "__main__":
#     main()


# texts = [page["text"] for page in content if "text" in page]
# # print(texts)
# full_text = "".join(texts)

# # Create output folder if not exists
# output_folder = "./outputs"
# os.makedirs(output_folder, exist_ok=True)

# # Save text to file
# output_file = os.path.join(output_folder, "chapter5.txt")
# with open(output_file, "w", encoding="utf-8") as f:
#     f.write(full_text)

# print(f"Text successfully saved to {output_file}")