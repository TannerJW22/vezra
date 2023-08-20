import { twMerge } from "tailwind-merge";

// -=-=-= Types -=-=-= //
type InlineErrorProps = {
  errors: any;
  className?: string;
  customMessage?: string;
};

// =-=-=- Main Component =-=-=- //
export default function InlineError({
  className,
  errors,
  customMessage,
}: InlineErrorProps) {
  if (errors) {
    return (
      //
      <div
        className={twMerge(
          className,
          "ml-2 text-[0.8rem] text-red-600 font-medium"
        )}
      >
        <p className="flex italic tracking-tight whitespace-normal">
          {errors}
          <br />
        </p>
      </div>
    );
  }

  return <p></p>;
}
