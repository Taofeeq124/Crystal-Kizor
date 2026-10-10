/**
 * All copy and destinations for the site live here, so content can be
 * updated without touching layout code.
 *
 * Links set to `null` have not been supplied or verified yet. They are
 * rendered with an honest fallback (an enquiry via the contact channel)
 * instead of a dead link. See README → "Content still needed".
 */

export const social = {
  instagram: 'https://www.instagram.com/crystalkizor/',
  linkedin: 'https://www.linkedin.com/in/crystal-kizor/',
  youtube: 'https://www.youtube.com/@crystalkizor',
};

export const media = {
  tedx: {
    id: 'd44LY7rv_4k',
    url: 'https://www.youtube.com/watch?v=d44LY7rv_4k',
    title: 'Indigenous Architecture and Identity',
    event: 'TEDxPortHarcourt',
  },
  reuters:
    'https://www.reutersconnect.com/item/nigeria-a-nigerian-eye-hospital-redefines-climate-smart-design/dGFnOnJldXRlcnMuY29tLDIwMjY6bmV3c21sX09XU0hCQzExODg5MTI',
};

/** TODO(client): add a verified enquiry email. Until then enquiries go to LinkedIn. */
export const contactEmail = null;

export const enquiry = contactEmail
  ? { href: `mailto:${contactEmail}`, label: contactEmail, external: false }
  : { href: social.linkedin, label: 'Message on LinkedIn', external: true };

export const nav = [
  { href: '#philosophy', label: 'Philosophy' },
  { href: '#ecosystem', label: 'Ecosystem' },
  { href: '#work', label: 'Work' },
  { href: '#talks', label: 'Talks' },
  { href: '#contact', label: 'Contact' },
];

export const hero = {
  kicker: 'Crystal Kizor',
  roles: ['Architect', 'Interior designer', 'Lead Principal, Studio COKA'],
  headline: ['Architecture', 'that knows', 'where it stands.'],
  intro:
    'Crystal Kizor designs climate-responsive spaces rooted in African materials, culture and the everyday lives of the people who use them — and builds the platforms that help others do the same.',
  meta: [
    { label: 'Practice', value: 'Studio COKA' },
    { label: 'On stage', value: 'TEDxPortHarcourt' },
    { label: 'Focus', value: 'Climate · Culture · People' },
  ],
};

export const philosophy = {
  statement:
    'A building is never neutral. It either works with its climate, its culture and its people — or it quietly works against them.',
  body: [
    'Crystal’s interest in sustainable architecture began at nineteen, and it has shaped everything since: how a building meets the sun, which materials it is made from, and who is in the room when it is designed. Her path runs through Nigeria’s first fully off-grid hospital — a reminder that climate-responsive design is not an aesthetic add-on, but a practical answer to real constraints.',
    'Today she leads Studio COKA while teaching, researching, writing and speaking about what African homes and cities could become when they stop borrowing their identity from somewhere else.',
  ],
  principles: [
    {
      title: 'Climate first',
      text: 'Shade, airflow, orientation and daylight come before ornament. Comfort that does not depend on a generator is a design decision.',
    },
    {
      title: 'Culture as material',
      text: 'Indigenous materials, crafts and spatial traditions are not motifs to quote. They are a living toolkit for building today.',
    },
    {
      title: 'People at the centre',
      text: 'The measure of a space is how it changes the day of the person inside it — the family, the student, the patient.',
    },
  ],
};

/**
 * The ecosystem, ordered by relationship to the core practice.
 * `image` is optional — initiatives without supplied imagery use a
 * typographic mark rather than borrowed photography.
 * TODO(client): supply verified URLs (and logos, if available) for each `url: null`.
 */
export const ecosystem = [
  {
    id: 'studio-coka',
    strand: 'Build',
    name: 'Studio COKA',
    role: 'Lead Principal',
    mark: 'COKA',
    text: 'An architecture, interior design and construction practice creating climate-responsive buildings, designed and delivered around how people actually live in them.',
    cta: 'Visit Studio COKA',
    url: null,
    image: 'home-facade',
    core: true,
  },
  {
    id: 'elevated',
    strand: 'Make',
    name: 'ELEvated',
    mark: 'EL',
    text: 'Contemporary furniture and product design rooted in African contexts, materials and ideas — the same convictions, at the scale of the hand.',
    cta: 'Explore ELEvated',
    url: null,
  },
  {
    id: 'tea',
    strand: 'Teach',
    name: 'The Effective Architect',
    short: 'TEA',
    abbr: 'TEA',
    mark: 'TEA',
    text: 'An architecture education and media platform helping architects and built-environment professionals learn, grow and build better careers.',
    cta: 'Learn with TEA',
    url: null,
  },
  {
    id: 'ako',
    strand: 'Teach',
    name: 'AKO Alliance',
    mark: 'AKO',
    text: 'An initiative widening access to education and opportunity for children and young people.',
    cta: 'Support AKO Alliance',
    url: null,
  },
  {
    id: 'speaking',
    strand: 'Speak',
    name: 'Speaking Engagements',
    mark: 'Talks',
    text: 'Talks and conversations on architecture, sustainability, African cities, design, entrepreneurship and the built environment.',
    cta: 'Invite Crystal to speak',
    url: '#talks',
    image: 'portrait-confident',
  },
  {
    id: 'personal',
    strand: 'Think',
    name: 'Personal Work',
    role: 'Crystal Kizor',
    mark: 'CK',
    text: 'Research, writing, ideas and media published under her own name — where the questions behind the work are explored in public.',
    cta: 'Watch on YouTube',
    url: social.youtube,
    image: 'portrait-podcast',
  },
  {
    id: 'alive-and-free',
    strand: 'Belong',
    name: 'Alive and Free',
    mark: 'A&F',
    text: 'A Christian youth movement focused on truth, healing, freedom, identity, purpose and life in Christ — a separate commitment to young people, held on its own terms.',
    cta: 'Discover Alive and Free',
    url: null,
  },
];

export const work = {
  built: {
    label: 'Built',
    title: 'A family home shaped around shade',
    credit: 'Studio COKA · Residential · Completed',
    text: 'Photographs from a completed residence by Studio COKA. Cantilevered overhangs shade the terraces, a mature tree canopies the forecourt and new planting is already growing in the garden. Inside, timber, layered light and tall openings keep rooms calm and bright.',
    images: [
      { key: 'home-front', caption: 'Forecourt under the tree canopy' },
      { key: 'home-cantilever', caption: 'A cantilevered overhang shading the terrace' },
      { key: 'home-lounge', caption: 'Timber-screened lounge' },
      { key: 'home-stair', caption: 'Looking up through the stair void' },
      { key: 'home-sitting', caption: 'Family sitting room in soft, filtered daylight' },
    ],
  },
  concepts: {
    label: 'In development',
    title: 'Studies in earth, timber and filtered light',
    text: 'Concept visualisations exploring how earthen walls, timber roofs, courtyards and screened light could shape civic and domestic space.',
    projects: [
      {
        id: 'community',
        name: 'Community centre around a tree',
        type: 'Concept · Civic',
        text: 'A circular earthen building gathered around a single great tree, with perforated brick walls that let air move through and light fall in patterns.',
        images: [
          { key: 'cc-courtyard', caption: 'The courtyard, open to the tree' },
          { key: 'cc-exterior', caption: 'Approach across the public ground' },
          { key: 'cc-gallery', caption: 'Gallery behind a perforated brick wall' },
        ],
      },
      {
        id: 'residence',
        name: 'Earth and timber residence',
        type: 'Concept · Residential',
        text: 'Earth-toned masonry, deep timber roofs and gardens drawn right into the rooms, so that shade and greenery do the work of cooling.',
        images: [
          { key: 'earth-exterior', caption: 'Garden elevation' },
          { key: 'earth-bedroom', caption: 'Bedroom opening onto a planted court' },
          { key: 'earth-bath', caption: 'Bathroom with a private garden' },
        ],
      },
    ],
  },
};

export const talks = {
  intro:
    'At TEDxPortHarcourt, Crystal took on a question at the heart of her practice: what happens to identity when the places we build stop drawing on indigenous knowledge, materials and ways of living?',
  topics: [
    'Indigenous architecture & identity',
    'Climate-responsive design',
    'African cities',
    'Design entrepreneurship',
    'Careers in the built environment',
  ],
  channels: [
    {
      source: 'Reuters Connect',
      title: 'A Nigerian eye hospital redefines climate-smart design',
      action: 'Read the report',
      href: media.reuters,
    },
    {
      source: 'YouTube',
      title: 'Talks, conversations and ideas on the built environment',
      action: 'Watch the channel',
      href: social.youtube,
    },
    {
      source: 'Instagram',
      title: 'Projects, process and life in the studio',
      action: 'Follow @crystalkizor',
      href: social.instagram,
    },
    {
      source: 'LinkedIn',
      title: 'Professional updates, writing and collaborations',
      action: 'Connect',
      href: social.linkedin,
    },
  ],
};

/** Intent-led routes for the closing section. `to` refers to an ecosystem id or a direct link. */
export const pathways = [
  { intent: 'Design or build a space', to: 'studio-coka' },
  { intent: 'Furniture and objects', to: 'elevated' },
  { intent: 'Grow as an architect', to: 'tea' },
  { intent: 'Support young people’s education', to: 'ako' },
  { intent: 'Invite Crystal to speak', to: 'enquiry', label: 'Speaking enquiry' },
  { intent: 'Follow the ideas', href: social.instagram, label: 'Instagram' },
  { intent: 'Make a professional enquiry', to: 'enquiry', label: 'Enquiries' },
];
