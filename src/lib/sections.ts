export interface SectionRef {
  id: string;
  num: string;
  nav: string;
}

export const SECTIONS: SectionRef[] = [
  { id: "masthead", num: "00", nav: "Index" },
  { id: "practice", num: "01", nav: "Practice" },
  { id: "track-record", num: "02", nav: "Experience" },
  { id: "education", num: "03", nav: "Education" },
  { id: "work", num: "04", nav: "Work" },
  { id: "archive", num: "05", nav: "Archive" },
  { id: "missions", num: "06", nav: "Missions" },
  { id: "contact", num: "07", nav: "Contact" },
];
