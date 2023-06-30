import { z } from "zod";

const ZodSignInFormData = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty(),
});

export default ZodSignInFormData;
