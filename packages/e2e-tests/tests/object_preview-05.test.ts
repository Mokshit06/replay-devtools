import { openDevToolsTab, startTest } from "../helpers";
import {
  executeTerminalExpression,
  verifyConsoleMessage,
  warpToMessage,
} from "../helpers/console-panel";
import test from "../testFixtureCloneRecording";

test.use({ exampleKey: "doc_prod_bundle.html" });

test(`object_preview-05: Should support logging objects as values`, async ({
  pageWithMeta: { page, recordingId },
  exampleKey,
}) => {
  await startTest(page, exampleKey, recordingId);
  await openDevToolsTab(page);

  await warpToMessage(page, "ExampleFinished");

  await executeTerminalExpression(page, "{foo: 'abc', bar: 123}");
  await verifyConsoleMessage(page, '{foo: "abc", bar: 123}');
});
