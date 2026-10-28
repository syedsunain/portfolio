// ============================================================
// 1) Paste your Supabase values between the quotes (straight quotes only)
// ============================================================
window.CFG = { supabaseUrl: "https://qfccnlzrkbkulujlsgkc.supabase.co", supabaseKey: "sb_publishable_Q7dC1Vz0rSjToyHE2Ue1EA_VtuG3Ynd" };

// ============================================================
// 2) Sections. type: 'timeline' | 'bars' | 'cards'
//    fields: [key, label] pairs, used by the admin panel
// ============================================================
window.SECTIONS = [
  { key:'education',      title:'Education',                type:'timeline', fields:[['title','Degree / Course'],['org','Institution'],['period','Period'],['desc','Details']] },
  { key:'experience',     title:'Experience & Internships', type:'timeline', fields:[['title','Role'],['org','Organisation'],['period','Period'],['desc','Details']] },
  { key:'skills',         title:'Skills',                   type:'bars',     fields:[['title','Skill'],['level','Level (0-100)']] },
  { key:'projects',       title:'Projects',                 type:'cards',    fields:[['title','Title'],['desc','Description'],['link','Link (https://...)']] },
  { key:'certifications', title:'Certifications & Achievements', type:'cards', fields:[['title','Title'],['desc','Details'],['link','Certificate link (optional)']] }
];

// ============================================================
// 3) Default content (shown until you save from the admin panel)
// ============================================================
const _ph = '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#00e5ff"/><stop offset="1" stop-color="#a855f7"/></linearGradient></defs><rect width="400" height="400" fill="#0d1230"/><circle cx="200" cy="155" r="70" fill="url(#g)"/><ellipse cx="200" cy="370" rx="130" ry="100" fill="url(#g)"/></svg>';

window.DEFAULT = {
  name: 'Your Name',
  role: 'Developer & Designer',
  tagline: 'I build futuristic things for the web.',
  photo: 'data:image/svg+xml,' + encodeURIComponent(_ph),
  resume: '',
  about: 'Write a short introduction about yourself here.',
  email: 'you@example.com',
  location: '',
  socials: 'GitHub|https://github.com\nLinkedIn|https://linkedin.com',
  education: [
    { title:'Bachelor of Technology', org:'Your University', period:'2021 - 2025', desc:'Add details here.' }
  ],
  experience: [],
  skills: [
    { title:'HTML / CSS', level:90 },
    { title:'JavaScript', level:80 },
    { title:'Python', level:70 }
  ],
  projects: [
    { title:'Project One', desc:'A short description of the project.', link:'https://github.com' }
  ],
  certifications: []
};

// ============================================================
// 4) Cleans loaded data (also converts old comma-separated skills)
// ============================================================
window.norm = d => {
  const o = { ...d };
  if (typeof o.skills === 'string')
    o.skills = o.skills.split(',').map(s => s.trim()).filter(Boolean).map(t => ({ title:t, level:80 }));
  SECTIONS.forEach(s => { if (!Array.isArray(o[s.key])) o[s.key] = []; });
  ['name','role','tagline','about','resume','photo','email','location','socials']
    .forEach(k => { if (o[k] == null) o[k] = DEFAULT[k]; });
  return o;
};
