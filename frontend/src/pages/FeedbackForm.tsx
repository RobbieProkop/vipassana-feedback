import styles from "../styles/feedbackForm.module.scss";

const FeedbackForm = () => {
  const onSubmit = () => {};
  const today = new Date();
  return (
    <div className={styles.form}>
      <h1>Server Feedback</h1>
      <form onSubmit={onSubmit}>
        <div className={styles.contact}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name (optional)</label>
            <input type="text" name="name" placeholder="Name" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="name">Email (optional)</label>
            <input type="email" name="email" placeholder="Email" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="name">Course Start Date *</label>
            <input
              type="date"
              name="course-start"
              placeholder="Course Start Date"
              value={today.toISOString().split("T")[0]}
              max={today.toISOString().split("T")[0]}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="name">Number Of Days Served *</label>
            <textarea
              rows={10}
              name="days-served"
              placeholder="Number Of Days Served"
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="name">
            1. What was your motivation for coming to serve?
          </label>
          <textarea rows={10} name="question1" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="name">2. Did you feel valued as a server?</label>
          <textarea rows={10} name="question2" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="name">
            Are you against returning to Dhamma Karuna to serve again if your
            time and resources permit? If yes, please tell us why.
          </label>
          <textarea rows={10} name="question3" />
        </div>

        <button className="btn btn-block">Submit</button>
      </form>
    </div>
  );
};
export default FeedbackForm;
