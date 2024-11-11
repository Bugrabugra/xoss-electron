import { XossApi } from "../index";

declare global {
  interface Window {
    xossApi: XossApi;
  }
}
