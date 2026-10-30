import { clsx } from "clsx";
import WorkItemTile from "./work-item-tile";

export const WorkGrid = ({ workItems = [], className }) => {
  return (
    <div
      data-testid="work-grid"
      className={clsx(
        "grid grid-cols-1 gap-x-5 gap-y-12 md:grid-cols-2 xl:grid-cols-3",
        className,
      )}
    >
      {workItems.map((workItem, index) => (
        <WorkItemTile workItem={workItem} index={index} key={workItem._id} />
      ))}
    </div>
  );
};
