import styles from "../styles/feedbackForm.module.scss";

const FeedbackForm = () => {
  const onSubmit = () => {};
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
          <label htmlFor="name">Number Of Days Served *</label>
          <textarea
            rows={10}
            name="days-served"
            placeholder="Number Of Days Served"
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
        <div className={styles.formGroup}>
          <label htmlFor="name">Number Of Days Served *</label>
          <textarea
            rows={10}
            name="days-served"
            placeholder="Number Of Days Served"
          />
        </div>

        <button className="btn btn-block">Submit</button>
      </form>
    </div>
  );
};
export default FeedbackForm;
