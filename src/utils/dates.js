/**
 * This is a module with helper functions for adding datestamps and timestamps to strings
 * 
 */

function dateStamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  return `${year}-${month}-${day}`
}

exports.dateStamp = dateStamp;