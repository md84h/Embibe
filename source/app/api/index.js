import axios from 'axios';
class Api {
  static get(route, header) {
      return new Promise((resolve, reject) => {
          return axios.get(route).then((data)=>{
              resolve(data);
          }).catch((err) => {
              reject(err);
          });
      });
  }
}
export default Api
