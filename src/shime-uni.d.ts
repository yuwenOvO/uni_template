/// <reference types='@dcloudio/types' />
import "vue";

declare module "@vue/runtime-core" {
  type Hooks = App.AppInstance & Page.PageInstance;

  interface ComponentCustomOptions extends Hooks {}
}

declare global {
  interface Uni {
    // 修正createCameraContext的类型，使其接受一个可选的cameraId参数
    createCameraContext(cameraId?: string): UniNamespace.CameraContext;
  }
}
