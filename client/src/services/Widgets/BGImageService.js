import { bcwSandbox } from "../AxiosService.js";
import { AppState } from "../../AppState.js";
import { BGImg } from "../../models/Widget/BGImg.js";

// function _saveBGs() {
//   localStorage.setItem('backgrounds', AppState.backgrounds);
//   return
// }

class BGImageService {

  // async getBGImgsFromLocal() {
  //   AppState.backgrounds = localStorage.getItem('backgrounds')
  //   await this.getBGImg();
  // }

  async getBGImg() {
    const res = await bcwSandbox.get('api/images');
    const newBGImg = new BGImg(res.data);
    AppState.widgets.bgImg = newBGImg;
    // AppState.backgrounds.push(newBGImg);
    // _saveBGs();
  }

}

export const bgImageService = new BGImageService();