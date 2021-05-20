import axios from 'axios';

export const uploadPhoto = async (file) => {
  try {
    const formData = new FormData();
    formData.append(
      'upload_preset',
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PROFILE_PICS
    );
    formData.append('file', file);

    const response = await axios.post(
      process.env.REACT_APP_CLOUDINARY_UPLOAD_ENDPOINT,
      formData
    );

    return response.data.secure_url;
  } catch (error) {
    throw error;
  }
};
