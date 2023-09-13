const FeedbackForm = () => {
  const onSubmit = () => {};
  return (
    <div>
      <h1>Server Feedback</h1>
      <form onSubmit={onSubmit}>
        <div className="contact">
          <div className="form-group">
            <label htmlFor="name">Name (optional)</label>
            <input type="text" name="name" placeholder="Name (optional)" />
          </div>
        </div>
      </form>
    </div>
  );
};
export default FeedbackForm;
