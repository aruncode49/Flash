import { Id } from "../../convex/_generated/dataModel";
import { IPromptMessage } from "./promptMessage";

export interface IWorkspaces {
  messages: IPromptMessage[];
  fileData: any;
  userId: Id<"users">;
  _id: Id<"workspace">;
}
