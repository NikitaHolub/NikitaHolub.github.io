class DynamicTable {
  constructor(selector, size){

    //Variable for button hide timer
    this.hideButtonsTimer;

    //Variables for cell indexes when mouseover
    this.colId;
    this.rowId;

    //Variable for table wrap
    let $el = document.querySelector(selector);

    //Variable for table
    this.$table = $el.querySelector('.dynamic__table');

    //Variables for buttons of table
    this.$minus_button_top = $el.querySelector('.top__minus');
    this.$minus_button_left = $el.querySelector('.left__minus');
    this.$plus_button_right = $el.querySelector('.right__plus');
    this.$plus_button_bottom = $el.querySelector('.bottom__plus');
    this.$minus_buttons = $el.querySelectorAll('.minus__button')

    //Initialize start state of the table
    this.initialize(size);

    //Add event handlers
    this.$table.addEventListener('mouseover', this.showButtons);
    this.$table.addEventListener('mouseout', this.hideButtonsTimeout);
    this.$table.addEventListener('mouseover', this.tdMouseOver);
    this.$plus_button_bottom.addEventListener('click', this.addRow);
    this.$plus_button_right.addEventListener('click', this.addColumn);
    this.$minus_button_left.addEventListener('click', this.deleteRow);
    this.$minus_button_top.addEventListener('click', this.deleteColumn);

    for (let btn of this.$minus_buttons) {
      btn.addEventListener('mouseover', this.showButtons);
      btn.addEventListener('mouseout', this.hideButtonsTimeout);
      btn.addEventListener('click', this.hideButtons);
    }
  }

  //Function for initialize start state of the table
  initialize(size){
    for (let i = 0; i < size; i++) {
      let $row = this.$table.insertRow(i);
      for (let j = 0; j < size; j++) {
        $row.insertCell(j);
      }
    }
  }

  //Function for show minus buttons
  showButtons = () => {
    clearTimeout(this.hideButtonsTimer);

    if (this.$table.rows[0].cells.length > 1) {
      this.$minus_button_top.style.visibility = 'visible';
    }
  
    if (this.$table.rows.length > 1) {
      this.$minus_button_left.style.visibility = 'visible';
    }
  }

  //Function for hide minus buttons
  hideButtons = () => {
    this.$minus_button_left.style.visibility = 'hidden';
    this.$minus_button_top.style.visibility = 'hidden';
  }

  //Function for hide minus buttons with timeout
  hideButtonsTimeout = () => {
    this.hideButtonsTimer = setTimeout(this.hideButtons, 1000);
  }

  //Function for moving buttons and get cell indexes when mouseover
  tdMouseOver = event => {
    let target = event.target;
    //Return if element is't cell
    if (target.tagName != 'TD') return;
    //Change position of buttons
    this.$minus_button_top.style.left = `${target.offsetLeft}px`;
    this.$minus_button_left.style.top = `${target.offsetTop}px`;
    //Save the cell indexes
    this.colId = target.cellIndex;
    this.rowId = target.parentNode.rowIndex;
  }

  //Function for add row to bottom of table
  addRow = () => {
    let newRow = this.$table.insertRow();
    for (let i = 0; i < this.$table.rows[0].cells.length; i++) {
      newRow.insertCell();
    }
  }

  //Function for add column to right of table
  addColumn = () => {
    for (let i = 0; i < this.$table.rows.length; i++) {
      this.$table.rows[i].insertCell();
    }
  }

  //Function for delete selected row
  deleteRow = () => {
    this.$table.deleteRow(this.rowId);
    if (this.rowId === this.$table.rows.length) {
      this.$minus_button_left.style.top = `${this.$table.rows[--this.rowId].offsetTop}px`;
    }
  }

  //Function for delete selected column
  deleteColumn = () => {
    for (let i = 0; i < this.$table.rows.length; i++) {
      this.$table.rows[i].deleteCell(this.colId);
    }
    if (this.colId === this.$table.rows[0].cells.length) {
      this.$minus_button_top.style.left = `${this.$table.rows[0].cells[--this.colId].offsetLeft}px`;
    }
  }
}

const table = new DynamicTable('#table1', 4);
const table2 = new DynamicTable('#table2', 4);