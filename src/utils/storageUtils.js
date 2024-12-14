import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage(); // Initialize Firebase Storage instance

/**
 * Upload a picture to Firebase Storage and get its URL.
 *
 * @param {File} file - The file object to upload.
 * @param {string} folder - The folder in Firebase Storage to save the file.
 * @returns {Promise<string>} - The download URL of the uploaded file.
 */
export const uploadPicture = async (file, folder) => {
  if (!file) throw new Error("No file provided");

  // Create a storage reference
  const fileRef = ref(storage, `${folder}/${file.name}-${Date.now()}`);
  
  // Upload the file
  await uploadBytes(fileRef, file);

  // Get the download URL
  const downloadURL = await getDownloadURL(fileRef);

  return downloadURL;
};
