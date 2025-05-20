"use client";

import { useActionState } from "react";

type handlerProps = {
  handler: (
    prevState: unknown,
    formData: FormData
  ) => Promise<
    | {
        title: FormDataEntryValue | null;
        content: FormDataEntryValue | null;
        errors: {
          title?: string[] | undefined;
          content?: string[] | undefined;
        };
      }
    | undefined
  >;
};

export default function BlogForm({ handler }: handlerProps) {
  const [state, action, pending] = useActionState(handler, undefined);

  return (
    <form
      action={action}
      className=" bg-gray-100 p-8 flex flex-col gap-2 shadow-md mx-auto lg:max-w-1/2"
    >
      <div className="space-y-1">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={state?.title as string}
        />
        {state?.errors && <p className="errorMsg">{state?.errors.title}</p>}
      </div>
      
      <div className="space-y-1">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={6}
          defaultValue={state?.content as string}
        />
        {state?.errors.content && (
          <p className="errorMsg">{state?.errors.content}</p>
        )}
      </div>

      <button type="submit" className="btn-primary" disabled={pending}>
        {pending ? "Loading..." : "Submit"}
      </button>
    </form>
  );
}
