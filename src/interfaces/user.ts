import { Id } from "../../convex/_generated/dataModel";

export type TPlans = "Free" | "Starter" | "Pro" | "Unlimited (License)";

export interface IUser {
  id: Id<"users">;
  name: string;
  picture: string;
  email: string;
  token: number;
  activePlan: TPlans;
}
