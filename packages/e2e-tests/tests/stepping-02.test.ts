import { openDevToolsTab, startTest } from "../helpers";
import {
  reverseStepOverToLine,
  rewindToLine,
  stepInToLine,
  stepOutToLine,
  stepOverToLine,
  waitForScopeValue,
} from "../helpers/pause-information-panel";
import { clickSourceTreeNode } from "../helpers/source-explorer-panel";
import { addBreakpoint } from "../helpers/source-panel";
import test from "../testFixtureCloneRecording";

test.use({ exampleKey: "doc_rr_basic.html" });

test("stepping-02: Test fixes for some simple stepping bugs", async ({
  pageWithMeta: { page, recordingId },
  exampleKey,
}) => {
  await startTest(page, exampleKey, recordingId);
  await openDevToolsTab(page);

  // Open doc_rr_basic.html
  await clickSourceTreeNode(page, "test");
  await clickSourceTreeNode(page, "examples");
  await clickSourceTreeNode(page, exampleKey);

  await addBreakpoint(page, { lineNumber: 21, url: exampleKey });
  await rewindToLine(page, 21);

  await stepInToLine(page, 24);
  await stepOverToLine(page, 25);
  await stepOverToLine(page, 26);
  await reverseStepOverToLine(page, 25);
  await stepInToLine(page, 29);
  await stepOverToLine(page, 30);
  await stepOverToLine(page, 31);

  // Check that the scopes pane shows the value of the local variable.
  await waitForScopeValue(page, "c", "NaN");
  await stepOverToLine(page, 32);
  await reverseStepOverToLine(page, 31);
  await stepOutToLine(page, 26);
  await reverseStepOverToLine(page, 25);
  await reverseStepOverToLine(page, 24);
});
