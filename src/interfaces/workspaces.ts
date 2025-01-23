import { Id } from "../../convex/_generated/dataModel";
import { IPromptMessage } from "./promptMessage";

export interface IWorkspaces {
  messages: IPromptMessage[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fileData: any;
  userId: Id<"users">;
  _id: Id<"workspace">;
}
