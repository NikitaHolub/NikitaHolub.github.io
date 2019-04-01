'use strict';

//Table start size
const TABLE_START_STATE = 4;

//Variables for cell indexes when mouseover
let rowId;
let colId;

//Variable for button hide timer
let hideButtonsTimer;

//Variable for table
const $DYNAMIC_TABLE = document.querySelector('.dynamic__table'); 

//Variables for buttons of table
const $TABLE_BUTTONS = document.querySelectorAll('.table__button');
const $MINUS_BUTTON_TOP = document.querySelector('.top__minus');
const $MINUS_BUTTON_LEFT = document.querySelector('.left__minus');
const $PLUS_BUTTON_RIGHT = document.querySelector('.right__plus');
const $PLUS_BUTTON_BOTTOM = document.querySelector('.bottom__plus');

//Initialize start state of the table
window.onload = () => {
  for (let i = 0; i < TABLE_START_STATE; i++) {
    let $row = $DYNAMIC_TABLE.insertRow(i);
    for (let j = 0; j < TABLE_START_STATE; j++) {
      $row.insertCell(j);
    }
  }  
}

//Function for show minus buttons
let showButtons = () => {
  clearTimeout(hideButtonsTimer);

  if ($DYNAMIC_TABLE.rows[0].cells.length > 1) {
    $MINUS_BUTTON_TOP.style.visibility = 'visible';
  }

  if ($DYNAMIC_TABLE.rows.length > 1) {
    $MINUS_BUTTON_LEFT.style.visibility = 'visible';
  }
}

//Function for hide minus buttons
let hideButtons = () => {
  $MINUS_BUTTON_LEFT.style.visibility = 'hidden';
  $MINUS_BUTTON_TOP.style.visibility = 'hidden';
}

//Function for hide minus buttons with timeout
let hideButtonsTimeout = () => {
  hideButtonsTimer = setTimeout(hideButtons, 1000);
}

//Function for moving buttons and get cell indexes when mouseover
let tdMouseOver = event => {
  let target = event.target;
  //Return if element is't cell
  if (target.tagName != 'TD') return;
  //Change position of buttons
  $MINUS_BUTTON_TOP.style.left = `${target.offsetLeft}px`;
  $MINUS_BUTTON_LEFT.style.top = `${target.offsetTop}px`;
  //Save the cell indexes
  colId = target.cellIndex;
  rowId = target.parentNode.rowIndex;
}

//Function for add row to bottom of table
let addRow = () => {
  let newRow = $DYNAMIC_TABLE.insertRow();
  for (let i = 0; i < $DYNAMIC_TABLE.rows[0].cells.length; i++) {
    newRow.insertCell();
  }
}

//Function for add column to right of table
let addColumn = () => {
  for (let i = 0; i < $DYNAMIC_TABLE.rows.length; i++) {
    $DYNAMIC_TABLE.rows[i].insertCell();
  }
}

//Function for delete selected row
let deleteRow = () => {
  $DYNAMIC_TABLE.deleteRow(rowId);
  if (rowId === $DYNAMIC_TABLE.rows.length) {
    $MINUS_BUTTON_LEFT.style.top = `${$DYNAMIC_TABLE.rows[--rowId].offsetTop}px`;
  }
}

//Function for delete selected column
let deleteColumn = () => {
  for (let i = 0; i < $DYNAMIC_TABLE.rows.length; i++) {
    $DYNAMIC_TABLE.rows[i].deleteCell(colId);
  }
  if (colId === $DYNAMIC_TABLE.rows[0].cells.length) {
    $MINUS_BUTTON_TOP.style.left = `${$DYNAMIC_TABLE.rows[0].cells[--colId].offsetLeft}px`;
  }
}

//Add event handlers
$DYNAMIC_TABLE.addEventListener('mouseover', showButtons);
$DYNAMIC_TABLE.addEventListener('mouseout', hideButtonsTimeout);
$DYNAMIC_TABLE.addEventListener('mouseover', tdMouseOver);
$PLUS_BUTTON_BOTTOM.addEventListener('click', addRow);
$PLUS_BUTTON_RIGHT.addEventListener('click', addColumn);
$MINUS_BUTTON_LEFT.addEventListener('click', deleteRow);
$MINUS_BUTTON_TOP.addEventListener('click', deleteColumn);

for (let btn of $TABLE_BUTTONS) {
  btn.addEventListener('mouseover', showButtons);
  btn.addEventListener('mouseout', hideButtonsTimeout);
  btn.addEventListener('click', hideButtons);
}