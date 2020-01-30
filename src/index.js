import { showTime } from "./app/components/clock";
import { displayWeather } from "./app/components/weather";
import { toggle } from "./app/utils/toggle";
import { getQuote } from "./app/components/quote";
import { crud } from "./app/utils/crud";
import { wallpaper } from "./app/components/wallpaper";
import "./main.scss";

window.addEventListener("DOMContentLoaded", () => {
  // Display Time by default
  showTime();
  // Display Weather by default
  displayWeather();
  // Get a new quote every single time.
  getQuote();
  // CRUD Function with Firestore
  crud.run();
  // Decide Input's function by Click. Todo or Event
  toggle.toggleBtn.addEventListener("click", e => toggle.addActive(e));
  // Open Todo or Event List by Click
  toggle.openEvent.addEventListener("click", () => toggle.showEvent());
  toggle.openTodo.addEventListener("click", () => toggle.showTodo());
  // Render Wallpaper Image
  wallpaper.renderImage();
});
