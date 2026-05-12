import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const domesticAnimals = defineEventHandler((event) => {
  const domesticAnimals = {
    domesticAnimals: [
      {
        id: "1",
        breed: "Golden Retriever",
        categoryId: "1",
        description: "A friendly and energetic dog breed, well known for its loyalty and gentle temperament with families and children.",
        lifeExpectancy: "10-12 years",
        weight: "25-34 kg",
        height: "55-61 cm",
        behaviours: "Playful, friendly, reliable, trustworthy and kind",
        commonDisease: "Hip dysplasia, elbow dysplasia, cancer",
        countryOrigin: "Scotland, United Kingdom",
        history: "Bred in the mid-19th century by Lord Tweedmouth in Scotland, originally developed as a hunting dog to retrieve waterfowl.",
        image: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Golden_Retriever_Dukedestiny01_drvd.jpg"
      },
      {
        id: "2",
        breed: "Siamese",
        categoryId: "2",
        description: "One of the oldest and most recognizable cat breeds, known for its striking appearance and vocal personality.",
        lifeExpectancy: "12-15 years",
        weight: "3-5 kg",
        height: "22-25 cm",
        behaviours: "Affectionate, social, vocal, intelligent and curious",
        commonDisease: "Respiratory issues, dental disease, heart conditions",
        countryOrigin: "Thailand",
        history: "Originating from Thailand (formerly Siam), Siamese cats appear in ancient manuscripts dating back to the 14th century.",
        image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg"
      },
      {
        id: "3",
        breed: "Holland Lop",
        categoryId: "3",
        description: "A small rabbit breed with distinctive floppy ears, popular as a pet for its calm and gentle nature.",
        lifeExpectancy: "7-10 years",
        weight: "1.5-2 kg",
        height: "20-25 cm",
        behaviours: "Gentle, calm, curious, sociable and affectionate",
        commonDisease: "Dental malocclusion, GI stasis, ear infections",
        countryOrigin: "Netherlands",
        history: "Developed in the 1950s by Dutch breeder Adriann de Cock by crossing French Lops with Netherlandish Dwarf rabbits.",
        image: "https://www.ohiohollandlops.com/uploads/5/0/2/8/50280945/2020-dec-3months-kali-1_orig.jpg"
      },
      {
        id: "4",
        breed: "French Bulldog",
        categoryId: "1",
        description: "A compact and muscular dog breed with a friendly and adaptable personality, ideal for city living.",
        lifeExpectancy: "10-12 years",
        weight: "8-13 kg",
        height: "27-35 cm",
        behaviours: "Adaptable, playful, smart, affectionate and alert",
        commonDisease: "Brachycephalic syndrome, hip dysplasia, skin allergies",
        countryOrigin: "France",
        history: "Descended from English Bulldogs brought to France by lace workers in the 1800s, where they were crossbred with local ratters.",
        image: "https://www.westminsterkennelclub.org/wp-content/uploads/2025/07/french_bulldog-scaled-1.jpg"
      }
    ]
  };
  return domesticAnimals;
});

export { domesticAnimals as default };
//# sourceMappingURL=domesticAnimals.mjs.map
