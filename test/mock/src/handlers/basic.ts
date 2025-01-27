import { MockHandlerHelpers, MockHandlerRecord } from "../mockEnvironment";

export function basicBindings() {
  return {
    DefaultSource: {
      sourceId: "mock-source",
      kind: "scriptSource",
      url: "https://mock.test/source.js",
      contentHash: "cb502477dde2b1ceeb00c40cb27c13f4fe479cc4fd1d50d06a62e4801da9180a",
    },
    endpoint: {
      point: "100000",
      time: 100000,
    },
  };
}

export function basicMessageHandlers(): MockHandlerRecord {
  return {
    "Console.findMessages": arg => ({}),
    "Debugger.findSources": (params: any, h: MockHandlerHelpers) => {
      h.emitEvent("Debugger.newSource", h.bindings.DefaultSource);
      // TODO wait until after the last Debugger.newSource message
      return new Promise(resolve => setTimeout(resolve, 100));
    },
    "Debugger.newSource": (params: any, h: MockHandlerHelpers) => {
      h.emitEvent("Debugger.newSource", params);
      return {};
    },
    "Debugger.newSources": (params: any, h: MockHandlerHelpers) => {
      h.emitEvent("Debugger.newSources", params);
      return {};
    },
    "Graphics.findPaints": () => ({}),
    "Graphics.getDevicePixelRatio": () => ({ ratio: 1 }),
    "Graphics.getPlaybackVideo": () => ({}),
    "Recording.getDescription": (params: any, h: MockHandlerHelpers) => {
      throw h.Errors.MissingDescription;
    },
    "Recording.createSession": () => ({ sessionId: "mock-test-session" }),
    "Session.ensureProcessed": () => ({}),
    "Session.findMouseEvents": () => ({}),
    "Session.getBuildId": () => ({ buildId: "mock-build-id" }),
    "Session.getEndpoint": (params: any, h: MockHandlerHelpers) => ({
      endpoint: h.bindings.endpoint,
    }),
    "Session.loadedRegions": (params: any, h: MockHandlerHelpers) => {
      h.emitEvent("Session.loadedRegions", params);
      return new Promise(resolve => {});
    },
    "Console.newMessage": (params: any, h: MockHandlerHelpers) => {
      h.emitEvent("Console.newMessage", params);
      return new Promise(resolve => {});
    },
    "Session.listenForLoadChanges": (params: any, h: MockHandlerHelpers) => {
      h.emitEvent("Session.loadedRegions", {
        indexed: [],
        loaded: [
          {
            begin: { point: "0", time: 0 },
            end: h.bindings.endpoint,
          },
        ],
        loading: [
          {
            begin: { point: "0", time: 0 },
            end: h.bindings.endpoint,
          },
        ],
      });
      return new Promise(resolve => {});
    },
  };
}
