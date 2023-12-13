import Pop from "../../utils/Pop";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react"
import { mdiRefreshCircle } from '@mdi/js';
import Icon from "@mdi/react";
import { AppState } from "../../AppState";
import { quotesService } from "../../services/Widgets/QuotesService.js";
import "../../assets/scss/widget/QuoteWidget.scss"

function QuoteWidget() {
  const [quote, setQuote] = useState({});

  useEffect(() => { getQuote() }, []);

  async function getQuote() {
    try {
      await quotesService.getQuote();
      setQuote(AppState.widgets.quote);
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
          { quote.tags?.map(tag => {
            return ( <p key={tag} className="blueBlur border py-1 px-2 mx-1 rounded-pill">{ tag }</p> ) })}
        </div>
      </div>
      <button className="position-absolute refreshQuote btn p-0 d-flex" type="button" onClick={getQuote}>
        <Icon path={mdiRefreshCircle} size={1} />
      </button>
    </div>
  )
}
    
export default observer(QuoteWidget);