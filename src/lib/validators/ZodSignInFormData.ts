import { z } from "zod";

const ZodSignInFormData = z.object({
  username: z.string().nonempty({
    message: "Valid Username is required.",
  }),
  password: z.string().nonempty({
    message: "Valid Password is required.",
  }),
});

export default ZodSignInFormData;
