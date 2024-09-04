const getCategoryClass = (category) => {
  switch (category) {
    case "Technology":
      return "bg-blue-500";
    case "Health":
      return "bg-green-500";
    case "Education":
      return "bg-yellow-500";
    case "Lifestyle":
      return "bg-purple-500";
    case "Travel":
      return "bg-orange-500";
    default:
      return "bg-red-500";
  }
};

export default getCategoryClass;
