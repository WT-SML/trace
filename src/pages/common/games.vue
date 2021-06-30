<template>
  <div class="p-5">
    <div>
      <button
        class="btn btn-primary btn-sm"
        @click="anno.setDrawingEnabled(false)"
      >
        移动
      </button>
      <button
        class="btn btn-primary btn-sm"
        @click="anno.setDrawingEnabled(true)"
      >
        标注
      </button>
      <button class="btn btn-primary btn-sm" @click="test()">测试</button>
    </div>
    <div
      id="openseadragon"
      style="width: 800px; height: 800px"
      class="border mx-auto position-reactive"
    ></div>
  </div>
</template>

<script>
// import OpenSeadragon from "openseadragon";
// import Annotorious from "@recogito/annotorious-openseadragon";
// import "@recogito/annotorious-openseadragon/dist/annotorious.min.css";
import $ from 'jquery';

import { $setScript } from "../../utils";
export default {
  name: "games",
  data: () => ({
    viewer: null,
    anno: null,
    data: [],
  }),
  async mounted() {
    await $setScript("/lib/annotorious.min.css", "link");
    await $setScript("/lib/openseadragon.2.4.2.min.js");
    await $setScript("/lib/openseadragon-annotorious.min.js");
    const data = [
      {
        id: 1,
        type: "Selection",
        body: [],
        target: {
          source:
            "https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/622762d0f703918fd091b3c4523d269759eec478.jpg",
          selector: {
            type: "FragmentSelector",
            conformsTo: "http://www.w3.org/TR/media-frags/",
            value:
              "xywh=pixel:892.0734252929688,417.8890686035156,69.09088134765625,40.909088134765625",
          },
        },
      },
      {
        id: 2,
        type: "Selection",
        body: [],
        target: {
          source:
            "https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/622762d0f703918fd091b3c4523d269759eec478.jpg",
          selector: {
            type: "FragmentSelector",
            conformsTo: "http://www.w3.org/TR/media-frags/",
            value:
              "xywh=pixel:424.8006896972656,135.1618194580078,36.3636474609375,49.09089660644531",
          },
        },
      },
      {
        id: 3,
        type: "Selection",
        body: [],
        target: {
          source:
            "https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/622762d0f703918fd091b3c4523d269759eec478.jpg",
          selector: {
            type: "FragmentSelector",
            conformsTo: "http://www.w3.org/TR/media-frags/",
            value:
              "xywh=pixel:471.1643371582031,613.3436279296875,48.181793212890625,33.6363525390625",
          },
        },
      },
      {
        id: 4,
        type: "Selection",
        body: [],
        target: {
          source:
            "https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/622762d0f703918fd091b3c4523d269759eec478.jpg",
          selector: {
            type: "FragmentSelector",
            conformsTo: "http://www.w3.org/TR/media-frags/",
            value:
              "xywh=pixel:140.25289916992188,48.789859771728516,42.72962951660156,30.917407989501953",
          },
        },
      },
      {
        id: 5,
        type: "Selection",
        body: [],
        target: {
          source:
            "https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/622762d0f703918fd091b3c4523d269759eec478.jpg",
          selector: {
            type: "FragmentSelector",
            conformsTo: "http://www.w3.org/TR/media-frags/",
            value:
              "xywh=pixel:237.52798461914062,296.97998046875,51.81817626953125,21.818206787109375",
          },
        },
      },
    ];

    const viewer = OpenSeadragon({
      id: "openseadragon",
      tileSources: {
        type: "image",
        url: "https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/622762d0f703918fd091b3c4523d269759eec478.jpg",
      },
    });
    const anno = OpenSeadragon.Annotorious(viewer, {});
    this.viewer = viewer;
    this.anno = anno;
    this.data = data;
    console.log(anno);
    console.log(anno._app.current.selectAnnotation);
    console.log(anno._app.current.annotationLayer.selectAnnotation);
    console.log(anno._app.current.annotationLayer.selectedShape);
    console.log(anno._app.current.annotationLayer.deselect);
    console.log(anno._app.current.annotationLayer.selectShape);
    // anno.readOnly = !anno.readOnly;
    // console.log(anno);
    // console.log(anno.handleMouseEnterAnnotation);
    // console.log(anno._emitter.emit());
    data.forEach((item) => {
      anno.addAnnotation(item);
    });
    anno.on("createSelection", function (selection) {
      console.log("createSelection");
      anno.addAnnotation(selection);
    });
    anno.on("selectAnnotation", function (annotation) {
      console.log("selectAnnotation");
      console.log(annotation);
    });
    // 鼠标移入
    // anno.on("mouseEnterAnnotation", (annotation, event) => {
    //   console.log("mouseEnterAnnotation");
    //   //
    //   // this.test(annotation);
    // });
  },
  methods: {
    test(annotation = 3) {
      const e = {
        id: 1,
        type: "Selection",
        body: [],
        target: {
          source:
            "https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/622762d0f703918fd091b3c4523d269759eec478.jpg",
          selector: {
            type: "FragmentSelector",
            conformsTo: "http://www.w3.org/TR/media-frags/",
            value:
              "xywh=pixel:892.0734252929688,417.8890686035156,69.09088134765625,40.909088134765625",
          },
        },
      };
      // this.viewer.viewport.zoomTo(10); // 放大
      // this.anno.selectAnnotation(annotation);
      console.log(this.anno._app.current.annotationLayer.selectAnnotation);
      var t = this.anno._app.current.annotationLayer;
      console.log(t)
      // console.log(t.selectShape)
      // t.findShape(e)
      // let dom = document.getElementsByName();
      // console.log($(`[data-id=3]`)[0])
      // let dom = $(`[data-id=3]`)[0]
      // t.selectShape(dom);
      console.log(t.mouseTracker);
      // ---------
      const func = (e, n) => {
        var r;
        if (
          (null === (r = t.selectedShape) || void 0 === r
            ? void 0
            : r.annotation) !== (null == e ? void 0 : e.annotation)
        ) {
          var o = e.annotation;
            e.parentNode.removeChild(e);
            var i = t.tools.forAnnotation(o);
            (t.selectedShape = i.createEditableShape(o)),
              t.selectedShape.scaleHandles(1 / t.currentScale()),
              (t.selectedShape.element.annotation = o);
            const $i = window.__$i;
            var a = new $i.a.MouseTracker({ element: t.svg }).setTracking(!1);
            t.selectedShape.element.addEventListener(
              "mouseenter",
              function (e) {
                console.log(123)
                return a.setTracking(!0);
              }
            ),
              t.selectedShape.element.addEventListener(
                "mouseleave",
                function (e) {
                  return a.setTracking(!1);
                }
              ),
              (t.selectedShape.mouseTracker = a),
              t.selectedShape.on("update", function (e) {
                return t.emit("updateTarget", t.selectedShape.element, e);
              }),
              t.emit("select", {
                annotation: o,
                element: t.selectedShape.element,
                skipEvent: n,
              });
        }
      };
      func(t.findShape(3), true);
    },
  },
};
</script>

<style>
</style>