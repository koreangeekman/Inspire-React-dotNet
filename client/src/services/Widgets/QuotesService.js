import { bcwSandbox } from "../AxiosService.js";
import { AppState } from "../../AppState.js";
import { Quote } from "../../models/Widget/Quote.js";

class QuotesService {

  async getQuote() {
    const res = await bcwSandbox.get('api/quotes');
    AppState.widgets.quote = new Quote(res.data);
  }

  clearData() {
    AppState.widgets.quote = {};
  }

}

export const quotesService = new QuotesService();