export const getExpirationDays = (expirationDate: Date) => {
  let expDate = new Date(expirationDate);
  let today = new Date();

  let timeDifference = expDate.getTime() - today.getTime();
  let daysToExp = Math.ceil(timeDifference / (1000 * 3600 * 24));

  return daysToExp;
};

export const getColorBasedOnExpiration = (expDays: number) => {
  let color = "#333";

  if (expDays < 5 && expDays > 2) {
    color = "#F07D29";
  } else if (expDays < 3 && expDays > 0) {
    color = "#F04A16";
  } else if (expDays < 1) {
    color = "red";
  } else {
    color = "white";
  }

  return color;
};

export const formatExpirationString = (expString: string) => {
  let stringArr = expString.split(" ");

  if (stringArr[stringArr.length - 1] === "måneder") {
    stringArr.pop();
    stringArr.push("mnd");
  }

  return stringArr.join(" ");
};
