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

const setUserLoggedOut = async (options) => {
  try {
    const response = await fetch(
      "http://localhost:3000/auth/user/logout",
      options
    );
    return response;
  } catch (error) {
    return error;
  }
};

const setUserLoggIn = async (options) => {
  try {
    const response = await fetch(
      "http://localhost:3000/auth/users/login",
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

const signUpUser = async (options) => {
  try {
    const response = await fetch(
      "http://localhost:3000/auth/users/signup",
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export default {
  getLoggedInUser,
  setUserLoggedOut,
  setUserLoggIn,
  signUpUser,
};
