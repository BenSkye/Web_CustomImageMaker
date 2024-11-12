const outputCodes = [
  'H4SD',
  'K6SD',
  'H6SD',
  'A8BD',
  'L2DS',
  'R9PT',
  'E1DF',
  'P7YU',
  'Z3XC',
  'Q0PL',
];
const statusValues = ['Inactive', 'Active', 'Draft'];

const program = [
  'C# Programing Language',
  'C# basic program',
  '.NET basic program',
  'Python basic program',
  'DevOps Foundation',
  'Azure DevOps Foundation',
  'AWS DevOps Foundation',
  'Fullstack Java Web Developer',
  'Fullstack .NET Web Developer',
  'ISTQB Foundation',
];

const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

const getRandomOutputCodes = () => {
  const numberOfCodes = Math.floor(Math.random() * 3) + 1; // Randomly choose 1 to 3 output codes
  const selectedCodes = Array.from({ length: numberOfCodes }, () => getRandomElement(outputCodes));
  return selectedCodes.join(', ');
};

export const mockData = Array.from({ length: 20 }, (_, index) => ({
  id: `${index + 1}`,
  name: getRandomElement(program),
  code: getRandomElement(outputCodes),
  createdOn: new Date().toLocaleDateString(),
  createdBy: `User ${index + 1}`,
  duration: `${Math.floor(Math.random() * 4) + 1} weeks`,
  output: getRandomOutputCodes(),
  status: getRandomElement(statusValues),
}));
