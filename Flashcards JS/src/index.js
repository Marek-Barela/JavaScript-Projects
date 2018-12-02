import initModel from "./model/model";
import app from "./app/app";
import update from "./update/update";
import view from "./view/view";

const node = document.getElementById("app");

app(initModel, view, update, node)