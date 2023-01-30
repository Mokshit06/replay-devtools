import { getReporterAnnotationsComplete } from "ui/reducers/reporter";
import { useAppSelector } from "ui/setup/hooks";
import { gte } from "ui/utils/semver";

import { useGetRecording, useGetRecordingId } from "./recordings";

export function useTestInfo() {
  const recordingId = useGetRecordingId();
  const { loading, recording } = useGetRecording(recordingId);
  const annotationsComplete = useAppSelector(getReporterAnnotationsComplete);

  const metadata = recording?.metadata?.test;
  const isTestSuiteReplay = metadata != null;
  const testRunId = metadata?.run?.id;
  const runner = metadata?.runner?.name;
  const runnerVersion = metadata?.runner?.version;
  const pluginVersion = metadata?.runner?.plugin;
  const supportsSteps = runner === "cypress" || runner === "playwright";
  const supportsStepAnnotations =
    runner === "cypress" && !!pluginVersion && gte(pluginVersion, "0.3.2");

  const isLoading = loading || (supportsStepAnnotations && !annotationsComplete);

  return {
    loading: isLoading,
    metadata,
    isTestSuiteReplay,
    testRunId,
    runner,
    runnerVersion,
    pluginVersion,
    supportsSteps,
    supportsStepAnnotations,
  };
}