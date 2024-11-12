const trainingProgramCreateFakeData = [
    {
      name: "Project A",
      status: "active",
      id: generateRandomString(6),
      duration: "7 days (14 hours)",
      author: "John Doe"
    },
    {
      name: "Project B",
      status: "deactive",
      id: generateRandomString(6),
      duration: "10 days (20 hours)",
      author: "Jane Smith"
    },
    {
      name: "Project C",
      status: "draft",
      id: generateRandomString(6),
      duration: "5 days (10 hours)",
      author: "Alice Johnson"
    },
    {
      name: "Project D",
      status: "active",
      id: generateRandomString(6),
      duration: "3 days (6 hours)",
      author: "Bob Brown"
    },
    {
      name: "Project E",
      status: "deactive",
      id: generateRandomString(6),
      duration: "12 days (24 hours)",
      author: "Chris Lee"
    },
    {
      name: "Project F",
      status: "draft",
      id: generateRandomString(6),
      duration: "8 days (16 hours)",
      author: "David Wilson"
    },
    {
      name: "Project G",
      status: "active",
      id: generateRandomString(6),
      duration: "6 days (12 hours)",
      author: "Emma Garcia"
    },
    {
      name: "Project H",
      status: "deactive",
      id: generateRandomString(6),
      duration: "9 days (18 hours)",
      author: "Frank Martinez"
    },
    {
      name: "Project I",
      status: "draft",
      id: generateRandomString(6),
      duration: "4 days (8 hours)",
      author: "Grace Robinson"
    },
    {
      name: "Project J",
      status: "active",
      id: generateRandomString(6),
      duration: "11 days (22 hours)",
      author: "Henry Young"
    }
  ];
  
  function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  
  export default trainingProgramCreateFakeData;
  