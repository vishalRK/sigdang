
interface User {
    avtar: string;
    username: string;
    email: string;
    userToken:string;
    // Add other user properties as needed
  }
  let users:User = {
    avtar: "",
    username: "",
    email: "",
    userToken:"",
  };
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedUserString = localStorage.getItem("user");
    const storedUser = storedUserString ? JSON.parse(storedUserString) : {};
    if(storedUser.email && storedUser.username && storedUser.avtar && storedUser.userToken)
    {

      users = {
        username: storedUser.username ,
        email: storedUser.email,
        avtar: storedUser.avtar,
        userToken:storedUser.userToken
        // Add other user properties as needed
      };
    }
  
  }
  
  export default users;