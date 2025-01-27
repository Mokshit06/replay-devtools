import { useContext } from "react";

import { TimelineContext } from "replay-next/src/contexts/TimelineContext";
import { UserActionEvent } from "shared/test-suites/RecordingTestMetadata";
import { seek } from "ui/actions/timeline";
import { useAppDispatch } from "ui/setup/hooks";

export function useShowUserActionEventBoundary({
  boundary,
  userActionEvent,
}: {
  boundary: "before" | "after";
  userActionEvent: UserActionEvent;
}) {
  const { timeStampedPointRange } = userActionEvent;
  const { executionPoint: currentPoint } = useContext(TimelineContext);

  const dispatch = useAppDispatch();

  if (timeStampedPointRange === null) {
    return {
      disabled: true,
      onClick: () => {},
    };
  }

  const timeStampedPoint =
    boundary === "before" ? timeStampedPointRange.begin : timeStampedPointRange.end;

  const disabled = timeStampedPoint.point === currentPoint;

  const onClick = () => {
    dispatch(seek(timeStampedPoint.point, timeStampedPoint.time, false));
  };

  return { disabled, onClick };
}
