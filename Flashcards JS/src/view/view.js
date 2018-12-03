import hh from "hyperscript-helpers";
import {
  h
} from "virtual-dom";

import {
  saveFlashcardAction,
  editQuestionInputAction,
  editAnswerInputAction,
  createFlashcardAction,
  deleteFlashcardAction,
  showFlashcardAnswerAction
} from "../update/update.js"

const {
  h1,
  p,
  button,
  div,
  form,
  textarea,
  span
} = hh(h);

const showFlashcardAnswer = (dispatch, flashcard) => {
  if (flashcard.showAnswer === true) {
    return div([
      p({
        className: "flashcard__paragraph"
      }, "Answer :"),
      p({
        className: "flashcard__paragraph flashcard__paragraph--size"
      }, `${flashcard.answer}`)
    ])
  } else {
    return p({
      onclick: () => {
        dispatch(showFlashcardAnswerAction(true, flashcard.id))
      },
      className: "flashcard__paragraph flashcard__paragraph--underscore"
    }, "Show answer")
  }
}

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
            className: "flashcard__close-button",
            onclick: () => {
              dispatch(deleteFlashcardAction(flashcard.id))
            }
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
        span({
          className: "flashcard__close-button",
          onclick: () => {
            dispatch(deleteFlashcardAction(flashcard.id))
          }
        }, "x"),
        p({
          className: "flashcard__paragraph"
        }, "Qestions :"),
        p({
          className: "flashcard__paragraph flashcard__paragraph--size flashcard--edit",
          onclick: () => {
            dispatch(saveFlashcardAction(true, flashcard.id))
          }
        }, `${flashcard.question}`),
        showFlashcardAnswer(dispatch, flashcard)
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
    ])
  ])
}

export default view;