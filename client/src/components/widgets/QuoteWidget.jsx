import React from "react"
import Pop from "../../utils/Pop";
import { AppState } from "../../AppState";

export default function QuoteWidget() {
  const quote = AppState.widgets.quote 
  async function _getQuote() {
    try { await quotesService.getQuote(); }
    catch (error) { Pop.error(error); }
  }
  function refresh() { _getQuote() }

  
  _getQuote();
  
  return (
    <div className="position-relative">
      <div className="d-flex flex-column align-items-center text-center text-white d-block" id="quote">
        <div className="blueBlur quoteContent rounded-pill border px-3 py-2">{ quote.content }</div>
        <div className="quoteInfo d-flex flex-wrap justify-content-end align-items-center my-2 px-2 py-1">
          <p className="blueBlur border mx-1 py-1 px-2">{ quote.author }</p>
          <p className="blueBlur px-2 rounded-circle"> • </p>
          <p v-for="tag in quote.tags" key="tag" className="blueBlur border py-1 px-2 mx-1 rounded-pill">{ tag }</p>
        </div>
      </div>
      <i className="position-absolute fs-4 refreshQuote mdi mdi-refresh-circle" type="button" onClick={refresh()}></i>
    </div>
    )}