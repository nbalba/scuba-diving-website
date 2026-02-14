import type { BlogPost } from "@/lib/types";

export const blogPosts: BlogPost[] = [
  {
    slug: "getting-started-scuba-diving",
    title: "Getting Started with Scuba Diving: A Beginner's Guide",
    excerpt:
      "Everything you need to know before your first dive, from choosing a certification course to what gear you'll need.",
    content: `<p>Scuba diving opens the door to a world that most people only see on television. The weightlessness, the silence broken only by your own breathing, and the sheer wonder of swimming alongside marine life in their natural habitat — it's an experience unlike any other.</p>

<h3>Choose Your Certification</h3>
<p>The first step is earning your Open Water certification through a recognized agency like PADI or SSI. This typically involves classroom theory, pool (confined water) sessions, and four open water dives. Most courses can be completed in three to four days, and you'll emerge qualified to dive to 18 meters worldwide.</p>

<h3>Gear Essentials</h3>
<p>For your certification course, the dive center will provide all the heavy equipment — BCD, regulator, tanks, and weights. However, most divers prefer to own their own mask, snorkel, and fins for comfort and hygiene. A well-fitting mask that doesn't leak is arguably the single most important piece of gear you'll buy.</p>

<h3>Your First Open Water Dives</h3>
<p>Don't expect to feel graceful on your first few dives — everyone is a bit awkward at the beginning. Focus on your breathing (slow and deep), your buoyancy (small adjustments only), and simply enjoying the experience. The skills and confidence come quickly with practice, and before you know it, you'll be planning your next dive trip.</p>`,
    imagePath: "/images/blog/getting-started.jpg",
    author: "Maria Santos",
    publishedAt: "2025-11-15",
    tags: ["Beginners", "Certification", "Gear"],
  },
  {
    slug: "underwater-photography-tips",
    title: "Top 5 Underwater Photography Tips",
    excerpt:
      "Capture stunning underwater images on your next dive with these practical tips from a professional marine photographer.",
    content: `<p>Underwater photography combines two challenging skills — diving and photography — into one deeply rewarding discipline. Whether you're shooting with a compact camera or a full mirrorless rig, these five tips will dramatically improve your results.</p>

<h3>1. Get Close, Then Get Closer</h3>
<p>Water absorbs light and color rapidly. The more water between your lens and your subject, the more you lose contrast, sharpness, and color. The golden rule is to get as close as your subject will allow. A small, sharp subject fills more of the frame than a distant, hazy reef.</p>

<h3>2. Shoot Upward</h3>
<p>Shooting slightly upward toward the surface creates dramatic backgrounds with natural blue water and sunburst effects. It also separates your subject from the cluttered reef below, making it stand out. This single change in angle can transform an average photo into a striking one.</p>

<h3>3. Master Your Buoyancy First</h3>
<p>No camera upgrade will compensate for poor buoyancy. If you're bobbing up and down or kicking up silt, your photos will suffer and you'll stress the marine environment. Invest time in buoyancy workshops before investing money in camera gear.</p>

<h3>4. Use Natural Light Creatively</h3>
<p>While strobes are essential for macro and close-up work, natural light can produce beautiful wide-angle images, especially in clear tropical water. Silhouettes, sun rays, and dappled light patterns through surface waves all add mood and drama.</p>

<h3>5. Be Patient</h3>
<p>The best underwater photographers are the most patient. Find an interesting subject, settle into position, control your breathing, and wait. Marine life often becomes curious about a still diver, and the behaviors you capture during those quiet moments make the most compelling images.</p>`,
    imagePath: "/images/blog/underwater-photography.jpg",
    author: "James Chen",
    publishedAt: "2026-01-08",
    tags: ["Photography", "Tips", "Equipment"],
  },
  {
    slug: "dive-certifications-padi-vs-ssi",
    title: "Understanding Dive Certifications: PADI vs SSI",
    excerpt:
      "A clear comparison of the two largest dive certification agencies to help you choose the right path for your diving journey.",
    content: `<p>If you're looking into scuba diving certification, you've almost certainly encountered two dominant names: PADI (Professional Association of Diving Instructors) and SSI (Scuba Schools International). Both are respected worldwide, but they differ in approach, structure, and philosophy.</p>

<h3>PADI: The Global Standard</h3>
<p>PADI is the world's largest recreational dive training organization, with over 6,600 dive centers in 186 countries. Their courses follow a structured, modular approach with standardized materials available in dozens of languages. PADI certifications are universally recognized, and finding a PADI dive center in any destination is virtually guaranteed.</p>

<h3>SSI: Flexible and Dive Center Focused</h3>
<p>SSI takes a slightly different approach by providing free digital learning materials and giving individual dive centers more flexibility in how they deliver training. Their philosophy emphasizes comfort and confidence, often incorporating more in-water practice time. SSI materials are free to access digitally, which can reduce the upfront cost of certification.</p>

<h3>Which Should You Choose?</h3>
<p>Honestly, either one is an excellent choice. Both agencies are recognized worldwide, and their certifications are cross-compatible — meaning a PADI dive center will accept your SSI card, and vice versa. The most important factor isn't the agency on your card, but the quality of the instructor standing in front of you. Choose based on the dive center and instructor you feel most comfortable with, and you'll have a fantastic learning experience regardless of the logo.</p>`,
    imagePath: "/images/blog/dive-certifications.jpg",
    author: "Maria Santos",
    publishedAt: "2026-02-01",
    tags: ["Certification", "Education", "PADI", "SSI"],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
