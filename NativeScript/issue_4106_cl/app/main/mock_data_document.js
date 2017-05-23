"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Document = (function () {
    function Document(name, imageSrc, desc, time) {
        this.name = name;
        this.imageSrc = imageSrc;
        this.desc = desc;
        this.time = time;
    }
    return Document;
}());
exports.Document = Document;
var chatmessage = "4 MB ";
var GroupFooter = (function () {
    function GroupFooter(description) {
        this.description = description;
    }
    return GroupFooter;
}());
exports.GroupFooter = GroupFooter;
exports.mokedDocumentArray = [
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
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja19kYXRhX2RvY3VtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9ja19kYXRhX2RvY3VtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0E7SUFDSSxrQkFBbUIsSUFBWSxFQUFTLFFBQWdCLEVBQVMsSUFBWSxFQUFTLElBQVk7UUFBL0UsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQVE7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBUTtJQUFJLENBQUM7SUFDM0csZUFBQztBQUFELENBQUMsQUFGRCxJQUVDO0FBRlksNEJBQVE7QUFJckIsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDO0FBQzFCO0lBQ0kscUJBQW1CLFdBQW1CO1FBQW5CLGdCQUFXLEdBQVgsV0FBVyxDQUFRO0lBQUksQ0FBQztJQUMvQyxrQkFBQztBQUFELENBQUMsQUFGRCxJQUVDO0FBRlksa0NBQVc7QUFLYixRQUFBLGtCQUFrQixHQUFHO0lBRTVCLElBQUksUUFBUSxDQUFDLDhDQUE4QyxFQUFFLGdDQUFnQyxFQUFFLFdBQVcsRUFBRSxPQUFPLENBQUM7SUFDcEgsSUFBSSxRQUFRLENBQUMsYUFBYSxFQUFFLDhCQUE4QixFQUFFLFdBQVcsRUFBRSxPQUFPLENBQUM7SUFFakYsSUFBSSxRQUFRLENBQUMsY0FBYyxFQUFFLCtCQUErQixFQUFFLFdBQVcsRUFBRSxPQUFPLENBQUM7SUFDbkYsSUFBSSxRQUFRLENBQUMsYUFBYSxFQUFFLDhCQUE4QixFQUFFLFdBQVcsRUFBRSxPQUFPLENBQUM7SUFFakYsSUFBSSxRQUFRLENBQUMsZUFBZSxFQUFFLGdDQUFnQyxFQUFFLFdBQVcsRUFBRSxPQUFPLENBQUM7SUFDckYsSUFBSSxRQUFRLENBQUMsYUFBYSxFQUFFLDhCQUE4QixFQUFFLFdBQVcsRUFBRSxPQUFPLENBQUM7SUFHakYsSUFBSSxRQUFRLENBQUMsY0FBYyxFQUFFLCtCQUErQixFQUFFLFdBQVcsRUFBRSxPQUFPLENBQUM7SUFDbkYsSUFBSSxRQUFRLENBQUMsYUFBYSxFQUFFLDhCQUE4QixFQUFFLFdBQVcsRUFBRSxPQUFPLENBQUM7SUFFakYsSUFBSSxRQUFRLENBQUMsZUFBZSxFQUFFLGdDQUFnQyxFQUFFLFdBQVcsRUFBRSxPQUFPLENBQUM7SUFDckYsSUFBSSxRQUFRLENBQUMsYUFBYSxFQUFFLDhCQUE4QixFQUFFLFdBQVcsRUFBRSxPQUFPLENBQUM7Q0FHcEYsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IGNsYXNzIERvY3VtZW50IHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nLCBwdWJsaWMgaW1hZ2VTcmM6IHN0cmluZywgcHVibGljIGRlc2M6IHN0cmluZywgcHVibGljIHRpbWU6IHN0cmluZykgeyB9XG59XG5cbnZhciBjaGF0bWVzc2FnZSA9IFwiNCBNQiBcIjtcbmV4cG9ydCBjbGFzcyBHcm91cEZvb3RlciB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmcpIHsgfVxufVxuXG5cbmV4cG9ydCB2YXIgbW9rZWREb2N1bWVudEFycmF5ID0gW1xuXG4gICAgbmV3IERvY3VtZW50KFwiRXhjZWxEb2N1bWVudGZzZGZkc2Zkc2Zkc2Zkc2Zkc2Zkc2Zkc2Zkc2Zkc2ZcIiwgXCJ+L2ltYWdlcy9oaWViZXIvZmlsZV9leGNlbC5wbmdcIiwgY2hhdG1lc3NhZ2UsIFwiMTk6NTBcIiksXG4gICAgbmV3IERvY3VtZW50KFwiUERGRG9jdW1lbnRcIiwgXCJ+L2ltYWdlcy9oaWViZXIvZmlsZV9wZGYucG5nXCIsIGNoYXRtZXNzYWdlLCBcIjIwOjM1XCIpLFxuXG4gICAgbmV3IERvY3VtZW50KFwiV29yZERvY3VtZW50XCIsIFwifi9pbWFnZXMvaGllYmVyL2ZpbGVfd29yZC5wbmdcIiwgY2hhdG1lc3NhZ2UsIFwiMDc6MjVcIiksXG4gICAgbmV3IERvY3VtZW50KFwiUERGRG9jdW1lbnRcIiwgXCJ+L2ltYWdlcy9oaWViZXIvZmlsZV9wZGYucG5nXCIsIGNoYXRtZXNzYWdlLCBcIjA0OjU1XCIpLFxuXG4gICAgbmV3IERvY3VtZW50KFwiRXhjZWxEb2N1bWVudFwiLCBcIn4vaW1hZ2VzL2hpZWJlci9maWxlX2V4Y2VsLnBuZ1wiLCBjaGF0bWVzc2FnZSwgXCIxMToxNVwiKSxcbiAgICBuZXcgRG9jdW1lbnQoXCJQREZEb2N1bWVudFwiLCBcIn4vaW1hZ2VzL2hpZWJlci9maWxlX3BkZi5wbmdcIiwgY2hhdG1lc3NhZ2UsIFwiMTQ6NDFcIiksXG5cblxuICAgIG5ldyBEb2N1bWVudChcIldvcmREb2N1bWVudFwiLCBcIn4vaW1hZ2VzL2hpZWJlci9maWxlX3dvcmQucG5nXCIsIGNoYXRtZXNzYWdlLCBcIjIyOjQ1XCIpLFxuICAgIG5ldyBEb2N1bWVudChcIlBERkRvY3VtZW50XCIsIFwifi9pbWFnZXMvaGllYmVyL2ZpbGVfcGRmLnBuZ1wiLCBjaGF0bWVzc2FnZSwgXCIyMzo0M1wiKSxcblxuICAgIG5ldyBEb2N1bWVudChcIkV4Y2VsRG9jdW1lbnRcIiwgXCJ+L2ltYWdlcy9oaWViZXIvZmlsZV9leGNlbC5wbmdcIiwgY2hhdG1lc3NhZ2UsIFwiMTU6NTZcIiksXG4gICAgbmV3IERvY3VtZW50KFwiUERGRG9jdW1lbnRcIiwgXCJ+L2ltYWdlcy9oaWViZXIvZmlsZV9wZGYucG5nXCIsIGNoYXRtZXNzYWdlLCBcIjE3OjQ1XCIpLFxuXG5cbl1cbiJdfQ==