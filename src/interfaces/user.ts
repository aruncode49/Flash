import { Id } from "../../convex/_generated/dataModel";

export interface IUser {
  id: Id<"users">;
  name: string;
  picture: string;
  email: string;
}
