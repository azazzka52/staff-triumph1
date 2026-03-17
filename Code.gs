
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads')
      || SpreadsheetApp.getActiveSpreadsheet().insertSheet('Leads');

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Дата','Имя','Телефон','Компания','Комментарий','Источник']);
    }

    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),
      data.name || '',
      data.phone || '',
      data.company || '',
      data.comment || '',
      data.source || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
