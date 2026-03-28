export const uploadToCloudinary = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    return {
      success: true,
      data: {
        url: data.secure_url,
        width: data.width,
        height: data.height,
      },
    };
  } catch (err) {
    return { success: false };
  }
};


// 🔥 BUILD TRANSFORM URL (SUPER IMPORTANT)
export const buildCloudinaryUrl = (url, options = {}) => {
  if (!url) return "";

  const base = url.split("/upload/")[0];
  const imagePath = url.split("/upload/")[1];

  let transformations = [];

  // Resize
  if (options.width && options.height) {
    transformations.push(`w_${options.width},h_${options.height},c_fill`);
  }

  // Background remove
  if (options.removeBg) {
    transformations.push("e_background_removal");
  }

  // Shadow
  if (options.shadow) {
    transformations.push("e_shadow");
  }

  // ✅ TEXT OVERLAY FIX (THIS SOLVES YOUR ISSUE)
  if (options.text) {
    const text = encodeURIComponent(options.text);

    transformations.push(
      `l_text:Arial_${options.fontSize || 40}:${text},co_rgb:${
        options.color || "ffffff"
      },g_${options.position || "center"}`
    );
  }

  const transformationString = transformations.join(",");

  return `${base}/upload/${transformationString}/${imagePath}`;
};