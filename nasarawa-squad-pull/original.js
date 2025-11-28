function pullIntoNasarawaSquad() {
  //JS_1
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Nasarawa Squad");

  if (!sheet) {
    throw new Error('Sheet "Nasarawa Squad" does not exist.');
  }

  // Source spreadsheet and range
  const sourceId = "1Kh6OkzWFT0R5****K7gAhEIYzpftSIj-1AACe1k4rvk";
  const sourceRange = "2025 Squad Export!E2:AI";

  // Open the source spreadsheet
  const sourceSS = SpreadsheetApp.openById(sourceId);
  const sourceSheet = sourceSS.getSheetByName("2025 Squad Export");

  if (!sourceSheet) {
    throw new Error('Source sheet "2025 Squad Export" not found.');
  }

  // Get the values
  const values = sourceSheet.getRange(sourceRange).getValues();

  // Clear old data from F2 onwards before pasting
  sheet.getRange("F2:AI" + sheet.getLastRow()).clearContent();

  // Paste values starting at F2
  sheet.getRange(2, 6, values.length, values[0].length).setValues(values);

  SpreadsheetApp.getUi().alert("Data successfully pulled into 'Nasarawa Squad' starting from F2.");
}
