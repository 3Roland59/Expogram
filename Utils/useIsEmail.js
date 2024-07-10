const useIsEmail = () => {
    function isEmail(str) {
      var pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.com/;
      return pattern.test(str);
    }
  
    return {
      isEmail
    }
  }
  
  export default useIsEmail;