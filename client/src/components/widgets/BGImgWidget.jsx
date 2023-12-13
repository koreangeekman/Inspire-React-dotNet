import React, { useEffect, useState } from "react";
import Pop from "../../utils/Pop";
import { AppState } from "../../AppState";
import "../../assets/scss/widget/BGImgWidget.scss"
import { bgImageService } from "../../services/Widgets/BGImageService.js";
import Icon from "@mdi/react";
import { mdiImageRefresh } from '@mdi/js';
import { observer } from "mobx-react";
import { logger } from "../../utils/Logger.js";

function BGImgWidget() {
  const [bgImg, setBGImg] = useState({})

  useEffect(() => { getBGImg() }, []);

  async function getBGImg() {
    try {
      await bgImageService.getBGImg();
      setBGImg(AppState.widgets.bgImg)
      logger.log('bgImg', bgImg);
      document.body.style.backgroundImage = `url('${AppState.widgets.bgImg.largeImgUrl}')`
    }
    catch (error) { Pop.error(error); }
  }

  return (
    <>
    <button title="Change background" onClick={getBGImg} type="button"
    className="m-1 btn text-primary lighten-30 selectable text-uppercase showInfo">
    <Icon path={mdiImageRefresh} title="Change background image" size={1.35} />
    </button>
    <div className="BGImgControls hide d-flex justify-content-start position-absolute mx-3 p-0">
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
        </div>
    </>
      
  )
}

export default observer(BGImgWidget);