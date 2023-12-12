import React from "react";
import Pop from "../../utils/Pop";
import { AppState } from "../../AppState";
import "../../assets/scss/widget/BGImgWidget.scss"
import { bgImageService } from "../../services/Widgets/BGImageService";

export default function BGImgWidget() {
  const bgImg = AppState.widgets.bgImg;

  async function getBGImg() {
    try {
      await bgImageService.getBGImg();
      document.body.style.backgroundImage = `url('${AppState.widgets.bgImg.largeImgUrl}')`
    } catch (error) {
      Pop.error(error);
    }
  }

  if (AppState.widgets.bgImg == null) {
    getBGImg();
  }
  
  return (
    <div className="position-relative text-center blueBlur shadow BGImgCredit p-1 pb-2">
    <p className="mb-1 text-nowrap shadow">Background Image Credit & Controls</p>
    <div className="" id="BGImgCredit">
      <div className="d-flex justify-content-between shadow px-2">
        <p>Author:</p>
        <p>{ bgImg.author }</p>
      </div>
      <div className="d-flex justify-content-between shadow px-2">
        <p>Tags: </p>
        <p>{ bgImg.query }</p>
      </div>
      <div className="d-flex justify-content-between shadow px-2">
        <p className="me-2">Query: </p>
        <p className="pe-1 text-nowrap">{ bgImg.tags }</p>
      </div>
    </div>
  </div>
  )
}