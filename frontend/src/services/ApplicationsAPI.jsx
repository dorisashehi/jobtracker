const getApplByUser = async (userId) => {
  try {
    const data = await fetch(
      `http://localhost:3000/api/applications/${userId}`
    );
    const results = await data.json();
    return results;
  } catch (error) {
    return error;
  }
};

export default {
  getApplByUser,
};
