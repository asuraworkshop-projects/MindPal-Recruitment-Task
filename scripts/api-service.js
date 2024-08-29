export class ApiService {
  // Fetching data in JSON format
  static async fetchData(endpoint) {
    try {
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  static async postData(endpoint, data) {
    try {
      const urlEncodedData = new URLSearchParams(data).toString();
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: urlEncodedData
      });

      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
        console.error('Fetch error:', error);
    }
  }

  static async putData(endpoint, data) {
    try {
      const jsonData = JSON.stringify(data);
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: jsonData
      });

      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
        console.error('Fetch error:', error);
    }
  }

}
