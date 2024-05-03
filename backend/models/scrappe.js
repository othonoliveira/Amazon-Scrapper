const axios = require("axios");

module.exports = async (keyword) => {
  try {
    const { data: html } = await axios.get(`https://www.amazon.com.br/s?crid=36QNR0DBY6M7J&k=${keyword}&__mk_pt_BR`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36'
      },
    });

    return html;

  } catch (error) {
    throw error;
  }


}