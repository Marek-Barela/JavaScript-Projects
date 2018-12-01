import initModel from "./model/model";
import view from "./view/view";
import update from "./update/update";
import app from "./app/app";

const node = document.getElementById("app");

app(initModel, update, view, node);