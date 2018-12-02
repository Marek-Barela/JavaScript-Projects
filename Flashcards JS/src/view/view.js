import hh from "hyperscript-helpers";
import {
  h
} from "virtual-dom";

import {
  saveFlashcardAction,
  editQuestionInputAction,
  editAnswerInputAction,
  createFlashcardAction
} from "../update/update.js"

const {
  pre,
  h1,
  p,
  button,
  div,
  form,
  textarea,
  span
} = hh(h);

const createFlashcards = (dispatch, model) => {
  const {
    flashcards
  } = model;
  return flashcards.map(flashcard => {
    if (flashcard.editMode === true) {
      return div({
        className: "flashcard"
      }, [
        form({
          onsubmit: (e) => {
            e.preventDefault();
            dispatch(saveFlashcardAction(false, flashcard.id))
          }
        }, [
          span({
            className: "flashcard__close-button"
          }, "x"),
          p({
            className: "flashcard__paragraph"
          }, "Question :"),
          textarea({
            className: "flashcard__textarea",
            rows: "4",
            cols: "15",
            value: flashcard.question,
            oninput: (e) => {
              dispatch(editQuestionInputAction(e.target.value, flashcard.id))
            }
          }),
          p({
            className: "flashcard__paragraph"
          }, "Answer :"),
          textarea({
            className: "flashcard__textarea",
            rows: "4",
            cols: "15",
            value: flashcard.answer,
            oninput: (e) => {
              dispatch(editAnswerInputAction(e.target.value, flashcard.id))
            }
          }),
          button({
            className: "flashcard__button",
            type: "submit"
          }, "Save")
        ])
      ])
    } else {
      return div({
        className: "flashcard"
      }, [
        p({
          className: "flashcard__paragraph"
        }, "Qestions"),
        p({
          className: "flashcard__paragraph"
        }, `${flashcard.question}`),
        p({
          className: "flashcard__paragraph"
        }, "Answer"),
        p({
          className: "flashcard__paragraph"
        }, `${flashcard.answer}`)
      ])
    }
  })
}

const view = (dispatch, model) => {
  return div({
    className: "app__container"
  }, [
    h1({
      className: "app__header"
    }, "Flashcard Study"),
    button({
        className: "add-card__button",
        onclick: () => {
          dispatch(createFlashcardAction())
        }
      },
      "+ Add Flashcard"),
    div({
      className: "flashcard__container"
    }, [
      createFlashcards(dispatch, model)
    ]),
    //pre(JSON.stringify(model, null, 2))
  ])
}

export default view;