export type Blog = {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  author: string
  image: string
}

export const articles: Blog[] = [
  {
    id: '1',
    title: 'How to Keep Your Pet Healthy',
    excerpt: 'Practical tips on nutrition, exercise, and preventive care for pets.',
    content: `Keeping your pet healthy requires a combination of proper nutrition, regular exercise, and routine veterinary care.

Tips:
- Provide a balanced diet appropriate for the species and age.
- Ensure daily exercise suited to the pet\'s size and breed.
- Keep vaccinations and parasite prevention up to date.

Every pet is unique; consult a veterinarian to adapt these recommendations.`,
    date: '2026-05-01',
    author: 'Petly Team',
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
  },
  {
    id: '2',
    title: 'Signs Your Pet Is Sick',
    excerpt: 'Learn to recognize when your pet needs urgent veterinary attention.',
    content: `Not all illnesses are obvious. Warning signs include:

- Prolonged loss of appetite.
- Lethargy or sudden behavioral changes.
- Difficulty breathing or persistent coughing.
- Vomiting or diarrhea that does not resolve within 24 hours.

If you notice any of these signs, contact your veterinarian.`,
    date: '2026-04-20',
    author: 'Dr. Ana López',
    image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987',
  },
  {
    id: '3',
    title: 'Basic Training for Better Coexistence',
    excerpt: 'Simple techniques to teach basic commands and improve coexistence with your pet.',
    content: `Training improves the relationship between pet and owner.

Techniques:
- Use positive reinforcement with treats and praise.
- Keep training sessions short and consistent.
- Socialize puppies early to build confidence.

Patience and consistency are key to success.`,
    date: '2026-03-15',
    author: 'Petly Training',
    image: 'https://images.unsplash.com/photo-1507149833265-60c372daea22',
  },
]
