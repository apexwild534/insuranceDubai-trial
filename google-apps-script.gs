/**
 * InsuranceDubai.com — Lead Capture to Google Sheets
 * ─────────────────────────────────────────────────────
 * SETUP INSTRUCTIONS:
 *
 * 1. Open your Google Sheet (create a new one if needed).
 * 2. Click Extensions → Apps Script.
 * 3. Delete everything in the editor and paste this entire file.
 * 4. Click the floppy-disk icon to save.
 * 5. Click Deploy → New deployment.
 *    - Type: Web App
 *    - Description: Lead Capture v1
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Click Deploy → authorise when prompted.
 * 7. Copy the Web App URL shown.
 * 8. Paste it into ds-49f3a.js as the value of window.__ld_ep.
 *
 * Every time you edit this script you must create a NEW deployment
 * (or "Manage deployments → edit existing") for changes to take effect.
 */

var SHEET_NAME = 'Leads';

var COLUMNS = [
  'Timestamp',
  'Source Page',
  'Source Widget',
  'Full Name',
  'Email',
  'Phone',
  'Age Group',
  'Insurance Type',
  'Message'
];

function doPost(e) {
  try {
    var raw  = e.postData ? e.postData.contents : '{}';
    var data = JSON.parse(raw);

    var ss    = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(COLUMNS);
      formatHeader(sheet);
    }

    var row = [
      new Date().toLocaleString('en-AE', { timeZone: 'Asia/Dubai' }),
      data.source_page    || '',
      data.source_widget  || '',
      data.name           || '',
      data.email          || '',
      data.phone          || '',
      data.age            || '',
      data.insurance_type || '',
      data.message        || ''
    ];

    sheet.appendRow(row);
    autoResizeColumns(sheet);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, status: 'endpoint active' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function formatHeader(sheet) {
  var headerRange = sheet.getRange(1, 1, 1, COLUMNS.length);
  headerRange.setBackground('#1a3c6e');
  headerRange.setFontColor('#ffffff');
  headerRange.setFontWeight('bold');
  headerRange.setFontSize(11);
  sheet.setFrozenRows(1);
  sheet.setColumnWidth(1, 160);
  sheet.setColumnWidth(2, 200);
  sheet.setColumnWidth(3, 120);
  sheet.setColumnWidth(4, 160);
  sheet.setColumnWidth(5, 180);
  sheet.setColumnWidth(6, 140);
  sheet.setColumnWidth(7, 100);
  sheet.setColumnWidth(8, 200);
  sheet.setColumnWidth(9, 300);
}

function autoResizeColumns(sheet) {
  var lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.getRange(lastRow, 1, 1, COLUMNS.length)
      .setVerticalAlignment('middle')
      .setWrap(true);
  }
}
