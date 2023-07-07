import { z } from "zod";

const contactTypeEnum = [
  "Parent",
  "Guardian",
  "Emergency",
  "ReleaseOnly",
  "Other",
] as const;

const ZodContact = z.object({
  type: z.enum(contactTypeEnum),
  lastName: z.string(),
  firstName: z.string(),
  phone: z.number().optional(),
  email: z.string().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.number().optional(),
  bbcid: z.string().optional(),
  bciExpires: z.date().optional(),
  notes: z.string().optional(),
  students: z.array(z.unknown()).optional(), // <<--| {unknown()} bypasses circular dependency (couldnt solve)
  createdAt: z.date().optional(), // <<--|
  updatedAt: z.date().optional(), // <<--|
});

export default ZodContact;
export { contactTypeEnum };
