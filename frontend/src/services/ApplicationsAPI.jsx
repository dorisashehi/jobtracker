const getApplByUser = async (userId) => {
  try {
    const data = await fetch(`/api/applications/${userId}`);
    const results = await data.json();
    return results;
  } catch (error) {
    return error;
  }
};

const getApplicationById = async (appId) => {
  try {
    const data = await fetch(`/api/application/${appId}`);
    const results = await data.json();
    return results;
  } catch (error) {
    return error;
  }
};

const updateApplById = async (appId, options) => {
  try {
    const response = await fetch(`/api/application/update/${appId}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

const deleteApplById = async (appId) => {
  try {
    const response = await fetch(`/api/application/delete/${appId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

const createApplication = async (options) => {
  try {
    const response = await fetch("/api/application/create", options);
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
  deleteApplById,
  createApplication,
};
