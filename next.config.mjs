// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images:{
//         domains: ["images.unsplash.com","img.clerk.com","ik.imagekit.io"],
//     },
// };


// export default nextConfig;



// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "res.cloudinary.com", // Cloudinary
//       },
//       {
//         protocol: "https",
//         hostname: "ik.imagekit.io", // ImageKit
//       },
//     ],
//   },
// };

// export default nextConfig;


const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io", // your ImageKit
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // for Unsplash
      },
      {
        protocol: "https",
        hostname: "img.clerk.com", // <-- add this
      },
    ],
  },
};

export default nextConfig;