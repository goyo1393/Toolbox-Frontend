import axios from "axios";

const setRequest = async (url, method = 'GET', payload) => {
    try {
     const { data } = await axios[method.toLowerCase()](
         `${process.env.REACT_APP_TOOLBOX_API_URL}${url}`,
         payload
       );
       return data;
    } catch (error) {
         if(error.response.data)
             throw new Error(error.response.data.message);
 
         throw new Error(error.message);
    }
   };
 
   export default setRequest;