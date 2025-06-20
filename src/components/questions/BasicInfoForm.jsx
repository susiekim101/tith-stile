import styles from "../css/Quiz.module.css";

function FirstSectionForm({
  questions,
  formValues,
  handleChange,
  onNextClick,
}) {
  const groupedQuestions = [];
  let tempSmallGroup = [];

  for (let i = 0; i < questions.length; i++) {
    const current = questions[i];

    if (current.style === "small") {
      tempSmallGroup.push(current);
    } else {
      if (tempSmallGroup.length > 0) {
        groupedQuestions.push([...tempSmallGroup]);
        tempSmallGroup = [];
      }
      groupedQuestions.push([current]);
    }
  }
  if (tempSmallGroup.length > 0) {
    groupedQuestions.push([...tempSmallGroup]);
  }

  return (
    <div className={styles.quizContainer}>
      <div>
        <QuizBar currentQuestion={1} />
        <QuizTitle title={questions[0].sectionTitle} />
      </div>
      <form className={styles.form}>
        {groupedQuestions.map((group, groupIdx) => {
          const isRow = group[0].style === "small";

          return (
            <div
              key={groupIdx}
              className={isRow ? styles.rowGroup : styles.columnGroup}
            >
              {group.map((question) => (
                <div
                  key={question.id}
                  className={isRow ? styles.rowItem : undefined}
                >
                  <label className={styles.label}>{question.label}</label>
                  {question.type === "text" && (
                    <input
                      type="text"
                      className={styles.text}
                      value={formValues[question.id] || ""}
                      onChange={(e) =>
                        handleChange(question.id, e.target.value)
                      }
                    />
                  )}
                  {/* repeat for other input types (select, email, date, etc.) */}
                </div>
              ))}
            </div>
          );
        })}
      </form>
      <div className={styles.footer}>
        <button type="button" className={styles.next} onClick={onNextClick}>
          Next &gt;
        </button>
      </div>
    </div>
  );
}

export default FirstSectionForm;

/*

import styles from "./BasicInfoForm.module.css";

function BasicInfoForm({ questions, formValues, handleChange, onNextClick }) {
  const groupedQuestions = [];
  let tempSmallGroup = [];

  for (let i = 0; i < questions.length; i++) {
    const current = questions[i];

    if (current.style === "small") {
      tempSmallGroup.push(current);
    } else {
      if (tempSmallGroup.length > 0) {
        groupedQuestions.push([...tempSmallGroup]);
        tempSmallGroup = [];
      }
      groupedQuestions.push([current]);
    }
  }
  if (tempSmallGroup.length > 0) {
    groupedQuestions.push([...tempSmallGroup]);
  }
  return (
    <>
      <form className={styles.form}>
        {groupedQuestions.map((group, groupIdx) => {
          const isRow = group[0].style === "small";

          return (
            <div
              key={groupIdx}
              className={isRow ? styles.rowGroup : styles.columnGroup}
            >
              {group.map((question, idx) => (
                <div
                  key={question.id}
                  className={isRow ? styles.rowItem : undefined}
                >
                  <label className={styles.label}>{question.label}</label>
                  {question.type === "text" && (
                    <input
                      type="text"
                      className={styles.text}
                      value={formValues[question.id]}
                      onChange={(e) =>
                        handleChange(question.id, e.target.value)
                      }
                    />
                  )}

                  {question.type === "select" && (
                    <select
                      className={styles.select}
                      value={formValues[question.id] || ""}
                      onChange={(e) =>
                        handleChange(question.id, e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Select
                      </option>

                      {question.options.map((option, idx) => (
                        <option key={idx} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}

                  {question.type === "email" && (
                    <input
                      type="email"
                      className={styles.email}
                      value={formValues[question.id]}
                      onChange={(e) =>
                        handleChange(question.id, e.target.value)
                      }
                      required
                    />
                  )}

                  {question.type === "date" && (
                    <input
                      type="date"
                      className={styles.date}
                      value={formValues[question.id]}
                      onChange={(e) =>
                        handleChange(question.id, e.target.value)
                      }
                      required
                    />
                  )}

                  {question.type === "multiselect" && (
                    <select
                      multiple
                      className={styles.multiselect}
                      value={formValues[question.id] || []}
                      onChange={(e) =>
                        handleChange(
                          question.id,
                          Array.from(
                            e.target.selectedOptions,
                            (option) => option.value
                          )
                        )
                      }
                      required
                    >
                      {question.options.map((option, idx) => (
                        <option key={idx} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}

                  {question.type === "textarea" && (
                    <textarea
                      className={styles.textarea}
                      value={formValues[question.id] || ""}
                      onChange={(e) =>
                        handleChange(question.id, e.target.value)
                      }
                      rows={4}
                      placeholder="Type your response here..."
                    />
                  )}
                </div>
              ))}
            </div>
          );
        })}
      </form>
    </>
  );
}

export default BasicInfoForm;
*/
