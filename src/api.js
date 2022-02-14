import axios from "axios";

const JWTToken = () => {
  return {
    Authorization: `JWT ${localStorage.getItem('token')}` //the token is a variable which holds the token
  }
}

const login = async (payload) =>  {
    try {
        //응답 성공
        const response = await axios.post(
            `${process.env.REACT_APP_API_END_POINT}/api/token`, 
            payload,
        )
        return response;
      } catch (error) {
        //응답 실패
        console.error(error);
        alert(error)
      }
    
}

const verifyToken = async (token) =>  {
  try {
      //응답 성공
      const response = await axios.post(
          `${process.env.REACT_APP_API_END_POINT}/api/token/verify`, 
          {token: token},
      )
      return response;
    } catch (error) {
      //응답 실패
      console.error(error);
      return error.response;
    }
}

const refreshToken = async (refresh) =>  {
  try {
      //응답 성공
      const response = await axios.post(
          `${process.env.REACT_APP_API_END_POINT}/api/token/refresh`, 
          {refresh: refresh},
      )
      return response;
    } catch (error) {
      //응답 실패
      console.error(error);
      return error.response;
    }
}

const addCategory = async (payload) =>  {
  try {
      //응답 성공
      const response = await axios.put(
          `${process.env.REACT_APP_API_END_POINT}/api/category/add`, 
          payload,
          {
            headers: JWTToken()
          }
      )
      return response;
    } catch (error) {
      //응답 실패
      console.error(error);
      return error.response;
    }
}


const getCategories = async () =>  {
  try {
      //응답 성공
      const response = await axios.get(
          `${process.env.REACT_APP_API_END_POINT}/api/categories`, 
          {
            headers: JWTToken()
          }
      )
      return response;
    } catch (error) {
      //응답 실패
      console.error(error);
      return error.response;
    }
}


const getSummery = async () =>  {
  try {
      //응답 성공
      const response = await axios.get(
          `${process.env.REACT_APP_API_END_POINT}/api/summery`, 
          {
            headers: JWTToken()
          }
      )
      return response;
    } catch (error) {
      //응답 실패
      console.error(error);
      return error.response;
    }
}

const getTaskSummery = async () =>  {
  try {
      //응답 성공
      const response = await axios.get(
          `${process.env.REACT_APP_API_END_POINT}/api/summery/task`,
          {
            headers: JWTToken()
          }
      )
      return response;
    } catch (error) {
      //응답 실패
      console.error(error);
      return error.response;
    }
}

const getObservation = async () =>  {
  try {
      //응답 성공
      const response = await axios.get(
          `${process.env.REACT_APP_API_END_POINT}/api/summery/observation`,
          {
            headers: JWTToken()
          }
      )
      return response;
    } catch (error) {
      //응답 실패
      console.error(error);
      return error.response;
    }
}

const getAphorism = async () =>  {
  try {
      //응답 성공
      const response = await axios.get(
          `${process.env.REACT_APP_API_END_POINT}/api/aphorism`,
          {
            headers: JWTToken()
          }
      )
      return response;
    } catch (error) {
      //응답 실패
      console.error(error);
      return error.response;
    }
}

const getActiveTasks = async (page) =>  {
  try {
      //응답 성공
      const response = await axios.get(
          `${process.env.REACT_APP_API_END_POINT}/api/task/active?page=${page}`, 
          {
            headers: JWTToken()
          }
      )
      return response;
    } catch (error) {
      //응답 실패
      console.error(error);
      return error.response;
    }
}

const getDoneTasks = async (page) =>  {
  try {
      //응답 성공
      const response = await axios.get(
          `${process.env.REACT_APP_API_END_POINT}/api/task/done?page=${page}`, 
          {
            headers: JWTToken()
          }
      )
      return response;
    } catch (error) {
      //응답 실패
      console.error(error);
      return error.response;
    }
}

const updateTaskStatus = async (payload) =>  {
  try {
      //응답 성공
      const response = await axios.post(
          `${process.env.REACT_APP_API_END_POINT}/api/task/status`, 
          payload,
          {
            headers: JWTToken()
          }
      )
      return response;
    } catch (error) {
      //응답 실패
      console.error(error);
      return error.response;
    }
}

const addTask = async (payload) =>  {
  try {
      //응답 성공
      const response = await axios.put(
          `${process.env.REACT_APP_API_END_POINT}/api/task/add`, 
          payload,
          {
            headers: JWTToken()
          }
      )
      return response;
    } catch (error) {
      //응답 실패
      console.error(error);
      return error.response;
    }
}


const updateTask = async (payload) =>  {
  try {
      //응답 성공
      const response = await axios.post(
          `${process.env.REACT_APP_API_END_POINT}/api/task/update`, 
          payload,
          {
            headers: JWTToken()
          }
      )
      return response;
    } catch (error) {
      //응답 실패
      console.error(error);
      return error.response;
    }
}



export const ApiMap = {
    login: login,
    verifyToken: verifyToken,
    refreshToken:refreshToken,
    addCategory:addCategory,
    getCategories:getCategories,
    getSummery:getSummery,
    getObservation:getObservation,
    getAphorism:getAphorism,
    getTaskSummery:getTaskSummery,
    getActiveTasks:getActiveTasks,
    getDoneTasks:getDoneTasks,
    addTask:addTask,
    updateTaskStatus:updateTaskStatus,
    updateTask:updateTask
}