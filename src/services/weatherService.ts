import apiClient, { CanceledError } from "./api-client";
import { apiKey } from "./api-key";

class WeatherService {
    city: string;

    constructor (city: string) {
        this.city = city;
    }
    getData() {
        const controller = new AbortController();
        // forecast?q=london&appid=d4336ae6db8eb58d6605b1f0f34032f5    
 const request = apiClient
      .get(`/forecast?q=${this.city}&units=metric&appid=${apiKey}`, {
        signal: controller.signal,
      })

    return {request, cancel: () => controller.abort()}
    }
}

const create = (city: string) => new WeatherService(city);

export default create;

export {CanceledError};
