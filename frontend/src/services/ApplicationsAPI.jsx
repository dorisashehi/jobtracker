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

const getApplicationById = async (appId) => {
  try {
    const data = await fetch(`http://localhost:3000/api/application/${appId}`);
    const results = await data.json();
    return results;
  } catch (error) {
    return error;
  }
};

const updateApplById = async (appId, options) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/application/update/${appId}`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export default {
  getApplByUser,
  getApplicationById,
  updateApplById,
};
