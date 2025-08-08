export type Club = {
  id: string;
  name: string;
  slug: string;
  description: string;
  location: string;
  tags: string[];
};

export const clubs: Club[] = [
  {
    id: "1",
    name: "GDSC Skyline University",
    slug: "gdsc-skyline-university",
    description: "A community of builders and learners exploring web, mobile, and AI.",
    location: "Skyline University, CA",
    tags: ["Web", "Mobile", "AI"],
  },
  {
    id: "2",
    name: "DevClub Downtown",
    slug: "devclub-downtown",
    description: "Weekly meetups, hack nights, and open-source sprints for all levels.",
    location: "Downtown Community Hub, NY",
    tags: ["Open Source", "Hack Nights"],
  },
  {
    id: "3",
    name: "Cloud & AI Society",
    slug: "cloud-ai-society",
    description: "Hands-on workshops on cloud-native, ML, and serverless architectures.",
    location: "Tech Park, TX",
    tags: ["Cloud", "ML", "Serverless"],
  },
];
