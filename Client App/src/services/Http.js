class Http {
  static Get = async (url, data) => {
    if (data) {
      typeof data === "string"
        ? (url += data)
        : (url += `?${Object.keys(data)
            .map((key) => `${key}=${data[key]}`)
            .join("&")}`);
    }
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) throw new Error(response.statusText);
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw error;
    }
  };

  static Post = async (url, data) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  static Put = async (url, data) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
}
export default Http;
