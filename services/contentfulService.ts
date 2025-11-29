// // services/contentfulService.ts
// import { createClient } from 'contentful';
// import { PortfolioItem } from '../types';

// const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
// const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

// const client = createClient({
//   space: spaceId,
//   accessToken: accessToken,
// });

// export const getPortfolioItems = async (): Promise<PortfolioItem[]> => {
//   try {
//     const response = await client.getEntries({
//       content_type: 'portfolioItem', // Ensure this ID matches your Content Model ID in Contentful
//     });

//     const items = response.items.map((item: any) => {
//       const imageFile = item.fields.image?.fields?.file;
      
//       return {
//         id: item.sys.id,
//         src: `https:${imageFile?.url}`, // Contentful URLs need the https: prefix
//         alt: item.fields.title || 'Portfolio Image',
//         category: item.fields.category || 'All',
//         width: imageFile?.details?.image?.width || 800,
//         height: imageFile?.details?.image?.height || 600,
//       };
//     });

//     return items;
//   } catch (error) {
//     console.error("Error fetching contentful data:", error);
//     return [];
//   }
// };
//************************************* */
// services/contentfulService.ts
import { createClient } from 'contentful';
import { PortfolioItem } from '../types';

// REPLACE THESE LINES TEMPORARILY:
// const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
// const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

// PASTE YOUR ACTUAL KEYS HERE (as strings):
const spaceId = "1lm1tr03a9yn";
const accessToken = "u0vhBwZ_S0-TkjKCKnQcfZVRpg6pIMZJolUUZ8kztkQ";

console.log("Testing Keys:", spaceId, accessToken); // Check console to see if they print

const client = createClient({
  space: spaceId,
  accessToken: accessToken,
});

export const getPortfolioItems = async (): Promise<PortfolioItem[]> => {
  try {
    const response = await client.getEntries({ content_type: 'portfolioItem' });
    
    // Map the data (same as before)
    const items = response.items.map((item: any) => {
      const imageFile = item.fields.image?.fields?.file;
      return {
        id: item.sys.id,
        src: imageFile ? `https:${imageFile.url}` : '',
        alt: item.fields.title || 'Portfolio Image',
        category: item.fields.category || 'All',
        width: imageFile?.details?.image?.width || 800,
        height: imageFile?.details?.image?.height || 600,
      };
    });
    return items;
  } catch (error) {
    console.error("Contentful Error:", error);
    return [];
  }
};