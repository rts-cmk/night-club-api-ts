import z from "zod";

export const eventSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(2, "Title is required").max(100),
  description: z.string().min(2, "Description is required").max(1000),
  location: z.string().min(1, "Location is required").max(200),
  date: z.string().min(1, "Date is required"),
  assetId: z.number().min(1, "Asset ID is required "),
});
export type Event = z.infer<typeof eventSchema>;
export type NewEvent = Omit<Event, 'id'>;