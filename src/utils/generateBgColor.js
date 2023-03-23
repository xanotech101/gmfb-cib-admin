// function to generate background color using index in an array of colors and total array number

export const generateBgColor = (index) => {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-indigo-500',
    'bg-purple-500',
    'bg-pink-500'
  ];
  const colorIndex = index % colors.length;
  return colors[colorIndex];
};

export const getRandomColor = (name) => {
  const nameArray = name.split(' ');
  if (nameArray.length > 2) {
    nameArray.pop();
  }
  const nameString = nameArray.join('');
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-indigo-500',
    'bg-purple-500',
    'bg-pink-500'
  ];
  const colorIndex = nameString.length % colors.length;
  return colors[colorIndex];
};
