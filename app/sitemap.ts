import { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://example.com";
  return ["","/services","/service-areas","/about","/reviews","/contact","/book-online","/blog","/admin"].map(p=>({url:`${base}${p}`,lastModified:new Date()}));
}
