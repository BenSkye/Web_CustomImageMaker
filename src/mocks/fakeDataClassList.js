function generateRandomClassCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  return code;
}

function generateRandomAttendee() {
  const attendees = [
    "Fresher",
    "Online fee-fresher",
    "Intern",
    "Offline fee-fresher",
  ];
  const randomIndex = Math.floor(Math.random() * attendees.length);
  return attendees[randomIndex];
}

function generateRandomLocation() {
  const locations = ["Ho Chi Minh", "Ha Noi", "Can Tho", "Quy Nhon"];
  const randomIndex = Math.floor(Math.random() * locations.length);
  return locations[randomIndex];
}

export function generateFakeData(numClasses) {
  const fakeData = [];
  for (let i = 0; i < numClasses; i++) {
    const classCode = generateRandomClassCode();
    const createdBy = `User ${i + 1}`;
    const duration = Math.floor(Math.random() * 6) + 1;
    const attendee = generateRandomAttendee();
    const location = generateRandomLocation();
    const fsu = Math.floor(Math.random() * 100);
    const classObj = {
      class: `Class ${i + 1}`,
      classCode,
      createdBy,
      duration,
      attendee,
      location,
      fsu,
    };
    fakeData.push(classObj);
  }
  return fakeData;
}

export const colourOptions = [
  { value: "ocean", label: "Ocean" },
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" },
  { value: "yellow", label: "Yellow" },
  { value: "green", label: "Green" },
  { value: "forest", label: "Forest" },
  { value: "slate", label: "Slate" },
  { value: "silver", label: "Silver" },
];
