// services/contentfulService.ts
import { createClient } from 'contentful';
import { PortfolioItem } from '../types';

// Provide types for Vite's import.meta.env so TypeScript recognizes env properties
interface ImportMetaEnv {
  readonly VITE_CONTENTFUL_SPACE_ID: string;
  readonly VITE_CONTENTFUL_ACCESS_TOKEN: string;
}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

const client = createClient({
  space: spaceId,
  accessToken: accessToken,
});

export const getPortfolioItems = async (): Promise<PortfolioItem[]> => {
  try {
    const response = await client.getEntries({
      content_type: 'portfolioItem', // Ensure this ID matches your Content Model ID in Contentful
    });

    const items = response.items.map((item: any) => {
      const imageFile = item.fields.image?.fields?.file;
      
      return {
        id: item.sys.id,
        src: `https:${imageFile?.url}`, // Contentful URLs need the https: prefix
        alt: item.fields.title || 'Portfolio Image',
        category: item.fields.category || 'All',
        width: imageFile?.details?.image?.width || 800,
        height: imageFile?.details?.image?.height || 600,
      };
    });

    return items;
  } catch (error) {
    console.error("Error fetching contentful data:", error);
    return [];
  }
};