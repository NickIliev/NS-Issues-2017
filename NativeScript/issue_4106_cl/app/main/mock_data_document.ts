
export class Document {
    constructor(public name: string, public imageSrc: string, public desc: string, public time: string) { }
}

var chatmessage = "4 MB ";
export class GroupFooter {
    constructor(public description: string) { }
}


export var mokedDocumentArray = [

    new Document("ExcelDocumentfsdfdsfdsfdsfdsfdsfdsfdsfdsfdsf", "~/images/hieber/file_excel.png", chatmessage, "19:50"),
    new Document("PDFDocument", "~/images/hieber/file_pdf.png", chatmessage, "20:35"),

    new Document("WordDocument", "~/images/hieber/file_word.png", chatmessage, "07:25"),
    new Document("PDFDocument", "~/images/hieber/file_pdf.png", chatmessage, "04:55"),

    new Document("ExcelDocument", "~/images/hieber/file_excel.png", chatmessage, "11:15"),
    new Document("PDFDocument", "~/images/hieber/file_pdf.png", chatmessage, "14:41"),


    new Document("WordDocument", "~/images/hieber/file_word.png", chatmessage, "22:45"),
    new Document("PDFDocument", "~/images/hieber/file_pdf.png", chatmessage, "23:43"),

    new Document("ExcelDocument", "~/images/hieber/file_excel.png", chatmessage, "15:56"),
    new Document("PDFDocument", "~/images/hieber/file_pdf.png", chatmessage, "17:45"),


]
