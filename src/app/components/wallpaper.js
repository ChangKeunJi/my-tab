import wallOne from "../../assets/wall-1.jpg";
import wallTwo from "../../assets/wall-2.jpg";
import wallThree from "../../assets/wall-3.jpg";
import wallFour from "../../assets/wall-4.jpg";

class Wallpaper {
  constructor() {
    this.now = new Date().getHours();

    this.imageList = [wallOne, wallTwo, wallThree, wallFour];
  }

  renderImage() {
    // Get a random image in the array
    let image = this.imageList[
      Math.floor(Math.random() * this.imageList.length)
    ];

    return (document.body.style.backgroundImage = `url(${image})`);
  }
}

export const wallpaper = new Wallpaper();
