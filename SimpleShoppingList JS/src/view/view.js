import hh from "hyperscript-helpers";
import {
  h
} from "virtual-dom";

import {
  inputValueAction as inputValue,
  createItemAction as createItem,
  deleteItemAction as deleteItem
} from "../update/update";

const {
  h1,
  p,
  div,
  input,
  button,
  form,
  ul,
  li,
} = hh(h);

const createItemList = (dispatch, items) => {
  return items.map(item => {
    return div([
      li(item.value),
      button({
        onclick: () => {
          dispatch(deleteItem(item.id))
        }
      }, "x")
    ])
  })
}

function createList(dispatch, model) {
  if (model.shoppingList.length) {
    return ul([
      createItemList(dispatch, model.shoppingList)
    ])
  } else {
    return p("List is empty...")
  }

}

const view = (dispatch, model) => {
  return div([
    h1("Shopping App"),
    div([
      form({
        onsubmit: (e) => {
          e.preventDefault();
          dispatch(createItem)
        }
      }, [
        input({
          value: model.formInputValue,
          oninput: (e) => {
            dispatch(inputValue(e.target.value))
          }
        }),
        button({
          type: "submit"
        }, "Add")
      ])
    ]),
    createList(dispatch, model),
  ])
}

export default view;