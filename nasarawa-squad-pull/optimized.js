function pullIntoNasarawaSquad() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("Nasarawa Squad");

    if (!sheet) throw new Error('Sheet "Nasarawa Squad" does not exist.');

    // === CONFIG ===
    const sourceId = "1Kh6OkzWFT0R5****K7gAhEIYzpftSIj-1AACe1k4rvk";
    const sourceSheetName = "2025 Squad Export";
    const sourceRange = "E2:AI";

    const sourceSS = SpreadsheetApp.openById(sourceId);
    const sourceSheet = sourceSS.getSheetByName(sourceSheetName);
    if (!sourceSheet) throw new Error(`Source sheet "${sourceSheetName}" not found.`);

    // === READ SOURCE VALUES IN ONE OPERATION ===
    const values = sourceSheet.getRange(sourceRange).getValues();

    // === CHECK IF SOURCE IS EMPTY TO PREVENT ERRORS ===
    if (!values || values.length === 0 || values[0].length === 0) {
      Logger.log("No data found in source sheet. Pull aborted.");
      return;
    }

    // === HASHING: ONLY UPDATE IF DATA CHANGED ===
    const newHash = createHash(values);
    const oldHash = PropertiesService.getDocumentProperties().getProperty("squad_hash");

    if (oldHash === newHash) {
      Logger.log("No changes detected. Skipped updating Nasarawa Squad.");
      return; // saves time!
    }

    // === CLEAR OLD DATA IN ONE OPTIMIZED CALL ===
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) sheet.getRange(`F2:AI${lastRow}`).clearContent();

    // === WRITE NEW DATA IN ONE BATCH ===
    sheet.getRange(2, 6, values.length, values[0].length).setValues(values);

    
  } catch (err) {
    Logger.log("ERROR: " + err.message);

    // FIND THE COLUMN TITLED "settled_at"
    const headerRow = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

    const settledAtCol = headerRow.indexOf("settled_at") + 1;
    if (settledAtCol < 1) {
      throw new Error('Column "settled_at" not found in header row.');
  }
    
    // Apply "MM/dd/yyyy hh:mm" == 11/28/2025 5:00 PM formatting conventions
    const dateRange = sheet.getRange(2, settledAtCol, values.length, 1);
    dateRange.setNumberFormat("MM/dd/yyyy hh:mm");

    // === SAVE HASH TO PREVENT UNNECESSARY FUTURE PULLS ===
    PropertiesService.getDocumentProperties().setProperty("squad_hash", newHash);

    // === AUDIT LOG WITH TIMESTAMP ===
    sheet.getRange("A1").setValue("Last Updated: " + new Date());
    Logger.log("Pull successful at " + new Date());
  }
}

/**
 * Efficient hashing function for change detection
 */
function createHash(values) {
  const flat = values.flat().join("|");
  return Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, flat)
    .map(b => (b + 256) % 256)
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}
