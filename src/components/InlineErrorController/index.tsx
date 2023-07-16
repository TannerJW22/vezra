import { twMerge } from "tailwind-merge";

// -=-=-= Types -=-=-= //
type InlineErrorControllerProps = {
  errors: any;
  type: "server" | "zod";
  className?: string;
  customMessage?: string;
};

// =-=-=- Main Component =-=-=- //
export default function InlineErrorController({
  className,
  type = "zod",
  errors,
}: InlineErrorControllerProps) {
  if (errors && type === "zod") {
    if (typeof errors !== "string") return <p></p>;
    return (
      //
      <div
        className={twMerge(
          className,
          "absolute mt-[42px] ml-2 py-2 text-[0.8rem] text-red-600 font-medium"
        )}
      >
        <p className="flex italic tracking-tight whitespace-normal">
          {errors}
          <br />
        </p>
      </div>
    );
  }

  if (errors && errors.length !== 0 && type === "server") {
    return (
      //
      <div
        className={twMerge(
          className,
          "mb-6 bg-red-100 py-2 rounded-md border text-[0.8rem] border-red-600 text-red-600 font-medium"
        )}
      >
        {errors.map((error: string, i: number) => {
          return (
            <p
              key={i}
              className="flex justify-center mx-4 gap-2 whitespace-normal"
            >
              {errors}
              <br />
            </p>
          );
        })}
      </div>
    );
  }

  return <p></p>;
}
