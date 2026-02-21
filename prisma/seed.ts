import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const services = [
    ["drain-cleaning", "Drain Cleaning"],
    ["water-heater-repair", "Water Heater Repair"],
    ["leak-detection", "Leak Detection"],
    ["sewer-line-repair", "Sewer Line Repair"],
    ["emergency-plumbing", "Emergency Plumbing"]
  ];
  for (const [slug, title] of services) {
    await prisma.service.upsert({ where: { slug }, update: {}, create: { slug, title, description: `${title} experts for River City homes.`, body: `Detailed ${title} service page content.` } });
  }
  for (const city of ["River City", "Maple Town", "Oak Valley", "Pine Creek"]) {
    const slug = city.toLowerCase().replace(/\s+/g, "-");
    await prisma.serviceArea.upsert({ where: { slug }, update: {}, create: { city, slug, seoContent: `Trusted plumbing in ${city} with same-day response.` } });
  }
  for (let i = 1; i <= 6; i++) {
    await prisma.review.create({ data: { author: `Sample Customer ${i}`, rating: 5, content: `Sample review ${i}: River City Plumbing was fast and professional.`, isSample: true } });
  }
  const faqs = [
    "Do you offer 24/7 emergency service?",
    "How quickly can you arrive?",
    "Do you provide upfront pricing?",
    "Can you repair tankless water heaters?",
    "Are your plumbers licensed and insured?",
    "Do you offer drain camera inspections?",
    "Which areas do you serve?",
    "What payment methods are accepted?",
    "Do you guarantee your work?"
  ];
  for (const q of faqs) await prisma.fAQ.create({ data: { question: q, answer: "Yes—please contact us for details." } });
  await prisma.blogPost.upsert({ where: { slug: "how-to-prevent-clogged-drains" }, update: {}, create: { slug: "how-to-prevent-clogged-drains", title: "How to Prevent Clogged Drains", excerpt: "Simple habits that reduce clogs.", content: "Sample blog content from River City Plumbing.", published: true } });
}

main().finally(() => prisma.$disconnect());
