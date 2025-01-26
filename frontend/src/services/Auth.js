const getLoggedInUser = async () => {
  try {
    const response = await fetch(`http://localhost:3000/auth/login/success`, {
      credentials: "include",
    });
    console.log("res", response);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export default {
  getLoggedInUser,
};
