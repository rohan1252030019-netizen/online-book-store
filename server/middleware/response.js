// ------------------------------------------------------------------
//  Helper for sending clean, consistent JSON responses.
//  Controllers use these so the frontend always gets the same shape:
//    { success: true/false, message: "...", data: ... }
// ------------------------------------------------------------------

// Success response -> HTTP 200
const ok = (res, message, data = null) => {
  res.status(200).json({ success: true, message, data });
};

// Error response -> any status code we pass (400, 401, 404, 500 ...)
const fail = (res, status, message) => {
  res.status(status).json({ success: false, message });
};

module.exports = { ok, fail };
