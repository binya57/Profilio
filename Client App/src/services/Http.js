class Http {
  static Get = async (url, data, options = {}) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, requestOptions);
      console.log(response.ok);

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  static Post = async (url, data, options) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, requestOptions);
      console.log(response.ok);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
}
export default Http;
