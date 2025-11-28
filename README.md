# Google Apps Script Optimisation – Nasarawa Squad Data Pull

This repository demonstrates a real-world optimisation of a Google Apps Script used to:

✔ Pull data from a remote spreadsheet  
✔ Clear & replace old rows  
✔ Format date columns  
✔ Run reliably under triggers  

-----

# **Performance Comparison**

## **1. Original Version**
- Hard-coded full range parsing  
- Used `SpreadsheetApp.getUi()` (fails under triggers)  
- Always rewrote data even when nothing changed  
- No error handling  
- Slower on large sheets  
- Execution time: **~2.0–2.5 seconds**

-----

## **2. Optimised Version**
### Key improvements:
- Source ID + sheet handled directly (no parsing lag)
- Cleaner error-handling 
- Single read + single write (Apps Script fastest pattern)  
- Proper date formatting (`MM/dd/yyyy hh:mm`)
- Hash-based change detection (**skips unnecessary writes**)  
- Trigger-safe (no UI calls)
- Execution time: **~0.5–1.0 seconds**  
- **2× faster, more stable**  

-----

# Why It Matters

Google Apps Script performance is limited mostly by:

- Inefficient range parsing
- Redundant sheet rewrites  
- Number of **read/write** operations  
- UI calls inside non-UI contexts   

This optimised version fixes all of the above.

-----

# Files
| File | Description |
|------|-------------|
| `original.js` | First version of the script (functional but inefficient) |
| `optimized.js` | Production-grade optimized version |

---

# Contact
Built by **Kigbu Tsaku Godsave** — Data Analyst & Data Scientist.

