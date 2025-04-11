import apiClient, { CanceledError } from "./api-client";
import { apiKey } from "./api-key";

class WeatherService {
    city: string;

    constructor (city: string) {
        this.city = city;
    }
    getData() {
        const controller = new AbortController();
        
 const request = apiClient
      .get(`/weather?q=${this.city}&units=metric&appid=${apiKey}`, {
        signal: controller.signal,
      })

    return {request, cancel: () => controller.abort()}
    }
}

const create = (city: string) => new WeatherService(city);

export default create;

export {CanceledError};
