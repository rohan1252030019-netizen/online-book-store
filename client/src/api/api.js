// The address of the Node.js backend. We keep it in one file so that
// if the port changes, we only edit it here.
export const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000';
