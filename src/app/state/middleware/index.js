import thunk from "redux-thunk";
import { apiMiddleware } from "redux-api-middleware";
import log from "./log";
import authHandling from "./authHandling";

export default [apiMiddleware, thunk, authHandling, log];
