/**
 * validateUrl - A utility function to validate if the input URL is valid
 * 
 * @param {string} url 
 * @returns {boolean} 
 */
const validateUrl = (url) => {
    const regex = /^(https?:\/\/)?([a-z0-9]+([-\w]*[a-z0-9])*\.)+[a-z]{2,6}(\/[-\w]*)*\/?$/i;
    return regex.test(url);
  };
  
  module.exports = { validateUrl };
  