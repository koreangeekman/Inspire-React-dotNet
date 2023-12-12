import Pop from "../../utils/Pop";
import React from "react"
import Icon from "@mdi/react";
import { mdiRefreshCircle } from '@mdi/js';
import { AppState } from "../../AppState";
import { quotesService } from "../../services/Widgets/QuotesService.js";
import "../../assets/scss/widget/QuoteWidget.scss"

export default function QuoteWidget() {
  let quote = AppState.widgets.quote;
  async function getQuote() {
    try {
      await quotesService.getQuote();
      quote = AppState.widgets.quote;
    }
    catch (error) { Pop.error(error); }
  }

  return (
    <div className="position-relative">
      <div className="d-flex flex-column align-items-center text-center text-white d-block" id="quote">
        <div className="blueBlur quoteContent rounded-pill border px-3 py-2">{ quote.content }</div>
        <div className="quoteInfo d-flex flex-wrap justify-content-end align-items-center my-2 px-2 py-1">
          <p className="blueBlur border mx-1 py-1 px-2">{ quote.author }</p>
          <p className="blueBlur px-2 rounded-circle"> • </p>
          {/* <p v-for="tag in quote.tags" key="tag" className="blueBlur border py-1 px-2 mx-1 rounded-pill">{ tag }</p> */}
        </div>
      </div>
      <div className="position-absolute refreshQuote" type="button" onClick={getQuote}>
        <Icon path={mdiRefreshCircle} size={1} />
      </div>
    </div>
    )}