export default function BlogForm() {
  return (
    <form
    action=""
      className=" bg-gray-100 p-8 flex flex-col gap-2 shadow-md mx-auto lg:max-w-1/2"
    >
      <div className="space-y-1">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" />
        {/* {state?.errors.email && (
          <p className="errorMsg">{state?.errors.email}</p>
        )} */}
      </div>
      <div className="space-y-1">
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows={6} />
        {/* {state?.errors.email && (
          <p className="errorMsg">{state?.errors.email}</p>
        )} */}
      </div>

      <button type="submit" className="btn-primary">
        Submit
      </button>
    </form>
  );
}
